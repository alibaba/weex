/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXListComponent.h"
#import "WXComponent.h"
#import "WXComponent_internal.h"
#import "NSArray+Weex.h"
#import "WXAssert.h"
#import "WXUtility.h"
#import "NSObject+WXSwizzle.h"
#import "WXSDKInstance_private.h"

@interface WXTableView : UITableView

@end

@implementation WXTableView

+ (BOOL) requiresConstraintBasedLayout
{
    return NO;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    [self.wx_component layoutDidFinish];
}

@end

@interface WXListComponent () <UITableViewDataSource, UITableViewDelegate>

@end

@implementation WXListComponent
{
    __weak UITableView * _tableView;
    NSMutableArray *     _cellComponents;
    NSMutableArray *     _completedCells;
    NSUInteger           _previousLoadMoreRowNumber;
}

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        
        _cellComponents = [NSMutableArray wx_mutableArrayUsingWeakReferences];
        _completedCells = [NSMutableArray wx_mutableArrayUsingWeakReferences];
        
        [self fixFlicker];
    }
    
    return self;
}

- (UIView *)loadView
{
    return [[WXTableView alloc] init];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    _tableView = (UITableView *)self.view;
    _tableView.allowsSelection = NO;
    _tableView.allowsMultipleSelection = NO;
    _tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    _tableView.delegate = self;
    _tableView.dataSource = self;
    _tableView.userInteractionEnabled = YES;
}

- (void)setContentSize:(CGSize)contentSize
{
    // Do Nothing
}

- (NSUInteger)childrenCountForScrollerLayout
{
    return [super childrenCountForScrollerLayout] - _cellComponents.count;
}

#pragma mark - Inheritance

- (void)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    [super _insertSubcomponent:subcomponent atIndex:index];
    
    if ([subcomponent isKindOfClass:[WXCellComponent class]]) {
        WXCellComponent *cellComponent = (WXCellComponent *)subcomponent;
        cellComponent.list = self;
        
        NSInteger insertIndex = index;
        for (int j = 0; j <= index && j < self.subcomponents.count; j++) {
            WXComponent *child = self.subcomponents[j];
            if (![child isKindOfClass:[WXCellComponent class]]) {
                insertIndex--;
            }
        }
        
        cellComponent.indexPath = [NSIndexPath indexPathForRow:insertIndex inSection:0];
        [_cellComponents insertObject:subcomponent atIndex:insertIndex];
        
        for (WXCellComponent *cell in _cellComponents) {
            cell.indexPath = [NSIndexPath indexPathForRow:[_cellComponents indexOfObject:cell] inSection:0];
        }
    }
}


- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    //List View insert cell's view by - cellForRowAtIndexPath:, so here will not insert cell's view again
    if (![subcomponent isKindOfClass:[WXCellComponent class]]) {
        [super insertSubview:subcomponent atIndex:index];
    }
}

- (void)cellWillRemove:(WXCellComponent *)cell
{
    WXAssertComponentThread();
    
    [_cellComponents removeObject:cell];
    
    for (WXCellComponent *cell in _cellComponents) {
        cell.indexPath = [NSIndexPath indexPathForRow:[_cellComponents indexOfObject:cell] inSection:0];
    }
}

- (void)cellDidRemove:(WXCellComponent *)cell
{
    WXAssertMainThread();
    
    NSIndexPath *indexPath = cell.indexPath;
    WXAssert(indexPath, @"Removing cell:%@ has not been inserted to cell list before", cell);
    
    [_completedCells removeObject:cell];
    
    WXLogVerbose(@"Delete cell:%@ at row:%ld", cell.ref, (long)indexPath.row);
    [UIView performWithoutAnimation:^{
        [_tableView deleteRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:UITableViewRowAnimationNone];
    }];
}

- (void)cellDidLayout:(WXCellComponent *)cell
{
    WXAssertMainThread();
    
    NSIndexPath *indexPath = cell.indexPath;
    WXAssert(indexPath, @"Laid out cell:%@ has not been inserted to cell list before", cell);

    if (indexPath.row == 0) {
        if (_tableView.tableHeaderView) {
            cell.absolutePosition = CGPointMake(0, _tableView.tableHeaderView.frame.size.height);
        } else {
            cell.absolutePosition = CGPointZero;
        }

    } else {
        WXCellComponent *previousCell = [_cellComponents wx_safeObjectAtIndex:(indexPath.row - 1)];
        CGPoint previousCellPostion = previousCell.absolutePosition;
        cell.absolutePosition = CGPointMake(previousCellPostion.x, previousCellPostion.y + previousCell.calculatedFrame.size.height);
    }
    
    [cell _fillAbsolutePositions];
    
    if (![_completedCells containsObject:cell]) {
        [_completedCells addObject:cell];
        WXLogVerbose(@"Insert cell:%@ at row:%ld", cell.ref, (long)indexPath.row);
        [UIView performWithoutAnimation:^{
            [_tableView insertRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:UITableViewRowAnimationNone];
        }];
    } else {
        WXLogVerbose(@"Reload cell:%@ at row:%ld", cell.ref, (long)indexPath.row);
        [UIView performWithoutAnimation:^{
            [_tableView reloadRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:UITableViewRowAnimationNone];
        }];
    }
}

- (void)cellDidRendered:(WXCellComponent *)cell
{
    WXAssertMainThread();
    
    NSIndexPath *indexPath = cell.indexPath;
    WXAssert(indexPath, @"Rendered cell:%@ has not been inserted to cell list before", cell);

    CGRect cellRect = [_tableView rectForRowAtIndexPath:indexPath];
    if (cellRect.origin.y + cellRect.size.height >= _tableView.frame.size.height) {
        if (self.weexInstance.screenRenderTime == 0) {
            self.weexInstance.screenRenderTime = [[NSDate new] timeIntervalSinceDate:self.weexInstance.renderStartDate];
        }
    }
    
    if (self.weexInstance.onRenderProgress) {
        CGRect renderRect = CGRectMake(self.absolutePosition.x + cellRect.origin.x,
                                       self.absolutePosition.y + cellRect.origin.y,
                                       cellRect.size.width, cellRect.size.height);
        
        self.weexInstance.onRenderProgress(renderRect);
    }

}

- (void)cell:(WXCellComponent *)cell didMoveFromIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath
{
    WXAssert(fromIndexPath, @"Moved cell:%@ has not been inserted to cell list before", cell);
    
    [UIView performWithoutAnimation:^{
        [_tableView moveRowAtIndexPath:fromIndexPath toIndexPath:toIndexPath];
    }];
}

#pragma mark - TableView delegate

- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    
}

- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSArray *visibleIndexPaths = [tableView indexPathsForVisibleRows];
    if (![visibleIndexPaths containsObject:indexPath]) {
        WXCellComponent *component = [_cellComponents wx_safeObjectAtIndex:indexPath.row];
        // Must invoke synchronously otherwise it will remove the view just added.
        [component _unloadView];
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    
    WXCellComponent *cell = [_cellComponents wx_safeObjectAtIndex:indexPath.row];
    return cell.calculatedFrame.size.height;
}

#pragma mark - TableView Data Source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [_completedCells count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    WXLogVerbose(@"Getting cell at row:%ld", (long)indexPath.row);
    static NSString *reuseIdentifier = @"WXTableViewCell";
    
    UITableViewCell *cellView = [_tableView dequeueReusableCellWithIdentifier:reuseIdentifier];
    if (!cellView) {
        cellView = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseIdentifier];
        cellView.backgroundColor = [UIColor clearColor];
    } else {
    }
    
    WXCellComponent *cell = [_cellComponents wx_safeObjectAtIndex:indexPath.row];
    
    if (!cell) {
        return cellView;
    }
    
    if (![_completedCells containsObject:cell]) {
        // only inserted, not finish layout yet
        return cellView;
    }
    
    if (cell.view.superview == cellView.contentView) {
        return cellView;
    }
    
    for (UIView *view in cellView.contentView.subviews) {
        [view removeFromSuperview];
    }
    
    [cellView.contentView addSubview:cell.view];
    
    WXLogVerbose(@"Created cell:%@ view:%@ cellView:%@ at row:%ld", cell.ref, cell.view, cellView, (long)indexPath.row);
    
    return cellView;
}

#pragma mark - Load More Event

- (void)setLoadmoreretry:(NSUInteger)loadmoreretry
{
    if (loadmoreretry != self.loadmoreretry) {
        _previousLoadMoreRowNumber = 0;
    }
    
    [super setLoadmoreretry:loadmoreretry];
}

- (void)loadMore
{
    [super loadMore];
    _previousLoadMoreRowNumber = [self tableView:_tableView numberOfRowsInSection:0];
}

- (BOOL)isNeedLoadMore
{
    BOOL superNeedLoadMore = [super isNeedLoadMore];
    return superNeedLoadMore && _previousLoadMoreRowNumber != [self tableView:_tableView numberOfRowsInSection:0];
}

- (void)fixFlicker
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        //(ง •̀_•́)ง┻━┻ Stupid scoll view, always reset content offset to zero after insert cells, any other more elegant way?
        NSString *a = @"ntOffsetIfNe";
        NSString *b = @"adjustConte";
        
        NSString *originSelector = [NSString stringWithFormat:@"_%@%@cessary", b, a];
        [[self class] weex_swizzle:[WXTableView class] Method:NSSelectorFromString(originSelector) withMethod:@selector(fixedFlickerSelector)];
    });
}

- (void)fixedFlickerSelector
{
    // DO NOT delete this method.
}


@end

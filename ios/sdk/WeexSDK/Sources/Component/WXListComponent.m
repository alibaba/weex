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
    
    // Only accessed on main thread
    NSMutableArray *     _cellComponents;
    NSMutableArray *     _completedCells;
    
    NSUInteger           _previousLoadMoreRowNumber;
}

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        
        _cellComponents = [NSMutableArray array];
        _completedCells = [NSMutableArray array];
        
        [self fixFlicker];
    }
    
    return self;
}

- (void)dealloc
{
    if (_tableView) {
        _tableView.delegate = nil;
        _tableView.dataSource = nil;
    }
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

- (void)viewWillUnload
{
    [super viewWillUnload];
    
    _tableView.delegate = nil;
    _tableView.dataSource = nil;
}

- (void)setContentSize:(CGSize)contentSize
{
    // Do Nothing
}

#pragma mark - Inheritance

- (void)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    [super _insertSubcomponent:subcomponent atIndex:index];
    
    if ([subcomponent isKindOfClass:[WXCellComponent class]]) {
        WXCellComponent *cellComponent = (WXCellComponent *)subcomponent;
        cellComponent.list = self;
    }
}

- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    //List View insert cell's view by - cellForRowAtIndexPath:, so here will not insert cell's view again
    if (![subcomponent isKindOfClass:[WXCellComponent class]]) {
        [super insertSubview:subcomponent atIndex:index];
    } else {
        
        NSInteger insertIndex = index;
        for (int j = 0; j <= index && j < self.subcomponents.count; j++) {
            WXComponent *child = self.subcomponents[j];
            if (![child isKindOfClass:[WXCellComponent class]]) {
                insertIndex--;
            }
        }

        [_cellComponents insertObject:subcomponent atIndex:insertIndex];
    }
}


- (void)cellDidRemove:(WXCellComponent *)cell
{
    WXAssertMainThread();
    
    NSUInteger row = [_cellComponents indexOfObject:cell];
    WXAssert(row != NSNotFound, @"Removing cell:%@ has not been inserted to cell list before", cell);
    row = [self adjustRowForCompletedCell:row];
    NSIndexPath *indexPath = [NSIndexPath indexPathForRow:row inSection:0];
    
    [_cellComponents removeObject:cell];
    [_completedCells removeObject:cell];
    
    WXLogVerbose(@"Delete cell:%@ at row:%ld", cell.ref, (long)indexPath.row);
    [UIView performWithoutAnimation:^{
        [_tableView deleteRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:UITableViewRowAnimationNone];
    }];
}

- (void)cellDidLayout:(WXCellComponent *)cell
{
    WXAssertMainThread();
    
    NSUInteger row = [_cellComponents indexOfObject:cell];
    WXAssert(row != NSNotFound, @"Laid out cell:%@ has not been inserted to cell list before", cell);

    if (row == 0) {
        if (_tableView.tableHeaderView) {
            cell.absolutePosition = CGPointMake(0, _tableView.tableHeaderView.frame.size.height);
        } else {
            cell.absolutePosition = CGPointZero;
        }

    } else {
        WXCellComponent *previousCell = [_cellComponents wx_safeObjectAtIndex:(row - 1)];
        CGPoint previousCellPostion = previousCell.absolutePosition;
        cell.absolutePosition = CGPointMake(previousCellPostion.x, previousCellPostion.y + previousCell.calculatedFrame.size.height);
    }
    
    [cell _fillAbsolutePositions];
    
    if (![_completedCells containsObject:cell]) {
        NSIndexPath *indexPath = [NSIndexPath indexPathForRow:row inSection:0];
        [_completedCells addObject:cell];
        WXLogVerbose(@"Insert cell:%@ at row:%ld", cell.ref, (long)indexPath.row);
        [UIView performWithoutAnimation:^{
            [_tableView insertRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:UITableViewRowAnimationNone];
        }];
    } else {
        row = [self adjustRowForCompletedCell:row];
        NSIndexPath *indexPath = [NSIndexPath indexPathForRow:row inSection:0];
        
        WXLogInfo(@"Reload cell:%@ at row:%ld", cell.ref, (long)indexPath.row);
        [UIView performWithoutAnimation:^{
            [_tableView reloadRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:UITableViewRowAnimationNone];
        }];
    }
}

- (void)cellDidRendered:(WXCellComponent *)cell
{
    WXAssertMainThread();
    
    NSUInteger row = [_cellComponents indexOfObject:cell];
    if (row == NSNotFound) {
        WXLogWarning(@"Rendered cell:%@ has been deleted", cell);
        return;
    }
    
    NSIndexPath *indexPath = [NSIndexPath indexPathForRow:row inSection:0];
    
    NSInteger currentRowNumber = [_tableView numberOfRowsInSection:0];
    if (!indexPath || indexPath.row >= currentRowNumber) {
        WXLogError(@"Incorrect row:%ld in cellDidRendered, currentRowNumber:%ld", indexPath.row, currentRowNumber);
        return;
    }
    row = [self adjustRowForCompletedCell:row];
    
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

- (void)cell:(WXCellComponent *)cell didMoveToIndex:(NSUInteger)index
{
    NSUInteger fromRow = [_cellComponents indexOfObject:cell];
    WXAssert(fromRow != NSNotFound, @"Moving cell:%@ has not been inserted to cell list before", cell);
    fromRow = [self adjustRowForCompletedCell:fromRow];
    NSIndexPath *fromIndexPath = [NSIndexPath indexPathForRow:fromRow inSection:0];
    
    [_cellComponents removeObject:cell];
    
    [self insertSubview:cell atIndex:index];
    
    NSUInteger toRow = [_cellComponents indexOfObject:cell];
    WXAssert(toRow != NSNotFound, @"Moving cell:%@ failed", cell);
    toRow = [self adjustRowForCompletedCell:toRow];
    NSIndexPath *toIndexPath = [NSIndexPath indexPathForRow:toRow inSection:0];
    
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
    
    NSUInteger row = [self adjustRowForUnCompletedCell:indexPath.row];
    WXCellComponent *cell = [_cellComponents wx_safeObjectAtIndex:row];
    
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

- (NSUInteger)adjustRowForCompletedCell:(NSUInteger)row
{
    NSUInteger newRow = row;
    for (int i = 0; i <= row; i++) {
        WXCellComponent *cellComponent = _cellComponents[i];
        if (![_completedCells containsObject:cellComponent]) {
            newRow --;
        }
    }
    
    return newRow;
}

- (NSUInteger)adjustRowForUnCompletedCell:(NSUInteger)row
{
    for (int i = 0; i <= row && i < _cellComponents.count; i++) {
        WXCellComponent *cellComponent = _cellComponents[i];
        if (![_completedCells containsObject:cellComponent]) {
            row ++;
        }
    }
    
    return row;
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

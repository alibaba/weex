/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import "WXListComponent.h"
#import "WXCellComponent.h"
#import "WXHeaderComponent.h"
#import "WXComponent.h"
#import "WXComponent_internal.h"
#import "WXComponent+Layout.h"
#import "NSArray+Weex.h"
#import "WXAssert.h"
#import "WXMonitor.h"
#import "WXUtility.h"
#import "NSObject+WXSwizzle.h"
#import "WXSDKInstance_private.h"
#import "WXRefreshComponent.h"
#import "WXLoadingComponent.h"

@interface WXListComponent () <UITableViewDataSource, UITableViewDelegate, WXCellRenderDelegate, WXHeaderRenderDelegate>

@property (nonatomic, assign) NSUInteger currentTopVisibleSection;
// Set whether the content offset position all the way to the bottom
@property (assign, nonatomic) BOOL contentAttachBottom;

@end

@interface WXTableView : UITableView

@end

@implementation WXTableView

+ (BOOL)requiresConstraintBasedLayout
{
    return NO;
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch
{
    if ([(id <WXScrollerProtocol>) self.wx_component respondsToSelector:@selector(requestGestureShouldStopPropagation:shouldReceiveTouch:)]) {
        return [(id <WXScrollerProtocol>) self.wx_component requestGestureShouldStopPropagation:gestureRecognizer shouldReceiveTouch:touch];
    }
    else{
        return YES;
    }
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    [self.wx_component layoutDidFinish];
}

- (void)setContentOffset:(CGPoint)contentOffset
{
    // FIXME: side effect caused by hooking _adjustContentOffsetIfNecessary.
    // When UITableView is pulled down and finger releases，contentOffset will be set from -xxxx to about -0.5(greater than -0.5), then contentOffset will be reset to zero by calling _adjustContentOffsetIfNecessary.
    // So hooking _adjustContentOffsetIfNecessary will always cause remaining 1px space between list's top and navigator.
    // Demo: http://dotwe.org/895630945793a9a044e49abe39cbb77f
    // Have to reset contentOffset to zero manually here.
    if (fabs(contentOffset.y) < 0.5) {
        contentOffset.y = 0;
    }
    if (isnan(contentOffset.x)) {
        contentOffset.x = 0;
    }
    if(isnan(contentOffset.y)) {
        contentOffset.y = 0;
    }
    
    [super setContentOffset:contentOffset];
}

- (void)setFrame:(CGRect)frame {
    [super setFrame:frame];
    if (![self.wx_component isKindOfClass:[WXListComponent class]]) return;
    BOOL contentAttachBottom = [(WXListComponent *)self.wx_component contentAttachBottom];
    if (contentAttachBottom) {
        CGFloat offsetHeight = self.contentSize.height - CGRectGetHeight(self.bounds);
        if (offsetHeight >= 0) {
            [self setContentOffset:CGPointMake(0, offsetHeight) animated:NO];
        }
    }
}

- (void)setContentOffset:(CGPoint)contentOffset animated:(BOOL)animated
{
    [super setContentOffset:contentOffset animated:animated];
    BOOL scrollStartEvent = [[self.wx_component valueForKey:@"_scrollStartEvent"] boolValue];
    id scrollEventListener = [self.wx_component valueForKey:@"_scrollEventListener"];
    
    if (animated && (scrollStartEvent ||scrollEventListener)  && !WXPointEqualToPoint(contentOffset, self.contentOffset)) {
        CGFloat scaleFactor = self.wx_component.weexInstance.pixelScaleFactor;
        NSDictionary *contentSizeData = @{@"width":@(self.contentSize.width / scaleFactor),
                                          @"height":@(self.contentSize.height / scaleFactor)};
        NSDictionary *contentOffsetData = @{@"x":@(-self.contentOffset.x / scaleFactor),
                                            @"y":@(-self.contentOffset.y / scaleFactor)};
        if (scrollStartEvent) {
            [self.wx_component fireEvent:@"scrollstart" params:@{@"contentSize":contentSizeData, @"contentOffset":contentOffsetData} domChanges:nil];
        }
        if (scrollEventListener) {
            WXScrollerComponent *component = (WXScrollerComponent *)self.wx_component;
            component.scrollEventListener(component, @"scrollstart", @{@"contentSize":contentSizeData, @"contentOffset":contentOffsetData});
        }
    }
}

@end

// WXText is a non-public is not permitted
@interface WXSectionComponent : NSObject<NSCopying>

@property (nonatomic, strong) WXHeaderComponent *header;
@property (nonatomic, strong) NSMutableArray<WXCellComponent *> *rows;

@end

@implementation WXSectionComponent

- (instancetype)init
{
    if (self = [super init]) {
        _rows = [NSMutableArray array];
    }
    return self;
}

- (id)copyWithZone:(NSZone *)zone
{
    WXSectionComponent *newSection = [[[self class] allocWithZone:zone] init];
    newSection.header = _header;
    newSection.rows = [_rows mutableCopyWithZone:zone];
    
    return newSection;
}

- (NSString *)description
{
    return [NSString stringWithFormat:@"%@\n%@", [_header description], [_rows description]];
}
@end

@implementation WXListComponent
{
    __weak UITableView * _tableView;

    // Only accessed on component thread
    NSMutableArray<WXSectionComponent *> *_sections;
    // Only accessed on main thread
    NSMutableArray<WXSectionComponent *> *_completedSections;
    NSUInteger _previousLoadMoreRowNumber;
    // insert & reload & batch
    NSString *_updataType;
    
    BOOL _isUpdating;
    NSMutableArray<void(^)(void)> *_updates;
    NSTimeInterval _reloadInterval;
    
    CGPoint *_targetContentOffset;
    CGPoint _nextStepContentOffset;
}

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _sections = [NSMutableArray array];
        _completedSections = [NSMutableArray array];
        _reloadInterval = attributes[@"reloadInterval"] ? [WXConvert CGFloat:attributes[@"reloadInterval"]]/1000 : 0;
        _updataType = [WXConvert NSString:attributes[@"updataType"]]?:@"insert";
        _contentAttachBottom = [WXConvert BOOL:attributes[@"contentAttachBottom"]];
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
    
    _tableView.estimatedRowHeight = 0;
    _tableView.estimatedSectionFooterHeight = 0;
    _tableView.estimatedSectionHeaderHeight = 0;
    
#if (defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 150000)
    /// __IPHONE_15_0 Adaptation
    if (@available(iOS 15.0, *)) {
        _tableView.prefetchingEnabled = false;
        _tableView.sectionHeaderTopPadding = 0;
    }
#endif
}

- (void)viewWillUnload
{
    [super viewWillUnload];
    
    _tableView.delegate = nil;
    _tableView.dataSource = nil;
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    [super updateAttributes:attributes];
    
    if (attributes[@"reloadInterval"]) {
        _reloadInterval = [WXConvert CGFloat:attributes[@"reloadInterval"]] / 1000;
    }
    if (attributes[@"updataType"]) {
        _updataType = [WXConvert NSString:attributes[@"updataType"]];
    }
    if (attributes[@"contentAttachBottom"]) {
        _contentAttachBottom = [WXConvert BOOL:attributes[@"contentAttachBottom"]];
    }
}

- (void)setContentSize:(CGSize)contentSize
{
    // Do Nothing
}

- (void)_handleFirstScreenTime
{
    // Do Nothing， firstScreenTime is set by cellDidRendered:
}

- (void)scrollToComponent:(WXComponent *)component withOffset:(CGFloat)offset animated:(BOOL)animated
{
    UIScrollView *scrollView = (UIScrollView *)self.view;
    // http://dotwe.org/vue/aa1af34e5fc745c0f1520e346904682a
    // ignore scroll action if contentSize smaller than scroller frame
    if (scrollView.contentSize.height < scrollView.frame.size.height) {
        return;
    }
    
    CGPoint contentOffset = _tableView.contentOffset;
    CGFloat contentOffsetY = 0;
    
    WXComponent *cellComponent = component;
    CGRect cellRect;
    while (cellComponent) {
        if ([cellComponent isKindOfClass:[WXCellComponent class]]) {
            NSIndexPath *toIndexPath = [self indexPathForCell:(WXCellComponent*)cellComponent sections:_completedSections];
            cellRect = [_tableView rectForRowAtIndexPath:toIndexPath];
            break;
        }
        if ([cellComponent isKindOfClass:[WXHeaderComponent class]]) {
            NSUInteger toIndex = [self indexForHeader:(WXHeaderComponent *)cellComponent sections:_completedSections];
            cellRect = [_tableView rectForSection:toIndex];
            break;
        }
        contentOffsetY += cellComponent.calculatedFrame.origin.y;
        cellComponent = cellComponent.supercomponent;
    }
    
    contentOffsetY += cellRect.origin.y;
    contentOffsetY += offset * self.weexInstance.pixelScaleFactor;
    
    if (self.snapData.useSnap) {
        CGFloat snapOffset = [self.snapData calcScrollSnapPositionOffset];
        contentOffsetY -= (offset * self.weexInstance.pixelScaleFactor + snapOffset);
        if (self.snapData.alignment == WXScrollSnapAlignCenter) {
            contentOffsetY += (cellRect.size.height / 2);
        } else if (self.snapData.alignment == WXScrollSnapAlignEnd) {
            contentOffsetY += cellRect.size.height;
        }
        if (contentOffsetY < 0) {
            contentOffsetY = 0;
        }
    }
    if (_tableView.contentSize.height >= _tableView.frame.size.height && contentOffsetY > _tableView.contentSize.height - _tableView.frame.size.height) {
        contentOffset.y = _tableView.contentSize.height - _tableView.frame.size.height;
    } else {
        contentOffset.y = contentOffsetY;
    }
    
    [_tableView setContentOffset:contentOffset animated:animated];
}


#pragma mark - Inheritance

- (BOOL)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    if ([subcomponent isKindOfClass:[WXCellComponent class]]) {
        ((WXCellComponent *)subcomponent).delegate = self;
    } else if ([subcomponent isKindOfClass:[WXHeaderComponent class]]) {
        ((WXHeaderComponent *)subcomponent).delegate = self;
    } else if (![subcomponent isKindOfClass:[WXRefreshComponent class]]
               && ![subcomponent isKindOfClass:[WXLoadingComponent class]]
               && subcomponent->_positionType != WXPositionTypeFixed) {
        WXLogError(@"list only support cell/header/refresh/loading/fixed-component as child.");
        subcomponent->_isViewTreeIgnored = YES; // do not show this element.
    }
    
    BOOL inserted = [super _insertSubcomponent:subcomponent atIndex:index];
    
    if (![subcomponent isKindOfClass:[WXHeaderComponent class]]
        && ![subcomponent isKindOfClass:[WXCellComponent class]]) {
        // Don't insert section if subcomponent is not header or cell
        return inserted;
    }
    
    NSIndexPath *indexPath = [self indexPathForSubIndex:index];
    
    if ([subcomponent isKindOfClass:[WXHeaderComponent class]] || _sections.count <= indexPath.section) {
        // conditions to insert section: insert a header or insert first cell of table view
        // this will be updated by recycler's update controller in the future
        WXSectionComponent *insertSection = [WXSectionComponent new];
        BOOL keepScrollPosition = NO;
        if ([subcomponent isKindOfClass:[WXHeaderComponent class]]) {
            WXHeaderComponent *header = (WXHeaderComponent*)subcomponent;
            insertSection.header = header;
            keepScrollPosition = header.keepScrollPosition;
        }
        
        NSUInteger insertIndex = indexPath.section;
        WXSectionComponent *reloadSection;
        if (insertIndex > 0 && insertIndex <= _sections.count
            && [subcomponent isKindOfClass:[WXHeaderComponent class]]) {
            // insert a header in the middle, one section may divide into two
            // so the original section need to be reloaded
            
            /*
             Here we may encounter a problem that _sections is not always containing all cells of list.
             Because cell are not added to _sections until cellDidLayout. So if a cell is not added to _sections,
             
                NSIndexPath *indexPathBeforeHeader = [self indexPathForSubIndex:index - 1];
             The indexPathForSubIndex method use all sub components of list to calculate row in section. This would
             be incorrect if a cell is not added to _sections. And the split is incorrect resulting some cells put to
             wrong WXSectionComponent and then UITableView crash.
             
             In fixed version, we use _subcomponents[index - 1] to get the last component that should be put to original section
             and get the index of it in section rows.
             */
            
            if (_sections[insertIndex - 1].rows.count > 0) {
                WXComponent* componentBeforeHeader = _subcomponents[index - 1];
                
                NSArray *rowsToSeparate = _sections[insertIndex - 1].rows;
                NSUInteger indexOfLastComponentAfterSeparate = [rowsToSeparate indexOfObject:componentBeforeHeader];
                if (indexOfLastComponentAfterSeparate != NSNotFound && componentBeforeHeader != [rowsToSeparate lastObject]) {
                    reloadSection = _sections[insertIndex - 1];
                    insertSection.rows = [[rowsToSeparate subarrayWithRange:NSMakeRange(indexOfLastComponentAfterSeparate + 1, rowsToSeparate.count - (indexOfLastComponentAfterSeparate + 1))] mutableCopy];
                    reloadSection.rows = [[rowsToSeparate subarrayWithRange:NSMakeRange(0, indexOfLastComponentAfterSeparate + 1)]  mutableCopy];
                }
            }
            
//          This is wrong!!!
//            NSIndexPath *indexPathBeforeHeader = [self indexPathForSubIndex:index - 1];
//            if (_sections[insertIndex - 1].rows.count != 0 && indexPathBeforeHeader.row < _sections[insertIndex - 1].rows.count - 1) {
//                reloadSection = _sections[insertIndex - 1];
//                NSArray *rowsToSeparate = reloadSection.rows;
//                insertSection.rows = [[rowsToSeparate subarrayWithRange:NSMakeRange(indexPathBeforeHeader.row + 1, rowsToSeparate.count - indexPathBeforeHeader.row - 1)] mutableCopy];
//                reloadSection.rows = [[rowsToSeparate subarrayWithRange:NSMakeRange(0, indexPathBeforeHeader.row + 1)]  mutableCopy];
//            }
        }
    
        [_sections insertObject:insertSection atIndex:insertIndex];
        WXSectionComponent *completedInsertSection = [insertSection copy];
        WXSectionComponent *completedReloadSection;
        if (reloadSection) {
            completedReloadSection = [reloadSection copy];
        }
        
        [self.weexInstance.componentManager _addUITask:^{
            WXLogDebug(@"Insert section:%ld", (unsigned long)insertIndex);
            
            [UIView performWithoutAnimation:^{
                
                @try {
                    [_tableView beginUpdates];
                    
                    [_completedSections insertObject:completedInsertSection atIndex:insertIndex];
                    if (completedReloadSection) {
                        WXLogDebug(@"Reload section:%lu", (unsigned long)(insertIndex - 1));
                        _completedSections[insertIndex - 1] = completedReloadSection;
                    }
                    
                    [self _insertTableViewSectionAtIndex:insertIndex keepScrollPosition:keepScrollPosition animation:UITableViewRowAnimationNone];
                    
                    if (completedReloadSection) {
                        [_tableView reloadSections:[NSIndexSet indexSetWithIndex:insertIndex - 1] withRowAnimation:UITableViewRowAnimationNone];
                    }
                    
                    [_tableView endUpdates];
                } @catch (NSException *exception) {
                    WXLogError(@"list insert component occurs exception %@", exception);
                }
                
            }];
            
        }];
        
    }
    
    return inserted;
}

- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    //Here will not insert cell or header's view again
    if (![subcomponent isKindOfClass:[WXCellComponent class]]
        && ![subcomponent isKindOfClass:[WXHeaderComponent class]]) {
        [super insertSubview:subcomponent atIndex:index];
    }
}

#pragma mark - WXHeaderRenderDelegate

- (float)headerWidthForLayout:(WXHeaderComponent *)cell
{
    return [self safeContainerStyleWidth];
}

- (void)headerDidLayout:(WXHeaderComponent *)header
{
    [self.weexInstance.componentManager _addUITask:^{
        // trigger section header update
        [UIView performWithoutAnimation:^{
            [_tableView beginUpdates];
            
            NSUInteger reloadIndex = [self indexForHeader:header sections:_completedSections];
            [_tableView reloadSections:[NSIndexSet indexSetWithIndex:reloadIndex] withRowAnimation:UITableViewRowAnimationNone];
            
            [_tableView endUpdates];
        }];
    }];
}

- (void)headerDidRemove:(WXHeaderComponent *)header
{
    NSUInteger headerIndex = [self indexForHeader:header sections:_sections];
    // this will be updated by recycler's update controller in the future
    WXSectionComponent *headerSection = _sections[headerIndex];
    WXSectionComponent *reloadSection;
    NSUInteger reloadIndex = -1;
    BOOL isDeleteSection = NO;
    if (headerIndex == 0 && headerSection.rows.count > 0) {
        // delete a header in the first section and the section still has cells
        // reload the first section
        reloadIndex = 0;
        reloadSection = _sections[reloadIndex];
        _sections[reloadIndex].header = nil;
    } else if (headerIndex > 0 && headerSection.rows.count > 0) {
        // delete a header in the middle, two sections merge into one
        // so one section need to be deleted and the other should be relo
        isDeleteSection = YES;
        reloadIndex = headerIndex - 1;
        reloadSection = _sections[reloadIndex];
        reloadSection.rows = [[reloadSection.rows arrayByAddingObjectsFromArray:headerSection.rows] mutableCopy];
        [_sections removeObjectAtIndex:headerIndex];
    } else {
        // delete a header with no cell in that section
        // just delete the section
        isDeleteSection = YES;
        [_sections removeObjectAtIndex:headerIndex];
    }
    
    WXSectionComponent *completedReloadSection;
    if (reloadSection) {
        completedReloadSection = [reloadSection copy];
    }
    BOOL keepScrollPosition = header.keepScrollPosition;
    
    [self.weexInstance.componentManager _addUITask:^{
        if (isDeleteSection) {
            WXLogDebug(@"delete section:%lu", (unsigned long)headerIndex);
            [_completedSections removeObjectAtIndex:headerIndex];
        }
        
        if (reloadIndex == 0 && !isDeleteSection) {
            _completedSections[reloadIndex].header = nil;
        }
        
        if (completedReloadSection) {
            WXLogDebug(@"Reload section:%lu", (unsigned long)reloadIndex);
            _completedSections[reloadIndex] = completedReloadSection;
        }
        
        [UIView performWithoutAnimation:^{
            [_tableView beginUpdates];
            if (isDeleteSection) {
                [self _deleteTableViewSectionAtIndex:headerIndex keepScrollPosition:keepScrollPosition animation:UITableViewRowAnimationNone];
            }
            
            if (completedReloadSection) {
                [_tableView reloadSections:[NSIndexSet indexSetWithIndex:reloadIndex] withRowAnimation:UITableViewRowAnimationNone];
            }
            
            [_tableView endUpdates];
        }];
        
    }];
}

#pragma mark - WXCellRenderDelegate

- (float)containerWidthForLayout:(WXCellComponent *)cell
{
    return [self safeContainerStyleWidth];
}

- (void)cellDidRemove:(WXCellComponent *)cell
{
    WXAssertComponentThread();
    
    NSIndexPath *indexPath = [self indexPathForCell:cell sections:_sections];
    if(!indexPath){
        //protect when cell not exist in sections
        return;
    }
    [self removeCellForIndexPath:indexPath withSections:_sections];
    
    [self.weexInstance.componentManager _addUITask:^{
        [self removeCellForIndexPath:indexPath withSections:_completedSections];
        
        WXLogDebug(@"Delete cell:%@ at indexPath:%@", cell.ref, indexPath);
        if (cell.deleteAnimation == UITableViewRowAnimationNone) {
            [UIView performWithoutAnimation:^{
                [self _deleteTableViewCellAtIndexPath:indexPath keepScrollPosition:cell.keepScrollPosition animation:UITableViewRowAnimationNone];
            }];
        } else {
            [self _deleteTableViewCellAtIndexPath:indexPath keepScrollPosition:cell.keepScrollPosition animation:cell.deleteAnimation];
        }
    }];
}

- (void)cellDidLayout:(WXCellComponent *)cell
{
    WXAssertComponentThread() ;
    
    NSUInteger index = [self.subcomponents indexOfObject:cell];
    NSIndexPath *indexPath = [self indexPathForSubIndex:index];

    NSInteger sectionNum = indexPath.section;
    if (sectionNum >= [_sections count] || sectionNum < 0) {
        // try to protect sectionNum out of range.
        return;
    }
    NSInteger row = indexPath.row;
    NSMutableArray *sections = _sections;
    WXSectionComponent *section = sections[sectionNum];
    WXAssert(section, @"no section found for section number:%ld", sectionNum);
    NSMutableArray *completedSections;
    BOOL isReload = [section.rows containsObject:cell];
    if (!isReload && row > [section.rows count]) {
        // protect crash when row out of bounds
        return ;
    }
    if (!isReload) {
        [section.rows insertObject:cell atIndex:row];
        // deep copy
        completedSections = [[NSMutableArray alloc] initWithArray:sections copyItems:YES];;
    }
    
    [self.weexInstance.componentManager _addUITask:^{
        if (!isReload) {
            WXLogDebug(@"Insert cell:%@ at indexPath:%@", cell.ref, indexPath);
            _completedSections = completedSections;
            if (cell.insertAnimation == UITableViewRowAnimationNone) {
                [UIView performWithoutAnimation:^{
                    [self _insertTableViewCellAtIndexPath:indexPath keepScrollPosition:cell.keepScrollPosition animation:UITableViewRowAnimationNone];
                }];
            } else {
                [self _insertTableViewCellAtIndexPath:indexPath keepScrollPosition:cell.keepScrollPosition animation:cell.insertAnimation];
            }
        } else {
            WXLogInfo(@"Reload cell:%@ at indexPath:%@", cell.ref, indexPath);
            [UIView performWithoutAnimation:^{
                [_tableView reloadRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:UITableViewRowAnimationNone];
                [self handleAppear];
            }];
        }
    }];
}

- (void)cellDidRendered:(WXCellComponent *)cell
{
    WXAssertMainThread();
    
    if (WX_MONITOR_INSTANCE_PERF_IS_RECORDED(WXPTFirstScreenRender, self.weexInstance) && !self.weexInstance.onRenderProgress) {
        // improve performance
        return;
    }
    
    NSIndexPath *indexPath = [self indexPathForCell:cell sections:_completedSections];
    if (!indexPath || indexPath.section >= [_tableView numberOfSections] ||
        indexPath.row < 0 || indexPath.row >= [_tableView numberOfRowsInSection:indexPath.section]) {
        WXLogWarning(@"Rendered cell:%@ out of range, sections:%@", cell, _completedSections);
        return;
    }
    
    CGRect cellRect = [_tableView rectForRowAtIndexPath:indexPath];
    if (cellRect.origin.y + cellRect.size.height >= _tableView.frame.size.height) {
        WX_MONITOR_INSTANCE_PERF_END(WXPTFirstScreenRender, self.weexInstance);
    }
    
    if (self.weexInstance.onRenderProgress) {
        CGRect renderRect = [_tableView convertRect:cellRect toView:self.weexInstance.rootView];
        self.weexInstance.onRenderProgress(renderRect);
    }
}

- (void)cell:(WXCellComponent *)cell didMoveToIndex:(NSUInteger)index
{
    WXAssertComponentThread();
    
    NSIndexPath *fromIndexPath = [self indexPathForCell:cell sections:_sections];
    NSIndexPath *toIndexPath = [self indexPathForSubIndex:index];
    if (toIndexPath.row > [_sections[toIndexPath.section].rows count] || toIndexPath.row < 0) {
    //FIXME: WXLogError trigger crash
//        WXLogError(@"toIndexPath %@ is out of range as the current is %lu",toIndexPath ,(unsigned long)[_sections[toIndexPath.section].rows count]);
        return;
    }
    [self removeCellForIndexPath:fromIndexPath withSections:_sections];
    [self insertCell:cell forIndexPath:toIndexPath withSections:_sections];
    
    [self.weexInstance.componentManager _addUITask:^{
        if (_reloadInterval > 0) {
            // use [UITableView reloadData] to do batch updates, will move to recycler's update controller
            __weak typeof(self) weakSelf = self;
            if (!_updates) {
                _updates = [NSMutableArray array];
            }
            [_updates addObject:^{
                __strong typeof(weakSelf) strongSelf = weakSelf;
                [strongSelf removeCellForIndexPath:fromIndexPath withSections:strongSelf->_completedSections];
                [strongSelf insertCell:cell forIndexPath:toIndexPath withSections:strongSelf->_completedSections];
            }];
            
            [self checkReloadData];
        } else {
            [self removeCellForIndexPath:fromIndexPath withSections:_completedSections];
            [self insertCell:cell forIndexPath:toIndexPath withSections:_completedSections];
            [UIView performWithoutAnimation:^{
                @try {
                    [_tableView beginUpdates];
                    [_tableView moveRowAtIndexPath:fromIndexPath toIndexPath:toIndexPath];
                    [self handleAppear];
                    [_tableView endUpdates];
                }@catch(NSException * exception){
                    WXLogDebug(@"move cell exception: %@", [exception description]);
                }
            }];
        }
    }];
}

- (void)checkReloadData
{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(_reloadInterval * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (_isUpdating || _updates.count == 0) {
            return ;
        }
        
        _isUpdating = YES;
        NSArray *updates = [_updates copy];
        [_updates removeAllObjects];
        for (void(^update)(void) in updates) {
            update();
        }
        [_tableView reloadData];
        _isUpdating = NO;
        
        [self checkReloadData];
    });
}

- (void)addStickyComponent:(WXComponent *)sticky
{
    
}

- (void)removeStickyComponent:(WXComponent *)sticky
{

}
#pragma mark - TableView delegate

- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    
}

- (void)tableView:(UITableView *)tableView didEndDisplayingCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    WXLogDebug(@"Did end displaying cell:%@, at index path:%@", cell, indexPath);
    NSArray *visibleIndexPaths = [tableView indexPathsForVisibleRows];
    if (![visibleIndexPaths containsObject:indexPath]) {
        if (cell.contentView.subviews.count > 0) {
            UIView *wxCellView = [cell.contentView.subviews firstObject];
            // Must invoke synchronously otherwise it will remove the view just added.
            WXCellComponent *cellComponent = (WXCellComponent *)wxCellView.wx_component;
            if (cellComponent.isRecycle) {
                [cellComponent _unloadViewWithReusing:YES];
            }
        }
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    WXCellComponent *cell = [self cellForIndexPath:indexPath];
    return cell.calculatedFrame.size.height;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    WXHeaderComponent *header = ((WXSectionComponent *)[_completedSections wx_safeObjectAtIndex:section]).header;
    if (header) {
        return header.calculatedFrame.size.height;
    } else {
        return 0.0;
    }
}

- (NSIndexPath *)getNeighbouringIndexPath:(NSIndexPath *)currentIndexPath findNext:(BOOL)findNext {
    NSIndexPath *neighbourIndexPath;
    if (findNext) {
        if (currentIndexPath.row == _completedSections[currentIndexPath.section].rows.count - 1) {
            if (currentIndexPath.section == _completedSections.count-1) {// the last cell
                neighbourIndexPath = [NSIndexPath indexPathForRow:currentIndexPath.row inSection:currentIndexPath.section];
            } else {// the first cell on next section
                neighbourIndexPath = [NSIndexPath indexPathForRow:0 inSection:currentIndexPath.section+1];
            }
        } else {// the next cell
            neighbourIndexPath = [NSIndexPath indexPathForRow:currentIndexPath.row+1 inSection:currentIndexPath.section];
        }
    } else {
        if (currentIndexPath.row == 0) {
            if (currentIndexPath.section == 0) {// the first cell
                neighbourIndexPath = [NSIndexPath indexPathForRow:0 inSection:0];
            } else {// the last cell on previous section
                neighbourIndexPath = [NSIndexPath indexPathForRow:_completedSections[currentIndexPath.section-1].rows.count-1 inSection:currentIndexPath.section-1];
            }
        } else {// the previous cell
            neighbourIndexPath = [NSIndexPath indexPathForRow:currentIndexPath.row-1 inSection:currentIndexPath.section];
        }
    }
    return neighbourIndexPath;
}


- (CGPoint)calculateSnapPosition:(UIScrollView *)scrollView withVelocity:(CGPoint)velocity startPosition:(CGPoint)startPosition targetPosition:(CGPoint)preTargetPosition{
    [self.snapData bindingScrollView:scrollView];
    WXTableView *tableView = (WXTableView *)scrollView;
    /// The offset for start position, to avoid the start position error in continuous sliding if last sliding was not finished
    CGFloat kstartPositionOffset = 10.f;
    
    /// The snap point of scroll container when finger touch down
    self.snapData.startPosition = startPosition;
    CGPoint snapContainerPosition, currentOffset;
    CGPoint currentPoint = scrollView.contentOffset;
    /// The offset of the snap point relative to the container vertex
    CGFloat snapOffset = [self.snapData calcScrollSnapPositionOffset];
    if (self.scrollDirection == WXScrollDirectionHorizontal) {
        currentOffset = CGPointMake(currentPoint.x-startPosition.x, currentPoint.y);
        snapContainerPosition = CGPointMake(startPosition.x + snapOffset, startPosition.y);
    } else {
        currentOffset = CGPointMake(currentPoint.x, currentPoint.y-startPosition.y);
        snapContainerPosition = CGPointMake(startPosition.x, startPosition.y + snapOffset);
    }
    /// Calculate snap staus
    WXScrollSnapStatus snapStatus = [self.snapData shouldTriggerSnap:currentOffset velocity:velocity];
    
    CGPoint targetContentOffset = startPosition;
    if (currentPoint.x < 0 || currentPoint.y < 0) {
        return targetContentOffset;
    }
    /// Bounce to origin offset
    if (snapStatus == WXScrollSnapNone) {
        return targetContentOffset;
    }
    
    /// Determine the start position, if align-start + 4, else if align-end - 4
    CGPoint correctSnapPosition = snapContainerPosition;
    if (self.scrollDirection == WXScrollDirectionHorizontal) {
        switch (self.snapData.alignment) {
            case WXScrollSnapAlignStart:
                correctSnapPosition.x += kstartPositionOffset;
                break;
            case WXScrollSnapAlignEnd:
                correctSnapPosition.x -= kstartPositionOffset;
                break;
            default:
                break;
        }
    } else {
        switch (self.snapData.alignment) {
            case WXScrollSnapAlignStart:
                correctSnapPosition.y += kstartPositionOffset;
                break;
            case WXScrollSnapAlignEnd:
                correctSnapPosition.y -= kstartPositionOffset;
                break;
            default:
                break;
        }
    }
    /// The cell corresponding to the starting point
    NSIndexPath *beginIndexPath = [tableView indexPathForRowAtPoint:correctSnapPosition];
    CGRect beginCellRect = [tableView rectForRowAtIndexPath:beginIndexPath];
    if (CGRectIsNull(beginCellRect)) {
        return targetContentOffset;
    }
    NSIndexPath *targetIndexPath = beginIndexPath;
    
    if (snapStatus == WXScrollSnapStay) {
        // Do nothing
    } else {
        NSIndexPath *lastIndexPath = beginIndexPath;
        targetIndexPath = [self getNeighbouringIndexPath:beginIndexPath findNext:(snapStatus == WXScrollSnapToNext)];
        WXCellComponent *cell = [self cellForIndexPath:targetIndexPath];
        while (cell.ignoreScrollSnap && [lastIndexPath compare:targetIndexPath] != NSOrderedSame) {
            lastIndexPath = targetIndexPath;
            targetIndexPath = [self getNeighbouringIndexPath:targetIndexPath findNext:(snapStatus == WXScrollSnapToNext)];
            cell = [self cellForIndexPath:targetIndexPath];
        }
    }
    
    CGRect targetCellRect = [tableView rectForRowAtIndexPath:targetIndexPath];
    
    if (self.scrollDirection == WXScrollDirectionVertical) {
        targetContentOffset.y = targetCellRect.origin.y - snapOffset;
        if (self.snapData.alignment == WXScrollSnapAlignCenter) {
            targetContentOffset.y += (targetCellRect.size.height / 2);
        } else if (self.snapData.alignment == WXScrollSnapAlignEnd) {
            targetContentOffset.y += targetCellRect.size.height;
        }
        if (targetContentOffset.y < 0) {
            targetContentOffset.y = 0;
        }
    } else {
        targetContentOffset.x = targetCellRect.origin.x - snapOffset;
        if (self.snapData.alignment == WXScrollSnapAlignCenter) {
            targetContentOffset.x += (targetCellRect.size.width / 2);
        } else if (self.snapData.alignment == WXScrollSnapAlignEnd) {
            targetContentOffset.x += targetCellRect.size.width;
        }
        if (targetContentOffset.x < 0) {
            targetContentOffset.x = 0;
        }
    }
    WXLogInfo(@"[scroll snap] veloc:%.2f (%.2f,%.2f)=>(%.2f,%.2f)", velocity.y, startPosition.x, startPosition.y, targetContentOffset.x, targetContentOffset.y);
    self.snapData.targetIndexPath = targetIndexPath;
    self.snapData.snapping = true;
    
    return targetContentOffset;
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    [super scrollViewDidScroll:scrollView];
    if ([[_tableView indexPathsForVisibleRows] count] > 0) {
        NSIndexPath *topCellPath = [[_tableView indexPathsForVisibleRows] objectAtIndex:0];
        if (self.currentTopVisibleSection != topCellPath.section) {
            if (self.currentTopVisibleSection) {
                WXSectionComponent *removeSection = [_sections wx_safeObjectAtIndex:self.currentTopVisibleSection];
                if (removeSection.header && [removeSection.header.events containsObject:@"unsticky"]) {
                    [removeSection.header fireEvent:@"unsticky" params:nil];
                }
            }
            self.currentTopVisibleSection = topCellPath.section;
            WXSectionComponent *showSection = [_sections wx_safeObjectAtIndex:topCellPath.section];
            if (showSection.header && [showSection.header.events containsObject:@"sticky"]) {
                [showSection.header fireEvent:@"sticky" params:nil];
            }
        }
    }
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    WXHeaderComponent *header = ((WXSectionComponent *)_completedSections[section]).header;
    WXLogDebug(@"header view for section %ld:%@", (long)section, header.view);
    return header.view;
}

#pragma mark - TableView Data Source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return _completedSections.count;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return ((WXSectionComponent *)[_completedSections wx_safeObjectAtIndex:section]).rows.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    WXLogDebug(@"Getting cell at indexPath:%@", indexPath);
    static NSString *reuseIdentifier = @"WXTableViewCell";
    
    UITableViewCell *cellView = [_tableView dequeueReusableCellWithIdentifier:reuseIdentifier];
    if (!cellView) {
        cellView = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseIdentifier];
        cellView.backgroundColor = [UIColor clearColor];
    }
    
    WXCellComponent *cell = [self cellForIndexPath:indexPath];
    
    if (cell.zIndex) {
        cellView.layer.zPosition = [WXConvert CGFloat:cell.zIndex];
    }
    
    if (!cell) {
        return cellView;
    }
    
    if (cell.view.superview == cellView.contentView) {
        return cellView;
    }
    
    for (UIView *view in cellView.contentView.subviews) {
        [view removeFromSuperview];
    }
    
    [cellView.contentView addSubview:cell.view];
    
    [cellView setAccessibilityIdentifier:cell.view.accessibilityIdentifier];
    
    WXLogDebug(@"Created cell:%@ view:%@ cellView:%@ at indexPath:%@", cell.ref, cell.view, cellView, indexPath);
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
    
    _previousLoadMoreRowNumber = [self totalNumberOfRows];
}

- (BOOL)isNeedLoadMore
{
    BOOL superNeedLoadMore = [super isNeedLoadMore];
    return superNeedLoadMore && _previousLoadMoreRowNumber != [self totalNumberOfRows];
}

- (NSUInteger)totalNumberOfRows
{
    NSUInteger rowNumber = 0;
    NSUInteger sectionCount = [_tableView numberOfSections];
    for (int section = 0; section < sectionCount; section ++) {
        rowNumber += [_tableView numberOfRowsInSection:section];
    }
    
    return rowNumber;
}

- (void)resetLoadmore{
    [super resetLoadmore];
    _previousLoadMoreRowNumber=0;
}

#pragma mark Private

- (WXCellComponent *)cellForIndexPath:(NSIndexPath *)indexPath
{
    WXSectionComponent *section = [_completedSections wx_safeObjectAtIndex:indexPath.section];
    if (!section) {
        WXLogError(@"No section found for num:%ld, completed sections:%ld", (long)indexPath.section, (unsigned long)_completedSections.count);
        return nil;
    }
    
    WXCellComponent *cell = [section.rows wx_safeObjectAtIndex:indexPath.row];
    if (!cell) {
        WXLogError(@"No cell found for num:%ld, completed rows:%ld", (long)indexPath.row, (unsigned long)section.rows.count);
        return nil;
    }
    
    return cell;
}

- (void)insertCell:(WXCellComponent *)cell forIndexPath:(NSIndexPath *)indexPath withSections:(NSMutableArray *)sections
{
    WXSectionComponent *section = [sections wx_safeObjectAtIndex:indexPath.section];
    if (indexPath.row > [section.rows count] || indexPath.row < 0) {
        WXLogError(@"inserting cell at indexPath:%@ outof range, sections:%@", indexPath, sections);
        return;
    }
    WXAssert(section, @"inserting cell at indexPath:%@ section has not been inserted to list before, sections:%@", indexPath, sections);
    WXAssert(indexPath.row <= section.rows.count, @"inserting cell at indexPath:%@ outof range, sections:%@", indexPath, sections);
    [section.rows insertObject:cell atIndex:indexPath.row];
}

- (void)removeCellForIndexPath:(NSIndexPath *)indexPath withSections:(NSMutableArray *)sections
{
    WXSectionComponent *section = [sections wx_safeObjectAtIndex:indexPath.section];
    if (0 == [section.rows count]) {
        return;
    }
    WXAssert(section, @"Removing cell at indexPath:%@ has not been inserted to cell list before, sections:%@", indexPath, sections);
    WXAssert(indexPath.row < section.rows.count, @"Removing cell at indexPath:%@ outof range, sections:%@", indexPath, sections);
    [section.rows removeObjectAtIndex:indexPath.row];
}

- (NSIndexPath *)indexPathForCell:(WXCellComponent *)cell sections:(NSMutableArray<WXSectionComponent *> *)sections
{
    __block NSIndexPath *indexPath;
    [sections enumerateObjectsUsingBlock:^(WXSectionComponent * _Nonnull section, NSUInteger sectionIndex, BOOL * _Nonnull sectionStop) {
        [section.rows enumerateObjectsUsingBlock:^(WXCellComponent * _Nonnull row, NSUInteger rowIndex, BOOL * _Nonnull stop) {
            if (row == cell) {
                indexPath = [NSIndexPath indexPathForRow:rowIndex inSection:sectionIndex];
                *stop = YES;
                *sectionStop = YES;
            }
        }];
    }];
    
    return indexPath;
}

- (NSUInteger)indexForHeader:(WXHeaderComponent *)header sections:(NSMutableArray<WXSectionComponent *> *)sections
{
    __block NSUInteger index;
    [sections enumerateObjectsUsingBlock:^(WXSectionComponent * _Nonnull section, NSUInteger sectionIndex, BOOL * _Nonnull stop) {
        if (section.header == header) {
            index = sectionIndex;
            *stop = YES;
        }
    }];
    
    return index;
}

- (NSIndexPath *)indexPathForSubIndex:(NSUInteger)index
{
    NSInteger section = 0;
    NSInteger row = -1;
    WXComponent *firstComponent;
    for (int i = 0; i <= index; i++) {
        WXComponent* component = [self.subcomponents wx_safeObjectAtIndex:i];
        if (!component) {
            continue;
        }
        if (([component isKindOfClass:[WXHeaderComponent class]]
            || [component isKindOfClass:[WXCellComponent class]])
            && !firstComponent) {
            firstComponent = component;
        }
        
        if (component != firstComponent && [component isKindOfClass:[WXHeaderComponent class]]) {
            section ++;
            row = -1;
        }
        
        if ([component isKindOfClass:[WXCellComponent class]]) {
            row ++;
        }
    }

    return [NSIndexPath indexPathForRow:row inSection:section];
}

- (void)_performUpdates:(void(^)(void))updates withKeepScrollPosition:(BOOL)keepScrollPosition adjustmentBlock:(CGFloat(^)(NSIndexPath *topVisibleCell))adjustmentBlock
{
    CGFloat adjustment = 0;
    
    // keep the scroll position when inserting or deleting sections/rows by adjusting the content offset
    if (keepScrollPosition) {
        NSIndexPath *top = _tableView.indexPathsForVisibleRows.firstObject;
        adjustment = adjustmentBlock(top);
    }
    
    updates();
    
    if (keepScrollPosition) {
        CGPoint afterContentOffset = _tableView.contentOffset;
        CGPoint newContentOffset = CGPointMake(afterContentOffset.x, afterContentOffset.y + ceilf(adjustment));
        _tableView.contentOffset = newContentOffset;
    }
    
    [self handleAppear];
}

- (void)_insertTableViewSectionAtIndex:(NSUInteger)section keepScrollPosition:(BOOL)keepScrollPosition animation:(UITableViewRowAnimation)animation
{
    [self _performUpdates:^{
        // catch system exception under 11.2 https://forums.developer.apple.com/thread/49676
        @try {
            [_tableView insertSections:[NSIndexSet indexSetWithIndex:section] withRowAnimation:animation];
        } @catch(NSException *) {//!OCLint
            
        }
    } withKeepScrollPosition:keepScrollPosition adjustmentBlock:^CGFloat(NSIndexPath *top) {
        if (section <= top.section) {
            return [self tableView:_tableView heightForHeaderInSection:section];
        } else {
            return 0.0;
        }
    }];
}

- (void)_deleteTableViewSectionAtIndex:(NSUInteger)section keepScrollPosition:(BOOL)keepScrollPosition animation:(UITableViewRowAnimation)animation
{
    [self _performUpdates:^{
        // catch system exception under 11.2 https://forums.developer.apple.com/thread/49676
        @try {
            [_tableView deleteSections:[NSIndexSet indexSetWithIndex:section] withRowAnimation:animation];
        } @catch(NSException *) {//!OCLint
            
        }

    } withKeepScrollPosition:keepScrollPosition adjustmentBlock:^CGFloat(NSIndexPath *top) {
        if (section <= top.section) {
            return [self tableView:_tableView heightForHeaderInSection:section];
        } else {
            return 0.0;
        }
    }];
}

- (void)_insertTableViewCellAtIndexPath:(NSIndexPath *)indexPath keepScrollPosition:(BOOL)keepScrollPosition animation:(UITableViewRowAnimation)animation
{
    [self _performUpdates:^{
        if ([_updataType  isEqual: @"reload"]) {
            [_tableView reloadData];
        } else {
            // catch system exception under 11.2 https://forums.developer.apple.com/thread/49676
            @try {
                [_tableView insertRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:animation];
            } @catch(NSException *e) {//!OCLint
                
            }
        }
    } withKeepScrollPosition:keepScrollPosition adjustmentBlock:^CGFloat(NSIndexPath *top) {
        if (([indexPath compare:top] <= 0) || [_updataType  isEqual: @"reload"]) {
            return [self tableView:_tableView heightForRowAtIndexPath:indexPath];
        } else {
            return 0.0;
        }
    }];
}

- (void)_deleteTableViewCellAtIndexPath:(NSIndexPath *)indexPath keepScrollPosition:(BOOL)keepScrollPosition animation:(UITableViewRowAnimation)animation
{
    if (!indexPath) {
        return ;
    }
    [self _performUpdates:^{
        // catch system exception under 11.2 https://forums.developer.apple.com/thread/49676
        @try {
            [_tableView deleteRowsAtIndexPaths:[NSArray arrayWithObject:indexPath] withRowAnimation:animation];
        } @catch (NSException* e) {//!OCLint
            
        }
    } withKeepScrollPosition:keepScrollPosition adjustmentBlock:^CGFloat(NSIndexPath *top) {
        if ([indexPath compare:top] <= 0) {
            return [self tableView:_tableView heightForRowAtIndexPath:indexPath];
        } else {
            return 0.0;
        }
    }];
}

// Hook _adjustContentOffsetIfNecessary will cause UITableView freezing if bounces is set to NO.
- (void)fixFlicker
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        // FIXME:(ง •̀_•́)ง┻━┻ Stupid scoll view, always reset content offset to zero by calling _adjustContentOffsetIfNecessary after insert cells.
        // So if you pull down list while list is rendering, the list will be flickering.
        // Demo:    
        // Have to hook _adjustContentOffsetIfNecessary here.
        // Any other more elegant way?
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

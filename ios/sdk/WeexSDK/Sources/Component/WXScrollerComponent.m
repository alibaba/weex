/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXScrollerComponent.h"
#import "WXComponent_internal.h"
#import "WXComponent.h"
#import "WXDefine.h"
#import "WXConvert.h"
#import "WXSDKInstance.h"
#import "WXUtility.h"
#import "WXLoadingComponent.h"
#import "WXRefreshComponent.h"

@interface WXScrollToTarget : NSObject

@property (nonatomic, weak)   WXComponent *target;
@property (nonatomic, assign) BOOL hasAppear;

@end

@implementation WXScrollToTarget

@end


@interface WXScrollerComponent()

@property (nonatomic, strong) NSMutableArray *  stickyArray;
@property (nonatomic, strong) NSMutableArray *  listenerArray;
@property (nonatomic, weak) WXRefreshComponent *refreshComponent;
@property (nonatomic, weak) WXLoadingComponent *loadingComponent;

@end

@implementation WXScrollerComponent
{
    CGSize _contentSize;
    BOOL _listenLoadMore;
    CGFloat _loadMoreOffset;
    CGFloat _previousLoadMoreContentHeight;
    CGPoint _lastContentOffset;
    BOOL _scrollable;
    
    // vertical & horizontal
    WXScrollDirection _scrollDirection;
    // left & right & up & down
    NSString *_direction;
    BOOL _showScrollBar;

    css_node_t *_scrollerCSSNode;
}

WX_EXPORT_METHOD(@selector(resetLoadmore))

- (void)resetLoadmore
{
    _previousLoadMoreContentHeight=0;
}

- (css_node_t *)scrollerCSSNode
{
    return _scrollerCSSNode;
}

- (void)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    [super _insertSubcomponent:subcomponent atIndex:index];
    
    if ([subcomponent isKindOfClass:[WXRefreshComponent class]]) {
        _refreshComponent = (WXRefreshComponent*)subcomponent;
    }
    else if ([subcomponent isKindOfClass:[WXLoadingComponent class]]) {
        _loadingComponent = (WXLoadingComponent*)subcomponent;
    }
}

-(instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        
        _stickyArray = [NSMutableArray array];
        _listenerArray = [NSMutableArray array];
        
        _scrollDirection = attributes[@"scrollDirection"] ? [WXConvert WXScrollDirection:attributes[@"scrollDirection"]] : WXScrollDirectionVertical;
        _showScrollBar = attributes[@"showScrollbar"] ? [WXConvert BOOL:attributes[@"showScrollbar"]] : YES;
        _loadMoreOffset = attributes[@"loadmoreoffset"] ? [WXConvert CGFloat:attributes[@"loadmoreoffset"]] : 0;
        _loadmoreretry = attributes[@"loadmoreretry"] ? [WXConvert NSUInteger:attributes[@"loadmoreretry"]] : 0;
        _listenLoadMore = [events containsObject:@"loadmore"];
        _scrollable = attributes[@"scrollable"] ? [WXConvert BOOL:attributes[@"scrollable"]] : YES;

        _scrollerCSSNode = new_css_node();
        
        // let scroller fill the rest space if it is a child component and has no fixed height & width
        if (((_scrollDirection == WXScrollDirectionVertical &&
            isUndefined(self.cssNode->style.dimensions[CSS_HEIGHT])) ||
            (_scrollDirection == WXScrollDirectionHorizontal &&
              isUndefined(self.cssNode->style.dimensions[CSS_WIDTH]))) &&
             self.cssNode->style.flex <= 0.0) {
            self.cssNode->style.flex = 1.0;
        }
    }
    
    return self;
}

- (UIView *)loadView
{
    return [[UIScrollView alloc] init];
}

- (void)viewDidLoad
{
    [self setContentSize:_contentSize];
    UIScrollView* scrollView = (UIScrollView *)self.view;
    scrollView.scrollEnabled = YES;
    scrollView.delegate = self;
    scrollView.exclusiveTouch = YES;
    scrollView.autoresizesSubviews = NO;
    scrollView.clipsToBounds = YES;
    scrollView.showsVerticalScrollIndicator = _showScrollBar;
    scrollView.showsHorizontalScrollIndicator = _showScrollBar;
    scrollView.scrollEnabled = _scrollable;
    
    if (self.ancestorScroller) {
        scrollView.scrollsToTop = NO;
    } else {
        scrollView.scrollsToTop = YES;
    }
}

- (void)layoutDidFinish
{
    if ([self isViewLoaded]) {
        [self setContentSize:_contentSize];
        [self adjustSticky];
        [self handleAppear];
    }
    
    [_loadingComponent resizeFrame];
}

- (void)viewWillUnload
{
    ((UIScrollView *)_view).delegate = nil;
}

- (void)dealloc
{
    [self.stickyArray removeAllObjects];
    [self.listenerArray removeAllObjects];
    
    free(_scrollerCSSNode);
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"showScrollbar"]) {
        _showScrollBar = [WXConvert BOOL:attributes[@"showScrollbar"]];
        ((UIScrollView *)self.view).showsHorizontalScrollIndicator = _showScrollBar;
        ((UIScrollView *)self.view).showsVerticalScrollIndicator = _showScrollBar;
    }
    
    if (attributes[@"loadmoreoffset"]) {
        _loadMoreOffset = [WXConvert CGFloat:attributes[@"loadmoreoffset"]];
    }
    
    if (attributes[@"loadmoreretry"]) {
        NSUInteger loadmoreretry = [WXConvert NSUInteger:attributes[@"loadmoreretry"]];
        if (loadmoreretry != _loadmoreretry) {
            _previousLoadMoreContentHeight = 0;
        }
        self.loadmoreretry = loadmoreretry;
    }
    if (attributes[@"scrollable"]) {
        _scrollable = attributes[@"scrollable"] ? [WXConvert BOOL:attributes[@"scrollable"]] : YES;
        ((UIScrollView *)self.view).scrollEnabled = _scrollable;
    }
}

- (void)addEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"loadmore"]) {
        _listenLoadMore = YES;
    }
}

- (void)removeEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"loadmore"]) {
        _listenLoadMore = NO;
    }
}

#pragma mark WXScrollerProtocol

- (void)addStickyComponent:(WXComponent *)sticky
{
    if(![self.stickyArray containsObject:sticky]){
        [self.stickyArray addObject:sticky];
        [self adjustSticky];
    }
}

- (void)removeStickyComponent:(WXComponent *)sticky
{
    if([self.stickyArray containsObject:sticky]){
        [self.stickyArray removeObject:sticky];
        [self adjustSticky];
    }
}

- (void)adjustSticky
{
    if (![self isViewLoaded]) {
        return;
    }
    CGFloat scrollOffsetY = ((UIScrollView *)self.view).contentOffset.y;
    for(WXComponent *component in self.stickyArray) {
        if (isnan(component->_absolutePosition.x) && isnan(component->_absolutePosition.y)) {
            component->_absolutePosition = [component.supercomponent.view convertPoint:component.view.frame.origin toView:self.view];
        }
        CGPoint relativePosition = component->_absolutePosition;
        if (isnan(relativePosition.y)) {
            continue;
        }
        
        WXComponent *supercomponent = component.supercomponent;
        if(supercomponent != self && component.view.superview != self.view) {
            [component.view removeFromSuperview];
            [self.view addSubview:component.view];
        } else {
            [self.view bringSubviewToFront:component.view];
        }
        
        CGFloat relativeY = relativePosition.y;
        BOOL needSticky = NO;
        
        if (scrollOffsetY >= relativeY) {
            needSticky = YES;
        } else {
            // important: reset views' frame
            component.view.frame = CGRectMake(relativePosition.x, relativePosition.y, component.calculatedFrame.size.width, component.calculatedFrame.size.height);
        }
        
        if (!needSticky) {
            continue;
        }
        
        // The minimum Y sticky view can reach is its original position
        CGFloat minY = relativeY;
        CGPoint superRelativePosition = supercomponent == self ? CGPointZero : [supercomponent.supercomponent.view convertPoint:supercomponent.view.frame.origin toView:self.view];
        CGFloat maxY = superRelativePosition.y + supercomponent.calculatedFrame.size.height - component.calculatedFrame.size.height;
        
        CGFloat stickyY = scrollOffsetY;
        if (stickyY < minY) {
            stickyY = minY;
        } else if (stickyY > maxY && ![supercomponent conformsToProtocol:@protocol(WXScrollerProtocol)]) {
            // Sticky component can not go beyond its parent's bounds when its parent is not scroller;
            stickyY = maxY;
        }
        
        UIView *stickyView = component.view;
        CGPoint origin = stickyView.frame.origin;
        origin.y = stickyY;
        stickyView.frame = (CGRect){origin,stickyView.frame.size};
    }
}

- (void)addScrollToListener:(WXComponent *)target
{
    BOOL has = NO;
    for (WXScrollToTarget *targetData in self.listenerArray) {
        if (targetData.target == target) {
            has = YES;
            break;
        }
    }
    if (!has){
        WXScrollToTarget *scrollTarget = [[WXScrollToTarget alloc] init];
        scrollTarget.target = target;
        scrollTarget.hasAppear = NO;
        [self.listenerArray addObject:scrollTarget];
    }
}

- (void)removeScrollToListener:(WXComponent *)target
{
    WXScrollToTarget *targetData = nil;
    for (WXScrollToTarget *targetData in self.listenerArray) {
        if (targetData.target == target) {
            break;
        }
    }
    if(targetData){
        [self.listenerArray removeObject:targetData];
    }
}

- (void)scrollToComponent:(WXComponent *)component withOffset:(CGFloat)offset
{
    UIScrollView *scrollView = (UIScrollView *)self.view;
    CGPoint contentOffset = scrollView.contentOffset;
    CGFloat scaleFactor = self.weexInstance.pixelScaleFactor;
    
    if (_scrollDirection == WXScrollDirectionHorizontal) {
        CGFloat contentOffetX = [component.supercomponent.view convertPoint:component.view.frame.origin toView:self.view].x;
        contentOffetX += offset * scaleFactor;
        
        if (contentOffetX > scrollView.contentSize.width - scrollView.frame.size.width) {
            contentOffset.x = scrollView.contentSize.width - scrollView.frame.size.width;
        } else {
            contentOffset.x = contentOffetX;
        }
    } else {
        CGFloat contentOffetY = [component.supercomponent.view convertPoint:component.view.frame.origin toView:self.view].y;
        contentOffetY += offset * scaleFactor;
        
        if (contentOffetY > scrollView.contentSize.height - scrollView.frame.size.height) {
            contentOffset.y = scrollView.contentSize.height - scrollView.frame.size.height;
        } else {
            contentOffset.y = contentOffetY;
        }
    }
    
    [scrollView setContentOffset:contentOffset animated:YES];
}

- (BOOL)isNeedLoadMore
{
    if (_loadMoreOffset >= 0.0 && ((UIScrollView *)self.view).contentOffset.y >= 0) {
        return _previousLoadMoreContentHeight != ((UIScrollView *)self.view).contentSize.height && ((UIScrollView *)self.view).contentSize.height - ((UIScrollView *)self.view).contentOffset.y -  self.view.frame.size.height <= _loadMoreOffset;
    }
    
    return NO;
}

- (void)loadMore
{
    [self fireEvent:@"loadmore" params:nil];
    _previousLoadMoreContentHeight = ((UIScrollView *)self.view).contentSize.height;
}

- (CGPoint)contentOffset
{
    CGPoint rtv = CGPointZero;
    UIScrollView *scrollView = (UIScrollView *)self.view;
    if (scrollView) {
        rtv = scrollView.contentOffset;
    }
    return rtv;
}

- (void)setContentOffset:(CGPoint)contentOffset animated:(BOOL)animated
{
    UIScrollView *scrollView = (UIScrollView *)self.view;
    [scrollView setContentOffset:contentOffset animated:animated];
}

- (CGSize)contentSize
{
    return ((UIScrollView *)self.view).contentSize;
}

- (void)setContentSize:(CGSize)size
{
    UIScrollView *scrollView = (UIScrollView *)self.view;
    scrollView.contentSize = size;
}

- (UIEdgeInsets)contentInset
{
    UIEdgeInsets rtv = UIEdgeInsetsZero;
    UIScrollView *scrollView = (UIScrollView *)self.view;
    if (scrollView) {
        rtv = scrollView.contentInset;
    }
    return rtv;
}

- (void)setContentInset:(UIEdgeInsets)contentInset
{
    UIScrollView *scrollView = (UIScrollView *)self.view;
    [scrollView setContentInset:contentInset];
}

#pragma mark UIScrollViewDelegate

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    //apply block which are registered
    WXSDKInstance *instance = self.weexInstance;
    if ([self.ref isEqualToString:WX_SDK_ROOT_REF] &&
        [self isKindOfClass:[WXScrollerComponent class]]) {
        if (instance.onScroll) {
            instance.onScroll(scrollView.contentOffset);
        }
    }
    
    if (_lastContentOffset.x > scrollView.contentOffset.x){
        _direction = @"right";
    } else if (_lastContentOffset.x < scrollView.contentOffset.x){
        _direction = @"left";
    } else if(_lastContentOffset.y > scrollView.contentOffset.y){
        _direction = @"down";
    } else if(_lastContentOffset.y < scrollView.contentOffset.y) {
        _direction = @"up";
    }
    
    _lastContentOffset = scrollView.contentOffset;
    
    // check sticky
    [self adjustSticky];
    [self handleLoadMore];
    [self handleAppear];
    
//    CGFloat vx = scrollView.contentInset.left + scrollView.contentOffset.x;
//    CGFloat vy = scrollView.contentInset.top + scrollView.contentOffset.y;
//    CGFloat vw = scrollView.frame.size.width - scrollView.contentInset.left - scrollView.contentInset.right;
//    CGFloat vh = scrollView.frame.size.height - scrollView.contentInset.top - scrollView.contentInset.bottom;
//    CGRect scrollRect = CGRectMake(vx, vy, vw, vh);;
//    
//    // notify action for appear & disappear
//    for(WXScrollToTarget *target in self.listenerArray){
//        [self scrollToTarget:target scrollRect:scrollRect];
//    }
    
    if (self.onScroll) {
        self.onScroll(scrollView);
    }
}

- (void)scrollViewDidEndScrollingAnimation:(UIScrollView *)scrollView
{
    UIEdgeInsets inset = [scrollView contentInset];
    if ([_refreshComponent displayState]) {
        inset.top = _refreshComponent.view.frame.size.height;
    }
    else {
        inset.top = 0;
    }
    if ([_loadingComponent displayState]) {
        inset.bottom = _loadingComponent.view.frame.size.height;
    } else {
        inset.bottom = 0;
    }
    
    [scrollView setContentInset:inset];
}

- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
{
    [_loadingComponent.view setHidden:NO];
    [_refreshComponent.view setHidden:NO];
    //refresh
    if (_refreshComponent && scrollView.contentOffset.y + _refreshComponent.calculatedFrame.size.height < _refreshComponent.calculatedFrame.origin.y) {
        [_refreshComponent refresh];
    }
    
    //loading
    if (_loadingComponent &&
        scrollView.contentOffset.y + scrollView.frame.size.height > _loadingComponent.view.frame.origin.y + _loadingComponent.calculatedFrame.size.height) {
        [_loadingComponent loading];
    }
}

- (void)handleAppear
{
    if (![self isViewLoaded]) {
        return;
    }
    UIScrollView *scrollView = (UIScrollView *)self.view;
    CGFloat vx = scrollView.contentInset.left + scrollView.contentOffset.x;
    CGFloat vy = scrollView.contentInset.top + scrollView.contentOffset.y;
    CGFloat vw = scrollView.frame.size.width - scrollView.contentInset.left - scrollView.contentInset.right;
    CGFloat vh = scrollView.frame.size.height - scrollView.contentInset.top - scrollView.contentInset.bottom;
    CGRect scrollRect = CGRectMake(vx, vy, vw, vh);;
    
    // notify action for appear
    for(WXScrollToTarget *target in self.listenerArray){
        [self scrollToTarget:target scrollRect:scrollRect];
    }
}

#pragma mark  Private Methods

- (void)scrollToTarget:(WXScrollToTarget *)target scrollRect:(CGRect)rect
{
    WXComponent *component = target.target;
    if (![component isViewLoaded]) {
        return;
    }
    
    CGFloat ctop;
    if (component && component->_view && component->_view.superview) {
        ctop = [component->_view.superview convertPoint:component->_view.frame.origin toView:_view].y;
    } else {
        ctop = 0.0;
    }
    CGFloat cbottom = ctop + CGRectGetHeight(component.calculatedFrame);
    CGFloat cleft;
    if (component && component->_view && component->_view.superview) {
        cleft = [component->_view.superview convertPoint:component->_view.frame.origin toView:_view].x;
    } else {
        cleft = 0.0;
    }
    CGFloat cright = cleft + CGRectGetWidth(component.calculatedFrame);
    
    CGFloat vtop = CGRectGetMinY(rect), vbottom = CGRectGetMaxY(rect), vleft = CGRectGetMinX(rect), vright = CGRectGetMaxX(rect);
    if(cbottom > vtop && ctop <= vbottom && cleft <= vright && cright > vleft){
        if(!target.hasAppear && component){
            target.hasAppear = YES;
            if (component->_appearEvent) {
                [component fireEvent:@"appear" params:_direction ? @{@"direction":_direction} : nil];
            }
        }
    } else {
        if(target.hasAppear && component){
            target.hasAppear = NO;
            if(component->_disappearEvent){
                [component fireEvent:@"disappear" params:_direction ? @{@"direction":_direction} : nil];
            }
        }
    }
}

- (void)handleLoadMore
{
    if (_listenLoadMore && [self isNeedLoadMore]) {
        [self loadMore];
    }
}

#pragma mark Layout

- (NSUInteger)_childrenCountForLayout;
{
    return 0;
}

- (NSUInteger)childrenCountForScrollerLayout
{
    return [super _childrenCountForLayout];
}

- (void)_calculateFrameWithSuperAbsolutePosition:(CGPoint)superAbsolutePosition
                          gatherDirtyComponents:(NSMutableSet<WXComponent *> *)dirtyComponents
{
    /**
     *  Pretty hacky way
     *  layout from root to scroller to get scroller's frame,
     *  layout from children to scroller to get scroller's contentSize
     */
    if ([self needsLayout]) {
        memcpy(_scrollerCSSNode, self.cssNode, sizeof(css_node_t));
        _scrollerCSSNode->children_count = (int)[self childrenCountForScrollerLayout];
        
        _scrollerCSSNode->style.position[CSS_LEFT] = 0;
        _scrollerCSSNode->style.position[CSS_TOP] = 0;
        
        if (_scrollDirection == WXScrollDirectionVertical) {
            _scrollerCSSNode->style.flex_direction = CSS_FLEX_DIRECTION_COLUMN;
            _scrollerCSSNode->style.dimensions[CSS_WIDTH] = _cssNode->layout.dimensions[CSS_WIDTH];
            _scrollerCSSNode->style.dimensions[CSS_HEIGHT] = CSS_UNDEFINED;
        } else {
            _scrollerCSSNode->style.flex_direction = CSS_FLEX_DIRECTION_ROW;
            _scrollerCSSNode->style.dimensions[CSS_HEIGHT] = _cssNode->layout.dimensions[CSS_HEIGHT];
            _scrollerCSSNode->style.dimensions[CSS_WIDTH] = CSS_UNDEFINED;
        }
        
        _scrollerCSSNode->layout.dimensions[CSS_WIDTH] = CSS_UNDEFINED;
        _scrollerCSSNode->layout.dimensions[CSS_HEIGHT] = CSS_UNDEFINED;
        
        layoutNode(_scrollerCSSNode, CSS_UNDEFINED, CSS_UNDEFINED, CSS_DIRECTION_INHERIT);
        if ([WXLog logLevel] >= WXLogLevelDebug) {
            print_css_node(_scrollerCSSNode, CSS_PRINT_LAYOUT | CSS_PRINT_STYLE | CSS_PRINT_CHILDREN);
        }
        CGSize size = {
            WXRoundPixelValue(_scrollerCSSNode->layout.dimensions[CSS_WIDTH]),
            WXRoundPixelValue(_scrollerCSSNode->layout.dimensions[CSS_HEIGHT])
        };

        if (!CGSizeEqualToSize(size, _contentSize)) {
            // content size
            _contentSize = size;
            [dirtyComponents addObject:self];
        }
        
        _scrollerCSSNode->layout.dimensions[CSS_WIDTH] = CSS_UNDEFINED;
        _scrollerCSSNode->layout.dimensions[CSS_HEIGHT] = CSS_UNDEFINED;
    }
    
    [super _calculateFrameWithSuperAbsolutePosition:superAbsolutePosition gatherDirtyComponents:dirtyComponents];
}

@end

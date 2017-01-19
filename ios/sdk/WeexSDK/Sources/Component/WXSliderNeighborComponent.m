/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXSliderNeighborComponent.h"
#import "WXConvert.h"
#import "WXUtility.h"
#import "WXComponent_internal.h"
#import "WXIndicatorComponent.h"
#import "WXSDKInstance.h"
#import "NSTimer+Weex.h"

#define MAX_VISIBLE_ITEMS 30
#define MIN_TOGGLE_DURATION 0.2
#define MAX_TOGGLE_DURATION 0.4
#define SCROLL_DURATION 0.4
#define INSERT_DURATION 0.4
#define DECELERATE_THRESHOLD 0.1
#define SCROLL_SPEED_THRESHOLD 2.0
#define SCROLL_DISTANCE_THRESHOLD 0.1
#define DECELERATION_MULTIPLIER 30.0
#define FLOAT_ERROR_MARGIN 0.000001

@protocol WXSliderNeighborDelegate, WXSliderNeighborDataSource;

@interface WXSliderNeighborView: UIView
@property (nonatomic, strong) WXIndicatorView *indicator;
@property (nonatomic, weak) id<WXSliderNeighborDelegate> delegate;
@property (nonatomic, weak) id<WXSliderNeighborDataSource> dataSource;
@property (nonatomic, assign) CGFloat perspective;
@property (nonatomic, readonly, getter = isDragging) BOOL dragging;
@property (nonatomic, readonly, getter = isScrolling) BOOL scrolling;
@property (nonatomic, assign) CGFloat autoscroll;
@property (nonatomic, assign) CGFloat scrollOffset;
@property (nonatomic, assign) CGFloat previousTranslation;
@property (nonatomic, assign, getter = isVertical) BOOL vertical;
@property (nonatomic, assign) CGFloat decelerationRate;
@property (nonatomic, assign, getter = isScrollEnabled) BOOL scrollEnabled;
@property (nonatomic, assign, getter = isPagingEnabled) BOOL pagingEnabled;
@property (nonatomic, assign) BOOL bounces;
@property (nonatomic, assign) BOOL didDrag;
@property (nonatomic, readonly, getter = isDecelerating) BOOL decelerating;
@property (nonatomic, strong, readonly) UIView *contentView;
@property (nonatomic, strong) NSMutableDictionary *itemViews;
@property (nonatomic, readonly) NSInteger numberOfVisibleItems;
@property (nonatomic, readonly) NSInteger numberOfItems;
@property (nonatomic, readonly) NSInteger numberOfPlaceholders;
@property (nonatomic, strong) NSMutableSet *itemViewPool;
@property (nonatomic, strong) NSMutableSet *placeholderViewPool;
@property (nonatomic, assign) NSTimeInterval startTime;
@property (nonatomic, assign) NSTimeInterval lastTime;
@property (nonatomic, assign) CGFloat startVelocity;
@property (nonatomic, assign) CGFloat offsetMultiplier;
@property (nonatomic, assign) CGFloat startOffset;
@property (nonatomic, assign) CGFloat endOffset;
@property (nonatomic, assign) CGSize contentOffset;
@property (nonatomic, assign) CGSize viewpointOffset;
@property (nonatomic, assign) CGFloat scrollSpeed;
@property (nonatomic, assign) CGFloat bounceDistance;
@property (nonatomic, assign) BOOL stopAtItemBoundary;
@property (nonatomic, assign) BOOL scrollToItemBoundary;
@property (nonatomic, assign) BOOL centerItemWhenSelected;
@property (nonatomic, assign) NSTimeInterval scrollDuration;
@property (nonatomic, readonly, getter = isWrapEnabled) BOOL wrapEnabled;
@property (nonatomic, strong) NSTimer *timer;
@property (nonatomic, assign) NSInteger numberOfPlaceholdersToShow;
@property (nonatomic, assign) CGFloat previousScrollOffset;
@property (nonatomic, assign) NSTimeInterval toggleTime;
@property (nonatomic, readonly) CGFloat toggle;
@property (nonatomic, assign) NSInteger previousItemIndex;
@property (nonatomic, readonly) CGFloat itemWidth;
@property (nonatomic, assign) BOOL inited;
@end

@implementation WXSliderNeighborView

- (instancetype)init {
    
    self = [super init];
    if (!self){
    }
    _decelerationRate = 0.01;
    _scrollEnabled = YES;
    _bounces = YES;
    _offsetMultiplier = 1.0;
    _perspective = -1.0/500.0;
    _contentOffset = CGSizeZero;
    _viewpointOffset = CGSizeZero;
    _scrollSpeed = 1.0;
    _bounceDistance = 1.0;
    _stopAtItemBoundary = YES;
    _scrollToItemBoundary = YES;
    _centerItemWhenSelected = YES;
    _inited = NO;
    
    _contentView = [[UIView alloc] initWithFrame:self.bounds];
    
    //pan gesture recognizer
    self.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    UIPanGestureRecognizer *panGesture = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(didPan:)];
    panGesture.delegate = (id <UIGestureRecognizerDelegate>)self;
    [_contentView addGestureRecognizer:panGesture];
    
    //tap gesture recognizer
    UITapGestureRecognizer *tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(didTap:)];
    tapGesture.delegate = (id <UIGestureRecognizerDelegate>)self;
    [_contentView addGestureRecognizer:tapGesture];
    
    self.accessibilityTraits = UIAccessibilityTraitAllowsDirectInteraction;
    self.isAccessibilityElement = YES;
    
    [self addSubview:_contentView];
    
    if (_dataSource) {
        [self reloadData];
    }
    
    return self;
}

- (void)dealloc
{
    [self stopAnimation];
}

- (void)setDataSource:(id<WXSliderNeighborDataSource>)dataSource
{
    if (_dataSource != dataSource) {
        _dataSource = dataSource;
        if (_dataSource) {
            [self reloadData];
        }
    }
}

- (void)setDelegate:(id<WXSliderNeighborDelegate>)delegate
{
    if (_delegate != delegate) {
        _delegate = delegate;
        if (_delegate && _dataSource) {
            [self setNeedsLayout];
        }
    }
}

- (void)setVertical:(BOOL)vertical
{
    if (_vertical != vertical)
    {
        _vertical = vertical;
        [self layOutItemViews];
    }
}

#pragma clang diagnostic push
#pragma GCC diagnostic ignored "-Wundeclared-selector"
- (void)setCurrentItemIndex:(NSInteger)currentItemIndex
{
    if ([self currentItemIndex] == currentItemIndex) return;
    
    [self setScrollOffset:currentItemIndex];
    [self.indicator setCurrentPoint:currentItemIndex];
    
    if (self.delegate && [self.delegate respondsToSelector:@selector(sliderView:didScrollToItemAtIndex:)]) {
        [self.delegate sliderNeighbor:self didScrollToItemAtIndex:currentItemIndex];
    }
    [self scroll2ItemViewAtIndex:currentItemIndex animated:YES];
    
}
#pragma clang diagnostic pop

- (void)updateItemWidth
{
    _itemWidth = [_delegate sliderNeighborItemWidth:self] ?: _itemWidth;
    if (_numberOfItems > 0) {
        if ([_itemViews count] == 0) {
            [self loadViewAtIndex:0];
        }
    } else if (_numberOfPlaceholders > 0) {
        if ([_itemViews count] == 0) {
            [self loadViewAtIndex:-1];
        }
    }
}

- (NSInteger)circularCarouselItemCount
{
    NSInteger count = 0;
    CGFloat spacing = [self valueForOption:WXSliderNeighborOptionSpacing withDefault:1.0];
    CGFloat width = _vertical ? self.bounds.size.height: self.bounds.size.width;
    count = MIN(MAX_VISIBLE_ITEMS, MAX(12, ceil(width / (spacing * _itemWidth)) * M_PI));
    count = MIN(_numberOfItems + _numberOfPlaceholdersToShow, count);
    return [self valueForOption:WXSliderNeighborOptionCount withDefault:count];
}

- (void)updateNumberOfVisibleItems
{
    //get number of visible items
    //based on count value
    CGFloat spacing = [self valueForOption:WXSliderNeighborOptionSpacing withDefault:1.0];
    CGFloat width = _vertical ? self.bounds.size.height: self.bounds.size.width;
    CGFloat itemWidth = _itemWidth * spacing;
    _numberOfVisibleItems = ceil(width / itemWidth) + 2;
    _numberOfVisibleItems = MIN(MAX_VISIBLE_ITEMS, _numberOfVisibleItems);
    _numberOfVisibleItems = [self valueForOption:WXSliderNeighborOptionVisibleItems withDefault:_numberOfVisibleItems];
    _numberOfVisibleItems = MAX(0, MIN(_numberOfVisibleItems, _numberOfItems + _numberOfPlaceholdersToShow));
    
}

- (CGFloat)offsetForItemAtIndex:(NSInteger)index
{
    //calculate relative position
    CGFloat offset = index - _scrollOffset;
    if (_wrapEnabled) {
        if (offset > _numberOfItems/2.0) {
            offset -= _numberOfItems;
        } else if (offset < -_numberOfItems/2.0) {
            offset += _numberOfItems;
        }
    }
    
    return offset;
}

- (CGFloat)alphaForItemWithOffset:(CGFloat)offset
{
    CGFloat fadeMin = -INFINITY;
    CGFloat fadeMax = INFINITY;
    CGFloat fadeRange = 1.0;
    CGFloat fadeMinAlpha = 0.0;
    fadeMin = [self valueForOption:WXSliderNeighborOptionFadeMin withDefault:fadeMin];
    fadeMax = [self valueForOption:WXSliderNeighborOptionFadeMax withDefault:fadeMax];
    fadeRange = [self valueForOption:WXSliderNeighborOptionFadeRange withDefault:fadeRange];
    fadeMinAlpha = [self valueForOption:WXSliderNeighborOptionFadeMinAlpha withDefault:fadeMinAlpha];
    
    CGFloat factor = 0.0;
    if (offset > fadeMax) {
        factor = offset - fadeMax;
    } else if (offset < fadeMin) {
        factor = fadeMin - offset;
    }
    return 1.0 - MIN(factor, fadeRange) / fadeRange * (1.0 - fadeMinAlpha);
}


- (UIView *)containView:(UIView *)view
{
    //set item width
    if (!_itemWidth) {
        _itemWidth = _vertical? view.frame.size.height: view.frame.size.width;
    }
    
    //set container frame
    CGRect frame = view.frame;
    frame.size.width = _vertical? frame.size.width: _itemWidth;
    frame.size.height = _vertical? _itemWidth: frame.size.height;
    UIView *containerView = [[UIView alloc] initWithFrame:frame];
    
    //set view frame
    frame = view.frame;
    frame.origin.x = (containerView.bounds.size.width - frame.size.width) / 2.0;
    frame.origin.y = (containerView.bounds.size.height - frame.size.height) / 2.0;
    view.frame = frame;
    [containerView addSubview:view];
    containerView.layer.opacity = 0;
    containerView.transform = CGAffineTransformMakeScale(0.8, 1.0);
    return containerView;
}

- (void)transformItemViews
{
    for (NSNumber *number in _itemViews)
    {
        NSInteger index = [number integerValue];
        UIView *view = _itemViews[number];
        [self transformItemView:view atIndex:index];
    }
}

- (CATransform3D)transformForItemViewWithOffset:(CGFloat)offset
{
    //set up base transform
    CATransform3D transform = CATransform3DIdentity;
    transform.m34 = _perspective;
    transform = CATransform3DTranslate(transform, -_viewpointOffset.width, -_viewpointOffset.height, 0.0);
    
    //perform transforms
    CGFloat spacing = [self valueForOption:WXSliderNeighborOptionSpacing withDefault:1.0];
    if (_vertical) {
        return CATransform3DTranslate(transform, 0.0, offset * _itemWidth * spacing, 0.0);
    } else {
        return CATransform3DTranslate(transform, offset * _itemWidth * spacing, 0.0, 0.0);
    }
}

- (void)transformItemView:(UIView *)view atIndex:(NSInteger)index
{
    //calculate offset
    CGFloat offset = [self offsetForItemAtIndex:index];
    
    //update alpha
    view.superview.layer.opacity = [self alphaForItemWithOffset:offset];
    
    //center view
    view.superview.center = CGPointMake(self.bounds.size.width/2.0 + _contentOffset.width,
                                        self.bounds.size.height/2.0 + _contentOffset.height);
    
    //enable/disable interaction
    view.superview.userInteractionEnabled = (!_centerItemWhenSelected || index == self.currentItemIndex);
    view.superview.layer.rasterizationScale = [UIScreen mainScreen].scale;
    
    [view layoutIfNeeded];
    
    CGFloat clampedOffset = MAX(-1.0, MIN(1.0, offset));
    if (_decelerating || (_scrolling && !_dragging && !_didDrag) || (_autoscroll && !_dragging) ||
        (!_wrapEnabled && (_scrollOffset < 0 || _scrollOffset >= _numberOfItems - 1))) {
        if (offset > 0) {
            _toggle = (offset <= 0.5)? -clampedOffset: (1.0 - clampedOffset);
        } else {
            _toggle = (offset > -0.5)? -clampedOffset: (- 1.0 - clampedOffset);
        }
    }
    
    //calculate transform
    CATransform3D transform = [self transformForItemViewWithOffset:offset];
    
    //transform view
    view.superview.layer.transform = transform;
    
    //backface culling
    BOOL showBackfaces = view.layer.doubleSided;
    if (showBackfaces) {
        showBackfaces = YES;
    }
    showBackfaces = !![self valueForOption:WXSliderNeighborOptionShowBackfaces withDefault:showBackfaces];
    
    view.superview.hidden = !(showBackfaces ?: (transform.m33 > 0.0));
}

NSComparisonResult sliderNeighorCompareViewDepth(UIView *view1, UIView *view2, WXSliderNeighborView *self)
{
    //compare depths
    CATransform3D t1 = view1.superview.layer.transform;
    CATransform3D t2 = view2.superview.layer.transform;
    CGFloat z1 = t1.m13 + t1.m23 + t1.m33 + t1.m43;
    CGFloat z2 = t2.m13 + t2.m23 + t2.m33 + t2.m43;
    CGFloat difference = z1 - z2;
    
    //if depths are equal, compare distance from current view
    if (difference == 0.0) {
        CATransform3D t3 = [self currentItemView].superview.layer.transform;
        if (self.vertical) {
            CGFloat y1 = t1.m12 + t1.m22 + t1.m32 + t1.m42;
            CGFloat y2 = t2.m12 + t2.m22 + t2.m32 + t2.m42;
            CGFloat y3 = t3.m12 + t3.m22 + t3.m32 + t3.m42;
            difference = fabs(y2 - y3) - fabs(y1 - y3);
        } else {
            CGFloat x1 = t1.m11 + t1.m21 + t1.m31 + t1.m41;
            CGFloat x2 = t2.m11 + t2.m21 + t2.m31 + t2.m41;
            CGFloat x3 = t3.m11 + t3.m21 + t3.m31 + t3.m41;
            difference = fabs(x2 - x3) - fabs(x1 - x3);
        }
    }
    return (difference < 0.0)? NSOrderedAscending: NSOrderedDescending;
}

- (void)depthSortViews
{
    for (UIView *view in [[_itemViews allValues] sortedArrayUsingFunction:(NSInteger (*)(id, id, void *))sliderNeighorCompareViewDepth context:(__bridge void *)self])
    {
        [_contentView bringSubviewToFront:(UIView *__nonnull)view.superview];
    }
}

- (void)layOutItemViews
{
    //bail out if not set up yet
    if (!_dataSource || !_contentView) {
        return;
    }
    
    //update wrap
    _wrapEnabled = YES;
    _wrapEnabled = !![self valueForOption:WXSliderNeighborOptionWrap withDefault:_wrapEnabled];
    
    //no placeholders on wrapped carousels
    _numberOfPlaceholdersToShow = _wrapEnabled? 0: _numberOfPlaceholders;
    
    //set item width
    [self updateItemWidth];
    
    //update number of visible items
    [self updateNumberOfVisibleItems];
    
    //prevent false index changed event
    _previousScrollOffset = self.scrollOffset;
    
    //update offset multiplier
    _offsetMultiplier = 1.0;
    _offsetMultiplier = [self valueForOption:WXSliderNeighborOptionOffsetMultiplier withDefault:_offsetMultiplier];
    
    //align
    if (!_scrolling && !_decelerating && !_autoscroll) {
        if (_scrollToItemBoundary && self.currentItemIndex != -1) {
            [self scroll2ItemViewAtIndex:self.currentItemIndex animated:YES];
        } else {
            _scrollOffset = [self clampedOffset:_scrollOffset];
        }
    }
    //update views
    if (_inited) {
        [self didScroll];
    }
    
    _inited = YES;
}

- (CGFloat)valueForOption:(WXSliderNeighborOption)option withDefault:(CGFloat)value
{
    return _delegate? [_delegate sliderNeighbor:self valueForOption:option withDefault:value]: value;
}

#pragma mark -
#pragma mark Gestures and taps

- (NSInteger)viewOrSuperviewIndex:(UIView *)view
{
    if (view == nil || view == _contentView) {
        return NSNotFound;
    }
    NSInteger index = [self indexOfItemView:view];
    if (index == NSNotFound) {
        return [self viewOrSuperviewIndex:view.superview];
    }
    return index;
}

- (BOOL)viewOrSuperview:(UIView *)view implementsSelector:(SEL)selector
{
    if (!view || view == self.contentView) {
        return NO;
    }
    
    Class viewClass = [view class];
    while (viewClass && viewClass != [UIView class])
    {
        unsigned int numberOfMethods;
        Method *methods = class_copyMethodList(viewClass, &numberOfMethods);
        for (unsigned int i = 0; i < numberOfMethods; i++)
        {
            if (method_getName(methods[i]) == selector) {
                free(methods);
                return YES;
            }
        }
        if (methods) free(methods);
        viewClass = [viewClass superclass];
    }
    
    return [self viewOrSuperview:view.superview implementsSelector:selector];
}

- (id)viewOrSuperview:(UIView *)view ofClass:(Class)class
{
    if (!view || view == self.contentView) {
        return nil;
    } else if ([view isKindOfClass:class]) {
        return view;
    }
    return [self viewOrSuperview:view.superview ofClass:class];
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gesture shouldReceiveTouch:(UITouch *)touch
{
    if (_scrollEnabled) {
        _dragging = NO;
        _scrolling = NO;
        _decelerating = NO;
    }
    
    if ([gesture isKindOfClass:[UITapGestureRecognizer class]]) {
        //handle tap
        NSInteger index = [self viewOrSuperviewIndex:touch.view];
        if (index == NSNotFound && _centerItemWhenSelected) {
            //view is a container view
            index = [self viewOrSuperviewIndex:[touch.view.subviews lastObject]];
        }
        if (index != NSNotFound) {
            if ([self viewOrSuperview:touch.view implementsSelector:@selector(touchesBegan:withEvent:)]) {
                return NO;
            }
        }
    } else if ([gesture isKindOfClass:[UIPanGestureRecognizer class]]) {
        if (!_scrollEnabled) {
            return NO;
        } else if ([self viewOrSuperview:touch.view implementsSelector:@selector(touchesMoved:withEvent:)]) {
            UIScrollView *scrollView = [self viewOrSuperview:touch.view ofClass:[UIScrollView class]];
            if (scrollView) {
                return !scrollView.scrollEnabled ||
                (self.vertical && scrollView.contentSize.height <= scrollView.frame.size.height) ||
                (!self.vertical && scrollView.contentSize.width <= scrollView.frame.size.width);
            }
            if ([self viewOrSuperview:touch.view ofClass:[UIButton class]] ||
                [self viewOrSuperview:touch.view ofClass:[UIBarButtonItem class]]) {
                return YES;
            }
            return NO;
        }
    }
    return YES;
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer{
   //if the view which the otherGestureRecognizer works on is a scrollview and also it is scrollEnabled vertically ,at this time,we should not block the guesture from being recognized by the otherGestureRecognize
    if ([gestureRecognizer isKindOfClass:[UIPanGestureRecognizer class]] && [otherGestureRecognizer isKindOfClass:[UIPanGestureRecognizer class]]) {
        if ([otherGestureRecognizer.view isKindOfClass:[UIScrollView class]]) {
            UIScrollView* scrollview = (UIScrollView *)otherGestureRecognizer.view;
            if (scrollview.scrollEnabled) {
                UIPanGestureRecognizer* panRcgn= (UIPanGestureRecognizer *)gestureRecognizer;
                //check offset for confirming vertival movement
                if (fabs([panRcgn translationInView:panRcgn.view].y) > fabs([panRcgn translationInView:panRcgn.view].x)*16) {
                    return YES;
                }
            }
        }
    }
    return NO;
}


- (void)didPan:(UIPanGestureRecognizer *)panGesture
{
    if (_scrollEnabled && _numberOfItems) {
        switch (panGesture.state)
        {
            case UIGestureRecognizerStateBegan:
            {
                _dragging = YES;
                _scrolling = NO;
                _decelerating = NO;
                _previousTranslation = _vertical? [panGesture translationInView:self].y: [panGesture translationInView:self].x;
                
                [_delegate sliderNeighborWillBeginDragging:self];
                break;
            }
            case UIGestureRecognizerStateEnded:
            case UIGestureRecognizerStateCancelled:
            case UIGestureRecognizerStateFailed:
            {
                _dragging = NO;
                _didDrag = YES;
                if ([self shouldDecelerate]) {
                    _didDrag = NO;
                    [self startDecelerating];
                }
                
                [self pushAnimationState:YES];
                [_delegate sliderNeighborDidEndDragging:self willDecelerate:_decelerating];
                [self popAnimationState];
                
                if (!_decelerating) {
                    if ((_scrollToItemBoundary || fabs(_scrollOffset - [self clampedOffset:_scrollOffset]) > FLOAT_ERROR_MARGIN) && !_autoscroll) {
                        if (fabs(_scrollOffset - self.currentItemIndex) < FLOAT_ERROR_MARGIN) {
                            //call scroll to trigger events for legacy support reasons
                            //even though technically we don't need to scroll at all
                            [self scroll2ItemViewAtIndex:self.currentItemIndex duration:0.01];
                        } else {
                            [self scroll2ItemViewAtIndex:self.currentItemIndex animated:YES];
                        }
                    } else {
                        [self depthSortViews];
                    }
                } else {
                    [self pushAnimationState:YES];
                    [_delegate sliderNeighborWillBeginDecelerating:self];
                    [self popAnimationState];
                }
                break;
            }
            case UIGestureRecognizerStateChanged:
            {
                CGFloat translation = _vertical? [panGesture translationInView:self].y: [panGesture translationInView:self].x;
                CGFloat velocity = _vertical? [panGesture velocityInView:self].y: [panGesture velocityInView:self].x;
                
                CGFloat factor = 1.0;
                if (!_wrapEnabled && _bounces) {
                    factor = 1.0 - MIN(fabs(_scrollOffset - [self clampedOffset:_scrollOffset]),
                                       _bounceDistance) / _bounceDistance;
                }
                
                _startVelocity = -velocity * factor * _scrollSpeed / _itemWidth;
                _scrollOffset -= (translation - _previousTranslation) * factor * _offsetMultiplier / _itemWidth;
                _previousTranslation = translation;
                [self didScroll];
                break;
            }
            case UIGestureRecognizerStatePossible:
            {
                //do nothing
                break;
            }
        }
    }
}

- (void)didTap:(UITapGestureRecognizer *)tapGesture
{
    //check for tapped view
    NSInteger index = [self indexOfItemView:[self itemViewAtPoint:[tapGesture locationInView:_contentView]]];
    if (index != NSNotFound) {
        if (!_delegate || [_delegate sliderNeighbor:self shouldSelectItemAtIndex:index]) {
            if ((index != self.currentItemIndex && _centerItemWhenSelected) ||
                (index == self.currentItemIndex && _scrollToItemBoundary)) {
                [self scroll2ItemViewAtIndex:index animated:YES];
            }
            [_delegate sliderNeighbor:self didSelectItemAtIndex:index];
        } else if (_scrollEnabled && _scrollToItemBoundary && _autoscroll) {
            [self scroll2ItemViewAtIndex:self.currentItemIndex animated:YES];
        }
    } else {
        [self scroll2ItemViewAtIndex:self.currentItemIndex animated:YES];
    }
}

- (void)pushAnimationState:(BOOL)enabled
{
    [CATransaction begin];
    [CATransaction setDisableActions:!enabled];
}

- (void)popAnimationState
{
    [CATransaction commit];
}

- (void)reloadData
{
    //remove old views
    for (UIView *view in [_itemViews allValues])
    {
        [view.superview removeFromSuperview];
    }
    
    //bail out if not set up yet
    if (!_dataSource || !_contentView)
    {
        return;
    }
    
    //get number of items and placeholders
    _numberOfVisibleItems = 0;
    _numberOfItems = [_dataSource numberOfItemsInSliderNeighbor:self];
    _numberOfPlaceholders = [_dataSource numberOfPlaceholdersInsliderNeighbor:self];
    
    //reset view pools
    self.itemViews = [NSMutableDictionary dictionary];
    self.itemViewPool = [NSMutableSet set];
    self.placeholderViewPool = [NSMutableSet setWithCapacity:_numberOfPlaceholders];
    
    //layout views
    [self setNeedsLayout];
    
    //fix scroll offset
    if (_numberOfItems > 0 && _scrollOffset < 0.0)
    {
        [self scroll2ItemViewAtIndex:0 animated:(_numberOfPlaceholders > 0)];
    }
}

#pragma mark scrolling

- (NSInteger)currentItemIndex
{
    return [self clampedIndex:round(_scrollOffset)];
}

- (NSInteger)nextItemIndex
{
    return ([self currentItemIndex]+1)%_numberOfItems;
}

- (NSInteger)lastItemIndex
{
    if ([self currentItemIndex] == 0) {
        return _numberOfItems - 1;
    }
    return ((NSInteger)round(abs((int)[self currentItemIndex] - 1))) % _numberOfItems;
}

- (NSInteger)minScrollDistanceFromIndex:(NSInteger)fromIndex toIndex:(NSInteger)toIndex
{
    NSInteger directDistance = toIndex - fromIndex;
    if (_wrapEnabled)
    {
        NSInteger wrappedDistance = MIN(toIndex, fromIndex) + _numberOfItems - MAX(toIndex, fromIndex);
        if (fromIndex < toIndex)
        {
            wrappedDistance = -wrappedDistance;
        }
        return (ABS(directDistance) <= ABS(wrappedDistance))? directDistance: wrappedDistance;
    }
    return directDistance;
}

- (NSInteger)clampedIndex:(NSInteger)index
{
    if (_numberOfItems == 0)
    {
        return -1;
    } else if (_wrapEnabled) {
        return index - floor((CGFloat)index / (CGFloat)_numberOfItems) * _numberOfItems;
    } else {
        return MIN(MAX(0, index), MAX(0, _numberOfItems - 1));
    }
}

- (CGFloat)clampedOffset:(CGFloat)offset
{
    if (_numberOfItems == 0) {
        return -1.0;
    } else if (_wrapEnabled) {
        return offset - floor(offset / (CGFloat)_numberOfItems) * _numberOfItems;
    } else {
        return MIN(MAX(0.0, offset), MAX(0.0, (CGFloat)_numberOfItems - 1.0));
    }
}

- (CGFloat)minScrollDistanceFromOffset:(CGFloat)fromOffset toOffset:(CGFloat)toOffset
{
    CGFloat directDistance = toOffset - fromOffset;
    if (_wrapEnabled) {
        CGFloat wrappedDistance = MIN(toOffset, fromOffset) + _numberOfItems - MAX(toOffset, fromOffset);
        if (fromOffset < toOffset) {
            wrappedDistance = -wrappedDistance;
        }
        return (fabs(directDistance) <= fabs(wrappedDistance))? directDistance: wrappedDistance;
    }
    return directDistance;
}

- (void)scrollByOffset:(CGFloat)offset duration:(NSTimeInterval)duration
{
    if (duration > 0.0) {
        _decelerating = NO;
        _scrolling = YES;
        _startTime = CACurrentMediaTime();
        _startOffset = _scrollOffset;
        _scrollDuration = duration;
        _endOffset = _startOffset + offset;
        if (!_wrapEnabled) {
            _endOffset = [self clampedOffset:_endOffset];
        }
        [_delegate sliderNeighborWillBeginScrollingAnimation:self];
        [self startAnimation];
    } else {
        self.scrollOffset += offset;
    }
}

- (void)scroll2Offset:(CGFloat)offset duration:(NSTimeInterval)duration
{
    [self scrollByOffset:[self minScrollDistanceFromOffset:_scrollOffset toOffset:offset] duration:duration];
    if (_delegate && [_delegate respondsToSelector:@selector(sliderNeighbor:didScrollToItemAtIndex:)]) {
        [_delegate sliderNeighbor:self didScrollToItemAtIndex:offset];
    }
}

- (void)scroll2ItemViewAtIndex:(NSInteger)index duration:(NSTimeInterval)duration
{
    [self scroll2Offset:index duration:duration];
}

- (void)scroll2ItemViewAtIndex:(NSInteger)index animated:(BOOL)animated
{
    [self scroll2ItemViewAtIndex:index duration:animated? 0.6: 0];
}

- (void)scrollByNumberOfItems:(NSInteger)itemCount duration:(NSTimeInterval)duration
{
    if (duration > 0.0) {
        CGFloat offset = 0.0;
        if (itemCount > 0) {
            offset = (floor(_scrollOffset) + itemCount) - _scrollOffset;
        } else if (itemCount < 0) {
            offset = (ceil(_scrollOffset) + itemCount) - _scrollOffset;
        } else {
            offset = round(_scrollOffset) - _scrollOffset;
        }
        [self scrollByOffset:offset duration:duration];
    } else {
        self.scrollOffset = [self clampedIndex:_previousItemIndex + itemCount];
    }
}

- (void)removeItemAtIndex:(NSInteger)index animated:(BOOL)animated
{
    index = [self clampedIndex:index];
    UIView *itemView = [self itemViewAtIndex:index];
    
    if (animated) {
        [UIView beginAnimations:nil context:nil];
        [UIView setAnimationDuration:0.1];
        [UIView setAnimationDelegate:itemView.superview];
        [UIView setAnimationDidStopSelector:@selector(removeFromSuperview)];
        [self performSelector:@selector(queueItemView:) withObject:itemView afterDelay:0.1];
        itemView.superview.layer.opacity = 0.0;
        [UIView commitAnimations];
        
        [UIView beginAnimations:nil context:nil];
        [UIView setAnimationDelay:0.1];
        [UIView setAnimationDuration:INSERT_DURATION];
        [UIView setAnimationDelegate:self];
        [UIView setAnimationDidStopSelector:@selector(depthSortViews)];
        [self removeViewAtIndex:index];
        _numberOfItems --;
        _wrapEnabled = !![self valueForOption:WXSliderNeighborOptionWrap withDefault:_wrapEnabled];
        [self updateNumberOfVisibleItems];
        _scrollOffset = self.currentItemIndex;
        [self didScroll];
        [UIView commitAnimations];
    } else {
        [self pushAnimationState:NO];
        [self queueItemView:itemView];
        [itemView.superview removeFromSuperview];
        [self removeViewAtIndex:index];
        _numberOfItems --;
        _wrapEnabled = !![self valueForOption:WXSliderNeighborOptionWrap withDefault:_wrapEnabled];
        _scrollOffset = self.currentItemIndex;
        [self didScroll];
        [self depthSortViews];
        [self popAnimationState];
    }
}

- (void)insertItemAtIndex:(NSInteger)index animated:(BOOL)animated
{
    _numberOfItems ++;
    _wrapEnabled = !![self valueForOption:WXSliderNeighborOptionWrap withDefault:_wrapEnabled];
    [self updateNumberOfVisibleItems];
    
    index = [self clampedIndex:index];
    [self insertView:nil atIndex:index];
    [self loadViewAtIndex:index];
    
    if (fabs(_itemWidth) < FLOAT_ERROR_MARGIN) {
        [self updateItemWidth];
    }
    
    if (animated) {
        [UIView beginAnimations:nil context:nil];
        [UIView setAnimationDuration:INSERT_DURATION];
        [UIView setAnimationDelegate:self];
        [UIView setAnimationDidStopSelector:@selector(didScroll)];
        [self transformItemViews];
        [UIView commitAnimations];
    } else {
        [self pushAnimationState:NO];
        [self didScroll];
        [self popAnimationState];
    }
    
    if (_scrollOffset < 0.0) {
        [self scroll2ItemViewAtIndex:0 animated:(animated && _numberOfPlaceholders)];
    }
}

- (void)reloadItemAtIndex:(NSInteger)index animated:(BOOL)animated
{
    //get container view
    UIView *containerView = [[self itemViewAtIndex:index] superview];
    if (containerView) {
        if (animated) {
            //fade transition
            CATransition *transition = [CATransition animation];
            transition.duration = INSERT_DURATION;
            transition.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
            transition.type = kCATransitionFade;
            [containerView.layer addAnimation:transition forKey:nil];
        }
        
        //reload view
        [self loadViewAtIndex:index withContainerView:containerView];
    }
}

#pragma mark Animation
- (void)step
{
    [self pushAnimationState:NO];
    NSTimeInterval currentTime = CACurrentMediaTime();
    double delta = currentTime - _lastTime;
    _lastTime = currentTime;
    
    if (_scrolling && !_dragging) {
        NSTimeInterval time = MIN(1.0, (currentTime - _startTime) / _scrollDuration);
        delta = [self easeInOut:time];
        _scrollOffset = _startOffset + (_endOffset - _startOffset) * delta;
        [self didScroll];
        if (time >= 1.0) {
            _scrolling = NO;
            [self depthSortViews];
            [self pushAnimationState:YES];
            [_delegate sliderNeighborDidEndScrollingAnimation:self];
            [self popAnimationState];
        }
    } else if (_decelerating) {
        CGFloat time = MIN(_scrollDuration, currentTime - _startTime);
        CGFloat acceleration = -_startVelocity/_scrollDuration;
        CGFloat distance = _startVelocity * time + 0.5 * acceleration * pow(time, 2.0);
        _scrollOffset = _startOffset + distance;
        [self didScroll];
        if (fabs(time - _scrollDuration) < FLOAT_ERROR_MARGIN) {
            _decelerating = NO;
            [self pushAnimationState:YES];
            [_delegate sliderNeighborDidEndDecelerating:self];
            [self popAnimationState];
            if ((_scrollToItemBoundary || fabs(_scrollOffset - [self clampedOffset:_scrollOffset]) > FLOAT_ERROR_MARGIN) && !_autoscroll) {
                if (fabs(_scrollOffset - self.currentItemIndex) < FLOAT_ERROR_MARGIN) {
                    //call scroll to trigger events for legacy support reasons
                    //even though technically we don't need to scroll at all
                    [self scroll2ItemViewAtIndex:self.currentItemIndex duration:0.01];
                } else {
                    [self scroll2ItemViewAtIndex:self.currentItemIndex animated:YES];
                }
            } else {
                CGFloat difference = round(_scrollOffset) - _scrollOffset;
                if (difference > 0.5) {
                    difference = difference - 1.0;
                } else if (difference < -0.5) {
                    difference = 1.0 + difference;
                }
                _toggleTime = currentTime - MAX_TOGGLE_DURATION * fabs(difference);
                _toggle = MAX(-1.0, MIN(1.0, -difference));
            }
        }
    } else if (_autoscroll && !_dragging) {
        //autoscroll goes backwards from what you'd expect, for historical reasons
        self.scrollOffset = [self clampedOffset:_scrollOffset - delta * _autoscroll];
    } else if (fabs(_toggle) > FLOAT_ERROR_MARGIN) {
        NSTimeInterval toggleDuration = _startVelocity? MIN(1.0, MAX(0.0, 1.0 / fabs(_startVelocity))): 1.0;
        toggleDuration = MIN_TOGGLE_DURATION + (MAX_TOGGLE_DURATION - MIN_TOGGLE_DURATION) * toggleDuration;
        NSTimeInterval time = MIN(1.0, (currentTime - _toggleTime) / toggleDuration);
        delta = [self easeInOut:time];
        _toggle = (_toggle < 0.0)? (delta - 1.0): (1.0 - delta);
        [self didScroll];
    } else if (!_autoscroll) {
        [self stopAnimation];
    }
    
    [self popAnimationState];
}

- (CGFloat)easeInOut:(CGFloat)time
{
    return (time < 0.5)? 0.5 * pow(time * 2.0, 3.0): 0.5 * pow(time * 2.0 - 2.0, 3.0) + 1.0;
}

- (CGFloat)decelerationDistance
{
    CGFloat acceleration = -_startVelocity * DECELERATION_MULTIPLIER * (1.0 - _decelerationRate);
    return -pow(_startVelocity, 2.0) / (2.0 * acceleration);
}

- (void)startDecelerating
{
    CGFloat distance = [self decelerationDistance];
    _startOffset = _scrollOffset;
    _endOffset = _startOffset + distance;
    if (_pagingEnabled) {
        if (distance > 0.0) {
            _endOffset = ceil(_startOffset);
        } else {
            _endOffset = floor(_startOffset);
        }
    } else if (_stopAtItemBoundary) {
        if (distance > 0.0) {
            _endOffset = ceil(_endOffset);
        } else {
            _endOffset = floor(_endOffset);
        }
    }
    if (!_wrapEnabled) {
        if (_bounces) {
            _endOffset = MAX(-_bounceDistance, MIN(_numberOfItems - 1.0 + _bounceDistance, _endOffset));
        } else {
            _endOffset = [self clampedOffset:_endOffset];
        }
    }
    distance = _endOffset - _startOffset;
    
    _startTime = CACurrentMediaTime();
    _scrollDuration = fabs(distance) / fabs(0.5 * _startVelocity);
    
    if (distance != 0.0) {
        _decelerating = YES;
        [self startAnimation];
    }
}


- (BOOL)shouldDecelerate
{
    return (fabs(_startVelocity) > SCROLL_SPEED_THRESHOLD) &&
    (fabs([self decelerationDistance]) > DECELERATE_THRESHOLD);
}

- (BOOL)shouldScroll
{
    return (fabs(_startVelocity) > SCROLL_SPEED_THRESHOLD) &&
    (fabs(_scrollOffset - self.currentItemIndex) > SCROLL_DISTANCE_THRESHOLD);
}

- (void)didScroll
{
    if (_wrapEnabled || !_bounces) {
        _scrollOffset = [self clampedOffset:_scrollOffset];
    } else {
        CGFloat min = -_bounceDistance;
        CGFloat max = MAX(_numberOfItems - 1, 0.0) + _bounceDistance;
        if (_scrollOffset < min) {
            _scrollOffset = min;
            _startVelocity = 0.0;
        } else if (_scrollOffset > max) {
            _scrollOffset = max;
            _startVelocity = 0.0;
        }
    }
    
    //check if index has changed
    NSInteger difference = [self minScrollDistanceFromIndex:self.currentItemIndex toIndex:self.previousItemIndex];
    if (difference) {
        _toggleTime = CACurrentMediaTime();
        _toggle = MAX(-1, MIN(1, difference));
        
        [self startAnimation];
    }
    
    [self loadUnloadViews];
    [self transformItemViews];
    
    //notify delegate of offset change
    if (fabs(_scrollOffset - _previousScrollOffset) > 0.000001)
    {
        [self pushAnimationState:YES];
        [_delegate sliderNeighborDidScroll:self];
        [self popAnimationState];
    }
    
    //notify delegate of index change
    if (_previousItemIndex != self.currentItemIndex)
    {
        [self pushAnimationState:YES];
        if([_delegate respondsToSelector:@selector(sliderNeighborCurrentItemIndexDidChange:from:to:)]) {
            [_delegate sliderNeighborCurrentItemIndexDidChange:self from:_previousItemIndex to:self.currentItemIndex];
        }
        [self popAnimationState];
    }
    
    //update previous index
    _previousScrollOffset = _scrollOffset;
    _previousItemIndex = self.currentItemIndex;
    [self.indicator setCurrentPoint:self.currentItemIndex];
}

- (void)startAnimation
{
    if (!_timer) {
        self.timer = [NSTimer timerWithTimeInterval:1.0/60.0
                                             target:self
                                           selector:@selector(step)
                                           userInfo:nil
                                            repeats:YES];
        
        [[NSRunLoop mainRunLoop] addTimer:_timer forMode:NSDefaultRunLoopMode];
        [[NSRunLoop mainRunLoop] addTimer:_timer forMode:UITrackingRunLoopMode];
        
    }
}

- (void)stopAnimation
{
    [_timer invalidate];
    _timer = nil;
}

#pragma mark -
#pragma mark view management

- (NSArray *)indexesForVisibleItems
{
    return [[_itemViews allKeys] sortedArrayUsingSelector:@selector(compare:)];
}

- (NSArray *)visibleItemViews
{
    NSArray *indexes = [self indexesForVisibleItems];
    return [_itemViews objectsForKeys:indexes notFoundMarker:[NSNull null]];
}

- (UIView *)itemViewAtIndex:(NSInteger)index
{
    return _itemViews[@(index)];
}

- (UIView *)currentItemView
{
    return [self itemViewAtIndex:self.currentItemIndex];
}

- (NSInteger)indexOfItemView:(UIView *)view
{
    NSInteger index = [[_itemViews allValues] indexOfObject:view];
    if (index != NSNotFound) {
        return [[_itemViews allKeys][index] integerValue];
    }
    return NSNotFound;
}

- (NSInteger)indexOfItemViewOrSubview:(UIView *)view
{
    NSInteger index = [self indexOfItemView:view];
    if (index == NSNotFound && view != nil && view != _contentView) {
        return [self indexOfItemViewOrSubview:view.superview];
    }
    return index;
}

- (UIView *)itemViewAtPoint:(CGPoint)point
{
    for (UIView *view in [[[_itemViews allValues] sortedArrayUsingFunction:(NSInteger (*)(id, id, void *))sliderNeighorCompareViewDepth context:(__bridge void *)self] reverseObjectEnumerator])
    {
        if ([view.superview.layer hitTest:point]) {
            return view;
        }
    }
    return nil;
}

- (void)setItemView:(UIView *)view forIndex:(NSInteger)index
{
    _itemViews[@(index)] = view;
}

- (void)removeViewAtIndex:(NSInteger)index
{
    NSMutableDictionary *newItemViews = [NSMutableDictionary dictionaryWithCapacity:[_itemViews count] - 1];
    for (NSNumber *number in [self indexesForVisibleItems])
    {
        NSInteger i = [number integerValue];
        if (i < index) {
            newItemViews[number] = _itemViews[number];
        } else if (i > index) {
            newItemViews[@(i - 1)] = _itemViews[number];
        }
    }
    self.itemViews = newItemViews;
    [self.indicator setPointCount:self.itemViews.count];
}

- (void)insertView:(UIView *)view atIndex:(NSInteger)index
{
    NSMutableDictionary *newItemViews = [NSMutableDictionary dictionaryWithCapacity:[_itemViews count] + 1];
    for (NSNumber *number in [self indexesForVisibleItems])
    {
        NSInteger i = [number integerValue];
        if (i < index) {
            newItemViews[number] = _itemViews[number];
        } else {
            newItemViews[@(i + 1)] = _itemViews[number];
        }
    }
    if (view) {
        [self setItemView:view forIndex:index];
    }
    self.itemViews = newItemViews;
    
    [self.indicator setPointCount:self.itemViews.count];
}

#pragma mark -
#pragma mark View loading

- (UIView *)loadViewAtIndex:(NSInteger)index withContainerView:(UIView *)containerView
{
    [self pushAnimationState:NO];
    
    UIView *view = nil;
    if (index < 0) {
        view = [_dataSource sliderNeighbor:self placeholderViewAtIndex:(NSInteger)(ceil((CGFloat)_numberOfPlaceholdersToShow/2.0)) + index reusingView:[self dequeuePlaceholderView]];
    } else if (index >= _numberOfItems) {
        view = [_dataSource sliderNeighbor:self placeholderViewAtIndex:_numberOfPlaceholdersToShow/2.0 + index - _numberOfItems reusingView:[self dequeuePlaceholderView]];
    } else {
        view = [_dataSource sliderNeighbor:self viewForItemAtIndex:index reusingView:[self dequeueItemView]];
    }
    
    if (view == nil) {
        view = [[UIView alloc] init];
    }
    
    [self setItemView:view forIndex:index];
    if (containerView) {
        //get old item view
        UIView *oldItemView = [containerView.subviews lastObject];
        if (index < 0 || index >= _numberOfItems) {
            [self queuePlaceholderView:oldItemView];
        } else {
            [self queueItemView:oldItemView];
        }
        
        //set container frame
        CGRect frame = containerView.bounds;
        if(_vertical) {
            frame.size.width = view.frame.size.width;
            frame.size.height = MIN(_itemWidth, view.frame.size.height);
        } else {
            frame.size.width = MIN(_itemWidth, view.frame.size.width);
            frame.size.height = view.frame.size.height;
        }
        containerView.bounds = frame;
        
        //set view frame
        frame = view.frame;
        frame.origin.x = (containerView.bounds.size.width - frame.size.width) / 2.0;
        frame.origin.y = (containerView.bounds.size.height - frame.size.height) / 2.0;
        view.frame = frame;
        
        //switch views
        [oldItemView removeFromSuperview];
        [containerView addSubview:view];
    } else {
        [_contentView addSubview:[self containView:view]];
    }
    view.superview.layer.opacity = 0.0;
    [self transformItemView:view atIndex:index];
    
    [self popAnimationState];
    
    return view;
}

- (UIView *)loadViewAtIndex:(NSInteger)index
{
    return [self loadViewAtIndex:index withContainerView:nil];
}

- (void)loadUnloadViews
{
    //set item width
    [self updateItemWidth];
    
    //update number of visible items
    [self updateNumberOfVisibleItems];
    
    //calculate visible view indices
    NSMutableSet *visibleIndices = [NSMutableSet setWithCapacity:_numberOfVisibleItems];
    NSInteger min = -(NSInteger)(ceil((CGFloat)_numberOfPlaceholdersToShow/2.0));
    NSInteger max = _numberOfItems - 1 + _numberOfPlaceholdersToShow/2;
    NSInteger offset = self.currentItemIndex - _numberOfVisibleItems/2;
    if (!_wrapEnabled) {
        offset = MAX(min, MIN(max - _numberOfVisibleItems + 1, offset));
    }
    for (NSInteger i = 0; i < _numberOfVisibleItems; i++)
    {
        NSInteger index = i + offset;
        if (_wrapEnabled) {
            index = [self clampedIndex:index];
        }
        CGFloat alpha = [self alphaForItemWithOffset:[self offsetForItemAtIndex:index]];
        if (alpha) {
            //only add views with alpha > 0
            [visibleIndices addObject:@(index)];
        }
    }
    
    //remove offscreen views
    for (NSNumber *number in [_itemViews allKeys])
    {
        if (![visibleIndices containsObject:number]) {
            UIView *view = _itemViews[number];
            if ([number integerValue] < 0 || [number integerValue] >= _numberOfItems) {
                [self queuePlaceholderView:view];
            } else {
                [self queueItemView:view];
            }
            [view.superview removeFromSuperview];
            [(NSMutableDictionary *)_itemViews removeObjectForKey:number];
        }
    }
    
    //add onscreen views
    for (NSNumber *number in visibleIndices)
    {
        UIView *view = _itemViews[number];
        if (view == nil) {
            [self loadViewAtIndex:[number integerValue]];
        }
    }
}

#pragma mark View queing

- (void)queueItemView:(UIView *)view
{
    if (view) {
        [_itemViewPool addObject:view];
    }
}

- (void)queuePlaceholderView:(UIView *)view
{
    if (view) {
        [_placeholderViewPool addObject:view];
    }
}

- (UIView *)dequeueItemView
{
    UIView *view = [_itemViewPool anyObject];
    if (view) {
        [_itemViewPool removeObject:view];
    }
    return view;
}

- (UIView *)dequeuePlaceholderView
{
    UIView *view = [_placeholderViewPool anyObject];
    if (view) {
        [_placeholderViewPool removeObject:view];
    }
    return view;
}

- (void)setIndicator:(WXIndicatorView *)indicator
{
    _indicator = indicator;
    [_indicator setPointCount:self.numberOfItems];
    [_indicator setCurrentPoint:[self currentItemIndex]];
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    _contentView.frame = self.bounds;
    [self layOutItemViews];
}

@end

@implementation NSObject (WXSliderNeighborView)

- (NSUInteger)numberOfPlaceholdersInSliderNeighborView:(__unused WXSliderNeighborView *)sliderNeighbor { return 0; }
- (void)sliderNeighborWillBeginScrollingAnimation:(__unused WXSliderNeighborView *)sliderNeighbor {}
- (void)sliderNeighborDidEndScrollingAnimation:(__unused WXSliderNeighborView *)sliderNeighbor {}
- (void)sliderNeighborDidScroll:(__unused WXSliderNeighborView *)sliderNeighbor {}

- (void)sliderNeighborCurrentItemIndexDidChange:(__unused WXSliderNeighborView *)sliderNeighbor {}
- (void)sliderNeighborWillBeginDragging:(__unused WXSliderNeighborView *)sliderNeighbor {}
- (void)sliderNeighborDidEndDragging:(__unused WXSliderNeighborView *)sliderNeighbor willDecelerate:(__unused BOOL)decelerate {}
- (void)sliderNeighborWillBeginDecelerating:(__unused WXSliderNeighborView *)sliderNeighbor {}
- (void)sliderNeighborDidEndDecelerating:(__unused WXSliderNeighborView *)sliderNeighbor {}

- (BOOL)sliderNeighbor:(__unused WXSliderNeighborView *)sliderNeighbor shouldSelectItemAtIndex:(__unused NSInteger)index { return YES; }
- (void)sliderNeighbor:(__unused WXSliderNeighborView *)sliderNeighbor didSelectItemAtIndex:(__unused NSInteger)index {}

- (CGFloat)sliderNeighborItemWidth:(__unused WXSliderNeighborView *)sliderNeighbor { return 0; }
- (CATransform3D)sliderNeighbor:(__unused WXSliderNeighborView *)sliderNeighbor
   itemTransformForOffset:(__unused CGFloat)offset
            baseTransform:(CATransform3D)transform { return transform; }
- (CGFloat)sliderNeighbor:(__unused WXSliderNeighborView *)sliderNeighbor
     valueForOption:(__unused WXSliderNeighborOption)option
        withDefault:(CGFloat)value { return value; }

@end

@interface WXSliderNeighborComponent() {
    WXPixelType neighborSpace;
    CGFloat neighborAlpha;
    CGFloat neighborScale;
    CGFloat currentItemScale;
}

@property (nonatomic, strong) WXSliderNeighborView *sliderView;
@property (nonatomic, assign) BOOL  autoPlay;
@property (nonatomic, assign) NSUInteger interval;
@property (nonatomic, assign) NSInteger index;
@property (nonatomic, strong) NSMutableArray *items;
@property (nonatomic, strong) NSTimer *autoTimer;
@property (nonatomic, assign) BOOL  sliderChangeEvent;
@property (nonatomic, assign) NSInteger currentIndex;
@property (nonatomic) CGRect itemRect;
@property (nonatomic, assign) BOOL scrollable;

@end

#define DEFAULT_NEIGHBOR_ITEM_SCALE 0.8
#define DEFAULT_CURRENT_ITEM_SCALE 0.9
#define DEFAULT_NEIGHBOR_ALPHA 0.6
#define DEFAULT_ANIMATION_DURATION 0.3
#define DEFAULT_NEIGHBOR_SPACE 25


@implementation WXSliderNeighborComponent

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance {
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _sliderChangeEvent = NO;
        _interval = 3000;
        _items = [NSMutableArray array];
        _itemRect = CGRectNull;
        self->neighborAlpha = DEFAULT_NEIGHBOR_ALPHA;
        self->neighborScale = DEFAULT_NEIGHBOR_ITEM_SCALE;
        self->currentItemScale = DEFAULT_CURRENT_ITEM_SCALE;
        self->neighborSpace = [WXConvert WXPixelType:@(DEFAULT_NEIGHBOR_SPACE) scaleFactor:self.weexInstance.pixelScaleFactor];
        _scrollable = YES;
        [self setAttributes:attributes];
    
        _scrollable = attributes[@"scrollable"] ? [WXConvert BOOL:attributes[@"scrollable"]] : YES;
    }
    self.cssNode->style.flex_direction = CSS_FLEX_DIRECTION_ROW;
    
    return self;
}


#pragma mark life circle

- (UIView *)loadView
{
    _sliderView = [[WXSliderNeighborView alloc] init];
    return _sliderView;
}

- (void)dealloc
{
    _sliderView.delegate = nil;
    _sliderView.dataSource = nil;
    if (_autoPlay) {
        [self _stopAutoPlayTimer];
    }
    _sliderView = nil;
    [self.items removeAllObjects];
}

- (void)viewDidUnload
{
    [self.items removeAllObjects];
}

- (void)viewDidLoad
{
    _sliderView = (WXSliderNeighborView *)self.view;
    _sliderView.delegate = self;
    _sliderView.dataSource = self;
    _sliderView.contentView.clipsToBounds = YES;
    _sliderView.scrollEnabled = _scrollable;
    if (_autoPlay) {
        [self _startAutoPlayTimer];
    } else {
        [self _stopAutoPlayTimer];
    }
}

- (void)layoutDidFinish {
    
    [_sliderView setCurrentItemIndex:_index];
}

- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    if (subcomponent->_positionType == WXPositionTypeFixed) {
        [self.weexInstance.rootView addSubview:subcomponent.view];
        return;
    }
    
    // use _lazyCreateView to forbid component like cell's view creating
    if(_lazyCreateView) {
        subcomponent->_lazyCreateView = YES;
    }
    
    if (!subcomponent->_lazyCreateView || (self->_lazyCreateView && [self isViewLoaded])) {
        UIView *view = subcomponent.view;
        
        WXSliderNeighborView *sliderView = (WXSliderNeighborView *)self.view;
        if ([view isKindOfClass:[WXIndicatorView class]]) {
            [sliderView addSubview:view];
            return;
        }
        
        if(index < 0) {
            [self.items addObject:view];
        } else {
            [self.items insertObject:view atIndex:index];
        }
        
        subcomponent.isViewFrameSyncWithCalculated = NO;
        
        if (index == -1) {
            [sliderView insertView:view atIndex:index];
        } else {
            NSInteger offset = 0;
            for (int i = 0; i < [self.items count]; ++i) {
                if (index == i) break;
                
                if ([self.items[i] isKindOfClass:[WXIndicatorView class]]) {
                    offset++;
                }
            }
            [sliderView insertView:view atIndex:index - offset];
        }
        
        [sliderView reloadData];
    }
}

#pragma mark attributes update
- (void)setAttributes:(NSDictionary *)attributes
{
    if (attributes[@"index"]) {
        _index = [attributes[@"index"] integerValue];
        _currentIndex = _index;
    }
    if (attributes[@"autoPlay"]) {
        _autoPlay = [attributes[@"autoPlay"] boolValue];
        if (_autoPlay) {
            [self _startAutoPlayTimer];
        } else {
            [self _stopAutoPlayTimer];
        }
    }
    if (attributes[@"interval"]) {
        _interval = [attributes[@"interval"] integerValue];
        
        [self _stopAutoPlayTimer];
        
        if (_autoPlay) {
            [self _startAutoPlayTimer];
        }
    }
    if (attributes[@"neighborScale"]) {
        [self setNeighborScale:attributes];
    }
    if (attributes[@"currentItemScale"]) {
        [self setCurrentItemScale:attributes];
    }
    if (attributes[@"neighborAlpha"]) {
        [self setNeighborAlpha:attributes];
    }
    if (attributes[@"neighborSpace"]) {
        [self setNeighborSpace:attributes];
    }
    if (attributes[@"scrollable"]) {
        _scrollable = attributes[@"scrollable"] ? [WXConvert BOOL:attributes[@"scrollable"]] : YES;
        ((WXSliderNeighborView *)self.view).scrollEnabled = _scrollable;
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    [self setAttributes:attributes];
    [self.sliderView setCurrentItemIndex:_index];
    [self updateSliderPage:YES];
}

#pragma mark styles update
- (void)updateStyles:(NSDictionary *)styles {
    
}

#pragma mark event
- (void)addEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"change"]) {
        _sliderChangeEvent = YES;
    }
}

- (void)removeEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"change"]) {
        _sliderChangeEvent = NO;
    }
}

- (void)setIndicatorView:(WXIndicatorView *)indicatorView
{
    NSAssert(_sliderView, @"");
    [_sliderView setIndicator:indicatorView];
}

- (void)setNeighborSpace:(NSDictionary *)attributes{
    if(attributes[@"neighborSpace"]) {
        self->neighborSpace = [WXConvert WXPixelType:attributes[@"neighborSpace"] scaleFactor:self.weexInstance.pixelScaleFactor];
    }
}

- (void)setNeighborAlpha:(NSDictionary *)attributes {
    if (attributes[@"neighborAlpha"]) {
        self->neighborAlpha = [WXConvert CGFloat:attributes[@"neighborAlpha"]];
        self->neighborAlpha = self->neighborAlpha >= 0 ? self->neighborAlpha : 0;
        self->neighborAlpha = self->neighborAlpha <= 1 ? self->neighborAlpha: 1;
    }
}

- (void)setCurrentItemScale:(NSDictionary *)attributes {
    if (attributes[@"currentItemScale"]) {
        self->currentItemScale = [WXConvert CGFloat:attributes[@"currentItemScale"]];
        self->currentItemScale = self->currentItemScale >= 0 ? self->currentItemScale : 0;
        self->currentItemScale = self->currentItemScale <= 1 ? self->currentItemScale: 1;
    }
}

- (void)setNeighborScale:(NSDictionary *)attributes
{
    if (attributes[@"neighborScale"]) {
        self->neighborScale = [WXConvert CGFloat:attributes[@"neighborScale"]];
        self->neighborScale = self->neighborScale >= 0? self->neighborScale : 0;
        self->neighborScale = self->neighborScale <= 1? self->neighborScale :1;
    }
}

#pragma mark Private Methods

- (void)_startAutoPlayTimer
{
    if (!self.autoTimer || ![self.autoTimer isValid]) {
        __weak __typeof__(self) weakSelf = self;
        self.autoTimer = [NSTimer wx_scheduledTimerWithTimeInterval:_interval/1000.0f block:^() {
            [weakSelf _autoPlayOnTimer];
        } repeats:YES];
        [[NSRunLoop currentRunLoop] addTimer:self.autoTimer forMode:NSRunLoopCommonModes];
    }
}

- (void)_stopAutoPlayTimer
{
    if (self.autoTimer && [self.autoTimer isValid]) {
        [self.autoTimer invalidate];
        self.autoTimer = nil;
    }
}

- (void)_autoPlayOnTimer
{
    WXSliderNeighborView *sliderNeighborView = (WXSliderNeighborView *)self.view;
    
    int indicatorCnt = 0;
    for (int i = 0; i < [self.items count]; ++i) {
        if ([self.items[i] isKindOfClass:[WXIndicatorView class]]) {
            indicatorCnt++;
        }
    }
    
    self.currentIndex ++;
    if (self.currentIndex >= self.items.count - indicatorCnt) {
        self.currentIndex = 0;
    }
    
    [sliderNeighborView setCurrentItemIndex:self.currentIndex];
}

#pragma mark sliderNeighbor Delegate && dataSource

- (NSInteger)numberOfItemsInSliderNeighbor:(WXSliderNeighborView *)sliderNeighbor {
    return [self.items count];
}

- (NSInteger)numberOfPlaceholdersInsliderNeighbor:(WXSliderNeighborView *)sliderNeighbor {
    return 2;
}

- (UIView *)sliderNeighbor:(WXSliderNeighborView *)sliderNeighbor viewForItemAtIndex:(NSInteger)index reusingView:(UIView *)view {
    
    if (!view) {
        if (index < [self.items count]) {
            view = self.items[index];
        }else {
            return nil;
        }
    } else {
        view.tag = 1;
    }
    
    if (CGRectIsNull(_itemRect)) {
        _itemRect = view.frame;
    }
    if (index == [self.items count] - 1) {
        [self updateSliderPage:NO];
    }
    
    return view;
}

- (BOOL)sliderNeighbor:(WXSliderNeighborView *)sliderNeighbor shouldSelectItemAtIndex:(NSInteger)index {
    
    return YES;
}

- (UIView *)sliderNeighbor:(WXSliderNeighborView *)sliderNeighbor placeholderViewAtIndex:(NSInteger)index reusingView:(UIView *)view
{
    
    return view;
}

- (void)sliderNeighborDidEndScrollingAnimation:(WXSliderNeighborView *)sliderNeighbor
{
    [self updateSliderPage:YES];
}

- (void)sliderNeighbor:(WXSliderNeighborView *)sliderView didScrollToItemAtIndex:(NSInteger)index
{
    self.currentIndex = index;
    
    if (_sliderChangeEvent) {
        [self fireEvent:@"change" params:@{@"index":@(index)} domChanges:@{@"attrs": @{@"index": @(index)}}];
    }
}

- (void)sliderNeighborWillBeginDragging:(WXSliderNeighborView *)sliderNeighbor
{
    [self _stopAutoPlayTimer];
}

- (void)sliderNeighborDidEndDragging:(WXSliderNeighborView *)sliderNeighbor willDecelerate:(BOOL)decelerate {
    if (_autoPlay) {
        [self _startAutoPlayTimer];
    }
}

- (void)updateSliderPage:(BOOL)animate
{
    __block UIView * currentView  = [self.sliderView itemViewAtIndex:[_sliderView currentItemIndex]];
    __block UIView * lastView  = [self.sliderView itemViewAtIndex:[_sliderView lastItemIndex]];
    __block UIView * nextView  = [self.sliderView itemViewAtIndex:[_sliderView nextItemIndex]];
    
    __block CGAffineTransform transfrom = CGAffineTransformIdentity;
    float duration = 0;
    __weak typeof(self) weakSelf = self;
    if (animate) {
        duration = DEFAULT_ANIMATION_DURATION;
    }
    
    [UIView animateWithDuration:duration animations:^{
        __strong typeof(self) strongSelf = weakSelf;
        if (strongSelf) {
            currentView.alpha = 1.0;
            
            if (fabs(strongSelf->currentItemScale) > CGFLOAT_MIN) {
                transfrom = CGAffineTransformConcat(transfrom,CGAffineTransformMakeScale(strongSelf->currentItemScale, strongSelf->currentItemScale));
            }
            currentView.transform = transfrom;
            transfrom = CGAffineTransformIdentity;
            if (fabs(strongSelf->neighborScale) <= CGFLOAT_MIN) {
                strongSelf->neighborScale = DEFAULT_NEIGHBOR_ITEM_SCALE;
            }
            
            CGFloat tx = 0.5*_itemRect.size.width*((1-self->neighborScale)+(1-0.9))-self->neighborSpace;
            transfrom = CGAffineTransformConcat(transfrom, CGAffineTransformMakeScale(strongSelf->neighborScale, strongSelf->neighborScale));
            nextView.transform = CGAffineTransformConcat(transfrom,  CGAffineTransformMakeTranslation(-tx, 0));
            lastView.transform = CGAffineTransformConcat(transfrom,  CGAffineTransformMakeTranslation(tx, 0));
            lastView.alpha = strongSelf->neighborAlpha;
            nextView.alpha = strongSelf->neighborAlpha;
        }
    }];
}

@end

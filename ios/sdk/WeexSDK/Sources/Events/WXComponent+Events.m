/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent+Events.h"
#import "WXComponent.h"
#import "WXComponent_internal.h"
#import "WXSDKInstance.h"
#import "WXAssert.h"
#import "WXUtility.h"
#import "WXSDKManager.h"
#import <objc/runtime.h>
#import <UIKit/UIGestureRecognizerSubclass.h>

#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"

@interface UITouch (WXTouchGestureRecognizer)

@property (nonatomic, strong) NSNumber *wx_identifier;

@end

@implementation UITouch (WXTouchGestureRecognizer)

- (NSNumber *)wx_identifier
{
    return objc_getAssociatedObject(self, _cmd);
}

- (void)setWx_identifier:(NSNumber *)wx_identifier
{
    objc_setAssociatedObject(self, @selector(wx_identifier), wx_identifier, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end

@interface UIGestureRecognizer (WXGesture)

@property (nonatomic, strong) NSNumber *wx_identifier;

@end

@implementation UIGestureRecognizer (WXGesture)

- (NSNumber *)wx_identifier
{
    NSNumber *identifier = objc_getAssociatedObject(self, _cmd);
    if (!identifier) {
        static NSUInteger _gestureIdentifier;
        identifier = @(_gestureIdentifier++);
        self.wx_identifier = identifier;
    }
    
    return identifier;
}

- (void)setWx_identifier:(NSNumber *)wx_identifier
{
    objc_setAssociatedObject(self, @selector(wx_identifier), wx_identifier, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end

@interface WXTouchGestureRecognizer : UIGestureRecognizer

@property (nonatomic, assign) BOOL listenTouchStart;
@property (nonatomic, assign) BOOL listenTouchMove;
@property (nonatomic, assign) BOOL listenTouchEnd;
@property (nonatomic, assign) BOOL listenTouchCancel;

- (instancetype)initWithComponent:(WXComponent *)component NS_DESIGNATED_INITIALIZER;

@end

@implementation WXComponent (Events)

#pragma mark Public

- (void)fireEvent:(NSString *)eventName params:(NSDictionary *)params
{
    [self fireEvent:eventName params:params domChanges:nil];
}

- (void)fireEvent:(NSString *)eventName params:(NSDictionary *)params domChanges:(NSDictionary *)domChanges
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    NSTimeInterval timeSp = [[NSDate date] timeIntervalSince1970] * 1000;
    [dict setObject:@(timeSp) forKey:@"timestamp"];
    if (params) {
        [dict addEntriesFromDictionary:params];
    }
    
    [[WXSDKManager bridgeMgr] fireEvent:self.weexInstance.instanceId ref:self.ref type:eventName params:dict domChanges:domChanges];
}

- (void)addEvent:(NSString *)addEventName
{
    WXAssertMainThread();
}

- (void)removeEvent:(NSString *)removeEventName
{
    WXAssertMainThread();
}

#pragma mark Add & Remove Event


#define WX_ADD_EVENT(eventName, addSelector) \
if ([addEventName isEqualToString:@#eventName]) {\
    [self addSelector];\
}

#define WX_REMOVE_EVENT(eventName, removeSelector) \
if ([removeEventName isEqualToString:@#eventName]) {\
    [self removeSelector];\
}

- (void)_initEvents:(NSArray *)events
{
    for (NSString *addEventName in events) {
        [self _addEventOnMainThread:addEventName];
    }
}

- (void)_addEventOnMainThread:(NSString *)addEventName
{
    WX_ADD_EVENT(appear, addAppearEvent)
    WX_ADD_EVENT(disappear, addDisappearEvent)
    
    WX_ADD_EVENT(click, addClickEvent)
    WX_ADD_EVENT(swipe, addSwipeEvent)
    WX_ADD_EVENT(longpress, addLongPressEvent)
    
    WX_ADD_EVENT(panstart, addPanStartEvent)
    WX_ADD_EVENT(panmove, addPanMoveEvent)
    WX_ADD_EVENT(panend, addPanEndEvent)
    
    WX_ADD_EVENT(touchstart, addTouchStartEvent)
    WX_ADD_EVENT(touchmove, addTouchMoveEvent)
    WX_ADD_EVENT(touchend, addTouchEndEvent)
    WX_ADD_EVENT(touchcancel, addTouchCancelEvent)
    
    [self addEvent:addEventName];
}

- (void)_removeEventOnMainThread:(NSString *)removeEventName
{
    WX_REMOVE_EVENT(appear, removeAppearEvent)
    WX_REMOVE_EVENT(disappear, removeDisappearEvent)
    
    WX_REMOVE_EVENT(click, removeClickEvent)
    WX_REMOVE_EVENT(swipe, removeSwipeEvent)
    WX_REMOVE_EVENT(longpress, removeLongPressEvent)
    
    WX_REMOVE_EVENT(panstart, removePanStartEvent)
    WX_REMOVE_EVENT(panmove, removePanMoveEvent)
    WX_REMOVE_EVENT(panend, removePanEndEvent)
    
    WX_REMOVE_EVENT(touchstart, removeTouchStartEvent)
    WX_REMOVE_EVENT(touchmove, removeTouchMoveEvent)
    WX_REMOVE_EVENT(touchend, removeTouchEndEvent)
    WX_REMOVE_EVENT(touchcancel, removeTouchCancelEvent)
    
    [self removeEvent:removeEventName];
}

- (void)_removeAllEvents
{
    [self removeClickEvent];
    [self removeLongPressEvent];
    [self removePanStartEvent];
    [self removePanMoveEvent];
    [self removePanEndEvent];
    [self removeTouchStartEvent];
    [self removeTouchMoveEvent];
    [self removeTouchEndEvent];
    [self removeTouchCancelEvent];
    [self removeSwipeEvent];
}

#pragma mark - Appear & Disappear

- (void)addAppearEvent
{
    _appearEvent = YES;
    [self.ancestorScroller addScrollToListener:self];
}

- (void)addDisappearEvent
{
    _disappearEvent = YES;
    [self.ancestorScroller addScrollToListener:self];
}

- (void)removeAppearEvent
{
    _appearEvent = NO;
    [self.ancestorScroller removeScrollToListener:self];
}

- (void)removeDisappearEvent
{
    _disappearEvent = NO;
    [self.ancestorScroller removeScrollToListener:self];
}

#pragma mark - Click Event

- (void)addClickEvent
{
    if (!_tapGesture) {
        _tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(onClick:)];
        _tapGesture.delegate = self;
        [self.view addGestureRecognizer:_tapGesture];
    }
}

- (void)removeClickEvent
{
    if (_tapGesture) {
        _tapGesture.delegate = nil;
        _tapGesture = nil;
    }
}

- (void)onClick:(__unused UITapGestureRecognizer *)recognizer
{
    NSMutableDictionary *position = [[NSMutableDictionary alloc] initWithCapacity:4];
    
    if (!CGRectEqualToRect(self.calculatedFrame, CGRectZero)) {
        CGRect frame = [self.view.superview convertRect:self.calculatedFrame toView:self.view.window];
        position[@"x"] = @(frame.origin.x);
        position[@"y"] = @(frame.origin.y);
        position[@"width"] = @(frame.size.width);
        position[@"height"] = @(frame.size.height);
    }

    [self fireEvent:@"click" params:@{@"position":position}];
}

#pragma mark - Swipe event

- (void)addSwipeEvent
{
    if (_swipeGestures) {
        return;
    }
    
    _swipeGestures = [NSMutableArray arrayWithCapacity:4];
    
    // It's a little weird because the UISwipeGestureRecognizer.direction property is an options-style bit mask, but each recognizer can only handle one direction
    SEL selector = @selector(onSwipe:);
    UISwipeGestureRecognizer *upSwipeRecognizer = [[UISwipeGestureRecognizer alloc] initWithTarget:self
                                                                                            action:selector];
    upSwipeRecognizer.direction = UISwipeGestureRecognizerDirectionUp;
    upSwipeRecognizer.delegate = self;
    [_swipeGestures addObject:upSwipeRecognizer];
    [self.view addGestureRecognizer:upSwipeRecognizer];
    
    UISwipeGestureRecognizer *downSwipeRecognizer = [[UISwipeGestureRecognizer alloc] initWithTarget:self
                                                                                              action:selector];
    downSwipeRecognizer.direction = UISwipeGestureRecognizerDirectionDown;
    downSwipeRecognizer.delegate = self;
    [_swipeGestures addObject:downSwipeRecognizer];
    [self.view addGestureRecognizer:downSwipeRecognizer];
    
    UISwipeGestureRecognizer *rightSwipeRecognizer = [[UISwipeGestureRecognizer alloc] initWithTarget:self
                                                                                               action:selector];
    rightSwipeRecognizer.direction = UISwipeGestureRecognizerDirectionRight;
    rightSwipeRecognizer.delegate = self;
    [_swipeGestures addObject:rightSwipeRecognizer];
    [self.view addGestureRecognizer:rightSwipeRecognizer];
    
    UISwipeGestureRecognizer *leftSwipeRecognizer = [[UISwipeGestureRecognizer alloc] initWithTarget:self
                                                                                              action:selector];
    leftSwipeRecognizer.direction = UISwipeGestureRecognizerDirectionLeft;
    leftSwipeRecognizer.delegate = self;
    [_swipeGestures addObject:leftSwipeRecognizer];
    [self.view addGestureRecognizer:leftSwipeRecognizer];
}

- (void)removeSwipeEvent
{
    if (_swipeGestures == nil) {
        return;
    }
  
    for (UISwipeGestureRecognizer *recognizer in _swipeGestures) {
        recognizer.delegate = nil;
    }
    
    _swipeGestures = nil;
}

- (void)onSwipe:(UISwipeGestureRecognizer *)gesture
{
    UISwipeGestureRecognizerDirection direction = gesture.direction;
    
    NSString *directionString;
    switch(direction) {
        case UISwipeGestureRecognizerDirectionLeft:
            directionString = @"left";
            break;
        case UISwipeGestureRecognizerDirectionRight:
            directionString = @"right";
            break;
        case UISwipeGestureRecognizerDirectionUp:
            directionString = @"up";
            break;
        case UISwipeGestureRecognizerDirectionDown:
            directionString = @"down";
            break;
        default:
            directionString = @"unknown";
    }
    
    CGPoint screenLocation = [gesture locationInView:self.view.window];
    CGPoint pageLoacation = [gesture locationInView:self.weexInstance.rootView];
    NSDictionary *resultTouch = [self touchResultWithScreenLocation:screenLocation pageLocation:pageLoacation identifier:gesture.wx_identifier];
    [self fireEvent:@"swipe" params:@{@"direction":directionString, @"changedTouches":resultTouch ? @[resultTouch] : @[]}];
}

#pragma mark - Long Press

- (void)addLongPressEvent
{
    if (!_longPressGesture) {
        _longPressGesture = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(onLongPress:)];
        _longPressGesture.delegate = self;
        [self.view addGestureRecognizer:_longPressGesture];
    }
}

- (void)removeLongPressEvent
{
    if (_longPressGesture) {
        _longPressGesture.delegate = nil;
        _longPressGesture = nil;
    }
}

- (void)onLongPress:(UILongPressGestureRecognizer *)gesture
{
    if (gesture.state == UIGestureRecognizerStateBegan) {
        CGPoint screenLocation = [gesture locationInView:self.view.window];
        CGPoint pageLoacation = [gesture locationInView:self.weexInstance.rootView];
        NSDictionary *resultTouch = [self touchResultWithScreenLocation:screenLocation pageLocation:pageLoacation identifier:gesture.wx_identifier];
        [self fireEvent:@"longpress" params:@{@"changedTouches":resultTouch ? @[resultTouch] : @[]}];
    } else if (gesture.state == UIGestureRecognizerStateEnded) {
        gesture.wx_identifier = nil;
    }
}

#pragma makr - Pan

- (void)addPanGesture
{
    if (!_panGesture) {
        _panGesture = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(onPan:)];
        _panGesture.delegate = self;
        [self.view addGestureRecognizer:_panGesture];
    }
}

- (void)addPanStartEvent
{
    _listenPanStart = YES;
    [self addPanGesture];
}

- (void)addPanMoveEvent
{
    _listenPanMove = YES;
    [self addPanGesture];
}

- (void)addPanEndEvent
{
    _listenPanEnd = YES;
    [self addPanGesture];
}

- (void)onPan:(UIPanGestureRecognizer *)gesture
{
    CGPoint screenLocation = [gesture locationInView:self.view.window];
    CGPoint pageLoacation = [gesture locationInView:self.weexInstance.rootView];
    NSString *eventName;
    NSDictionary *resultTouch = [self touchResultWithScreenLocation:screenLocation pageLocation:pageLoacation identifier:gesture.wx_identifier];
    
    if (gesture.state == UIGestureRecognizerStateBegan) {
        eventName = @"panstart";
    } else if (gesture.state == UIGestureRecognizerStateEnded) {
        eventName = @"panend";
        gesture.wx_identifier = nil;
    } else if (gesture.state == UIGestureRecognizerStateChanged) {
        eventName = @"panmove";
    }
    
    if (eventName) {
        [self fireEvent:eventName params:@{@"changedTouches":resultTouch ? @[resultTouch] : @[]}];
    }
}

- (void)removePanStartEvent
{
    _listenPanStart = NO;
    [self checkRemovePanGesture];
}

- (void)removePanMoveEvent
{
    _listenPanMove = NO;
    [self checkRemovePanGesture];
}

- (void)removePanEndEvent
{
    _listenPanEnd = NO;
    [self checkRemovePanGesture];
}

- (void)checkRemovePanGesture
{
    if (_panGesture && !_listenPanStart && !_listenPanMove && !_listenPanEnd) {
        _panGesture.delegate = nil;
        _panGesture = nil;
    }
}

#pragma mark - Touch Event

- (WXTouchGestureRecognizer *)touchGesture
{
    if (!_touchGesture) {
        _touchGesture = [[WXTouchGestureRecognizer alloc] initWithComponent:self];
        _touchGesture.delegate = self;
        [self.view addGestureRecognizer:_touchGesture];
    }
    
    return _touchGesture;
}

- (void)addTouchStartEvent
{
    self.touchGesture.listenTouchStart = YES;
}

- (void)addTouchMoveEvent
{
    self.touchGesture.listenTouchMove = YES;
}

- (void)addTouchEndEvent
{
    self.touchGesture.listenTouchEnd = YES;
}

- (void)addTouchCancelEvent
{
    self.touchGesture.listenTouchCancel = YES;
}

- (void)removeTouchStartEvent
{
    _touchGesture.listenTouchStart = NO;
    [self checkRemoveTouchGesture];
}

- (void)removeTouchMoveEvent
{
    _touchGesture.listenTouchMove = NO;
    [self checkRemoveTouchGesture];
}

- (void)removeTouchEndEvent
{
    _touchGesture.listenTouchEnd = NO;
    [self checkRemoveTouchGesture];
}

- (void)removeTouchCancelEvent
{
    _touchGesture.listenTouchCancel = NO;
    [self checkRemoveTouchGesture];
}

- (void)checkRemoveTouchGesture
{
    if (_touchGesture && !_touchGesture.listenTouchStart && !_touchGesture.listenTouchMove && !_touchGesture.listenTouchEnd && !_touchGesture.listenTouchCancel) {
        _touchGesture.delegate = nil;
        _touchGesture = nil;
    }
}

#pragma mark - UIGestureRecognizerDelegate

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch
{
    return YES;
}

- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer
{
    return YES;
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer
{
    // trigger touches
    if ([gestureRecognizer isKindOfClass:[WXTouchGestureRecognizer class]]) {
        return YES;
    }
    // swipe and scroll
    if ([gestureRecognizer isKindOfClass:[UISwipeGestureRecognizer class]] && [otherGestureRecognizer isKindOfClass:NSClassFromString(@"UIScrollViewPanGestureRecognizer")]) {
        return YES;
    }
    // onclick and textviewInput
    if ([gestureRecognizer isKindOfClass:[UITapGestureRecognizer class]] && [otherGestureRecognizer isKindOfClass: NSClassFromString(@"UITextTapRecognizer")]) {
        return YES;
    }
    
//#ifdef DEBUG
//    if ([gestureRecognizer isKindOfClass:[WXDebugLongPressGestureRecognizer class]]
//        || [otherGestureRecognizer isKindOfClass:[WXDebugLongPressGestureRecognizer class]]) {
//        return YES;
//    }
//#endif
    
    return NO;
}

#pragma mark - Utils

- (NSDictionary *)touchResultWithScreenLocation:(CGPoint)screenLocation pageLocation:(CGPoint)pageLocation identifier:(NSNumber *)identifier
{
    NSMutableDictionary *resultTouch = [[NSMutableDictionary alloc] initWithCapacity:5];
    resultTouch[@"screenX"] = @(screenLocation.x/WXScreenResizeRadio());
    resultTouch[@"screenY"] = @(screenLocation.y/WXScreenResizeRadio());
    resultTouch[@"pageX"] = @(pageLocation.x/WXScreenResizeRadio());
    resultTouch[@"pageY"] = @(pageLocation.y/WXScreenResizeRadio());
    resultTouch[@"identifier"] = identifier;
    
    return resultTouch;
}

@end

@implementation WXTouchGestureRecognizer
{
    __weak WXComponent *_component;
    NSUInteger _touchIdentifier;
}

- (instancetype)initWithTarget:(id)target action:(SEL)action
{
    return [self initWithComponent:nil];;
}

- (instancetype)initWithComponent:(WXComponent *)component
{
    if (self = [super initWithTarget:self action:@selector(touchResponse:)]) {
        _component = component;
        
        _listenTouchStart = NO;
        _listenTouchEnd = NO;
        _listenTouchMove = NO;
        _listenTouchCancel = NO;
        
        self.cancelsTouchesInView = NO;
    }
    
    return self;
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [super touchesBegan:touches withEvent:event];
    
    if (_listenTouchStart) {
        [self fireTouchEvent:@"touchstart" withTouches:touches];
    }
}

- (void)touchesMoved:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [super touchesMoved:touches withEvent:event];
    
    if (_listenTouchMove) {
        [self fireTouchEvent:@"touchmove" withTouches:touches];
    }
}

- (void)touchesEnded:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    
    [super touchesEnded:touches withEvent:event];
    
    if (_listenTouchEnd) {
        [self fireTouchEvent:@"touchend" withTouches:touches];
    }
}

- (void)touchesCancelled:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event
{
    [super touchesCancelled:touches withEvent:event];
    
    if (_listenTouchCancel) {
        [self fireTouchEvent:@"touchcancel" withTouches:touches];
    }
}

- (void)fireTouchEvent:(NSString *)eventName withTouches:(NSSet<UITouch *> *)touches
{
    NSMutableArray *resultTouches = [NSMutableArray new];
    
    for (UITouch *touch in touches) {
        CGPoint screenLocation = [touch locationInView:touch.window];
        CGPoint pageLocation = [touch locationInView:_component.weexInstance.rootView];
        if (!touch.wx_identifier) {
            touch.wx_identifier = @(_touchIdentifier++);
        }
        NSDictionary *resultTouch = [_component touchResultWithScreenLocation:screenLocation pageLocation:pageLocation identifier:touch.wx_identifier];
        [resultTouches addObject:resultTouch];
    }
    
    [_component fireEvent:eventName params:@{@"changedTouches":resultTouches ?: @[]}];
}

- (void)touchResponse:(UIGestureRecognizer *)gesture
{
    
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent.h"
#import "WXComponent_internal.h"
#import "WXComponent+GradientColor.h"
#import "WXComponentManager.h"
#import "WXSDKManager.h"
#import "WXSDKInstance.h"
#import "WXSDKInstance_private.h"
#import "WXDefine.h"
#import "WXLog.h"
#import "WXWeakObjectWrapper.h"
#import "WXUtility.h"
#import "WXConvert.h"
#import "WXMonitor.h"
#import "WXAssert.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXThreadSafeMutableArray.h"
#import "WXTransform.h"
#import "WXRoundedRect.h"
#import <pthread/pthread.h>
#import "WXComponent+PseudoClassManagement.h"

#pragma clang diagnostic ignored "-Wincomplete-implementation"
#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"

@interface WXComponent () <UIGestureRecognizerDelegate>

@end

@implementation WXComponent
{
@private
    NSString *_ref;
    NSMutableDictionary *_styles;
    NSMutableDictionary *_attributes;
    NSMutableArray *_events;
    
    // Protects properties styles/attributes/events/subcomponents which will be accessed from multiple threads.
    pthread_mutex_t _propertyMutex;
    pthread_mutexattr_t _propertMutexAttr;
    
    __weak WXComponent *_supercomponent;
    __weak id<WXScrollerProtocol> _ancestorScroller;
    __weak WXSDKInstance *_weexInstance;
}

#pragma mark Life Cycle

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString *)type
                     styles:(NSDictionary *)styles
                 attributes:(NSDictionary *)attributes
                     events:(NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super init]) {
        pthread_mutexattr_init(&_propertMutexAttr);
        pthread_mutexattr_settype(&_propertMutexAttr, PTHREAD_MUTEX_RECURSIVE);
        pthread_mutex_init(&_propertyMutex, &_propertMutexAttr);
        
        _ref = ref;
        _type = type;
        _weexInstance = weexInstance;
        _styles = [self parseStyles:styles];
        _attributes = attributes ? [NSMutableDictionary dictionaryWithDictionary:attributes] : [NSMutableDictionary dictionary];
        _events = events ? [NSMutableArray arrayWithArray:events] : [NSMutableArray array];
        _subcomponents = [NSMutableArray array];
        
        _absolutePosition = CGPointMake(NAN, NAN);
        
        _isNeedJoinLayoutSystem = YES;
        _isLayoutDirty = YES;
        _isViewFrameSyncWithCalculated = YES;
        
        _async = NO;
        
        //TODO set indicator style 
        if ([type isEqualToString:@"indicator"]) {
            _styles[@"position"] = @"absolute";
            if (!_styles[@"left"] && !_styles[@"right"]) {
                _styles[@"left"] = @0.0f;
            }
            if (!_styles[@"top"] && !_styles[@"bottom"]) {
                _styles[@"top"] = @0.0f;
            }
        }
        
        [self _setupNavBarWithStyles:_styles attributes:_attributes];
        [self _initCSSNodeWithStyles:_styles];
        [self _initViewPropertyWithStyles:_styles];
        [self _handleBorders:styles isUpdating:NO];
    }
    
    return self;
}

- (void)dealloc
{
    free_css_node(_cssNode);

    [self _removeAllEvents];
    if (_positionType == WXPositionTypeFixed) {
        [self.weexInstance.componentManager removeFixedComponent:self];
    }

    pthread_mutex_destroy(&_propertyMutex);
    pthread_mutexattr_destroy(&_propertMutexAttr);

}

- (NSDictionary *)styles
{
    NSDictionary *styles;
    pthread_mutex_lock(&_propertyMutex);
    styles = _styles;
    pthread_mutex_unlock(&_propertyMutex);
    
    return styles;
}

- (NSDictionary *)pseudoClassStyles
{
    NSDictionary *pseudoClassStyles;
    pthread_mutex_lock(&_propertyMutex);
    pseudoClassStyles = _pseudoClassStyles;
    pthread_mutex_unlock(&_propertyMutex);
    
    return pseudoClassStyles;
}

- (NSString *)type
{
    return _type;
}

- (NSDictionary *)attributes
{
    NSDictionary *attributes;
    pthread_mutex_lock(&_propertyMutex);
    attributes = _attributes;
    pthread_mutex_unlock(&_propertyMutex);
    
    return attributes;
}

- (NSArray *)events
{
    NSArray *events;
    pthread_mutex_lock(&_propertyMutex);
    events = [_events copy];
    pthread_mutex_unlock(&_propertyMutex);
    
    return events;
}

- (WXSDKInstance *)weexInstance
{
    return _weexInstance;
}

- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@ ref=%@> %@", _type, _ref, _view];
}

#pragma mark Property

- (UIView *)view
{
    if ([self isViewLoaded]) {
        return _view;
    } else {
        WXAssertMainThread();
        
        // compositing child will be drew by its composited ancestor
        if (_compositingChild) {
            return nil;
        }
        
        [self viewWillLoad];
        
        _view = [self loadView];
        
        _layer = _view.layer;
        _view.frame = _calculatedFrame;
        
        _view.hidden = _visibility == WXVisibilityShow ? NO : YES;
        _view.clipsToBounds = _clipToBounds;
        
        if (![self _needsDrawBorder]) {
            _layer.borderColor = _borderTopColor.CGColor;
            _layer.borderWidth = _borderTopWidth;
            [self _resetNativeBorderRadius];
            _layer.opacity = _opacity;
            _view.backgroundColor = _backgroundColor;
        }
        
        if (_backgroundImage) {
            [self setGradientLayer];
        }
        
        if (_transform) {
            _layer.transform = [[[WXTransform alloc] initWithInstance:self.weexInstance] getTransform:_transform withView:_view withOrigin:_transformOrigin];
        }
        
        _view.wx_component = self;
        _view.wx_ref = self.ref;
        _layer.wx_component = self;
        
        [self _initEvents:self.events];
        [self _initPseudoEvents:_isListenPseudoTouch];
        
        if (_positionType == WXPositionTypeSticky) {
            [self.ancestorScroller addStickyComponent:self];
        }
        
        if (self.supercomponent && self.supercomponent->_async) {
            self->_async = YES;
        }
        
        [self setNeedsDisplay];
        [self viewDidLoad];
        
        if (_lazyCreateView) {
            [self _buildViewHierachyLazily];
        }
        
        [self _handleFirstScreenTime];
        
        return _view;
    }
}

- (void)_buildViewHierachyLazily
{
    if (self.supercomponent && !((WXComponent *)self.supercomponent)->_lazyCreateView) {
        NSArray *subcomponents = ((WXComponent *)self.supercomponent).subcomponents;
        
        NSInteger index = [subcomponents indexOfObject:self];
        if (index != NSNotFound) {
            [(WXComponent *)self.supercomponent insertSubview:self atIndex:index];
        }
    }
    
    NSArray *subcomponents = self.subcomponents;
    for (int i = 0; i < subcomponents.count; i++) {
        WXComponent *subcomponent = subcomponents[i];
        [self insertSubview:subcomponent atIndex:i];
    }
}

- (void)_resetNativeBorderRadius
{
    WXRoundedRect *borderRect = [[WXRoundedRect alloc] initWithRect:_calculatedFrame topLeft:_borderTopRightRadius topRight:_borderTopRightRadius bottomLeft:_borderBottomLeftRadius bottomRight:_borderBottomRightRadius];
    _layer.cornerRadius = borderRect.radii.topLeft;
}

- (void)_handleFirstScreenTime
{
    if (WX_MONITOR_INSTANCE_PERF_IS_RECORDED(WXPTFirstScreenRender, self.weexInstance)) {
        return;
    }
    
    CGPoint absolutePosition = [self.supercomponent.view convertPoint:_view.frame.origin toView:_weexInstance.rootView];
    if (absolutePosition.y + _view.frame.size.height > self.weexInstance.rootView.frame.size.height + 1) {
        WX_MONITOR_INSTANCE_PERF_END(WXPTFirstScreenRender, self.weexInstance);
    }
}

- (CALayer *)layer
{
    return _layer;
}

- (CGRect)calculatedFrame
{
    return _calculatedFrame;
}

- (CGPoint)absolutePosition
{
    return _absolutePosition;
}

- (css_node_t *)cssNode
{
    return _cssNode;
}

#pragma mark Component Hierarchy 

- (NSArray<WXComponent *> *)subcomponents
{
    NSArray<WXComponent *> *subcomponents;
    pthread_mutex_lock(&_propertyMutex);
    subcomponents = [_subcomponents copy];
    pthread_mutex_unlock(&_propertyMutex);
    
    return subcomponents;
}

- (WXComponent *)supercomponent
{
    return _supercomponent;
}

- (void)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    WXAssert(subcomponent, @"The subcomponent to insert to %@ at index %d must not be nil", self, index);
    
    subcomponent->_supercomponent = self;
    
    pthread_mutex_lock(&_propertyMutex);
    [_subcomponents insertObject:subcomponent atIndex:index];
    pthread_mutex_unlock(&_propertyMutex);
    
    if (subcomponent->_positionType == WXPositionTypeFixed) {
        [self.weexInstance.componentManager addFixedComponent:subcomponent];
        subcomponent->_isNeedJoinLayoutSystem = NO;
    }
    
    [self _recomputeCSSNodeChildren];
    [self setNeedsLayout];
}

- (void)_removeSubcomponent:(WXComponent *)subcomponent
{
    pthread_mutex_lock(&_propertyMutex);
    [_subcomponents removeObject:subcomponent];
    pthread_mutex_unlock(&_propertyMutex);
}

- (void)_removeFromSupercomponent
{
    [self.supercomponent _removeSubcomponent:self];
    [self.supercomponent _recomputeCSSNodeChildren];
    [self.supercomponent setNeedsLayout];
    
    if (_positionType == WXPositionTypeFixed) {
        [self.weexInstance.componentManager removeFixedComponent:self];
        self->_isNeedJoinLayoutSystem = YES;
    }
}

- (void)_moveToSupercomponent:(WXComponent *)newSupercomponent atIndex:(NSUInteger)index
{
    [self _removeFromSupercomponent];
    [newSupercomponent _insertSubcomponent:self atIndex:index];
}

- (id<WXScrollerProtocol>)ancestorScroller
{
    if(!_ancestorScroller){
        WXComponent *supercomponent = self.supercomponent;
        while (supercomponent) {
            if([supercomponent conformsToProtocol:@protocol(WXScrollerProtocol)]){
                _ancestorScroller = (id<WXScrollerProtocol>)supercomponent;
                break;
            }
            supercomponent = supercomponent.supercomponent;
        }
    }
    
    return _ancestorScroller;
}

#pragma mark Updating

- (void)_updateStylesOnComponentThread:(NSDictionary *)styles resetStyles:(NSMutableArray *)resetStyles isUpdateStyles:(BOOL)isUpdateStyles
{
    if (isUpdateStyles) {
        pthread_mutex_lock(&_propertyMutex);
        [_styles addEntriesFromDictionary:styles];
        pthread_mutex_unlock(&_propertyMutex);
    }
    [self _updateCSSNodeStyles:styles];
    [self _resetCSSNodeStyles:resetStyles];
}

- (void)_updateAttributesOnComponentThread:(NSDictionary *)attributes
{
    pthread_mutex_lock(&_propertyMutex);
    [_attributes addEntriesFromDictionary:attributes];
    pthread_mutex_unlock(&_propertyMutex);
}

- (void)_addEventOnComponentThread:(NSString *)eventName
{
    pthread_mutex_lock(&_propertyMutex);
    [_events addObject:eventName];
    pthread_mutex_unlock(&_propertyMutex);
}

- (void)_removeEventOnComponentThread:(NSString *)eventName
{
    pthread_mutex_lock(&_propertyMutex);
    [_events removeObject:eventName];
    pthread_mutex_unlock(&_propertyMutex);
}

- (void)_updateStylesOnMainThread:(NSDictionary *)styles resetStyles:(NSMutableArray *)resetStyles
{
    WXAssertMainThread();
    [self _updateViewStyles:styles];
    [self _resetStyles:resetStyles];
    [self _handleBorders:styles isUpdating:YES];
    
    [self updateStyles:styles];
    [self resetStyles:resetStyles];
}

- (void)_updateAttributesOnMainThread:(NSDictionary *)attributes
{
    WXAssertMainThread();
    
    [self _updateNavBarAttributes:attributes];
    
    [self updateAttributes:attributes];
}

- (void)updateStyles:(NSDictionary *)styles
{
    WXAssertMainThread();
}

- (void)readyToRender
{
    if (self.weexInstance.trackComponent) {
        [self.supercomponent readyToRender];
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    WXAssertMainThread();
}

#pragma mark Reset
- (void)resetStyles:(NSArray *)styles
{
    WXAssertMainThread();
}

#pragma mark Layout

/**
 *  @see WXComponent+Layout.m
 */

#pragma mark View Management

/**
 *  @see WXComponent+ViewManagement.m
 */

#pragma mark Events

/**
 *  @see WXComponent+Events.m
 */

#pragma mark Display

/**
 *  @see WXComponent+Display.m
 */

@end


@implementation UIView (WXComponent)

- (WXComponent *)wx_component
{
    WXWeakObjectWrapper *weakWrapper = objc_getAssociatedObject(self, @selector(wx_component));
    return [weakWrapper weakObject];
}

- (void)setWx_component:(WXComponent *)wx_component
{
    id weakWrapper = [[WXWeakObjectWrapper alloc] initWithWeakObject:wx_component];
    objc_setAssociatedObject(self, @selector(wx_component), weakWrapper, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSString *)wx_ref
{
    WXWeakObjectWrapper *weakWrapper = objc_getAssociatedObject(self, @selector(wx_ref));
    return [weakWrapper weakObject];
}

- (void)setWx_ref:(NSString *)wx_ref
{
    id weakWrapper = [[WXWeakObjectWrapper alloc] initWithWeakObject:wx_ref];
    objc_setAssociatedObject(self, @selector(wx_ref), weakWrapper, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end

@implementation CALayer (WXComponents_new)

- (WXComponent *)wx_component
{
    WXWeakObjectWrapper *weakWrapper = objc_getAssociatedObject(self, @selector(wx_component));
    return [weakWrapper weakObject];
}

- (void)setWx_component:(WXComponent *)wx_component
{
    id weakWrapper = [[WXWeakObjectWrapper alloc] initWithWeakObject:wx_component];
    objc_setAssociatedObject(self, @selector(wx_component), weakWrapper, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end


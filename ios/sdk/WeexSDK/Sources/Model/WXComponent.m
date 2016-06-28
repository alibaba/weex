/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent.h"
#import "WXComponent_internal.h"
#import "WXComponentManager.h"
#import "WXSDKManager.h"
#import "WXSDKInstance.h"
#import "WXSDKInstance_private.h"
#import "WXDefine.h"
#import "WXLog.h"
#import "WXWeakObjectWrapper.h"
#import "WXUtility.h"
#import "WXConvert.h"
#import "WXAssert.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXThreadSafeMutableArray.h"

#pragma clang diagnostic ignored "-Wincomplete-implementation"

@interface WXComponent () <UIGestureRecognizerDelegate>

@end

@implementation WXComponent
{
@private
    NSString *_ref;
    WXThreadSafeMutableDictionary *_styles;
    WXThreadSafeMutableDictionary *_attributes;
    WXThreadSafeMutableArray *_events;
    
    WXThreadSafeMutableArray *_subcomponents;
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
        _ref = ref;
        _type = type;
        _weexInstance = weexInstance;
        _styles = styles ? [WXThreadSafeMutableDictionary dictionaryWithDictionary:styles] : [WXThreadSafeMutableDictionary dictionary];
        _attributes = attributes ? [WXThreadSafeMutableDictionary dictionaryWithDictionary:attributes] : [WXThreadSafeMutableDictionary dictionary];
        _events = events ? [WXThreadSafeMutableArray arrayWithArray:events] : [WXThreadSafeMutableArray array];
        
        _subcomponents = [WXThreadSafeMutableArray array];
        
        _isNeedJoinLayoutSystem = YES;
        _isLayoutDirty = YES;
        
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
}

- (NSDictionary *)styles
{
    return _styles;
}

- (NSDictionary *)attributes
{
    return _attributes;
}

- (WXSDKInstance *)weexInstance
{
    return _weexInstance;
}

- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@ ref=%@> %@", _type, _ref, _view];
}

#pragma mark Component Hierarchy 

- (NSArray<WXComponent *> *)subcomponents
{
    return _subcomponents;
}

- (WXComponent *)supercomponent
{
    return _supercomponent;
}

- (void)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    WXAssert(subcomponent, @"The subcomponent to insert to %@ at index %d must not be nil", self, index);
    
    subcomponent->_supercomponent = self;
    
    [_subcomponents insertObject:subcomponent atIndex:index];
    
    if (subcomponent->_positionType == WXPositionTypeFixed) {
        [self.weexInstance.componentManager addFixedComponent:subcomponent];
        subcomponent->_isNeedJoinLayoutSystem = NO;
    }
    
    [self _recomputeCSSNodeChildren];
    [self setNeedsLayout];
}

- (void)_removeFromSupercomponent
{
    [self.supercomponent->_subcomponents removeObject:self];
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

- (void)_updateStylesOnComponentThread:(NSDictionary *)styles
{
    [_styles addEntriesFromDictionary:styles];
    [self _updateCSSNodeStyles:styles];
}

- (void)_updateAttributesOnComponentThread:(NSDictionary *)attributes
{
    [_attributes addEntriesFromDictionary:attributes];
}

- (void)_addEventOnComponentThread:(NSString *)eventName
{
    [_events addObject:eventName];
}

- (void)_removeEventOnComponentThread:(NSString *)eventName
{
    [_events removeObject:eventName];
}

- (void)_updateStylesOnMainThread:(NSDictionary *)styles
{
    WXAssertMainThread();
    
    [self _updateViewStyles:styles];
    [self _handleBorders:styles isUpdating:YES];
    
    [self updateStyles:styles];
}

- (void)_updateAttributesOnMainThread:(NSDictionary *)attributes
{
    WXAssertMainThread();
    
    [[_attributes mutableCopy] addEntriesFromDictionary:attributes];
    
    [self _updateNavBarAttributes:attributes];
    
    [self updateAttributes:attributes];
}

- (void)updateStyles:(NSDictionary *)styles
{
    WXAssertMainThread();
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    WXAssertMainThread();
}

#pragma mark Layout

/**
 *  @see WXComponents+Layout.m
 */

#pragma mark View Management

/**
 *  @see WXComponents+ViewManagement.m
 */

#pragma mark Events

/**
 *  @see WXComponents+Events.m
 */

#pragma mark Display

/**
 *  @see WXComponents+Display.m
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


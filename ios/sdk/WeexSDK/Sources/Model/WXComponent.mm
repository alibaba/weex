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
#import "WXMonitor.h"
#import "WXAssert.h"
#import "WXTransform.h"
#import "WXRoundedRect.h"
#import <pthread/pthread.h>
#import "WXComponent+PseudoClassManagement.h"
#import "WXComponent+BoxShadow.h"
#import "WXComponent+Events.h"
#import "WXComponent+Layout.h"
#import "WXConfigCenterProtocol.h"
#import "WXSDKEngine.h"
#import "WXSDKInstance_performance.h"
#import "WXComponent_performance.h"
#import "WXCoreBridge.h"
#import "WXDarkSchemeProtocol.h"

#pragma clang diagnostic ignored "-Wincomplete-implementation"
#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"
static BOOL bInited = NO;
static BOOL bNeedRemoveEvents = YES;

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

@synthesize transform = _transform;
@synthesize styleBackgroundColor = _styleBackgroundColor;
@synthesize darkSchemeBackgroundColor = _darkSchemeBackgroundColor;
@synthesize lightSchemeBackgroundColor = _lightSchemeBackgroundColor;

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
        _componentType = WXComponentTypeCommon;
        _styles = [self parseStyles:styles];
        _attributes = attributes ? [NSMutableDictionary dictionaryWithDictionary:attributes] : [NSMutableDictionary dictionary];
        _events = events ? [NSMutableArray arrayWithArray:events] : [NSMutableArray array];
        _subcomponents = [NSMutableArray array];
        _absolutePosition = CGPointMake(NAN, NAN);
        
        _displayType = WXDisplayTypeBlock;
        _isViewFrameSyncWithCalculated = YES;
        _ariaHidden = nil;
        _accessible = nil;
        _userInteractionEnabled = YES;
        _eventPenetrationEnabled = NO;
        _accessibilityHintContent = nil;
        _cancelsTouchesInView = YES;
        _invertForDarkScheme = NO;
        
        _async = NO;
        
        if (styles[kWXTransitionProperty]) {
            _transition = [[WXTransition alloc]initWithStyles:styles];
        }

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
        
        if (attributes[@"invertForDarkScheme"]) {
            _invertForDarkScheme = [WXConvert BOOL:attributes[@"invertForDarkScheme"]];
        }
        
        if (attributes[@"userInteractionEnabled"]) {
            _userInteractionEnabled = [WXConvert BOOL:attributes[@"userInteractionEnabled"]];
        }
        
        if (attributes[@"eventPenetrationEnabled"]) {
            _eventPenetrationEnabled = [WXConvert BOOL:attributes[@"eventPenetrationEnabled"]];
        }
        
        if (attributes[@"ariaHidden"]) {
            
            _ariaHidden = [WXConvert NSString:attributes[@"ariaHidden"]];
        }
        if (attributes[@"role"]) {
            _roles = attributes[@"role"];
        }
        if (attributes[@"ariaLabel"]) {
            _ariaLabel = [WXConvert NSString:attributes[@"ariaLabel"]];
        }
        if (attributes[@"accessible"]) {
            _accessible = [WXConvert NSString:attributes[@"accessible"]];
        }
        if(attributes[@"accessibilityHint"]) {
            _accessibilityHintContent = [WXConvert NSString:attributes[@"accessibilityHint"]];
        }
        if (attributes[@"groupAccessibilityChildren"]) {
            _groupAccessibilityChildren = [WXConvert NSString:attributes[@"groupAccessibilityChildren"]];
        }
        
        if (attributes[@"testId"]) {
            _testId = [WXConvert NSString:attributes[@"testId"]];
        }
        
        //may be removed when this feature is stable
        if (attributes[@"clipRadius"])
        {
            _clipRadius = [WXConvert NSString:attributes[@"clipRadius"]];
        }
        
        if (attributes[@"customEvent"]) {
            _customEvent = [WXConvert BOOL:attributes[@"customEvent"]];
        }
        
        if (attributes[@"cancelsTouchesInView"]) {
            _cancelsTouchesInView = [WXConvert BOOL:attributes[@"cancelsTouchesInView"]];
        }

        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> init component: ref : %@ , styles: %@",ref,styles);
        WXLogDebug(@"flexLayout -> init component: ref : %@ , attributes: %@",ref,attributes);
#endif
        [self _setupNavBarWithStyles:_styles attributes:_attributes];

        [self _initViewPropertyWithStyles:_styles];
        [self _initCompositingAttribute:_attributes];
        [self _handleBorders:styles isUpdating:NO];
        
        if (!bInited) {
            id<WXConfigCenterProtocol> configCenter = [WXSDKEngine handlerForProtocol:@protocol(WXConfigCenterProtocol)];
            if ([configCenter respondsToSelector:@selector(configForKey:defaultValue:isDefault:)]) {
                bNeedRemoveEvents = [[configCenter configForKey:@"iOS_weex_ext_config.removeEventsOfWXComponentWhenDealloc" defaultValue:@(YES) isDefault:NULL] boolValue];
                bInited = YES;
            }
        }
    }
    
    return self;
}

- (id)copyWithZone:(NSZone *)zone
{
    static std::atomic<long> __copy(0);
    long copyId = __copy ++;
    copyId %= (1024 * 1024);
    NSString *copyRef = [NSString stringWithFormat:@"%ldcopy_of%@", copyId, _isTemplate ? self.ref : self->_templateComponent.ref];
    
    // first, copy weex core render object
    void* copiedRenderObject = [WXCoreBridge copyRenderObject:_flexCssNode replacedRef:copyRef];
    WXAssert(copiedRenderObject != nullptr, @"cannot copy render object.");
    
    // second, alloc new WXComponent
    WXComponent *component = [[self class] allocWithZone:zone];
    [component _setRenderObject:copiedRenderObject];
    component = [component initWithRef:copyRef type:self.type styles:self.styles attributes:self.attributes events:self.events weexInstance:self.weexInstance];
    if (_isTemplate) {
        component->_templateComponent = self;
    }
    else {
        component->_templateComponent = self->_templateComponent;
    }
    component->_calculatedFrame = self.calculatedFrame;
    
    // third, copy children
    NSUInteger count = [self.subcomponents count];
    for (NSInteger i = 0; i < count; i ++) {
        WXComponent *subcomponentCopy = [[self.subcomponents objectAtIndex:i] copy];
        BOOL inserted = [component _insertSubcomponent:subcomponentCopy atIndex:i];
        if (inserted) {
            // add to layout tree
            [WXCoreBridge addChildRenderObject:subcomponentCopy->_flexCssNode toParent:component->_flexCssNode];
        }
        else {
            WXLogError(@"fail to insert copied component.");
        }
    }
    
    WXPerformBlockOnComponentThread(^{
        [self.weexInstance.componentManager addComponent:component toIndexDictForRef:copyRef];
    });
    
    return component;
}

- (UIAccessibilityTraits)_parseAccessibilityTraitsWithTraits:(UIAccessibilityTraits)trait roles:(NSString*)roleStr
{
    UIAccessibilityTraits newTrait = trait;
    for (NSString * role in [roleStr componentsSeparatedByString:@" "]) {
        newTrait |= [WXConvert WXUIAccessibilityTraits: role];
    }
    
    return newTrait;
}

- (void)dealloc
{
    if (_positionType == WXPositionTypeFixed) {
        [self.weexInstance.componentManager removeFixedComponent:self];
    }
    
    // remove all gesture and all
    if (_isTemplate && self.attributes[@"@templateId"]) {
        [[WXSDKManager bridgeMgr] callComponentHook:_weexInstance.instanceId componentId:self.attributes[@"@templateId"] type:@"lifecycle" hook:@"destroy" args:nil competion:nil];
    }
    if (_tapGesture) {
        [_tapGesture removeTarget:nil action:NULL];
    }
    if ([_swipeGestures count]) {
        for (UISwipeGestureRecognizer *swipeGestures in _swipeGestures) {
            [swipeGestures removeTarget:nil action:NULL];
        }
    }
    
    if (_longPressGesture) {
        [_longPressGesture removeTarget:nil action:NULL];
    }
    
    if (_panGesture) {
        [_panGesture removeTarget:nil action:NULL];
    }
    
    if (_bindingExpressions != nullptr) {
        for (WXJSExpression* expr : *_bindingExpressions) {
            if (expr != nullptr) {
                delete expr;
            }
        }
        delete _bindingExpressions;
    }

    pthread_mutex_destroy(&_propertyMutex);
    pthread_mutexattr_destroy(&_propertMutexAttr);
}

- (NSDictionary *)styles
{
    NSDictionary *styles;
    pthread_mutex_lock(&_propertyMutex);
    styles = [_styles copy];
    pthread_mutex_unlock(&_propertyMutex);
    return styles;
}

- (NSDictionary *)pseudoClassStyles
{
    NSDictionary *pseudoClassStyles;
    pthread_mutex_lock(&_propertyMutex);
    pseudoClassStyles = [_pseudoClassStyles copy];
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
    attributes = [_attributes copy];
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

- (void)setDisplayType:(WXDisplayType)displayType
{
    if (_displayType != displayType) {
        _displayType = displayType;
        if (displayType == WXDisplayTypeNone) {
            [self _removeFromSupercomponent];
            WXPerformBlockOnMainThread(^{
                [self removeFromSuperview];
            });
        } else {
            WXPerformBlockOnMainThread(^{
                [self _buildViewHierarchyLazily];
                // TODO: insert into the correct index
                [self.supercomponent.view addSubview:self.view];
            });
        }
        [self setNeedsLayout];
    }
}

- (WXSDKInstance *)weexInstance
{
    return _weexInstance;
}

- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@:%p ref=%@> %@", _type, self, _ref, _view];
}

#pragma mark Property

- (UIView *)view
{
    if (_componentType != WXComponentTypeCommon) {
        return nil;
    }
    if ([self isViewLoaded]) {
        return _view;
    } else {
        WXAssertMainThread();
        double startCreateViewTime = CACurrentMediaTime()*1000;
        
        // compositing child will be drew by its composited ancestor
        if (_isCompositingChild) {
            return nil;
        }
        
        [self viewWillLoad];
        
        _view = [self loadView];
        
        // Provide a chance for dark scheme handler to process the view
        if ([WXUtility isDarkSchemeSupportEnabled]) {
            [[WXSDKInstance darkSchemeColorHandler] configureView:_view ofComponent:self];
        }
        
#ifdef DEBUG
        WXLogDebug(@"flexLayout -> loadView:addr-(%p),componentRef-(%@)",_view,self.ref);
#endif
        _layer = _view.layer;
        _view.frame = [self _fixIllegalFrame:_calculatedFrame];
        _view.hidden = _visibility == WXVisibilityShow ? NO : YES;
        _view.clipsToBounds = _clipToBounds;
        if (![self _needsDrawBorder]) {
            _layer.borderColor = [self.weexInstance chooseColor:_borderTopColor lightSchemeColor:_lightSchemeBorderTopColor darkSchemeColor:_darkSchemeBorderTopColor invert:_invertForDarkScheme scene:[self colorSceneType]].CGColor;
            _layer.borderWidth = _borderTopWidth;
            [self _resetNativeBorderRadius];
            _layer.opacity = _opacity;

            if ([WXUtility isDarkSchemeSupportEnabled]) {
                UIColor* choosedColor = [self.weexInstance chooseColor:self.styleBackgroundColor lightSchemeColor:self.lightSchemeBackgroundColor darkSchemeColor:self.darkSchemeBackgroundColor invert:_invertForDarkScheme scene:[self colorSceneType]];
                _view.backgroundColor = choosedColor;
            }
            else {
                _view.backgroundColor = self.styleBackgroundColor;
            }
        }

        if (_backgroundImage) {
            [self setGradientLayer];
        }

        if (_transform) {
            [_transform applyTransformForView:_view];
        }
        
        [self _adjustForRTL];
        
        WXBoxShadow* usingBoxShadow = [self _chooseBoxShadow];        
        if (usingBoxShadow) {
            _lastBoxShadow = usingBoxShadow;
            [self configBoxShadow:usingBoxShadow];
        }
        
        _view.wx_component = self;
        _view.wx_ref = self.ref;
        _layer.wx_component = self;
        
        [_view setUserInteractionEnabled:_userInteractionEnabled];
        
        if (_roles) {
            [_view setAccessibilityTraits:[self _parseAccessibilityTraitsWithTraits:self.view.accessibilityTraits roles:_roles]];
        }
        
        if (_testId) {
            _view.accessibilityIdentifier = _testId;
        }
        
        if (_accessibilityHintContent) {
            [_view setAccessibilityHint:_accessibilityHintContent];
        }
        
        if (_ariaLabel) {
            _view.accessibilityLabel = _ariaLabel;
        }
        if (_accessible) {
            [_view setIsAccessibilityElement:[WXConvert BOOL:_accessible]];
        }
        
        if (_ariaHidden) {
            [_view setAccessibilityElementsHidden:[WXConvert BOOL:_ariaHidden]];
            
        }
        if (_groupAccessibilityChildren) {
            [_view setShouldGroupAccessibilityChildren:[WXConvert BOOL:_groupAccessibilityChildren]];
        }
        
        [self _initEvents:self.events];
        [self _initPseudoEvents:_isListenPseudoTouch];
        
        if (_positionType == WXPositionTypeSticky) {
            [self.ancestorScroller addStickyComponent:self];
        }
        
        if (self.supercomponent && self.supercomponent->_async) {
            self->_async = YES;
        }
        
        [self setNeedsDisplay];
        [[NSNotificationCenter defaultCenter] postNotificationName:WX_COMPONENT_NOTIFICATION_VIEW_LOADED object:self];
        [self viewDidLoad];
        double diffTime = CACurrentMediaTime()*1000 - startCreateViewTime;
        [self.weexInstance.performance recordViewCreatePerformance:diffTime];
        
        if (_lazyCreateView) {
            [self _buildViewHierarchyLazily];
        }
        [self _handleFirstScreenTime];
        
        [self.weexInstance.performance onViewLoad:self];
        return _view;
    }
}

- (CGRect)_fixIllegalFrame:(CGRect)frame{
    CGPoint origin = frame.origin;
    CGSize size = frame.size;
    CGRect fixedFrame = CGRectMake(isnan(origin.x)?0.0f:origin.x
                                   , isnan(origin.y)?0.0f:origin.y
                                   , isnan(size.width)?0.0f:size.width
                                   , isnan(size.height)?0.0f:size.height);
    return fixedFrame;
}

- (void)_buildViewHierarchyLazily
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
    WXRoundedRect *borderRect = [[WXRoundedRect alloc] initWithRect:_calculatedFrame topLeft:_borderTopLeftRadius topRight:_borderTopRightRadius bottomLeft:_borderBottomLeftRadius bottomRight:_borderBottomRightRadius];
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

- (BOOL)_isAffineTypeAs:(NSString *)type
{
    return [WXCoreBridge isComponentAffineType:_type asType:type];
}

- (CALayer *)layer
{
    return _layer;
}

- (CGRect)calculatedFrame
{
    return _calculatedFrame;
}

- (CGFloat)_getInnerContentMainSize
{
    return -1.0f;
}

- (void)_assignInnerContentMainSize:(CGFloat)value
{
}

- (BOOL)_isCalculatedFrameChanged:(CGRect)frame
{
    return !CGRectEqualToRect(frame, _calculatedFrame);
}

- (void)_layoutPlatform
{
}

- (void)_assignCalculatedFrame:(CGRect)frame
{
    _calculatedFrame = frame;
}

- (CGPoint)absolutePosition
{
    return _absolutePosition;
}

- (void)_addEventParams:(NSDictionary *)params
{
    pthread_mutex_lock(&_propertyMutex);
    if (!_eventParameters) {
        _eventParameters = [NSMutableDictionary dictionary];
    }
    [_eventParameters addEntriesFromDictionary:params];
    pthread_mutex_unlock(&_propertyMutex);
}

- (NSArray *)_paramsForEvent:(NSString *)eventName
{
    NSArray *params;
    pthread_mutex_lock(&_propertyMutex);
    params = _eventParameters[eventName];
    pthread_mutex_unlock(&_propertyMutex);
    
    return params;
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

- (BOOL)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    WXAssert(subcomponent, @"The subcomponent to insert to %@ at index %d must not be nil", self, index);
    
    if (subcomponent == nil) {
        return NO;
    }
    
    if (index > [_subcomponents count]) {
        WXLogError(@"the index of inserted %ld is out of range as the current is %lu", (long)index, (unsigned long)[_subcomponents count]);
        return NO;
    }
    
    subcomponent->_supercomponent = self;
    
    pthread_mutex_lock(&_propertyMutex);
    [_subcomponents insertObject:subcomponent atIndex:index];
    pthread_mutex_unlock(&_propertyMutex);
    
    if (subcomponent->_positionType == WXPositionTypeFixed) {
        [self.weexInstance.componentManager addFixedComponent:subcomponent];
    }
    
    if (_useCompositing || _isCompositingChild) {
        subcomponent->_isCompositingChild = YES;
    }
    
    [self setNeedsLayout];
    
    return YES;
}

- (void)_removeSubcomponent:(WXComponent *)subcomponent removeCssNode:(BOOL)removeCssNode
{
    pthread_mutex_lock(&_propertyMutex);
    [_subcomponents removeObject:subcomponent];
    if (removeCssNode) {
        [self removeSubcomponentCssNode:subcomponent];
    }
    pthread_mutex_unlock(&_propertyMutex);
}

- (void)_removeFromSupercomponent
{
    [self _removeFromSupercomponent:YES]; // really do remove
}

- (void)_removeFromSupercomponent:(BOOL)remove
{
    [self.supercomponent _removeSubcomponent:self removeCssNode:remove];
    [self.supercomponent setNeedsLayout];
    
    if (_positionType == WXPositionTypeFixed) {
        [self.weexInstance.componentManager removeFixedComponent:self];
    }
    if (_positionType == WXPositionTypeSticky) {
        [self.ancestorScroller removeStickyComponent:self];
    }
}

- (void)_moveToSupercomponent:(WXComponent *)newSupercomponent atIndex:(NSUInteger)index
{
    [self _removeFromSupercomponent:NO]; // no remove underlayer render object
    [newSupercomponent _insertSubcomponent:self atIndex:index];
}

- (void)_didInserted
{
}

- (id<WXScrollerProtocol>)ancestorScroller
{
    if(!_ancestorScroller) {
        WXComponent *supercomponent = self.supercomponent;
        while (supercomponent) {
            if([supercomponent conformsToProtocol:@protocol(WXScrollerProtocol)]) {
                _ancestorScroller = (id<WXScrollerProtocol>)supercomponent;
                break;
            }
            supercomponent = supercomponent.supercomponent;
        }
    }
    
    return _ancestorScroller;
}

#pragma mark Updating

- (BOOL)_isTransitionNone
{
    return _transition == nil || _transition.transitionOptions == WXTransitionOptionsNone;
}

- (BOOL)_hasTransitionPropertyInStyles:(NSDictionary *)styles
{
    return [_transition _hasTransitionOptionInStyles:styles];
}

- (void)_updateStylesOnComponentThread:(NSDictionary *)styles resetStyles:(NSMutableArray *)resetStyles isUpdateStyles:(BOOL)isUpdateStyles
{
    BOOL isTransitionTag = _transition ? [self _isTransitionTag:styles] : NO;
    if (isTransitionTag) {
        [_transition _handleTransitionWithStyles:[styles mutableCopy] resetStyles:resetStyles target:self];
    } else {
        styles = [self parseStyles:styles];
        [self resetPseudoClassStyles:resetStyles];
        [self _updateCSSNodeStyles:styles];
        [self _resetCSSNodeStyles:resetStyles];
    }
    if (isUpdateStyles) {
        [self _modifyStyles:styles];
        if ([self needsLayout]) {
            // call update style may take effect on layout, maybe the component
            // displaylink has been paused, so we need to restart the component task, and it will auto-pause when task queue is empty.
            [self.weexInstance.componentManager startComponentTasks];
        }
    }
}

- (BOOL)_isTransitionTag:(NSDictionary *)styles
{
    BOOL yesOrNo = false;
    if (_transition.transitionOptions != WXTransitionOptionsNone) {
        yesOrNo = true;
    }
    return yesOrNo;
}

- (BOOL)_isTransitionOnMainThreadStyles:(NSDictionary *)styles
{
    BOOL yesOrNo = false;
    if (_transition.transitionOptions != WXTransitionOptionsNone) {
        if ((_transition.transitionOptions & WXTransitionOptionsBackgroundColor &&styles[@"backgroundColor"])
            ||(_transition.transitionOptions & WXTransitionOptionsTransform &&styles[@"transform"])
            ||(_transition.transitionOptions & WXTransitionOptionsOpacity &&styles[@"opacity"])) {
            yesOrNo = true;
        }
    }
    return yesOrNo;
}

- (void)_modifyStyles:(NSDictionary *)styles
{
    pthread_mutex_lock(&_propertyMutex);
    [_styles addEntriesFromDictionary:styles];
    pthread_mutex_unlock(&_propertyMutex);
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
    if (![self _isTransitionOnMainThreadStyles:styles]) {
        [self _updateViewStyles:styles];
    } else {
        [self _transitionUpdateViewProperty:styles];
    }
#ifdef DEBUG
    NSDictionary *copySelfStyle = [NSDictionary dictionaryWithDictionary:self.styles];
    WXLogDebug(@"flexLayout -> ref:%@ style before : %@",self.ref,copySelfStyle);
    
    if (styles) {
        WXLogDebug(@"flexLayout -> ref:%@ update styles : %@",self.ref,styles);
    }
    
    if (resetStyles) {
        WXLogDebug(@"flexLayout -> ref:%@ update resetStyles : %@",self.ref,resetStyles);
    }
#endif
    
    [self _resetStyles:resetStyles];
    [self _handleBorders:styles isUpdating:YES];
    [self updateStyles:styles];
    [self resetStyles:resetStyles];
    
#ifdef DEBUG
    //self.styles may change
    copySelfStyle = [NSDictionary dictionaryWithDictionary:self.styles];
    WXLogDebug(@"flexLayout -> ref:%@ style after : %@",self.ref,copySelfStyle);
#endif
}

- (void)_updateAttributesOnMainThread:(NSDictionary *)attributes
{
    WXAssertMainThread();
    
    [self _updateNavBarAttributes:attributes];
    
    [self updateAttributes:attributes];
    [self _configWXComponentA11yWithAttributes:attributes];
}

- (void)updateStyles:(NSDictionary *)styles
{
    WXAssertMainThread();

    if (self.componentCallback) {
        self.componentCallback(self, WXComponentUpdateStylesCallback, styles);
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    WXAssertMainThread();
}

- (void)setNativeTransform:(CGAffineTransform)transform
{
    WXAssertMainThread();
    
    self.transform = [[WXTransform alloc] initWithNativeTransform:CATransform3DMakeAffineTransform(transform) instance:self.weexInstance];
    if (!CGRectEqualToRect(self.calculatedFrame, CGRectZero)) {
        [_transform applyTransformForView:_view];
        [self _adjustForRTL];
        [_layer setNeedsDisplay];
    }
}

- (void)readyToRender
{
    if (self.weexInstance.trackComponent) {
        [self.supercomponent readyToRender];
    }
}


- (void)setGradientLayer
{
    if (CGRectEqualToRect(self.view.frame, CGRectZero)) {
        return;
    }
    
    NSString* styleValue = nil;
    BOOL isDark = [self.weexInstance isDarkScheme];
    if (isDark) {
        if (_darkSchemeBackgroundImage) {
            styleValue = _darkSchemeBackgroundImage;
        }
        else {
            styleValue = _backgroundImage;
        }
    }
    else if (_lightSchemeBackgroundImage) {
        styleValue = _lightSchemeBackgroundImage;
    }
    else {
        styleValue = _backgroundImage;
    }
    
    NSDictionary * linearGradient = [WXUtility linearGradientWithBackgroundImage:styleValue];
    if (!linearGradient) {
        return ;
    }
    
    __weak typeof(self) weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        __strong typeof(self) strongSelf = weakSelf;
        if(strongSelf) {
            // No need to auto-invert linear-gradient colors. We only allows using 'dark-scheme-background-image' style.
            UIColor * startColor = (UIColor*)linearGradient[@"startColor"];
            UIColor * endColor = (UIColor*)linearGradient[@"endColor"];
            CAGradientLayer * gradientLayer = [WXUtility gradientLayerFromColors:@[startColor, endColor] locations:nil frame:strongSelf.view.bounds gradientType:(WXGradientType)[linearGradient[@"gradientType"] integerValue]];
            if (gradientLayer) {
                strongSelf.styleBackgroundColor = [UIColor colorWithPatternImage:[strongSelf imageFromLayer:gradientLayer]];
                strongSelf.view.backgroundColor = strongSelf.styleBackgroundColor;
                [strongSelf setNeedsDisplay];
            }
        }
    });
}

- (void)_configWXComponentA11yWithAttributes:(NSDictionary *)attributes
{
    WX_CHECK_COMPONENT_TYPE(self.componentType)
    if (attributes[@"role"]){
        _roles = attributes[@"role"];
        [self.view setAccessibilityTraits:[self _parseAccessibilityTraitsWithTraits:self.view.accessibilityTraits roles:_roles]];
    }
    if (attributes[@"ariaHidden"]) {
        _ariaHidden = [WXConvert NSString:attributes[@"ariaHidden"]];
        [self.view setAccessibilityElementsHidden:[WXConvert BOOL:_ariaHidden]];
    }
    if (attributes[@"accessible"]) {
        _accessible = [WXConvert NSString:attributes[@"accessible"]];
        [self.view setIsAccessibilityElement:[WXConvert BOOL:_accessible]];
    }
    if (attributes[@"ariaLabel"]) {
        _ariaLabel = [WXConvert NSString:attributes[@"ariaLabel"]];
        self.view.accessibilityValue = _ariaLabel;
    }
    if (attributes[@"accessibilityHint"]) {
        _accessibilityHintContent = [WXConvert NSString:attributes[@"accessibilityHint"]];
        [self.view setAccessibilityHint:_accessibilityHintContent];
    }
    
    if (attributes[@"groupAccessibilityChildren"]) {
        _groupAccessibilityChildren = [WXConvert NSString:attributes[@"groupAccessibilityChildren"]];
        [self.view setShouldGroupAccessibilityChildren:[WXConvert BOOL:_groupAccessibilityChildren]];
    }
    if (attributes[@"userInteractionEnabled"]) {
        _userInteractionEnabled = [WXConvert BOOL:attributes[@"userInteractionEnabled"]];
        [self.view setUserInteractionEnabled:_userInteractionEnabled];
    }
    
    if (attributes[@"eventPenetrationEnabled"]) {
        _eventPenetrationEnabled = [WXConvert BOOL:attributes[@"eventPenetrationEnabled"]];
    }
    
    if (attributes[@"testId"]) {
        [self.view setAccessibilityIdentifier:[WXConvert NSString:attributes[@"testId"]]];
    }

}

- (UIImage *)imageFromLayer:(CALayer *)layer
{
    CGFloat width = layer.frame.size.width ?: 1;
    CGFloat height = layer.frame.size.height ?: 1;
    CGSize size = CGSizeMake(width, height);
    UIGraphicsBeginImageContextWithOptions(size, NO, 0);
    [layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *outputImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return outputImage;
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

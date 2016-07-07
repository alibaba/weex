/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponentManager.h"
#import "WXComponent.h"
#import "WXComponent_internal.h"
#import "WXComponentFactory.h"
#import "WXDefine.h"
#import "NSArray+Weex.h"
#import "WXSDKInstance.h"
#import "WXAssert.h"
#import "WXUtility.h"
#import "WXScrollerProtocol.h"

static NSThread *WXComponentThread;

#define WXAssertComponentExist(component)  WXAssert(component, @"component not exists")

@implementation WXComponentManager
{
    __weak WXSDKInstance *_weexInstance;
    BOOL _isValid;
    
    BOOL _stopRunning;
    NSUInteger _noTaskTickCount;
    
    // access only on component thread
    NSMapTable<NSString *, WXComponent *> *_indexDict;
    NSMutableArray<dispatch_block_t> *_uiTaskQueue;
    
    WXComponent *_rootComponent;
    NSMutableArray *_fixedComponents;
    
    css_node_t *_rootCSSNode;
    CADisplayLink *_displayLink;
}

+ (instancetype)sharedManager
{
    static id _sharedInstance = nil;
    static dispatch_once_t oncePredicate;
    dispatch_once(&oncePredicate, ^{
        _sharedInstance = [[self alloc] init];
    });
    return _sharedInstance;
}

- (instancetype)initWithWeexInstance:(id)weexInstance
{
    if (self = [self init]) {
        _weexInstance = weexInstance;
        
        _indexDict = [NSMapTable strongToWeakObjectsMapTable];
        _fixedComponents = [NSMutableArray wx_mutableArrayUsingWeakReferences];
        _uiTaskQueue = [NSMutableArray array];
        _isValid = YES;
        
        [self _startDisplayLink];
    }
    
    return self;
}

- (void)dealloc
{
}

#pragma mark Thread Management

+ (NSThread *)componentThread
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        WXComponentThread = [[NSThread alloc] initWithTarget:[self sharedManager] selector:@selector(_runLoopThread) object:nil];
        [WXComponentThread setName:WX_COMPONENT_THREAD_NAME];
        if(WX_SYS_VERSION_GREATER_THAN_OR_EQUAL_TO(@"8.0")) {
            [WXComponentThread setQualityOfService:[[NSThread mainThread] qualityOfService]];
        } else {
            [WXComponentThread setThreadPriority:[[NSThread mainThread] threadPriority]];
        }
        
        [WXComponentThread start];
    });
    
    return WXComponentThread;
}

- (void)_runLoopThread
{
    [[NSRunLoop currentRunLoop] addPort:[NSMachPort port] forMode:NSDefaultRunLoopMode];
    
    while (!_stopRunning) {
        [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode beforeDate:[NSDate distantFuture]];
    }
}

+ (void)_performBlockOnComponentThread:(void (^)())block
{
    if([NSThread currentThread] == [self componentThread]){
        block();
    } else {
        [self performSelector:@selector(_performBlockOnComponentThread:)
                     onThread:WXComponentThread
                   withObject:[block copy]
                waitUntilDone:NO];
    }
}

- (void)startComponentTasks
{
    [self _awakeDisplayLink];
}

- (void)_addUITask:(void (^)())block
{
    [_uiTaskQueue addObject:block];
}

#pragma mark Component Tree Building

- (void)createRoot:(NSDictionary *)data
{
    WXAssertComponentThread();
    WXAssertParam(data);
    
    WXComponent *rootComponent = [self _buildComponentForData:data];
    _rootComponent = rootComponent;
    WXSDKInstance *instance = self.weexInstance;
    instance.rootView.wx_component = rootComponent;
    
    _rootCSSNode = new_css_node();
    if (CGRectEqualToRect(instance.frame, CGRectZero)) {
        _rootCSSNode->style.position[CSS_LEFT] = [WXConvert WXPixelType:data[@"style"][@"left"]];
        _rootCSSNode->style.position[CSS_TOP] = [WXConvert WXPixelType:data[@"style"][@"top"]];
        _rootCSSNode->style.dimensions[CSS_WIDTH] = [WXConvert WXPixelType:data[@"style"][@"width"]];
        _rootCSSNode->style.dimensions[CSS_HEIGHT] = [WXConvert WXPixelType:data[@"style"][@"height"]];
    } else {
        _rootCSSNode->style.position[CSS_LEFT] = instance.frame.origin.x;
        _rootCSSNode->style.position[CSS_TOP] = instance.frame.origin.y;
        _rootCSSNode->style.dimensions[CSS_WIDTH] = instance.frame.size.width;
        _rootCSSNode->style.dimensions[CSS_HEIGHT] = instance.frame.size.height;
    }

    _rootCSSNode->style.flex_wrap = CSS_NOWRAP;
    _rootCSSNode->is_dirty = rootNodeIsDirty;
    _rootCSSNode->get_child = rootNodeGetChild;
    _rootCSSNode->context = (__bridge void *)(self);
    _rootCSSNode->children_count = 1;
    
    __weak typeof(self) weakSelf = self;
    [self _addUITask:^{
        __strong typeof(self) strongSelf = weakSelf;
        if (CGRectEqualToRect(instance.rootView.frame, CGRectZero)) {
            CGRect newFrame = CGRectMake(WXRoundPixelValue(strongSelf->_rootCSSNode->layout.position[CSS_LEFT]),
                                         WXRoundPixelValue(strongSelf->_rootCSSNode->layout.position[CSS_TOP]),
                                         WXRoundPixelValue(strongSelf->_rootCSSNode->layout.dimensions[CSS_WIDTH]),
                                         WXRoundPixelValue(strongSelf->_rootCSSNode->layout.dimensions[CSS_HEIGHT]));
            instance.rootView.frame = newFrame;
        }
        [instance.rootView addSubview:rootComponent.view];
    }];
}

static bool rootNodeIsDirty(void *context)
{
    WXComponentManager *mananger = (__bridge WXComponentManager *)(context);
    return [mananger->_rootComponent needsLayout];
}

static css_node_t * rootNodeGetChild(void *context, int i)
{
    WXComponentManager *mananger = (__bridge WXComponentManager *)(context);
    if (i == 0) {
        return mananger->_rootComponent.cssNode;
    } else if(mananger->_fixedComponents.count > 0) {
        return ((WXComponent *)((mananger->_fixedComponents)[i-1])).cssNode;
    }
    
    return NULL;
}

- (void)addComponent:(NSDictionary *)componentData toSupercomponent:(NSString *)superRef atIndex:(NSInteger)index appendingInTree:(BOOL)appendingInTree
{
    WXAssertComponentThread();
    WXAssertParam(componentData);
    WXAssertParam(superRef);
    
    WXComponent *supercomponent = [_indexDict objectForKey:superRef];
    WXAssertComponentExist(supercomponent);
    
    [self _recursivelyAddComponent:componentData toSupercomponent:supercomponent atIndex:index appendingInTree:appendingInTree];
}

- (void)_recursivelyAddComponent:(NSDictionary *)componentData toSupercomponent:(WXComponent *)supercomponent atIndex:(NSInteger)index appendingInTree:(BOOL)appendingInTree
{
     WXComponent *component = [self _buildComponentForData:componentData];
    
    index = (index == -1 ? supercomponent.subcomponents.count : index);
    
    [supercomponent _insertSubcomponent:component atIndex:index];
    
    // use _lazyCreateView to forbid component like cell's view creating
    if(supercomponent->_lazyCreateView) {
        component->_lazyCreateView = YES;
    }
    
    [self _addUITask:^{
        [supercomponent insertSubview:component atIndex:index];
    }];

    NSArray *subcomponentsData = [componentData valueForKey:@"children"];
    
    BOOL appendTree = !appendingInTree && [component.attributes[@"append"] isEqualToString:@"tree"];
    // if ancestor is appending tree, child should not be laid out again even it is appending tree.
    for(NSDictionary *subcomponentData in subcomponentsData){
        [self _recursivelyAddComponent:subcomponentData toSupercomponent:component atIndex:-1 appendingInTree:appendTree || appendingInTree];
    }
    if (appendTree) {
        // If appending tree，force layout in case of too much tasks piling up in syncQueue
        [self _layoutAndSyncUI];
    }
}

- (void)moveComponent:(NSString *)ref toSuper:(NSString *)superRef atIndex:(NSInteger)index
{
    WXAssertComponentThread();
    WXAssertParam(ref);
    WXAssertParam(superRef);
    
    WXComponent *component = [_indexDict objectForKey:ref];
    WXComponent *newSupercomponent = [_indexDict objectForKey:superRef];
    WXAssertComponentExist(component);
    WXAssertComponentExist(newSupercomponent);
    
    if (component.supercomponent == newSupercomponent && [newSupercomponent.subcomponents indexOfObject:component] < index) {
        // if the supercomponent moved to is the same as original supercomponent,
        // unify it into the index after removing.
        index--;
    }
    
    [component _moveToSupercomponent:newSupercomponent atIndex:index];
    
    [self _addUITask:^{
        [component moveToSuperview:newSupercomponent atIndex:index];
    }];
}

- (void)removeComponent:(NSString *)ref
{
    WXAssertComponentThread();
    WXAssertParam(ref);
    
    WXComponent *component = [_indexDict objectForKey:ref];
    WXAssertComponentExist(component);
    
    [component _removeFromSupercomponent];
    
    [_indexDict removeObjectForKey:ref];
    
    [self _addUITask:^{
        [component removeFromSuperview];
    }];
}

- (WXComponent *)componentForRef:(NSString *)ref
{
    NSDictionary *dict = [_indexDict copy];
    return [dict objectForKey:ref];
}


- (WXComponent *)_buildComponentForData:(NSDictionary *)data
{
    NSString *ref = data[@"ref"];
    NSString *type = data[@"type"];
    NSDictionary *styles = data[@"style"];
    NSDictionary *attributes = data[@"attr"];
    NSArray *events = data[@"event"];
    
    Class clazz = [WXComponentFactory classWithComponentName:type];
    WXComponent *component = [[clazz alloc] initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:self.weexInstance];
    WXAssert(component, @"Component build failed for data:%@", data);
    
    [_indexDict setObject:component forKey:component.ref];
    
    return component;
}

#pragma mark Updating

- (void)updateStyles:(NSDictionary *)styles forComponent:(NSString *)ref
{
    WXAssertParam(styles);
    WXAssertParam(ref);
    
    WXComponent *component = [_indexDict objectForKey:ref];
    WXAssertComponentExist(component);
    
    [component _updateStylesOnComponentThread:styles];
    [self _addUITask:^{
        [component _updateStylesOnMainThread:styles];
    }];
}

- (void)updateAttributes:(NSDictionary *)attributes forComponent:(NSString *)ref
{
    WXAssertParam(attributes);
    WXAssertParam(ref);
    
    WXComponent *component = [_indexDict objectForKey:ref];
    WXAssertComponentExist(component);
    
    [component _updateAttributesOnComponentThread:attributes];
    [self _addUITask:^{
        [component _updateAttributesOnMainThread:attributes];
    }];
}

- (void)addEvent:(NSString *)eventName toComponent:(NSString *)ref
{
    WXAssertComponentThread();
    WXAssertParam(eventName);
    WXAssertParam(ref);
    
    WXComponent *component = [_indexDict objectForKey:ref];
    WXAssertComponentExist(component);
    
    [component _addEventOnComponentThread:eventName];
    
    [self _addUITask:^{
        [component _addEventOnMainThread:eventName];
    }];
}

- (void)removeEvent:(NSString *)eventName fromComponent:(NSString *)ref
{
    WXAssertComponentThread();
    WXAssertParam(eventName);
    WXAssertParam(ref);
    
    WXComponent *component = [_indexDict objectForKey:ref];
    WXAssertComponentExist(component);
    
    [component _removeEventOnComponentThread:eventName];
    
    [self _addUITask:^{
        [component _removeEventOnMainThread:eventName];
    }];
}

- (void)scrollToComponent:(NSString *)ref options:(NSDictionary *)options
{
    WXAssertComponentThread();
    WXAssertParam(ref);
    
    WXComponent *toComponent = [_indexDict objectForKey:ref];
    WXAssertComponentExist(toComponent);

    id<WXScrollerProtocol> scrollerComponent = toComponent.ancestorScroller;
    if (!scrollerComponent) {
        return;
    }

    CGFloat offset = [[options objectForKey:@"offset"] floatValue];
    
    [self _addUITask:^{
        [scrollerComponent scrollToComponent:toComponent withOffset:offset];
    }];
}

#pragma mark Life Cycle

- (void)createFinish
{
    WXAssertComponentThread();
    
    WXSDKInstance *instance  = self.weexInstance;
    [self _addUITask:^{        
        UIView *rootView = instance.rootView;
        [instance finishPerformance];
        
        if(instance.renderFinish){
            instance.renderFinish(rootView);
        }
    }];
}

- (void)updateFinish
{
    WXAssertComponentThread();
    
    WXSDKInstance *instance = self.weexInstance;
    WXComponent *root = [_indexDict objectForKey:WX_SDK_ROOT_REF];
    
    [self _addUITask:^{
        if(instance.updateFinish){
            instance.updateFinish(root.view);
        }
    }];
}

- (void)refreshFinish
{
    WXAssertComponentThread();
    
    WXSDKInstance *instance = self.weexInstance;
    WXComponent *root = [_indexDict objectForKey:WX_SDK_ROOT_REF];
    
    [self _addUITask:^{
        if(instance.refreshFinish){
            instance.refreshFinish(root.view);
        }
    }];
}

- (void)unload
{
    WXAssertComponentThread();
    
    for (NSString *key in _indexDict) {
        WXComponent *component = [_indexDict objectForKey:key];;
        dispatch_async(dispatch_get_main_queue(), ^{
            [component _unloadView];
        });
    }
    
    [_indexDict removeAllObjects];
    [_uiTaskQueue removeAllObjects];

    dispatch_async(dispatch_get_main_queue(), ^{
         _rootComponent = nil;
    });
    
    [self _stopDisplayLink];
    
    _isValid = NO;
}

- (BOOL)isValid
{
    return _isValid;
}

#pragma mark Layout Batch

- (void)_startDisplayLink
{
    WXAssertComponentThread();
    
    if(!_displayLink){
        _displayLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(_handleDisplayLink)];
        [_displayLink addToRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];
    }
}

- (void)_stopDisplayLink
{
    WXAssertComponentThread();
    
    if(_displayLink){
        [_displayLink invalidate];
        _displayLink = nil;
    }
}

- (void)_suspendDisplayLink
{
    WXAssertComponentThread();
    
    if(_displayLink && !_displayLink.paused) {
        _displayLink.paused = YES;
    }
}

- (void)_awakeDisplayLink
{
    WXAssertComponentThread();
    
    if(_displayLink && _displayLink.paused) {
        _displayLink.paused = NO;
    }
}

- (void)_handleDisplayLink
{
    WXAssertComponentThread();
    
    [self _layoutAndSyncUI];
}

- (void)_layoutAndSyncUI
{
    [self _layout];
    
    if(_uiTaskQueue.count > 0){
        [self _syncUITasks];
        _noTaskTickCount = 0;
    } else {
        // suspend display link when there's no task for 1 second, in order to save CPU time.
        _noTaskTickCount ++;
        if (_noTaskTickCount > 60) {
            [self _suspendDisplayLink];
        }
    }
}

- (void)_layout
{
    BOOL needsLayout = NO;
    for (NSString *ref in _indexDict) {
        WXComponent *component = [_indexDict objectForKey:ref];
        
        if ([component needsLayout]) {
            needsLayout = YES;
        }
    }
    
    if (!needsLayout) {
        return;
    }
    
    layoutNode(_rootCSSNode, _rootCSSNode->style.dimensions[CSS_WIDTH], _rootCSSNode->style.dimensions[CSS_HEIGHT], CSS_DIRECTION_INHERIT);
    
    if ([_rootComponent needsLayout]) {
        if ([WXLog logLevel] >= WXLogLevelDebug) {
            print_css_node(_rootCSSNode, CSS_PRINT_LAYOUT | CSS_PRINT_STYLE | CSS_PRINT_CHILDREN);
        }
    }
    
    NSMutableSet<WXComponent *> *dirtyComponents = [NSMutableSet set];
    [_rootComponent _calculateFrameWithSuperAbsolutePosition:CGPointZero gatherDirtyComponents:dirtyComponents];
  
    for (WXComponent *dirtyComponent in dirtyComponents) {
        [self _addUITask:^{
            [dirtyComponent _layoutDidFinish];
        }];
    }
}

- (void)_syncUITasks
{
    NSArray<dispatch_block_t> *blocks = _uiTaskQueue;
    _uiTaskQueue = [NSMutableArray array];
    dispatch_async(dispatch_get_main_queue(), ^{
        for(dispatch_block_t block in blocks) {
            block();
        }
    });
}

#pragma mark Fixed 

- (void)addFixedComponent:(WXComponent *)fixComponent
{
    [_fixedComponents addObject:fixComponent];
    _rootCSSNode->children_count = (int)[_fixedComponents count] + 1;
}

- (void)removeFixedComponent:(WXComponent *)fixComponent
{
    [_fixedComponents removeObject:fixComponent];
    _rootCSSNode->children_count = (int)[_fixedComponents count] + 1;
}

@end

void WXPerformBlockOnComponentThread(void (^block)())
{
    [WXComponentManager _performBlockOnComponentThread:block];
}

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXSDKInstance.h"
#import "WXSDKInstance_private.h"
#import "WXSDKManager.h"
#import "WXSDKError.h"
#import "WXMonitor.h"
#import "WXAppMonitorProtocol.h"
#import "WXNetworkProtocol.h"
#import "WXModuleFactory.h"
#import "WXHandlerFactory.h"
#import "WXDebugTool.h"
#import "WXUtility.h"
#import "WXAssert.h"
#import "WXLog.h"
#import "WXView.h"
#import "WXRootView.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXResourceRequest.h"
#import "WXResourceResponse.h"
#import "WXResourceLoader.h"
#import "WXSDKEngine.h"

NSString *const bundleUrlOptionKey = @"bundleUrl";

NSTimeInterval JSLibInitTime = 0;

typedef enum : NSUInteger {
    WXLoadTypeNormal,
    WXLoadTypeBack,
    WXLoadTypeForward,
    WXLoadTypeReload,
    WXLoadTypeReplace
} WXLoadType;

@implementation WXSDKInstance
{
    NSDictionary *_options;
    id _jsData;
    
    WXResourceLoader *_mainBundleLoader;
    WXComponentManager *_componentManager;
    WXRootView *_rootView;
    WXThreadSafeMutableDictionary *_moduleEventObservers;
}

- (void)dealloc
{
    [_moduleEventObservers removeAllObjects];
    [self removeObservers];
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (instancetype)init
{
    self = [super init];
    if(self){
        NSInteger instanceId = 0;
        @synchronized(self){
            static NSInteger __instance = 0;
            instanceId = __instance % (1024*1024);
            __instance++;
        }
        _instanceId = [NSString stringWithFormat:@"%ld", (long)instanceId];

        [WXSDKManager storeInstance:self forID:_instanceId];
        
        _bizType = @"";
        _pageName = @"";

        _performanceDict = [WXThreadSafeMutableDictionary new];
        _moduleInstances = [NSMutableDictionary new];
        _styleConfigs = [NSMutableDictionary new];
        _attrConfigs = [NSMutableDictionary new];
        _moduleEventObservers = [WXThreadSafeMutableDictionary new];
        _trackComponent = NO;
       
        [self addObservers];
    }
    return self;
}

- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@: %p; id = %@; rootView = %@; url= %@>", NSStringFromClass([self class]), self, _instanceId, _rootView, _scriptURL];
}

#pragma mark Public Mehtods

- (UIView *)rootView
{
    return _rootView;
}


- (void)setFrame:(CGRect)frame
{
    if (!CGRectEqualToRect(frame, _frame)) {
        _frame = frame;
        WXPerformBlockOnMainThread(^{
            if (_rootView) {
                _rootView.frame = frame;
                WXPerformBlockOnComponentThread(^{
                    [self.componentManager rootViewFrameDidChange:frame];
                });
            }
        });
    }
}

- (void)renderWithURL:(NSURL *)url
{
    [self renderWithURL:url options:nil data:nil];
}

- (void)renderWithURL:(NSURL *)url options:(NSDictionary *)options data:(id)data
{
    if (!url) {
        WXLogError(@"Url must be passed if you use renderWithURL");
        return;
    }
    
    WXResourceRequest *request = [WXResourceRequest requestWithURL:url resourceType:WXResourceTypeMainBundle referrer:@"" cachePolicy:NSURLRequestUseProtocolCachePolicy];
    [self _renderWithRequest:request options:options data:data];
}

- (void)renderView:(NSString *)source options:(NSDictionary *)options data:(id)data
{
    WXLogDebug(@"Render source: %@, data:%@", self, [WXUtility JSONString:data]);
    
    _options = options;
    _jsData = data;
    
    [self _renderWithMainBundleString:source];
}

- (void)_renderWithMainBundleString:(NSString *)mainBundleString
{
    if (!self.instanceId) {
        WXLogError(@"Fail to find instance！");
        return;
    }
    
    if (self.pageName && ![self.pageName isEqualToString:@""]) {
        WXLog(@"Start rendering page:%@", self.pageName);
    } else {
        WXLogWarning(@"WXSDKInstance's pageName should be specified.");
    }
    
    WX_MONITOR_INSTANCE_PERF_START(WXPTFirstScreenRender, self);
    WX_MONITOR_INSTANCE_PERF_START(WXPTAllRender, self);
    
    NSMutableDictionary *dictionary = [_options mutableCopy];
    if ([WXLog logLevel] >= WXLogLevelLog) {
        dictionary[@"debug"] = @(YES);
    }
    
    if ([WXDebugTool getReplacedBundleJS]) {
        mainBundleString = [WXDebugTool getReplacedBundleJS];
    }
    
    //TODO WXRootView
    WXPerformBlockOnMainThread(^{
        _rootView = [[WXRootView alloc] initWithFrame:self.frame];
        _rootView.instance = self;
        if(self.onCreate) {
            self.onCreate(_rootView);
        }
    });
    
    // ensure default modules/components/handlers are ready before create instance
    [WXSDKEngine registerDefaults];
    
    [[WXSDKManager bridgeMgr] createInstance:self.instanceId template:mainBundleString options:dictionary data:_jsData];
    
    WX_MONITOR_PERF_SET(WXPTBundleSize, [mainBundleString lengthOfBytesUsingEncoding:NSUTF8StringEncoding], self);
}


- (void)_renderWithRequest:(WXResourceRequest *)request options:(NSDictionary *)options data:(id)data;
{
    NSURL *url = request.URL;
    _scriptURL = url;
    _options = options;
    _jsData = data;
    NSMutableDictionary *newOptions = [options mutableCopy] ?: [NSMutableDictionary new];
    
    if (!newOptions[bundleUrlOptionKey]) {
        newOptions[bundleUrlOptionKey] = url.absoluteString;
    }
    // compatible with some wrong type, remove this hopefully in the future.
    if ([newOptions[bundleUrlOptionKey] isKindOfClass:[NSURL class]]) {
        WXLogWarning(@"Error type in options with key:bundleUrl, should be of type NSString, not NSURL!");
        newOptions[bundleUrlOptionKey] = ((NSURL*)newOptions[bundleUrlOptionKey]).absoluteString;
    }
    
    if (!self.pageName || [self.pageName isEqualToString:@""]) {
        self.pageName = [WXUtility urlByDeletingParameters:url].absoluteString ? : @"";
    }
    
    request.userAgent = [WXUtility userAgent];
    
    WX_MONITOR_INSTANCE_PERF_START(WXPTJSDownload, self);
    __weak typeof(self) weakSelf = self;
    _mainBundleLoader = [[WXResourceLoader alloc] initWithRequest:request];;
    _mainBundleLoader.onFinished = ^(WXResourceResponse *response, NSData *data) {
        __strong typeof(weakSelf) strongSelf = weakSelf;
        
        if ([response isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse *)response).statusCode != 200) {
            NSError *error = [NSError errorWithDomain:WX_ERROR_DOMAIN
                                        code:((NSHTTPURLResponse *)response).statusCode
                                    userInfo:@{@"message":@"status code error."}];
            if (strongSelf.onFailed) {
                strongSelf.onFailed(error);
            }
            return ;
        }

        if (!data) {
            NSString *errorMessage = [NSString stringWithFormat:@"Request to %@ With no data return", request.URL];
            WX_MONITOR_FAIL_ON_PAGE(WXMTJSDownload, WX_ERR_JSBUNDLE_DOWNLOAD, errorMessage, strongSelf.pageName);

            if (strongSelf.onFailed) {
                strongSelf.onFailed(error);
            }
            return;
        }
        
        NSString *jsBundleString = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        if (!jsBundleString) {
            WX_MONITOR_FAIL_ON_PAGE(WXMTJSDownload, WX_ERR_JSBUNDLE_STRING_CONVERT, @"data converting to string failed.", strongSelf.pageName)
            return;
        }

        WX_MONITOR_SUCCESS_ON_PAGE(WXMTJSDownload, strongSelf.pageName);
        WX_MONITOR_INSTANCE_PERF_END(WXPTJSDownload, strongSelf);

        [strongSelf _renderWithMainBundleString:jsBundleString];
    };
    
    _mainBundleLoader.onFailed = ^(NSError *loadError) {
        NSString *errorMessage = [NSString stringWithFormat:@"Request to %@ occurs an error:%@", request.URL, loadError.localizedDescription];
        WX_MONITOR_FAIL_ON_PAGE(WXMTJSDownload, WX_ERR_JSBUNDLE_DOWNLOAD, errorMessage, weakSelf.pageName);
        
        if (weakSelf.onFailed) {
            weakSelf.onFailed(loadError);
        }
    };
    
    [_mainBundleLoader start];
}

- (void)reload:(BOOL)forcedReload
{
    // TODO: [self unload]
    if (!_scriptURL) {
        WXLogError(@"No script URL found while reloading!");
        return;
    }
    
    NSURLRequestCachePolicy cachePolicy = forcedReload ? NSURLRequestReloadIgnoringCacheData : NSURLRequestUseProtocolCachePolicy;
    WXResourceRequest *request = [WXResourceRequest requestWithURL:_scriptURL resourceType:WXResourceTypeMainBundle referrer:_scriptURL.absoluteString cachePolicy:cachePolicy];
    [self _renderWithRequest:request options:_options data:_jsData];
}

- (void)refreshInstance:(id)data
{
    WXLogDebug(@"refresh instance: %@, data:%@", self, [WXUtility JSONString:data]);
    
    if (!self.instanceId) {
        WXLogError(@"Fail to find instance！");
        return;
    }
    
    [[WXSDKManager bridgeMgr] refreshInstance:self.instanceId data:data];
}

- (void)destroyInstance
{
    if (!self.instanceId) {
        WXLogError(@"Fail to find instance！");
        return;
    }
    
    [[WXSDKManager bridgeMgr] destroyInstance:self.instanceId];

    __weak typeof(self) weakSelf = self;
    WXPerformBlockOnComponentThread(^{
        __strong typeof(self) strongSelf = weakSelf;
        [strongSelf.componentManager unload];
        dispatch_async(dispatch_get_main_queue(), ^{
            [WXSDKManager removeInstanceforID:strongSelf.instanceId];
        });
    });
}

- (void)updateState:(WXState)state
{
    if (!self.instanceId) {
        WXLogError(@"Fail to find instance！");
        return;
    }
    
    NSMutableDictionary *data = [NSMutableDictionary dictionary];
    [data setObject:[NSString stringWithFormat:@"%ld",(long)state] forKey:@"state"];
    //[[WXSDKManager bridgeMgr] updateState:self.instanceId data:data];
    
    [[NSNotificationCenter defaultCenter] postNotificationName:WX_INSTANCE_NOTIFICATION_UPDATE_STATE object:self userInfo:data];
}

- (id)moduleForClass:(Class)moduleClass
{
    if (!moduleClass)
        return nil;
    
    id<WXModuleProtocol> moduleInstance = self.moduleInstances[NSStringFromClass(moduleClass)];
    if (!moduleInstance) {
        moduleInstance = [[moduleClass alloc] init];
        if ([moduleInstance respondsToSelector:@selector(setWeexInstance:)])
            [moduleInstance setWeexInstance:self];
        self.moduleInstances[NSStringFromClass(moduleClass)] = moduleInstance;
    }
    
    return moduleInstance;
}

- (WXComponent *)componentForRef:(NSString *)ref
{
    WXAssertComponentThread();
    
    return [_componentManager componentForRef:ref];
}

- (NSUInteger)numberOfComponents
{
    WXAssertComponentThread();
    
    return [_componentManager numberOfComponents];
}

- (void)fireGlobalEvent:(NSString *)eventName params:(NSDictionary *)params
{
    if (!params){
        params = [NSDictionary dictionary];
    }
    NSDictionary * userInfo = @{
            @"weexInstance":self.instanceId,
            @"param":params
    };
    [[NSNotificationCenter defaultCenter] postNotificationName:eventName object:self userInfo:userInfo];
}

- (void)fireModuleEvent:(Class)module eventName:(NSString *)eventName params:(NSDictionary*)params
{
    NSDictionary * userInfo = @{
                                @"moduleId":NSStringFromClass(module)?:@"",
                                @"param":params?:@{},
                                @"eventName":eventName
                                };
    
    [[NSNotificationCenter defaultCenter] postNotificationName:WX_MODULE_EVENT_FIRE_NOTIFICATION object:self userInfo:userInfo];
}

- (CGFloat)pixelScaleFactor
{
    if (self.viewportWidth > 0) {
        return [WXUtility portraitScreenSize].width / self.viewportWidth;
    } else {
        return [WXUtility defaultPixelScaleFactor];
    }
}

- (NSURL *)completeURL:(NSString *)url
{
    if (!_scriptURL) {
        return [NSURL URLWithString:url];
    }
    if ([url hasPrefix:@"//"] && [_scriptURL isFileURL]) {
        return [NSURL URLWithString:url];
    }
    if (!url) {
        return nil;
    }
    
    return [NSURL URLWithString:url relativeToURL:_scriptURL];
}

- (BOOL)checkModuleEventRegistered:(NSString*)event moduleClassName:(NSString*)moduleClassName
{
    NSDictionary * observer = [_moduleEventObservers objectForKey:moduleClassName];
    return observer && observer[event]? YES:NO;
}

#pragma mark Private Methods

- (void)_addModuleEventObserversWithModuleMethod:(WXModuleMethod *)method
{
    if ([method.arguments count] < 2) {
        WXLogError(@"please check your method parameter!!");
        return;
    }
    if(![method.arguments[0] isKindOfClass:[NSString class]]) {
        // arguments[0] will be event name, so it must be a string type value here.
        return;
    }
    NSMutableArray * methodArguments = [method.arguments mutableCopy];
    if ([methodArguments count] == 2) {
        [methodArguments addObject:@{@"once": @false}];
    }
    if (![methodArguments[2] isKindOfClass:[NSDictionary class]]) {
        //arguments[2] is the option value, so it must be a dictionary.
        return;
    }
    Class moduleClass =  [WXModuleFactory classWithModuleName:method.moduleName];
    NSMutableDictionary * option = [methodArguments[3] mutableCopy];
    [option setObject:method.moduleName forKey:@"moduleName"];
    // the value for moduleName in option is for the need of callback
    [self addModuleEventObservers:methodArguments[0] callback:methodArguments[1] option:option moduleClassName:NSStringFromClass(moduleClass)];
}

- (void)addModuleEventObservers:(NSString*)event callback:(NSString*)callbackId option:(NSDictionary *)option moduleClassName:(NSString*)moduleClassName
{
    BOOL once = [[option objectForKey:@"once"] boolValue];
    NSString * moduleName = [option objectForKey:@"moduleName"];
    NSMutableDictionary * observer = nil;
    NSDictionary * callbackInfo = @{@"callbackId":callbackId,@"once":@(once),@"moduleName":moduleName};
    if(![self checkModuleEventRegistered:event moduleClassName:moduleClassName]) {
        //had not registered yet
        observer = [NSMutableDictionary new];
        [observer setObject:[@{event:[@[callbackInfo] mutableCopy]} mutableCopy] forKey:moduleClassName];
        [_moduleEventObservers addEntriesFromDictionary:observer];
    } else {
        observer = _moduleEventObservers[moduleClassName];
        [[observer objectForKey:event] addObject:callbackInfo];
    }
}

- (void)_removeModuleEventObserverWithModuleMethod:(WXModuleMethod *)method
{
    if (![method.arguments count] && [method.arguments[0] isKindOfClass:[NSString class]]) {
        return;
    }
    Class moduleClass =  [WXModuleFactory classWithModuleName:method.moduleName];
    [self removeModuleEventObserver:method.arguments[0] moduleClassName:NSStringFromClass(moduleClass)];
}

- (void)removeModuleEventObserver:(NSString*)event moduleClassName:(NSString*)moduleClassName
{
    if (![self checkModuleEventRegistered:event moduleClassName:moduleClassName]) {
        return;
    }
    [_moduleEventObservers[moduleClassName] removeObjectForKey:event];
}

- (void)moduleEventNotification:(NSNotification *)notification
{
    NSMutableDictionary *moduleEventObserversCpy = (NSMutableDictionary *)CFBridgingRelease(CFPropertyListCreateDeepCopy(kCFAllocatorDefault, (CFDictionaryRef)_moduleEventObservers, kCFPropertyListMutableContainers));// deep
    NSDictionary * userInfo = notification.userInfo;
    NSMutableArray * listeners = [moduleEventObserversCpy[userInfo[@"moduleId"]] objectForKey:userInfo[@"eventName"]];
    if (![listeners isKindOfClass:[NSArray class]]) {
        return;
        // something wrong
    }
    for (int i = 0;i < [listeners count]; i ++) {
        NSDictionary * callbackInfo = listeners[i];
        NSString *callbackId = callbackInfo[@"callbackId"];
        BOOL once = [callbackInfo[@"once"] boolValue];
        NSDictionary * retData = @{@"type":userInfo[@"eventName"],
                                   @"module":callbackInfo[@"moduleName"],
                                   @"data":userInfo[@"param"]};
        [[WXSDKManager bridgeMgr] callBack:self.instanceId funcId:callbackId params:retData keepAlive:!once];
        // if callback function is not once, then it is keepalive
        if (once) {
            NSMutableArray * moduleEventListener = [_moduleEventObservers[userInfo[@"moduleId"]] objectForKey:userInfo[@"eventName"]];
            [moduleEventListener removeObject:callbackInfo];
            if ([moduleEventListener count] == 0) {
                [self removeModuleEventObserver:userInfo[@"eventName"] moduleClassName:userInfo[@"moduleId"]];
            }
            // if callback function is once. clear it after fire it.
        }
    }
}

- (void)addObservers
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(moduleEventNotification:) name:WX_MODULE_EVENT_FIRE_NOTIFICATION object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationWillResignActive:) name:UIApplicationWillResignActiveNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationDidBecomeActive:) name:UIApplicationDidBecomeActiveNotification object:nil];
    [self addObserver:self forKeyPath:@"state" options:NSKeyValueObservingOptionNew context:nil];
}

- (void)removeObservers
{
    [self removeObserver:self forKeyPath:@"state"];
}

- (void)applicationWillResignActive:(NSNotification*)notification
{
    [self fireGlobalEvent:WX_APPLICATION_WILL_RESIGN_ACTIVE params:nil];
}

- (void)applicationDidBecomeActive:(NSNotification*)notification
{
    [self fireGlobalEvent:WX_APPLICATION_DID_BECOME_ACTIVE params:nil];
}

- (WXComponentManager *)componentManager
{
    if (!_componentManager) {
        _componentManager = [[WXComponentManager alloc] initWithWeexInstance:self];
    }
    
    return _componentManager;
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if ([keyPath isEqualToString:@"state"]) {
        WXState state = [change[@"new"] longValue];
        [self updateState:state];
        
        if (state == WeexInstanceDestroy) {
            [self destroyInstance];
        }
    }
}

@end

@implementation WXSDKInstance (Deprecated)

# pragma mark - Deprecated

- (void)reloadData:(id)data
{
    [self refreshInstance:data];
}

- (void)finishPerformance
{
    //deperacated
}

- (void)creatFinish
{
    
}

@end

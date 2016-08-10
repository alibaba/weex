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
#import "WXLog.h"
#import "WXView.h"
#import "WXThreadSafeMutableDictionary.h"

NSString *const bundleUrlOptionKey = @"bundleUrl";

NSTimeInterval JSLibInitTime = 0;

@implementation WXSDKInstance
{
    id<WXNetworkProtocol> _networkHandler;
    
    WXComponentManager *_componentManager;
}

- (void) dealloc
{
    [self removeObservers];
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
       
        [self addObservers];
    }
    return self;
}

#pragma mark Public Mehtods

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
    
    _scriptURL = url;
    NSMutableDictionary *newOptions = [options mutableCopy];
    newOptions[bundleUrlOptionKey] = url.absoluteString;
    
    if (!self.pageName || [self.pageName isEqualToString:@""]) {
        self.pageName = [WXUtility urlByDeletingParameters:url].absoluteString ? : @"";
    }
    
    __weak typeof(self) weakSelf = self;
    if ([url isFileURL]) {
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            NSString *path = [url path];
            NSData *scriptData = [[NSFileManager defaultManager] contentsAtPath:path];
            NSString *script = [[NSString alloc] initWithData:scriptData encoding:NSUTF8StringEncoding];
            if (!script) {
                NSString *errorDesc = [NSString stringWithFormat:@"File read error at url: %@", url];
                WXLogError(@"%@", errorDesc);
                if (weakSelf.onFailed) {
                    weakSelf.onFailed([NSError errorWithDomain:WX_ERROR_DOMAIN code:0 userInfo:@{NSLocalizedDescriptionKey: errorDesc}]);
                }
                return;
            }
            [weakSelf renderView:script options:newOptions data:data];
        });
    } else {
        WX_MONITOR_INSTANCE_PERF_START(WXPTJSDownload, self);
        
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setValue:[WXUtility userAgent] forHTTPHeaderField:@"User-Agent"];
        
        id<WXNetworkProtocol> networkHandler = [self networkHandler];
        
        __block NSURLResponse *urlResponse;
        [networkHandler sendRequest:request
                   withSendingData:^(int64_t bytesSent, int64_t totalBytes) {}
                      withResponse:^(NSURLResponse *response) {
                          urlResponse = response;
                      }
                   withReceiveData:^(NSData *data) {}
                   withCompeletion:^(NSData *totalData, NSError *error) {
            //TODO 304
            if (!error && [urlResponse isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse *)urlResponse).statusCode != 200) {
                error = [NSError errorWithDomain:WX_ERROR_DOMAIN
                                            code:((NSHTTPURLResponse *)urlResponse).statusCode
                                        userInfo:@{@"message":@"status code error."}];
            }
            
            if (error) {
                NSString *errorMessage = [NSString stringWithFormat:@"Connection to %@ occurs an error:%@", request.URL, error.localizedDescription];
                WX_MONITOR_FAIL_ON_PAGE(WXMTJSDownload, WX_ERR_JSBUNDLE_DOWNLOAD, errorMessage, weakSelf.pageName);
                
                if (weakSelf.onFailed) {
                    weakSelf.onFailed(error);
                }
                return;
            }
                       
            if (!totalData) {
                NSString *errorMessage = [NSString stringWithFormat:@"Connection to %@ but no data return", request.URL];
                WX_MONITOR_FAIL_ON_PAGE(WXMTJSDownload, WX_ERR_JSBUNDLE_DOWNLOAD, errorMessage, weakSelf.pageName);
                
                if (weakSelf.onFailed) {
                    weakSelf.onFailed(error);
                }
                return;
            }
                       
            NSString *script = [[NSString alloc] initWithData:totalData encoding:NSUTF8StringEncoding];
            if (!script) {
                WX_MONITOR_FAIL_ON_PAGE(WXMTJSDownload, WX_ERR_JSBUNDLE_STRING_CONVERT, @"data converting to string failed.", weakSelf.pageName)
                return;
            }
            
            WX_MONITOR_SUCCESS_ON_PAGE(WXMTJSDownload, weakSelf.pageName);
            WX_MONITOR_INSTANCE_PERF_END(WXPTJSDownload, weakSelf);

            [weakSelf renderView:script options:newOptions data:data];
        }];
    }
}

- (void)renderView:(NSString *)source options:(NSDictionary *)options data:(id)data
{
    WXLogDebug(@"Render view: %@, data:%@", self, [WXUtility JSONString:data]);
    
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
    
    NSMutableDictionary *dictionary = [options mutableCopy];
    if ([WXLog logLevel] >= WXLogLevelLog) {
        dictionary[@"debug"] = @(YES);
    }
    
    if ([WXDebugTool getReplacedBundleJS]) {
        source = [WXDebugTool getReplacedBundleJS];
    }
    
    //TODO WXRootView
    WXPerformBlockOnMainThread(^{
        self.rootView = [[WXView alloc] initWithFrame:self.frame];
        if(self.onCreate) {
            self.onCreate(self.rootView);
        }
    });

    [[WXSDKManager bridgeMgr] createInstance:self.instanceId template:source options:dictionary data:data];

    WX_MONITOR_PERF_SET(WXPTBundleSize, [source lengthOfBytesUsingEncoding:NSUTF8StringEncoding], self);
}

- (void)setFrame:(CGRect)frame
{
    if (!CGRectEqualToRect(frame, _frame)) {
        _frame = frame;
        WXPerformBlockOnMainThread(^{
            if (self.rootView) {
                self.rootView.frame = frame;
                WXPerformBlockOnComponentThread(^{
                    [self.componentManager rootViewFrameDidChange:frame];
                });
            }
        });
    }
}

- (void)reloadData:(id)data
{
    [self refreshInstance:data];
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
    
    [[NSNotificationCenter defaultCenter]postNotificationName:WX_INSTANCE_NOTIFICATION_UPDATE_STATE object:self userInfo:data];
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
    return [_componentManager componentForRef:ref];
}

- (NSUInteger)numberOfComponents
{
    return [_componentManager numberOfComponents];
}

- (void)finishPerformance
{
    //deperacated
}

#pragma mark Private Methods

- (void)addObservers
{
    [self addObserver:self forKeyPath:@"state" options:NSKeyValueObservingOptionNew context:nil];
}

- (void)removeObservers
{
    [self removeObserver:self forKeyPath:@"state"];
}

- (WXComponentManager *)componentManager
{
    if (!_componentManager) {
        _componentManager = [[WXComponentManager alloc] initWithWeexInstance:self];
    }
    
    return _componentManager;
}

- (id<WXNetworkProtocol>)networkHandler
{
    if (!_networkHandler) {
        _networkHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXNetworkProtocol)];
    }
    
    return _networkHandler;
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

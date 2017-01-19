/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXBridgeContext.h"
#import "WXBridgeProtocol.h"
#import "WXJSCoreBridge.h"
#import "WXDebugLoggerBridge.h"
#import "WXLog.h"
#import "WXUtility.h"
#import "WXModuleFactory.h"
#import "WXModuleProtocol.h"
#import "WXUtility.h"
#import "WXSDKError.h"
#import "WXMonitor.h"
#import "WXAssert.h"
#import "WXSDKManager.h"
#import "WXDebugTool.h"
#import "WXSDKInstance_private.h"
#import "WXThreadSafeMutableArray.h"
#import "WXAppConfiguration.h"
#import "WXInvocationConfig.h"
#import "WXComponentMethod.h"
#import "WXModuleMethod.h"
#import "WXCallJSMethod.h"
#import "WXSDKInstance_private.h"

#define SuppressPerformSelectorLeakWarning(Stuff) \
do { \
_Pragma("clang diagnostic push") \
_Pragma("clang diagnostic ignored \"-Warc-performSelector-leaks\"") \
Stuff; \
_Pragma("clang diagnostic pop") \
} while (0)

@interface WXBridgeContext ()

@property (nonatomic, strong) id<WXBridgeProtocol>  jsBridge;
@property (nonatomic, strong) WXDebugLoggerBridge *devToolSocketBridge;
@property (nonatomic, assign) BOOL  debugJS;
//store the methods which will be executed from native to js
@property (nonatomic, strong) NSMutableDictionary   *sendQueue;
//the instance stack
@property (nonatomic, strong) WXThreadSafeMutableArray    *insStack;
//identify if the JSFramework has been loaded
@property (nonatomic) BOOL frameworkLoadFinished;
//store some methods temporarily before JSFramework is loaded
@property (nonatomic, strong) NSMutableArray *methodQueue;
// store template service
@property (nonatomic, strong) NSMutableArray *jsServiceQueue;

@end

@implementation WXBridgeContext

- (instancetype) init
{
    self = [super init];
    if (self) {
        _methodQueue = [NSMutableArray new];
        _frameworkLoadFinished = NO;
        _jsServiceQueue = [NSMutableArray new];
    }
    return self;
}

- (id<WXBridgeProtocol>)jsBridge
{
    WXAssertBridgeThread();
    _debugJS = [WXDebugTool isDevToolDebug];
    
    Class bridgeClass = _debugJS ? NSClassFromString(@"WXDebugger") : [WXJSCoreBridge class];
    
    if (_jsBridge && [_jsBridge isKindOfClass:bridgeClass]) {
        return _jsBridge;
    }
    
    if (_jsBridge) {
        [_methodQueue removeAllObjects];
        _frameworkLoadFinished = NO;
    }
    
    _jsBridge = _debugJS ? [NSClassFromString(@"WXDebugger") alloc] : [[WXJSCoreBridge alloc] init];
    
    [self registerGlobalFuntions];
    
    return _jsBridge;
}

- (void)registerGlobalFuntions
{
    __weak typeof(self) weakSelf = self;
    [_jsBridge registerCallNative:^NSInteger(NSString *instance, NSArray *tasks, NSString *callback) {
        return [weakSelf invokeNative:instance tasks:tasks callback:callback];
    }];
    [_jsBridge registerCallAddElement:^NSInteger(NSString *instanceId, NSString *parentRef, NSDictionary *elementData, NSInteger index) {
        
        // Temporary here , in order to improve performance, will be refactored next version.
        WXSDKInstance *instance = [WXSDKManager instanceForID:instanceId];
        
        if (!instance) {
            WXLogInfo(@"instance not found, maybe already destroyed");
            return -1;
        }
        
        WXPerformBlockOnComponentThread(^{
            WXComponentManager *manager = instance.componentManager;
            if (!manager.isValid) {
                return;
            }
            [manager startComponentTasks];
            [manager addComponent:elementData toSupercomponent:parentRef atIndex:index appendingInTree:NO];
        });
        
        return 0;
    }];
    
    [_jsBridge registerCallNativeModule:^NSInvocation*(NSString *instanceId, NSString *moduleName, NSString *methodName, NSArray *arguments, NSDictionary *options) {
        
        WXSDKInstance *instance = [WXSDKManager instanceForID:instanceId];
        
        if (!instance) {
            WXLogInfo(@"instance not found for callNativeModule:%@.%@, maybe already destroyed", moduleName, methodName);
            return nil;
        }
        
        WXModuleMethod *method = [[WXModuleMethod alloc] initWithModuleName:moduleName methodName:methodName arguments:arguments instance:instance];
        return [method invoke];
    }];
    
    [_jsBridge registerCallNativeComponent:^void(NSString *instanceId, NSString *componentRef, NSString *methodName, NSArray *args, NSDictionary *options) {
        WXSDKInstance *instance = [WXSDKManager instanceForID:instanceId];
        WXComponentMethod *method = [[WXComponentMethod alloc] initWithComponentRef:componentRef methodName:methodName arguments:args instance:instance];
        [method invoke];
    }];
}

- (NSMutableArray *)insStack
{
    if (_insStack) return _insStack;

    _insStack = [WXThreadSafeMutableArray array];
    
    return _insStack;
}

- (WXSDKInstance *)topInstance
{
    if (self.insStack.count > 0) {
        WXSDKInstance *topInstance = [WXSDKManager instanceForID:[self.insStack firstObject]];
        return topInstance;
    }
    
    return nil;
}

- (NSMutableDictionary *)sendQueue
{
    WXAssertBridgeThread();
    
    if (_sendQueue) return _sendQueue;
    
    _sendQueue = [NSMutableDictionary dictionary];
    
    return _sendQueue;
}

#pragma mark JS Bridge Management

- (NSInteger)invokeNative:(NSString *)instanceId tasks:(NSArray *)tasks callback:(NSString __unused*)callback
{
    WXAssertBridgeThread();
    
    if (!instanceId || !tasks) {
        WX_MONITOR_FAIL(WXMTNativeRender, WX_ERR_JSFUNC_PARAM, @"JS call Native params error!");
        return 0;
    }

    WXSDKInstance *instance = [WXSDKManager instanceForID:instanceId];
    if (!instance) {
        WXLogInfo(@"instance already destroyed, task ignored");
        return -1;
    }
    
    for (NSDictionary *task in tasks) {
        NSString *methodName = task[@"method"];
        NSArray *arguments = task[@"args"];
        if (task[@"component"]) {
            NSString *ref = task[@"ref"];
            WXComponentMethod *method = [[WXComponentMethod alloc] initWithComponentRef:ref methodName:methodName arguments:arguments instance:instance];
            [method invoke];
        } else {
            NSString *moduleName = task[@"module"];
            WXModuleMethod *method = [[WXModuleMethod alloc] initWithModuleName:moduleName methodName:methodName arguments:arguments instance:instance];
            [method invoke];
        }
    }
    
    [self performSelector:@selector(_sendQueueLoop) withObject:nil];
    
    return 1;
}

- (void)createInstance:(NSString *)instance
              template:(NSString *)temp
               options:(NSDictionary *)options
                  data:(id)data
{
    WXAssertBridgeThread();
    WXAssertParam(instance);
    
    if (![self.insStack containsObject:instance]) {
        if ([options[@"RENDER_IN_ORDER"] boolValue]) {
            [self.insStack addObject:instance];
        } else {
            [self.insStack insertObject:instance atIndex:0];
        }
    }
    
    //create a sendQueue bind to the current instance
    NSMutableArray *sendQueue = [NSMutableArray array];
    [self.sendQueue setValue:sendQueue forKey:instance];
    
    NSArray *args = nil;
    if (data){
        args = @[instance, temp, options ?: @{}, data];
    } else {
        args = @[instance, temp, options ?: @{}];
    }

    WX_MONITOR_INSTANCE_PERF_START(WXPTJSCreateInstance, [WXSDKManager instanceForID:instance]);
    [self callJSMethod:@"createInstance" args:args];
    WX_MONITOR_INSTANCE_PERF_END(WXPTJSCreateInstance, [WXSDKManager instanceForID:instance]);
}

- (void)destroyInstance:(NSString *)instance
{
    WXAssertBridgeThread();
    WXAssertParam(instance);
    
    //remove instance from stack
    if([self.insStack containsObject:instance]){
        [self.insStack removeObject:instance];
    }

    if(self.sendQueue[instance]){
        [self.sendQueue removeObjectForKey:instance];
    }
    
    [self callJSMethod:@"destroyInstance" args:@[instance]];
    
    if ([self.jsBridge respondsToSelector:@selector(garbageCollect)]) {
         [self.jsBridge garbageCollect];
    }
}

- (void)refreshInstance:(NSString *)instance
                   data:(id)data
{
    WXAssertBridgeThread();
    WXAssertParam(instance);
    
    [self callJSMethod:@"refreshInstance" args:@[instance, data]];
}

- (void)updateState:(NSString *)instance data:(id)data
{
    WXAssertBridgeThread();
    WXAssertParam(instance);
    
    //[self.jsBridge callJSMethod:@"updateState" args:@[instance, data]];
}

- (void)executeJsFramework:(NSString *)script
{
    WXAssertBridgeThread();
    WXAssertParam(script);
    
    WX_MONITOR_PERF_START(WXPTFrameworkExecute);
    
    [self.jsBridge executeJSFramework:script];
    
    WX_MONITOR_PERF_END(WXPTFrameworkExecute);
    
    if ([self.jsBridge exception]) {
        NSString *message = [NSString stringWithFormat:@"JSFramework executes error: %@", [self.jsBridge exception]];
        WX_MONITOR_FAIL(WXMTJSFramework, WX_ERR_JSFRAMEWORK_EXECUTE, message);
    } else {
        WX_MONITOR_SUCCESS(WXMTJSFramework);
        //the JSFramework has been load successfully.
        self.frameworkLoadFinished = YES;
        
        [self executeAllJsService];
        
        JSValue *frameworkVersion = [self.jsBridge callJSMethod:@"getJSFMVersion" args:nil];
        if (frameworkVersion && [frameworkVersion isString]) {
            [WXAppConfiguration setJSFrameworkVersion:[frameworkVersion toString]];
        }
        
        //execute methods which has been stored in methodQueue temporarily.
        for (NSDictionary *method in _methodQueue) {
            [self callJSMethod:method[@"method"] args:method[@"args"]];
        }
        
        [_methodQueue removeAllObjects];
        
        WX_MONITOR_PERF_END(WXPTInitalize);
    };
}

- (void)executeJsMethod:(WXCallJSMethod *)method
{
    WXAssertBridgeThread();
    
    if (!method.instance) {
        WXLogError(@"Instance doesn't exist!");
        return;
    }
    
    NSMutableArray *sendQueue = self.sendQueue[method.instance.instanceId];
    if (!sendQueue) {
        WXLogInfo(@"No send queue for instance:%@, may it has been destroyed so method:%@ is ignored", method.instance, method.methodName);
        return;
    }
    
    [sendQueue addObject:method];
    [self performSelector:@selector(_sendQueueLoop) withObject:nil];
}

- (void)executeAllJsService
{
    for(NSDictionary *service in _jsServiceQueue) {
        NSString *script = [service valueForKey:@"script"];
        NSString *name = [service valueForKey:@"name"];
        [self executeJsService:script withName:name];
    }
    
    [_jsServiceQueue removeAllObjects];
}

- (void)executeJsService:(NSString *)script withName:(NSString *)name
{
    if(self.frameworkLoadFinished) {
        WXAssert(script, @"param script required!");
        [self.jsBridge executeJavascript:script];
        
        if ([self.jsBridge exception]) {
            NSString *message = [NSString stringWithFormat:@"JSService executes error: %@", [self.jsBridge exception]];
            WX_MONITOR_FAIL(WXMTJSService, WX_ERR_JSFRAMEWORK_EXECUTE, message);
        } else {
            // success
        }
    }else {
        [_jsServiceQueue addObject:@{
                                     @"name": name,
                                     @"script": script
                                     }];
    }
}

- (void)registerModules:(NSDictionary *)modules
{
    WXAssertBridgeThread();
    
    if(!modules) return;
    
    [self callJSMethod:@"registerModules" args:@[modules]];
}

- (void)registerComponents:(NSArray *)components
{
    WXAssertBridgeThread();
    
    if(!components) return;
    
    [self callJSMethod:@"registerComponents" args:@[components]];
}

- (void)callJSMethod:(NSString *)method args:(NSArray *)args
{
    if (self.frameworkLoadFinished) {
        [self.jsBridge callJSMethod:method args:args];
    } else {
        [_methodQueue addObject:@{@"method":method, @"args":args}];
    }
}

- (void)resetEnvironment
{
    [_jsBridge resetEnvironment];
}

#pragma mark JS Debug Management

- (void)connectToDevToolWithUrl:(NSURL *)url
{
    id webSocketBridge = [NSClassFromString(@"WXDebugger") alloc];
    if(!webSocketBridge || ![webSocketBridge respondsToSelector:NSSelectorFromString(@"connectToURL:")]) {
        return;
    } else {
        SuppressPerformSelectorLeakWarning(
           [webSocketBridge performSelector:NSSelectorFromString(@"connectToURL:") withObject:url]
        );
    }
}

- (void)connectToWebSocket:(NSURL *)url
{
    _devToolSocketBridge = [[WXDebugLoggerBridge alloc] initWithURL:url];
}

- (void)logToWebSocket:(NSString *)flag message:(NSString *)message
{
    [_devToolSocketBridge callJSMethod:@"__logger" args:@[flag, message]];
}

#pragma mark Private Mehtods

- (void)_sendQueueLoop
{
    WXAssertBridgeThread();
    
    BOOL hasTask = NO;
    NSMutableArray *tasks = [NSMutableArray array];
    NSString *execIns = nil;
    
    for (NSString *instance in self.insStack) {
        NSMutableArray *sendQueue = self.sendQueue[instance];
        if(sendQueue.count > 0){
            hasTask = YES;
            for(WXCallJSMethod *method in sendQueue){
                [tasks addObject:[method callJSTask]];
            }
            
            [sendQueue removeAllObjects];
            execIns = instance;
            break;
        }
    }
    
    if ([tasks count] > 0 && execIns) {
        [self callJSMethod:@"callJS" args:@[execIns, tasks]];
    }
    
    if (hasTask) {
        [self performSelector:@selector(_sendQueueLoop) withObject:nil];
    }
}

@end

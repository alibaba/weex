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
#import "WXBridgeMethod.h"
#import "WXModuleFactory.h"
#import "WXModuleProtocol.h"
#import "WXUtility.h"
#import "WXSDKError.h"
#import "WXAssert.h"
#import "WXSDKManager.h"
#import "WXDebugTool.h"
#import "WXModuleManager.h"
#import "WXSDKInstance_private.h"

//#import "PDDebugger.h"

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
@property (nonatomic, strong) NSMutableArray    *insStack;
//identify if the JSFramework has been loaded
@property (nonatomic) BOOL frameworkLoadFinished;
//store some methods temporarily before JSFramework is loaded
@property (nonatomic, strong) NSMutableArray *methodQueue;

@end

@implementation WXBridgeContext

- (instancetype) init
{
    self = [super init];
    if (self) {
        _methodQueue = [NSMutableArray new];
        _frameworkLoadFinished = NO;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(jsError:) name:WX_JS_ERROR_NOTIFICATION_NAME object:nil];
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:WX_JS_ERROR_NOTIFICATION_NAME object:nil];
}

- (void)jsError:(NSNotification *)note
{
    NSString *errorMessage = @"";
    if (note.userInfo) {
        errorMessage = note.userInfo[@"message"];
    }
    
    NSURL *url;
    if (self.insStack.count > 0) {
        WXSDKInstance *topInstance = [WXSDKManager instanceForID:[self.insStack firstObject]];
        url = topInstance.scriptURL;
    }
    
    [WXSDKError monitorAlarm:NO errorCode:WX_ERR_JS_EXECUTE errorMessage:errorMessage withURL:url];
}

- (id<WXBridgeProtocol>)jsBridge
{
    WXAssertBridgeThread();
    _debugJS = [WXDebugTool isDevToolDebug];
    
    Class bridgeClass = _debugJS ? NSClassFromString(@"PDDebugger") : [WXJSCoreBridge class];
    
    if (_jsBridge && [_jsBridge isKindOfClass:bridgeClass]) {
        return _jsBridge;
    }
    
    if (_jsBridge) {
        [_methodQueue removeAllObjects];
        _frameworkLoadFinished = NO;
    }
    
    _jsBridge = _debugJS ? [NSClassFromString(@"PDDebugger") alloc] : [[WXJSCoreBridge alloc] init];
     __weak typeof(self) weakSelf = self;
    [_jsBridge registerCallNative:^(NSString *instance, NSArray *tasks, NSString *callback) {
        [weakSelf invokeNative:instance tasks:tasks callback:callback];
    }];
    
    return _jsBridge;
}

- (NSMutableArray *)insStack
{
    WXAssertBridgeThread();

    if (_insStack) return _insStack;

    _insStack = [NSMutableArray array];
    
    return _insStack;
}

- (NSMutableDictionary *)sendQueue
{
    WXAssertBridgeThread();
    
    if (_sendQueue) return _sendQueue;
    
    _sendQueue = [NSMutableDictionary dictionary];
    
    return _sendQueue;
}

#pragma mark JS Bridge Management

- (void)invokeNative:(NSString *)instance tasks:(NSArray *)tasks callback:(NSString *)callback
{
    WXAssertBridgeThread();
    
    if (!instance || !tasks) {
        [WXSDKError monitorAlarm:NO errorCode:WX_ERR_JSFUNC_PARAM msg:@"JS call Native params error !"];
        return;
    }
    [WXSDKError monitorAlarm:YES errorCode:WX_ERR_JSFUNC_PARAM msg:@""];
    
    for (NSDictionary *task in tasks) {
        WXBridgeMethod *method = [[WXBridgeMethod alloc] initWihData:task];
        method.instance = instance;
        [[WXSDKManager moduleMgr] dispatchMethod:method];
    }
    
    NSMutableArray *sendQueue = [self.sendQueue valueForKey:instance];
    if (!sendQueue) {
        WXLogError(@"No send queue for instance:%@", instance);
        return;
    }
    
    if (callback && ![callback isEqualToString:@"-1"]) {
        WXBridgeMethod *method = [self _methodWithCallback:callback];
        method.instance = instance;
        [sendQueue addObject:method];
    }
    
    [self performSelector:@selector(_sendQueueLoop) withObject:nil];
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
    
    WXSDKInstance *sdkInstance = [WXSDKManager instanceForID:instance] ;
    [WXBridgeContext _timeSince:^() {
        [self callJSMethod:@"createInstance" args:args];
        WXLogInfo(@"CreateInstance Finish...%f", -[sdkInstance.renderStartDate timeIntervalSinceNow]);
    } endBlock:^(NSTimeInterval time) {
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            sdkInstance.communicateTime = time;
        });
    }];
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
    
    __weak __typeof__(self) weakSelf = self;
    [WXBridgeContext _timeSince:^() {
        WXLogVerbose(@"JSFramework starts executing...");
        [self.jsBridge executeJSFramework:script];
        WXLogVerbose(@"JSFramework ends executing...");
        if ([self.jsBridge exception]) {
            [WXSDKError monitorAlarm:NO errorCode:WX_ERR_LOAD_JSLIB msg:@"JSFramework executes error !"];
        }
        else {
            [WXSDKError monitorAlarm:YES errorCode:WX_ERR_LOAD_JSLIB msg:@""];
            
            //the JSFramework has been load successfully.
            weakSelf.frameworkLoadFinished = YES;
            
            //execute methods which has been stored in methodQueue temporarily.
            for (NSDictionary *method in _methodQueue) {
                [self callJSMethod:method[@"method"] args:method[@"args"]];
            }
            [_methodQueue removeAllObjects];
        }
    } endBlock:^(NSTimeInterval time) {
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            JSLibInitTime = time;
        });
    }];
}

- (void)executeJsMethod:(WXBridgeMethod *)method
{
    WXAssertBridgeThread();
    
    if (!method.instance) {
        WXLogError(@"Instance doesn't exist!");
        return;
    }
    
    NSMutableArray *sendQueue = self.sendQueue[method.instance];
    if (!sendQueue) {
        WXLogInfo(@"No send queue for instance:%@, may it has been destroyed so method:%@ is ignored", method.instance, method.method);
        return;
    }
    
    [sendQueue addObject:method];
    [self performSelector:@selector(_sendQueueLoop) withObject:nil];
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
    }
    else {
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
    id webSocketBridge = [NSClassFromString(@"PDDebugger") alloc];
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

- (WXBridgeMethod *)_methodWithCallback:(NSString *)callback
{
    WXAssertBridgeThread();
    
    if (!callback) return nil;
    
    NSDictionary *method = @{@"module":@"jsBridge", @"method":@"callback", @"args":@[callback]};
    
    return [[WXBridgeMethod alloc] initWihData:method];
}

- (void)_sendQueueLoop
{
    WXAssertBridgeThread();
    
    BOOL hasTask = NO;
    NSMutableArray *methods = [NSMutableArray array];
    NSString *execIns = nil;
    
    for (NSString *instance in self.insStack) {
        NSMutableArray *sendQueue = self.sendQueue[instance];
        if(sendQueue.count > 0){
            hasTask = YES;
            for(WXBridgeMethod *method in sendQueue){
                [methods addObject:[method dataDesc]];
            }
            [sendQueue removeAllObjects];
            execIns = instance;
            break;
        }
    }
    
    if ([methods count] > 0 && execIns) {
        [self callJSMethod:@"callJS" args:@[execIns, methods]];
    }
    
    if (hasTask) {
        [self performSelector:@selector(_sendQueueLoop) withObject:nil];
    }
}

+ (void)_timeSince:(void(^)())startBlock endBlock:(void(^)(NSTimeInterval))endBlock
{
    NSDate *startDate = [NSDate new];
    startBlock();
    NSDate *endDate = [NSDate new];
    NSTimeInterval time = [endDate timeIntervalSinceDate:startDate];
    endBlock(time);
}

@end

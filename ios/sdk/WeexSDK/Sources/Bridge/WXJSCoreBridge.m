/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXJSCoreBridge.h"
#import "WXDefine.h"
#import "WXAssert.h"
#import "WXLog.h"
#import "WXUtility.h"
#import "WXSDKEngine.h"
#import "WXSDKError.h"
#import "WXMonitor.h"
#import "WXAppMonitorProtocol.h"
#import "WXHandlerFactory.h"
#import <sys/utsname.h>
#import <JavaScriptCore/JavaScriptCore.h>

@interface WXJSCoreBridge ()

@property (nonatomic, strong)  JSContext *jsContext;

@end

@implementation WXJSCoreBridge

- (instancetype)init
{
    self = [super init];
    
    if(self){
        _jsContext = [[JSContext alloc] init];
        
        __weak typeof(self) weakSelf = self;
        
        NSDictionary *data = [WXUtility getEnvironment];
        _jsContext[@"WXEnvironment"] = data;
        
        _jsContext[@"setTimeout"] = ^(JSValue* function, JSValue* timeout) {
            // this setTimeout is used by internal logic in JS framework, normal setTimeout called by users will call WXTimerModule's method;
            [weakSelf performSelector: @selector(triggerTimeout:) withObject:^() {
                [function callWithArguments:@[]];
            } afterDelay:[timeout toDouble] / 1000];
        };
    
        _jsContext[@"nativeLog"] = ^() {
            static NSDictionary *levelMap;
            static dispatch_once_t onceToken;
            dispatch_once(&onceToken, ^{
                levelMap = @{
                             @"__ERROR": @(WXLogFlagError),
                             @"__WARN": @(WXLogFlagWarning),
                             @"__LOG": @(WXLogFlagInfo),
                             @"__INFO": @(WXLogFlagInfo),
                             @"__DEBUG": @(WXLogFlagDebug),
                             @"__LOG": @(WXLogFlagLog)
                             };
            });
            
            NSMutableString *string = [NSMutableString string];
            [string appendString:@"jsLog: "];
            NSArray *args = [JSContext currentArguments];
            
            [args enumerateObjectsUsingBlock:^(JSValue *jsVal, NSUInteger idx, BOOL *stop) {
                if (idx == args.count - 1) {
                    NSNumber *flag = levelMap[[jsVal toString]];
                    if (flag) {
                        if ([flag isEqualToNumber:[NSNumber numberWithInteger:WXLogFlagWarning]]) {
                            id<WXAppMonitorProtocol> appMonitorHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXAppMonitorProtocol)];
                            if ([appMonitorHandler respondsToSelector:@selector(commitAppMonitorAlarm:monitorPoint:success:errorCode:errorMsg:arg:)]) {
                                [appMonitorHandler commitAppMonitorAlarm:[WXSDKEngine topInstance].pageName monitorPoint:@"jswarning" success:FALSE errorCode:@"99999" errorMsg:string arg:@"weex"];
                            }
                        }
                        WX_LOG([flag unsignedIntegerValue], @"%@", string);
                    } else {
                        [string appendFormat:@"%@ ", jsVal];
                        WXLogInfo(@"%@", string);
                    }
                }
                [string appendFormat:@"%@ ", jsVal ];
            }];
        };
        
        _jsContext.exceptionHandler = ^(JSContext *context, JSValue *exception){
            context.exception = exception;
            NSString *message = [NSString stringWithFormat:@"[%@:%@:%@] %@\n%@", exception[@"sourceURL"], exception[@"line"], exception[@"column"], exception, [exception[@"stack"] toObject]];
            
            WX_MONITOR_FAIL(WXMTJSBridge, WX_ERR_JS_EXECUTE, message);
        };
    }
    return self;
}

#pragma mark - WXBridgeProtocol

- (void)executeJSFramework:(NSString *)frameworkScript
{
    WXAssertParam(frameworkScript);
    [_jsContext evaluateScript:frameworkScript];
}

- (void)callJSMethod:(NSString *)method args:(NSArray *)args
{
    WXLogDebug(@"Calling JS... method:%@, args:%@", method, args);
    [[_jsContext globalObject] invokeMethod:method withArguments:args];
}

- (void)registerCallNative:(WXJSCallNative)callNative
{
    NSInteger (^callNativeBlock)(JSValue *, JSValue *, JSValue *) = ^(JSValue *instance, JSValue *tasks, JSValue *callback){
        NSString *instanceId = [instance toString];
        NSArray *tasksArray = [tasks toArray];
        NSString *callbackId = [callback toString];
        
        WXLogDebug(@"Calling native... instance:%@, tasks:%@, callback:%@", instanceId, tasksArray, callbackId);
        return callNative(instanceId, tasksArray, callbackId);
    };
    
    _jsContext[@"callNative"] = callNativeBlock;
}

- (JSValue*)exception
{
    return _jsContext.exception;
}

- (void)resetEnvironment
{
    NSDictionary *data = [WXUtility getEnvironment];
    _jsContext[@"WXEnvironment"] = data;
}

#pragma mark - Private

- (void)triggerTimeout:(void(^)())block
{
    block();
}

@end

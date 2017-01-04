/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXMonitor.h"
#import "WXSDKEngine.h"
#import "WXSDKInstance.h"
#import "WXAppMonitorProtocol.h"
#import "WXHandlerFactory.h"
#import "WXLog.h"
#import "WXUtility.h"
#import "WXComponentManager.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXAppConfiguration.h"

NSString *const kStartKey = @"start";
NSString *const kEndKey = @"end";

@implementation WXMonitor

#pragma mark - Performance Monitor

static WXThreadSafeMutableDictionary *globalPerformanceDict;

+ (void)performancePoint:(WXPerformanceTag)tag willStartWithInstance:(WXSDKInstance *)instance
{
    NSMutableDictionary *performanceDict = [self performanceDictForInstance:instance];
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:2];
    dict[kStartKey] = @(CACurrentMediaTime() * 1000);
    performanceDict[@(tag)] = dict;
}

+ (void)performancePoint:(WXPerformanceTag)tag didEndWithInstance:(WXSDKInstance *)instance
{
    NSMutableDictionary *performanceDict = [self performanceDictForInstance:instance];
    NSMutableDictionary *dict = performanceDict[@(tag)];
    if (!dict) {
        WXLogError(@"Performance point:%ld, in instance:%@, did not have a start", (unsigned long)tag, instance.instanceId);
        return;
    }
    
    if (dict[kEndKey]) {
        // not override.
        return;
    }
    
    dict[kEndKey] = @(CACurrentMediaTime() * 1000);
    
    if (tag == WXPTAllRender) {
        [self performanceFinish:instance];
    }
}

+ (void)performancePoint:(WXPerformanceTag)tag didSetValue:(double)value withInstance:(WXSDKInstance *)instance
{
    NSMutableDictionary *performanceDict = [self performanceDictForInstance:instance];
    if (performanceDict[@(tag)]) {
        return;
    }
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:2];
    dict[kStartKey] = @(0);
    dict[kEndKey] = @(value);
    performanceDict[@(tag)] = dict;
}

+ (BOOL)performancePoint:(WXPerformanceTag)tag isRecordedWithInstance:(WXSDKInstance *)instance
{
    NSMutableDictionary *performanceDict = [self performanceDictForInstance:instance];
    if (!performanceDict) {
        return NO;
    }
    
    NSMutableDictionary *dict = performanceDict[@(tag)];
    return dict && dict[kStartKey] && dict[kEndKey];
}

+ (void)performanceFinish:(WXSDKInstance *)instance
{
    NSMutableDictionary *commitDict = [NSMutableDictionary dictionaryWithCapacity:WXPTEnd+4];
    
    commitDict[BIZTYPE] = instance.bizType ?: @"";
    commitDict[PAGENAME] = instance.pageName ?: @"";
    
    commitDict[WXSDKVERSION] = WX_SDK_VERSION;
    commitDict[JSLIBVERSION] = [WXAppConfiguration JSFrameworkVersion];
    if (instance.userInfo[@"weex_bundlejs_connectionType"]) {
        commitDict[@"connectionType"] = instance.userInfo[@"weex_bundlejs_connectionType"];
    }
    if (instance.userInfo[@"weex_bundlejs_requestType"]) {
        commitDict[@"requestType"] = instance.userInfo[@"weex_bundlejs_requestType"];
    }
    if (instance.userInfo[WXCUSTOMMONITORINFO]) {
        commitDict[WXCUSTOMMONITORINFO] = instance.userInfo[WXCUSTOMMONITORINFO];
    }
    WXPerformBlockOnComponentThread(^{
        commitDict[@"componentCount"] = @([instance numberOfComponents]);
        WXPerformBlockOnMainThread(^{
    [self commitPerformanceWithDict:commitDict instance:instance];
        });
    });
}

+ (void)commitPerformanceWithDict:(NSMutableDictionary *)commitDict instance:(WXSDKInstance *)instance
{
    static NSDictionary *commitKeyDict;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        // non-standard perf commit names, remove this hopefully.
        commitKeyDict = @{
                          @(WXPTInitalize) : SDKINITTIME,
                          @(WXPTInitalizeSync) : SDKINITINVOKETIME,
                          @(WXPTFrameworkExecute) : JSLIBINITTIME,
                          @(WXPTJSDownload) : NETWORKTIME,
                          @(WXPTJSCreateInstance) : COMMUNICATETIME,
                          @(WXPTFirstScreenRender) : SCREENRENDERTIME,
                          @(WXPTAllRender) : TOTALTIME,
                          @(WXPTBundleSize) : JSTEMPLATESIZE
                          };
    });
    
    for (int tag = 0; tag < WXPTEnd; tag++) {
        NSMutableDictionary *performanceDict = tag <= WXPTFrameworkExecute ? globalPerformanceDict : instance.performanceDict;
        NSMutableDictionary *keyDict = performanceDict[@(tag)];
        if (!keyDict || ![keyDict isKindOfClass:[NSMutableDictionary class]]) {
            continue;
        }
        
        NSNumber *start = keyDict[kStartKey];
        NSNumber *end = keyDict[kEndKey];
        
        if (!start || !end) {
            WXLogWarning(@"Performance point:%d, in instance:%@, did not have a start or end", tag, instance);
            continue;
        }
        
        NSString *commitKey = commitKeyDict[@(tag)];
        commitDict[commitKey] = @([end integerValue] - [start integerValue]);
    }
    
    id<WXAppMonitorProtocol> appMonitor = [WXHandlerFactory handlerForProtocol:@protocol(WXAppMonitorProtocol)];
    if (appMonitor && [appMonitor respondsToSelector:@selector(commitAppMonitorArgs:)]){
        [appMonitor commitAppMonitorArgs:commitDict];
    }
    
    [self printPerformance:commitDict];
}

+ (NSMutableDictionary *)performanceDictForInstance:(WXSDKInstance *)instance
{
    NSMutableDictionary *performanceDict;
    if (!instance) {
        if (!globalPerformanceDict) {
            globalPerformanceDict = [WXThreadSafeMutableDictionary dictionary];
        }
        performanceDict = globalPerformanceDict;
    } else {
        performanceDict = instance.performanceDict;
    }
    
    return performanceDict;
}

+ (void)printPerformance:(NSDictionary *)commitDict
{
    if ([WXLog logLevel] < WXLogLevelLog) {
        return;
    }
    
    NSMutableString *performanceString = [NSMutableString stringWithString:@"Performance:"];
    for (NSString *commitKey in commitDict) {
        [performanceString appendFormat:@"\n    %@: %@,", commitKey, commitDict[commitKey]];
    }
    
    WXLog(@"%@", performanceString);
}

#pragma mark - Error Monitor

+ (void)monitoringPointDidSuccess:(WXMonitorTag)tag onPage:(NSString *)pageName
{
    [self monitoringPoint:tag isSuccss:YES error:nil onPage:pageName];
}

+ (void)monitoringPoint:(WXMonitorTag)tag didFailWithError:(NSError *)error onPage:(NSString *)pageName
{
    [self monitoringPoint:tag isSuccss:NO error:error onPage:pageName];
}

+ (void)monitoringPoint:(WXMonitorTag)tag isSuccss:(BOOL)success error:(NSError *)error onPage:(NSString *)pageName
{
    if (!success) {
        WXLogError(@"%@", error.localizedDescription);
    }
    
    id<WXAppMonitorProtocol> appMonitorHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXAppMonitorProtocol)];
    if ([appMonitorHandler respondsToSelector:@selector(commitAppMonitorAlarm:monitorPoint:success:errorCode:errorMsg:arg:)]) {
        NSString *errorCodeStr = [NSString stringWithFormat:@"%ld", (long)error.code];
        
        static NSDictionary *monitorNameDict;
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            monitorNameDict = @{
                                @(WXMTJSFramework) : @"jsFramework",
                                @(WXMTJSDownload) : @"jsDownload",
                                @(WXMTJSBridge) : @"jsBridge",
                                @(WXMTNativeRender) : @"domModule"
                                };
        });
        
        pageName = pageName ? : [WXSDKEngine topInstance].pageName;
        [appMonitorHandler commitAppMonitorAlarm:@"weex" monitorPoint:monitorNameDict[@(tag)] success:success errorCode:errorCodeStr errorMsg:error.localizedDescription arg:pageName];
    }
}

@end

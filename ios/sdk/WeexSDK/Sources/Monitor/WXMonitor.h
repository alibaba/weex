//
//  WXMonitor.h
//  WeexSDK
//
//  Created by yinfeng on 16/7/27.
//  Copyright © 2016年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WXDefine.h"

@class WXSDKInstance;

typedef enum : NSUInteger {
    // global
    WXPTInitalize = 0,
    WXPTInitalizeSync,
    WXPTFrameworkExecute,
    // instance
    WXPTJSDownload,
    WXPTJSCreateInstance,
    WXPTFirstScreenRender,
    WXPTAllRender,
    WXPTBundleSize,
    WXPTEnd
} WXPerformanceTag;

typedef enum : NSUInteger {
    WXMTJSFramework,
    WXMTJSDownload,
    WXMTJSBridge,
    WXMTNativeRender,
} WXMonitorTag;

#define WX_MONITOR_SUCCESS(tag) [WXMonitor monitoringPointDidSuccess:tag];
#define WX_MONITOR_FAIL(tag, errorCode, errorMessage) \
NSError *error = [NSError errorWithDomain:WX_ERROR_DOMAIN \
                                     code:errorCode \
                                 userInfo:@{NSLocalizedDescriptionKey:(errorMessage?:@"No message")}]; \
[WXMonitor monitoringPoint:tag didFailWithError:error];

#define WX_MONITOR_PERF_START(tag) [WXMonitor performancePoint:tag willStartWithInstance:nil];
#define WX_MONITOR_PERF_END(tag) [WXMonitor performancePoint:tag didEndWithInstance:nil];
#define WX_MONITOR_INSTANCE_PERF_START(tag, instance) [WXMonitor performancePoint:tag willStartWithInstance:instance];
#define WX_MONITOR_INSTANCE_PERF_END(tag, instance) [WXMonitor performancePoint:tag didEndWithInstance:instance];
#define WX_MONITOR_PERF_SET(tag, value, instance) [WXMonitor performancePoint:tag didSetValue:value withInstance:instance];

@interface WXMonitor : NSObject

+ (void)performancePoint:(WXPerformanceTag)tag willStartWithInstance:(WXSDKInstance *)instance;
+ (void)performancePoint:(WXPerformanceTag)tag didEndWithInstance:(WXSDKInstance *)instance;
+ (void)performancePoint:(WXPerformanceTag)tag didSetValue:(double)value withInstance:(WXSDKInstance *)instance;

+ (void)monitoringPointDidSuccess:(WXMonitorTag)tag;
+ (void)monitoringPoint:(WXMonitorTag)tag didFailWithError:(NSError *)error;

@end

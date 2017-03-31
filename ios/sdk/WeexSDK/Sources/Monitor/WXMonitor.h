/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXDefine.h"
#import "WXSDKError.h"

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
    WXMTJSService,
} WXMonitorTag;


#define WX_MONITOR_SUCCESS_ON_PAGE(tag, pageName) [WXMonitor monitoringPointDidSuccess:tag onPage:pageName];
#define WX_MONITOR_FAIL_ON_PAGE(tag, errorCode, errorMessage, pageName) \
NSError *error = [NSError errorWithDomain:WX_ERROR_DOMAIN \
                                     code:errorCode \
                                 userInfo:@{NSLocalizedDescriptionKey:(errorMessage?:@"No message")}]; \
[WXMonitor monitoringPoint:tag didFailWithError:error onPage:pageName];

#define WX_MONITOR_SUCCESS(tag) WX_MONITOR_SUCCESS_ON_PAGE(tag, nil)
#define WX_MONITOR_FAIL(tag, errorCode, errorMessage) WX_MONITOR_FAIL_ON_PAGE(tag, errorCode, errorMessage, nil)

#define WX_MONITOR_PERF_START(tag) [WXMonitor performancePoint:tag willStartWithInstance:nil];
#define WX_MONITOR_PERF_END(tag) [WXMonitor performancePoint:tag didEndWithInstance:nil];
#define WX_MONITOR_INSTANCE_PERF_START(tag, instance) [WXMonitor performancePoint:tag willStartWithInstance:instance];
#define WX_MONITOR_INSTANCE_PERF_END(tag, instance) [WXMonitor performancePoint:tag didEndWithInstance:instance];
#define WX_MONITOR_PERF_SET(tag, value, instance) [WXMonitor performancePoint:tag didSetValue:value withInstance:instance];
#define WX_MONITOR_INSTANCE_PERF_IS_RECORDED(tag, instance) [WXMonitor performancePoint:tag isRecordedWithInstance:instance]

@interface WXMonitor : NSObject

+ (void)performancePoint:(WXPerformanceTag)tag willStartWithInstance:(WXSDKInstance *)instance;
+ (void)performancePoint:(WXPerformanceTag)tag didEndWithInstance:(WXSDKInstance *)instance;
+ (void)performancePoint:(WXPerformanceTag)tag didSetValue:(double)value withInstance:(WXSDKInstance *)instance;
+ (BOOL)performancePoint:(WXPerformanceTag)tag isRecordedWithInstance:(WXSDKInstance *)instance;

+ (void)monitoringPointDidSuccess:(WXMonitorTag)tag onPage:(NSString *)pageName;
+ (void)monitoringPoint:(WXMonitorTag)tag didFailWithError:(NSError *)error onPage:(NSString *)pageName;

@end

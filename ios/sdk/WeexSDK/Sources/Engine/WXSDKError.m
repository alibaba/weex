/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXSDKError.h"
#import "WXAppMonitorProtocol.h"
#import "WXHandlerFactory.h"
#import "WXLog.h"

NSString * const kMonitorAlarmJsDownload = @"jsDownload";
NSString * const kMonitorAlarmJsBridge = @"jsBridge";
NSString * const kMonitorAlarmDomModule = @"domModule";

@implementation WXSDKError

+ (void)monitorAlarm:(BOOL)success errorCode:(WXSDKErrCode)errorCode msg:(NSString *)format, ... NS_FORMAT_FUNCTION(3,4)
{
    va_list args;
    va_start(args, format);
    NSString *errorMsg = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);
    
    [self monitorAlarm:success errorCode:errorCode errorMessage:errorMsg withURL:nil];
}

+ (void)monitorAlarm:(BOOL)success errorCode:(WXSDKErrCode)errorCode errorMessage:(NSString *)errorMsg withURL:(NSURL *)url
{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!success) {
            WXLogError(@"%@", errorMsg);
        }
        
        id<WXAppMonitorProtocol> appMonitorHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXAppMonitorProtocol)];
        if ([appMonitorHandler respondsToSelector:@selector(commitAppMonitorAlarm:monitorPoint:success:errorCode:errorMsg:arg:)]) {
            NSString *pointKey = nil;
            if (errorCode <= WX_ERR_JSBRIAGE_START &&
                errorCode >= WX_ERR_JSBRIAGE_END) {
                pointKey = kMonitorAlarmJsBridge;
            }
            else if (errorCode <= WX_ERROR_DOMMODULE_START &&
                     errorCode >= WX_ERROR_DOMMODULE_END) {
                pointKey = kMonitorAlarmDomModule;
            }
            else if (errorCode <= WX_ERR_JSDOWNLOAD_START &&
                     errorCode >= WX_ERR_JSDOWNLOAD_END) {
                pointKey = kMonitorAlarmJsDownload;
            }
            else {
                WXLogError(@"");
            }
            
            NSString *errorCodeStr = [NSString stringWithFormat:@"%d", errorCode];
            NSString *arg = url.absoluteString ?: @"";

            [appMonitorHandler commitAppMonitorAlarm:@"weex" monitorPoint:pointKey success:success errorCode:errorCodeStr errorMsg:errorMsg arg:arg];
        }
    });
}

@end

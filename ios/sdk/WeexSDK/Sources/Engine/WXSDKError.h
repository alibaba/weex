/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXSDkInstance.h"

extern NSString* const kMonitorAlarmJsBridge;
extern NSString* const kMonitorAlarmDomModule;

typedef NS_ENUM(int, WXSDKErrCode)
{
    WX_ERR_JSBRIAGE_START = -2001,
    WX_ERR_LOAD_JSLIB = -2002,
//    WX_ERR_OBJECT_JSON = -2008,
    WX_ERR_JSFUNC_PARAM = -2009,
    WA_ERR_INVOKE_NATIVE = -2012,
    WX_ERR_JS_EXECUTE = -2013,
    WX_ERR_JSBRIAGE_END = -2099,
    
    WX_ERROR_DOMMODULE_START = -2100,
    WX_ERR_DOM_CREATEBODY = -2100,
    WX_ERR_DOM_UPDATTR = -2101,
    WX_ERR_DOM_UPDSTYLE = -2102,
    WX_ERR_DOM_ADDELEMENT = -2103,
    WX_ERR_DOM_REMOVEELEMENT = -2104,
    WX_ERR_DOM_MOVEELEMENT = -2105,
    WX_ERR_DOM_ADDEVENT = -2106,
    WX_ERR_DOM_REMOVEEVENT = -2107,
//    WX_ERR_DOM_CREATEFINISH = -2108,
//    WX_ERR_DOM_RENDERFINISH = -2109,
    WX_ERR_DOM_SCROLLTOELEMENT = -2110,
    WX_ERROR_DOMMODULE_END = -2199,
};

@interface WXSDKError : NSObject

+ (void)monitorAlarm:(BOOL)success errorCode:(WXSDKErrCode)errorCode msg:(NSString *)format, ... NS_FORMAT_FUNCTION(3,4);

+ (void) monitorAlarm:(BOOL)success errorCode:(WXSDKErrCode)errorCode errorMessage:(NSString *)message withURL:(NSURL *)url;
@end

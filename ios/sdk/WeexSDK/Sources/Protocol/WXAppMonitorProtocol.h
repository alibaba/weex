/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXModuleProtocol.h"

#define BIZTYPE             @"bizType"
#define PAGENAME            @"pageName"
#define WXSDKVERSION        @"WXSDKVersion"
#define JSLIBVERSION        @"JSLibVersion"
#define WXREQUESTTYPE       @"requestType"
#define WXCONNECTIONTYPE    @"connectionType"
#define WXCUSTOMMONITORINFO @"customMonitorInfo"

#define SDKINITTIME         @"SDKInitTime"
#define SDKINITINVOKETIME   @"SDKInitInvokeTime"
#define JSLIBINITTIME       @"JSLibInitTime"
#define JSTEMPLATESIZE      @"JSTemplateSize"
#define NETWORKTIME         @"networkTime"
#define COMMUNICATETIME     @"communicateTime"
#define SCREENRENDERTIME    @"screenRenderTime"
#define TOTALTIME           @"totalTime"


@protocol WXAppMonitorProtocol <WXModuleProtocol>

- (void)commitAppMonitorArgs:(NSDictionary *)args;

- (void)commitAppMonitorAlarm:(NSString *)pageName monitorPoint:(NSString *)monitorPoint success:(BOOL)success errorCode:(NSString *)errorCode errorMsg:(NSString *)errorMsg arg:(NSString *)arg;

@end

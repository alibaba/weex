/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXDevToolType.h"
#import <WeexSDK/WXDebugTool.h>

static BOOL WXDebug;

@implementation WXDevToolType

+ (void)setDebug:(BOOL)isDebug {
    WXDebug = isDebug;
    [WXDebugTool setDevToolDebug:isDebug];
}

+ (BOOL)isDebug {
    return WXDebug;
}

@end

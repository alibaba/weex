/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXModuleProtocol.h"

@interface WXStreamModule : NSObject <WXModuleProtocol>

- (void)fetch:(NSDictionary *)options callback:(WXModuleCallback)callback progressCallback:(WXModuleKeepAliveCallback)progressCallback;
- (void)sendHttp:(NSDictionary*)param callback:(WXModuleCallback)callback DEPRECATED_MSG_ATTRIBUTE("Use fetch method instead.");

@end

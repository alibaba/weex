/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXModuleProtocol.h"

@interface WXStorageModule : NSObject <WXModuleProtocol>

- (void)getAllKeys:(WXModuleCallback)callback;

- (void)setItem:(NSString *)key value:(NSString *)value callback:(WXModuleCallback)callback;

- (void)getItem:(NSString *)key callback:(WXModuleCallback)callback;

- (void)removeItem:(NSString *)key callback:(WXModuleCallback)callback;

@end

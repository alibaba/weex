/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

#import "WXThreadSafeMutableDictionary.h"
#import "WXSDKInstance.h"

@interface WXRuleManager : NSObject

@property(nonatomic, weak)WXSDKInstance *instance;

+ (WXRuleManager *)sharedInstance;

- (void)addRule:(NSString *)type rule:(NSDictionary *)rule;

- (WXThreadSafeMutableDictionary *)getRule:(NSString *)type;

- (void)removeRule:(NSString *)type rule:(NSDictionary *)rule;

@end

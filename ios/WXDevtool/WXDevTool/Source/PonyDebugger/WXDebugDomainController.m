/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXDebugDomainController.h"

@implementation WXDebugDomainController
@dynamic domain;

+ (WXDebugDomainController *)defaultInstance {
    static WXDebugDomainController *defaultInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        defaultInstance = [[WXDebugDomainController alloc] init];
    });
    return defaultInstance;
}

+ (Class)domainClass {
    return [WXDebugDomain class];
}

#pragma mark - PDCommandDelegate
- (void)domain:(PDDynamicDebuggerDomain *)domain enableWithCallback:(void (^)(id error))callback {
    callback(nil);
}

- (void)domain:(PDDynamicDebuggerDomain *)domain disableWithCallback:(void (^)(id error))callback {
    
}

@end

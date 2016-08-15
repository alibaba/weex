/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXProfilerDomainController.h"

@implementation WXProfilerDomainController

+(WXProfilerDomainController *)defaultInstace {
    static WXProfilerDomainController *defaultInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        defaultInstance = [[WXProfilerDomainController alloc] init];
    });
    
    return defaultInstance;
}

@end

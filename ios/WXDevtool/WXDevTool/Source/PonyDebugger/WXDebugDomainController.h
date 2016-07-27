/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXDevtool.h"
#import "PonyDebugger.h"
#import "WXDebugDomain.h"
#import "PDDynamicDebuggerDomain.h"

@interface WXDebugDomainController : PDDomainController <PDCommandDelegate>

@property (nonatomic, strong) WXDebugDomain *domain;

+ (WXDebugDomainController *)defaultInstance;

@end

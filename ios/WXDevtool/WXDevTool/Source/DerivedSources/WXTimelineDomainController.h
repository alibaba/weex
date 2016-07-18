/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "PonyDebugger.h"
#import "PDTimelineDomain.h"

@interface WXTimelineDomainController : PDDomainController

+(WXTimelineDomainController *)defaultInstance;

@property (nonatomic, strong) PDTimelineDomain *domain;

@end

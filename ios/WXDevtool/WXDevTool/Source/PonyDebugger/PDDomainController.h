//
//  PDDomainController.h
//  PonyDebugger
//
//  Created by Mike Lewis on 2/27/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import <Foundation/Foundation.h>
#import "PDDynamicDebuggerDomain.h"

@interface PDDomainController : NSObject <PDCommandDelegate>

@property (nonatomic, readonly) BOOL enabled;
@property (nonatomic, strong) PDDynamicDebuggerDomain *domain;

+ (NSString *)domainName;

// Abstract... Override this
+ (Class)domainClass;

@end

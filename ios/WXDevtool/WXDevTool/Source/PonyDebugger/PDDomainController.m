//
//  PDDomainController.m
//  PonyDebugger
//
//  Created by Mike Lewis on 2/27/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDDomainController.h"

@interface PDDomainController ()

@property (nonatomic, readwrite) BOOL enabled;

@end

@implementation PDDomainController

@synthesize enabled = _enabled;
@synthesize domain = _domain;

+ (NSString *)domainName;
{
    return [[self domainClass] domainName];
}

+ (Class)domainClass;
{
    NSAssert(NO, @"Abstract Method");
    return Nil;
}

- (void)domain:(PDDynamicDebuggerDomain *)domain disableWithCallback:(void (^)(id error))callback;
{
    self.enabled = NO;
    callback(nil);
}

- (void)domain:(PDDynamicDebuggerDomain *)domain enableWithCallback:(void (^)(id error))callback;
{
    self.enabled = YES;
    callback(nil);
}

@end

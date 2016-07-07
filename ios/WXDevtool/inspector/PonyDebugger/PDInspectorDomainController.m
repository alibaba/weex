//
//  PDInspectorDomainController.m
//  PonyDebugger
//
//  Created by Ryan Olson on 2012-10-27.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDInspectorDomainController.h"
#import "PDInspectorDomain.h"

@implementation PDInspectorDomainController

@dynamic domain;

#pragma mark - Class Methods

+ (instancetype)defaultInstance;
{
    static PDInspectorDomainController *defaultInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        defaultInstance = [[PDInspectorDomainController alloc] init];
    });
    return defaultInstance;
}

+ (Class)domainClass;
{
    return [PDInspectorDomain class];
}

#pragma mark - PDInspectorCommandDelegate
- (void)domain:(PDInspectorDomain *)domain enableWithCallback:(void (^)(id error))callback {
    callback(nil);
}

@end

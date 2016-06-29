//
//  PDProfilerTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDProfilerTypes.h"

@implementation PDProfilerProfileHeader

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"typeId",@"typeId",
                    @"title",@"title",
                    @"uid",@"uid",
                    @"maxJSObjectId",@"maxJSObjectId",
                    nil];
    });

    return mappings;
}

@dynamic typeId;
@dynamic title;
@dynamic uid;
@dynamic maxJSObjectId;
 
@end

@implementation PDProfilerProfile

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"head",@"head",
                    @"bottomUpHead",@"bottomUpHead",
                    nil];
    });

    return mappings;
}

@dynamic head;
@dynamic bottomUpHead;
 
@end


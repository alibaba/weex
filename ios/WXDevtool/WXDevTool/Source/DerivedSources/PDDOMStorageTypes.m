//
//  PDDOMStorageTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDDOMStorageTypes.h"

@implementation PDDOMStorageEntry

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"origin",@"origin",
                    @"isLocalStorage",@"isLocalStorage",
                    @"id",@"identifier",
                    nil];
    });

    return mappings;
}

@dynamic origin;
@dynamic isLocalStorage;
@dynamic identifier;
 
@end


//
//  PDDebuggerTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDDebuggerTypes.h"

@implementation PDDebuggerLocation

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"scriptId",@"scriptId",
                    @"lineNumber",@"lineNumber",
                    @"columnNumber",@"columnNumber",
                    nil];
    });

    return mappings;
}

@dynamic scriptId;
@dynamic lineNumber;
@dynamic columnNumber;
 
@end

@implementation PDDebuggerFunctionDetails

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"location",@"location",
                    @"name",@"name",
                    @"displayName",@"displayName",
                    @"inferredName",@"inferredName",
                    @"scopeChain",@"scopeChain",
                    nil];
    });

    return mappings;
}

@dynamic location;
@dynamic name;
@dynamic displayName;
@dynamic inferredName;
@dynamic scopeChain;
 
@end

@implementation PDDebuggerCallFrame

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"callFrameId",@"callFrameId",
                    @"functionName",@"functionName",
                    @"location",@"location",
                    @"scopeChain",@"scopeChain",
                    @"this",@"this",
                    nil];
    });

    return mappings;
}

@dynamic callFrameId;
@dynamic functionName;
@dynamic location;
@dynamic scopeChain;
@dynamic this;
 
@end

@implementation PDDebuggerScope

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"type",@"type",
                    @"object",@"object",
                    nil];
    });

    return mappings;
}

@dynamic type;
@dynamic object;
 
@end


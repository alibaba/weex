//
//  PDMemoryTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDMemoryTypes.h"

@implementation PDMemoryNodeCount

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"nodeName",@"nodeName",
                    @"count",@"count",
                    nil];
    });

    return mappings;
}

@dynamic nodeName;
@dynamic count;
 
@end

@implementation PDMemoryListenerCount

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"type",@"type",
                    @"count",@"count",
                    nil];
    });

    return mappings;
}

@dynamic type;
@dynamic count;
 
@end

@implementation PDMemoryStringStatistics

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"dom",@"dom",
                    @"js",@"js",
                    @"shared",@"shared",
                    nil];
    });

    return mappings;
}

@dynamic dom;
@dynamic js;
@dynamic shared;
 
@end

@implementation PDMemoryDOMGroup

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"size",@"size",
                    @"title",@"title",
                    @"documentURI",@"documentURI",
                    @"nodeCount",@"nodeCount",
                    @"listenerCount",@"listenerCount",
                    nil];
    });

    return mappings;
}

@dynamic size;
@dynamic title;
@dynamic documentURI;
@dynamic nodeCount;
@dynamic listenerCount;
 
@end

@implementation PDMemoryMemoryBlock

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"size",@"size",
                    @"name",@"name",
                    @"children",@"children",
                    nil];
    });

    return mappings;
}

@dynamic size;
@dynamic name;
@dynamic children;
 
@end


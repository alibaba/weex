//
//  PDApplicationCacheTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDApplicationCacheTypes.h"

@implementation PDApplicationCacheApplicationCacheResource

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"url",@"url",
                    @"size",@"size",
                    @"type",@"type",
                    nil];
    });

    return mappings;
}

@dynamic url;
@dynamic size;
@dynamic type;
 
@end

@implementation PDApplicationCacheApplicationCache

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"manifestURL",@"manifestURL",
                    @"size",@"size",
                    @"creationTime",@"creationTime",
                    @"updateTime",@"updateTime",
                    @"resources",@"resources",
                    nil];
    });

    return mappings;
}

@dynamic manifestURL;
@dynamic size;
@dynamic creationTime;
@dynamic updateTime;
@dynamic resources;
 
@end

@implementation PDApplicationCacheFrameWithManifest

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"frameId",@"frameId",
                    @"manifestURL",@"manifestURL",
                    @"status",@"status",
                    nil];
    });

    return mappings;
}

@dynamic frameId;
@dynamic manifestURL;
@dynamic status;
 
@end


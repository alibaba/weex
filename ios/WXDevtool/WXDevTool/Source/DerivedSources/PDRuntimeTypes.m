//
//  PDRuntimeTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDRuntimeTypes.h"

@implementation PDRuntimeRemoteObject

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"type",@"type",
                    @"subtype",@"subtype",
                    @"className",@"classNameString",
                    @"value",@"value",
                    @"description",@"objectDescription",
                    @"objectId",@"objectId",
                    @"preview",@"preview",
                    nil];
    });

    return mappings;
}

@dynamic type;
@dynamic subtype;
@dynamic classNameString;
@dynamic value;
@dynamic objectDescription;
@dynamic objectId;
@dynamic preview;
 
@end

@implementation PDRuntimeObjectPreview

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"lossless",@"lossless",
                    @"overflow",@"overflow",
                    @"properties",@"properties",
                    nil];
    });

    return mappings;
}

@dynamic lossless;
@dynamic overflow;
@dynamic properties;
 
@end

@implementation PDRuntimePropertyPreview

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"name",@"name",
                    @"type",@"type",
                    @"value",@"value",
                    @"subtype",@"subtype",
                    nil];
    });

    return mappings;
}

@dynamic name;
@dynamic type;
@dynamic value;
@dynamic subtype;
 
@end

@implementation PDRuntimePropertyDescriptor

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"name",@"name",
                    @"value",@"value",
                    @"writable",@"writable",
                    @"get",@"get",
                    @"set",@"set",
                    @"configurable",@"configurable",
                    @"enumerable",@"enumerable",
                    @"wasThrown",@"wasThrown",
                    nil];
    });

    return mappings;
}

@dynamic name;
@dynamic value;
@dynamic writable;
@dynamic get;
@dynamic set;
@dynamic configurable;
@dynamic enumerable;
@dynamic wasThrown;
 
@end

@implementation PDRuntimeCallArgument

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"value",@"value",
                    @"objectId",@"objectId",
                    nil];
    });

    return mappings;
}

@dynamic value;
@dynamic objectId;
 
@end

@implementation PDRuntimeExecutionContextDescription

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"id",@"identifier",
                    @"isDefault",@"isDefault",
                    @"name",@"name",
                    @"frameId",@"frameId",
                    @"origin",@"origin",
                    nil];
    });

    return mappings;
}

@dynamic identifier;
//@dynamic isPageContext;
@dynamic isDefault;
@dynamic origin;
@dynamic name;
@dynamic frameId;
 
@end


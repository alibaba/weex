//
//  PDFileSystemTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDFileSystemTypes.h"

@implementation PDFileSystemEntry

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"url",@"url",
                    @"name",@"name",
                    @"isDirectory",@"isDirectory",
                    @"mimeType",@"mimeType",
                    @"resourceType",@"resourceType",
                    @"isTextFile",@"isTextFile",
                    nil];
    });

    return mappings;
}

@dynamic url;
@dynamic name;
@dynamic isDirectory;
@dynamic mimeType;
@dynamic resourceType;
@dynamic isTextFile;
 
@end

@implementation PDFileSystemMetadata

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"modificationTime",@"modificationTime",
                    @"size",@"size",
                    nil];
    });

    return mappings;
}

@dynamic modificationTime;
@dynamic size;
 
@end


//    
//  PDFileSystemTypes.h
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//
    
#import "PDObject.h"
#import "PDDebugger.h"
#import "PDDynamicDebuggerDomain.h"


// Represents a browser side file or directory.
@interface PDFileSystemEntry : PDObject

// filesystem: URL for the entry.
// Type: string
@property (nonatomic, strong) NSString *url;

// The name of the file or directory.
// Type: string
@property (nonatomic, strong) NSString *name;

// True if the entry is a directory.
// Type: boolean
@property (nonatomic, strong) NSNumber *isDirectory;

// MIME type of the entry, available for a file only.
// Type: string
@property (nonatomic, strong) NSString *mimeType;

// ResourceType of the entry, available for a file only.
@property (nonatomic, strong) NSString *resourceType;

// True if the entry is a text file.
// Type: boolean
@property (nonatomic, strong) NSNumber *isTextFile;

@end


// Represents metadata of a file or entry.
@interface PDFileSystemMetadata : PDObject

// Modification time.
// Type: number
@property (nonatomic, strong) NSNumber *modificationTime;

// File size. This field is always zero for directories.
// Type: number
@property (nonatomic, strong) NSNumber *size;

@end



//    
//  PDApplicationCacheTypes.h
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


// Detailed application cache resource information.
@interface PDApplicationCacheApplicationCacheResource : PDObject

// Resource url.
// Type: string
@property (nonatomic, strong) NSString *url;

// Resource size.
// Type: integer
@property (nonatomic, strong) NSNumber *size;

// Resource type.
// Type: string
@property (nonatomic, strong) NSString *type;

@end


// Detailed application cache information.
@interface PDApplicationCacheApplicationCache : PDObject

// Manifest URL.
// Type: string
@property (nonatomic, strong) NSString *manifestURL;

// Application cache size.
// Type: number
@property (nonatomic, strong) NSNumber *size;

// Application cache creation time.
// Type: number
@property (nonatomic, strong) NSNumber *creationTime;

// Application cache update time.
// Type: number
@property (nonatomic, strong) NSNumber *updateTime;

// Application cache resources.
// Type: array
@property (nonatomic, strong) NSArray *resources;

@end


// Frame identifier - manifest URL pair.
@interface PDApplicationCacheFrameWithManifest : PDObject

// Frame identifier.
@property (nonatomic, strong) NSString *frameId;

// Manifest URL.
// Type: string
@property (nonatomic, strong) NSString *manifestURL;

// Application cache status.
// Type: integer
@property (nonatomic, strong) NSNumber *status;

@end



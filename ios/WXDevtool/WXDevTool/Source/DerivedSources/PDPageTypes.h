//    
//  PDPageTypes.h
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


@interface PDFrameResource : PDObject

@property (nonatomic, strong) NSString *url;

@property (nonatomic, strong) NSString *type;

@property (nonatomic, strong) NSString *mimeType;

@property (nonatomic, assign) BOOL failed;

@property (nonatomic, assign) BOOL canceled;

@end

// Information about the Frame on the page.
@interface PDPageFrame : PDObject

// Frame unique identifier.
// Type: string
@property (nonatomic, strong) NSString *identifier;

// Parent frame identifier.
// Type: string
@property (nonatomic, strong) NSString *parentId;

// Identifier of the loader associated with this frame.
@property (nonatomic, strong) NSString *loaderId;

// Frame's name as specified in the tag.
// Type: string
@property (nonatomic, strong) NSString *name;

// Frame document's URL.
// Type: string
@property (nonatomic, strong) NSString *url;

// Frame document's security origin.
// Type: string
@property (nonatomic, strong) NSString *securityOrigin;

// Frame document's mimeType as determined by the browser.
// Type: string
@property (nonatomic, strong) NSString *mimeType;

@end


// Information about the Frame hierarchy along with their cached resources.
@interface PDPageFrameResourceTree : PDObject

// Frame information for this tree item.
@property (nonatomic, strong) PDPageFrame *frame;

// Child frames.
// Type: array
@property (nonatomic, strong) NSArray *childFrames;

// Information about frame resources.
// Type: array
@property (nonatomic, strong) NSArray *resources;

@end

@interface PDPageFrameResource : PDObject

@end

// Search match for resource.
@interface PDPageSearchMatch : PDObject

// Line number in resource content.
// Type: number
@property (nonatomic, strong) NSNumber *lineNumber;

// Line with match content.
// Type: string
@property (nonatomic, strong) NSString *lineContent;

@end


// Search result for resource.
@interface PDPageSearchResult : PDObject

// Resource URL.
// Type: string
@property (nonatomic, strong) NSString *url;

// Resource frame id.
@property (nonatomic, strong) NSString *frameId;

// Number of matches in the resource content.
// Type: number
@property (nonatomic, strong) NSNumber *matchesCount;

@end


// Cookie object
@interface PDPageCookie : PDObject

// Cookie name.
// Type: string
@property (nonatomic, strong) NSString *name;

// Cookie value.
// Type: string
@property (nonatomic, strong) NSString *value;

// Cookie domain.
// Type: string
@property (nonatomic, strong) NSString *domain;

// Cookie path.
// Type: string
@property (nonatomic, strong) NSString *path;

// Cookie expires.
// Type: number
@property (nonatomic, strong) NSNumber *expires;

// Cookie size.
// Type: integer
@property (nonatomic, strong) NSNumber *size;

// True if cookie is http-only.
// Type: boolean
@property (nonatomic, strong) NSNumber *httpOnly;

// True if cookie is secure.
// Type: boolean
@property (nonatomic, strong) NSNumber *secure;

// True in case of session cookie.
// Type: boolean
@property (nonatomic, strong) NSNumber *session;

@end



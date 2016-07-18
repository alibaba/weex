//    
//  PDConsoleTypes.h
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


// Console message.
@interface PDConsoleConsoleMessage : PDObject

// Message source.
// Type: string
@property (nonatomic, strong) NSString *source;

// Message severity.
// Type: string
@property (nonatomic, strong) NSString *level;

// Message text.
// Type: string
@property (nonatomic, strong) NSString *text;

// Console message type.
// Type: string
@property (nonatomic, strong) NSString *type;

// URL of the message origin.
// Type: string
@property (nonatomic, strong) NSString *url;

// Line number in the resource that generated this message.
// Type: integer
@property (nonatomic, strong) NSNumber *line;

// Repeat count for repeated messages.
// Type: integer
@property (nonatomic, strong) NSNumber *repeatCount;

// Message parameters in case of the formatted message.
// Type: array
@property (nonatomic, strong) NSArray *parameters;

// JavaScript stack trace for assertions and error messages.
@property (nonatomic, strong) NSArray *stackTrace;

// Identifier of the network request associated with this message.
@property (nonatomic, strong) NSString *networkRequestId;

@end


// Stack entry for console errors and assertions.
@interface PDConsoleCallFrame : PDObject

// JavaScript function name.
// Type: string
@property (nonatomic, strong) NSString *functionName;

// JavaScript script name or url.
// Type: string
@property (nonatomic, strong) NSString *url;

// JavaScript script line number.
// Type: integer
@property (nonatomic, strong) NSNumber *lineNumber;

// JavaScript script column number.
// Type: integer
@property (nonatomic, strong) NSNumber *columnNumber;

@end



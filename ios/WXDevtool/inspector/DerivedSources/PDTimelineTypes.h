//    
//  PDTimelineTypes.h
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


// Timeline record contains information about the recorded activity.
@interface PDTimelineTimelineEvent : PDObject

// Event type.
// Type: string
@property (nonatomic, strong) NSString *type;

// Event data.
// Type: object
@property (nonatomic, strong) NSDictionary *data;

// Nested records.
// Type: array
@property (nonatomic, strong) NSArray *children;

@end



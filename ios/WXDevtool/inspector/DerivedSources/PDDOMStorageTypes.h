//    
//  PDDOMStorageTypes.h
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


// DOM Storage entry.
@interface PDDOMStorageEntry : PDObject

// Document origin.
// Type: string
@property (nonatomic, strong) NSString *origin;

// True for local storage.
// Type: boolean
@property (nonatomic, strong) NSNumber *isLocalStorage;

// Entry id for further reference.
@property (nonatomic, strong) NSString *identifier;

@end



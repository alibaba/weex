//    
//  PDDebuggerTypes.h
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


@class PDRuntimeRemoteObject;


// Location in the source code.
@interface PDDebuggerLocation : PDObject

// Script identifier as reported in the <code>Debugger.scriptParsed</code>.
@property (nonatomic, strong) NSString *scriptId;

// Line number in the script.
// Type: integer
@property (nonatomic, strong) NSNumber *lineNumber;

// Column number in the script.
// Type: integer
@property (nonatomic, strong) NSNumber *columnNumber;

@end


// Information about the function.
@interface PDDebuggerFunctionDetails : PDObject

// Location of the function.
@property (nonatomic, strong) PDDebuggerLocation *location;

// Name of the function. Not present for anonymous functions.
// Type: string
@property (nonatomic, strong) NSString *name;

// Display name of the function(specified in 'displayName' property on the function object).
// Type: string
@property (nonatomic, strong) NSString *displayName;

// Name of the function inferred from its initial assignment.
// Type: string
@property (nonatomic, strong) NSString *inferredName;

// Scope chain for this closure.
// Type: array
@property (nonatomic, strong) NSArray *scopeChain;

@end


// JavaScript call frame. Array of call frames form the call stack.
@interface PDDebuggerCallFrame : PDObject

// Call frame identifier. This identifier is only valid while the virtual machine is paused.
@property (nonatomic, strong) NSString *callFrameId;

// Name of the JavaScript function called on this call frame.
// Type: string
@property (nonatomic, strong) NSString *functionName;

// Location in the source code.
@property (nonatomic, strong) PDDebuggerLocation *location;

// Scope chain for this call frame.
// Type: array
@property (nonatomic, strong) NSArray *scopeChain;

// <code>this</code> object for this call frame.
@property (nonatomic, strong) PDRuntimeRemoteObject *this;

@end


// Scope description.
@interface PDDebuggerScope : PDObject

// Scope type.
// Type: string
@property (nonatomic, strong) NSString *type;

// Object representing the scope. For <code>global</code> and <code>with</code> scopes it represents the actual object; for the rest of the scopes, it is artificial transient object enumerating scope variables as its properties.
@property (nonatomic, strong) PDRuntimeRemoteObject *object;

@end



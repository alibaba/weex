//    
//  PDRuntimeTypes.h
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


@class PDRuntimeObjectPreview;


// Mirror object referencing original JavaScript object.
@interface PDRuntimeRemoteObject : PDObject

// Object type.
// Type: string
@property (nonatomic, strong) NSString *type;

// Object subtype hint. Specified for <code>object</code> type values only.
// Type: string
@property (nonatomic, strong) NSString *subtype;

// Object class (constructor) name. Specified for <code>object</code> type values only.
// Type: string
@property (nonatomic, strong) NSString *classNameString;

// Remote object value (in case of primitive values or JSON values if it was requested).
// Type: any
@property (nonatomic, strong) id value;

// String representation of the object.
// Type: string
@property (nonatomic, strong) NSString *objectDescription;

// Unique object identifier (for non-primitive values).
@property (nonatomic, strong) NSString *objectId;

// Preview containsing abbreviated property values.
@property (nonatomic, strong) PDRuntimeObjectPreview *preview;

@end


// Object containing abbreviated remote object value.
@interface PDRuntimeObjectPreview : PDObject

// Determines whether preview is lossless (contains all information of the original object).
// Type: boolean
@property (nonatomic, strong) NSNumber *lossless;

// True iff some of the properties of the original did not fit.
// Type: boolean
@property (nonatomic, strong) NSNumber *overflow;

// List of the properties.
// Type: array
@property (nonatomic, strong) NSArray *properties;

@end


@interface PDRuntimePropertyPreview : PDObject

// Property name.
// Type: string
@property (nonatomic, strong) NSString *name;

// Object type.
// Type: string
@property (nonatomic, strong) NSString *type;

// User-friendly property value string.
// Type: string
@property (nonatomic, strong) NSString *value;

// Object subtype hint. Specified for <code>object</code> type values only.
// Type: string
@property (nonatomic, strong) NSString *subtype;

@end


// Object property descriptor.
@interface PDRuntimePropertyDescriptor : PDObject

// Property name.
// Type: string
@property (nonatomic, strong) NSString *name;

// The value associated with the property.
@property (nonatomic, strong) PDRuntimeRemoteObject *value;

// True if the value associated with the property may be changed (data descriptors only).
// Type: boolean
@property (nonatomic, strong) NSNumber *writable;

// A function which serves as a getter for the property, or <code>undefined</code> if there is no getter (accessor descriptors only).
@property (nonatomic, strong) PDRuntimeRemoteObject *get;

// A function which serves as a setter for the property, or <code>undefined</code> if there is no setter (accessor descriptors only).
@property (nonatomic, strong) PDRuntimeRemoteObject *set;

// True if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
// Type: boolean
@property (nonatomic, strong) NSNumber *configurable;

// True if this property shows up during enumeration of the properties on the corresponding object.
// Type: boolean
@property (nonatomic, strong) NSNumber *enumerable;

// True if the result was thrown during the evaluation.
// Type: boolean
@property (nonatomic, strong) NSNumber *wasThrown;

@end


// Represents function call argument. Either remote object id <code>objectId</code> or primitive <code>value</code> or neither of (for undefined) them should be specified.
@interface PDRuntimeCallArgument : PDObject

// Primitive value.
// Type: any
@property (nonatomic, strong) id value;

// Remote object handle.
@property (nonatomic, strong) NSString *objectId;

@end


// Description of an isolated world.
@interface PDRuntimeExecutionContextDescription : PDObject

// Unique id of the execution context. It can be used to specify in which execution context script evaluation should be performed.
@property (nonatomic, strong) NSNumber *identifier;

// True if this is a context where inpspected web page scripts run. False if it is a content script isolated context.
// Type: boolean
//@property (nonatomic, strong) NSNumber *isPageContext;

@property (nonatomic, strong) NSNumber *isDefault;

@property (nonatomic, strong) NSString *origin;


// Human readable name describing given context.
// Type: string
@property (nonatomic, strong) NSString *name;

// Id of the owning frame.
@property (nonatomic, strong) NSString *frameId;

@end



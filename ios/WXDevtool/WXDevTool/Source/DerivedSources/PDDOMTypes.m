//
//  PDDOMTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDDOMTypes.h"

@implementation PDDOMNode

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"nodeId",@"nodeId",
                    @"nodeType",@"nodeType",
                    @"nodeName",@"nodeName",
                    @"localName",@"localName",
                    @"nodeValue",@"nodeValue",
                    @"childNodeCount",@"childNodeCount",
                    @"children",@"children",
                    @"attributes",@"attributes",
                    @"documentURL",@"documentURL",
                    @"publicId",@"publicId",
                    @"systemId",@"systemId",
                    @"internalSubset",@"internalSubset",
                    @"xmlVersion",@"xmlVersion",
                    @"name",@"name",
                    @"value",@"value",
                    @"contentDocument",@"contentDocument",
                    @"shadowRoots",@"shadowRoots",
                    nil];
    });

    return mappings;
}

@dynamic nodeId;
@dynamic nodeType;
@dynamic nodeName;
@dynamic localName;
@dynamic nodeValue;
@dynamic childNodeCount;
@dynamic children;
@dynamic attributes;
@dynamic documentURL;
@dynamic publicId;
@dynamic systemId;
@dynamic internalSubset;
@dynamic xmlVersion;
@dynamic name;
@dynamic value;
@dynamic contentDocument;
@dynamic shadowRoots;
 
@end

@implementation PDDOMEventListener

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"type",@"type",
                    @"useCapture",@"useCapture",
                    @"isAttribute",@"isAttribute",
                    @"nodeId",@"nodeId",
                    @"handlerBody",@"handlerBody",
                    @"location",@"location",
                    nil];
    });

    return mappings;
}

@dynamic type;
@dynamic useCapture;
@dynamic isAttribute;
@dynamic nodeId;
@dynamic handlerBody;
@dynamic location;
 
@end

@implementation PDDOMRGBA

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"r",@"r",
                    @"g",@"g",
                    @"b",@"b",
                    @"a",@"a",
                    nil];
    });

    return mappings;
}

@dynamic r;
@dynamic g;
@dynamic b;
@dynamic a;
 
@end

@implementation PDDOMHighlightConfig

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"showInfo",@"showInfo",
                    @"contentColor",@"contentColor",
                    @"paddingColor",@"paddingColor",
                    @"borderColor",@"borderColor",
                    @"marginColor",@"marginColor",
                    nil];
    });

    return mappings;
}

@dynamic showInfo;
@dynamic contentColor;
@dynamic paddingColor;
@dynamic borderColor;
@dynamic marginColor;
 
@end


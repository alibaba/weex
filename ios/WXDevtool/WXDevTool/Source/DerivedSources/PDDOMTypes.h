//    
//  PDDOMTypes.h
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


@class PDDebuggerLocation;


// DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes. DOMNode is a base node mirror type.
@interface PDDOMNode : PDObject

// Node identifier that is passed into the rest of the DOM messages as the <code>nodeId</code>. Backend will only push node with given <code>id</code> once. It is aware of all requested nodes and will only fire DOM events for nodes known to the client.
@property (nonatomic, strong) NSNumber *nodeId;

// <code>Node</code>'s nodeType.
// Type: integer
@property (nonatomic, strong) NSNumber *nodeType;

// <code>Node</code>'s nodeName.
// Type: string
@property (nonatomic, strong) NSString *nodeName;

// <code>Node</code>'s localName.
// Type: string
@property (nonatomic, strong) NSString *localName;

// <code>Node</code>'s nodeValue.
// Type: string
@property (nonatomic, strong) NSString *nodeValue;

// Child count for <code>Container</code> nodes.
// Type: integer
@property (nonatomic, strong) NSNumber *childNodeCount;

// Child nodes of this node when requested with children.
// Type: array
@property (nonatomic, strong) NSArray *children;

// Attributes of the <code>Element</code> node in the form of flat array <code>[name1, value1, name2, value2]</code>.
// Type: array
@property (nonatomic, strong) NSArray *attributes;

// Document URL that <code>Document</code> or <code>FrameOwner</code> node points to.
// Type: string
@property (nonatomic, strong) NSString *documentURL;

// <code>DocumentType</code>'s publicId.
// Type: string
@property (nonatomic, strong) NSString *publicId;

// <code>DocumentType</code>'s systemId.
// Type: string
@property (nonatomic, strong) NSString *systemId;

// <code>DocumentType</code>'s internalSubset.
// Type: string
@property (nonatomic, strong) NSString *internalSubset;

// <code>Document</code>'s XML version in case of XML documents.
// Type: string
@property (nonatomic, strong) NSString *xmlVersion;

// <code>Attr</code>'s name.
// Type: string
@property (nonatomic, strong) NSString *name;

// <code>Attr</code>'s value.
// Type: string
@property (nonatomic, strong) NSString *value;

// Content document for frame owner elements.
@property (nonatomic, strong) PDDOMNode *contentDocument;

// Shadow root list for given element host.
// Type: array
@property (nonatomic, strong) NSArray *shadowRoots;

@end


// DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes. DOMNode is a base node mirror type.
@interface PDDOMEventListener : PDObject

// <code>EventListener</code>'s type.
// Type: string
@property (nonatomic, strong) NSString *type;

// <code>EventListener</code>'s useCapture.
// Type: boolean
@property (nonatomic, strong) NSNumber *useCapture;

// <code>EventListener</code>'s isAttribute.
// Type: boolean
@property (nonatomic, strong) NSNumber *isAttribute;

// Target <code>DOMNode</code> id.
@property (nonatomic, strong) NSNumber *nodeId;

// Event handler function body.
// Type: string
@property (nonatomic, strong) NSString *handlerBody;

// Handler code location.
@property (nonatomic, strong) PDDebuggerLocation *location;

@end


// A structure holding an RGBA color.
@interface PDDOMRGBA : PDObject

// The red component, in the [0-255] range.
// Type: integer
@property (nonatomic, strong) NSNumber *r;

// The green component, in the [0-255] range.
// Type: integer
@property (nonatomic, strong) NSNumber *g;

// The blue component, in the [0-255] range.
// Type: integer
@property (nonatomic, strong) NSNumber *b;

// The alpha component, in the [0-1] range (default: 1).
// Type: number
@property (nonatomic, strong) NSNumber *a;

@end


// Configuration data for the highlighting of page elements.
@interface PDDOMHighlightConfig : PDObject

// Whether the node info tooltip should be shown (default: false).
// Type: boolean
@property (nonatomic, strong) NSNumber *showInfo;

// The content box highlight fill color (default: transparent).
@property (nonatomic, strong) PDDOMRGBA *contentColor;

// The padding highlight fill color (default: transparent).
@property (nonatomic, strong) PDDOMRGBA *paddingColor;

// The border highlight fill color (default: transparent).
@property (nonatomic, strong) PDDOMRGBA *borderColor;

// The margin highlight fill color (default: transparent).
@property (nonatomic, strong) PDDOMRGBA *marginColor;

@end



//
//  PDDOMDebuggerDomain.h
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


@protocol PDDOMDebuggerCommandDelegate;

// DOM debugging allows setting breakpoints on particular DOM operations and events. JavaScript execution will stop on these operations as if there was a regular breakpoint set.
@interface PDDOMDebuggerDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDDOMDebuggerCommandDelegate, PDCommandDelegate> delegate;

@end

@protocol PDDOMDebuggerCommandDelegate <PDCommandDelegate>
@optional

// Sets breakpoint on particular operation with DOM.
// Param nodeId: Identifier of the node to set breakpoint on.
// Param type: Type of the operation to stop upon.
- (void)domain:(PDDOMDebuggerDomain *)domain setDOMBreakpointWithNodeId:(NSNumber *)nodeId type:(NSString *)type callback:(void (^)(id error))callback;

// Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>.
// Param nodeId: Identifier of the node to remove breakpoint from.
// Param type: Type of the breakpoint to remove.
- (void)domain:(PDDOMDebuggerDomain *)domain removeDOMBreakpointWithNodeId:(NSNumber *)nodeId type:(NSString *)type callback:(void (^)(id error))callback;

// Sets breakpoint on particular DOM event.
// Param eventName: DOM Event name to stop on (any DOM event will do).
- (void)domain:(PDDOMDebuggerDomain *)domain setEventListenerBreakpointWithEventName:(NSString *)eventName callback:(void (^)(id error))callback;

// Removes breakpoint on particular DOM event.
// Param eventName: Event name.
- (void)domain:(PDDOMDebuggerDomain *)domain removeEventListenerBreakpointWithEventName:(NSString *)eventName callback:(void (^)(id error))callback;

// Sets breakpoint on particular native event.
// Param eventName: Instrumentation name to stop on.
- (void)domain:(PDDOMDebuggerDomain *)domain setInstrumentationBreakpointWithEventName:(NSString *)eventName callback:(void (^)(id error))callback;

// Sets breakpoint on particular native event.
// Param eventName: Instrumentation name to stop on.
- (void)domain:(PDDOMDebuggerDomain *)domain removeInstrumentationBreakpointWithEventName:(NSString *)eventName callback:(void (^)(id error))callback;

// Sets breakpoint on XMLHttpRequest.
// Param url: Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
- (void)domain:(PDDOMDebuggerDomain *)domain setXHRBreakpointWithUrl:(NSString *)url callback:(void (^)(id error))callback;

// Removes breakpoint from XMLHttpRequest.
// Param url: Resource URL substring.
- (void)domain:(PDDOMDebuggerDomain *)domain removeXHRBreakpointWithUrl:(NSString *)url callback:(void (^)(id error))callback;

@end

@interface PDDebugger (PDDOMDebuggerDomain)

@property (nonatomic, readonly, strong) PDDOMDebuggerDomain *DOMDebuggerDomain;

@end

//    
//  PDNetworkTypes.h
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


// Timing information for the request.
@interface PDNetworkResourceTiming : PDObject

// Timing's requestTime is a baseline in seconds, while the other numbers are ticks in milliseconds relatively to this requestTime.
// Type: number
@property (nonatomic, strong) NSNumber *requestTime;

// Started resolving proxy.
// Type: number
@property (nonatomic, strong) NSNumber *proxyStart;

// Finished resolving proxy.
// Type: number
@property (nonatomic, strong) NSNumber *proxyEnd;

// Started DNS address resolve.
// Type: number
@property (nonatomic, strong) NSNumber *dnsStart;

// Finished DNS address resolve.
// Type: number
@property (nonatomic, strong) NSNumber *dnsEnd;

// Started connecting to the remote host.
// Type: number
@property (nonatomic, strong) NSNumber *connectStart;

// Connected to the remote host.
// Type: number
@property (nonatomic, strong) NSNumber *connectEnd;

// Started SSL handshake.
// Type: number
@property (nonatomic, strong) NSNumber *sslStart;

// Finished SSL handshake.
// Type: number
@property (nonatomic, strong) NSNumber *sslEnd;

// Started sending request.
// Type: number
@property (nonatomic, strong) NSNumber *sendStart;

// Finished sending request.
// Type: number
@property (nonatomic, strong) NSNumber *sendEnd;

// Finished receiving response headers.
// Type: number
@property (nonatomic, strong) NSNumber *receiveHeadersEnd;

@end


// HTTP request data.
@interface PDNetworkRequest : PDObject

// Request URL.
// Type: string
@property (nonatomic, strong) NSString *url;

// HTTP request method.
// Type: string
@property (nonatomic, strong) NSString *method;

// HTTP request headers.
@property (nonatomic, strong) NSDictionary *headers;

// HTTP POST request data.
// Type: string
@property (nonatomic, strong) NSString *postData;

@end


// HTTP response data.
@interface PDNetworkResponse : PDObject

// Response URL.
// Type: string
@property (nonatomic, strong) NSString *url;

// HTTP response status code.
// Type: number
@property (nonatomic, strong) NSNumber *status;

// HTTP response status text.
// Type: string
@property (nonatomic, strong) NSString *statusText;

// HTTP response headers.
@property (nonatomic, strong) NSDictionary *headers;

// HTTP response headers text.
// Type: string
@property (nonatomic, strong) NSString *headersText;

// Resource mimeType as determined by the browser.
// Type: string
@property (nonatomic, strong) NSString *mimeType;

// Refined HTTP request headers that were actually transmitted over the network.
@property (nonatomic, strong) NSDictionary *requestHeaders;

// HTTP request headers text.
// Type: string
@property (nonatomic, strong) NSString *requestHeadersText;

// Specifies whether physical connection was actually reused for this request.
// Type: boolean
@property (nonatomic, strong) NSNumber *connectionReused;

// Physical connection id that was actually used for this request.
// Type: number
@property (nonatomic, strong) NSNumber *connectionId;

// Specifies that the request was served from the disk cache.
// Type: boolean
@property (nonatomic, strong) NSNumber *fromDiskCache;

// Timing information for the given request.
@property (nonatomic, strong) PDNetworkResourceTiming *timing;

@end


// WebSocket request data.
@interface PDNetworkWebSocketRequest : PDObject

// HTTP response status text.
// Type: string
@property (nonatomic, strong) NSString *requestKey3;

// HTTP response headers.
@property (nonatomic, strong) NSDictionary *headers;

@end


// WebSocket response data.
@interface PDNetworkWebSocketResponse : PDObject

// HTTP response status code.
// Type: number
@property (nonatomic, strong) NSNumber *status;

// HTTP response status text.
// Type: string
@property (nonatomic, strong) NSString *statusText;

// HTTP response headers.
@property (nonatomic, strong) NSDictionary *headers;

// Challenge response.
// Type: string
@property (nonatomic, strong) NSString *challengeResponse;

@end


// WebSocket frame data.
@interface PDNetworkWebSocketFrame : PDObject

// WebSocket frame opcode.
// Type: number
@property (nonatomic, strong) NSNumber *opcode;

// WebSocke frame mask.
// Type: boolean
@property (nonatomic, strong) NSNumber *mask;

// WebSocke frame payload data.
// Type: string
@property (nonatomic, strong) NSString *payloadData;

@end


// Information about the cached resource.
@interface PDNetworkCachedResource : PDObject

// Resource URL.
// Type: string
@property (nonatomic, strong) NSString *url;

// Type of this resource.
@property (nonatomic, strong) NSString *type;

// Cached response data.
@property (nonatomic, strong) PDNetworkResponse *response;

// Cached response body size.
// Type: number
@property (nonatomic, strong) NSNumber *bodySize;

@end


// Information about the request initiator.
@interface PDNetworkInitiator : PDObject

// Type of this initiator.
// Type: string
@property (nonatomic, strong) NSString *type;

// Initiator JavaScript stack trace, set for Script only.
@property (nonatomic, strong) NSArray *stackTrace;

// Initiator URL, set for Parser type only.
// Type: string
@property (nonatomic, strong) NSString *url;

// Initiator line number, set for Parser type only.
// Type: number
@property (nonatomic, strong) NSNumber *lineNumber;

@end



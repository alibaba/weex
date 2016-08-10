//
//  PDNetworkTypes.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDNetworkTypes.h"

@implementation PDNetworkResourceTiming

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"requestTime",@"requestTime",
                    @"proxyStart",@"proxyStart",
                    @"proxyEnd",@"proxyEnd",
                    @"dnsStart",@"dnsStart",
                    @"dnsEnd",@"dnsEnd",
                    @"connectStart",@"connectStart",
                    @"connectEnd",@"connectEnd",
                    @"sslStart",@"sslStart",
                    @"sslEnd",@"sslEnd",
                    @"sendStart",@"sendStart",
                    @"sendEnd",@"sendEnd",
                    @"receiveHeadersEnd",@"receiveHeadersEnd",
                    nil];
    });

    return mappings;
}

@dynamic requestTime;
@dynamic proxyStart;
@dynamic proxyEnd;
@dynamic dnsStart;
@dynamic dnsEnd;
@dynamic connectStart;
@dynamic connectEnd;
@dynamic sslStart;
@dynamic sslEnd;
@dynamic sendStart;
@dynamic sendEnd;
@dynamic receiveHeadersEnd;
 
@end

@implementation PDNetworkRequest

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"url",@"url",
                    @"method",@"method",
                    @"headers",@"headers",
                    @"postData",@"postData",
                    nil];
    });

    return mappings;
}

@dynamic url;
@dynamic method;
@dynamic headers;
@dynamic postData;
 
@end

@implementation PDNetworkResponse

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"url",@"url",
                    @"status",@"status",
                    @"statusText",@"statusText",
                    @"headers",@"headers",
                    @"headersText",@"headersText",
                    @"mimeType",@"mimeType",
                    @"requestHeaders",@"requestHeaders",
                    @"requestHeadersText",@"requestHeadersText",
                    @"connectionReused",@"connectionReused",
                    @"connectionId",@"connectionId",
                    @"fromDiskCache",@"fromDiskCache",
                    @"timing",@"timing",
                    nil];
    });

    return mappings;
}

@dynamic url;
@dynamic status;
@dynamic statusText;
@dynamic headers;
@dynamic headersText;
@dynamic mimeType;
@dynamic requestHeaders;
@dynamic requestHeadersText;
@dynamic connectionReused;
@dynamic connectionId;
@dynamic fromDiskCache;
@dynamic timing;
 
@end

@implementation PDNetworkWebSocketRequest

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"requestKey3",@"requestKey3",
                    @"headers",@"headers",
                    nil];
    });

    return mappings;
}

@dynamic requestKey3;
@dynamic headers;
 
@end

@implementation PDNetworkWebSocketResponse

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"status",@"status",
                    @"statusText",@"statusText",
                    @"headers",@"headers",
                    @"challengeResponse",@"challengeResponse",
                    nil];
    });

    return mappings;
}

@dynamic status;
@dynamic statusText;
@dynamic headers;
@dynamic challengeResponse;
 
@end

@implementation PDNetworkWebSocketFrame

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"opcode",@"opcode",
                    @"mask",@"mask",
                    @"payloadData",@"payloadData",
                    nil];
    });

    return mappings;
}

@dynamic opcode;
@dynamic mask;
@dynamic payloadData;
 
@end

@implementation PDNetworkCachedResource

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"url",@"url",
                    @"type",@"type",
                    @"response",@"response",
                    @"bodySize",@"bodySize",
                    nil];
    });

    return mappings;
}

@dynamic url;
@dynamic type;
@dynamic response;
@dynamic bodySize;
 
@end

@implementation PDNetworkInitiator

+ (NSDictionary *)keysToEncode;
{
    static NSDictionary *mappings = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        mappings = [[NSDictionary alloc] initWithObjectsAndKeys:
                    @"type",@"type",
                    @"stackTrace",@"stackTrace",
                    @"url",@"url",
                    @"lineNumber",@"lineNumber",
                    nil];
    });

    return mappings;
}

@dynamic type;
@dynamic stackTrace;
@dynamic url;
@dynamic lineNumber;
 
@end


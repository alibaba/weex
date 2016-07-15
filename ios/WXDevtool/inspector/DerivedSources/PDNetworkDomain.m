//
//  PDNetworkDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDNetworkDomain.h"
#import "PDObject.h"
#import "PDNetworkTypes.h"
#import "WXSourceDebuggerDomainController.h"


@interface PDNetworkDomain ()
//Commands

@end

@implementation PDNetworkDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"Network";
}

// Events

// Fired when page is about to send HTTP request.
- (void)requestWillBeSentWithRequestId:(NSString *)requestId frameId:(NSString *)frameId loaderId:(NSString *)loaderId documentURL:(NSString *)documentURL request:(PDNetworkRequest *)request timestamp:(NSNumber *)timestamp initiator:(PDNetworkInitiator *)initiator redirectResponse:(PDNetworkResponse *)redirectResponse;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:8];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (frameId != nil) {
        [params setObject:[frameId PD_JSONObject] forKey:@"frameId"];
    }
    if (loaderId != nil) {
        [params setObject:[loaderId PD_JSONObject] forKey:@"loaderId"];
    }
    if (documentURL != nil) {
        [params setObject:[documentURL PD_JSONObject] forKey:@"documentURL"];
    }
    if (request != nil) {
        [params setObject:[request PD_JSONObject] forKey:@"request"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (initiator != nil) {
        [params setObject:[initiator PD_JSONObject] forKey:@"initiator"];
    }
    if (redirectResponse != nil) {
        [params setObject:[redirectResponse PD_JSONObject] forKey:@"redirectResponse"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.requestWillBeSent" parameters:params];
}

// Fired if request ended up loading from cache.
- (void)requestServedFromCacheWithRequestId:(NSString *)requestId;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.requestServedFromCache" parameters:params];
}

// Fired when HTTP response is available.
- (void)responseReceivedWithRequestId:(NSString *)requestId frameId:(NSString *)frameId loaderId:(NSString *)loaderId timestamp:(NSNumber *)timestamp type:(NSString *)type response:(PDNetworkResponse *)response;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:6];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (frameId != nil) {
        [params setObject:[frameId PD_JSONObject] forKey:@"frameId"];
    }
    if (loaderId != nil) {
        [params setObject:[loaderId PD_JSONObject] forKey:@"loaderId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (type != nil) {
        [params setObject:[type PD_JSONObject] forKey:@"type"];
    }
    if (response != nil) {
        [params setObject:[response PD_JSONObject] forKey:@"response"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.responseReceived" parameters:params];
    
    [[WXSourceDebuggerDomainController defaultInstance] getScriptSourceTreeWithId:requestId url:response.url isContentScript:[NSNumber numberWithBool:NO] sourceMapURL:@""];
}

// Fired when data chunk was received over the network.
- (void)dataReceivedWithRequestId:(NSString *)requestId timestamp:(NSNumber *)timestamp dataLength:(NSNumber *)dataLength encodedDataLength:(NSNumber *)encodedDataLength;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:4];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (dataLength != nil) {
        [params setObject:[dataLength PD_JSONObject] forKey:@"dataLength"];
    }
    if (encodedDataLength != nil) {
        [params setObject:[encodedDataLength PD_JSONObject] forKey:@"encodedDataLength"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.dataReceived" parameters:params];
}

// Fired when HTTP request has finished loading.
- (void)loadingFinishedWithRequestId:(NSString *)requestId timestamp:(NSNumber *)timestamp;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.loadingFinished" parameters:params];
}

// Fired when HTTP request has failed to load.
- (void)loadingFailedWithRequestId:(NSString *)requestId timestamp:(NSNumber *)timestamp errorText:(NSString *)errorText canceled:(NSNumber *)canceled;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:4];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (errorText != nil) {
        [params setObject:[errorText PD_JSONObject] forKey:@"errorText"];
    }
    if (canceled != nil) {
        [params setObject:[canceled PD_JSONObject] forKey:@"canceled"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.loadingFailed" parameters:params];
}

// Fired when HTTP request has been served from memory cache.
- (void)requestServedFromMemoryCacheWithRequestId:(NSString *)requestId frameId:(NSString *)frameId loaderId:(NSString *)loaderId documentURL:(NSString *)documentURL timestamp:(NSNumber *)timestamp initiator:(PDNetworkInitiator *)initiator resource:(PDNetworkCachedResource *)resource;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:7];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (frameId != nil) {
        [params setObject:[frameId PD_JSONObject] forKey:@"frameId"];
    }
    if (loaderId != nil) {
        [params setObject:[loaderId PD_JSONObject] forKey:@"loaderId"];
    }
    if (documentURL != nil) {
        [params setObject:[documentURL PD_JSONObject] forKey:@"documentURL"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (initiator != nil) {
        [params setObject:[initiator PD_JSONObject] forKey:@"initiator"];
    }
    if (resource != nil) {
        [params setObject:[resource PD_JSONObject] forKey:@"resource"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.requestServedFromMemoryCache" parameters:params];
}

// Fired when WebSocket is about to initiate handshake.
- (void)webSocketWillSendHandshakeRequestWithRequestId:(NSString *)requestId timestamp:(NSNumber *)timestamp request:(PDNetworkWebSocketRequest *)request;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (request != nil) {
        [params setObject:[request PD_JSONObject] forKey:@"request"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.webSocketWillSendHandshakeRequest" parameters:params];
}

// Fired when WebSocket handshake response becomes available.
- (void)webSocketHandshakeResponseReceivedWithRequestId:(NSString *)requestId timestamp:(NSNumber *)timestamp response:(PDNetworkWebSocketResponse *)response;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (response != nil) {
        [params setObject:[response PD_JSONObject] forKey:@"response"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.webSocketHandshakeResponseReceived" parameters:params];
}

// Fired upon WebSocket creation.
- (void)webSocketCreatedWithRequestId:(NSString *)requestId url:(NSString *)url;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (url != nil) {
        [params setObject:[url PD_JSONObject] forKey:@"url"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.webSocketCreated" parameters:params];
}

// Fired when WebSocket is closed.
- (void)webSocketClosedWithRequestId:(NSString *)requestId timestamp:(NSNumber *)timestamp;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.webSocketClosed" parameters:params];
}

// Fired when WebSocket frame is received.
- (void)webSocketFrameReceivedWithRequestId:(NSString *)requestId timestamp:(NSNumber *)timestamp response:(PDNetworkWebSocketFrame *)response;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (response != nil) {
        [params setObject:[response PD_JSONObject] forKey:@"response"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.webSocketFrameReceived" parameters:params];
}

// Fired when WebSocket frame error occurs.
- (void)webSocketFrameErrorWithRequestId:(NSString *)requestId timestamp:(NSNumber *)timestamp errorMessage:(NSString *)errorMessage;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (errorMessage != nil) {
        [params setObject:[errorMessage PD_JSONObject] forKey:@"errorMessage"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.webSocketFrameError" parameters:params];
}

// Fired when WebSocket frame is sent.
- (void)webSocketFrameSentWithRequestId:(NSString *)requestId timestamp:(NSNumber *)timestamp response:(PDNetworkWebSocketFrame *)response;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (timestamp != nil) {
        [params setObject:[timestamp PD_JSONObject] forKey:@"timestamp"];
    }
    if (response != nil) {
        [params setObject:[response PD_JSONObject] forKey:@"response"];
    }
    
    [self.debuggingServer sendEventWithName:@"Network.webSocketFrameSent" parameters:params];
}



- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
{
    if ([methodName isEqualToString:@"enable"] && [self.delegate respondsToSelector:@selector(domain:enableWithCallback:)]) {
        [self.delegate domain:self enableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    }
    else if ([methodName isEqualToString:@"disable"] && [self.delegate respondsToSelector:@selector(domain:disableWithCallback:)]) {
        [self.delegate domain:self disableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    }
    else if ([methodName isEqualToString:@"setUserAgentOverride"] && [self.delegate respondsToSelector:@selector(domain:setUserAgentOverrideWithUserAgent:callback:)]) {
        [self.delegate domain:self setUserAgentOverrideWithUserAgent:[params objectForKey:@"userAgent"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    }
    else if ([methodName isEqualToString:@"setExtraHTTPHeaders"] && [self.delegate respondsToSelector:@selector(domain:setExtraHTTPHeadersWithHeaders:callback:)]) {
        [self.delegate domain:self setExtraHTTPHeadersWithHeaders:[params objectForKey:@"headers"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    }
    else if ([methodName isEqualToString:@"getResponseBody"] && [self.delegate respondsToSelector:@selector(domain:getResponseBodyWithRequestId:callback:)]) {
        [self.delegate domain:self getResponseBodyWithRequestId:[params objectForKey:@"requestId"] callback:^(NSString *body, NSNumber *base64Encoded, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (body != nil) {
                [params setObject:body forKey:@"body"];
            }
            if (base64Encoded != nil) {
                [params setObject:base64Encoded forKey:@"base64Encoded"];
            }

            responseCallback(params, error);
        }];
    }
    else if ([methodName isEqualToString:@"canClearBrowserCache"] && [self.delegate respondsToSelector:@selector(domain:canClearBrowserCacheWithCallback:)]) {
        [self.delegate domain:self canClearBrowserCacheWithCallback:^(NSNumber *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    }
    else if ([methodName isEqualToString:@"clearBrowserCache"] && [self.delegate respondsToSelector:@selector(domain:clearBrowserCacheWithCallback:)]) {
        [self.delegate domain:self clearBrowserCacheWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    }
    else if ([methodName isEqualToString:@"canClearBrowserCookies"] && [self.delegate respondsToSelector:@selector(domain:canClearBrowserCookiesWithCallback:)]) {
        [self.delegate domain:self canClearBrowserCookiesWithCallback:^(NSNumber *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    }
    else if ([methodName isEqualToString:@"clearBrowserCookies"] && [self.delegate respondsToSelector:@selector(domain:clearBrowserCookiesWithCallback:)]) {
        [self.delegate domain:self clearBrowserCookiesWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    }
    else if ([methodName isEqualToString:@"setCacheDisabled"] && [self.delegate respondsToSelector:@selector(domain:setCacheDisabledWithCacheDisabled:callback:)]) {
        [self.delegate domain:self setCacheDisabledWithCacheDisabled:[params objectForKey:@"cacheDisabled"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    }
    else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDNetworkDomain)

- (PDNetworkDomain *)networkDomain;
{
    return [self domainForName:@"Network"];
}

@end

//
//  PDApplicationCacheDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDApplicationCacheDomain.h"
#import "PDObject.h"
#import "PDApplicationCacheTypes.h"


@interface PDApplicationCacheDomain ()
//Commands

@end

@implementation PDApplicationCacheDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"ApplicationCache";
}

// Events
- (void)applicationCacheStatusUpdatedWithFrameId:(NSString *)frameId manifestURL:(NSString *)manifestURL status:(NSNumber *)status;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (frameId != nil) {
        [params setObject:[frameId PD_JSONObject] forKey:@"frameId"];
    }
    if (manifestURL != nil) {
        [params setObject:[manifestURL PD_JSONObject] forKey:@"manifestURL"];
    }
    if (status != nil) {
        [params setObject:[status PD_JSONObject] forKey:@"status"];
    }
    
    [self.debuggingServer sendEventWithName:@"ApplicationCache.applicationCacheStatusUpdated" parameters:params];
}
- (void)networkStateUpdatedWithIsNowOnline:(NSNumber *)isNowOnline;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (isNowOnline != nil) {
        [params setObject:[isNowOnline PD_JSONObject] forKey:@"isNowOnline"];
    }
    
    [self.debuggingServer sendEventWithName:@"ApplicationCache.networkStateUpdated" parameters:params];
}



- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
{
    if ([methodName isEqualToString:@"getFramesWithManifests"] && [self.delegate respondsToSelector:@selector(domain:getFramesWithManifestsWithCallback:)]) {
        [self.delegate domain:self getFramesWithManifestsWithCallback:^(NSArray *frameIds, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (frameIds != nil) {
                [params setObject:frameIds forKey:@"frameIds"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"enable"] && [self.delegate respondsToSelector:@selector(domain:enableWithCallback:)]) {
        [self.delegate domain:self enableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"getManifestForFrame"] && [self.delegate respondsToSelector:@selector(domain:getManifestForFrameWithFrameId:callback:)]) {
        [self.delegate domain:self getManifestForFrameWithFrameId:[params objectForKey:@"frameId"] callback:^(NSString *manifestURL, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (manifestURL != nil) {
                [params setObject:manifestURL forKey:@"manifestURL"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getApplicationCacheForFrame"] && [self.delegate respondsToSelector:@selector(domain:getApplicationCacheForFrameWithFrameId:callback:)]) {
        [self.delegate domain:self getApplicationCacheForFrameWithFrameId:[params objectForKey:@"frameId"] callback:^(PDApplicationCacheApplicationCache *applicationCache, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (applicationCache != nil) {
                [params setObject:applicationCache forKey:@"applicationCache"];
            }

            responseCallback(params, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDApplicationCacheDomain)

- (PDApplicationCacheDomain *)applicationCacheDomain;
{
    return [self domainForName:@"ApplicationCache"];
}

@end

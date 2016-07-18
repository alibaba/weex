//
//  PDProfilerDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDProfilerDomain.h"
#import "PDObject.h"
#import "PDRuntimeTypes.h"
#import "PDProfilerTypes.h"


@interface PDProfilerDomain ()
//Commands

@end

@implementation PDProfilerDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"Profiler";
}

// Events
- (void)addProfileHeaderWithHeader:(PDProfilerProfileHeader *)header;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (header != nil) {
        [params setObject:[header PD_JSONObject] forKey:@"header"];
    }
    
    [self.debuggingServer sendEventWithName:@"Profiler.addProfileHeader" parameters:params];
}
- (void)addHeapSnapshotChunkWithUid:(NSNumber *)uid chunk:(NSString *)chunk;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (uid != nil) {
        [params setObject:[uid PD_JSONObject] forKey:@"uid"];
    }
    if (chunk != nil) {
        [params setObject:[chunk PD_JSONObject] forKey:@"chunk"];
    }
    
    [self.debuggingServer sendEventWithName:@"Profiler.addHeapSnapshotChunk" parameters:params];
}
- (void)finishHeapSnapshotWithUid:(NSNumber *)uid;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (uid != nil) {
        [params setObject:[uid PD_JSONObject] forKey:@"uid"];
    }
    
    [self.debuggingServer sendEventWithName:@"Profiler.finishHeapSnapshot" parameters:params];
}
- (void)setRecordingProfileWithIsProfiling:(NSNumber *)isProfiling;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (isProfiling != nil) {
        [params setObject:[isProfiling PD_JSONObject] forKey:@"isProfiling"];
    }
    
    [self.debuggingServer sendEventWithName:@"Profiler.setRecordingProfile" parameters:params];
}
- (void)resetProfiles;
{
    [self.debuggingServer sendEventWithName:@"Profiler.resetProfiles" parameters:nil];
}
- (void)reportHeapSnapshotProgressWithDone:(NSNumber *)done total:(NSNumber *)total;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (done != nil) {
        [params setObject:[done PD_JSONObject] forKey:@"done"];
    }
    if (total != nil) {
        [params setObject:[total PD_JSONObject] forKey:@"total"];
    }
    
    [self.debuggingServer sendEventWithName:@"Profiler.reportHeapSnapshotProgress" parameters:params];
}



- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
{
    if ([methodName isEqualToString:@"causesRecompilation"] && [self.delegate respondsToSelector:@selector(domain:causesRecompilationWithCallback:)]) {
        [self.delegate domain:self causesRecompilationWithCallback:^(NSNumber *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"isSampling"] && [self.delegate respondsToSelector:@selector(domain:isSamplingWithCallback:)]) {
        [self.delegate domain:self isSamplingWithCallback:^(NSNumber *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"hasHeapProfiler"] && [self.delegate respondsToSelector:@selector(domain:hasHeapProfilerWithCallback:)]) {
        [self.delegate domain:self hasHeapProfilerWithCallback:^(NSNumber *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"enable"] && [self.delegate respondsToSelector:@selector(domain:enableWithCallback:)]) {
        [self.delegate domain:self enableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"disable"] && [self.delegate respondsToSelector:@selector(domain:disableWithCallback:)]) {
        [self.delegate domain:self disableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"start"] && [self.delegate respondsToSelector:@selector(domain:startWithCallback:)]) {
        [self.delegate domain:self startWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"stop"] && [self.delegate respondsToSelector:@selector(domain:stopWithCallback:)]) {
        [self.delegate domain:self stopWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"getProfileHeaders"] && [self.delegate respondsToSelector:@selector(domain:getProfileHeadersWithCallback:)]) {
        [self.delegate domain:self getProfileHeadersWithCallback:^(NSArray *headers, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (headers != nil) {
                [params setObject:headers forKey:@"headers"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getProfile"] && [self.delegate respondsToSelector:@selector(domain:getProfileWithType:uid:callback:)]) {
        [self.delegate domain:self getProfileWithType:[params objectForKey:@"type"] uid:[params objectForKey:@"uid"] callback:^(PDProfilerProfile *profile, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (profile != nil) {
                [params setObject:profile forKey:@"profile"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"removeProfile"] && [self.delegate respondsToSelector:@selector(domain:removeProfileWithType:uid:callback:)]) {
        [self.delegate domain:self removeProfileWithType:[params objectForKey:@"type"] uid:[params objectForKey:@"uid"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"clearProfiles"] && [self.delegate respondsToSelector:@selector(domain:clearProfilesWithCallback:)]) {
        [self.delegate domain:self clearProfilesWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"takeHeapSnapshot"] && [self.delegate respondsToSelector:@selector(domain:takeHeapSnapshotWithCallback:)]) {
        [self.delegate domain:self takeHeapSnapshotWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"collectGarbage"] && [self.delegate respondsToSelector:@selector(domain:collectGarbageWithCallback:)]) {
        [self.delegate domain:self collectGarbageWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"getObjectByHeapObjectId"] && [self.delegate respondsToSelector:@selector(domain:getObjectByHeapObjectIdWithObjectId:objectGroup:callback:)]) {
        [self.delegate domain:self getObjectByHeapObjectIdWithObjectId:[params objectForKey:@"objectId"] objectGroup:[params objectForKey:@"objectGroup"] callback:^(PDRuntimeRemoteObject *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getHeapObjectId"] && [self.delegate respondsToSelector:@selector(domain:getHeapObjectIdWithObjectId:callback:)]) {
        [self.delegate domain:self getHeapObjectIdWithObjectId:[params objectForKey:@"objectId"] callback:^(NSString *heapSnapshotObjectId, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (heapSnapshotObjectId != nil) {
                [params setObject:heapSnapshotObjectId forKey:@"heapSnapshotObjectId"];
            }

            responseCallback(params, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDProfilerDomain)

- (PDProfilerDomain *)profilerDomain;
{
    return [self domainForName:@"Profiler"];
}

@end

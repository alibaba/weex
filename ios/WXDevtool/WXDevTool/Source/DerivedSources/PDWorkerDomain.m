//
//  PDWorkerDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDWorkerDomain.h"
#import "PDObject.h"


@interface PDWorkerDomain ()
//Commands

@end

@implementation PDWorkerDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"Worker";
}

// Events
- (void)workerCreatedWithWorkerId:(NSNumber *)workerId url:(NSString *)url inspectorConnected:(NSNumber *)inspectorConnected;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (workerId != nil) {
        [params setObject:[workerId PD_JSONObject] forKey:@"workerId"];
    }
    if (url != nil) {
        [params setObject:[url PD_JSONObject] forKey:@"url"];
    }
    if (inspectorConnected != nil) {
        [params setObject:[inspectorConnected PD_JSONObject] forKey:@"inspectorConnected"];
    }
    
    [self.debuggingServer sendEventWithName:@"Worker.workerCreated" parameters:params];
}
- (void)workerTerminatedWithWorkerId:(NSNumber *)workerId;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (workerId != nil) {
        [params setObject:[workerId PD_JSONObject] forKey:@"workerId"];
    }
    
    [self.debuggingServer sendEventWithName:@"Worker.workerTerminated" parameters:params];
}
- (void)dispatchMessageFromWorkerWithWorkerId:(NSNumber *)workerId message:(NSDictionary *)message;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (workerId != nil) {
        [params setObject:[workerId PD_JSONObject] forKey:@"workerId"];
    }
    if (message != nil) {
        [params setObject:[message PD_JSONObject] forKey:@"message"];
    }
    
    [self.debuggingServer sendEventWithName:@"Worker.dispatchMessageFromWorker" parameters:params];
}
- (void)disconnectedFromWorker;
{
    [self.debuggingServer sendEventWithName:@"Worker.disconnectedFromWorker" parameters:nil];
}



- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
{
    if ([methodName isEqualToString:@"enable"] && [self.delegate respondsToSelector:@selector(domain:enableWithCallback:)]) {
        [self.delegate domain:self enableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"disable"] && [self.delegate respondsToSelector:@selector(domain:disableWithCallback:)]) {
        [self.delegate domain:self disableWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"sendMessageToWorker"] && [self.delegate respondsToSelector:@selector(domain:sendMessageToWorkerWithWorkerId:message:callback:)]) {
        [self.delegate domain:self sendMessageToWorkerWithWorkerId:[params objectForKey:@"workerId"] message:[params objectForKey:@"message"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"connectToWorker"] && [self.delegate respondsToSelector:@selector(domain:connectToWorkerWithWorkerId:callback:)]) {
        [self.delegate domain:self connectToWorkerWithWorkerId:[params objectForKey:@"workerId"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"disconnectFromWorker"] && [self.delegate respondsToSelector:@selector(domain:disconnectFromWorkerWithWorkerId:callback:)]) {
        [self.delegate domain:self disconnectFromWorkerWithWorkerId:[params objectForKey:@"workerId"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"setAutoconnectToWorkers"] && [self.delegate respondsToSelector:@selector(domain:setAutoconnectToWorkersWithValue:callback:)]) {
        [self.delegate domain:self setAutoconnectToWorkersWithValue:[params objectForKey:@"value"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDWorkerDomain)

- (PDWorkerDomain *)workerDomain;
{
    return [self domainForName:@"Worker"];
}

@end

//
//  PDInspectorDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDInspectorDomain.h"
#import "PDObject.h"
#import "PDRuntimeTypes.h"


@interface PDInspectorDomain ()
//Commands

@end

@implementation PDInspectorDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"Inspector";
}

// Events
- (void)evaluateForTestInFrontendWithTestCallId:(NSNumber *)testCallId script:(NSString *)script;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (testCallId != nil) {
        [params setObject:[testCallId PD_JSONObject] forKey:@"testCallId"];
    }
    if (script != nil) {
        [params setObject:[script PD_JSONObject] forKey:@"script"];
    }
    
    [self.debuggingServer sendEventWithName:@"Inspector.evaluateForTestInFrontend" parameters:params];
}
- (void)inspectWithObject:(PDRuntimeRemoteObject *)object hints:(NSDictionary *)hints;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (object != nil) {
        [params setObject:[object PD_JSONObject] forKey:@"object"];
    }
    if (hints != nil) {
        [params setObject:[hints PD_JSONObject] forKey:@"hints"];
    }
    
    [self.debuggingServer sendEventWithName:@"Inspector.inspect" parameters:params];
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
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDInspectorDomain)

- (PDInspectorDomain *)inspectorDomain;
{
    return [self domainForName:@"Inspector"];
}

@end

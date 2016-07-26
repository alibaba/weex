//
//  PDRuntimeDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDRuntimeDomain.h"
#import "PDObject.h"
#import "PDRuntimeTypes.h"


@interface PDRuntimeDomain ()
//Commands

@end

@implementation PDRuntimeDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"Runtime";
}

// Events

// Issued when new isolated context is created.
- (void)isolatedContextCreatedWithContext:(PDRuntimeExecutionContextDescription *)context;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (context != nil) {
        [params setObject:[context PD_JSONObject] forKey:@"context"];
    }
    
    [self.debuggingServer sendEventWithName:@"Runtime.isolatedContextCreated" parameters:params];
}



- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
{
    if ([methodName isEqualToString:@"evaluate"] && [self.delegate respondsToSelector:@selector(domain:evaluateWithExpression:objectGroup:includeCommandLineAPI:doNotPauseOnExceptionsAndMuteConsole:contextId:returnByValue:callback:)]) {
        [self.delegate domain:self evaluateWithExpression:[params objectForKey:@"expression"] objectGroup:[params objectForKey:@"objectGroup"] includeCommandLineAPI:[params objectForKey:@"includeCommandLineAPI"] doNotPauseOnExceptionsAndMuteConsole:[params objectForKey:@"doNotPauseOnExceptionsAndMuteConsole"] contextId:[params objectForKey:@"contextId"] returnByValue:[params objectForKey:@"returnByValue"] callback:^(PDRuntimeRemoteObject *result, NSNumber *wasThrown, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }
            if (wasThrown != nil) {
                [params setObject:wasThrown forKey:@"wasThrown"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"callFunctionOn"] && [self.delegate respondsToSelector:@selector(domain:callFunctionOnWithObjectId:functionDeclaration:arguments:doNotPauseOnExceptionsAndMuteConsole:returnByValue:callback:)]) {
        [self.delegate domain:self callFunctionOnWithObjectId:[params objectForKey:@"objectId"] functionDeclaration:[params objectForKey:@"functionDeclaration"] arguments:[params objectForKey:@"arguments"] doNotPauseOnExceptionsAndMuteConsole:[params objectForKey:@"doNotPauseOnExceptionsAndMuteConsole"] returnByValue:[params objectForKey:@"returnByValue"] callback:^(PDRuntimeRemoteObject *result, NSNumber *wasThrown, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }
            if (wasThrown != nil) {
                [params setObject:wasThrown forKey:@"wasThrown"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"getProperties"] && [self.delegate respondsToSelector:@selector(domain:getPropertiesWithObjectId:ownProperties:callback:)]) {
        [self.delegate domain:self getPropertiesWithObjectId:[params objectForKey:@"objectId"] ownProperties:[params objectForKey:@"ownProperties"] callback:^(NSArray *result, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (result != nil) {
                [params setObject:result forKey:@"result"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"releaseObject"] && [self.delegate respondsToSelector:@selector(domain:releaseObjectWithObjectId:callback:)]) {
        [self.delegate domain:self releaseObjectWithObjectId:[params objectForKey:@"objectId"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"releaseObjectGroup"] && [self.delegate respondsToSelector:@selector(domain:releaseObjectGroupWithObjectGroup:callback:)]) {
        [self.delegate domain:self releaseObjectGroupWithObjectGroup:[params objectForKey:@"objectGroup"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"run"] && [self.delegate respondsToSelector:@selector(domain:runWithCallback:)]) {
        [self.delegate domain:self runWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"setReportExecutionContextCreation"] && [self.delegate respondsToSelector:@selector(domain:setReportExecutionContextCreationWithEnabled:callback:)]) {
        [self.delegate domain:self setReportExecutionContextCreationWithEnabled:[params objectForKey:@"enabled"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDRuntimeDomain)

- (PDRuntimeDomain *)runtimeDomain;
{
    return [self domainForName:@"Runtime"];
}

@end

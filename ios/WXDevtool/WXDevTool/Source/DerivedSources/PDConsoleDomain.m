//
//  PDConsoleDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDConsoleDomain.h"
#import "PDObject.h"
#import "PDConsoleTypes.h"


@interface PDConsoleDomain ()
//Commands

@end

@implementation PDConsoleDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"Console";
}

// Events

// Issued when new console message is added.
- (void)messageAddedWithMessage:(PDConsoleConsoleMessage *)message;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (message != nil) {
        [params setObject:[message PD_JSONObject] forKey:@"message"];
    }
    
    [self.debuggingServer sendEventWithName:@"Console.messageAdded" parameters:params];
}

// Issued when subsequent message(s) are equal to the previous one(s).
- (void)messageRepeatCountUpdatedWithCount:(NSNumber *)count;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (count != nil) {
        [params setObject:[count PD_JSONObject] forKey:@"count"];
    }
    
    [self.debuggingServer sendEventWithName:@"Console.messageRepeatCountUpdated" parameters:params];
}

// Issued when console is cleared. This happens either upon <code>clearMessages</code> command or after page navigation.
- (void)messagesCleared;
{
    [self.debuggingServer sendEventWithName:@"Console.messagesCleared" parameters:nil];
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
    } else if ([methodName isEqualToString:@"clearMessages"] && [self.delegate respondsToSelector:@selector(domain:clearMessagesWithCallback:)]) {
        [self.delegate domain:self clearMessagesWithCallback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"setMonitoringXHREnabled"] && [self.delegate respondsToSelector:@selector(domain:setMonitoringXHREnabledWithEnabled:callback:)]) {
        [self.delegate domain:self setMonitoringXHREnabledWithEnabled:[params objectForKey:@"enabled"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"addInspectedNode"] && [self.delegate respondsToSelector:@selector(domain:addInspectedNodeWithNodeId:callback:)]) {
        [self.delegate domain:self addInspectedNodeWithNodeId:[params objectForKey:@"nodeId"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"addInspectedHeapObject"] && [self.delegate respondsToSelector:@selector(domain:addInspectedHeapObjectWithHeapObjectId:callback:)]) {
        [self.delegate domain:self addInspectedHeapObjectWithHeapObjectId:[params objectForKey:@"heapObjectId"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDConsoleDomain)

- (PDConsoleDomain *)consoleDomain;
{
    return [self domainForName:@"Console"];
}

@end

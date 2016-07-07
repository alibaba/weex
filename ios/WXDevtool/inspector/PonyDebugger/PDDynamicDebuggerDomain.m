//
//  PDDebuggerDomain.m
//  PonyDebugger
//
//  Created by Mike Lewis on 11/5/11.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import <objc/message.h>

#import "PDDynamicDebuggerDomain.h"
#import "PDDebugger.h"
#import "PDDefinitions.h"


@interface PDDynamicDebuggerDomain ()

@property (nonatomic, readwrite) BOOL enabled;

- (void)_enableWithResultHandler:(PDResponseCallback)resultHandler;
- (void)_disableWithResultHandler:(PDResponseCallback)resultHandler;

@end


@implementation PDDynamicDebuggerDomain

@synthesize debuggingServer = _debuggingServer;
@synthesize enabled = _enabled;
@synthesize delegate = _delegate;

#pragma mark - Statics

+ (NSString *)domainName;
{
    NSAssert(NO, @"Abstract Method");
    return nil;
}

#pragma mark - Initialization

- (id)initWithDebuggingServer:(PDDebugger *)debuggingServer;
{
    self = [super init];
    if (!self) {
        return nil;
    }
    
    _debuggingServer = debuggingServer;
    
    return self;
}

#pragma mark - Public Methods

- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
{
    if ([methodName isEqualToString:@"enable"]) {
        [self _enableWithResultHandler:responseCallback];
    } else if ([methodName isEqualToString:@"disable"]) {
        [self _disableWithResultHandler:responseCallback];
    } else {
        NSString *errorMessage = [[NSString alloc] initWithFormat:@"Unknown or unimplemented method name: %@.%@", [self.class domainName], methodName];
        NSError *error = [NSError errorWithDomain:PDDebuggerErrorDomain code:PDDebuggerUnimplementedDomainMethodErrorCode userInfo:[NSDictionary dictionaryWithObject:errorMessage forKey:NSLocalizedDescriptionKey]];
        responseCallback(nil, error);
    }
}

#pragma mark - Private Methods

- (void)_enableWithResultHandler:(PDResponseCallback)resultHandler;
{
    self.enabled = YES;
    NSLog(@"enabling %@", self);
    resultHandler(nil, nil);
}

- (void)_disableWithResultHandler:(PDResponseCallback)resultHandler;
{
    self.enabled = NO;
    resultHandler(nil, nil);
}

@end

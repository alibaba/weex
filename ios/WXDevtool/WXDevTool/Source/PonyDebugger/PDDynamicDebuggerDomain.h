//
//  PDDebuggerDomain.h
//  PonyDebugger
//
//  Created by Mike Lewis on 11/5/11.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import <Foundation/Foundation.h>


// Must call this to send the response
typedef void (^PDResponseCallback)(NSDictionary *result, id error);

@protocol PDCommandDelegate;
@class PDDebugger;


@interface PDDynamicDebuggerDomain : NSObject

@property (nonatomic, assign, readonly) PDDebugger * debuggingServer;
@property (nonatomic, assign) id <PDCommandDelegate> delegate;

+ (NSString *)domainName;

- (void)handleMethodWithName:(NSString *)methodName parameters:(NSDictionary *)params responseCallback:(PDResponseCallback)responseCallback;
- (id)initWithDebuggingServer:(PDDebugger *)debuggingServer;

@end


@protocol PDCommandDelegate <NSObject>

- (void)domain:(PDDynamicDebuggerDomain *)domain enableWithCallback:(void (^)(id error))callback;
- (void)domain:(PDDynamicDebuggerDomain *)domain disableWithCallback:(void (^)(id error))callback;

@end

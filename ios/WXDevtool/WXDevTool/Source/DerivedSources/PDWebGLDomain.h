//
//  PDWebGLDomain.h
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDDebugger.h"
#import "PDDynamicDebuggerDomain.h"

@class PDWebGLTraceLog;

@protocol PDWebGLCommandDelegate;

@interface PDWebGLDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDWebGLCommandDelegate, PDCommandDelegate> delegate;

@end

@protocol PDWebGLCommandDelegate <PDCommandDelegate>
@optional

// Enables WebGL inspection.
- (void)domain:(PDWebGLDomain *)domain enableWithCallback:(void (^)(id error))callback;

// Disables WebGL inspection.
- (void)domain:(PDWebGLDomain *)domain disableWithCallback:(void (^)(id error))callback;
- (void)domain:(PDWebGLDomain *)domain dropTraceLogWithTraceLogId:(NSString *)traceLogId callback:(void (^)(id error))callback;
- (void)domain:(PDWebGLDomain *)domain captureFrameWithCallback:(void (^)(NSString *traceLogId, id error))callback;
- (void)domain:(PDWebGLDomain *)domain getTraceLogWithTraceLogId:(NSString *)traceLogId callback:(void (^)(PDWebGLTraceLog *traceLog, id error))callback;
- (void)domain:(PDWebGLDomain *)domain replayTraceLogWithTraceLogId:(NSString *)traceLogId stepNo:(NSNumber *)stepNo callback:(void (^)(NSString *screenshotDataUrl, id error))callback;

@end

@interface PDDebugger (PDWebGLDomain)

@property (nonatomic, readonly, strong) PDWebGLDomain *webGLDomain;

@end

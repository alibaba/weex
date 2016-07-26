//
//  PDTimelineDomain.h
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

@class PDTimelineTimelineEvent;

@protocol PDTimelineCommandDelegate;

// Timeline provides its clients with instrumentation records that are generated during the page runtime. Timeline instrumentation can be started and stopped using corresponding commands. While timeline is started, it is generating timeline event records.
@interface PDTimelineDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDTimelineCommandDelegate, PDCommandDelegate> delegate;

// Events

// Fired for every instrumentation event while timeline is started.
// Param record: Timeline event record data.
- (void)eventRecordedWithRecord:(PDTimelineTimelineEvent *)record;

@end

@protocol PDTimelineCommandDelegate <PDCommandDelegate>
@optional

// Starts capturing instrumentation events.
// Param maxCallStackDepth: Samples JavaScript stack traces up to <code>maxCallStackDepth</code>, defaults to 5.
- (void)domain:(PDTimelineDomain *)domain startWithMaxCallStackDepth:(NSNumber *)maxCallStackDepth callback:(void (^)(id error))callback;

// Stops capturing instrumentation events.
- (void)domain:(PDTimelineDomain *)domain stopWithCallback:(void (^)(id error))callback;

// Starts calculating various DOM statistics and sending them as part of timeline events.
// Param enabled: True to start collecting DOM counters.
- (void)domain:(PDTimelineDomain *)domain setIncludeMemoryDetailsWithEnabled:(NSNumber *)enabled callback:(void (^)(id error))callback;

// Tells whether timeline agent supports frame instrumentation.
// Callback Param result: True if timeline supports frame instrumentation.
- (void)domain:(PDTimelineDomain *)domain supportsFrameInstrumentationWithCallback:(void (^)(NSNumber *result, id error))callback;

@end

@interface PDDebugger (PDTimelineDomain)

@property (nonatomic, readonly, strong) PDTimelineDomain *timelineDomain;

@end

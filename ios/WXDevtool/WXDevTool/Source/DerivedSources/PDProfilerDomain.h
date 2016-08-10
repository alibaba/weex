//
//  PDProfilerDomain.h
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

@class PDRuntimeRemoteObject;
@class PDProfilerProfile;
@class PDProfilerProfileHeader;

@protocol PDProfilerCommandDelegate;

@interface PDProfilerDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDProfilerCommandDelegate, PDCommandDelegate> delegate;

// Events
- (void)addProfileHeaderWithHeader:(PDProfilerProfileHeader *)header;
- (void)addHeapSnapshotChunkWithUid:(NSNumber *)uid chunk:(NSString *)chunk;
- (void)finishHeapSnapshotWithUid:(NSNumber *)uid;
- (void)setRecordingProfileWithIsProfiling:(NSNumber *)isProfiling;
- (void)resetProfiles;
- (void)reportHeapSnapshotProgressWithDone:(NSNumber *)done total:(NSNumber *)total;

@end

@protocol PDProfilerCommandDelegate <PDCommandDelegate>
@optional
- (void)domain:(PDProfilerDomain *)domain causesRecompilationWithCallback:(void (^)(NSNumber *result, id error))callback;
- (void)domain:(PDProfilerDomain *)domain isSamplingWithCallback:(void (^)(NSNumber *result, id error))callback;
- (void)domain:(PDProfilerDomain *)domain hasHeapProfilerWithCallback:(void (^)(NSNumber *result, id error))callback;
- (void)domain:(PDProfilerDomain *)domain enableWithCallback:(void (^)(id error))callback;
- (void)domain:(PDProfilerDomain *)domain disableWithCallback:(void (^)(id error))callback;
- (void)domain:(PDProfilerDomain *)domain startWithCallback:(void (^)(id error))callback;
- (void)domain:(PDProfilerDomain *)domain stopWithCallback:(void (^)(id error))callback;
- (void)domain:(PDProfilerDomain *)domain getProfileHeadersWithCallback:(void (^)(NSArray *headers, id error))callback;
- (void)domain:(PDProfilerDomain *)domain getProfileWithType:(NSString *)type uid:(NSNumber *)uid callback:(void (^)(PDProfilerProfile *profile, id error))callback;
- (void)domain:(PDProfilerDomain *)domain removeProfileWithType:(NSString *)type uid:(NSNumber *)uid callback:(void (^)(id error))callback;
- (void)domain:(PDProfilerDomain *)domain clearProfilesWithCallback:(void (^)(id error))callback;
- (void)domain:(PDProfilerDomain *)domain takeHeapSnapshotWithCallback:(void (^)(id error))callback;
- (void)domain:(PDProfilerDomain *)domain collectGarbageWithCallback:(void (^)(id error))callback;
// Param objectGroup: Symbolic group name that can be used to release multiple objects.
// Callback Param result: Evaluation result.
- (void)domain:(PDProfilerDomain *)domain getObjectByHeapObjectIdWithObjectId:(NSString *)objectId objectGroup:(NSString *)objectGroup callback:(void (^)(PDRuntimeRemoteObject *result, id error))callback;
// Param objectId: Identifier of the object to get heap object id for.
// Callback Param heapSnapshotObjectId: Id of the heap snapshot object corresponding to the passed remote object id.
- (void)domain:(PDProfilerDomain *)domain getHeapObjectIdWithObjectId:(NSString *)objectId callback:(void (^)(NSString *heapSnapshotObjectId, id error))callback;

@end

@interface PDDebugger (PDProfilerDomain)

@property (nonatomic, readonly, strong) PDProfilerDomain *profilerDomain;

@end

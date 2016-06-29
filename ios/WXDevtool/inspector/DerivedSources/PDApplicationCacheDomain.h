//
//  PDApplicationCacheDomain.h
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

@class PDApplicationCacheApplicationCache;

@protocol PDApplicationCacheCommandDelegate;

@interface PDApplicationCacheDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDApplicationCacheCommandDelegate, PDCommandDelegate> delegate;

// Events
// Param frameId: Identifier of the frame containing document whose application cache updated status.
// Param manifestURL: Manifest URL.
// Param status: Updated application cache status.
- (void)applicationCacheStatusUpdatedWithFrameId:(NSString *)frameId manifestURL:(NSString *)manifestURL status:(NSNumber *)status;
- (void)networkStateUpdatedWithIsNowOnline:(NSNumber *)isNowOnline;

@end

@protocol PDApplicationCacheCommandDelegate <PDCommandDelegate>
@optional

// Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache.
// Callback Param frameIds: Array of frame identifiers with manifest urls for each frame containing a document associated with some application cache.
- (void)domain:(PDApplicationCacheDomain *)domain getFramesWithManifestsWithCallback:(void (^)(NSArray *frameIds, id error))callback;

// Enables application cache domain notifications.
- (void)domain:(PDApplicationCacheDomain *)domain enableWithCallback:(void (^)(id error))callback;

// Returns manifest URL for document in the given frame.
// Param frameId: Identifier of the frame containing document whose manifest is retrieved.
// Callback Param manifestURL: Manifest URL for document in the given frame.
- (void)domain:(PDApplicationCacheDomain *)domain getManifestForFrameWithFrameId:(NSString *)frameId callback:(void (^)(NSString *manifestURL, id error))callback;

// Returns relevant application cache data for the document in given frame.
// Param frameId: Identifier of the frame containing document whose application cache is retrieved.
// Callback Param applicationCache: Relevant application cache data for the document in given frame.
- (void)domain:(PDApplicationCacheDomain *)domain getApplicationCacheForFrameWithFrameId:(NSString *)frameId callback:(void (^)(PDApplicationCacheApplicationCache *applicationCache, id error))callback;

@end

@interface PDDebugger (PDApplicationCacheDomain)

@property (nonatomic, readonly, strong) PDApplicationCacheDomain *applicationCacheDomain;

@end

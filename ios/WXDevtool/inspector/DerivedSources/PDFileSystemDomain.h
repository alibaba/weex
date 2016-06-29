//
//  PDFileSystemDomain.h
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

@class PDFileSystemMetadata;
@class PDFileSystemEntry;

@protocol PDFileSystemCommandDelegate;

@interface PDFileSystemDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDFileSystemCommandDelegate, PDCommandDelegate> delegate;

// Events

// Completion event of requestFileSystemRoot command.
// Param requestId: Request Identifier that was returned by corresponding requestFileSystemRoot command.
// Param errorCode: 0, if no error. Otherwise, errorCode is set to FileError::ErrorCode value.
// Param root: Contains root of the requested FileSystem if the command completed successfully.
- (void)fileSystemRootReceivedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode root:(PDFileSystemEntry *)root;

// Completion event of requestDirectoryContent command.
// Param requestId: Request Identifier that was returned by corresponding requestDirectoryContent command.
// Param errorCode: 0, if no error. Otherwise, errorCode is set to FileError::ErrorCode value.
// Param entries: Contains all entries on directory if the command completed successfully.
- (void)directoryContentReceivedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode entries:(NSArray *)entries;

// Completion event of requestMetadata command.
// Param requestId: Request Identifier that was returned in response to the corresponding requestMetadata command.
// Param errorCode: 0, if no error. Otherwise, errorCode is set to FileError::ErrorCode value.
// Param metadata: Contains metadata of the entry if the command completed successfully.
- (void)metadataReceivedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode metadata:(PDFileSystemMetadata *)metadata;

// Completion event of requestFileContent command.
// Param requestId: Request Identifier that was returned in response to the corresponding requestFileContent command.
// Param errorCode: 0, if no error. Otherwise, errorCode is set to FileError::ErrorCode value.
// Param content: Content of the file.
// Param charset: Charset of the content if it is served as text.
- (void)fileContentReceivedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode content:(NSString *)content charset:(NSString *)charset;

// Completion event of deleteEntry command.
// Param requestId: Request Identifier that was returned in response to the corresponding deleteEntry command.
// Param errorCode: 0, if no error. Otherwise errorCode is set to FileError::ErrorCode value.
- (void)deletionCompletedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode;

@end

@protocol PDFileSystemCommandDelegate <PDCommandDelegate>
@optional

// Enables events from backend.
- (void)domain:(PDFileSystemDomain *)domain enableWithCallback:(void (^)(id error))callback;

// Disables events from backend.
- (void)domain:(PDFileSystemDomain *)domain disableWithCallback:(void (^)(id error))callback;

// Returns root directory of the FileSystem as fileSystemRootReceived event, if exists.
// Param origin: Security origin of requesting FileSystem. One of frames in current page needs to have this security origin.
// Param type: FileSystem type of requesting FileSystem.
// Callback Param requestId: Request identifier. Corresponding fileSystemRootReceived event should have same requestId with this.
- (void)domain:(PDFileSystemDomain *)domain requestFileSystemRootWithOrigin:(NSString *)origin type:(NSString *)type callback:(void (^)(NSNumber *requestId, id error))callback;

// Returns content of the directory as directoryContentReceived event.
// Param url: URL of the directory that the frontend is requesting to read from.
// Callback Param requestId: Request identifier. Corresponding directoryContentReceived event should have same requestId with this.
- (void)domain:(PDFileSystemDomain *)domain requestDirectoryContentWithUrl:(NSString *)url callback:(void (^)(NSNumber *requestId, id error))callback;

// Returns metadata of the entry as metadataReceived event.
// Param url: URL of the entry that the frontend is requesting to get metadata from.
// Callback Param requestId: Request identifier. Corresponding metadataReceived event should have same requestId with this.
- (void)domain:(PDFileSystemDomain *)domain requestMetadataWithUrl:(NSString *)url callback:(void (^)(NSNumber *requestId, id error))callback;

// Returns content of the file as fileContentReceived event. Result should be sliced into [start, end).
// Param url: URL of the file that the frontend is requesting to read from.
// Param readAsText: True if the content should be read as text, otherwise the result will be returned as base64 encoded text.
// Param start: Specifies the start of range to read.
// Param end: Specifies the end of range to read exclusively.
// Param charset: Overrides charset of the content when content is served as text.
// Callback Param requestId: Request identifier. Corresponding fileContentReceived event should have same requestId with this.
- (void)domain:(PDFileSystemDomain *)domain requestFileContentWithUrl:(NSString *)url readAsText:(NSNumber *)readAsText start:(NSNumber *)start end:(NSNumber *)end charset:(NSString *)charset callback:(void (^)(NSNumber *requestId, id error))callback;

// Deletes specified entry. If the entry is a directory, the agent deletes children recursively.
// Param url: URL of the entry to delete.
// Callback Param requestId: Request identifier. Corresponding deletionCompleted event should have same requestId with this.
- (void)domain:(PDFileSystemDomain *)domain deleteEntryWithUrl:(NSString *)url callback:(void (^)(NSNumber *requestId, id error))callback;

@end

@interface PDDebugger (PDFileSystemDomain)

@property (nonatomic, readonly, strong) PDFileSystemDomain *fileSystemDomain;

@end

//
//  PDFileSystemDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDFileSystemDomain.h"
#import "PDObject.h"
#import "PDFileSystemTypes.h"


@interface PDFileSystemDomain ()
//Commands

@end

@implementation PDFileSystemDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"FileSystem";
}

// Events

// Completion event of requestFileSystemRoot command.
- (void)fileSystemRootReceivedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode root:(PDFileSystemEntry *)root;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (errorCode != nil) {
        [params setObject:[errorCode PD_JSONObject] forKey:@"errorCode"];
    }
    if (root != nil) {
        [params setObject:[root PD_JSONObject] forKey:@"root"];
    }
    
    [self.debuggingServer sendEventWithName:@"FileSystem.fileSystemRootReceived" parameters:params];
}

// Completion event of requestDirectoryContent command.
- (void)directoryContentReceivedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode entries:(NSArray *)entries;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (errorCode != nil) {
        [params setObject:[errorCode PD_JSONObject] forKey:@"errorCode"];
    }
    if (entries != nil) {
        [params setObject:[entries PD_JSONObject] forKey:@"entries"];
    }
    
    [self.debuggingServer sendEventWithName:@"FileSystem.directoryContentReceived" parameters:params];
}

// Completion event of requestMetadata command.
- (void)metadataReceivedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode metadata:(PDFileSystemMetadata *)metadata;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (errorCode != nil) {
        [params setObject:[errorCode PD_JSONObject] forKey:@"errorCode"];
    }
    if (metadata != nil) {
        [params setObject:[metadata PD_JSONObject] forKey:@"metadata"];
    }
    
    [self.debuggingServer sendEventWithName:@"FileSystem.metadataReceived" parameters:params];
}

// Completion event of requestFileContent command.
- (void)fileContentReceivedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode content:(NSString *)content charset:(NSString *)charset;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:4];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (errorCode != nil) {
        [params setObject:[errorCode PD_JSONObject] forKey:@"errorCode"];
    }
    if (content != nil) {
        [params setObject:[content PD_JSONObject] forKey:@"content"];
    }
    if (charset != nil) {
        [params setObject:[charset PD_JSONObject] forKey:@"charset"];
    }
    
    [self.debuggingServer sendEventWithName:@"FileSystem.fileContentReceived" parameters:params];
}

// Completion event of deleteEntry command.
- (void)deletionCompletedWithRequestId:(NSNumber *)requestId errorCode:(NSNumber *)errorCode;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (errorCode != nil) {
        [params setObject:[errorCode PD_JSONObject] forKey:@"errorCode"];
    }
    
    [self.debuggingServer sendEventWithName:@"FileSystem.deletionCompleted" parameters:params];
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
    } else if ([methodName isEqualToString:@"requestFileSystemRoot"] && [self.delegate respondsToSelector:@selector(domain:requestFileSystemRootWithOrigin:type:callback:)]) {
        [self.delegate domain:self requestFileSystemRootWithOrigin:[params objectForKey:@"origin"] type:[params objectForKey:@"type"] callback:^(NSNumber *requestId, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (requestId != nil) {
                [params setObject:requestId forKey:@"requestId"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"requestDirectoryContent"] && [self.delegate respondsToSelector:@selector(domain:requestDirectoryContentWithUrl:callback:)]) {
        [self.delegate domain:self requestDirectoryContentWithUrl:[params objectForKey:@"url"] callback:^(NSNumber *requestId, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (requestId != nil) {
                [params setObject:requestId forKey:@"requestId"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"requestMetadata"] && [self.delegate respondsToSelector:@selector(domain:requestMetadataWithUrl:callback:)]) {
        [self.delegate domain:self requestMetadataWithUrl:[params objectForKey:@"url"] callback:^(NSNumber *requestId, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (requestId != nil) {
                [params setObject:requestId forKey:@"requestId"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"requestFileContent"] && [self.delegate respondsToSelector:@selector(domain:requestFileContentWithUrl:readAsText:start:end:charset:callback:)]) {
        [self.delegate domain:self requestFileContentWithUrl:[params objectForKey:@"url"] readAsText:[params objectForKey:@"readAsText"] start:[params objectForKey:@"start"] end:[params objectForKey:@"end"] charset:[params objectForKey:@"charset"] callback:^(NSNumber *requestId, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (requestId != nil) {
                [params setObject:requestId forKey:@"requestId"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"deleteEntry"] && [self.delegate respondsToSelector:@selector(domain:deleteEntryWithUrl:callback:)]) {
        [self.delegate domain:self deleteEntryWithUrl:[params objectForKey:@"url"] callback:^(NSNumber *requestId, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (requestId != nil) {
                [params setObject:requestId forKey:@"requestId"];
            }

            responseCallback(params, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDFileSystemDomain)

- (PDFileSystemDomain *)fileSystemDomain;
{
    return [self domainForName:@"FileSystem"];
}

@end

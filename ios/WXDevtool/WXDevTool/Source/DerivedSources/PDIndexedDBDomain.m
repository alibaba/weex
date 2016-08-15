//
//  PDIndexedDBDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDIndexedDBDomain.h"
#import "PDObject.h"
#import "PDIndexedDBTypes.h"


@interface PDIndexedDBDomain ()
//Commands

@end

@implementation PDIndexedDBDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"IndexedDB";
}

// Events
- (void)databaseNamesLoadedWithRequestId:(NSNumber *)requestId securityOriginWithDatabaseNames:(PDIndexedDBSecurityOriginWithDatabaseNames *)securityOriginWithDatabaseNames;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (securityOriginWithDatabaseNames != nil) {
        [params setObject:[securityOriginWithDatabaseNames PD_JSONObject] forKey:@"securityOriginWithDatabaseNames"];
    }
    
    [self.debuggingServer sendEventWithName:@"IndexedDB.databaseNamesLoaded" parameters:params];
}
- (void)databaseLoadedWithRequestId:(NSNumber *)requestId databaseWithObjectStores:(PDIndexedDBDatabaseWithObjectStores *)databaseWithObjectStores;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:2];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (databaseWithObjectStores != nil) {
        [params setObject:[databaseWithObjectStores PD_JSONObject] forKey:@"databaseWithObjectStores"];
    }
    
    [self.debuggingServer sendEventWithName:@"IndexedDB.databaseLoaded" parameters:params];
}
- (void)objectStoreDataLoadedWithRequestId:(NSNumber *)requestId objectStoreDataEntries:(NSArray *)objectStoreDataEntries hasMore:(NSNumber *)hasMore;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (objectStoreDataEntries != nil) {
        [params setObject:[objectStoreDataEntries PD_JSONObject] forKey:@"objectStoreDataEntries"];
    }
    if (hasMore != nil) {
        [params setObject:[hasMore PD_JSONObject] forKey:@"hasMore"];
    }
    
    [self.debuggingServer sendEventWithName:@"IndexedDB.objectStoreDataLoaded" parameters:params];
}
- (void)indexDataLoadedWithRequestId:(NSNumber *)requestId indexDataEntries:(NSArray *)indexDataEntries hasMore:(NSNumber *)hasMore;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:3];

    if (requestId != nil) {
        [params setObject:[requestId PD_JSONObject] forKey:@"requestId"];
    }
    if (indexDataEntries != nil) {
        [params setObject:[indexDataEntries PD_JSONObject] forKey:@"indexDataEntries"];
    }
    if (hasMore != nil) {
        [params setObject:[hasMore PD_JSONObject] forKey:@"hasMore"];
    }
    
    [self.debuggingServer sendEventWithName:@"IndexedDB.indexDataLoaded" parameters:params];
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
    } else if ([methodName isEqualToString:@"requestDatabaseNamesForFrame"] && [self.delegate respondsToSelector:@selector(domain:requestDatabaseNamesForFrameWithRequestId:frameId:callback:)]) {
        [self.delegate domain:self requestDatabaseNamesForFrameWithRequestId:[params objectForKey:@"requestId"] frameId:[params objectForKey:@"frameId"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"requestDatabase"] && [self.delegate respondsToSelector:@selector(domain:requestDatabaseWithRequestId:frameId:databaseName:callback:)]) {
        [self.delegate domain:self requestDatabaseWithRequestId:[params objectForKey:@"requestId"] frameId:[params objectForKey:@"frameId"] databaseName:[params objectForKey:@"databaseName"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else if ([methodName isEqualToString:@"requestData"] && [self.delegate respondsToSelector:@selector(domain:requestDataWithRequestId:frameId:databaseName:objectStoreName:indexName:skipCount:pageSize:keyRange:callback:)]) {
        [self.delegate domain:self requestDataWithRequestId:[params objectForKey:@"requestId"] frameId:[params objectForKey:@"frameId"] databaseName:[params objectForKey:@"databaseName"] objectStoreName:[params objectForKey:@"objectStoreName"] indexName:[params objectForKey:@"indexName"] skipCount:[params objectForKey:@"skipCount"] pageSize:[params objectForKey:@"pageSize"] keyRange:[params objectForKey:@"keyRange"] callback:^(id error) {
            responseCallback(nil, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDIndexedDBDomain)

- (PDIndexedDBDomain *)indexedDBDomain;
{
    return [self domainForName:@"IndexedDB"];
}

@end

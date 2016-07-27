//
//  PDDOMStorageDomain.m
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDDOMStorageDomain.h"
#import "PDObject.h"
#import "PDDOMStorageTypes.h"


@interface PDDOMStorageDomain ()
//Commands

@end

@implementation PDDOMStorageDomain

@dynamic delegate;

+ (NSString *)domainName;
{
    return @"DOMStorage";
}

// Events
- (void)addDOMStorageWithStorage:(PDDOMStorageEntry *)storage;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (storage != nil) {
        [params setObject:[storage PD_JSONObject] forKey:@"storage"];
    }
    
    [self.debuggingServer sendEventWithName:@"DOMStorage.addDOMStorage" parameters:params];
}
- (void)domStorageUpdatedWithStorageId:(NSString *)storageId;
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

    if (storageId != nil) {
        [params setObject:[storageId PD_JSONObject] forKey:@"storageId"];
    }
    
    [self.debuggingServer sendEventWithName:@"DOMStorage.domStorageUpdated" parameters:params];
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
    } else if ([methodName isEqualToString:@"getDOMStorageEntries"] && [self.delegate respondsToSelector:@selector(domain:getDOMStorageEntriesWithStorageId:callback:)]) {
        [self.delegate domain:self getDOMStorageEntriesWithStorageId:[params objectForKey:@"storageId"] callback:^(NSArray *entries, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (entries != nil) {
                [params setObject:entries forKey:@"entries"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"setDOMStorageItem"] && [self.delegate respondsToSelector:@selector(domain:setDOMStorageItemWithStorageId:key:value:callback:)]) {
        [self.delegate domain:self setDOMStorageItemWithStorageId:[params objectForKey:@"storageId"] key:[params objectForKey:@"key"] value:[params objectForKey:@"value"] callback:^(NSNumber *success, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (success != nil) {
                [params setObject:success forKey:@"success"];
            }

            responseCallback(params, error);
        }];
    } else if ([methodName isEqualToString:@"removeDOMStorageItem"] && [self.delegate respondsToSelector:@selector(domain:removeDOMStorageItemWithStorageId:key:callback:)]) {
        [self.delegate domain:self removeDOMStorageItemWithStorageId:[params objectForKey:@"storageId"] key:[params objectForKey:@"key"] callback:^(NSNumber *success, id error) {
            NSMutableDictionary *params = [[NSMutableDictionary alloc] initWithCapacity:1];

            if (success != nil) {
                [params setObject:success forKey:@"success"];
            }

            responseCallback(params, error);
        }];
    } else {
        [super handleMethodWithName:methodName parameters:params responseCallback:responseCallback];
    }
}

@end


@implementation PDDebugger (PDDOMStorageDomain)

- (PDDOMStorageDomain *)DOMStorageDomain;
{
    return [self domainForName:@"DOMStorage"];
}

@end

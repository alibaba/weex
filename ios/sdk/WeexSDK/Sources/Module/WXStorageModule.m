/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXStorageModule.h"
#import "WXSDKManager.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXThreadSafeMutableArray.h"
#import <CommonCrypto/CommonCrypto.h>
#import "WXUtility.h"

static NSString * const WXStorageDirectory            = @"wxstorage";
static NSString * const WXStorageFileName             = @"wxstorage.plist";
static NSString * const WXStorageInfoFileName         = @"wxstorage.info.plist";
static NSString * const WXStorageIndexFileName        = @"wxstorage.index.plist";
static NSUInteger const WXStorageLineLimit            = 1024;
static NSUInteger const WXStorageTotalLimit           = 5 * 1024 * 1024;
static NSString * const WXStorageThreadName           = @"com.taobao.weex.storage";
static NSString * const WXStorageNullValue            = @"#{eulaVlluNegarotSXW}";

@implementation WXStorageModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(length:))
WX_EXPORT_METHOD(@selector(getItem:callback:))
WX_EXPORT_METHOD(@selector(setItem:value:callback:))
WX_EXPORT_METHOD(@selector(setItemPersistent:value:callback:))
WX_EXPORT_METHOD(@selector(getAllKeys:))
WX_EXPORT_METHOD(@selector(removeItem:callback:))

#pragma mark - Export

- (dispatch_queue_t)targetExecuteQueue {
    return [WXStorageModule storageQueue];
}

- (void)length:(WXModuleCallback)callback
{
    callback(@{@"result":@"success",@"data":@([[WXStorageModule memory] count])});
}

- (void)getAllKeys:(WXModuleCallback)callback
{
    callback(@{@"result":@"success",@"data":[WXStorageModule memory].allKeys});
}

- (void)getItem:(NSString *)key callback:(WXModuleCallback)callback
{
    if ([self checkInput:key]) {
        callback(@{@"result":@"failed",@"data":@"key must a string or number!"}); // forgive my english
        return;
    }
    
    if ([key isKindOfClass:[NSNumber class]]) {
        key = [((NSNumber *)key) stringValue]; // oh no!
    }
    
    if ([WXUtility isBlankString:key]) {
        callback(@{@"result":@"failed",@"data":@"invalid_param"});
        return ;
    }
    
    NSString *value = [self.memory objectForKey:key];
    if ([WXStorageNullValue isEqualToString:value]) {
        value = [[WXUtility globalCache] objectForKey:key];
        if (!value) {
            NSString *filePath = [WXStorageModule filePathForKey:key];
            NSString *contents = [WXUtility stringWithContentsOfFile:filePath];
            if (contents) {
                [[WXUtility globalCache] setObject:contents forKey:key cost:contents.length];
                value = contents;
            }
        }
    }
    if (!value) {
        [self executeRemoveItem:key];
        callback(@{@"result":@"failed"});
        return;
    }
    [self updateTimestampForKey:key];
    [self updateIndexForKey:key];
    callback(@{@"result":@"success",@"data":value});
}

- (void)setItem:(NSString *)key value:(NSString *)value callback:(WXModuleCallback)callback
{
    if ([self checkInput:key]) {
        callback(@{@"result":@"failed",@"data":@"key must a string or number!"});
        return;
    }
    if ([self checkInput:value]) {
        callback(@{@"result":@"failed",@"data":@"value must a string or number!"});
        return;
    }
    
    if ([key isKindOfClass:[NSNumber class]]) {
        key = [((NSNumber *)key) stringValue];
    }
    
    if ([value isKindOfClass:[NSNumber class]]) {
        value = [((NSNumber *)value) stringValue];
    }
    
    if ([WXUtility isBlankString:key]) {
        callback(@{@"result":@"failed",@"data":@"invalid_param"});
        return ;
    }
    [self setObject:value forKey:key persistent:NO callback:callback];
}

- (void)setItemPersistent:(NSString *)key value:(NSString *)value callback:(WXModuleCallback)callback
{
    if ([self checkInput:key]) {
        callback(@{@"result":@"failed",@"data":@"key must a string or number!"});
        return;
    }
    if ([self checkInput:value]) {
        callback(@{@"result":@"failed",@"data":@"value must a string or number!"});
        return;
    }
    
    if ([key isKindOfClass:[NSNumber class]]) {
        key = [((NSNumber *)key) stringValue];
    }
    
    if ([value isKindOfClass:[NSNumber class]]) {
        value = [((NSNumber *)value) stringValue];
    }
    
    if ([WXUtility isBlankString:key]) {
        callback(@{@"result":@"failed",@"data":@"invalid_param"});
        return ;
    }
    [self setObject:value forKey:key persistent:YES callback:callback];
}

- (void)removeItem:(NSString *)key callback:(WXModuleCallback)callback
{
    if ([self checkInput:key]) {
        callback(@{@"result":@"failed",@"data":@"key must a string or number!"});
        return;
    }
    
    if ([key isKindOfClass:[NSNumber class]]) {
        key = [((NSNumber *)key) stringValue];
    }
    
    if ([WXUtility isBlankString:key]) {
        callback(@{@"result":@"failed",@"data":@"invalid_param"});
        return ;
    }
    BOOL removed = [self executeRemoveItem:key];
    if (removed) {
        callback(@{@"result":@"success"});
    } else {
        callback(@{@"result":@"failed"});
    }
}

- (BOOL)executeRemoveItem:(NSString *)key {
    if ([WXStorageNullValue isEqualToString:self.memory[key]]) {
        [self.memory removeObjectForKey:key];
        NSDictionary *dict = [self.memory copy];
        [self write:dict toFilePath:[WXStorageModule filePath]];
        dispatch_async([WXStorageModule storageQueue], ^{
            NSString *filePath = [WXStorageModule filePathForKey:key];
            [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
            [[WXUtility globalCache] removeObjectForKey:key];
        });
    } else if (self.memory[key]) {
        [self.memory removeObjectForKey:key];
        NSDictionary *dict = [self.memory copy];
        [self write:dict toFilePath:[WXStorageModule filePath]];
    } else {
        return NO;
    }
    [self removeInfoForKey:key];
    [self removeIndexForKey:key];
    return YES;
}

#pragma mark - Utils
- (void)setObject:(NSString *)obj forKey:(NSString *)key persistent:(BOOL)persistent callback:(WXModuleCallback)callback {
    NSString *filePath = [WXStorageModule filePathForKey:key];
    if (obj.length <= WXStorageLineLimit) {
        if ([WXStorageNullValue isEqualToString:self.memory[key]]) {
            [[WXUtility globalCache] removeObjectForKey:key];
            [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
        }
        self.memory[key] = obj;
        NSDictionary *dict = [self.memory copy];
        [self write:dict toFilePath:[WXStorageModule filePath]];
        [self setInfo:@{@"persistent":@(persistent),@"size":@(obj.length)} ForKey:key];
        [self updateIndexForKey:key];
        [self checkStorageLimit];
        callback(@{@"result":@"success"});
        return;
    }
    
    [[WXUtility globalCache] setObject:obj forKey:key cost:obj.length];
    
    if (![WXStorageNullValue isEqualToString:self.memory[key]]) {
        self.memory[key] = WXStorageNullValue;
        NSDictionary *dict = [self.memory copy];
        [self write:dict toFilePath:[WXStorageModule filePath]];
    }
    
    dispatch_async([WXStorageModule storageQueue], ^{
        [obj writeToFile:filePath atomically:YES encoding:NSUTF8StringEncoding error:NULL];
    });
    
    [self setInfo:@{@"persistent":@(persistent),@"size":@(obj.length)} ForKey:key];
    [self updateIndexForKey:key];
    
    [self checkStorageLimit];
    callback(@{@"result":@"success"});
}

- (void)checkStorageLimit {
    NSInteger size = [self totalSize] - WXStorageTotalLimit;
    if (size > 0) {
        [self removeItemsBySize:size];
    }
}

- (void)removeItemsBySize:(NSInteger)size {
    NSArray *indexs = [[self indexs] copy];
    if (size < 0 || indexs.count == 0) {
        return;
    }
    
    NSMutableArray *removedKeys = [NSMutableArray array];
    for (NSInteger i = 0; i < indexs.count; i++) {
        NSString *key = indexs[i];
        NSDictionary *info = [self getInfoForKey:key];
        
        // persistent data, can't be removed
        if ([info[@"persistent"] boolValue]) {
            continue;
        }
        
        [removedKeys addObject:key];
        size -= [info[@"size"] integerValue];
        
        if (size < 0) {
            break;
        }
    }
    
    // actually remove data
    for (NSString *key in removedKeys) {
        [self executeRemoveItem:key];
    }
}

- (void)write:(NSDictionary *)dict toFilePath:(NSString *)filePath{
    [dict writeToFile:filePath atomically:YES];
}

+ (NSString *)filePathForKey:(NSString *)key
{
    NSString *safeFileName = [WXUtility md5:key];
    
    return [[WXStorageModule directory] stringByAppendingPathComponent:safeFileName];
}

+ (void)setupDirectory{
    BOOL isDirectory = NO;
    BOOL fileExists = [[NSFileManager defaultManager] fileExistsAtPath:[WXStorageModule directory] isDirectory:&isDirectory];
    if (!isDirectory && !fileExists) {
        [[NSFileManager defaultManager] createDirectoryAtPath:[WXStorageModule directory]
                                  withIntermediateDirectories:YES
                                                   attributes:nil
                                                        error:NULL];
    }
}

+ (NSString *)directory {
    static NSString *storageDirectory = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        storageDirectory = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
        storageDirectory = [storageDirectory stringByAppendingPathComponent:WXStorageDirectory];
    });
    return storageDirectory;
}

+ (NSString *)filePath {
    static NSString *storageFilePath = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        storageFilePath = [[WXStorageModule directory] stringByAppendingPathComponent:WXStorageFileName];
    });
    return storageFilePath;
}

+ (NSString *)infoFilePath {
    static NSString *infoFilePath = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        infoFilePath = [[WXStorageModule directory] stringByAppendingPathComponent:WXStorageInfoFileName];
    });
    return infoFilePath;
}

+ (NSString *)indexFilePath {
    static NSString *indexFilePath = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        indexFilePath = [[WXStorageModule directory] stringByAppendingPathComponent:WXStorageIndexFileName];
    });
    return indexFilePath;
}

+ (dispatch_queue_t)storageQueue {
    static dispatch_queue_t storageQueue;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        storageQueue = dispatch_queue_create("com.taobao.weex.storage", DISPATCH_QUEUE_SERIAL);
    });
    return storageQueue;
}

+ (WXThreadSafeMutableDictionary<NSString *, NSString *> *)memory {
    static WXThreadSafeMutableDictionary<NSString *,NSString *> *memory;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [WXStorageModule setupDirectory];
        
        if ([[NSFileManager defaultManager] fileExistsAtPath:[WXStorageModule filePath]]) {
            NSDictionary *contents = [NSDictionary dictionaryWithContentsOfFile:[WXStorageModule filePath]];
            if (contents) {
                memory = [[WXThreadSafeMutableDictionary alloc] initWithDictionary:contents];
            }
        }
        if (!memory) {
            memory = [WXThreadSafeMutableDictionary new];
        }
//        [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationDidReceiveMemoryWarningNotification object:nil queue:nil usingBlock:^(__unused NSNotification *note) {
//            [memory removeAllObjects];
//        }];
    });
    return memory;
}

+ (WXThreadSafeMutableDictionary<NSString *, NSDictionary *> *)info {
    static WXThreadSafeMutableDictionary<NSString *,NSDictionary *> *info;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [WXStorageModule setupDirectory];
        
        if ([[NSFileManager defaultManager] fileExistsAtPath:[WXStorageModule infoFilePath]]) {
            NSDictionary *contents = [NSDictionary dictionaryWithContentsOfFile:[WXStorageModule infoFilePath]];
            if (contents) {
                info = [[WXThreadSafeMutableDictionary alloc] initWithDictionary:contents];
            }
        }
        if (!info) {
            info = [WXThreadSafeMutableDictionary new];
        }
    });
    return info;
}

+ (WXThreadSafeMutableArray *)indexs {
    static WXThreadSafeMutableArray *indexs;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [WXStorageModule setupDirectory];
        
        if ([[NSFileManager defaultManager] fileExistsAtPath:[WXStorageModule indexFilePath]]) {
            NSArray *contents = [NSArray arrayWithContentsOfFile:[WXStorageModule indexFilePath]];
            if (contents) {
                indexs = [[WXThreadSafeMutableArray alloc] initWithArray:contents];
            }
        }
        if (!indexs) {
            indexs = [WXThreadSafeMutableArray new];
        }
    });
    return indexs;
}

- (WXThreadSafeMutableDictionary<NSString *, NSString *> *)memory {
    return [WXStorageModule memory];
}

- (WXThreadSafeMutableDictionary<NSString *, NSDictionary *> *)info {
    return [WXStorageModule info];
}

- (WXThreadSafeMutableArray *)indexs {
    return [WXStorageModule indexs];
}

- (BOOL)checkInput:(id)input{
    return !([input isKindOfClass:[NSString class]] || [input isKindOfClass:[NSNumber class]]);
}

#pragma mark
#pragma mark - Storage Info method
- (NSDictionary *)getInfoForKey:(NSString *)key {
    NSDictionary *info = [[self info] objectForKey:key];
    if (!info) {
        return nil;
    }
    return info;
}

- (void)setInfo:(NSDictionary *)info ForKey:(NSString *)key {
    NSAssert(info, @"info must not be nil");
    
    // save info for key
    NSMutableDictionary *newInfo = [NSMutableDictionary dictionaryWithDictionary:info];
    NSTimeInterval interval = [[NSDate date] timeIntervalSince1970];
    [newInfo setObject:@(interval) forKey:@"ts"];
    
    [[self info] setObject:[newInfo copy] forKey:key];
    NSDictionary *dict = [[self info] copy];
    [self write:dict toFilePath:[WXStorageModule infoFilePath]];
}

- (void)removeInfoForKey:(NSString *)key {
    [[self info] removeObjectForKey:key];
    NSDictionary *dict = [[self info] copy];
    [self write:dict toFilePath:[WXStorageModule infoFilePath]];
}

- (void)updateTimestampForKey:(NSString *)key {
    NSTimeInterval interval = [[NSDate date] timeIntervalSince1970];
    NSDictionary *info = [[self info] objectForKey:key];
    if (!info) {
        info = @{@"persistent":@(NO),@"size":@(0),@"ts":@(interval)};
    } else {
        NSMutableDictionary *newInfo = [NSMutableDictionary dictionaryWithDictionary:info];
        [newInfo setObject:@(interval) forKey:@"ts"];
        info = [newInfo copy];
    }
    
    [[self info] setObject:info forKey:key];
    NSDictionary *dict = [[self info] copy];
    [self write:dict toFilePath:[WXStorageModule infoFilePath]];
}

- (NSInteger)totalSize {
    NSInteger totalSize = 0;
    for (NSDictionary *info in [self info].allValues) {
        totalSize += (info[@"size"] ? [info[@"size"] integerValue] : 0);
    }
    return totalSize;
}

#pragma mark
#pragma mark - Storage Index method
- (void)updateIndexForKey:(NSString *)key {
    [[self indexs] removeObject:key];
    [[self indexs] addObject:key];
    [self write:[[self indexs] copy] toFilePath:[WXStorageModule indexFilePath]];
}

- (void)removeIndexForKey:(NSString *)key {
    [[self indexs] removeObject:key];
    [self write:[[self indexs] copy] toFilePath:[WXStorageModule indexFilePath]];
}

@end


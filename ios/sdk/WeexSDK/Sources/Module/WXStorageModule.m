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
#import <CommonCrypto/CommonCrypto.h>
#import "WXUtility.h"

static NSString * const WXStorageDirectory            = @"wxstorage";
static NSString * const WXStorageFileName             = @"wxstorage.plist";
static NSUInteger const WXStorageLineLimit            = 1024;
static NSString * const WXStorageThreadName           = @"com.taobao.weex.storage";
static NSString * const WXStorageNullValue            = @"#{eulaVlluNegarotSXW}";

@implementation WXStorageModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(length:))
WX_EXPORT_METHOD(@selector(getItem:callback:))
WX_EXPORT_METHOD(@selector(setItem:value:callback:))
WX_EXPORT_METHOD(@selector(getAllKeys:))
WX_EXPORT_METHOD(@selector(removeItem:callback:))

#pragma mark - Export

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
    
    __weak typeof(self) weakSelf = self;
    dispatch_async([WXStorageModule storageQueue], ^{
        WXStorageModule *strongSelf = weakSelf;
        NSString *value = [strongSelf.memory objectForKey:key];
        if ([WXStorageNullValue isEqualToString:value]) {
            value = [[WXUtility globalCache] objectForKey:key];
            if (!value) {
                dispatch_async([WXStorageModule storageQueue], ^{
                    WXStorageModule *strongSelf = weakSelf;
                    NSString *filePath = [WXStorageModule filePathForKey:key];
                    NSString *contents = [WXUtility stringWithContentsOfFile:filePath];
                    if (contents) {
                        [[WXUtility globalCache] setObject:contents forKey:key cost:contents.length];
                        callback(@{@"result":@"success",@"data":contents});
                    } else {
                        [strongSelf.memory removeObjectForKey:key];
                        callback(@{@"result":@"failed"});
                    }
                });
                return;
            }
        }
        if (!value) {
            callback(@{@"result":@"failed"});
            return ;
        }
        callback(@{@"result":@"success",@"data":value});
    });
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
    [self setObject:value forKey:key callback:callback];
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
    __weak typeof(self) weakSelf = self;
    dispatch_async([WXStorageModule storageQueue], ^{
        WXStorageModule *strongSelf = weakSelf;
        if ([WXStorageNullValue isEqualToString:strongSelf.memory[key]]) {
            [strongSelf.memory removeObjectForKey:key];
            dispatch_async([WXStorageModule storageQueue], ^{
                NSString *filePath = [WXStorageModule filePathForKey:key];
                [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
                [[WXUtility globalCache] removeObjectForKey:key];
            });
        } else if (strongSelf.memory[key]) {
            [strongSelf.memory removeObjectForKey:key];
            WXStorageModule *strongSelf = weakSelf;
            NSDictionary *dict = [strongSelf.memory copy];
            [strongSelf write:dict toFilePath:[WXStorageModule filePath]];
        }else{
            callback(@{@"result":@"failed"});
            return ;
        }
        callback(@{@"result":@"success"});
    });
}

#pragma mark - Utils

- (void)setObject:(NSString *)obj forKey:(NSString *)key callback:(WXModuleCallback)callback{
    __weak typeof(self) weakSelf = self;
    dispatch_async([WXStorageModule storageQueue], ^{
        WXStorageModule *strongSelf = weakSelf;
        NSString *filePath = [WXStorageModule filePathForKey:key];
        if (obj.length <= WXStorageLineLimit) {
            if ([WXStorageNullValue isEqualToString:strongSelf.memory[key]]) {
                [[WXUtility globalCache] removeObjectForKey:key];
                [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
            }
            strongSelf.memory[key] = obj;
            NSDictionary *dict = [strongSelf.memory copy];
            [strongSelf write:dict toFilePath:[WXStorageModule filePath]];
            callback(@{@"result":@"success"});
            return;
        }
        
        [[WXUtility globalCache] setObject:obj forKey:key cost:obj.length];
        
        if (![WXStorageNullValue isEqualToString:strongSelf.memory[key]]) {
            strongSelf.memory[key] = WXStorageNullValue;
            WXStorageModule *strongSelf = weakSelf;
            NSDictionary *dict = [strongSelf.memory copy];
            [strongSelf write:dict toFilePath:[WXStorageModule filePath]];
        }
        
        dispatch_async([WXStorageModule storageQueue], ^{
            [obj writeToFile:filePath atomically:YES encoding:NSUTF8StringEncoding error:NULL];
        });
        
        callback(@{@"result":@"success"});
    });
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

- (WXThreadSafeMutableDictionary<NSString *, NSString *> *)memory {
    return [WXStorageModule memory];
}

- (BOOL)checkInput:(id)input{
    return !([input isKindOfClass:[NSString class]] || [input isKindOfClass:[NSNumber class]]);
}

@end


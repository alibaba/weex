/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXStorageModule.h"
#import "WXSDKManager.h"
#import "WXUtility.h"
#import "WXAssert.h"
#import <CommonCrypto/CommonCrypto.h>

static NSString * const WXStorageDirectory            = @"wxstorage_v1";
static NSString * const WXStorageFileName             = @"wxstorage.json";
static NSUInteger const WXStorageInlineValueThreshold = 1024;
static NSString * const WXStorageThreadName           = @"com.taobao.weex.storage";

static dispatch_queue_t WXStorageGetMethodQueue() {
    static dispatch_queue_t storageQueue;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        storageQueue = dispatch_queue_create("com.taobao.weex.storage", DISPATCH_QUEUE_SERIAL);
    });
    return storageQueue;
}

static NSString * WXStorageGetDirectory() {
    static NSString *storageDirectory = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        storageDirectory = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
        storageDirectory = [storageDirectory stringByAppendingPathComponent:WXStorageDirectory];
    });
    return storageDirectory;
}

static NSString * WXStorageGetFilePath() {
    static NSString *storageFilePath = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        storageFilePath = [WXStorageGetDirectory() stringByAppendingPathComponent:WXStorageFileName];
    });
    return storageFilePath;
}

static NSString * WXStorageReadFile(NSString *filePath, NSString *filename, NSError **errorOut)
{
    if ([[NSFileManager defaultManager] fileExistsAtPath:filePath]) {
        NSStringEncoding encoding;
        NSString *entryString = [NSString stringWithContentsOfFile:filePath usedEncoding:&encoding error:errorOut];
        if (*errorOut){
            return nil;
        }else if (encoding != NSUTF8StringEncoding) {
            *errorOut = [WXUtility errorWithCode:0 message:[NSString stringWithFormat:@"Incorrect encoding of storage file: %@, key: %@",@(encoding),filename]];
        } else {
            return entryString;
        }
    }
    return nil;
}

static id WXStorageJSONParse(NSString *jsonString, BOOL mutable, NSError **error)
{
    if (jsonString) {
        // The result of invoking dataUsingEncoding:allowLossyConversion: with NO as the second argument (that is, requiring lossless conversion).
        NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
        if (!jsonData) {
            *error = [WXUtility errorWithCode:0 message:@"JSONParse received invalid UTF8 data"];
            return nil;
        }
        NSJSONReadingOptions options = NSJSONReadingAllowFragments;
        if (mutable) {
            options |= NSJSONReadingMutableContainers;
        }
        return [NSJSONSerialization JSONObjectWithData:jsonData
                                               options:options
                                                 error:error];
    }
    return nil;
}

static NSString *WXMD5Hash(NSString *string)
{
    const char *str = string.UTF8String;
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(str, (CC_LONG)strlen(str), result);
    
    return [NSString stringWithFormat:@"%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x",
            result[0], result[1], result[2], result[3],
            result[4], result[5], result[6], result[7],
            result[8], result[9], result[10], result[11],
            result[12], result[13], result[14], result[15]
            ];
}


@implementation WXStorageModule {
    BOOL _haveSetup;
    NSMutableDictionary<NSString *, NSString *> * _storage;
}

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(length:))
WX_EXPORT_METHOD(@selector(getItem:callback:))
WX_EXPORT_METHOD(@selector(setItem:value:callback:))
WX_EXPORT_METHOD(@selector(getAllKeys:))
WX_EXPORT_METHOD(@selector(removeItem:callback:))

- (void)dealloc{
    [_storage removeAllObjects];
}

#pragma mark - Export

- (void)length:(WXModuleCallback)callback
{
    NSError *error;
    [self ensureSetup:&error];
    
    if (error) {
        callback(@{@"result":@"failed",@"data":error.description});
        return ;
    }
    NSDictionary *fileAttrs = [[NSFileManager defaultManager] attributesOfItemAtPath:WXStorageGetFilePath() error:&error];
    if (error) {
        callback(@{@"result":@"failed",@"data":error.description});
    }else if (fileAttrs){
        callback(@{@"result":@"success",@"data":@([fileAttrs fileSize])});
    }else{
        callback(@{@"result":@"failed",@"data":@"unknown error!"});
    }
}

- (void)getAllKeys:(WXModuleCallback)callback
{
    NSError *error;
    [self ensureSetup:&error];
    
    if (error) {
        callback(@{@"result":@"failed",@"data":error.description});
        return ;
    }
    callback(@{@"result":@"failed",@"data":_storage.allKeys});
}

- (void)getItem:(NSString *)key callback:(WXModuleCallback)callback
{
    NSError *error;
    [self ensureSetup:&error];
    
    if (error) {
        callback(@{@"result":@"failed",@"data":error.description});
        return ;
    }
    
    __weak typeof(self) weakSelf = self;
    dispatch_async(WXStorageGetMethodQueue(), ^{
        WXStorageModule *strongSelf = weakSelf;
        NSString *value = strongSelf->_storage[key];
        if (value == (id)kCFNull) {
            value = [[WXUtility globalCache] objectForKey:key];
            if (!value) {
                NSString *filePath = [strongSelf filePathForKey:key];
                NSError *error;
                value = WXStorageReadFile(filePath, key, &error);
                if (value) {
                    [[WXUtility globalCache] setObject:value forKey:key cost:value.length];
                } else {
                    [strongSelf->_storage removeObjectForKey:key];
                }
            }
        }
        if (!value) { // nil
            callback(@{@"result":@"failed"});
            return ;
        }
        callback(@{@"result":@"success",@"data":value});
    });
}

- (void)setItem:(NSString *)key value:(NSString *)value callback:(WXModuleCallback)callback
{
    NSError *error = nil;
    [self ensureSetup:&error];
    
    if (error) {
        callback(@{@"result":@"failed",@"data":error.description});
        return ;
    }
    __weak typeof(self) weakSelf = self;
    dispatch_async(WXStorageGetMethodQueue(), ^{
        NSError *errorOut = nil;
        BOOL changedStorage = NO;
        [weakSelf writeEntry:@[key,value] changedStorage:&changedStorage errorOut:&errorOut];
        if (error) {
            callback(@{@"result":@"failed",@"data":error.description});
            return ;
        }
        
        if (changedStorage) {
            [weakSelf writeStorage];
        }
        callback(@{@"result":@"success"});
    });
}

- (void)removeItem:(NSString *)key callback:(WXModuleCallback)callback
{
    NSError *error;
    [self ensureSetup:&error];
    
    if (error) {
        callback(@{@"result":@"failed",@"data":error.userInfo});
        return ;
    }
    
    __weak typeof(self) weakSelf = self;
    dispatch_async(WXStorageGetMethodQueue(), ^{
        WXStorageModule *strongSelf = weakSelf;
        if (strongSelf->_storage[key] == (id)kCFNull) {
            NSString *filePath = [weakSelf filePathForKey:key];
            [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
            [[WXUtility globalCache] removeObjectForKey:key];
            [strongSelf->_storage removeObjectForKey:key];
        } else if (strongSelf->_storage[key]) {
            [strongSelf->_storage removeObjectForKey:key];
            [strongSelf writeStorage];
        }
        callback(@{@"result":@"success"});
    });
}

#pragma mark - Utils

- (NSString *)filePathForKey:(NSString *)key
{
    NSString *safeFileName = WXMD5Hash(key);
    return [WXStorageGetDirectory() stringByAppendingPathComponent:safeFileName];
}

- (void)ensureSetup:(NSError **)error
{
    BOOL isDirectory = NO;
    BOOL fileExists = [[NSFileManager defaultManager] fileExistsAtPath:WXStorageGetDirectory() isDirectory:&isDirectory];
    if (!isDirectory && !fileExists) {
        [[NSFileManager defaultManager] createDirectoryAtPath:WXStorageGetDirectory()
                                  withIntermediateDirectories:YES
                                                   attributes:nil
                                                        error:error];
        if (*error) {
            return;
        }
    }
    if (!_haveSetup) {
        NSString *serialized = WXStorageReadFile(WXStorageGetFilePath(), nil, error);
        _storage = serialized ? WXStorageJSONParse(serialized,YES, error) : [NSMutableDictionary new];
        if (error) {
            _storage = [NSMutableDictionary new];
        }
        _haveSetup = YES;
    }
}

- (void)writeEntry:(NSArray<NSString *> *)entry changedStorage:(BOOL *)changedStorage errorOut:(NSError **)error
{
    if (entry.count != 2) {
        *error = [WXUtility errorWithCode:0 message:@"Entries must be arrays of the form [key: string, value: string]"];
        return ;
    }
    NSString *key = entry[0];
    
    NSString *value = entry[1];
    NSString *filePath = [self filePathForKey:key];
    
    if (value.length <= WXStorageInlineValueThreshold) {
        if (_storage[key] == (id)kCFNull) {
            [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
            [[WXUtility globalCache] removeObjectForKey:key];
        }
        *changedStorage = YES;
        _storage[key] = value;
        return;
    }
    
    [value writeToFile:filePath atomically:YES encoding:NSUTF8StringEncoding error:error];
    [[WXUtility globalCache] setObject:value forKey:key cost:value.length];
    if (*error) {
        return ;
    } else if (_storage[key] != (id)kCFNull) {
        *changedStorage = YES;
        _storage[key] = (id)kCFNull;
    }
}

- (BOOL)writeStorage
{
    NSError *error;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:_storage
                                                       options:(NSJSONWritingOptions)0
                                                         error:&error];
    if (error) {
        return NO;
    }
    NSString *serialized = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    
    return [serialized writeToFile:WXStorageGetFilePath()
                        atomically:YES
                          encoding:NSUTF8StringEncoding
                             error:&error];
}

@end


/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXStorageModule.h"
#import <WeexSDK/WXSDKManager.h>
#import <WeexSDK/WXUtility.h>

#define defaultKey  @"default"
#define LocalStoreFile @"store.plist"

@implementation WXStorageModule
{
    NSString *_plist;
    BOOL _setupFinished;
}

@synthesize weexInstance;


WX_EXPORT_METHOD(@selector(mutiSet:callback:))
WX_EXPORT_METHOD(@selector(mutiGet:callback:))
WX_EXPORT_METHOD(@selector(mutiRemove:callback:))
WX_EXPORT_METHOD(@selector(clear:))

static dispatch_queue_t WXStorageQueue()
{
    static dispatch_queue_t queue;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        queue = dispatch_queue_create("com.taobao.weex.storageQueue", NULL);
    });
    return queue;
}

- (id)init
{
    self= [super init];
    if (self) {
        [self setup];
    }
    return self;
}

- (void)setup
{
    _setupFinished = NO;
    _plist = [WXDocumentPath stringByAppendingString: LocalStoreFile];
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if (![fileManager fileExistsAtPath:_plist]) {
        BOOL ret = [fileManager createFileAtPath:_plist contents:nil attributes:nil];
        if (ret) {
            _setupFinished = YES;
        }
    }
    else {
        _setupFinished = YES;
    }
}

- (void)mutiSet:(id)data callback:(NSString *)callback {
    
    if (!_setupFinished) {
        return;
    }
    
    dispatch_async(WXStorageQueue(), ^{
        NSData *storeData = [NSData dataWithContentsOfFile:_plist];
        NSKeyedUnarchiver *unarchiver = [[NSKeyedUnarchiver alloc] initForReadingWithData:storeData];
        NSMutableDictionary *inputDict = [unarchiver decodeObjectForKey:defaultKey] ;
        [unarchiver finishDecoding];
        
        if (!inputDict) {
            inputDict = [NSMutableDictionary new];
        }
    
        NSEnumerator *enumerator = [data keyEnumerator];
        NSString *key;
        while ((key = [enumerator nextObject])) {
            id object = [data objectForKey:key];
            [inputDict setObject:object forKey:key];
            [WXGlobalCache setObject:object forKey:key];
        }
        
        NSMutableData *ouputData = [[NSMutableData alloc] init];
        NSKeyedArchiver *archiver = [[NSKeyedArchiver alloc] initForWritingWithMutableData:ouputData];
        [archiver encodeObject:inputDict forKey:defaultKey];
        [archiver finishEncoding];
        
        [ouputData writeToFile:_plist atomically:YES];
        
        NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithObjectsAndKeys:
                                           @"success", @"result",
                                            nil];
        NSString *params = WXEncodeJson(dict);
        [[WXSDKManager bridgeMgr] callBack:self.weexInstance.instanceId funcId:callback params:params];
    });
}

-(void)mutiGet:(id)data callback:(NSString *)callback
{
    if (!_setupFinished || ![data isKindOfClass:[NSArray class]]) {
        return;
    }
    
    dispatch_async(WXStorageQueue(), ^{
        
        NSMutableArray *keys = [NSMutableArray arrayWithArray:data];
        NSMutableDictionary *retValue = [NSMutableDictionary new];
        
        for (id key in data) {
            id object = [WXGlobalCache objectForKey:key];
            if (object) {
                [retValue setObject:object forKey:key];
                [keys removeObject:key];
            }
        }
        
        if ([keys count] > 0) {
            NSData *storeData = [NSData dataWithContentsOfFile:_plist];
            NSKeyedUnarchiver *unarchiver = [[NSKeyedUnarchiver alloc] initForReadingWithData:storeData];
            NSDictionary *inputDict = [unarchiver decodeObjectForKey:defaultKey];
            [unarchiver finishDecoding];
            
            for (id key in keys) {
                id object = [inputDict objectForKey:key];
                if (object) {
                    [retValue setObject:object forKey:key];
                    [WXGlobalCache setObject:object forKey:key];
                }
                else {
                    [retValue setObject:@"" forKey:key];
                }
            }
        }
        
        NSString *params = WXEncodeJson(retValue);
        [[WXSDKManager bridgeMgr] callBack:self.weexInstance.instanceId funcId:callback params:params];
    });
}

- (void)mutiRemove:(id)data callback:(NSString *)callback
{
    if (!_setupFinished || ![data isKindOfClass:[NSArray class]]) {
        return;
    }
    
    dispatch_async(WXStorageQueue(), ^{
        NSArray *keys = (NSArray *)data;
        NSData *storeData = [NSData dataWithContentsOfFile:_plist];
        NSKeyedUnarchiver *unarchiver = [[NSKeyedUnarchiver alloc] initForReadingWithData:storeData];
        NSMutableDictionary *inputDict = [unarchiver decodeObjectForKey:defaultKey];
        [unarchiver finishDecoding];
        
        for (NSString *key in keys) {
            [inputDict removeObjectForKey:key];
            [WXGlobalCache removeObjectForKey:key];
        }
        
        NSMutableData *ouputData = [[NSMutableData alloc] init];
        NSKeyedArchiver *archiver = [[NSKeyedArchiver alloc] initForWritingWithMutableData:ouputData];
        [archiver encodeObject:inputDict forKey:defaultKey];
        [archiver finishEncoding];
        
        [ouputData writeToFile:_plist atomically:YES];
        
        NSMutableDictionary *dict = [NSMutableDictionary dictionaryWithObjectsAndKeys:
                                     @"success", @"result",
                                     nil];
        NSString *params = WXEncodeJson(dict);
        [[WXSDKManager bridgeMgr] callBack:self.weexInstance.instanceId funcId:callback params:params];
    });
}

- (void)clear:(NSString *)callback
{
    if (!_setupFinished) {
        return;
    }
    
    dispatch_async(WXStorageQueue(), ^{
        NSData *storeData = [NSData dataWithContentsOfFile:_plist];
        NSKeyedUnarchiver *unarchiver = [[NSKeyedUnarchiver alloc] initForReadingWithData:storeData];
        NSMutableDictionary *inputDict = [unarchiver decodeObjectForKey:defaultKey];
        [unarchiver finishDecoding];
        
        [inputDict removeAllObjects];
        [WXGlobalCache removeAllObjects];
        
        NSMutableData *ouputData = [[NSMutableData alloc] init];
        NSKeyedArchiver *archiver = [[NSKeyedArchiver alloc] initForWritingWithMutableData:ouputData];
        [archiver encodeObject:inputDict forKey:defaultKey];
        [archiver finishEncoding];
    });
}

@end


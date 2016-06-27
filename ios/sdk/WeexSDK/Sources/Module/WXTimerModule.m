/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXTimerModule.h"
#import "WXSDKManager.h"

@interface WXTimerModule ()

@property (nonatomic, strong) NSMutableDictionary *timerMap;

@end

@implementation WXTimerModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(setTimeout:time:))
WX_EXPORT_METHOD(@selector(clearTimeout:))

// When timer fires notify JS
- (void)timerRespones:(NSInteger) callbackId {
    if (self.weexInstance) {
        [[WXSDKManager bridgeMgr] callBack:self.weexInstance.instanceId funcId:[@(callbackId) stringValue] params:nil];
    }
    [self clearTimeout:callbackId];
}

// Add timer
- (void)setTimeout:(NSInteger)callbackId time:(NSInteger)time {
    SEL method = @selector(timerRespones:);
    NSMethodSignature *signature = [self methodSignatureForSelector:method];
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    [invocation setTarget: self];
    [invocation setSelector:method];
    [invocation setArgument:&callbackId atIndex:2];

    NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:time/1000.0 invocation:invocation repeats:NO];
    [[NSRunLoop mainRunLoop] addTimer:timer forMode:NSDefaultRunLoopMode];

    if (_timerMap == nil) {
        _timerMap = [[NSMutableDictionary alloc] init];
    }

    [_timerMap setValue:timer forKey:[@(callbackId) stringValue]];
}

// Remove Timer
- (void)clearTimeout:(NSInteger)callbackId  {
    NSString *key = [@(callbackId) stringValue];
    NSTimer *timer = [_timerMap valueForKey:key];
    if (timer) {
        [timer invalidate];
        timer = nil;
        [_timerMap removeObjectForKey:key];
    }
}

- (void)dealloc {
    if (_timerMap) {
        for (NSString *key in _timerMap) {
            NSTimer *timer = [_timerMap valueForKey:key];
            [timer invalidate];
            timer = nil;
        }
        [_timerMap removeAllObjects];
        _timerMap = nil;
    }
}

@end

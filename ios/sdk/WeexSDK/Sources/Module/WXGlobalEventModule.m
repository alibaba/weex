/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXGlobalEventModule.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXThreadSafeMutableArray.h"
#import "WXLog.h"

@interface WXGlobalEventModule()
@property WXThreadSafeMutableDictionary *eventCallback;
@end
@implementation WXGlobalEventModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(addEventListener:callback:))
WX_EXPORT_METHOD(@selector(removeEventListener:))

- (instancetype)init {
    if (self = [super init]) {
        _eventCallback = [WXThreadSafeMutableDictionary new];
    }
    return self;
}

- (void)addEventListener:(NSString *)event callback:(WXModuleKeepAliveCallback)callback
{
    WXThreadSafeMutableArray * array = nil;
    if (_eventCallback[event]) {
        [_eventCallback[event] addObject:callback];
    } else {
        array = [[WXThreadSafeMutableArray alloc] init];
        [array addObject:callback];
        _eventCallback[event] = array;
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(fireGlobalEvent:) name:event object:weexInstance];
    }
}

- (void)removeEventListener:(NSString *)event
{
    if (_eventCallback[event]) {
        [_eventCallback removeObjectForKey:event];
        [[NSNotificationCenter defaultCenter] removeObserver:self name:event object:weexInstance];
    } else {
        WXLogWarning(@"eventName \"%@\" doesn't exist", event);
    }
}

- (void)fireGlobalEvent:(NSNotification *)notification
{
    NSDictionary * userInfo = notification.userInfo;
    WXSDKInstance * userWeexInstance = userInfo[@"weexInstance"];
    NSDictionary * param = userInfo[@"param"];
    if (userWeexInstance == weexInstance) {
        for (WXModuleKeepAliveCallback callback in _eventCallback[notification.name]) {
            callback(param, true);
        }
    }
}

@end

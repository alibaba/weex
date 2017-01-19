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
#import "WXSDKManager.h"

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
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(fireGlobalEvent:) name:event object:nil];
    }
}

- (void)removeEventListener:(NSString *)event
{
    if (_eventCallback[event]) {
        [_eventCallback removeObjectForKey:event];
        [[NSNotificationCenter defaultCenter] removeObserver:self name:event object:nil];
    } else {
        WXLogWarning(@"eventName \"%@\" doesn't exist", event);
    }
}

- (void)fireGlobalEvent:(NSNotification *)notification
{
    NSDictionary * userInfo = notification.userInfo;
    NSString * userWeexInstanceId = userInfo[@"weexInstance"];
    /*
     1. The userWeexInstanceId param will be passed by globalEvent module notification.
     2. The notification is posted by native user using Notificationcenter, native user don't need care about what the userWeexInstanceId is. What you do is to addEventListener in weex file using globalEvent module, and then post notification anywhere.
     */
    WXSDKInstance * userWeexInstance = [WXSDKManager instanceForID:userWeexInstanceId];
     // In case that userInstanceId exists but instance has been dealloced
    if (!userWeexInstanceId || userWeexInstance == weexInstance) {
        
        for (WXModuleKeepAliveCallback callback in _eventCallback[notification.name]) {
            callback(userInfo[@"param"], true);
        }
    }
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [_eventCallback removeAllObjects];
}

@end

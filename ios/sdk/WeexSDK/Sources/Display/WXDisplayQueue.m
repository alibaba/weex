/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXDisplayQueue.h"

#define MAX_CONCURRENT_COUNT 8

static dispatch_semaphore_t WXDisplayConcurrentSemaphore;

@implementation WXDisplayQueue

+ (dispatch_queue_t)displayQueue
{
    static dispatch_queue_t displayQueue = NULL;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        displayQueue = dispatch_queue_create("com.taobao.weex.displayQueue", DISPATCH_QUEUE_CONCURRENT);
        dispatch_set_target_queue(displayQueue, dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0));
    });
    
    return displayQueue;
}

+ (void)addBlock:(void(^)())block
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        NSUInteger processorCount = [NSProcessInfo processInfo].activeProcessorCount;
        NSUInteger maxConcurrentCount = processorCount <= MAX_CONCURRENT_COUNT ? processorCount : MAX_CONCURRENT_COUNT;
        WXDisplayConcurrentSemaphore = dispatch_semaphore_create(maxConcurrentCount);
    });
    
    dispatch_async([self displayQueue], ^{
        dispatch_semaphore_wait(WXDisplayConcurrentSemaphore, DISPATCH_TIME_FOREVER);
        block();
        dispatch_semaphore_signal(WXDisplayConcurrentSemaphore);
    });
}

@end

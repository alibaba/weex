/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "TestSupportUtils.h"

@implementation TestSupportUtils

static dispatch_once_t onceToken;

+(void)waitSecs:(NSTimeInterval)secs{
    NSDate *timeoutDate = [NSDate dateWithTimeIntervalSinceNow:secs];
    while ( [timeoutDate timeIntervalSinceNow] > 0) {
        CFRunLoopRunInMode(kCFRunLoopDefaultMode, 0.01, YES);
    }
}

@end

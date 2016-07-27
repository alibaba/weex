/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "NSArray+Weex.h"

@implementation NSArray (Weex)

- (id)wx_safeObjectAtIndex:(NSUInteger)index
{
    if (index >= self.count) {
        return nil;
    }
    
    return [self objectAtIndex:index];
}

@end

@implementation NSMutableArray (Weex)

// It's quite ingenius, using a Category to allow the creation of a mutable array that does no retain/release by backing it with a CFArray with proper callbacks.http://stackoverflow.com/questions/4692161/non-retaining-array-for-delegates
+ (id)wx_mutableArrayUsingWeakReferences {
    return [self wx_mutableArrayUsingWeakReferencesWithCapacity:0];
}

+ (id)wx_mutableArrayUsingWeakReferencesWithCapacity:(NSUInteger)capacity {
    CFArrayCallBacks callbacks = {0, NULL, NULL, CFCopyDescription, CFEqual};
    // We create a weak reference array
    return (__bridge id)(CFArrayCreateMutable(0, capacity, &callbacks));
}

+ (void)wx_releaseArray:(id)array {
    
    CFBridgingRelease((__bridge CFArrayRef _Nullable)(array));
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXPolyfillSet.h"

@implementation WXPolyfillSet
{
    NSMutableSet *_set;
}

+ (instancetype)create
{
    WXPolyfillSet *jsSet = [WXPolyfillSet new];
    jsSet->_set = [NSMutableSet set];
    return jsSet;
}

- (BOOL)has:(id)value
{
    return [_set containsObject:value];
}

- (NSUInteger)size
{
    return _set.count;
}

- (void)add:(id)value
{
    [_set addObject:value];
}

- (BOOL)delete:(id)value
{
    if ([_set containsObject:value]) {
        [_set removeObject:value];
        return YES;
    }
    
    return NO;
}

- (void)clear
{
    [_set removeAllObjects];
}

@end


/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXThreadSafeCounter.h"
#import <libkern/OSAtomic.h>

@implementation WXThreadSafeCounter{
    int32_t _value;
}

- (int32_t)value
{
    return _value;
}

- (int32_t)increase {
    return OSAtomicIncrement32(&_value);
}

@end

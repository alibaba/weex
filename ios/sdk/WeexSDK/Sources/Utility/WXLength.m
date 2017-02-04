/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXLength.h"
#import "WXAssert.h"

@implementation WXLength
{
    float _value;
    WXLengthType _type;
}

+ (instancetype)lengthWithValue:(float)value type:(WXLengthType)type
{
    WXLength *length = [WXLength new];
    length->_value = value;
    length->_type = type;
    return length;
}

- (float)valueForMaximumValue:(float)maximumValue
{
    switch (_type) {
        case WXLengthTypeFixed:
            return _value;
        case WXLengthTypePercent:
            return maximumValue * _value / 100.0;
        case WXLengthTypeAuto:
            return maximumValue;
        default:
            WXAssertNotReached();
            return 0;
    }
}

- (BOOL)isEqualToLength:(WXLength *)length
{
    return length && _type == length->_type && _value == length->_value;
}

- (BOOL)isFixed
{
    return _type == WXLengthTypeFixed;
}

- (BOOL)isPercent
{
    return _type == WXLengthTypePercent;
}

- (BOOL)isAuto
{
    return _type == WXLengthTypeAuto;
}

@end

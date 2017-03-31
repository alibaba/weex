/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

typedef enum : NSUInteger {
    WXLengthTypeFixed,
    WXLengthTypePercent,
    WXLengthTypeAuto,
} WXLengthType;

@interface WXLength : NSObject

+ (instancetype)lengthWithValue:(float)value type:(WXLengthType)type;

- (float)valueForMaximumValue:(float)maximumValue;

- (BOOL)isEqualToLength:(WXLength *)length;

- (BOOL)isFixed;

- (BOOL)isPercent;

- (BOOL)isAuto;

@end

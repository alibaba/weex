/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import <objc/runtime.h>
#import "WXLog.h"
#import "WXLayoutDefine.h"
#import "WXType.h"

@interface WXConvert : NSObject

+ (BOOL)BOOL:(id)value;
+ (CGFloat)CGFloat:(id)value;
+ (NSUInteger)NSUInteger:(id)value;
+ (NSInteger)NSInteger:(id)value;
+ (NSString *)NSString:(id)value;

/**
 *  750px Adaptive
 */
typedef CGFloat WXPixelType;
+ (WXPixelType)WXPixelType:(id)value;

+ (css_flex_direction_t)css_flex_direction_t:(id)value;
+ (css_align_t)css_align_t:(id)value;
+ (css_wrap_type_t)css_wrap_type_t:(id)value;
+ (css_justify_t)css_justify_t:(id)value;
+ (css_position_type_t)css_position_type_t:(id)value;

+ (UIViewContentMode)UIViewContentMode:(id)value;
+ (WXImageQuality)WXImageQuality:(id)value;
+ (WXImageSharp)WXImageSharp:(id)value;

+ (UIColor *)UIColor:(id)value;
+ (CGColorRef)CGColor:(id)value;
+ (WXBorderStyle)WXBorderStyle:(id)value;
typedef BOOL WXClipType;
+ (WXClipType)WXClipType:(id)value;
+ (WXPositionType)WXPositionType:(id)value;

+ (WXTextStyle)WXTextStyle:(id)value;
+ (WXTextWeight)WXTextWeight:(id)value;
+ (WXTextDecoration)WXTextDecoration:(id)value;
+ (NSTextAlignment)NSTextAlignment:(id)value;

+ (WXScrollDirection)WXScrollDirection:(id)value;

+ (UIViewAnimationOptions)UIViewAnimationTimingFunction:(id)value;
+ (CAMediaTimingFunction *)CAMediaTimingFunction:(id)value;

+ (WXVisibility)WXVisibility:(id)value;

@end

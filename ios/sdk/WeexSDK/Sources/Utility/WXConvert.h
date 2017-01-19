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
// @prameter scaleFactor: please use weexInstance's pixelScaleFactor property
+ (WXPixelType)WXPixelType:(id)value scaleFactor:(CGFloat)scaleFactor;

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
/**
 * @abstract UIFontWeightRegular ,UIFontWeightBold,etc are not support by the system which is less than 8.2. weex sdk set the float value.
 *
 * @param value, support normal,blod,100,200,300,400,500,600,700,800,900
 *
 * @return A float value.
 *
 */
+ (CGFloat)WXTextWeight:(id)value;
+ (WXTextDecoration)WXTextDecoration:(id)value;
+ (NSTextAlignment)NSTextAlignment:(id)value;

+ (WXScrollDirection)WXScrollDirection:(id)value;
+ (UITableViewRowAnimation)UITableViewRowAnimation:(id)value;

+ (UIViewAnimationOptions)UIViewAnimationTimingFunction:(id)value;
+ (CAMediaTimingFunction *)CAMediaTimingFunction:(id)value;

+ (WXVisibility)WXVisibility:(id)value;

+ (WXGradientType)gradientType:(id)value;

@end

@interface WXConvert (Deprecated)

+ (WXPixelType)WXPixelType:(id)value DEPRECATED_MSG_ATTRIBUTE("Use [WXConvert WXPixelType:scaleFactor:] instead");

@end

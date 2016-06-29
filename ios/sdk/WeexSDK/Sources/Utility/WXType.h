/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

typedef NS_ENUM(NSUInteger, WXScrollDirection) {
    WXScrollDirectionVertical,
    WXScrollDirectionHorizontal,
    WXScrollDirectionNone,
};

typedef NS_ENUM(NSUInteger, WXTextStyle) {
    WXTextStyleNormal = 0,
    WXTextStyleItalic
};

typedef NS_ENUM(NSUInteger, WXTextWeight) {
    WXTextWeightNormal = 0,
    WXTextWeightBold,
};

typedef NS_ENUM(NSInteger, WXTextDecoration) {
    WXTextDecorationNone = 0,
    WXTextDecorationUnderline,
    WXTextDecorationLineThrough
};

typedef NS_ENUM(NSInteger, WXImageQuality) {
    WXImageQualityOriginal = -1,
    WXImageQualityLow = 0,
    WXImageQualityNormal,
    WXImageQualityHigh,
    WXImageQualityNone,
};

typedef NS_ENUM(NSInteger, WXImageSharp) {
    WXImageSharpeningNone = 0,
    WXImageSharpening
};

typedef NS_ENUM(NSInteger, WXVisibility) {
    WXVisibilityShow = 0,
    WXVisibilityHidden
};

typedef NS_ENUM(NSInteger, WXBorderStyle) {
    WXBorderStyleNone = 0,
    WXBorderStyleDotted,
    WXBorderStyleDashed,
    WXBorderStyleSolid
};

typedef NS_ENUM(NSInteger, WXPositionType) {
    WXPositionTypeRelative = 0,
    WXPositionTypeAbsolute,
    WXPositionTypeSticky,
    WXPositionTypeFixed
};


/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@class WXSDKInstance;
@class WXLength;

@interface WXTransform : NSObject

@property (nonatomic, assign, readonly) float rotateAngle;
@property (nonatomic, strong, readonly) WXLength *translateX;
@property (nonatomic, strong, readonly) WXLength *translateY;
@property (nonatomic, assign, readonly) float scaleX;
@property (nonatomic, assign, readonly) float scaleY;

- (instancetype)initWithCSSValue:(NSString *)cssValue origin:(NSString *)origin instance:(WXSDKInstance *)instance;

- (void)applyTransformForView:(UIView *)view;

@end

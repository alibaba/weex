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

@interface WXTransform : NSObject

@property CGAffineTransform transform;

- (instancetype)initWithInstance:(WXSDKInstance *)instance NS_DESIGNATED_INITIALIZER;

- (CATransform3D)getTransform:(NSString *)cssValue;
- (CATransform3D)getTransform:(NSString *)cssValue withView:(UIView *)view;
- (CATransform3D)getTransform:(NSString *)cssValue withView:(UIView *)view withOrigin:(NSString *)origin;
- (CATransform3D)getTransform:(NSString *)cssValue withView:(UIView *)view withOrigin:(NSString *)origin isTransformRotate:(BOOL)isTransformRotate;
- (float)getRotateAngle;

@end

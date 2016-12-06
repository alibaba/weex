//
//  WXImageUtils.h
//  WeexSDK
//
//  Created by xiayun on 16/12/6.
//  Copyright © 2016年 taobao. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface WXImageUtils : NSObject

/**
 * @brief Apply GaussianBlur to UIImage
 * @param originalImage
 * @param blurRadius
 */
+ (UIImage *)toGaussianBluredImage:(UIImage *)originalImage blurRadius:(CGFloat)blurRadius;

@end

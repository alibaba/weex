//
//  WXImageUtils.m
//  WeexSDK
//
//  Created by xiayun on 16/12/6.
//  Copyright © 2016年 taobao. All rights reserved.
//

#import "WXImageUtils.h"

@implementation WXImageUtils

+ (UIImage *)toGaussianBluredImage:(UIImage *)originalImage blurRadius:(CGFloat)blurRadius {
    CIImage *imageToBlur = [CIImage imageWithCGImage:originalImage.CGImage];
    
    CIFilter *gaussianBlurFilter = [CIFilter filterWithName:@"CIGaussianBlur"];
    [gaussianBlurFilter setValue:imageToBlur forKey:kCIInputImageKey];
    [gaussianBlurFilter setValue:[NSNumber numberWithFloat:blurRadius] forKey:kCIInputRadiusKey];
    CIImage *resultImage = gaussianBlurFilter.outputImage;
    
    CIContext *context = [CIContext contextWithOptions:nil];
    CGImageRef cgImage;
    if (resultImage) {
        CGRect rect = CGRectMake(0, 0, originalImage.size.width, originalImage.size.height);
        cgImage = [context createCGImage:resultImage fromRect:rect];
    }
    
    if (cgImage) {
        return [UIImage imageWithCGImage:cgImage];
    }

    return nil;
}

@end

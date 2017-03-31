//
//  WXComponent+GradientColor.h
//  Pods
//
//  Created by bobning on 16/12/23.
//
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "WXComponent.h"
#import "WXType.h"

@interface WXComponent (GradientColor)

- (void)setGradientLayer;

- (UIImage *)gradientColorImageFromColors:(NSArray*)colors gradientType:(WXGradientType)gradientType imgSize:(CGSize)imgSize;

@end

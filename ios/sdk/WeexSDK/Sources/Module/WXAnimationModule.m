/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXAnimationModule.h"
#import "WXSDKInstance_private.h"
#import "WXConvert.h"
#import "WXTransform.h"
#import "WXUtility.h"

@interface WXAnimationModule ()

@end

@implementation WXAnimationModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(transition:args:callback:))

- (void)transition:(NSString *)nodeRef args:(NSDictionary *)args callback:(WXModuleCallback)callback
{
    WXPerformBlockOnComponentThread(^{
        WXComponent *targetComponent = [self.weexInstance componentForRef:nodeRef];
        if (!targetComponent) {
            callback([NSString stringWithFormat:@"No component find for ref:%@", nodeRef]);
            return;
        }
        
        WXPerformBlockOnMainThread(^{
            [self animation:targetComponent args:args callback:callback];
        });
    });
}

- (void)animation:(WXComponent *)targetComponent args:(NSDictionary *)args callback:(WXModuleCallback)callback
{
    CALayer *layer = targetComponent.layer;
    UIView *view = targetComponent.view;
    
    NSDictionary *styles = args[@"styles"];
    
    NSTimeInterval duration = [args[@"duration"] doubleValue] / 1000;
    NSTimeInterval delay = [args[@"delay"] doubleValue] / 1000;

    __block CATransform3D transform;
    BOOL isAnimateTransform = NO;
    __block CGColorRef backgroundColor;
    BOOL isAnimateBackgroundColor = NO;
    float opacity = 0.0;
    BOOL isAnimateOpacity = NO;
    CGRect newFrame = layer.frame;
    BOOL isAnimateFrame = NO;
    CGFloat rotateAngle = 0.0;
    BOOL isUsingCAAnimation = NO;
    
    for (NSString *property in styles) {
        if ([property isEqualToString:@"transform"]) {
            NSString *transformOrigin = styles[@"transformOrigin"];
            WXTransform *wxTransform = [[WXTransform alloc] initWithInstance:self.weexInstance];
            transform = [wxTransform getTransform:styles[property] withView:view withOrigin:transformOrigin isTransformRotate:NO];
            rotateAngle = [wxTransform getRotateAngle];
            CGFloat originAngle = [self getRotateAngleFromTransForm:layer.transform];
            if (fabs(originAngle - rotateAngle) > M_PI + 0.0001) {
                /**
                 Rotate >= 180 degree not working on UIView block animation, have not found any more elegant solution than using CAAnimation
                 See http://stackoverflow.com/questions/9844925/uiview-infinite-360-degree-rotation-animation
                 **/
                isUsingCAAnimation = YES;
            }
            isAnimateTransform = YES;
        } else if ([property isEqualToString:@"backgroundColor"]) {
            backgroundColor = [WXConvert CGColor:styles[property]];
            isAnimateBackgroundColor = YES;
        } else if ([property isEqualToString:@"opacity"]) {
            opacity = [styles[property] floatValue];
            isAnimateOpacity = YES;
        } else if ([property isEqualToString:@"width"]) {
            newFrame = CGRectMake(newFrame.origin.x, newFrame.origin.y, [WXConvert WXPixelType:styles[property] scaleFactor:self.weexInstance.pixelScaleFactor], newFrame.size.height);
            isAnimateFrame = YES;
        } else if ([property isEqualToString:@"height"]) {
            newFrame = CGRectMake(newFrame.origin.x, newFrame.origin.y, newFrame.size.width, [WXConvert WXPixelType:styles[property] scaleFactor:self.weexInstance.pixelScaleFactor]);
            isAnimateFrame = YES;
        }
    }
    
    /**
       UIView-style animation functions support the standard timing functions,
       but they don’t allow you to specify your own cubic Bézier curve. 
       CATransaction can be used instead to force these animations to use the supplied CAMediaTimingFunction to pace animations.
     **/
    [CATransaction begin];
    [CATransaction setAnimationTimingFunction:[WXConvert CAMediaTimingFunction:args[@"timingFunction"]]];
    [CATransaction setCompletionBlock:^{
        if (isUsingCAAnimation) {
            CGAffineTransform originTransform = CATransform3DGetAffineTransform(layer.transform);
            layer.transform = CATransform3DMakeAffineTransform(CGAffineTransformRotate(originTransform, rotateAngle * M_PI / 180));
        }
        if (callback) {
            callback(@"SUCCESS");
        }
    }];
    
    if (isUsingCAAnimation) {
        CABasicAnimation* rotationAnimation;
        rotationAnimation = [CABasicAnimation animationWithKeyPath:@"transform.rotation.z"];
        rotationAnimation.toValue = [NSNumber numberWithFloat: rotateAngle];
        rotationAnimation.fromValue = @([self getRotateAngleFromTransForm:layer.transform]);
        rotationAnimation.duration = duration;
        rotationAnimation.cumulative = YES;
        rotationAnimation.fillMode = kCAFillModeForwards;
        rotationAnimation.removedOnCompletion = NO;
        
        [layer addAnimation:rotationAnimation forKey:@"rotationAnimation"];
    }
    
    /**
       Using UIView block animation (UIView animateWithDuration:completion: and it's relatives) instead of using CAAnimation objects. 
       Those methods actually move the view to it's new position, so that it responds to user interaction at the final location once the animation is complete.
     **/
    if (isAnimateTransform || isAnimateFrame || isAnimateBackgroundColor || isAnimateOpacity) {
        [UIView animateWithDuration:duration delay:delay options:UIViewAnimationOptionAllowUserInteraction  animations:^{
            if (isAnimateTransform && !CATransform3DEqualToTransform(transform, layer.transform)) {
                /**
                   Struggling with an issue regarding CGAffineTransform scale and translation where when I set a transform in an animation block on a view that already has a transform the view jumps a bit before animating.
                   I assume it's a bug in Core Animation.
                   Here comes the black magic: In the scale transformation, change the z parameter to anything different from 1.0, the jump is gone.
                   See http://stackoverflow.com/questions/27931421/cgaffinetransform-scale-and-translation-jump-before-animation
                 **/
                layer.transform = CATransform3DScale(transform, 1, 1, 1.00001);
            }
            if (isAnimateBackgroundColor) {
                layer.backgroundColor = backgroundColor;
            }
            if (isAnimateOpacity) {
                layer.opacity = opacity;
            }
            if (isAnimateFrame) {
                layer.frame = newFrame;
            }
        } completion:nil];
    }
    

    [CATransaction commit];
}

- (CGFloat)getRotateAngleFromTransForm:(CATransform3D)transform
{
    CGAffineTransform cgTransform = CATransform3DGetAffineTransform(transform);
    CGFloat radians = atan2f(cgTransform.b, cgTransform.a);
    CGFloat degrees = radians * (180 / M_PI);
    return degrees;
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXAnimationModule.h"
#import "WXSDKInstance_private.h"
#import "WXComponent_internal.h"
#import "WXConvert.h"
#import "WXTransform.h"
#import "WXUtility.h"
#import "WXLength.h"

@interface WXAnimationInfo : NSObject<NSCopying>

@property (nonatomic, weak) WXComponent *target;
@property (nonatomic, strong) NSString *propertyName;
@property (nonatomic, strong) id fromValue;
@property (nonatomic, strong) id toValue;
@property (nonatomic, assign) double duration;
@property (nonatomic, assign) double delay;
@property (nonatomic, strong) CAMediaTimingFunction *timingFunction;

@end

@implementation WXAnimationInfo

- (id)copyWithZone:(NSZone *)zone
{
    WXAnimationInfo *info = [[WXAnimationInfo allocWithZone:zone] init];
    
    info.target = self.target;
    info.propertyName = self.propertyName;
    info.fromValue = self.fromValue;
    info.toValue = self.toValue;
    info.duration = self.duration;
    info.delay = self.delay;
    info.timingFunction = self.timingFunction;
    
    return info;
}

@end

@interface WXAnimationDelegate : NSObject <CAAnimationDelegate>

@property (nonatomic, copy) void (^finishBlock)(BOOL);
@property (nonatomic, strong) WXAnimationInfo *animationInfo;

- (instancetype)initWithAnimationInfo:(WXAnimationInfo *)info finishBlock:(void(^)(BOOL))finishBlock;

@end

@implementation WXAnimationDelegate

- (instancetype)initWithAnimationInfo:(WXAnimationInfo *)info finishBlock:(void (^)(BOOL))finishBlock
{
    if (self = [super init]) {
        _animationInfo = info;
        _finishBlock = finishBlock;
    }
    
    return self;
}

- (void)animationDidStart:(CAAnimation *)anim
{
    if ([_animationInfo.propertyName hasPrefix:@"transform"]) {
        WXTransform *transform = _animationInfo.target->_transform;
        [transform applyTransformForView:_animationInfo.target.view];
    } else if ([_animationInfo.propertyName isEqualToString:@"backgroundColor"]) {
        _animationInfo.target.view.layer.backgroundColor = (__bridge CGColorRef _Nullable)(_animationInfo.toValue);
    } else if ([_animationInfo.propertyName isEqualToString:@"opacity"]) {
        _animationInfo.target.view.layer.opacity = [_animationInfo.toValue floatValue];
    }
}

- (void)animationDidStop:(CAAnimation *)anim finished:(BOOL)flag
{
    if (_finishBlock) {
        _finishBlock(flag);
    }
}

@end

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

- (NSArray<WXAnimationInfo *> *)animationInfoArrayFromArgs:(NSDictionary *)args target:(WXComponent *)target
{
    UIView *view = target.view;
    CALayer *layer = target.layer;
    NSMutableArray<WXAnimationInfo *> *infos = [NSMutableArray new];

    double duration = [args[@"duration"] doubleValue] / 1000;
    double delay = [args[@"delay"] doubleValue] / 1000;
    CAMediaTimingFunction *timingFunction = [WXConvert CAMediaTimingFunction:args[@"timingFunction"]];
    NSDictionary *styles = args[@"styles"];
    for (NSString *property in styles) {
        WXAnimationInfo *info = [WXAnimationInfo new];
        info.duration = duration;
        info.delay = delay;
        info.timingFunction = timingFunction;
        info.target = target;
        
        id value = styles[property];
        if ([property isEqualToString:@"transform"]) {
            NSString *transformOrigin = styles[@"transformOrigin"];
            WXTransform *wxTransform = [[WXTransform alloc] initWithCSSValue:value origin:transformOrigin instance:self.weexInstance];
            WXTransform *oldTransform = target->_transform;
            if (wxTransform.rotateAngle != oldTransform.rotateAngle) {
                WXAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.rotation";
                /**
                 Rotate >= 180 degree not working on UIView block animation, have not found any more elegant solution than using CAAnimation
                 See http://stackoverflow.com/questions/9844925/uiview-infinite-360-degree-rotation-animation
                 **/
                newInfo.fromValue = @(oldTransform.rotateAngle);
                newInfo.toValue = [NSNumber numberWithDouble:wxTransform.rotateAngle];
                [infos addObject:newInfo];
            }
            
            if (wxTransform.scaleX != oldTransform.scaleX) {
                WXAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.scale.x";
                newInfo.fromValue = @(oldTransform.scaleX);
                newInfo.toValue = @(wxTransform.scaleX);
                [infos addObject:newInfo];
            }
            
            if (wxTransform.scaleY != oldTransform.scaleY) {
                WXAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.scale.y";
                newInfo.fromValue = @(oldTransform.scaleY);
                newInfo.toValue = @(wxTransform.scaleX);
                [infos addObject:newInfo];
            }
            
            if ((wxTransform.translateX && ![wxTransform.translateX isEqualToLength:oldTransform.translateX]) || (!wxTransform.translateX && oldTransform.translateX)) {
                WXAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.translation.x";
                newInfo.fromValue = @([oldTransform.translateX valueForMaximumValue:view.bounds.size.width]);
                newInfo.toValue = @([wxTransform.translateX valueForMaximumValue:view.bounds.size.width]);
                [infos addObject:newInfo];
            }
            
            if ((wxTransform.translateY && ![wxTransform.translateY isEqualToLength:oldTransform.translateY]) || (!wxTransform.translateY && oldTransform.translateY)) {
                WXAnimationInfo *newInfo = [info copy];
                newInfo.propertyName = @"transform.translation.y";
                newInfo.fromValue = @([oldTransform.translateY valueForMaximumValue:view.bounds.size.height]);
                newInfo.toValue = @([wxTransform.translateY valueForMaximumValue:view.bounds.size.height]);
                [infos addObject:newInfo];
            }
            
            target->_transform = wxTransform;
        } else if ([property isEqualToString:@"backgroundColor"]) {
            info.propertyName = @"backgroundColor";
            info.fromValue = (__bridge id)(layer.backgroundColor);
            info.toValue = (__bridge id)[WXConvert CGColor:value];
            [infos addObject:info];
        } else if ([property isEqualToString:@"opacity"]) {
            info.propertyName = @"opacity";
            info.fromValue = @(layer.opacity);
            info.toValue = @([value floatValue]);
            [infos addObject:info];
        } else if ([property isEqualToString:@"width"]) {
            info.propertyName = @"bounds";
            info.fromValue = [NSValue valueWithCGRect:layer.bounds];
            CGRect newBounds = layer.bounds;
            newBounds.size = CGSizeMake([WXConvert WXPixelType:value scaleFactor:self.weexInstance.pixelScaleFactor], newBounds.size.height);
            info.toValue = [NSValue valueWithCGRect:newBounds];
            [infos addObject:info];
        } else if ([property isEqualToString:@"height"]) {
            info.propertyName = @"bounds";
            info.fromValue = [NSValue valueWithCGRect:layer.bounds];
            CGRect newBounds = layer.bounds;
            newBounds.size = CGSizeMake(newBounds.size.width, [WXConvert WXPixelType:value scaleFactor:self.weexInstance.pixelScaleFactor]);
            info.toValue = [NSValue valueWithCGRect:newBounds];
            [infos addObject:info];
        }
    }

    return infos;
}


- (void)animation:(WXComponent *)targetComponent args:(NSDictionary *)args callback:(WXModuleCallback)callback
{
    /**
       UIView-style animation functions support the standard timing functions,
       but they don’t allow you to specify your own cubic Bézier curve. 
       CATransaction can be used instead to force these animations to use the supplied CAMediaTimingFunction to pace animations.
     **/
    [CATransaction begin];
    [CATransaction setAnimationTimingFunction:[WXConvert CAMediaTimingFunction:args[@"timingFunction"]]];
    [CATransaction setCompletionBlock:^{
        if (callback) {
            callback(@"SUCCESS");
        }
    }];
    NSArray<WXAnimationInfo *> *infos = [self animationInfoArrayFromArgs:args target:targetComponent];
    for (WXAnimationInfo *info in infos) {
        [self _createCAAnimation:info];
    }

    [CATransaction commit];
}

- (void)_createCAAnimation:(WXAnimationInfo *)info
{
    CABasicAnimation* animation = [CABasicAnimation animationWithKeyPath:info.propertyName];
    animation.fromValue = info.fromValue;
    animation.toValue = info.toValue;
    animation.duration = info.duration;
    animation.beginTime = CACurrentMediaTime() + info.delay;
    animation.timingFunction = info.timingFunction;
    animation.removedOnCompletion = NO;
    animation.fillMode = kCAFillModeForwards;
    
    WXAnimationDelegate *delegate = [[WXAnimationDelegate alloc] initWithAnimationInfo:info finishBlock:^(BOOL isFinish) {
        
    }];
    animation.delegate = delegate;
    
    CALayer *layer = info.target.layer;
    [layer addAnimation:animation forKey:info.propertyName];
}

@end

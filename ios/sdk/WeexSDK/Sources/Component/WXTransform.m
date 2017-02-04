/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXTransform.h"
#import "math.h"
#import "WXLength.h"
#import "WXUtility.h"
#import "WXSDKInstance.h"

@interface WXTransform()

@property (nonatomic, weak) WXSDKInstance *weexInstance;

@end

@implementation WXTransform
{
    float _rotateAngle;
    float _scaleX;
    float _scaleY;
    WXLength *_translateX;
    WXLength *_translateY;
    WXLength *_originX;
    WXLength *_originY;
}

- (instancetype)initWithCSSValue:(NSString *)cssValue origin:(NSString *)origin instance:(WXSDKInstance *)instance
{
    if (self = [super init]) {
        _weexInstance = instance;
        _scaleX = 1.0;
        _scaleY = 1.0;
        _rotateAngle = 0.0;
        
        [self parseTransform:cssValue];
        [self parseTransformOrigin:origin];
    }
    
    return self;
}

- (float)rotateAngle
{
    return _rotateAngle;
}

- (WXLength *)translateX
{
    return _translateX;
}

- (WXLength *)translateY
{
    return _translateY;
}

- (float)scaleX
{
    return _scaleX;
}

- (float)scaleY
{
    return _scaleY;
}

- (CGAffineTransform)nativeTransformWithView:(UIView *)view
{
    CGAffineTransform nativeTransform = [self nativeTransformWithoutRotateWithView:view];
    
    nativeTransform = CGAffineTransformRotate(nativeTransform, _rotateAngle);
    
    return nativeTransform;
}

- (CGAffineTransform)nativeTransformWithoutRotateWithView:(UIView *)view
{
    CGAffineTransform nativeTransform = CGAffineTransformIdentity;
    
    if (!view || view.bounds.size.width <= 0 || view.bounds.size.height <= 0) {
        return nativeTransform;
    }
    
    if (_translateX || _translateY) {
        nativeTransform = CGAffineTransformTranslate(nativeTransform, _translateX ? [_translateX valueForMaximumValue:view.bounds.size.width] : 0,  _translateY ? [_translateY valueForMaximumValue:view.bounds.size.height] : 0);
    }
    
    nativeTransform = CGAffineTransformScale(nativeTransform, _scaleX, _scaleY);
    
    return nativeTransform;
}

-(void)setAnchorPoint:(CGPoint)anchorPoint forView:(UIView *)view
{
    CGPoint newPoint = CGPointMake(view.bounds.size.width * anchorPoint.x,
                                   view.bounds.size.height * anchorPoint.y);
    CGPoint oldPoint = CGPointMake(view.bounds.size.width * view.layer.anchorPoint.x,
                                   view.bounds.size.height * view.layer.anchorPoint.y);
    
    newPoint = CGPointApplyAffineTransform(newPoint, view.transform);
    oldPoint = CGPointApplyAffineTransform(oldPoint, view.transform);
    
    CGPoint position = view.layer.position;
    
    position.x -= oldPoint.x;
    position.x += newPoint.x;
    
    position.y -= oldPoint.y;
    position.y += newPoint.y;
    
    view.layer.position = position;
    view.layer.anchorPoint = anchorPoint;
}


- (void)applyTransformForView:(UIView *)view
{
    if (!view || view.bounds.size.width <= 0 || view.bounds.size.height <= 0) {
        return;
    }
    
    BOOL applyTransformOrigin = _originX || _originY;
    if (applyTransformOrigin) {
        /**
          * Waiting to fix the issue that transform-origin behaves in rotation
          * http://ronnqvi.st/translate-rotate-translate/
          **/
        CGPoint anchorPoint = CGPointMake(
                                          _originX ? [_originX valueForMaximumValue:view.bounds.size.width] / view.bounds.size.width : 0.5,
                                          _originY ? [_originY valueForMaximumValue:view.bounds.size.width] / view.bounds.size.height : 0.5);
        [self setAnchorPoint:anchorPoint forView:view];
    }
    
    CGAffineTransform nativeTransform = [self nativeTransformWithView:view];
    
    if (!CGAffineTransformEqualToTransform(view.transform, nativeTransform)) {
        view.transform = nativeTransform;
    }
}

- (void)parseTransform:(NSString *)cssValue
{
    if (!cssValue || cssValue.length == 0 || [cssValue isEqualToString:@"none"]) {
        return;
    }
    
    NSError *error = NULL;
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:@"(\\w+)\\((.+?)\\)"
                                                                           options:NSRegularExpressionCaseInsensitive
                                                                             error:&error];
    
    NSArray *matches = [regex matchesInString:cssValue options:0 range:NSMakeRange(0, cssValue.length)];
    
    for (NSTextCheckingResult *match in matches) {
        NSString *name = [cssValue substringWithRange:[match rangeAtIndex:1]];
        NSArray *value = [[cssValue substringWithRange:[match rangeAtIndex:2]] componentsSeparatedByString:@","];
        
        SEL method = NSSelectorFromString([NSString stringWithFormat:@"parse%@:", [name capitalizedString]]);
        if ([self respondsToSelector:method]) {
            @try {
                [self performSelectorOnMainThread:method withObject:value waitUntilDone:YES];
            }
            @catch (NSException *exception) {
                WXLogError(@"WXTransform exception:%@", [exception reason]);
            }
        }
    }
}

- (void)parseTransformOrigin:(NSString *)cssValue
{
    if (!cssValue || cssValue.length == 0 || [cssValue isEqualToString:@"none"]) {
        return;
    }
    
    NSArray *values = [cssValue componentsSeparatedByString:@" "];

    double originX = 50;
    double originY = 50;
    WXLengthType typeX = WXLengthTypePercent;
    WXLengthType typeY = WXLengthTypePercent;
    for (NSInteger i = 0; i < values.count; i++) {
        NSString *value = values[i];
        if ([value isEqualToString:@"left"]) {
            originX = 0;
        } else if ([value isEqualToString:@"right"]) {
            originX = 100;
        } else if ([value isEqualToString:@"top"]) {
            originY = 0;
        } else if ([value isEqualToString:@"bottom"]) {
            originY = 100;
        } else if ([value isEqualToString:@"center"]) {
            if (i == 0) {
                originX = 50;
            } else {
                originY = 50;
            }
        } else {
            double val = [value doubleValue];
            if (i == 0) {
                if ([value hasSuffix:@"%"]) {
                    originX = val;
                } else {
                    typeX = WXLengthTypeFixed;
                    originX = WXPixelScale(val, self.weexInstance.pixelScaleFactor);
                }
            } else {
                if ([value hasSuffix:@"%"]) {
                    originY = val;
                } else {
                    typeY = WXLengthTypeFixed;
                    originY = WXPixelScale(val, self.weexInstance.pixelScaleFactor);
                }
            }
        }
    }
    
    _originX = [WXLength lengthWithValue:originX type:typeX];
    _originY = [WXLength lengthWithValue:originY type:typeY];
}

- (void)parseRotate:(NSArray *)value
{
    float rotateAngle = [self getAngle:value[0]];
    _rotateAngle = rotateAngle;
}

- (void)parseTranslate:(NSArray *)value
{
    WXLength *translateX;
    double x = [value[0] doubleValue];
    if ([value[0] hasSuffix:@"%"]) {
        translateX = [WXLength lengthWithValue:x type:WXLengthTypePercent];
    } else {
        x = WXPixelScale(x, self.weexInstance.pixelScaleFactor);
        translateX = [WXLength lengthWithValue:x type:WXLengthTypeFixed];
    }

    WXLength *translateY;
    if (value.count > 1) {
        double y = [value[1] doubleValue];
        if ([value[1] hasSuffix:@"%"]) {
            translateY = [WXLength lengthWithValue:y type:WXLengthTypePercent];
        } else {
            y = WXPixelScale(y, self.weexInstance.pixelScaleFactor);
            translateY = [WXLength lengthWithValue:y type:WXLengthTypeFixed];
        }
    }
    
    _translateX = translateX;
    _translateY = translateY;
}

- (void)parseTranslatex:(NSArray *)value
{
    [self parseTranslate:@[value[0], @"0"]];
}

- (void)parseTranslatey:(NSArray *)value
{
    [self parseTranslate:@[@"0", value[0]]];
}

- (void)parseScale:(NSArray *)value
{
    double x = [value[0] doubleValue];
    double y = x;
    if (value.count == 2) {
        y = [value[1] doubleValue];
    }
    _scaleX = x;
    _scaleY = y;
}

- (void)parseScalex:(NSArray *)value
{
    [self parseScale:@[value[0], @1]];
}

- (void)parseScaley:(NSArray *)value
{
    [self parseScale:@[@1, value[0]]];
}

// Angle in radians
- (double)getAngle:(NSString *)value
{
    double angle = [value doubleValue];
    if ([value hasSuffix:@"deg"]) {
        return [self deg2rad:angle];
    } else {
        return angle;
    }
}

- (double)deg2rad:(double)deg
{
    return deg * M_PI / 180.0;
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXTransform.h"
#import "math.h"
#import "WXUtility.h"
#import "WXSDKInstance.h"

@interface WXTransform()

@property (nonatomic, weak) UIView *view;
@property (nonatomic, assign) float rotateAngle;
@property (nonatomic, assign) BOOL isTransformRotate;
@property (nonatomic, weak) WXSDKInstance *weexInstance;

@end

@implementation WXTransform

- (instancetype)init
{
    return [self initWithInstance:nil];
}

- (instancetype)initWithInstance:(WXSDKInstance *)weexInstance;
{
    if (self = [super init]) {
        _isTransformRotate = YES;
        _rotateAngle = 0.0;
        _weexInstance = weexInstance;
    }
    
    return self;
}

- (CATransform3D)getTransform:(NSString *)cssValue
{
    //CATransform3D transform3D = _view.layer.transform;
    //_transform = _view ? CGAffineTransformMake(transform3D.m11, transform3D.m12, transform3D.m21, transform3D.m22, transform3D.m41, transform3D.m42) : CGAffineTransformIdentity;
    
    _transform = CGAffineTransformIdentity;
    if (!cssValue || cssValue.length == 0 || [cssValue isEqualToString:@"none"]) {
        return CATransform3DMakeAffineTransform(_transform);
    }
    NSError *error = NULL;
    NSRegularExpression *regex = [NSRegularExpression regularExpressionWithPattern:@"(\\w+)\\((.+?)\\)"
                                                                           options:NSRegularExpressionCaseInsensitive
                                                                             error:&error];

    NSArray *matches = [regex matchesInString:cssValue options:0 range:NSMakeRange(0, cssValue.length)];

    for (NSTextCheckingResult *match in matches) {
        NSString *name = [cssValue substringWithRange:[match rangeAtIndex:1]];
        NSArray *value = [[cssValue substringWithRange:[match rangeAtIndex:2]] componentsSeparatedByString:@","];

        SEL method = NSSelectorFromString([NSString stringWithFormat:@"do%@:", [name capitalizedString]]);
        if ([self respondsToSelector:method]) {
            @try {
                [self performSelectorOnMainThread:method withObject:value waitUntilDone:YES];
            }
            @catch (NSException *exception) {
                WXLogError(@"WXTransform exception:%@", [exception reason]);
            }
        }
    }

    return CATransform3DMakeAffineTransform(_transform);
}

- (CATransform3D)getTransform:(NSString *)cssValue withView:(UIView *)view
{
    _view = view;
    CATransform3D transform = [self getTransform:cssValue];
    _view = nil;
    return transform;
}

- (CATransform3D)getTransform:(NSString *)cssValue withView:(UIView *)view withOrigin:(NSString *)origin
{
    if (origin && origin.length > 0 && ![origin isEqualToString:@"none"]) {
        /**
          * Waiting to fix the issue that transform-origin behaves in rotation 
          * http://ronnqvi.st/translate-rotate-translate/
         **/
        CGPoint originPoint = [self getTransformOrigin:origin withView:view];
        if (originPoint.x != 0 || originPoint.y != 0) {
            cssValue = [NSString stringWithFormat:@"translate(%f,%f) %@ translate(%f,%f)", originPoint.x, originPoint.y, cssValue, -originPoint.x, -originPoint.y];
        }
    }
    
    return [self getTransform:cssValue withView:view];
}

- (CATransform3D)getTransform:(NSString *)cssValue withView:(UIView *)view withOrigin:(NSString *)origin isTransformRotate:(BOOL)isTransformRotate
{
    _isTransformRotate = isTransformRotate;
    return [self getTransform:cssValue withView:view withOrigin:origin];
}

- (CGPoint)getTransformOrigin:(NSString *)cssValue withView:(UIView *)view
{
    NSArray *values = [cssValue componentsSeparatedByString:@" "];
    double width = view.bounds.size.width;
    double height = view.bounds.size.height;
    double x = width / 2;
    double y = height / 2;

    for (NSInteger i = 0; i < values.count; i++) {
        NSString *value = values[i];
        if ([value isEqualToString:@"left"]) {
            x = 0;
        } else if ([value isEqualToString:@"right"]) {
            x = width;
        } else if ([value isEqualToString:@"top"]) {
            y = 0;
        } else if ([value isEqualToString:@"bottom"]) {
            y = height;
        } else if ([value isEqualToString:@"center"]) {
            if (i == 0) {
                x = width / 2;
            } else {
                y = height / 2;
            }
        } else {
            double val = [value doubleValue];
            if (i == 0) {
                if ([value hasSuffix:@"%"]) {
                    val *= width / 100;
                } else {
                    val = WXPixelScale(val, self.weexInstance.pixelScaleFactor);
                }
                x = val;
            } else {
                if ([value hasSuffix:@"%"]) {
                    val *= height / 100;
                } else {
                    val = WXPixelScale(val, self.weexInstance.pixelScaleFactor);
                }
                y = val;
            }
        }
    }
    x -= width / 2.0;
    y -= height / 2.0;
    
    CGFloat scaleFactor = self.weexInstance.pixelScaleFactor;
    return CGPointMake(round(x / scaleFactor), round(y / scaleFactor));
}

// Angle in radians
- (double)getAngle:(NSString *)value
{
    double angle = [value doubleValue];
    if ([value hasSuffix:@"deg"]) {
        angle *= M_PI / 180;
    }
    return angle;
}

// css transfrom
- (void)doTranslate:(NSArray *)value
{
    double x = [value[0] doubleValue];
    if ([value[0] hasSuffix:@"%"] && _view) {
        x *= _view.bounds.size.width / 100;
    } else {
        x = WXPixelScale(x, self.weexInstance.pixelScaleFactor);
    }

    double y = 0;

    if (value.count > 1) {
        y = [value[1] doubleValue];
        if ([value[1] hasSuffix:@"%"] && _view) {
            y *= _view.bounds.size.height / 100;
        } else {
            y = WXPixelScale(y, self.weexInstance.pixelScaleFactor);
        }
    }
    _transform = CGAffineTransformTranslate(_transform, x, y);
}

- (void)doTranslatex:(NSArray *)value
{
    [self doTranslate:@[value[0], @"0"]];
}

- (void)doTranslatey:(NSArray *)value
{
    [self doTranslate:@[@"0", value[0]]];
}

- (void)doRotate:(NSArray *)value
{
    float rotateAngle = [self getAngle:value[0]];
    CGAffineTransform cgTransform = CATransform3DGetAffineTransform(_view.layer.transform);
    float originAngle = atan2f(cgTransform.b, cgTransform.a) * (180 / M_PI);
    if (_isTransformRotate || fabs(rotateAngle - originAngle) <= M_PI+0.0001){
        _transform = CGAffineTransformRotate(_transform, rotateAngle);
    }

    _rotateAngle += rotateAngle;
}

- (float)getRotateAngle
{
    return _rotateAngle;
}

- (void)doScale:(NSArray *)value
{
    double x = [value[0] doubleValue];
    double y = x;
    if (value.count == 2) {
        y = [value[1] doubleValue];
    }
    _transform = CGAffineTransformScale(_transform, x, y);
}

- (void)doScalex:(NSArray *)value
{
    [self doScale:@[value[0], @1]];
}

- (void)doScaley:(NSArray *)value
{
    [self doScale:@[@1, value[0]]];
}

- (void)doSkew:(NSArray *)value
{
    CGAffineTransform skew = CGAffineTransformIdentity;
    skew.c = tan([self getAngle:value[0]]);
    if (value.count == 2) {
        skew.b = tan([self getAngle:value[1]]);
    }
    _transform = CGAffineTransformConcat(skew, _transform);
}

- (void)doSkewx:(NSArray *)value
{
    [self doSkew:@[value[0], @0]];
}

- (void)doSkewy:(NSArray *)value
{
    [self doSkew:@[@0, value[0]]];
}

- (void)doMatrix:(NSArray *) value
{
    if (value.count < 6) return;
    
    _transform = CGAffineTransformConcat(CGAffineTransformMake([value[0] doubleValue], [value[1] doubleValue], [value[2] doubleValue], [value[3] doubleValue], [value[4] doubleValue], [value[5] doubleValue]), _transform);
}

@end

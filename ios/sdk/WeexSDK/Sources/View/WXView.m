/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXView.h"
#import "WXComponent.h"
#import "WXLayer.h"

@implementation WXView

+ (Class)layerClass
{
    return [WXLayer class];
}

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event
{
    /**
     *  Capturing touches on a subview outside the frame of its superview if it does not clips to bounds.
     */
    if (self.hidden || !self.userInteractionEnabled) {
        return nil;
    }
    
    UIView* result = [super hitTest:point withEvent:event];
    if (result) {
        return result;
    }
    
    // if clips to bounds, no need to detect outside views.
    if (self.clipsToBounds) {
        return nil;
    }
    
    for (UIView* subView in [self.subviews reverseObjectEnumerator]) {
        if (subView.hidden) {
            continue;
        }
        CGPoint subPoint = [self convertPoint:point toView:subView];
        result = [subView hitTest:subPoint withEvent:event];
        if (result) {
            return result;
        }
    }
    
    return nil;
}
@end

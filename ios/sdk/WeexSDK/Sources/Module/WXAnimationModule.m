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

@implementation WXAnimationModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(transition:args:callback:))

- (void)transition:(NSString *)nodeRef args:(NSDictionary *)args callback:(WXModuleCallback)callback
{
    WXComponent *targetComponent = [self.weexInstance componentForRef:nodeRef];
    if (!targetComponent) {
        callback([NSString stringWithFormat:@"No component find for ref:%@", nodeRef]);
        return;
    }
    
    [self animation:targetComponent args:args callback:callback];
}

- (void)animation:(WXComponent *)targetComponent args:(NSDictionary *)args callback:(WXModuleCallback)callback
{
    CALayer *layer = targetComponent.layer;
    UIView *view = targetComponent.view;
    
    NSDictionary *styles = args[@"styles"];
    
    NSTimeInterval duration = [args[@"duration"] doubleValue] / 1000;
    NSTimeInterval delay = [args[@"delay"] doubleValue] / 1000;
    //    CAMediaTimingFunction *timingFunction = [WXConvert CAMediaTimingFunction:args[@"timingFunction"]];
    UIViewAnimationOptions timingFunction = [WXConvert UIViewAnimationTimingFunction:args[@"timingFunction"]];
    
    // Rotate 360 not work , have not found any solution
    // http://stackoverflow.com/questions/9844925/uiview-infinite-360-degree-rotation-animation
    [UIView animateWithDuration:duration delay:delay options:UIViewAnimationOptionAllowUserInteraction | timingFunction animations:^{
        for (NSString *property in styles) {
            if ([property isEqualToString:@"transform"]) {
                NSString *transformOrigin = styles[@"transformOrigin"];
                layer.transform = [[WXTransform new] getTransform:styles[property] withView:view withOrigin:transformOrigin];
            } else if ([property isEqualToString:@"backgroundColor"]) {
                layer.backgroundColor = [WXConvert CGColor:styles[property]];
            } else if ([property isEqualToString:@"opacity"]) {
                layer.opacity = [styles[property] floatValue];
            }
        }
    } completion:^(BOOL finished) {
        if (callback) {
            callback(finished ? @"SUCCESS" : @"FAIL");
        }
    }];
}

@end

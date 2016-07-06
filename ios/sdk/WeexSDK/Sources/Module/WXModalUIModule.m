/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXModalUIModule.h"
#import <objc/runtime.h>
#import "WXUtility.h"
#import "WXAssert.h"

static NSString *WXModalCallbackKey;

typedef enum : NSUInteger {
    WXModalTypeToast = 1,
    WXModalTypeAlert,
    WXModalTypeConfirm,
    WXModalTypePrompt
} WXModalType;

@interface WXToastInfo : NSObject

@property (nonatomic, strong) UIView *toastView;
@property (nonatomic, weak) UIView *superView;
@property (nonatomic, assign) double duration;

@end

@implementation WXToastInfo

@end

@interface WXToastManager : NSObject

@property (strong, nonatomic) NSMutableArray<WXToastInfo *> *toastQueue;
@property (strong, nonatomic) UIView *toastingView;

+ (WXToastManager *)sharedManager;

@end

@implementation WXToastManager

+ (WXToastManager *)sharedManager{
    static WXToastManager * shareInstance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        shareInstance = [[WXToastManager alloc] init];
        shareInstance.toastQueue = [NSMutableArray new];
    });
    return shareInstance;
}

@end

@interface WXModalUIModule () <UIAlertViewDelegate>

@end

@implementation WXModalUIModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(toast:))
WX_EXPORT_METHOD(@selector(alert:callback:))
WX_EXPORT_METHOD(@selector(confirm:callback:))
WX_EXPORT_METHOD(@selector(prompt:callback:))

#pragma mark - Toast

static const double WXToastDefaultDuration = 3.0;
static const CGFloat WXToastDefaultFontSize = 16.0;
static const CGFloat WXToastDefaultWidth = 230.0;
static const CGFloat WXToastDefaultHeight = 30.0;
static const CGFloat WXToastDefaultPadding = 30.0;

- (void)toast:(NSDictionary *)param
{
    NSString *message = [self stringValue:param[@"message"]];
    
    if (!message) return;
    
    double duration = [param[@"duration"] doubleValue];
    if (duration <= 0) {
        duration = WXToastDefaultDuration;
    }
    
    WXPerformBlockOnMainThread(^{
        [self toast:message duration:duration];
    });
}

- (void)toast:(NSString *)message duration:(double)duration
{
    WXAssertMainThread();
    UIView *superView =  [[[UIApplication sharedApplication] windows] objectAtIndex:0];
    if (!superView) {
        superView =  self.weexInstance.rootView;
    }
    UIView *toastView = [self toastViewForMessage:message superView:superView];
    WXToastInfo *info = [WXToastInfo new];
    info.toastView = toastView;
    info.superView = superView;
    info.duration = duration;
    [[WXToastManager sharedManager].toastQueue addObject:info];
    
    if (![WXToastManager sharedManager].toastingView) {
        [self showToast:toastView superView:superView duration:duration];
    }
}

- (UIView *)toastViewForMessage:(NSString *)message superView:(UIView *)superView
{
    CGFloat padding = WXToastDefaultPadding;
    UILabel *messageLabel = [[UILabel alloc] initWithFrame:CGRectMake(padding/2, padding/2, WXToastDefaultWidth, WXToastDefaultHeight)];
    messageLabel.numberOfLines =  0;
    messageLabel.textAlignment = NSTextAlignmentCenter;
    messageLabel.text = message;
    messageLabel.font = [UIFont boldSystemFontOfSize:WXToastDefaultFontSize];
    messageLabel.lineBreakMode = NSLineBreakByTruncatingTail;
    messageLabel.textColor = [UIColor whiteColor];
    messageLabel.backgroundColor = [UIColor clearColor];
    [messageLabel sizeToFit];

    UIView *toastView = [[UIView alloc] initWithFrame:
                         CGRectMake(
                                    (superView.frame.size.width-messageLabel.frame.size.width-padding)/2,
                                    (superView.frame.size.height-messageLabel.frame.size.height-padding)/2,
                                    messageLabel.frame.size.width+padding,
                                    messageLabel.frame.size.height+padding
                                    )];
    
    CGPoint point = CGPointZero;
    UIWindow *window = [[[UIApplication sharedApplication] windows] objectAtIndex:0];
    
    // adjust to screen orientation
    UIInterfaceOrientation orientation = (UIInterfaceOrientation)[[UIApplication sharedApplication] statusBarOrientation];
    switch (orientation) {
        case UIDeviceOrientationPortrait: {
            point = CGPointMake(window.frame.size.width/2, window.frame.size.height/2);
            break;
        }
        case UIDeviceOrientationPortraitUpsideDown: {
            toastView.transform = CGAffineTransformMakeRotation(M_PI);
            float width = window.frame.size.width;
            float height = window.frame.size.height;
            point = CGPointMake(width/2, height/2);
            break;
        }
        case UIDeviceOrientationLandscapeLeft: {
            toastView.transform = CGAffineTransformMakeRotation(M_PI/2); //rotation in radians
            point = CGPointMake(window.frame.size.width/2, window.frame.size.height/2);
            break;
        }
        case UIDeviceOrientationLandscapeRight: {
            toastView.transform = CGAffineTransformMakeRotation(-M_PI/2);
            point = CGPointMake(window.frame.size.width/2, window.frame.size.height/2);
            break;
        }
        default:
            break;
    }
    
    toastView.center = point;
    toastView.frame = CGRectIntegral(toastView.frame);
    
    [toastView addSubview:messageLabel];
    toastView.layer.cornerRadius = 7;
    toastView.backgroundColor=[UIColor colorWithWhite:0 alpha:0.7];
    
    return toastView;
}

- (void)showToast:(UIView *)toastView superView:(UIView *)superView duration:(double)duration
{
    if (!toastView || !superView) {
        return;
    }
    
    [WXToastManager sharedManager].toastingView = toastView;
    [superView addSubview:toastView];
    
    [UIView animateWithDuration:0.2 delay:duration options:UIViewAnimationOptionCurveEaseInOut animations:^{
        toastView.transform = CGAffineTransformConcat(toastView.transform, CGAffineTransformMakeScale(0.8, 0.8)) ;
    } completion:^(BOOL finished) {
        [UIView animateWithDuration:0.2 delay:0.2 options:UIViewAnimationOptionCurveEaseInOut animations:^{
            toastView.alpha = 0;
        } completion:^(BOOL finished){
            [toastView removeFromSuperview];
            [WXToastManager sharedManager].toastingView = nil;
            
            NSMutableArray *queue = [WXToastManager sharedManager].toastQueue;
            if (queue.count > 0) {
                [queue removeObjectAtIndex:0];
                if (queue.count > 0) {
                    WXToastInfo *info = [queue firstObject];
                    [self showToast:info.toastView superView:info.superView duration:info.duration];
                }
            }
        }];
    }];
}

#pragma mark - Alert

- (void)alert:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    NSString *message = [self stringValue:param[@"message"]];
    NSString *okTitle = [self stringValue:param[@"okTitle"]];
    
    if ([WXUtility isBlankString:okTitle]) {
        okTitle = @"OK";
    }

    [self alert:message okTitle:nil cancelTitle:okTitle defaultText:nil type:WXModalTypeAlert callback:callback];
}

#pragma mark - Confirm

- (void)confirm:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    NSString *message = [self stringValue:param[@"message"]];
    NSString *okTitle = [self stringValue:param[@"okTitle"]];
    NSString *cancelTitle = [self stringValue:param[@"cancelTitle"]];
    
    if ([WXUtility isBlankString:okTitle]) {
        okTitle = @"OK";
    }
    if ([WXUtility isBlankString:cancelTitle]) {
        cancelTitle = @"Cancel";
    }

    [self alert:message okTitle:okTitle cancelTitle:cancelTitle defaultText:nil type:WXModalTypeConfirm callback:callback];
}

#pragma mark - Prompt

- (void)prompt:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    NSString *message = [self stringValue:param[@"message"]];
    NSString *defaultValue = [self stringValue:param[@"default"]];
    NSString *okTitle = [self stringValue:param[@"okTitle"]];
    NSString *cancelTitle = [self stringValue:param[@"cancelTitle"]];
    
    if ([WXUtility isBlankString:okTitle]) {
        okTitle = @"OK";
    }
    if ([WXUtility isBlankString:cancelTitle]) {
        cancelTitle = @"Cancel";
    }
    
    [self alert:message okTitle:okTitle cancelTitle:cancelTitle defaultText:defaultValue type:WXModalTypePrompt callback:callback];
}


#pragma mark - Private

- (void)alert:(NSString *)message okTitle:(NSString *)okTitle cancelTitle:(NSString *)cancelTitle defaultText:(NSString *)defaultText type:(WXModalType)type callback:(WXModuleCallback)callback
{
    if (!message) {
        callback(@"Error: message should be passed correctly.");
        return;
    }
    
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"" message:message delegate:self cancelButtonTitle:cancelTitle otherButtonTitles:okTitle, nil];
    alertView.tag = type;
    if (type == WXModalTypePrompt) {
        alertView.alertViewStyle = UIAlertViewStylePlainTextInput;
        UITextField *textField = [alertView textFieldAtIndex:0];
        textField.placeholder = defaultText;
    }
    objc_setAssociatedObject(alertView, &WXModalCallbackKey, [callback copy], OBJC_ASSOCIATION_COPY_NONATOMIC);
    
    WXPerformBlockOnMainThread(^{
        [alertView show];
    });
}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex
{
    WXModuleCallback callback = objc_getAssociatedObject(alertView, &WXModalCallbackKey);
    if (!callback) return;
    
    NSString *result = @"";
    switch (alertView.tag) {
        case WXModalTypeAlert: {
            result = @"";
            break;
        }
        case WXModalTypeConfirm: {
            NSString *clickTitle = [alertView buttonTitleAtIndex:buttonIndex];
            result = clickTitle;
            break;
        }
        case WXModalTypePrompt: {
            NSString *clickTitle = [alertView buttonTitleAtIndex:buttonIndex];
            NSString *text= [[alertView textFieldAtIndex:0] text] ?: @"";
            result = [WXUtility JSONString:@{ @"result": clickTitle, @"data": text }];
        }
        default:
            break;
    }
    
    callback(result);
}

- (NSString*)stringValue:(id)value
{
    if ([value isKindOfClass:[NSString class]]) {
        return value;
    }
    if ([value isKindOfClass:[NSNumber class]]) {
        return [value stringValue];
    }
    return nil;
}

@end

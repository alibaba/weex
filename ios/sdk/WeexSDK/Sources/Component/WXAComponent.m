/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXAComponent.h"
#import "WXNavigationProtocol.h"
#import "WXHandlerFactory.h"
#import "WXLog.h"
#import "WXComponent+Events.h"

@interface WXAComponent()

@property (nonatomic, strong) UITapGestureRecognizer *tap;
@property (nonatomic, strong) NSString *href;

@end

@implementation WXAComponent

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        _tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(openURL)];
        _tap.delegate = self;
        if (attributes[@"href"]) {
            _href = attributes[@"href"];
        }
    }
    return self;
}

- (void)viewDidLoad
{
    [self.view addGestureRecognizer:_tap];
}

- (void)openURL
{
    if (_href && [_href length] > 0) {
        id<WXNavigationProtocol> navigationHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXNavigationProtocol)];
        if ([navigationHandler respondsToSelector:@selector(pushViewControllerWithParam:
                                                            completion:
                                                            withContainer:)]) {
            __weak typeof(self) weexSelf = self;
            [navigationHandler pushViewControllerWithParam:@{@"url":_href} completion:^(NSString *code, NSDictionary *responseData) {
                WXLogDebug(@"Push success -> %@", weexSelf.href);
            } withContainer:self.weexInstance.viewController];
        } else {
            WXLogError(@"Event handler of class %@ does not respond to pushViewControllerWithParam", NSStringFromClass([navigationHandler class]));
        }
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"href"]) {
        _href = attributes[@"href"];
    }
}

@end

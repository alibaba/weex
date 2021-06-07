//
//  WXTitleBarModule.m
//  WeexDemo
//
//  Created by zifan.zx on 2018/1/15.
//  Copyright © 2018年 taobao. All rights reserved.
//

#import "WXTitleBarModule.h"
#import "WXDemoViewController.h"

@implementation WXTitleBarModule
@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(setTitle:))
WX_EXPORT_METHOD(@selector(showTitleBar:))
WX_EXPORT_METHOD(@selector(setStyle:))

- (void)setTitle:(NSString*)title
{
    if (title) {
        [weexInstance.viewController.navigationItem setTitle:title];
    }
}

- (void)setStyle:(NSDictionary*)styles
{
    if (styles[@"backgroundColor"]) {
        weexInstance.viewController.navigationController.navigationBar.barTintColor = [WXConvert UIColor:styles[@"backgroundColor"]];
    }
    if (styles[@"foregroundColor"]) {
        weexInstance.viewController.navigationController.navigationBar.tintColor = [WXConvert UIColor:styles[@"foregroundColor"]];
        [weexInstance.viewController.navigationController.navigationBar setTitleTextAttributes:@{NSForegroundColorAttributeName:[WXConvert UIColor:styles[@"foregroundColor"]]}];
    }
}

- (void)dealloc
{
    weexInstance.viewController.navigationController.navigationBar.tintColor = [UIColor whiteColor];
}

- (void)showTitleBar:(bool)show
{
    [weexInstance.viewController.navigationController setNavigationBarHidden:!show];
    ((WXDemoViewController*)weexInstance.viewController).showNavigationBar = !show;
}

@end

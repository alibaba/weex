/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXNavigatorModule.h"
#import "WXSDKManager.h"
#import "WXUtility.h"
#import "WXBaseViewController.h"
#import "WXNavigationProtocol.h"
#import "WXHandlerFactory.h"
#import "WXConvert.h"

@implementation WXNavigatorModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(open:success:failure:))
WX_EXPORT_METHOD(@selector(close:success:failure:))
WX_EXPORT_METHOD(@selector(push:callback:))
WX_EXPORT_METHOD(@selector(pop:callback:))
WX_EXPORT_METHOD(@selector(setNavBarBackgroundColor:callback:))
WX_EXPORT_METHOD(@selector(setNavBarLeftItem:callback:))
WX_EXPORT_METHOD(@selector(clearNavBarLeftItem:callback:))
WX_EXPORT_METHOD(@selector(setNavBarRightItem:callback:))
WX_EXPORT_METHOD(@selector(clearNavBarRightItem:callback:))
WX_EXPORT_METHOD(@selector(setNavBarMoreItem:callback:))
WX_EXPORT_METHOD(@selector(clearNavBarMoreItem:callback:))
WX_EXPORT_METHOD(@selector(setNavBarTitle:callback:))
WX_EXPORT_METHOD(@selector(clearNavBarTitle:callback:))
WX_EXPORT_METHOD(@selector(setNavBarHidden:callback:))

- (id<WXNavigationProtocol>)navigator
{
    id<WXNavigationProtocol> navigator = [WXHandlerFactory handlerForProtocol:@protocol(WXNavigationProtocol)];
    return navigator;
}

#pragma mark Weex Application Interface

- (void)open:(NSDictionary *)param success:(WXModuleCallback)success failure:(WXModuleCallback)failure
{
    id<WXNavigationProtocol> navigator = [self navigator];
    UIViewController *container = self.weexInstance.viewController;
    [navigator open:param success:success failure:failure withContainer:container];
}
    
- (void)close:(NSDictionary *)param success:(WXModuleCallback)success failure:(WXModuleCallback)failure
{
    id<WXNavigationProtocol> navigator = [self navigator];
    UIViewController *container = self.weexInstance.viewController;
    [navigator close:param success:success failure:failure withContainer:container];
}
    
- (void)push:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    id<WXNavigationProtocol> navigator = [self navigator];
    UIViewController *container = self.weexInstance.viewController;
    [navigator pushViewControllerWithParam:param completion:^(NSString *code, NSDictionary *responseData) {
        if (callback && code) {
            callback(code);
        }
    } withContainer:container];
}

- (void)pop:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    id<WXNavigationProtocol> navigator = [self navigator];
    UIViewController *container = self.weexInstance.viewController;
    [navigator popViewControllerWithParam:param completion:^(NSString *code, NSDictionary *responseData) {
        if (callback && code) {
            callback(code);
        }
    } withContainer:container];
}

- (void)setNavBarHidden:(NSDictionary*)param callback:(WXModuleCallback)callback
{
    NSString *result = MSG_FAILED;
    if ([[NSArray arrayWithObjects:@"0",@"1",@0,@1, nil] containsObject:param[@"hidden"]]) {
        id<WXNavigationProtocol> navigator = [self navigator];
        [navigator setNavigationBarHidden:[param[@"hidden"] boolValue] animated:[param[@"animated"] boolValue] withContainer:self.weexInstance.viewController];
        result = MSG_SUCCESS;
    }
    callback(result);
}

#pragma mark Navigation Setup

- (void)setNavBarBackgroundColor:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    NSString *backgroundColor = param[@"backgroundColor"];
    if (!backgroundColor) {
        callback(MSG_PARAM_ERR);
    }
    
    id<WXNavigationProtocol> navigator = [self navigator];
    UIViewController *container = self.weexInstance.viewController;
    [navigator setNavigationBackgroundColor:[WXConvert UIColor:backgroundColor] withContainer:container];
    callback(MSG_SUCCESS);
}

- (void)setNavBarRightItem:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    [self setNavigationItemWithParam:param position:WXNavigationItemPositionRight withCallback:callback];
}

- (void)clearNavBarRightItem:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    [self clearNavigationItemWithParam:param position:WXNavigationItemPositionRight withCallback:callback];
}

- (void)setNavBarLeftItem:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    [self setNavigationItemWithParam:param position:WXNavigationItemPositionLeft withCallback:callback];
}

- (void)clearNavBarLeftItem:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    [self clearNavigationItemWithParam:param position:WXNavigationItemPositionLeft withCallback:callback];
}

- (void)setNavBarMoreItem:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    [self setNavigationItemWithParam:param position:WXNavigationItemPositionMore withCallback:callback];
}

- (void)clearNavBarMoreItem:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    [self clearNavigationItemWithParam:param position:WXNavigationItemPositionMore withCallback:callback];
}

- (void)setNavBarTitle:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    [self setNavigationItemWithParam:param position:WXNavigationItemPositionCenter withCallback:callback];
}

- (void)clearNavBarTitle:(NSDictionary *)param callback:(WXModuleCallback)callback
{
    [self clearNavigationItemWithParam:param position:WXNavigationItemPositionCenter withCallback:callback];
}

- (void)setNavigationItemWithParam:(NSDictionary *)param position:(WXNavigationItemPosition)position withCallback:(WXModuleCallback)callback
{
    id<WXNavigationProtocol> navigator = [self navigator];
    UIViewController *container = self.weexInstance.viewController;
    
    NSMutableDictionary *mutableParam = [param mutableCopy];
    [mutableParam setObject:self.weexInstance.instanceId forKey:@"instanceId"];
    
    [navigator setNavigationItemWithParam:mutableParam position:position completion:^(NSString *code, NSDictionary *responseData) {
        if (callback && code) {
            callback(code);
        }
    } withContainer:container];
}

- (void)clearNavigationItemWithParam:(NSDictionary *)param position:(WXNavigationItemPosition)position withCallback:(WXModuleCallback)callback
{
    id<WXNavigationProtocol> navigator = [self navigator];
    UIViewController *container = self.weexInstance.viewController;
    [navigator clearNavigationItemWithParam:param position:position completion:^(NSString *code, NSDictionary *responseData) {
        if (callback && code) {
            callback(code);
        }
    } withContainer:container];
}

@end

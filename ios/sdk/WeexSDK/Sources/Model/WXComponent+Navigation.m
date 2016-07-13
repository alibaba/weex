/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent+Navigation.h"
#import "WXComponent_internal.h"
#import "WXSDKInstance_private.h"
#import "WXBaseViewController.h"
#import "WXHandlerFactory.h"
#import "WXConvert.h"
#import "WXUtility.h"

#define kBarTintColor @"barTintColor"
#define kBarItemText @"title"
#define kBarItemTextColor @"titleColor"
#define kBarItemIcon  @"icon"

#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"

@implementation WXComponent (Navigation)

- (id<WXNavigationProtocol>)navigator
{
    id<WXNavigationProtocol> navigator = [WXHandlerFactory handlerForProtocol:@protocol(WXNavigationProtocol)];
    return navigator;
}

// navigtion configuration
- (void)_setupNavBarWithStyles:(NSMutableDictionary *)styles attributes:(NSMutableDictionary *)attributes
{
    NSString *dataRole = attributes[@"dataRole"];
    if (dataRole && [dataRole isEqualToString:@"navbar"]) {
        styles[@"visibility"] = @"hidden";
        styles[@"position"] = @"fixed";
        
        self.weexInstance.naviBarStyles = [NSMutableDictionary new];
        
        [self setNavigationBarHidden:NO];
        
        NSString *backgroundColor = styles[@"backgroundColor"];
        [self setNavigationBackgroundColor:[WXConvert UIColor:backgroundColor]];
    }
    
    NSString *position = attributes[@"naviItemPosition"];
    if (position) {
        NSMutableDictionary *data = [NSMutableDictionary new];
        [data setObject:_type forKey:@"type"];
        [data setObject:styles forKey:@"style"];
        [data setObject:attributes forKey:@"attr"];
        
        if ([position isEqualToString:@"left"]) {
            [self setNavigationItemWithParam:data position:WXNavigationItemPositionLeft];
        }
        else if ([position isEqualToString:@"right"]) {
            [self setNavigationItemWithParam:data position:WXNavigationItemPositionRight];
        }
        else if ([position isEqualToString:@"center"]) {
            [self setNavigationItemWithParam:data position:WXNavigationItemPositionCenter];
        }
    }
}

- (void)_updateNavBarAttributes:(NSDictionary *)attributes
{
    if (attributes[@"data-role"]) {
        NSString *dataRole = attributes[@"data-role"];
        if ([dataRole isEqualToString:@"navbar"]) {
            [self setNavigationBarHidden:NO];
            
            NSDictionary *style = self.styles[@"style"];
            NSString *backgroundColor = style[@"backgroundColor"];
            [self setNavigationBackgroundColor:[WXConvert UIColor:backgroundColor]];
        }
    }
}


- (void)setNavigationBarHidden:(BOOL)hidden
{
    UIViewController *container = self.weexInstance.viewController;
    id<WXNavigationProtocol> navigator = [self navigator];
    
    WXPerformBlockOnMainThread(^{
        [navigator setNavigationBarHidden:hidden animated:NO withContainer:container];
    });
}

- (void)setNavigationBackgroundColor:(UIColor *)backgroundColor
{
    if (!backgroundColor) return;
    
    NSMutableDictionary *styles = self.weexInstance.naviBarStyles;
    [styles setObject:backgroundColor forKey:kBarTintColor];
    
    UIViewController *container = self.weexInstance.viewController;
    id<WXNavigationProtocol> navigator = [self navigator];
    
    WXPerformBlockOnMainThread(^{
        [navigator setNavigationBackgroundColor:backgroundColor withContainer:container];
    });
}

- (void)setNavigationItemWithParam:(NSDictionary *)param position:(WXNavigationItemPosition)position
{
    if (!param)  return;
    
    __weak __block typeof(WXComponent) *weakSelf = self;
    
    NSArray *array = @[@"center",@"right",@"left",@"more"];
    
    [self _parse:param resultBlock:^(NSDictionary *dict) {
        NSMutableDictionary *styles = weakSelf.weexInstance.naviBarStyles;
        [styles setObject:dict forKey: array[position]];
        
        UIViewController *container = weakSelf.weexInstance.viewController;
        id<WXNavigationProtocol> navigator = [weakSelf navigator];
        
        WXPerformBlockOnMainThread(^{
            [navigator setNavigationItemWithParam:dict position:position completion:nil withContainer:container];
        });
    }];
}

- (void)setNavigationWithStyles:(NSDictionary *)styles
{
    UIViewController *container = self.weexInstance.viewController;
    id<WXNavigationProtocol> navigator = [self navigator];

    if (styles) {
        [navigator setNavigationBarHidden:NO animated:NO withContainer:container];
        [navigator setNavigationBackgroundColor:styles[kBarTintColor] withContainer:container];
        
        NSArray *array = @[@"center",@"right",@"left",@"more"];
        [array enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            [navigator setNavigationItemWithParam:styles[obj] position:idx completion:nil withContainer:container];
        }];
    }
    else {
        [navigator setNavigationBarHidden:YES animated:NO withContainer:container];
    }
}

- (void)_parse:(NSDictionary *)param resultBlock:(void(^)(NSDictionary *))result
{
    NSMutableDictionary *dict = [NSMutableDictionary new];
    NSString *type = param[@"type"];
    
    [dict setObject:self.weexInstance.instanceId forKey:@"instanceId"];
    [dict setObject:self.ref forKey:@"nodeRef"];
    
    if ([type isEqualToString:@"text"]) {
        NSDictionary *attr = param[@"attr"];
        NSString *title = attr[@"value"];
        if (title) {
            [dict setObject:title forKey:kBarItemText];
        }
        
        NSDictionary *style = param[@"style"];
        NSString *color = style[@"color"];
        if (color) {
            [dict setObject:color forKey:kBarItemTextColor];
        }
    }
    else if ([type isEqualToString:@"image"]) {
        NSDictionary *attr = param[@"attr"];
        NSString *src = attr[@"src"];
        if (src) {
            [dict setObject:src forKey:kBarItemIcon];
        }
    }
    result(dict);
}

@end

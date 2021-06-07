/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import <WeexSDK/WeexSDK.h>
#import "WXNavigationHandlerImpl.h"
#import "WXDemoViewController.h"

@implementation WXNavigationHandlerImpl



- (void)clearNavigationItemWithParam:(NSDictionary *)param position:(WXNavigationItemPosition)position completion:(WXNavigationResultBlock)block withContainer:(UIViewController *)container {
    
}

- (id)navigationControllerOfContainer:(UIViewController *)container {
    return container.navigationController;
}

- (void)popViewControllerWithParam:(NSDictionary *)param completion:(WXNavigationResultBlock)block withContainer:(UIViewController *)container {
    BOOL animated = YES;
    id obj = [param objectForKey:@"animated"];
    if (obj) {
        animated = [WXConvert BOOL:obj];
    }
    [container.navigationController popViewControllerAnimated:animated];
}

- (void)pushViewControllerWithParam:(NSDictionary *)param completion:(WXNavigationResultBlock)block withContainer:(UIViewController *)container {
    BOOL animated = YES;
    NSString *obj = [[param objectForKey:@"animated"] lowercaseString];
    if (obj && [obj isEqualToString:@"false"]) {
        animated = NO;
    }
    
    WXDemoViewController *vc = [[WXDemoViewController alloc] init];
    vc.url = [NSURL URLWithString:param[@"url"]];
    vc.hidesBottomBarWhenPushed = YES;
    [container.navigationController pushViewController:vc animated:animated];
}

- (void)setNavigationBackgroundColor:(UIColor *)backgroundColor withContainer:(UIViewController *)container {
    
}

- (void)setNavigationBarHidden:(BOOL)hidden animated:(BOOL)animated withContainer:(UIViewController *)container {
    if (![container isKindOfClass:[WXBaseViewController class]]) {
        return;
    }
    
    container.navigationController.navigationBarHidden = hidden;
}

- (void)setNavigationItemWithParam:(NSDictionary *)param position:(WXNavigationItemPosition)position completion:(WXNavigationResultBlock)block withContainer:(UIViewController *)container {
    
}

@end

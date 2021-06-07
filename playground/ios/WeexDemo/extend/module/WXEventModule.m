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

#import "WXEventModule.h"
#import "WXDemoViewController.h"
#import "WXScannerVC.h"
#import <WeexSDK/WeexSDK.h>

@implementation WXEventModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(openURL:))

WX_EXPORT_METHOD(@selector(fireNativeGlobalEvent:callback:))

- (void)openURL:(NSString *)url
{
    NSString *newURL = url;
    if ([url hasPrefix:@"//"]) {
        newURL = [NSString stringWithFormat:@"http:%@", url];
    } else if ([url hasPrefix:@"weex://go/scan"]){
        WXScannerVC * sannerVC = [WXScannerVC new];
        [[weexInstance.viewController navigationController] pushViewController:sannerVC animated:YES];
        return;
    } else if (![url hasPrefix:@"http"]) {
        // relative path
        newURL = [NSURL URLWithString:url relativeToURL:weexInstance.scriptURL].absoluteString;
    }
    
    UIViewController *controller = [[WXDemoViewController alloc] init];
    ((WXDemoViewController *)controller).url = [NSURL URLWithString:newURL];
    
    [[weexInstance.viewController navigationController] pushViewController:controller animated:YES];
}


/**
 a test method for macaca case, you can fire globalEvent when download finish、device shaked and so on.
 @param event event name
 */
- (void)fireNativeGlobalEvent:(NSString *)event callback:(WXKeepAliveCallback)callback
{
    [weexInstance fireGlobalEvent:event params:@{@"eventParam":@"eventValue"}];
    if (callback) {
        NSDictionary * result = @{@"ok": @true};
        callback(result,false);
    }
}

@end


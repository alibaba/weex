/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXATLoggerPlugin.h"
#import <WeexSDK/WXSDKEngine.h>

@implementation WXATLoggerPlugin

- (void)pluginDidLoadWithArgs:(NSArray *)args
{
  
}

- (void)pluginWillOpenInContainer:(UIViewController *)container withArg:(NSArray *)args
{
    NSURL *URL = [NSURL URLWithString:@"http://127.0.0.1:8687/launchDebugger"];
    NSURLRequest *request = [NSURLRequest requestWithURL:URL];
    
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                            completionHandler:
                                  ^(NSData *data, NSURLResponse *response, NSError *error) {
                                      // ...
                                  }];
    
    [task resume];
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [WXSDKEngine connectDebugServer:@"ws://127.0.0.1:8687/debugger/0/renderer"];
    });
}

- (void)pluginWillClose
{
    
}

- (void)pluginDidUnload
{
    
}

- (CGRect)wantReactArea
{
    return CGRectZero;
}


@end

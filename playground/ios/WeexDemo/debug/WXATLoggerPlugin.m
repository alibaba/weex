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

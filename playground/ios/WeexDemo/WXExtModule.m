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

#import "WXExtModule.h"

@implementation WXExtModule

WX_EXPORT_METHOD(@selector(generateCover:))

- (void)generateCover:(WXModuleKeepAliveCallback)callback
{
#if DEBUG
#if !TARGET_IPHONE_SIMULATOR
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *documentsDirectory = [paths objectAtIndex:0];
    setenv("GCOV_PREFIX", [documentsDirectory cStringUsingEncoding:NSUTF8StringEncoding], 1);
    setenv("GCOV_PREFIX_STRIP", "6", 1);
#endif
    
#if defined __cplusplus
    extern "C" {
#endif
    extern void __gcov_flush(void);
    __gcov_flush();
#if defined __cplusplus
    };
#endif
    
    if (callback) {
        NSDictionary * result = @{@"ok": @true};
        callback(result,NO);
    }
#else
    if (callback) {
        NSDictionary * result = @{@"ok": @false,@"msg":@"only debug mode support"};
        callback(result,NO);
    }
#endif
}

@end

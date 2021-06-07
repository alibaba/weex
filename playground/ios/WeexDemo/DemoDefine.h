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

#import <Foundation/Foundation.h>

#define CURRENT_IP [NSString stringWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"localServer-ip" ofType:@".txt"] encoding:NSUTF8StringEncoding error:nil]

#if TARGET_IPHONE_SIMULATOR
    #define DEMO_HOST @"127.0.0.1"
#else
    #define DEMO_HOST CURRENT_IP
#endif

#define DEMO_URL(path) [NSString stringWithFormat:@"http://%@:12580/%s", DEMO_HOST, #path]

#define HOME_URL [NSString stringWithFormat:@"http://%@:12580/examples/build/vue/index.js", DEMO_HOST]

#define BUNDLE_URL [NSString stringWithFormat:@"file://%@/bundlejs/landing.weex.js",[NSBundle mainBundle].bundlePath]

#define UITEST_HOME_URL @"http://test?_wx_tpl=http://localhost:12580/test/build/TC__Home.js"

#define QRSCAN  @"com.taobao.WeexDemo.scan"
#define QRSCAN_HISTORY  @"com.taobao.WeexDemo.scan.history"
#define WEEX_COLOR [UIColor colorWithRed:0.27 green:0.71 blue:0.94 alpha:1]
#define WX_SCANNER_HISTORY @"wx_scanner_history"

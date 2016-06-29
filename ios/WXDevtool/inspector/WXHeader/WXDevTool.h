/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@interface WXDevTool : NSObject

/**
 *  set debug status
 *  @param isDebug  : YES:open debug;default is NO
 **/
+ (void)setDebug:(BOOL)isDebug;


/**
 *  get debug status
 **/
+ (BOOL)isDebug;

/**
 *  launch weex inspector
 *  @param url  : ws://ip:port/debugProxy/native, ip and port is your devtool server address
 *                eg:@"ws://30.30.29.242:8088/debugProxy/native"
 **/
+ (void)launchInspectorWithSocketUrl:(NSString *)url;

/**
 *  launch weex debug
 *  @param url  : ws://ip:port/debugProxy/native, ip and port is your devtool server address
 *                eg:@"ws://30.30.29.242:8088/debugProxy/native"
 **/
+ (void)launchDebugWithSocketUrl:(NSString *)url;

@end

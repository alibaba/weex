/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXSDKInstance.h"
#import "WXBridgeManager.h"

@class WXModuleManager;

@interface WXSDKManager : NSObject

/**
 * @abstract Returns bridge manager
 **/
+ (WXBridgeManager *)bridgeMgr;

/**
 * @abstract Returns module manager
 **/
+ (WXModuleManager *)moduleMgr;

/**
 * @abstract Returns weex instance for specific identifier
 **/
+ (WXSDKInstance *)instanceForID:(NSString *)identifier;

/**
 * @abstract Returns weex instance for specific identifier
 **/
+ (void)storeInstance:(WXSDKInstance *)instance forID:(NSString *)identifier;

/**
 * @abstract Returns weex instance for specific identifier
 **/
+ (void)removeInstanceforID:(NSString *)identifier;

/**
 * @abstract unload
 **/
+ (void)unload;

@end

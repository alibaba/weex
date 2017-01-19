/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@class WXCallJSMethod;
@class WXSDKInstance;

@interface WXBridgeContext : NSObject

/**
 *  return instance at the top of the stack.
 **/
@property (nonatomic, weak, readonly) WXSDKInstance *topInstance;

/**
 *  Create Instance Method
 *  @param instance  :   instance id
 *  @param template  :   template data
 *  @param options   :   parameters
 *  @param data      :   external data
 **/
- (void)createInstance:(NSString *)instance
              template:(NSString *)temp
               options:(NSDictionary *)options
                  data:(id)data;

/**
 *  Destroy Instance Method
 *  @param instance  :   instance id
 **/
- (void)destroyInstance:(NSString *)instance;

/**
 *  Refresh Instance Method
 *  @param instance  :   instance id
 *  @param data      :   external data
 **/
- (void)refreshInstance:(NSString *)instance
                   data:(id)data;

/**
 *  Update Instacne State Method
 *  @param instance  :   instance id
 *  @param data      :   parameters
 **/
- (void)updateState:(NSString *)instance
               data:(id)data;

/**
 *  Execute JSFramework Script
 *  @param script    :   script code
 **/
- (void)executeJsFramework:(NSString *)script;

/**
 *  Execute JS Method
 *  @param method    :   object of bridge method
 **/
- (void)executeJsMethod:(WXCallJSMethod *)method;
/**
 *  Register Modules Method
 *  @param modules   :   module list
 **/
- (void)registerModules:(NSDictionary *)modules;

/**
 *  Execute JS Service
 *  @param method    :   JS services name
 *  @param method    :   JS services script
 **/
- (void)executeJsService:(NSString *)script withName: (NSString *)name;

/**
 *  Register Components Method
 *  @param components:   component list
 **/
- (void)registerComponents:(NSArray *)components;

/**
 *  Connect To WebSocket for devtool debug
 *  @param url       :   url to connect
 **/
- (void)connectToDevToolWithUrl:(NSURL *)url;

/**
 *  Connect To WebSocket for collecting log
 *  @param url       :   url to connect
 **/
- (void)connectToWebSocket:(NSURL *)url;

/**
 *  Log To WebSocket
 *  @param flag      :   the tag to indentify
 *  @param message   :   message to output
 **/
- (void)logToWebSocket:(NSString *)flag message:(NSString *)message;

/**
 *  Reset Environment
 **/
- (void)resetEnvironment;

@end

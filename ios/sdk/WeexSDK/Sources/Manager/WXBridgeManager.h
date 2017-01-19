/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@class WXBridgeMethod;
@class WXSDKInstance;

@interface WXBridgeManager : NSObject

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
 * @abstract return currentInstanceId
 **/
- (NSArray *)getInstanceIdStack;

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
- (void)refreshInstance:(NSString *)instance data:(id)data;

/**
 *  Unload
 **/
- (void)unload;

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
 *  Register JS service Script
 *  @param name      :   service name
 *  @param script    :   script code
 *  @param options   :   service options
 **/
- (void)registerService:(NSString *)name withService:(NSString *)serviceScript withOptions:(NSDictionary *)options;


/**
 *  Register JS service Script
 *  @param name         :   service name
 *  @param scriptUrl    :   script url
 *  @param options      :   service options
 **/

-(void)registerService:(NSString *)name withServiceUrl:(NSURL *)serviceScriptUrl withOptions:(NSDictionary *)options;

/**
 *  Unregister JS service Script
 *  @param script    :   script code
 **/
- (void)unregisterService:(NSString *)name;

/**
 *  Register Modules Method
 *  @param modules   :   module list
 **/
- (void)registerModules:(NSDictionary *)modules;

/**
 *  Register Components Method
 *  @param components:   component list
 **/
- (void)registerComponents:(NSArray* )components;

/**
 *  FireEvent
 *  @param instanceId:   instance id
 *  @param ref       :   node reference
 *  @param type      :   event type
 *  @param params    :   parameters
 *  @param domChanges:   dom value changes, used for two-way data binding
 **/
- (void)fireEvent:(NSString *)instanceId ref:(NSString *)ref type:(NSString *)type params:(NSDictionary *)params domChanges:(NSDictionary *)domChanges;

/**
 *  callBack
 *
 *  @param instanceId instanceId
 *  @param funcId     funcId
 *  @param params     params
 *  @param iflast     indicate that whether this func will be reused
 */
- (void)callBack:(NSString *)instanceId funcId:(NSString *)funcId params:(id)params keepAlive:(BOOL)keepAlive;

/**
 *  Connect To WebSocket for devtool debug
 *  @param url       :   url to connect
 **/
- (void)connectToDevToolWithUrl:(NSURL *)url;

/**
 *  CallBack
 *  @param instanceId:   instance id
 *  @param funcId    :   callback id
 *  @param params    :   parameters
 **/
- (void)callBack:(NSString *)instanceId funcId:(NSString *)funcId params:(id)params;

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

- (void)fireEvent:(NSString *)instanceId ref:(NSString *)ref type:(NSString *)type params:(NSDictionary *)params DEPRECATED_MSG_ATTRIBUTE("Use fireEvent:ref:type:params:domChanges: method instead.");
- (void)executeJsMethod:(WXBridgeMethod *)method DEPRECATED_MSG_ATTRIBUTE();

@end

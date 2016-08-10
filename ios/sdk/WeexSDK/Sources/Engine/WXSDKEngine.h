/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@class WXSDKInstance;

@interface WXSDKEngine : NSObject

/**
 *  @abstract Registers a module for a given name
 *
 *  @param name The module name to register
 *
 *  @param clazz  The module class to register
 *
 **/
+ (void)registerModule:(NSString *)name withClass:(Class)clazz;

/**
 * @abstract Registers a component for a given name
 *
 * @param name The component name to register
 *
 * @param clazz The WXComponent subclass to register
 *
 **/
+ (void)registerComponent:(NSString *)name withClass:(Class)clazz;

/**
 * @abstract Registers a component for a given name and specific properties
 *
 * @param name The component name to register
 *
 * @param clazz The WXComponent subclass to register
 *
 * @param properties properties to apply to the component
 *
 */
+ (void)registerComponent:(NSString *)name withClass:(Class)clazz withProperties:(NSDictionary *)properties;

/**
 * @abstract Registers a handler for a given handler instance and specific protocol
 *
 * @param handler The handler instance to register
 *
 * @param protocol The protocol to confirm
 *
 */
+ (void)registerHandler:(id)handler withProtocol:(Protocol *)protocol;

/**
 * @abstract Initializes the global sdk enviroment
 *
 * @discussion Injects main.js in app bundle as default JSFramework script.
 *
 **/
+ (void)initSDKEnviroment;

/**
 * @abstract Initializes the enviroment with a given JSFramework script.
 *
 **/
+ (void)initSDKEnviroment:(NSString *)script;

/**
 * @abstract Unloads the bridge context
 *
 **/
+ (void)unload;

/**
 * @abstract restart Weex Engine.
 **/
+ (void)restart;

/**
 * @abstract Returns the version of SDK
 *
 **/
+ (NSString*)SDKEngineVersion;

/**
 * @abstract The Instance at the top of the rendering stack. 
 *
 **/
+ (WXSDKInstance *)topInstance;

/**
 * @abstract Connects to websocket for collecting log
 *
 * @param URL The URL of websocket to connect
 *
 */
+ (void)connectDebugServer:(NSString*)URL;

/**
 * @abstract Connects to websocket for devtool debug
 *
 * @param URL The URL of websocket to connect
 *
 */
+ (void)connectDevToolServer:(NSString *)URL;

@end

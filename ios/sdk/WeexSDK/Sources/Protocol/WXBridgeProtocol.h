/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <JavaScriptCore/JavaScriptCore.h>

typedef NSInteger(^WXJSCallNative)(NSString *instance, NSArray *tasks, NSString *callback);
typedef NSInteger(^WXJSCallAddElement)(NSString *instanceId,  NSString *parentRef, NSDictionary *elementData, NSInteger index);
typedef NSInvocation *(^WXJSCallNativeModule)(NSString *instanceId, NSString *moduleName, NSString *methodName, NSArray *args, NSDictionary *options);
typedef void (^WXJSCallNativeComponent)(NSString *instanceId, NSString *componentRef, NSString *methodName, NSArray *args, NSDictionary *options);

@protocol WXBridgeProtocol <NSObject>

@property (nonatomic, readonly) JSValue* exception;

/**
 * Executes the js framework code in javascript engine
 * You can do some setup in this method
 */
- (void)executeJSFramework:(NSString *)frameworkScript;

/**
 * Executes the js code in javascript engine
 * You can do some setup in this method
 */
- (void)executeJavascript:(NSString *)script;

/**
 * Executes global js method with specific arguments
 */
- (JSValue *)callJSMethod:(NSString *)method args:(NSArray*)args;

/**
 * Register callback when call native tasks occur
 */
- (void)registerCallNative:(WXJSCallNative)callNative;

/**
 * Reset js engine environment, called when any environment variable is changed.
 */
- (void)resetEnvironment;

@optional

/**
 * Called when garbage collection is wanted by sdk.
 */
- (void)garbageCollect;

/**
 * Register callback when addElement tasks occur
 */
- (void)registerCallAddElement:(WXJSCallAddElement)callAddElement;

/**
 * Register callback for global js function `callNativeModule`
 */
- (void)registerCallNativeModule:(WXJSCallNativeModule)callNativeModuleBlock;

/**
 * Register callback for global js function `callNativeComponent`
 */
- (void)registerCallNativeComponent:(WXJSCallNativeComponent)callNativeComponentBlock;


@end

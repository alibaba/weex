/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <JavaScriptCore/JavaScriptCore.h>

typedef NSInteger (^WXJSCallNative)(NSString *instance, NSArray *tasks, NSString *callback);
typedef NSInteger (^WXJSCallAddElement)(NSString *instanceId,  NSString *parentRef, NSDictionary *elementData, NSInteger index);


@protocol WXBridgeProtocol <NSObject>

@property (nonatomic, readonly) JSValue* exception;

/**
 * Executes the js framework code in javascript engine
 * You can do some setup in this method
 */
- (void)executeJSFramework:(NSString *)frameworkScript;

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
 * Register callback when addElement tasks occur
 */
- (void)registerCallAddElement:(WXJSCallAddElement)callAddElement;

/**
 * Called when garbage collection is wanted by sdk.
 */
- (void)garbageCollect;

@end

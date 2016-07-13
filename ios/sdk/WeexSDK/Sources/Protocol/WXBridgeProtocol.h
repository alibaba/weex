/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <JavaScriptCore/JavaScriptCore.h>

typedef NSInteger (^WXJSCallNative)(NSString *instance, NSArray *tasks, NSString *callback);

@protocol WXBridgeProtocol <NSObject>

@property (nonatomic, readonly) JSValue* exception;

- (void)executeJSFramework:(NSString *)frameworkScript;

- (void)callJSMethod:(NSString *)method args:(NSArray*)args;

- (void)registerCallNative:(WXJSCallNative)callNative;

- (void)resetEnvironment;

@end

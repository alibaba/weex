/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXBridgeMethod.h"

typedef enum : NSUInteger {
    WXModuleMethodTypeSync,
    WXModuleMethodTypeAsync,
} WXModuleMethodType;

@interface WXModuleMethod : WXBridgeMethod

@property (nonatomic, assign) WXModuleMethodType methodType;
@property (nonatomic, strong, readonly) NSString *moduleName;

- (instancetype)initWithModuleName:(NSString *)moduleName
                        methodName:(NSString *)methodName
                         arguments:(NSArray *)arguments
                          instance:(WXSDKInstance *)instance;

- (NSInvocation *)invoke;

@end

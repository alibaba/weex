/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
@class WXSDKInstance;

@interface WXBridgeMethod : NSObject

@property (nonatomic, strong, readonly) NSString *methodName;
@property (nonatomic, copy, readonly) NSArray *arguments;
@property (nonatomic, weak, readonly) WXSDKInstance *instance;

- (instancetype)initWithMethodName:(NSString *)methodName
                         arguments:(NSArray *)arguments
                          instance:(WXSDKInstance *)instance;

- (NSInvocation *)invocationWithTarget:(id)target selector:(SEL)selector;

@end


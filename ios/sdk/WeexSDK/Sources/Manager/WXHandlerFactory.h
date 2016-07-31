/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@interface WXHandlerFactory : NSObject

/**
 * @abstract Register a handler for a given handler instance and specific protocol
 *
 * @param handler The handler instance to register
 *
 * @param protocol The protocol to confirm
 *
 */
+ (void)registerHandler:(id)handler withProtocol:(Protocol *)protocol;

/**
 * @abstract Returns the handler for a given protocol
 *
 **/
+ (id)handlerForProtocol:(Protocol *)protocol;

/**
 * @abstract Returns the registered handlers.
 */
+ (NSDictionary *)handlerConfigs;

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@interface WXServiceFactory : NSObject

/**
 * @abstract Registers a service for a given name, js code and options
 *
 * @param name The service name to register
 *
 * @param options The service options to register
 *
 * @param code service js code to invoke
 *
 * @return script
 *
 */
+ (NSString *)registerServiceScript:(NSString *)name withRawScript:(NSString *)serviceScript withOptions:(NSDictionary *)options;


/**
 * @abstract Unregisters a component for a given name
 *
 * @param name The service name to register
 *
 * @return script
 *
 */
+ (NSString *)unregisterServiceScript:(NSString *)name;

@end

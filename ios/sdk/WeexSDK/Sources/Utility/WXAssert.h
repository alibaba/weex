/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXDefine.h"

void WXAssertIntenal(NSString *func, NSString *file, int lineNum, NSString *format, ...);

#if DEBUG
#define WXAssert(condition, ...) \
do{\
    if(!(condition)){\
        WXAssertIntenal(@(__func__), @(__FILE__), __LINE__, __VA_ARGS__);\
    }\
}while(0)
#else
#define WXAssert(condition, ...)
#endif

/**
 *  @abstract macro for asserting that a parameter is required.
 */
#define WXAssertParam(name) WXAssert(name, \
@"the parameter '%s' is required", #name)

/**
 *  @abstract macro for asserting if the handler conforms to the protocol
 */
#define WXAssertProtocol(handler, protocol) WXAssert([handler conformsToProtocol:protocol], \
@"handler does not conform to protocol")

/**
 *  @abstract macro for asserting that the object is kind of special class.
 */
#define WXAssertClass(name,className) WXAssert([name isKindOfClass:[className class]], \
@"the variable '%s' is not a kind of '%s' class", #name,#className)

/**
 *  @abstract macro for asserting that we are running on the main thread.
 */
#define WXAssertMainThread() WXAssert([NSThread isMainThread], \
@"must be called on the main thread")

/**
 *  @abstract macro for asserting that we are running on the component thread.
 */
#define WXAssertComponentThread() \
WXAssert([[NSThread currentThread].name isEqualToString:WX_COMPONENT_THREAD_NAME], \
@"must be called on the component thread")

/**
 *  @abstract macro for asserting that we are running on the bridge thread.
 */
#define WXAssertBridgeThread() \
WXAssert([[NSThread currentThread].name isEqualToString:WX_BRIDGE_THREAD_NAME], \
@"must be called on the bridge thread")

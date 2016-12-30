/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import "WXDefine.h"
#import "WXSDKInstance.h"

#define MSG_SUCCESS     @"WX_SUCCESS"
#define MSG_NO_HANDLER  @"WX_NO_HANDLER"
#define MSG_NO_PERMIT   @"WX_NO_PERMISSION"
#define MSG_FAILED      @"WX_FAILED"
#define MSG_PARAM_ERR   @"WX_PARAM_ERR"
#define MSG_EXP         @"WX_EXCEPTION"

@protocol WXModuleProtocol <NSObject>

/**
 * @abstract the module callback , result can be string or dictionary.
 * @discussion callback data to js, the id of callback function will be removed to save memory.
 */
typedef void (^WXModuleCallback)(id result);

/**
 * @abstract the module callback , result can be string or dictionary.
 * @discussion callback data to js, you can specify the keepAlive parameter to keep callback function id keepalive or not. If the keepAlive is true, it won't be removed unitl instance destroyed, so you can call it repetitious.
 */
typedef void (^WXModuleKeepAliveCallback)(id result, BOOL keepAlive);

#define WX_EXPORT_MODULE(module) 

@optional

/**
 *  @abstract returns the execute queue for the module
 *
 *  @return dispatch queue that module's methods will be invoked on
 *
 *  @discussion the implementation is optional. Implement it if you want to execute module actions in the special queue.
 *  Default dispatch queue will be the main queue.
 *
 */
- (dispatch_queue_t)targetExecuteQueue;

/**
 *  @abstract returns the execute thread for the module
 *
 *  @return  thread that module's methods will be invoked on
 *
 *  @discussion the implementation is optional. If you want to execute module actions in the special thread, you can create a new one. 
 *  If `targetExecuteQueue` is implemented,  the queue returned will be respected first.
 *  Default is the main thread.
 *
 */
- (NSThread *)targetExecuteThread;

/**
 *  @abstract the instance bind to this module. It helps you to get many useful properties related to the instance.
 */
@property (nonatomic, weak) WXSDKInstance *weexInstance;

@end

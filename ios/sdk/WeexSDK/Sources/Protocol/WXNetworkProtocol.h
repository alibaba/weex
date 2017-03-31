/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXModuleProtocol.h"

__attribute__ ((deprecated("Use WXResourceRequestHandler instead")))
@protocol WXNetworkProtocol <NSObject>

/**
 * @abstract send request
 *
 * @param request The URL Request
 *
 * @param sendDataCallback  This block is called periodically to notify the progress.
 *
 * @param responseCallback  This block is called when receiving a response and no further messages will be received until the completion block is called. 
 *
 * @param receiveDataCallback This block is called when data is available.
 *
 * @param completionCallback This block is called when the last message related to a specific task is sent.
 */
- (id)sendRequest:(NSURLRequest *)request withSendingData:(void (^)(int64_t bytesSent, int64_t totalBytes))sendDataCallback
                                             withResponse:(void (^)(NSURLResponse *response))responseCallback
                                          withReceiveData:(void (^)(NSData *data))receiveDataCallback
                                          withCompeletion:(void (^)(NSData *totalData, NSError *error))completionCallback;

@end

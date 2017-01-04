/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */


#import <Foundation/Foundation.h>
#import "WXResourceRequest.h"
#import "WXResourceResponse.h"

@protocol WXResourceRequestDelegate <NSObject>

// Periodically informs the delegate of the progress of sending content to the server.
- (void)request:(WXResourceRequest *)request didSendData:(unsigned long long)bytesSent totalBytesToBeSent:(unsigned long long)totalBytesToBeSent;

// Tells the delegate that the request received the initial reply (headers) from the server.
- (void)request:(WXResourceRequest *)request didReceiveResponse:(WXResourceResponse *)response;

// Tells the delegate that the request has received some of the expected data.
- (void)request:(WXResourceRequest *)request didReceiveData:(NSData *)data;

// Tells the delegate that the request finished transferring data.
- (void)requestDidFinishLoading:(WXResourceRequest *)request;

// Tells the delegate that the request failed to load successfully.
- (void)request:(WXResourceRequest *)request didFailWithError:(NSError *)error;

@end

@protocol WXResourceRequestHandler <NSObject>

// Send a resource request with a delegate
- (void)sendRequest:(WXResourceRequest *)request withDelegate:(id<WXResourceRequestDelegate>)delegate;

@optional

// Cancel the ongoing request
- (void)cancelRequest:(WXResourceRequest *)request;

@end



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


@interface WXResourceLoader : NSObject

@property (nonatomic, strong) WXResourceRequest *request;

@property (nonatomic, copy) void (^onDataSent)(unsigned long long /* bytesSent */, unsigned long long /* totalBytesToBeSent */);
@property (nonatomic, copy) void (^onResponseReceived)(const WXResourceResponse *);
@property (nonatomic, copy) void (^onDataReceived)(NSData *);
@property (nonatomic, copy) void (^onFinished)(const WXResourceResponse *, NSData *);
@property (nonatomic, copy) void (^onFailed)(NSError *);

- (instancetype)initWithRequest:(WXResourceRequest *)request;

- (void)start;

- (void)cancel:(NSError **)error;

@end

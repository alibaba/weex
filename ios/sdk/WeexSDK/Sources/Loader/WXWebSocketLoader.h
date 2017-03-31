/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@interface WXWebSocketLoader : NSObject<NSCopying>

@property (nonatomic, copy) void (^onOpen)();
@property (nonatomic, copy) void (^onReceiveMessage)(id);
@property (nonatomic, copy) void (^onClose)(NSInteger,NSString *,BOOL);
@property (nonatomic, copy) void (^onFail)(NSError *);

- (instancetype)initWithUrl:(NSString *)url protocol:(NSString *)protocol;
- (void)open;
- (void)send:(NSString *)data;
- (void)close;
- (void)close:(NSInteger)code reason:(NSString *)reason;
- (void)clear;
@end

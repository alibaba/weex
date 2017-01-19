/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXModuleProtocol.h"

@protocol WXWebSocketDelegate<NSObject>
- (void)didOpen;
- (void)didFailWithError:(NSError *)error;
- (void)didReceiveMessage:(id)message;
- (void)didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean;
@end

@protocol WXWebSocketHandler<NSObject>

- (void)open:(NSString *)url protocol:(NSString *)protocol identifier:(NSString *)identifier withDelegate:(id<WXWebSocketDelegate>)delegate;
- (void)send:(NSString *)identifier data:(NSString *)data;
- (void)close:(NSString *)identifier;
- (void)close:(NSString *)identifier code:(NSInteger)code reason:(NSString *)reason;
- (void)clear:(NSString *)identifier;
@end

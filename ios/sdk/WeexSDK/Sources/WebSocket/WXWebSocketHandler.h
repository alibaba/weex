/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXModuleProtocol.h"
#import "WXWebSocketModel.h"

@protocol WXWebSocketDelegate<NSObject>
- (void)didOpen;
- (void)didFailWithError:(NSError *)error;
- (void)didReceiveMessage:(id)message;
- (void)didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean;
@end

@protocol WXWebSocketHandler<NSObject>

- (void)open:(WXWebSocketModel *)webSocketModel withDelegate:(id<WXWebSocketDelegate>)delegate;
- (void)send:(WXWebSocketModel *)webSocketModel data:(NSString *)data;
- (void)close:(WXWebSocketModel *)webSocketModel;
- (void)close:(WXWebSocketModel *)webSocketModel code:(NSString *)code reason:(NSString *)reason;
- (void)clear:(WXWebSocketModel *)webSocketModel;
@end

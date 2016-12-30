/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXWebSocketLoader.h"
#import "WXWebSocketHandler.h"
#import "WXWebSocketModel.h"
#import "WXHandlerFactory.h"
#import "WXLog.h"

@interface WXWebSocketLoader () <WXWebSocketDelegate>
@property (nonatomic, strong) WXWebSocketModel *webSocketModel;
@end

@implementation WXWebSocketLoader

- (instancetype)initWithUrl:(NSString *)url protocol:(NSString *)protocol
{
    if (self = [super init]) {
        self.webSocketModel = [self webSocketModel];
        self.webSocketModel.url = url;
        self.webSocketModel.protocol = protocol;
    }
    return self;
}

-(WXWebSocketModel *)webSocketModel
{
    if(!_webSocketModel)
    {
        _webSocketModel = [WXWebSocketModel new];
        CFUUIDRef uuid = CFUUIDCreate(NULL);
        _webSocketModel.identifier = CFBridgingRelease(CFUUIDCreateString(NULL, uuid));
        assert(_webSocketModel.identifier);
        CFRelease(uuid);
    }
    return _webSocketModel;
}

- (void)open
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler open:self.webSocketModel withDelegate:self];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

- (void)send:(NSString *)data
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler send:self.webSocketModel data:data];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

- (void)close
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler close:self.webSocketModel];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

- (void)clear
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler clear:self.webSocketModel];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

- (void)close:(NSString *)code reason:(NSString *)reason
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler close:self.webSocketModel code:code reason:reason];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

#pragma mark - WXWebSocketDelegate
- (void)DidOpen
{
    if (self.onOpen) {
        self.onOpen();
    }
}
- (void)didFailWithError:(NSError *)error
{
    if(self.onFail) {
        self.onFail(error);
    }
}
- (void)didReceiveMessage:(id)message
{
    if (self.onReceiveMessage) {
        self.onReceiveMessage(message);
    }
}
- (void)didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean
{
    if (self.onClose) {
        self.onClose(code,reason,wasClean);
    }
}
@end

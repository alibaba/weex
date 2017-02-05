/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXWebSocketLoader.h"
#import "WXWebSocketHandler.h"
#import "WXHandlerFactory.h"
#import "WXLog.h"

@interface WXWebSocketLoader () <WXWebSocketDelegate>
@property (nonatomic, copy) NSString *identifier;
@property (nonatomic, copy) NSString *url;
@property (nonatomic, copy) NSString *protocol;
@end

@implementation WXWebSocketLoader

- (instancetype)initWithUrl:(NSString *)url protocol:(NSString *)protocol
{
    if (self = [super init]) {
        self.url = url;
        self.protocol = protocol;
    }
    return self;
}

-(id)copyWithZone:(NSZone *)zone {
    
    WXWebSocketLoader *newClass = [[WXWebSocketLoader alloc]init];
    newClass.onOpen = self.onOpen;
    newClass.onReceiveMessage = self.onReceiveMessage;
    newClass.onFail = self.onFail;
    newClass.onClose = self.onClose;
    newClass.protocol = self.protocol;
    newClass.url = self.url;
    newClass.identifier = self.identifier;
    return newClass;
}

-(NSString *)identifier
{
    if(!_identifier)
    {
        CFUUIDRef uuid = CFUUIDCreate(NULL);
        _identifier = CFBridgingRelease(CFUUIDCreateString(NULL, uuid));
        assert(_identifier);
        CFRelease(uuid);
    }
    return _identifier;
}

- (void)open
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler open:self.url protocol:self.protocol identifier:self.identifier withDelegate:self];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

- (void)send:(NSString *)data
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler send:self.identifier data:data];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

- (void)close
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler close:self.identifier];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

- (void)clear
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler clear:self.identifier];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

- (void)close:(NSInteger)code reason:(NSString *)reason
{
    id<WXWebSocketHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXWebSocketHandler)];
    if (requestHandler) {
        [requestHandler close:self.identifier code:code reason:reason];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

#pragma mark - WXWebSocketDelegate
- (void)didOpen
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

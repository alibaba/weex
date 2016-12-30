/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXWebSocketDefaultImpl.h"
#import "SRWebSocket.h"
#import "WXThreadSafeMutableDictionary.h"
#import "SRWebSocket+Weex.h"

@interface WXWebSocketDefaultImpl()<SRWebSocketDelegate>

@end

@implementation WXWebSocketDefaultImpl
{
    WXThreadSafeMutableDictionary<NSString *, id<WXWebSocketDelegate>> *_delegates;
}

#pragma mark - WXWebSocketHandler
- (void)open:(WXWebSocketModel *)webSocketModel withDelegate:(id<WXWebSocketDelegate>)delegate
{
    if(!_delegates)
    {
        _delegates = [WXThreadSafeMutableDictionary new];
    }
    if(webSocketModel.identifier){
        [_delegates removeObjectForKey:webSocketModel.identifier];
        SRWebSocket *webSocket = webSocketModel.webSocket;
        webSocket.delegate = nil;
        [webSocket close];
        
    }
    NSArray *protols;
    if([webSocketModel.protocol length]>0){
       protols = [NSArray arrayWithObject:webSocketModel.protocol];
    }
    SRWebSocket *webSocket = [[SRWebSocket alloc] initWithURL:[NSURL URLWithString:webSocketModel.url] protocols:protols];
    webSocket.delegate = self;
    [webSocket open];
    webSocketModel.webSocket = webSocket;
    webSocket.identifier = webSocketModel.identifier;
    [_delegates setObject:delegate forKey:webSocket.identifier];
}

- (void)send:(WXWebSocketModel *)webSocketModel data:(NSString *)data
{
    [webSocketModel.webSocket send:data];
}

- (void)close:(WXWebSocketModel *)webSocketModel
{
    [webSocketModel.webSocket close];
}

- (void)close:(WXWebSocketModel *)webSocketModel code:(NSString *)code reason:(NSString *)reason
{
    [webSocketModel.webSocket closeWithCode:[code integerValue] reason:reason];
}

- (void)clear:(WXWebSocketModel *)webSocketModel
{
    if ([webSocketModel.identifier isKindOfClass:[NSString class]]) {
        SRWebSocket *websocket = webSocketModel.webSocket;
        websocket.delegate = nil;
        [websocket close];
        [_delegates removeObjectForKey:webSocketModel.identifier];
    }
}

#pragma mark -SRWebSocketDelegate
- (void)webSocketDidOpen:(SRWebSocket *)webSocket;
{
    id<WXWebSocketDelegate> delegate = [_delegates objectForKey:webSocket.identifier];
    if (delegate && [delegate respondsToSelector:@selector(didOpen)]) {
        [delegate didOpen];
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error;
{
    id<WXWebSocketDelegate> delegate = [_delegates objectForKey:webSocket.identifier];
    if (delegate && [delegate respondsToSelector:@selector(didFailWithError:)]) {
        [delegate didFailWithError:error];
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message;
{
    id<WXWebSocketDelegate> delegate = [_delegates objectForKey:webSocket.identifier];
    if (delegate && [delegate respondsToSelector:@selector(didReceiveMessage:)]) {
        [delegate didReceiveMessage:message];
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean;
{
    id<WXWebSocketDelegate> delegate = [_delegates objectForKey:webSocket.identifier];
    if (delegate && [delegate respondsToSelector:@selector(didCloseWithCode:reason:wasClean:)]) {
        [delegate didCloseWithCode:code reason:reason wasClean:wasClean];
    }
}
@end

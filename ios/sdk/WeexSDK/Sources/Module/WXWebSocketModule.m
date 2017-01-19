/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXWebSocketModule.h"
#import "WXUtility.h"
#import "WXWebSocketHandler.h"
#import "WXHandlerFactory.h"
#import "WXWebSocketLoader.h"
#import "WXConvert.h"

@interface WXWebSocketModule()

@property(nonatomic,copy)WXModuleKeepAliveCallback errorCallBack;
@property(nonatomic,copy)WXModuleKeepAliveCallback messageCallBack;
@property(nonatomic,copy)WXModuleKeepAliveCallback openCallBack;
@property(nonatomic,copy)WXModuleKeepAliveCallback closeCallBack;

@end

@implementation WXWebSocketModule
{
    WXWebSocketLoader *loader;
}
WX_EXPORT_METHOD(@selector(WebSocket:protocol:))
WX_EXPORT_METHOD(@selector(send:))
WX_EXPORT_METHOD(@selector(close:reason:))
WX_EXPORT_METHOD(@selector(onerror:))
WX_EXPORT_METHOD(@selector(onmessage:))
WX_EXPORT_METHOD(@selector(onopen:))
WX_EXPORT_METHOD(@selector(onclose:))

@synthesize weexInstance;

- (void)WebSocket:(NSString *)url protocol:(NSString *)protocol
{
    if(loader)
    {
        [loader clear];
    }
    loader = [[WXWebSocketLoader alloc] initWithUrl:url protocol:protocol];
    __weak typeof(self) weakSelf = self;
    loader.onReceiveMessage = ^(id message) {
        if (weakSelf) {
            NSMutableDictionary *dic = [NSMutableDictionary new];
            if([message isKindOfClass:[NSString class]]) {
                [dic setObject:message forKey:@"data"];
            }
            if (weakSelf.messageCallBack) {
                weakSelf.messageCallBack(dic,true);;
            }
        }
    };
    loader.onOpen = ^() {
        if (weakSelf) {
            if (weakSelf.openCallBack) {
                NSMutableDictionary *dict = [NSMutableDictionary new];
                weakSelf.openCallBack(dict,true);;
            }
        }
    };
    loader.onFail = ^(NSError *error) {
        if (weakSelf) {
            WXLogError(@":( Websocket Failed With Error %@", error);
            NSMutableDictionary *dict = [NSMutableDictionary new];
            [dict setObject:error.userInfo forKey:@"data"];
            if (weakSelf.errorCallBack) {
                weakSelf.errorCallBack(dict, true);
            }
        }
    };
    loader.onClose = ^(NSInteger code,NSString *reason,BOOL wasClean) {
        if (weakSelf) {
            if (weakSelf.closeCallBack) {
                WXLogInfo(@"Websocket colse ");
                NSMutableDictionary * callbackRsp = [[NSMutableDictionary alloc] init];
                [callbackRsp setObject:[NSNumber numberWithInteger:code] forKey:@"code"];
                [callbackRsp setObject:reason forKey:@"reason"];
                [callbackRsp setObject:wasClean?@true:@false forKey:@"wasClean"];
                weakSelf.closeCallBack(callbackRsp,false);
            }
        }
    };
    
    [loader open];
}

- (void)send:(NSString *)data
{
    [loader send:data];
}

- (void)close
{
    [loader close];
}

- (void)close:(NSString *)code reason:(NSString *)reason
{
    if(!code)
    {
        [loader close];
        return;
    }
    [loader close:[code integerValue] reason:reason];
}

- (void)onerror:(WXModuleKeepAliveCallback)callback
{
    self.errorCallBack = callback;
}

- (void)onmessage:(WXModuleKeepAliveCallback)callback
{
    self.messageCallBack = callback;
}

- (void)onopen:(WXModuleKeepAliveCallback)callback
{
    self.openCallBack = callback;
}

- (void)onclose:(WXModuleKeepAliveCallback)callback
{
    self.closeCallBack = callback;
}

-(void)dealloc
{
    [loader clear];
}

@end

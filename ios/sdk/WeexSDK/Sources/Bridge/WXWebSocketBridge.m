/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXWebSocketBridge.h"
#import "SRWebSocket.h"
#import "WXSDKManager.h"
#import "WXUtility.h"
#import "WXLog.h"

/**
 * call format:
 * {
 *   id:1234,
 *   method:(__logger/__hotReload/__inspector/evalFramework...),
 *   arguments:[arg1,arg2,..],
 * }
 *
 * callback format:
 * {
 *   callbackID:1234,(same as call id)
 *   result:{a:1,b:2}
 * }
 */
@interface WXWebSocketBridge()<SRWebSocketDelegate>

@end

@implementation WXWebSocketBridge
{
    BOOL    _isConnect;
    SRWebSocket *_webSocket;
    NSMutableArray  *_msgAry;
    WXJSCallNative  _nativeCallBlock;
    NSThread    *_curThread;
}

- (void)dealloc
{
    _nativeCallBlock = nil;
    [self _disconnect];
}

- (instancetype)initWithURL:(NSURL *) URL
{
    self = [super init];
    
    _isConnect = NO;
    _curThread = [NSThread currentThread];

    [self _connect:URL];
    
    return self;
}

- (void)_initEnvironment
{
    [self callJSMethod:@"setEnvironment" args:@[[WXUtility getEnvironment]]];
}

- (void)registerDevice {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    [dict setObject:@"WxDebug.registerDevice" forKey:@"method"];
    [dict setObject:[WXUtility getDebugEnvironment] forKey:@"params"];
    [dict setObject:[NSNumber numberWithInt:0] forKey:@"id"];
    [_msgAry insertObject:[WXUtility JSONString:dict] atIndex:0];
    [self _executionMsgAry];
}

- (void)_disconnect
{
    _msgAry = nil;
    _isConnect = NO;
    _webSocket.delegate = nil;
    [_webSocket close];
    _webSocket = nil;
}

- (void)_connect:(NSURL *)URL
{
    _msgAry = nil;
    _msgAry = [NSMutableArray array];
    _webSocket.delegate = nil;
    [_webSocket close];
    
    _webSocket = [[SRWebSocket alloc] initWithURLRequest:[NSURLRequest requestWithURL:URL]];
    _webSocket.delegate = self;
    
    [_webSocket open];
}

-(void)_executionMsgAry
{
    if (!_isConnect) return;
    
    for (NSString *msg in _msgAry) {
        [_webSocket send:msg];
    }
    [_msgAry removeAllObjects];
}

-(void)_evaluateNative:(NSString *)data
{
    NSDictionary *dict = [WXUtility objectFromJSON:data];
    //[dict objectForKey:@"method"] return @"WxDebug.method"
//    NSString *originMethod = [dict objectForKey:@"method"];
    NSString *method = [[dict objectForKey:@"method"] substringFromIndex:8];
    NSDictionary *args = [dict objectForKey:@"params"];
    
    if ([method isEqualToString:@"callNative"]) {
        // call native
        NSString *instanceId = args[@"instance"];
        NSArray *methods = args[@"tasks"];
        NSString *callbackId = args[@"callback"];
        
        // params parse
        if(!methods || methods.count <= 0){
            return;
        }
        //call native
        WXLogVerbose(@"Calling native... instancdId:%@, methods:%@, callbackId:%@", instanceId, [WXUtility JSONString:methods], callbackId);
        _nativeCallBlock(instanceId, methods, callbackId);
    } /*else if ([method isEqualToString:@"setLogLevel"]) {
        NSString *levelString = [args firstObject];
        [WXLog setLogLevelString:levelString];
    }*/
}

#pragma mark - WXBridgeProtocol

- (void)executeJSFramework:(NSString *)frameworkScript
{
//    [self callJSMethod:@"evalFramework" args:@[frameworkScript]];
    
    NSDictionary *args = @{@"source":frameworkScript};
    [self callJSMethod:@"WxDebug.initJSRuntime" params:args];
}

- (void)callJSMethod:(NSString *)method params:(NSDictionary*)params {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    [dict setObject:method forKey:@"method"];
    [dict setObject:params forKey:@"arguments"];
    
    [_msgAry addObject:[WXUtility JSONString:dict]];
    [self _executionMsgAry];
}

- (void)callJSMethod:(NSString *)method args:(NSArray *)args
{
    NSMutableDictionary *params = [[NSMutableDictionary alloc] init];
    [params setObject:method forKey:@"method"];
    [params setObject:args forKey:@"args"];
    
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    [dict setObject:@"WxDebug.callJS" forKey:@"method"];
    [dict setObject:params forKey:@"params"];
    
    [_msgAry addObject:[WXUtility JSONString:dict]];
    [self _executionMsgAry];
    
    /*
    if (![method isEqualToString:@"__logger"]) {
        // prevent recursion
        WXLogVerbose(@"Calling JS... method:%@, args:%@", method, [WXUtility JSONString:args]);
    }
    
    
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    [dict setObject:method forKey:@"method"];
    [dict setObject:args forKey:@"arguments"];
    
    [_msgAry addObject:[WXUtility JSONString:dict]];
    [self _executionMsgAry];
    */
}

- (void)registerCallNative:(WXJSCallNative)callNative
{
    _nativeCallBlock = callNative;
}

- (JSValue*) exception
{
    return nil;
}

- (void)resetEnvironment
{
    [self _initEnvironment];
}

- (void)executeBridgeThead:(dispatch_block_t)block
{
    if([NSThread currentThread] == _curThread){
        block();
    } else {
        [self performSelector:@selector(executeBridgeThead:)
                     onThread:_curThread
                   withObject:[block copy]
                waitUntilDone:NO];
    }
}

#pragma mark - SRWebSocketDelegate

- (void)webSocketDidOpen:(SRWebSocket *)webSocket;
{
    WXLogWarning(@"Websocket Connected:%@", webSocket.url);
    _isConnect = YES;
//    [self _initEnvironment];
    [self registerDevice];
    __weak typeof(self) weakSelf = self;
    [self executeBridgeThead:^() {
        [weakSelf _executionMsgAry];
    }];
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error;
{
    WXLogError(@":( Websocket Failed With Error %@", error);
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message;
{
    __weak typeof(self) weakSelf = self;
    [self executeBridgeThead:^() {
        [weakSelf _evaluateNative:message];
    }];
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean
{
    WXLogInfo(@"Websocket closed with code: %ld, reason:%@, wasClean: %d", (long)code, reason, wasClean);
    _isConnect = NO;
}

@end

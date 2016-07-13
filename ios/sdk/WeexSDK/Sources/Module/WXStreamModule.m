/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXStreamModule.h"
#import "WXSDKManager.h"
#import "WXUtility.h"
#import "WXHandlerFactory.h"
#import "WXNetworkProtocol.h"

@implementation WXStreamModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(sendHttp:callback:))
WX_EXPORT_METHOD(@selector(fetch:callback:progressCallback:))

- (void)sendHttp:(NSDictionary*)param callback:(WXModuleCallback)callback
{
    NSString* method = [param objectForKey:@"method"];
    NSString* urlStr = [param objectForKey:@"url"];
    NSDictionary* header = [param objectForKey:@"header"];
    NSString* body = [param objectForKey:@"body"];
    
    NSURL *url = [NSURL URLWithString:urlStr];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:method];
    [request setTimeoutInterval:60.0];
    for (NSString *key in header) {
        NSString *value = [header objectForKey:key];
        [request setValue:value forHTTPHeaderField:key];
    }
    [request setHTTPBody:[body dataUsingEncoding:NSUTF8StringEncoding]];
    [request setValue:[WXUtility userAgent] forHTTPHeaderField:@"User-Agent"];
    
    id<WXNetworkProtocol> networkHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXNetworkProtocol)];
    
    [networkHandler sendRequest:request
                withSendingData:^(int64_t bytesSent, int64_t totalBytes) {
                 } withResponse:^(NSURLResponse *response) {
              } withReceiveData:^(NSData *data) {
              } withCompeletion:^(NSData *totalData, NSError *error) {
                    NSString *responseData = nil;
                    if (!error) {
                        responseData = [[NSString alloc] initWithData:totalData encoding:NSUTF8StringEncoding];
                    }
                    //else ok
                    callback(responseData);
              }];
}

- (void)fetch:(NSDictionary *)options callback:(WXModuleCallback)callback progressCallback:(NSString *)progressCallback
{
    __block NSInteger received = 0;
    __block NSHTTPURLResponse *httpResponse = nil;
    __block NSMutableDictionary * callbackRsp =[[NSMutableDictionary alloc] init];
    __block NSString *statusText = @"ERR_CONNECT_FAILED";
    
    NSString *method = [options objectForKey:@"method"];
    if ([WXUtility isBlankString:method]) {
        method = @"GET";
    }
    NSString *urlStr = [options objectForKey:@"url"];
    if (!options || [WXUtility isBlankString:urlStr]) {
        [callbackRsp setObject:@(-1) forKey:@"status"];
        [callbackRsp setObject:@false forKey:@"ok"];
        
        callback([WXUtility JSONString:callbackRsp]);
        
        return;
    }
    NSDictionary *headers = [options objectForKey:@"headers"];
    NSString *body = [options objectForKey:@"body"];
    
    NSURL *url = [NSURL URLWithString:urlStr];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:method];
    [request setTimeoutInterval:60.0];
    for (NSString *header in headers) {
        NSString *value = [headers objectForKey:header];
        [request setValue:value forHTTPHeaderField:header];
    }
    [request setHTTPBody:[body dataUsingEncoding:NSUTF8StringEncoding]];
    [request setValue:[WXUtility userAgent] forHTTPHeaderField:@"User-Agent"];
   
    [callbackRsp setObject:@{ @"OPENED": @1 } forKey:@"readyState"];
    
    [[WXSDKManager bridgeMgr] callBack:self.weexInstance.instanceId funcId:progressCallback params:[WXUtility JSONString:callbackRsp] keepAlive:true];
    
    id<WXNetworkProtocol> networkHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXNetworkProtocol)];
    __block NSString *respEncode = nil;
    [networkHandler sendRequest:request
                withSendingData:^(int64_t bytesSent, int64_t totalBytes) {
                } withResponse:^(NSURLResponse *response) {
                    httpResponse = (NSHTTPURLResponse*)response;
                    respEncode = httpResponse.textEncodingName;
                    [callbackRsp setObject:@{ @"HEADERS_RECEIVED" : @2  } forKey:@"readyState"];
                    [callbackRsp setObject:[NSNumber numberWithInteger:httpResponse.statusCode] forKey:@"status"];
                    [callbackRsp setObject:httpResponse.allHeaderFields forKey:@"headers"];
                    if (httpResponse.statusCode == 200) {
                        statusText = @"OK";
                    }else {
                        statusText = [NSHTTPURLResponse localizedStringForStatusCode:httpResponse.statusCode].capitalizedString;
                    }
                    [callbackRsp setObject:statusText forKey:@"statusText"];
                    [callbackRsp setObject:[NSNumber numberWithInteger:received] forKey:@"length"];
                    
                    [[WXSDKManager bridgeMgr] callBack:self.weexInstance.instanceId funcId:progressCallback params:[WXUtility JSONString:callbackRsp] keepAlive:true];
                    
                } withReceiveData:^(NSData *data) {
                    [callbackRsp setObject:@{ @"LOADING" : @3  } forKey:@"readyState"];
                    received += [data length];
                    [callbackRsp setObject:[NSNumber numberWithInteger:received] forKey:@"length"];
                    
                    [[WXSDKManager bridgeMgr] callBack:self.weexInstance.instanceId funcId:progressCallback params:[WXUtility JSONString:callbackRsp] keepAlive:true];
                    
                } withCompeletion:^(NSData *totalData, NSError *error) {
                    
                    [callbackRsp removeObjectForKey:@"readyState"];
                    [callbackRsp removeObjectForKey:@"length"];
                    [callbackRsp removeObjectForKey:@"keepalive"];
                    [callbackRsp setObject:httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299 ? @true : @false forKey:@"ok"];
                    if (error) {
                        //error
                        [callbackRsp setObject:@(-1) forKey:@"status"];
                        [callbackRsp setObject:[NSString stringWithFormat:@"%@(%ld)",[error localizedDescription], (long)[error code]] forKey:@"data"];
                        
                        switch ([error code]) {
                            case -1000:
                            case -1002:
                            case -1003:
                                statusText = @"ERR_INVALID_REQUEST";
                                break;
                            default:
                                break;
                        }
                        [callbackRsp setObject:statusText forKey:@"statusText"];
                        
                    }else {
                        // no error
                        NSString *responseData = nil;
                        if (!respEncode) {
                            respEncode = @"utf-8";
                        }
                        CFStringEncoding cfStrEncoding = CFStringConvertIANACharSetNameToEncoding((CFStringRef) respEncode);
                        if (cfStrEncoding == kCFStringEncodingInvalidId) {
                            WXLogError(@"not supported encode");
                        } else {
                            NSStringEncoding encoding = CFStringConvertEncodingToNSStringEncoding(cfStrEncoding);
                            responseData = [[NSString alloc]initWithData:totalData encoding:encoding];
                            [callbackRsp setObject:responseData forKey:@"data"];
                        }
                    }
                    callback([WXUtility JSONString:callbackRsp]);
                }];
}

@end

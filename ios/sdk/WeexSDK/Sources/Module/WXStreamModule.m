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
        // default HTTP method is GET
        method = @"GET";
    }
    NSString *urlStr = [options objectForKey:@"url"];
    if (!options || [WXUtility isBlankString:urlStr]) {
        [callbackRsp setObject:@(-1) forKey:@"status"];
        [callbackRsp setObject:@false forKey:@"ok"];
        callback(callbackRsp);
        
        return;
    }
    NSDictionary *headers = [options objectForKey:@"headers"];
    NSString *body = [options objectForKey:@"body"];
    NSString *type = [options objectForKey:@"type"];
    NSURL *url = [NSURL URLWithString:urlStr];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:method];
    
    if ([options valueForKey:@"timeout"]){
        //ms
        [request setTimeoutInterval:([[options valueForKey:@"timeout"] floatValue])/1000];
    }
    
    for (NSString *header in headers) {
        NSString *value = [headers objectForKey:header];
        [request setValue:value forHTTPHeaderField:header];
    }
    [request setHTTPBody:[body dataUsingEncoding:NSUTF8StringEncoding]];
    [request setValue:[WXUtility userAgent] forHTTPHeaderField:@"User-Agent"];

    [callbackRsp setObject:@{ @"OPENED": @1 } forKey:@"readyState"];
    
    [[WXSDKManager bridgeMgr] callBack:self.weexInstance.instanceId funcId:progressCallback params:callbackRsp keepAlive:true];
    
    id<WXNetworkProtocol> networkHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXNetworkProtocol)];
    __block NSString *respEncode = nil;
    __weak typeof(self) weakSelf = self;
    [networkHandler sendRequest:request
                withSendingData:^(int64_t bytesSent, int64_t totalBytes) {
                } withResponse:^(NSURLResponse *response) {
                    httpResponse = (NSHTTPURLResponse*)response;
                    respEncode = httpResponse.textEncodingName;
                    if (weakSelf) {
                        [callbackRsp setObject:@{ @"HEADERS_RECEIVED" : @2  } forKey:@"readyState"];
                        [callbackRsp setObject:[NSNumber numberWithInteger:httpResponse.statusCode] forKey:@"status"];
                        [callbackRsp setObject:httpResponse.allHeaderFields forKey:@"headers"];
                        statusText = [WXStreamModule getStatusText:httpResponse.statusCode];
                        [callbackRsp setObject:statusText forKey:@"statusText"];
                        [callbackRsp setObject:[NSNumber numberWithInteger:received] forKey:@"length"];
                        [[WXSDKManager bridgeMgr] callBack:weakSelf.weexInstance.instanceId funcId:progressCallback params:callbackRsp keepAlive:true];
                    }
                    
                } withReceiveData:^(NSData *data) {
                    [callbackRsp setObject:@{ @"LOADING" : @3 } forKey:@"readyState"];
                    received += [data length];
                    [callbackRsp setObject:[NSNumber numberWithInteger:received] forKey:@"length"];
                    
                    [[WXSDKManager bridgeMgr] callBack:weakSelf.weexInstance.instanceId funcId:progressCallback params:callbackRsp keepAlive:true];
                    
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
                        NSString *responseData = [self stringfromData:totalData encode:respEncode];
                        if ([type isEqualToString:@"json"] || [type isEqualToString:@"jsonp"]) {
                            if ([type isEqualToString:@"jsonp"]) {
                                NSUInteger start = [responseData rangeOfString:@"("].location + 1 ;
                                NSUInteger end = [responseData rangeOfString:@")" options:NSBackwardsSearch].location;
                                if (end > start) {
                                    responseData = [responseData substringWithRange:NSMakeRange(start, end-start)];
                                }
                            }
                            id jsonObj = [self JSONObjFromData:[responseData dataUsingEncoding:NSUTF8StringEncoding]];
                            if (jsonObj) {
                                [callbackRsp setObject:jsonObj forKey:@"data"];
                            }
                            
                        } else {
                            if (responseData) {
                                [callbackRsp setObject:responseData forKey:@"data"];
                            }
                        }
                    }
                    callback(callbackRsp);
                }];
}

- (NSString*)stringfromData:(NSData *)data encode:(NSString *)encoding
{
    NSMutableString *responseData = nil;
    if (data) {
        if (!encoding) {
            encoding = @"utf-8";
        }
        CFStringEncoding cfStrEncoding = CFStringConvertIANACharSetNameToEncoding((CFStringRef)encoding);
        if (cfStrEncoding == kCFStringEncodingInvalidId) {
            WXLogError(@"not supported encode");
        } else {
            NSStringEncoding encoding = CFStringConvertEncodingToNSStringEncoding(cfStrEncoding);
            responseData = [[NSMutableString alloc]initWithData:data encoding:encoding];
        }
    }
    return responseData;
}

- (id)JSONObjFromData:(NSData *)data
{
    NSError * error = nil;
    id jsonObj = [WXUtility JSONObject:data error:&error];
    if (error) {
        WXLogError(@"%@", [error description]);
    }
    return jsonObj;
}

+ (NSString*)getStatusText:(NSInteger)code
{    
    switch (code) {
        case -1:
            return @"ERR_INVALID_REQUEST";
        case 100:
            return @"Continue";
            break;
        case 101:
            return @"Switching Protocol";
        case 102:
            return @"Processing";
            
        case 200:
            return @"OK";
        case 201:
            return @"Created";
        case 202:
            return @"Accepted";
        case 203:
            return @"Non-Authoritative Information";
        case 204:
            return @"No Content";
        case 205:
            return @" Reset Content";
        case 206:
            return @"Partial Content";
        case 207:
            return @"Multi-Status";
        case 208:
            return @"Already Reported";
        case 226:
            return @"IM Used";
            
        case 300:
            return @"Multiple Choices";
        case 301:
            return @"Moved Permanently";
        case 302:
            return @"Found";
        case 303:
            return @"See Other";
        case 304:
            return @"Not Modified";
        case 305:
            return @"Use Proxy";
        case 306:
            return @"Switch Proxy";
        case 307:
            return @"Temporary Redirect";
        case 308:
            return @"Permanent Redirect";
            
        case 400:
            return @"Bad Request";
        case 401:
            return @"Unauthorized";
        case 402:
            return @"Payment Required";
        case 403:
            return @"Forbidden";
        case 404:
            return @"Not Found";
        case 405:
            return @"Method Not Allowed";
        case 406:
            return @"Not Acceptable";
        case 407:
            return @"Proxy Authentication Required";
        case 408:
            return @"Request Timeout";
        case 409:
            return @"Conflict";
        case 410:
            return @"Gone";
        case 411:
            return @"Length Required";
        case 412:
            return @"Precondition Failed";
        case 413:
            return @"Payload Too Large";
        case 414:
            return @"URI Too Long";
        case 415:
            return @"Unsupported Media Type";
        case 416:
            return @"Range Not Satisfiable";
        case 417:
            return @"Expectation Failed";
        case 418:
            return @"I'm a teapot";
        case 421:
            return @"Misdirected Request";
        case 422:
            return @"Unprocessable Entity";
        case 423:
            return @"Locked";
        case 424:
            return @"Failed Dependency";
        case 426:
            return @"Upgrade Required";
        case 428:
            return @"Precondition Required";
        case 429:
            return @"Too Many Requests";
        case 431:
            return @"Request Header Fields Too Large";
        case 451:
            return @"Unavailable For Legal Reasons";
            
        case 500:
            return @"Internal Server Error";
        case 501:
            return @"Not Implemented";
        case 502:
            return @"Bad Gateway";
        case 503:
            return @"Service Unavailable";
        case 504:
            return @"Gateway Timeout";
        case 505:
            return @"HTTP Version Not Supported";
        case 506:
            return @"Variant Also Negotiates";
        case 507:
            return @"Insufficient Storage";
        case 508:
            return @"Loop Detected";
        case 510:
            return @"Not Extended";
        case 511:
            return @"Network Authentication Required";
        default:
            break;
    }
    
    return @"Unknown";
}

@end

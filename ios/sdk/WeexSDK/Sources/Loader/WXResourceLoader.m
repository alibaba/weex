/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */
#import "WXResourceLoader.h"
#import "WXResourceRequestHandler.h"
#import "WXSDKInstance.h"
#import "WXLog.h"
#import "WXHandlerFactory.h"
#import "WXSDKError.h"

//deprecated
#import "WXNetworkProtocol.h"

@interface WXResourceLoader () <WXResourceRequestDelegate>

@end

@implementation WXResourceLoader
{
    NSMutableData *_data;
    WXResourceResponse *_response;
}

- (instancetype)initWithRequest:(WXResourceRequest *)request
{
    if (self = [super init]) {
        self.request = request;
    }
    
    return self;
}

- (void)setRequest:(WXResourceRequest *)request
{
    if (_request) {
        [self cancel:nil];
    }
    
    _request = request;
}

- (void)start
{
    if ([_request.URL isFileURL]) {
        [self _handleFileURL:_request.URL];
        return;
    }
    
    id<WXResourceRequestHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXResourceRequestHandler)];
    if (requestHandler) {
        [requestHandler sendRequest:_request withDelegate:self];
    } else if ([WXHandlerFactory handlerForProtocol:NSProtocolFromString(@"WXNetworkProtocol")]){
        // deprecated logic
        [self _handleDEPRECATEDNetworkHandler];
    } else {
        WXLogError(@"No resource request handler found!");
    }
}

- (void)cancel:(NSError *__autoreleasing *)error
{
    id<WXResourceRequestHandler> requestHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXResourceRequestHandler)];
    if ([requestHandler respondsToSelector:@selector(cancelRequest:)]) {
        [requestHandler cancelRequest:_request];
    } else if (error) {
        *error = [NSError errorWithDomain:WX_ERROR_DOMAIN code:WX_ERR_CANCEL userInfo:@{NSLocalizedDescriptionKey: @"handle:%@ not respond to cancelRequest"}];
    }
}

- (void)_handleFileURL:(NSURL *)url
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSData *fileData = [[NSFileManager defaultManager] contentsAtPath:[url path]];
        if (self.onFinished) {
            self.onFinished([WXResourceResponse new], fileData);
        }
    });
}

- (void)_handleDEPRECATEDNetworkHandler
{
    WXLogWarning(@"WXNetworkProtocol is deprecated, use WXResourceRequestHandler instead!");
    id networkHandler = [WXHandlerFactory handlerForProtocol:NSProtocolFromString(@"WXNetworkProtocol")];
    __weak typeof(self) weakSelf = self;
    [networkHandler sendRequest:_request withSendingData:^(int64_t bytesSent, int64_t totalBytes) {
        if (weakSelf.onDataSent) {
            weakSelf.onDataSent(bytesSent, totalBytes);
        }
    } withResponse:^(NSURLResponse *response) {
        _response = (WXResourceResponse *)response;
        if (weakSelf.onResponseReceived) {
            weakSelf.onResponseReceived((WXResourceResponse *)response);
        }
    } withReceiveData:^(NSData *data) {
        if (weakSelf.onDataReceived) {
            weakSelf.onDataReceived(data);
        }
    } withCompeletion:^(NSData *totalData, NSError *error) {
        if (error) {
            if (weakSelf.onFailed) {
                weakSelf.onFailed(error);
            }
        } else {
            weakSelf.onFinished(_response, totalData);
            _response = nil;
        }
    }];
}

#pragma mark - WXResourceRequestDelegate

- (void)request:(WXResourceRequest *)request didSendData:(unsigned long long)bytesSent totalBytesToBeSent:(unsigned long long)totalBytesToBeSent
{
    WXLogDebug(@"request:%@ didSendData:%llu totalBytesToBeSent:%llu", request, bytesSent, totalBytesToBeSent);
    
    if (self.onDataSent) {
        self.onDataSent(bytesSent, totalBytesToBeSent);
    }
}

- (void)request:(WXResourceRequest *)request didReceiveResponse:(WXResourceResponse *)response
{
    WXLogDebug(@"request:%@ didReceiveResponse:%@ ", request, response);
    
    _response = response;
    
    if (self.onResponseReceived) {
        self.onResponseReceived(response);
    }
}

- (void)request:(WXResourceRequest *)request didReceiveData:(NSData *)data
{
    WXLogDebug(@"request:%@ didReceiveDataLength:%ld", request, (unsigned long)data.length);
    
    if (!_data) {
        _data = [NSMutableData new];
    }
    [_data appendData:data];
    
    if (self.onDataReceived) {
        self.onDataReceived(data);
    }
}

- (void)requestDidFinishLoading:(WXResourceRequest *)request
{
    WXLogDebug(@"request:%@ requestDidFinishLoading", request);
    
    if (self.onFinished) {
        self.onFinished(_response, _data);
    }
    
    _data = nil;
    _response = nil;
}

- (void)request:(WXResourceRequest *)request didFailWithError:(NSError *)error
{
    WXLogDebug(@"request:%@ didFailWithError:%@", request, error.localizedDescription);
    
    if (self.onFailed) {
        self.onFailed(error);
    }
    
    _data = nil;
    _response = nil;
}

@end

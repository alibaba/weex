/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */


#import "WXResourceRequestHandlerDefaultImpl.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXAppConfiguration.h"

@interface WXResourceRequestHandlerDefaultImpl () <NSURLSessionDataDelegate>

@end

@implementation WXResourceRequestHandlerDefaultImpl
{
    NSURLSession *_session;
    WXThreadSafeMutableDictionary<NSURLSessionDataTask *, id<WXResourceRequestDelegate>> *_delegates;
}

#pragma mark - WXResourceRequestHandler

- (void)sendRequest:(WXResourceRequest *)request withDelegate:(id<WXResourceRequestDelegate>)delegate
{
    if (!_session) {
        NSURLSessionConfiguration *urlSessionConfig = [NSURLSessionConfiguration defaultSessionConfiguration];
        if ([WXAppConfiguration customizeProtocolClasses].count > 0) {
            NSArray *defaultProtocols = urlSessionConfig.protocolClasses;
            urlSessionConfig.protocolClasses = [[WXAppConfiguration customizeProtocolClasses] arrayByAddingObjectsFromArray:defaultProtocols];
        }
        _session = [NSURLSession sessionWithConfiguration:urlSessionConfig
                                                 delegate:self
                                            delegateQueue:[NSOperationQueue mainQueue]];
        _delegates = [WXThreadSafeMutableDictionary new];
    }
    
    NSURLSessionDataTask *task = [_session dataTaskWithRequest:request];
    request.taskIdentifier = task;
    [_delegates setObject:delegate forKey:task];
    [task resume];
}

- (void)cancelRequest:(WXResourceRequest *)request
{
    if ([request.taskIdentifier isKindOfClass:[NSURLSessionTask class]]) {
        NSURLSessionTask *task = (NSURLSessionTask *)request.taskIdentifier;
        [task cancel];
        [_delegates removeObjectForKey:task];
    }
}

#pragma mark - NSURLSessionTaskDelegate & NSURLSessionDataDelegate

- (void)URLSession:(NSURLSession *)session
              task:(NSURLSessionTask *)task
   didSendBodyData:(int64_t)bytesSent
    totalBytesSent:(int64_t)totalBytesSent
totalBytesExpectedToSend:(int64_t)totalBytesExpectedToSend
{
    id<WXResourceRequestDelegate> delegate = [_delegates objectForKey:task];
    [delegate request:(WXResourceRequest *)task.originalRequest didSendData:bytesSent totalBytesToBeSent:totalBytesExpectedToSend];
}

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task
didReceiveResponse:(NSURLResponse *)response
 completionHandler:(void (^)(NSURLSessionResponseDisposition))completionHandler
{
    id<WXResourceRequestDelegate> delegate = [_delegates objectForKey:task];
    [delegate request:(WXResourceRequest *)task.originalRequest didReceiveResponse:(WXResourceResponse *)response];
    completionHandler(NSURLSessionResponseAllow);
}

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)task didReceiveData:(NSData *)data
{
    id<WXResourceRequestDelegate> delegate = [_delegates objectForKey:task];
    [delegate request:(WXResourceRequest *)task.originalRequest didReceiveData:data];
}

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error
{
    id<WXResourceRequestDelegate> delegate = [_delegates objectForKey:task];
    [delegate requestDidFinishLoading:(WXResourceRequest *)task.originalRequest];
    [_delegates removeObjectForKey:task];
}


@end

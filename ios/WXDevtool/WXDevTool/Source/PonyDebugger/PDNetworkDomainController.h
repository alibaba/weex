//
//  PDAFNetworkDomainController.h
//  PonyDebugger
//
//  Created by Mike Lewis on 2/27/12.
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDDomainController.h"
#import "PDNetworkTypes.h"
#import "PDNetworkDomain.h"


@protocol PDPrettyStringPrinting;

@interface PDNetworkDomainController : PDDomainController <PDNetworkCommandDelegate>

@property (nonatomic, strong) PDNetworkDomain *domain;

+ (PDNetworkDomainController *)defaultInstance;
+ (void)injectIntoAllNSURLConnectionDelegateClasses;
+ (void)swizzleNSURLSessionClasses;
+ (void)injectIntoDelegateClass:(Class)cls;

+ (void)registerPrettyStringPrinter:(id<PDPrettyStringPrinting>)prettyStringPrinter;
+ (void)unregisterPrettyStringPrinter:(id<PDPrettyStringPrinting>)prettyStringPrinter;

- (NSCache *)getNetWorkResponseCache;

@end


@interface PDNetworkDomainController (NSURLConnectionHelpers)

- (void)connection:(NSURLConnection *)connection willSendRequest:(NSURLRequest *)request redirectResponse:(NSURLResponse *)response;
- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response;

- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data;

- (void)connectionDidFinishLoading:(NSURLConnection *)connection;
- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error;

@end


@interface PDNetworkDomainController (NSURLSessionTaskHelpers)

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task willPerformHTTPRedirection:(NSHTTPURLResponse *)response newRequest:(NSURLRequest *)request;
- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveResponse:(NSURLResponse *)response;
- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveData:(NSData *)data;
- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error;

@end


@interface PDNetworkRequest (PDNetworkHelpers)

- (id)initWithURLRequest:(NSURLRequest *)request;
+ (PDNetworkRequest *)networkRequestWithURLRequest:(NSURLRequest *)request;

@end


@interface PDNetworkResponse (PDNetworkHelpers)

- (id)initWithURLResponse:(NSURLResponse *)response request:(NSURLRequest *)request;
+ (PDNetworkResponse *)networkResponseWithURLResponse:(NSURLResponse *)response request:(NSURLRequest *)request;

@end


@interface NSURLResponse (PDNetworkHelpers)

- (NSString *)PD_responseType;

@end

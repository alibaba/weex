/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXWebComponent.h"
#import "WXComponent_internal.h"
#import "WXUtility.h"
#import <JavaScriptCore/JavaScriptCore.h>

@interface WXWebView : UIWebView

@end

@implementation WXWebView

- (void)dealloc
{
    if (self) {
        self.delegate = nil;
    }
}

@end

@interface WXWebComponent ()

@property (nonatomic, strong) JSContext *jsContext;

@property (nonatomic, strong) WXWebView *webview;

@property (nonatomic, strong) NSString *url;

@property (nonatomic, assign) BOOL startLoadEvent;

@property (nonatomic, assign) BOOL finishLoadEvent;

@property (nonatomic, assign) BOOL failLoadEvent;

@property (nonatomic, assign) BOOL notifyEvent;

@end

@implementation WXWebComponent

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        self.url = attributes[@"src"];
    }
    return self;
}

- (UIView *)loadView
{
    return [[WXWebView alloc] init];
}

- (void)viewDidLoad
{
    _webview = (WXWebView *)self.view;
    _webview.delegate = self;
    _webview.allowsInlineMediaPlayback = YES;
    _jsContext = [_webview valueForKeyPath:@"documentView.webView.mainFrame.javaScriptContext"];
    __weak typeof(self) weakSelf = self;
    _jsContext[@"$notifyWeex"] = ^(JSValue *data) {
        if (weakSelf.notifyEvent) {
            [weakSelf fireEvent:@"notify" params:[data toDictionary]];
        }
    };
    
    if (_url) {
        [self loadURL:_url];
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"src"]) {
        self.url = attributes[@"src"];
    }
}

- (void)addEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"pagestart"]) {
        _startLoadEvent = YES;
    }
    else if ([eventName isEqualToString:@"pagefinish"]) {
        _finishLoadEvent = YES;
    }
    else if ([eventName isEqualToString:@"error"]) {
        _failLoadEvent = YES;
    }
}

- (void)setUrl:(NSString *)url
{
    if (![url isEqualToString:_url]) {
        _url = url;
        
        if (_url) {
            [self loadURL:_url];
        }
    }
}

- (void)loadURL:(NSString *)url
{
    if (self.webview) {
        NSURLRequest *request =[NSURLRequest requestWithURL:[NSURL URLWithString:url]];
        [self.webview loadRequest:request];
    }
}

- (void)reload
{
    [self.webview reload];
}

- (void)goBack
{
    if ([self.webview canGoBack]) {
        [self.webview goBack];
    }
}

- (void)goForward
{
    if ([self.webview canGoForward]) {
        [self.webview goForward];
    }
}

- (void)notifyWebview:(NSDictionary *) data
{
    NSString *json = [WXUtility JSONString:data];
    NSString *code = [NSString stringWithFormat:@"(function(){var evt=null;var data=%@;if(typeof CustomEvent==='function'){evt=new CustomEvent('notify',{detail:data})}else{evt=document.createEvent('CustomEvent');evt.initCustomEvent('notify',true,true,data)}document.dispatchEvent(evt)}())", json];
    [_jsContext evaluateScript:code];
}

#pragma mark Webview Delegate

- (NSMutableDictionary<NSString *, id> *)baseInfo
{
    NSMutableDictionary<NSString *, id> *info = [NSMutableDictionary new];
    [info setObject:self.webview.request.URL.absoluteString ?: @"" forKey:@"url"];
    [info setObject:[self.webview stringByEvaluatingJavaScriptFromString:@"document.title"] ?: @"" forKey:@"title"];
    [info setObject:@(self.webview.canGoBack) forKey:@"canGoBack"];
    [info setObject:@(self.webview.canGoForward) forKey:@"canGoForward"];
    return info;
}

- (void)webViewDidStartLoad:(UIWebView *)webView
{
    
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    if (_finishLoadEvent) {
        NSDictionary *data = [self baseInfo];
        [self fireEvent:@"pagefinish" params:data domChanges:@{@"attrs": @{@"src":self.webview.request.URL.absoluteString}}];
    }
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
    if (_failLoadEvent) {
        NSMutableDictionary *data = [self baseInfo];
        [data setObject:[error localizedDescription] forKey:@"errorMsg"];
        [data setObject:[NSString stringWithFormat:@"%ld", (long)error.code] forKey:@"errorCode"];
        [self fireEvent:@"error" params:data];
    }
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    if (_startLoadEvent) {
        NSMutableDictionary<NSString *, id> *data = [NSMutableDictionary new];
        [data setObject:request.URL.absoluteString ?:@"" forKey:@"url"];
        [self fireEvent:@"pagestart" params:data];
    }
    return YES;
}

@end
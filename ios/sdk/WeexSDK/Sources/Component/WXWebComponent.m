/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import "WXWebComponent.h"
#import "WXComponent_internal.h"
#import "WXUtility.h"
#import "WXHandlerFactory.h"
#import "WXURLRewriteProtocol.h"
#import "WXSDKEngine.h"

#import <JavaScriptCore/JavaScriptCore.h>
#import <WebKit/WKScriptMessageHandler.h>

@interface WXWebView : WKWebView

@end

@implementation WXWebView

- (void)dealloc
{
    if (self) { //!OCLint
//        self.delegate = nil;
    }
}

@end

/// -[WKUserContentController addScriptMessageHandler: name:] will retain the handler.
/// If hanler also retain the webview, it will lead to retain cycle.
/// Use delegate and weak reference to break retain cycle.
@interface WeakScriptMessageDelegate : NSObject <WKScriptMessageHandler>

@property (nonatomic, weak) id<WKScriptMessageHandler> scriptDelegate;

- (instancetype)initWithDelegate:(id<WKScriptMessageHandler>)scriptDelegate;

@end

@implementation WeakScriptMessageDelegate

- (instancetype)initWithDelegate:(id<WKScriptMessageHandler>)scriptDelegate {
    self = [super init];
    if (self) {
        _scriptDelegate = scriptDelegate;
    }
    return self;
}

- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    [self.scriptDelegate userContentController:userContentController didReceiveScriptMessage:message];
}

@end

@interface WXWebComponent () <WKScriptMessageHandler>

@property (nonatomic, strong) WXWebView *webview;

@property (nonatomic, strong) NSString *url;

@property (nonatomic, strong) NSString *source;

// save source during this initialization
@property (nonatomic, strong) NSString *inInitsource;

@property (nonatomic, assign) BOOL startLoadEvent;

@property (nonatomic, assign) BOOL finishLoadEvent;

@property (nonatomic, assign) BOOL failLoadEvent;

@property (nonatomic, assign) BOOL notifyEvent;

@end

@implementation WXWebComponent

WX_EXPORT_METHOD(@selector(postMessage:))
WX_EXPORT_METHOD(@selector(goBack))
WX_EXPORT_METHOD(@selector(reload))
WX_EXPORT_METHOD(@selector(goForward))

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        self.url = attributes[@"src"];
        
        if(attributes[@"source"]){
            self.inInitsource = attributes[@"source"];
        }
        
    }
    return self;
}

- (WKWebViewConfiguration *)baseConfiguration {
    WKWebViewConfiguration *configuration = [[WKWebViewConfiguration alloc] init];
    /// script-scale
    NSString *scalesPageToFitScript = @"var meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'width=device-width'); document.getElementsByTagName('head')[0].appendChild(meta);";
    /// script-message
    NSString *postMessageScript = @"var postMessage = function(e){window.webkit.messageHandlers.weex.postMessage(e)}";
    /// inject-scale
    WKUserScript *scalePageScript = [[WKUserScript alloc] initWithSource:scalesPageToFitScript injectionTime:WKUserScriptInjectionTimeAtDocumentEnd forMainFrameOnly:YES];
    WKUserContentController *userContentController = [[WKUserContentController alloc] init];
    [userContentController addUserScript:scalePageScript];
    /// inject-message
    WKUserScript *messageScript = [[WKUserScript alloc] initWithSource:postMessageScript injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:YES];
    [userContentController addUserScript:messageScript];
    /// scriptMessageHandler
    WeakScriptMessageDelegate *weakScriptMessageDelegate = [[WeakScriptMessageDelegate alloc] initWithDelegate:self];
    [userContentController addScriptMessageHandler:weakScriptMessageDelegate name:@"weex"];
    configuration.userContentController = userContentController;
    configuration.allowsInlineMediaPlayback = YES;
    return configuration;
}

- (UIView *)loadView
{
    return [[WXWebView alloc] initWithFrame:CGRectZero configuration:[self baseConfiguration]];
}

- (void)viewDidLoad
{
    _webview = (WXWebView *)self.view;
    _webview.navigationDelegate = self;
    [_webview setBackgroundColor:[UIColor clearColor]];
    _webview.opaque = NO;

    self.source = _inInitsource;
    if (_url) {
        [self loadURL:_url];
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"src"]) {
        self.url = attributes[@"src"];
    }

    if (attributes[@"source"]) {
        self.inInitsource = attributes[@"source"];
        self.source = self.inInitsource;
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
    NSString* newURL = [url copy];
    WX_REWRITE_URL(url, WXResourceTypeLink, self.weexInstance)
    if (!newURL) {
        return;
    }
    
    if (![newURL isEqualToString:_url]) {
        _url = newURL;
        if (_url) {
            [self loadURL:_url];
        }
    }
}

- (void) setSource:(NSString *)source
{
    NSString *newSource=[source copy];
    if(!newSource || _url){
        return;
    }
    if(![newSource isEqualToString:_source]){
        _source=newSource;
        if(_source){
            [_webview loadHTMLString:_source baseURL:nil];
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

// This method will be abandoned slowly, use postMessage
- (void)notifyWebview:(NSDictionary *) data
{
    NSString *json = [WXUtility JSONString:data];
    NSString *code = [NSString stringWithFormat:@"(function(){var evt=null;var data=%@;if(typeof CustomEvent==='function'){evt=new CustomEvent('notify',{detail:data})}else{evt=document.createEvent('CustomEvent');evt.initCustomEvent('notify',true,true,data)}document.dispatchEvent(evt)}())", json];
    [_webview evaluateJavaScript:code completionHandler:nil];
}

// Weex postMessage to web
- (void)postMessage:(NSDictionary *)data {
    WXSDKInstance *instance = [WXSDKEngine topInstance];

    NSString *bundleUrlOrigin = @"";

    if (instance.pageName) {
        NSString *bundleUrl = [instance.scriptURL absoluteString];
        NSURL *url = [NSURL URLWithString:bundleUrl];
        bundleUrlOrigin = [NSString stringWithFormat:@"%@://%@%@", url.scheme, url.host, url.port ? [NSString stringWithFormat:@":%@", url.port] : @""];
    }

    NSDictionary *initDic = @{
        @"type" : @"message",
        @"data" : data,
        @"origin" : bundleUrlOrigin
    };

    NSString *json = [WXUtility JSONString:initDic];

    NSString *code = [NSString stringWithFormat:@"(function (){window.dispatchEvent(new MessageEvent('message', %@));}())", json];
    [_webview evaluateJavaScript:code completionHandler:nil];
}

#pragma mark - WKScriptMessageHandler -
- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    /// demo: http://dotwe.org/vue/b7d6c6875ff7ae5ad90a5d84d0d46dbb
    if ([message.name isEqualToString:@"weex"]) {
        if (![message.body isKindOfClass:NSArray.class]) {
            return;
        }
        NSArray *params = message.body;
        if (params.count < 2) {
            return;
        }
        NSDictionary *data;
        NSString *origin;
        if ([params[0] isKindOfClass:NSDictionary.class]) {
            data = params[0];
        } else {
            data = @{};
        }
        if ([params[1] isKindOfClass:NSString.class]) {
            origin = params[1];
        } else {
            origin = @"default";
        }
        NSDictionary *initDic = @{
            @"type" : @"message",
            @"data" : data,
            @"origin" : origin
        };
        [self fireEvent:@"message" params:initDic];
    }
}

#pragma mark Webview Delegate

- (void)baseInfoWithCompletion:(void (^)(NSMutableDictionary<NSString *, id> *data))completion {
    NSMutableDictionary<NSString *, id> *info = [NSMutableDictionary new];
    [info setObject:self.webview.URL.absoluteString ?: @"" forKey:@"url"];
    [info setObject:@(self.webview.canGoBack) forKey:@"canGoBack"];
    [info setObject:@(self.webview.canGoForward) forKey:@"canGoForward"];
    [self.webview evaluateJavaScript:@"document.title" completionHandler:^(id _Nullable result, NSError * _Nullable error) {
        [info setObject:result ? result : @"" forKey:@"title"];
        if (completion) {
            completion(info);
        }
    }];
}

- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(WKNavigation *)navigation
{
    
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
    if (_finishLoadEvent) {
        [self baseInfoWithCompletion:^(NSMutableDictionary<NSString *,id> *data) {
            [self fireEvent:@"pagefinish" params:data domChanges:@{@"attrs": @{@"src":self.webview.URL.absoluteString}}];
        }];
    }
}

- (void)webView:(WKWebView *)webView didFailNavigation:(WKNavigation *)navigation withError:(NSError *)error
{
    if (_failLoadEvent) {
        [self baseInfoWithCompletion:^(NSMutableDictionary<NSString *,id> *data) {
            [data setObject:[error localizedDescription] forKey:@"errorMsg"];
            [data setObject:[NSString stringWithFormat:@"%ld", (long)error.code] forKey:@"errorCode"];
            
            NSString * urlString = error.userInfo[NSURLErrorFailingURLStringErrorKey];
            if (urlString) {
                // webview.request may not be the real error URL, must get from error.userInfo
                [data setObject:urlString forKey:@"url"];
                if (![urlString hasPrefix:@"http"]) {
                    return;
                }
            }
            [self fireEvent:@"error" params:data];
        }];
    }
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
       if (_startLoadEvent) {
           NSMutableDictionary<NSString *, id> *data = [NSMutableDictionary new];
           [data setObject:navigationAction.request.URL.absoluteString ?:@"" forKey:@"url"];
           [self fireEvent:@"pagestart" params:data];
       }

       decisionHandler(WKNavigationActionPolicyAllow);
}

@end

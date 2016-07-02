/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXWebViewModule.h"
#import "WXWebComponent.h"
#import "WXSDKManager.h"
#import "WXSDKInstance_private.h"

@implementation WXWebViewModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(notifyWebview:data:))
WX_EXPORT_METHOD(@selector(reload:))
WX_EXPORT_METHOD(@selector(goBack:))
WX_EXPORT_METHOD(@selector(goForward:))

- (void)performBlockWithWebView:(NSString *)elemRef block:(void (^)(WXWebComponent *))block {
    if (!elemRef) {
        return;
    }

    __weak typeof(self) weakSelf = self;
    
    WXPerformBlockOnComponentThread(^{
        WXWebComponent *webview = (WXWebComponent *)[weakSelf.weexInstance componentForRef:elemRef];
        if (!webview) {
            return;
        }
        
        [weakSelf performSelectorOnMainThread:@selector(doBlock:) withObject:^() {
            block(webview);
        } waitUntilDone:NO];
    });
}

- (void)doBlock:(void (^)())block {
    block();
}

- (void)notifyWebview:(NSString *)elemRef data:(NSDictionary *)data {
    [self performBlockWithWebView:elemRef block:^void (WXWebComponent *webview) {
        [webview notifyWebview:data];
    }];
}

- (void)reload:(NSString *)elemRef {
    [self performBlockWithWebView:elemRef block:^void (WXWebComponent *webview) {
        [webview reload];
    }];
}

- (void)goBack:(NSString *)elemRef {
    [self performBlockWithWebView:elemRef block:^void (WXWebComponent *webview) {
        [webview goBack];
    }];
}

- (void)goForward:(NSString *)elemRef {
    [self performBlockWithWebView:elemRef block:^void (WXWebComponent *webview) {
        [webview goForward];
    }];
}

@end

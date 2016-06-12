/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXScannerVC.h"
#import "AppDelegate.h"
#import "UIViewController+WXDemoNaviBar.h"
#import "WXDemoViewController.h"
#import "WXDebugTool.h"
#import <AudioToolbox/AudioToolbox.h>
#import <WeexSDK/WXSDKEngine.h>

@interface WXScannerVC ()

@property (nonatomic, strong) ZXCapture *capture;

@property (nonatomic) BOOL opened;

@end

@implementation WXScannerVC

#pragma mark - lifeCircle

- (void)dealloc {
    [self.capture.layer removeFromSuperlayer];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.edgesForExtendedLayout = UIRectEdgeNone;
    
    [self setupNaviBar];
    
    self.capture = [[ZXCapture alloc] init];
    self.capture.camera = self.capture.back;
    self.capture.focusMode = AVCaptureFocusModeContinuousAutoFocus;
    self.capture.rotation = 90.0f;
    
    self.capture.layer.frame = self.view.bounds;
    [self.view.layer addSublayer:self.capture.layer];

}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    
    [self.view.layer addSublayer:self.capture.layer];
    [self.capture start];
    
    self.capture.delegate = self;
    self.capture.layer.frame = self.view.bounds;
    
    CGAffineTransform captureSizeTransform = CGAffineTransformMakeScale(320 / self.view.frame.size.width, 480 / self.view.frame.size.height);
    self.capture.scanRect = CGRectApplyAffineTransform(self.view.frame, captureSizeTransform);
}

- (void) viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
    
    [self.capture.layer removeFromSuperlayer];
    [self.capture stop];
}

#pragma mark - ZXCaptureDelegate

- (void)captureResult:(ZXCapture *)capture result:(ZXResult *)result {
    if (!result) return;

    [self.capture.layer removeFromSuperlayer];
    [self.capture stop];
    
    if (!_opened) {
        //Vibrate
        AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
        _opened = YES;
        __weak __typeof__(self) weakSelf = self;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            weakSelf.opened = NO;
        });
        
        [self openURL:result.text];
    }
}

- (void) openURL:(NSString*)URL
{
    NSURL *url = [NSURL URLWithString:URL];
    [self remoteDebug:url];
    [self jsReplace:url];
    WXDemoViewController * controller = [[WXDemoViewController alloc] init];
    controller.url = url;
    controller.source = @"scan";
    
    if ([url.port integerValue] == 8081) {
        NSURL *socketURL = [NSURL URLWithString:[NSString stringWithFormat:@"ws://%@:8082", url.host]];
        controller.hotReloadSocket = [[SRWebSocket alloc] initWithURL:socketURL protocols:@[@"echo-protocol"]];
        controller.hotReloadSocket.delegate = controller;
        [controller.hotReloadSocket open];
    }
    
    [[self navigationController] pushViewController:controller animated:YES];
}

#pragma mark - Replace JS
- (void)jsReplace:(NSURL *)url
{
    if ([[url host] isEqualToString:@"weex-remote-debugger"]){
        NSString* path = [url path];
        if ([path isEqualToString:@"/dynamic/replace/bundle"]){
            for (NSString * param in [[url query] componentsSeparatedByString:@"&"]) {
                NSArray* elts = [param componentsSeparatedByString:@"="];
                if ([elts count] < 2) {
                    continue;
                }
                if ([[elts firstObject] isEqualToString:@"bundle"]){
                    [WXDebugTool setReplacedBundleJS:[NSURL URLWithString:[elts lastObject]]];
                }
            }
        }
        
        if ([path isEqualToString:@"/dynamic/replace/framework"]){
            for (NSString * param in [[url query] componentsSeparatedByString:@"&"]) {
                NSArray* elts = [param componentsSeparatedByString:@"="];
                if ([elts count] < 2) {
                    continue;
                }
                if ([[elts firstObject] isEqualToString:@"framework"]){
                    [WXDebugTool setReplacedJSFramework:[NSURL URLWithString:[elts lastObject]]];
                }
            }
        }
    }
}

#pragma mark Remote debug
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
- (void)remoteDebug:(NSURL *)url
{
    if ([url.scheme isEqualToString:@"ws"]) {
        [WXSDKEngine connectDebugServer:url.absoluteString];
        [WXSDKEngine initSDKEnviroment];
    }
    
    NSString *query = url.query;
    for (NSString *param in [query componentsSeparatedByString:@"&"]) {
        NSArray *elts = [param componentsSeparatedByString:@"="];
        if([elts count] < 2) continue;
        if ([[elts firstObject] isEqualToString:@"_wx_debug"]) {
            [WXDebugTool setDebug:YES];
            [WXSDKEngine connectDebugServer:[[elts lastObject]  stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
            if ([[[self.navigationController viewControllers] objectAtIndex:0] isKindOfClass:NSClassFromString(@"WXDemoViewController")]) {
                WXDemoViewController * vc = (WXDemoViewController*)[[self.navigationController viewControllers] objectAtIndex:0];
                [vc performSelector:NSSelectorFromString(@"loadRefreshCtl")];
                [self.navigationController popToViewController:vc animated:NO];
            }
            return;
        }
    }
}
#pragma clang diagnostic pop

@end

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

#import "WXDemoViewController.h"
#import <WeexSDK/WXSDKInstance.h>
#import <WeexSDK/WXSDKEngine.h>
#import <WeexSDK/WXUtility.h>
#import <WeexSDK/WXDebugTool.h>
#import <WeexSDK/WXSDKManager.h>
#import "UIViewController+WXDemoNaviBar.h"
#import "DemoDefine.h"
#import "WXPrerenderManager.h"
#import "WXMonitor.h"
#import "AppDelegate.h"

@interface WXDemoViewController () <UIScrollViewDelegate, UIWebViewDelegate>
@property (nonatomic, strong) WXSDKInstance *instance;
@property (nonatomic, strong) UIView *weexView;

@property (nonatomic, strong) NSArray *refreshList;
@property (nonatomic, strong) NSArray *refreshList1;
@property (nonatomic, strong) NSArray *refresh;
@property (nonatomic) NSInteger count;

@property (nonatomic, assign) CGFloat weexHeight;
@property (nonatomic, weak) id<UIScrollViewDelegate> originalDelegate;

@end

@implementation WXDemoViewController

- (instancetype)init
{
    if (self = [super init]) {
    }
    
    return self;
}

- (void)setInterfaceOrientation:(UIDeviceOrientation)orientation
{
    if ([[UIDevice currentDevice] respondsToSelector:@selector(setOrientation:)]) {
        [[UIDevice currentDevice] setValue:[NSNumber numberWithInteger:orientation]
                                    forKey:@"orientation"];
    }
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor whiteColor];
    [self.view setClipsToBounds:YES];
    
    _showNavigationBar = NO;
    [self.navigationController setNavigationBarHidden:_showNavigationBar];
    _weexHeight = self.view.frame.size.height - CGRectGetMaxY(self.navigationController.navigationBar.frame);
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(notificationRefreshInstance:) name:@"RefreshInstance" object:nil];
    [self render];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    [self updateInstanceState:WeexInstanceAppear];
    
    AppDelegate* appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    appDelegate.allowRotation = NO;
    [_instance isKeepingRawCssStyles:^(BOOL value) {
        appDelegate.allowRotation = value;
    }];
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
    [_instance didDisappear];
    [self updateInstanceState:WeexInstanceDisappear];
}

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
    // restore to protrait
    AppDelegate* appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
    appDelegate.allowRotation = NO;
    [self setInterfaceOrientation:UIDeviceOrientationPortrait];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    [_instance willAppear];
    [self setupNaviBar];
    [self setupRightBarItem];
    [self.navigationController setNavigationBarHidden:_showNavigationBar];
}

//TODO get height
- (void)viewDidLayoutSubviews
{
    _weexHeight = [UIScreen mainScreen].bounds.size.height - CGRectGetMaxY(self.navigationController.navigationBar.frame);
    UIEdgeInsets safeArea = UIEdgeInsetsZero;
#ifdef __IPHONE_11_0
    if (@available(iOS 11.0, *)) {
        safeArea = self.view.safeAreaInsets;
    } else {
        // Fallback on earlier versions
    }
#endif
    _instance.frame = CGRectMake(safeArea.left, safeArea.top, self.view.frame.size.width-safeArea.left-safeArea.right, _weexHeight-safeArea.top-safeArea.bottom);
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)dealloc
{
    
    [_instance destroyInstance];
#ifdef DEBUG
    [_instance forceGarbageCollection];
#endif
    
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)render
{
    CGFloat width = self.view.frame.size.width;
//    if ([_url.absoluteString isEqualToString:HOME_URL]) {
//        [self.navigationController setNavigationBarHidden:YES];
//    }
    [_instance destroyInstance];
    _instance = [[WXSDKInstance alloc] init];
    if([WXPrerenderManager isTaskExist:[self.url absoluteString]]){
        _instance = [WXPrerenderManager instanceFromUrl:self.url.absoluteString];
    }
    
    _instance.isMainContainerStack = YES;
    _instance.viewController = self;
    UIEdgeInsets safeArea = UIEdgeInsetsZero;
    
#ifdef __IPHONE_11_0
    if (@available(iOS 11.0, *)) {
        safeArea = self.view.safeAreaInsets;
    } else {
        // Fallback on earlier versions
    }
#endif
    
    _instance.frame = CGRectMake(self.view.frame.size.width-width, 0, width, _weexHeight-safeArea.bottom);
    
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:weakSelf.weexView];
        UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, weakSelf.weexView);
    };
    _instance.onFailed = ^(NSError *error) {
        if ([[error domain] isEqualToString:@"1"]) {
            dispatch_async(dispatch_get_main_queue(), ^{
                NSMutableString *errMsg=[NSMutableString new];
                [errMsg appendFormat:@"ErrorType:%@\n",[error domain]];
                [errMsg appendFormat:@"ErrorCode:%ld\n",(long)[error code]];
                [errMsg appendFormat:@"ErrorInfo:%@\n", [error userInfo]];
                
                UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"render failed" message:errMsg delegate:weakSelf cancelButtonTitle:nil otherButtonTitles:@"ok", nil];
                [alertView show];
            });
        }
    };
    
    __weak WXSDKInstance* theInstance = _instance;
    _instance.renderFinish = ^(UIView *view) {
         WXLogDebug(@"%@", @"Render Finish...");
        [weakSelf updateInstanceState:WeexInstanceAppear];
        
        AppDelegate* appDelegate = (AppDelegate *)[UIApplication sharedApplication].delegate;
        appDelegate.allowRotation = NO;
        [theInstance isKeepingRawCssStyles:^(BOOL value) {
            appDelegate.allowRotation = value;
        }];
    };
    
    _instance.updateFinish = ^(UIView *view) {
        WXLogDebug(@"%@", @"Update Finish...");
    };
    if (!self.url) {
        WXLogError(@"error: render url is nil");
        return;
    }
    if([WXPrerenderManager isTaskExist:[self.url absoluteString]]){
        WX_MONITOR_INSTANCE_PERF_START(WXPTJSDownload, _instance);
        WX_MONITOR_INSTANCE_PERF_END(WXPTJSDownload, _instance);
        WX_MONITOR_INSTANCE_PERF_START(WXPTFirstScreenRender, _instance);
        WX_MONITOR_INSTANCE_PERF_START(WXPTAllRender, _instance);
        [WXPrerenderManager renderFromCache:[self.url absoluteString]];
        return;
    }
    _instance.viewController = self;
    NSURL *URL = [self testURL: [self.url absoluteString]];
    NSString *randomURL = [NSString stringWithFormat:@"%@%@random=%d",URL.absoluteString,URL.query?@"&":@"?",arc4random()];
    [_instance renderWithURL:[NSURL URLWithString:randomURL] options:@{@"bundleUrl":URL.absoluteString} data:nil];
    [self.navigationController.navigationBar setTitleTextAttributes: [NSDictionary dictionaryWithObjectsAndKeys:
                                                                      [UIColor whiteColor], NSForegroundColorAttributeName, nil]];
    if([_instance.pageName hasPrefix:@"http://dotwe.org"] || [_instance.pageName hasPrefix:@"https://dotwe.org"]) {
        self.navigationItem.title = @"Weex Online Example";
    } else {
        self.navigationItem.title = _instance.pageName;
    }
}

- (void)updateInstanceState:(WXState)state
{
    if (_instance && _instance.state != state) {
        _instance.state = state;
        
        if (state == WeexInstanceAppear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@"viewappear" params:nil domChanges:nil];
        }
        else if (state == WeexInstanceDisappear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@"viewdisappear" params:nil domChanges:nil];
        }
    }
}

#pragma mark - refresh
- (void)refreshWeex
{
    [self render];
}

#pragma mark - UIBarButtonItems

- (void)setupRightBarItem
{
    if ([self.url.scheme hasPrefix:@"http"]) {
        [self loadRefreshCtl];
    }
}

- (void)loadRefreshCtl {
    UIBarButtonItem *refreshButtonItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"reload"] style:UIBarButtonItemStylePlain target:self action:@selector(refreshWeex)];
    refreshButtonItem.accessibilityHint = @"click to reload curent page";
    self.navigationItem.rightBarButtonItem = refreshButtonItem;
}

#pragma mark - websocket
- (void)webSocketDidOpen:(SRWebSocket *)webSocket
{
    
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message
{
    if ([@"refresh" isEqualToString:message]) {
        [self render];
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error
{
    
}

# pragma mark - orientation

- (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation
{
    if (_instance) {
        CGFloat w = [UIScreen mainScreen].bounds.size.width;
        CGFloat h = [UIScreen mainScreen].bounds.size.height;
        [_instance setPageRequiredWidth:w height:h];
        [_instance reloadLayout];
    }
}

#pragma mark - localBundle
/*- (void)loadLocalBundle:(NSURL *)url
{
    NSURL * localPath = nil;
    NSMutableArray * pathComponents = nil;
    if (self.url) {
        pathComponents =[NSMutableArray arrayWithArray:[url.absoluteString pathComponents]];
        [pathComponents removeObjectsInRange:NSRangeFromString(@"0 3")];
        [pathComponents replaceObjectAtIndex:0 withObject:@"bundlejs"];
        
        NSString *filePath = [NSString stringWithFormat:@"%@/%@",[NSBundle mainBundle].bundlePath,[pathComponents componentsJoinedByString:@"/"]];
        localPath = [NSURL fileURLWithPath:filePath];
    }else {
        NSString *filePath = [NSString stringWithFormat:@"%@/bundlejs/index.js",[NSBundle mainBundle].bundlePath];
        localPath = [NSURL fileURLWithPath:filePath];
    }
    
    NSString *bundleUrl = [NSURL fileURLWithPath:[NSString stringWithFormat:@"%@/bundlejs/",[NSBundle mainBundle].bundlePath]].absoluteString;
     [_instance renderWithURL:localPath options:@{@"bundleUrl":bundleUrl} data:nil];
}*/

#pragma mark - load local device bundle
- (NSURL*)testURL:(NSString*)url
{
    NSRange range = [url rangeOfString:@"_wx_tpl"];
    if (range.location != NSNotFound) {
        NSString *tmp = [url substringFromIndex:range.location];
        NSUInteger start = [tmp rangeOfString:@"="].location;
        NSUInteger end = [tmp rangeOfString:@"&"].location;
        ++start;
        if (end == NSNotFound) {
            end = [tmp length] - start;
        }
        else {
            end = end - start;
        }
        NSRange subRange;
        subRange.location = start;
        subRange.length = end;
        url = [tmp substringWithRange:subRange];
    }
    return [NSURL URLWithString:url];
}

#pragma mark - notification
- (void)notificationRefreshInstance:(NSNotification *)notification {
    [self refreshWeex];
}

@end

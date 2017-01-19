/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXBaseViewController.h"
#import "WXRootViewController.h"
#import "WXSDKInstance.h"
#import "WXSDKInstance_private.h"
#import "WXSDKEngine.h"
#import "WXSDKManager.h"
#import "WXUtility.h"

@interface WXBaseViewController ()

@property (nonatomic, strong) WXSDKInstance *instance;
@property (nonatomic, strong) UIView *weexView;
@property (nonatomic, strong) NSURL *sourceURL;

@end

@implementation WXBaseViewController

- (void)dealloc
{
    [_instance destroyInstance];
    [self _removeObservers];
}

- (instancetype)initWithSourceURL:(NSURL *)sourceURL
{
    if ((self = [super init])) {
        self.sourceURL = sourceURL;
        self.hidesBottomBarWhenPushed = YES;
        
        [self _addObservers];
    }
    return self;
}

/**
 *  After setting the navbar hidden status , this function will be called automatically. In this function, we
 *  set the height of mainView equal to screen height, because there is something wrong with the layout of
 *  page content.
 */

- (void)viewWillLayoutSubviews
{
    [super viewWillLayoutSubviews];
    
    if ([self.navigationController isKindOfClass:[WXRootViewController class]]) {
        CGRect frame = self.view.frame;
        frame.origin.y = 0;
        frame.size.height = [UIScreen mainScreen].bounds.size.height;
        self.view.frame = frame;
    }    
}

/**
 *  We assume that the initial state of viewController's navigitonBar is hidden.  By setting the attribute of
 *  'dataRole' equal to 'navbar', the navigationBar hidden will be NO.
 */
- (void)viewDidLoad
{
    [super viewDidLoad];
    [self addEdgePop];
    self.view.backgroundColor = [UIColor whiteColor];
    self.automaticallyAdjustsScrollViewInsets = NO;
    [self _renderWithURL:_sourceURL];
    
    if ([self.navigationController isKindOfClass:[WXRootViewController class]]) {
        self.navigationController.navigationBarHidden = YES;
    }
}

- (void)viewWillDisappear:(BOOL)animated
{
    [_instance fireGlobalEvent:WX_APPLICATION_WILL_RESIGN_ACTIVE params:nil];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    [_instance fireGlobalEvent:WX_APPLICATION_DID_BECOME_ACTIVE params:nil];
    [self _updateInstanceState:WeexInstanceAppear];
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
    [self _updateInstanceState:WeexInstanceDisappear];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    [self _updateInstanceState:WeexInstanceMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)refreshWeex
{
    [self _renderWithURL:_sourceURL];
}

- (void)addEdgePop
{
    UIScreenEdgePanGestureRecognizer *edgePanGestureRecognizer = [[UIScreenEdgePanGestureRecognizer alloc] initWithTarget:self action:@selector(edgePanGesture:)];
    edgePanGestureRecognizer.delegate = self;
    edgePanGestureRecognizer.edges = UIRectEdgeLeft;
    [self.view addGestureRecognizer:edgePanGestureRecognizer];
}

- (void)edgePanGesture:(UIScreenEdgePanGestureRecognizer*)edgePanGestureRecognizer
{
    [self.navigationController popViewControllerAnimated:YES];
}

#pragma mark- UIGestureRecognizerDelegate

- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer
{
    if (!self.navigationController || [self.navigationController.viewControllers count] == 1) {
        return NO;
    }
    return YES;
}

- (void)_renderWithURL:(NSURL *)sourceURL
{
    if (!sourceURL) {
        return;
    }

    [_instance destroyInstance];
    _instance = [[WXSDKInstance alloc] init];
    _instance.frame = CGRectMake(0.0f, 0.0f, self.view.bounds.size.width, self.view.bounds.size.height);
    _instance.pageObject = self;
    _instance.pageName = [[WXUtility urlByDeletingParameters:sourceURL] absoluteString];
    _instance.viewController = self;
    
    NSString *newURL = nil;
    
    if ([sourceURL.absoluteString rangeOfString:@"?"].location != NSNotFound) {
        newURL = [NSString stringWithFormat:@"%@&random=%d", sourceURL.absoluteString, arc4random()];
    } else {
        newURL = [NSString stringWithFormat:@"%@?random=%d", sourceURL.absoluteString, arc4random()];
    }
    [_instance renderWithURL:[NSURL URLWithString:newURL] options:@{@"bundleUrl":sourceURL.absoluteString} data:nil];
    
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:weakSelf.weexView];
    };
    
    _instance.onFailed = ^(NSError *error) {
        
    };
    
    _instance.renderFinish = ^(UIView *view) {
        [weakSelf _updateInstanceState:WeexInstanceAppear];
    };
}

- (void)_updateInstanceState:(WXState)state
{
    if (_instance && _instance.state != state) {
        _instance.state = state;
        
        if (state == WeexInstanceAppear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@"viewappear" params:nil domChanges:nil];
        } else if (state == WeexInstanceDisappear) {
            [[WXSDKManager bridgeMgr] fireEvent:_instance.instanceId ref:WX_SDK_ROOT_REF type:@"viewdisappear" params:nil domChanges:nil];
        }
    }
}

- (void)_appStateDidChange:(NSNotification *)nofity
{
    if ([nofity.name isEqualToString:@"UIApplicationDidBecomeActiveNotification"]) {
        [self _updateInstanceState:WeexInstanceForeground];
    } else if([nofity.name isEqualToString:@"UIApplicationDidEnterBackgroundNotification"]) {
        [self _updateInstanceState:WeexInstanceBackground]; ;
    }
}

- (void)_addObservers
{
    for (NSString *name in @[UIApplicationDidBecomeActiveNotification,
                             UIApplicationDidEnterBackgroundNotification]) {
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(_appStateDidChange:)
                                                     name:name
                                                   object:nil];
    }
}

- (void)_removeObservers
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end

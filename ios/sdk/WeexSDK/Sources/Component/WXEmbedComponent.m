/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXEmbedComponent.h"
#import "WXComponent_internal.h"
#import "WXSDKInstance_private.h"
#import "WXComponent+Navigation.h"
#import "WXSDKInstance.h"
#import "WXSDKManager.h"
#import "WXConvert.h"
#import "WXUtility.h"

@interface WXEmbedComponent ()

@property (nonatomic, strong) WXSDKInstance *embedInstance;
@property (nonatomic, strong) UIView *embedView;
@property (nonatomic, assign) BOOL createFinished;
@property (nonatomic, assign) BOOL renderFinished;
@property (nonatomic, assign) WXVisibility visible;
@property (nonatomic, strong) NSURL *sourceURL;
@property (nonatomic, strong) WXErrorView *errorView;

@end

@implementation WXEmbedComponent 

#pragma mark Life Cycle

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    
    if (self.embedInstance) {
        [self.embedInstance destroyInstance];
    }
}

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        
        _createFinished = NO;
        _renderFinished = NO;
        
        _sourceURL = [NSURL URLWithString: attributes[@"src"]];
        _visible =  [WXConvert WXVisibility:styles[@"visibility"]];
        
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(observeInstanceState:) name:WX_INSTANCE_NOTIFICATION_UPDATE_STATE object:nil];
    }
    
    return self;
}

- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    [self _layoutEmbedView];
}

- (void)updateStyles:(NSDictionary *)styles
{
    [super updateStyles:styles];
    
    if (styles[@"visibility"]) {
        WXVisibility visible = [WXConvert WXVisibility:styles[@"visibility"]];
        if (_visible != visible) {
            _visible = visible;
            [self _layoutEmbedView];
        }
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    [super updateAttributes:attributes];
    
    if (attributes[@"src"]) {
        NSURL *sourceURL = [NSURL URLWithString:attributes[@"src"]];
        if (!sourceURL|| ![[sourceURL absoluteString] isEqualToString:[_sourceURL absoluteString]]) {
            _sourceURL = sourceURL;
            _createFinished = NO;
            [self _layoutEmbedView];
        }
    }
}

- (void)refreshWeex
{
    [self _renderWithURL:_sourceURL];
}

- (void)_layoutEmbedView
{
    if (_visible == WXVisibilityShow) {
        [self _updateState:WeexInstanceAppear];
        if (!_createFinished && !CGRectEqualToRect(CGRectZero, self.calculatedFrame)) {
            [self _renderWithURL:_sourceURL];
        }
    }
    else {
        [self _updateState:WeexInstanceDisappear];
    }
}

- (void)_renderWithURL:(NSURL *)sourceURL
{
    if (!sourceURL || [[sourceURL absoluteString] length] == 0) {
        return;
    }
    
    [_embedInstance destroyInstance];
    _embedInstance = [[WXSDKInstance alloc] init];
    _embedInstance.parentInstance = self.weexInstance;
    _embedInstance.parentNodeRef = self.ref;
    _embedInstance.frame = CGRectMake(0.0f, 0.0f, self.view.frame.size.width, self.view.frame.size.height);
    _embedInstance.pageName = [[WXUtility urlByDeletingParameters:sourceURL]  absoluteString];
    _embedInstance.pageObject = self.weexInstance.viewController;
    _embedInstance.viewController = self.weexInstance.viewController;
    
    NSString *newURL = nil;
    
    if ([sourceURL.absoluteString rangeOfString:@"?"].location != NSNotFound) {
        newURL = [NSString stringWithFormat:@"%@&random=%d", sourceURL.absoluteString, arc4random()];
    }
    else {
        newURL = [NSString stringWithFormat:@"%@?random=%d", sourceURL.absoluteString, arc4random()];
    }
    
    [_embedInstance renderWithURL:[NSURL URLWithString:newURL] options:@{@"bundleUrl":[sourceURL absoluteString]} data:nil];
    
    __weak typeof(self) weakSelf = self;
    _embedInstance.onCreate = ^(UIView *view) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (weakSelf.errorView) {
                [weakSelf.errorView removeFromSuperview];
                weakSelf.errorView = nil;
            }
        
            [weakSelf.embedView removeFromSuperview];
            weakSelf.embedView = view;
            [weakSelf.view addSubview:weakSelf.embedView];
            
            weakSelf.createFinished = YES;
        });
    };
    
    _embedInstance.onFailed = ^(NSError *error) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (weakSelf.errorView) {
                return ;
            }
            
            WXErrorView *errorView = [[WXErrorView alloc]initWithFrame:CGRectMake(0.0f, 0.0f, 135.0f, 130.0f)];
            errorView.center = CGPointMake(weakSelf.view.bounds.size.width / 2.0f, weakSelf.view.bounds.size.height / 2.0f);
            errorView.delegate = weakSelf;
            [weakSelf.view addSubview:errorView];
            
            weakSelf.errorView = errorView;
        });
    };
    
    _embedInstance.renderFinish = ^(UIView *view) {
         weakSelf.renderFinished = YES;
        [weakSelf _updateState:WeexInstanceAppear];
    };
}

- (void)_updateState:(WXState)state
{
    if (_renderFinished && _embedInstance && _embedInstance.state != state) {
        _embedInstance.state = state;
        
        if (state == WeexInstanceAppear) {
            [self setNavigationWithStyles:self.embedInstance.naviBarStyles];
            [[WXSDKManager bridgeMgr] fireEvent:self.embedInstance.instanceId ref:WX_SDK_ROOT_REF type:@"viewappear" params:nil domChanges:nil];
        }
        else if (state == WeexInstanceDisappear ){
            [[WXSDKManager bridgeMgr] fireEvent:self.embedInstance.instanceId ref:WX_SDK_ROOT_REF type:@"viewdisappear" params:nil domChanges:nil];
        }
    }
}

- (void)onclickErrorView
{
    if (self.errorView) {
        [self.errorView removeFromSuperview];
        self.errorView = nil;
    }
    
    [self _renderWithURL:self.sourceURL];
}

- (void)observeInstanceState:(NSNotification *)notification
{
    WXSDKInstance *instance = notification.object;
    
    if (instance == self.weexInstance) {
        NSDictionary *userInfo = notification.userInfo;
        WXState state = [userInfo[@"state"] integerValue];
        if (_visible == WXVisibilityHidden) {
            switch (state) {
                case WeexInstanceBackground:
                    [self _updateState:WeexInstanceBackground];
                    break;
                default:
                    [self _updateState:WeexInstanceDisappear];
                    break;
            }
        }
        else {
            [self _updateState:state];
        }
    }
}

@end

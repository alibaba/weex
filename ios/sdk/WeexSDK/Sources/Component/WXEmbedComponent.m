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
#import "WXConvert.h"

@interface WXEmbedComponent ()

@property (nonatomic, strong) WXSDKInstance *embedInstance;
@property (nonatomic, strong) UIView *embedView;
@property (nonatomic, assign) BOOL renderFinished;
@property (nonatomic, assign) WXVisibility visible;
@property (nonatomic, strong) NSURL *sourceURL;

@end

@implementation WXEmbedComponent

#pragma mark Life Cycle

- (void)dealloc
{
//    if (self.weexInstance) {
//        [self.weexInstance removeObserver:self forKeyPath:@"state"];
//    }
    
    if (self.embedInstance) {
        [self.embedInstance destroyInstance];
    }
}

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _sourceURL = [NSURL URLWithString: attributes[@"src"]];
        _visible =  [WXConvert WXVisibility:styles[@"visibility"]];
//        [self.weexInstance addObserver:self forKeyPath:@"state" options:NSKeyValueObservingOptionNew context:nil];
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
        if (!_renderFinished && !CGRectEqualToRect(CGRectZero, self.calculatedFrame)) {
            [self _renderWithURL:_sourceURL];
        }
        [self _updateState:WeexInstanceAppear];
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
    _embedInstance.pageName = [sourceURL absoluteString];
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
            [weakSelf.embedView removeFromSuperview];
            weakSelf.embedView = view;
            weakSelf.renderFinished = YES;
            [weakSelf.view addSubview:weakSelf.embedView];
        });
    };
}

- (void)_updateState:(WXState)state
{
    if (!_embedInstance) {
        return;
    }
    
    _embedInstance.state = state;
    
    if (state == WeexInstanceAppear || state == WeexInstanceForeground )
    {
        [self setNavigationWithStyles:self.embedInstance.naviBarStyles];
    }
}

-(void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if ([keyPath isEqualToString:@"state"]) {
        WXState state = [change[@"new"] longValue];
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
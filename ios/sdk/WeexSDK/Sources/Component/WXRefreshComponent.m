/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXRefreshComponent.h"
#import "WXScrollerComponent.h"
#import "WXLoadingIndicator.h"
#import "WXComponent_internal.h"
#import "WXLog.h"

@interface WXRefreshComponent()

@property (nonatomic) BOOL displayState;
@property (nonatomic) BOOL initFinished;
@property (nonatomic) BOOL refreshEvent;

@property (nonatomic, weak) WXLoadingIndicator *indicator;

@end

@implementation WXRefreshComponent

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        if (attributes[@"display"]) {
            if ([attributes[@"display"] isEqualToString:@"show"]) {
                _displayState = YES;
            } else if ([attributes[@"display"] isEqualToString:@"hide"]){
                _displayState = NO;
            } else {
                WXLogError(@"");
            }
        }
        self.cssNode->style.position_type = CSS_POSITION_ABSOLUTE;
    }
    return self;
}

- (void)layoutDidFinish
{
    if ([self isViewLoaded]) {
        
        [self.view setFrame: (CGRect){
            .size = self.calculatedFrame.size,
            .origin.x = self.calculatedFrame.origin.x,
            .origin.y = self.view.frame.origin.y - CGRectGetHeight(self.calculatedFrame)
        }];
    }
}

- (void)viewDidLoad
{
     _initFinished = YES;
    [self.view setFrame: (CGRect){
        .size = self.calculatedFrame.size,
        .origin.x = self.calculatedFrame.origin.x,
        .origin.y = self.view.frame.origin.y - CGRectGetHeight(self.calculatedFrame)
    }];
    if (!_displayState) {
        [_indicator.view setHidden:YES];
    }
}

- (void)viewWillUnload
{
    _displayState = NO;
    _refreshEvent = NO;
    _initFinished = NO;
}

- (void)refresh
{
    if (!_refreshEvent) return;
    [self fireEvent:@"refresh" params:nil];
}

- (void)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    if (subcomponent) {
        [super _insertSubcomponent:subcomponent atIndex:index];
        if ([subcomponent isKindOfClass:[WXLoadingIndicator class]]) {
            _indicator = (WXLoadingIndicator*)subcomponent;
        }
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"display"]) {
        if ([attributes[@"display"] isEqualToString:@"show"]) {
            _displayState = YES;
        } else if ([attributes[@"display"] isEqualToString:@"hide"]){
            _displayState = NO;
        } else {
            WXLogError(@"");
        }
        [self setDisplay];
    }
}

- (void)addEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"refresh"]) {
        _refreshEvent = YES;
    }
}

- (void)removeEvent:(NSString *)evetName
{
    if ([evetName isEqualToString:@"refresh"]) {
        _refreshEvent = NO;
    }
}

- (void)setDisplay
{
    id<WXScrollerProtocol> scrollerProtocol = self.ancestorScroller;
    if (scrollerProtocol == nil || !_initFinished)
        return;
    
    CGPoint offset = [scrollerProtocol contentOffset];
    if (_displayState) {
        offset.y = -self.calculatedFrame.size.height;
        [_indicator start];
    } else {
        offset.y = 0;
        [_indicator stop];
    }
    [scrollerProtocol setContentOffset:offset animated:YES];
}

- (BOOL)displayState
{
    return _displayState;
}

- (void)setFrame:(CGRect)frame
{
    CGRect rect = frame;
    rect.origin.y = 0 - frame.size.height;
}

@end

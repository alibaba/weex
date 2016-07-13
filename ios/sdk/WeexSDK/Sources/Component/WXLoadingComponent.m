/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXLoadingComponent.h"
#import "WXScrollerComponent.h"
#import "WXLoadingIndicator.h"
#import "WXComponent_internal.h"
#import "WXLog.h"

@interface WXLoadingComponent()

@property (nonatomic) BOOL initFinished;
@property (nonatomic) BOOL loadingEvent;
@property (nonatomic) BOOL displayState;

@property (nonatomic, weak) WXLoadingIndicator *indicator;

@end

@implementation WXLoadingComponent

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

- (void)viewWillUnload
{
    _displayState = NO;
    _loadingEvent = NO;
    _initFinished = NO;
}

-(void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"display"]) {
        if ([attributes[@"display"] isEqualToString:@"show"]) {
            _displayState = YES;
            
        } else if ([attributes[@"display"] isEqualToString:@"hide"]) {
            _displayState = NO;
        } else {
            WXLogError(@"");
        }
        [self setDisplay];
    }
}

- (void)viewDidLoad
{
    _initFinished = YES;
}

- (void)addEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"loading"]) {
        _loadingEvent = YES;
    }
}

- (void)removeEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"loading"]) {
        _loadingEvent = NO;
    }
}

- (void)loading
{
    if (!_loadingEvent)
        return;
    
    [self fireEvent:@"loading" params:nil];
}

- (void)setDisplay
{
    id<WXScrollerProtocol> scrollerProtocol = self.ancestorScroller;
    if (scrollerProtocol == nil || !_initFinished)
        return;
    
    WXComponent *scroller = (WXComponent*)scrollerProtocol;
    CGPoint contentOffset = [scrollerProtocol contentOffset];
    NSInteger screen = [scrollerProtocol contentSize].height/([UIScreen mainScreen].bounds.size.height);
    if (_displayState) {
        if (screen) {
            contentOffset.y = [scrollerProtocol contentSize].height - scroller.calculatedFrame.size.height + self.view.frame.size.height;
        } else {
            contentOffset.y = self.view.frame.size.height;
        }
        
        [scrollerProtocol setContentOffset:contentOffset animated:YES];
        [_indicator start];
    } else {
        UIEdgeInsets insets = [scrollerProtocol contentInset];
        insets.bottom = 0;
        if (!screen) {
            contentOffset.y = 0;
            [scrollerProtocol setContentOffset:contentOffset animated:YES];
        }
        [scrollerProtocol setContentInset:insets];
        [_indicator stop];
    }
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

- (void)resizeFrame
{
    CGRect rect = self.view.frame;
    
    id<WXScrollerProtocol> scrollerProtocol = self.ancestorScroller;
    WXComponent *scroller = (WXComponent*)scrollerProtocol;
    if (scrollerProtocol) {
        rect.origin.y = scroller.calculatedFrame.size.height;
    }
    
    [self.view setFrame:rect];
}

@end

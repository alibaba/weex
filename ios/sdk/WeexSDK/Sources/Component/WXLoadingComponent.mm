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

#import "WXLoadingComponent.h"
#import "WXScrollerComponent.h"
#import "WXLoadingIndicator.h"
#import "WXComponent_internal.h"
#import "WXLog.h"
#import "WXComponent+Layout.h"

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
            } else if ([attributes[@"display"] isEqualToString:@"hide"]) {
                _displayState = NO;
            } else {
                WXLogError(@"");
            }
        }
        self.flexCssNode->setStylePositionType(WeexCore::kAbsolute);
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

    [self setDisplay];
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
    if (!_loadingEvent || _displayState)
        return;
    
    [self fireEvent:@"loading" params:nil];
}

- (void)setDisplay
{
    id<WXScrollerProtocol> scrollerProtocol = [self ancestorScroller];
    if (scrollerProtocol == nil || !_initFinished)
        return;
    WXComponent *scroller = (WXComponent*)scrollerProtocol;
    CGPoint contentOffset = [scrollerProtocol contentOffset];
    if (_displayState) {
        contentOffset.y = [scrollerProtocol contentSize].height - scroller.calculatedFrame.size.height + self.calculatedFrame.size.height;
        self.view.hidden = NO;
        [_indicator start];
    } else {
        contentOffset.y = contentOffset.y - self.calculatedFrame.size.height;
        [_indicator stop];
        self.view.hidden = YES;
    }
    if (contentOffset.y > 0) {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (_displayState) {
                [scrollerProtocol setContentOffset:contentOffset animated:YES];
            } else {
                [UIView animateWithDuration:0.25 animations:^{
                    [scrollerProtocol setContentOffset:contentOffset];
                } completion:nil];
            }
        });
    }
}

- (BOOL)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    BOOL inserted = [super _insertSubcomponent:subcomponent atIndex:index];
    if ([subcomponent isKindOfClass:[WXLoadingIndicator class]]) {
        _indicator = (WXLoadingIndicator*)subcomponent;
    }
    return inserted;
}

- (BOOL)displayState
{
    return _displayState;
}

- (void)resizeFrame
{
    CGRect rect = self.calculatedFrame;
    
    id<WXScrollerProtocol> scrollerProtocol = self.ancestorScroller;
    if (scrollerProtocol) {
        rect.origin.y = [scrollerProtocol contentSize].height;
    }
    
    [self.view setFrame:rect];
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXLoadingIndicator.h"
#import "WXConvert.h"

@implementation WXLoadingIndicator {
    UIActivityIndicatorView *_indicator;
    UIColor *_indicatorColor;
}

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance {
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        if (styles[@"color"]) {
            _indicatorColor = [WXConvert UIColor:styles[@"color"]];
        }
    }
    return self;
}

- (UIView *)loadView {
    return [[UIActivityIndicatorView alloc] init];
}

- (void)viewDidLoad {
    _indicator = (UIActivityIndicatorView *)self.view;
    
    if (_indicatorColor) {
        _indicator.color = _indicatorColor;
    }
}

- (void)updateStyles:(NSDictionary *)styles {
    if (styles[@"color"]) {
        _indicatorColor = [WXConvert UIColor:styles[@"color"]];
        _indicator.color = _indicatorColor;
    }
}

#pragma mark - lifeCircle

- (void)viewWillUnload {
    if (_indicator) {
        [_indicator stopAnimating];
        _indicator = nil;
    }
}

- (void)start {
    if (_indicator) {
        [_indicator startAnimating];
    }
}

- (void)stop {
    if (_indicator) {
        [_indicator stopAnimating];
    }
}

#pragma mark -reset color

- (void)resetStyles:(NSArray *)styles {
    if ([styles containsObject:@"color"]) {
        _indicatorColor = [UIColor blackColor];
        _indicator.color = _indicatorColor;
    }
}

@end

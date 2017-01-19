/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXLoadingIndicator.h"
#import "WXConvert.h"

@interface WXLoadingIndicator()

@property (nonatomic, strong) UIActivityIndicatorView* indicator;

@end

@implementation WXLoadingIndicator

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance {
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        _indicator = [[UIActivityIndicatorView alloc] init];
        if (styles[@"color"]) {
            [self setColor:[WXConvert UIColor:styles[@"color"]]];
        }
    }
    
    return self;
}

- (void)updateStyles:(NSDictionary *)styles
{
    if (styles[@"color"]) {
        [self setColor:[WXConvert UIColor:styles[@"color"]]];
    }
}

- (UIView *)loadView
{
    return _indicator;
}

#pragma mark - lifeCircle
- (void)viewWillUnload
{
    [_indicator stopAnimating];
    _indicator = nil;

}

- (void)viewDidLoad
{
    [self setFrame:self.calculatedFrame];
}

- (void)setColor:(UIColor *)color
{
    _indicator.color = color;
}

- (void)start
{
    [_indicator startAnimating];
}

- (void)stop
{
    [_indicator stopAnimating];
}

- (void)setFrame:(CGRect)frame
{
    [_indicator setFrame:frame];
}

#pragma mark -reset color
- (void)resetStyles:(NSArray *)styles
{
    if ([styles containsObject:@"color"]) {
        [self setColor:[UIColor blackColor]];
    }
}

@end

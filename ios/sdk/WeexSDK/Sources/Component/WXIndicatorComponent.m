/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXIndicatorComponent.h"
#import "WXSliderComponent.h"
#import "WXConvert.h"

@implementation WXIndicatorView

@synthesize pointCount = _pointCount;
@synthesize currentPoint = _currentPoint;

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.pointSpace = 5.0f;
    }
    return self;
}

- (void)setBackgroundColor:(UIColor *)backgroundColor
{
    [super setBackgroundColor:backgroundColor];
}

- (void)setPointCount:(NSInteger)pointCount
{
    _pointCount = pointCount;
    [self setNeedsDisplay];
}

- (void)setCurrentPoint:(NSInteger)currentPoint
{
    if (currentPoint < _pointCount && currentPoint >= 0) {
        _currentPoint = currentPoint;
        [self setNeedsDisplay];
    }
}

- (void)setPointSize:(CGFloat)pointSize
{
    _pointSize = pointSize;
    [self setNeedsDisplay];
}

- (void)setPointSpace:(CGFloat)pointSpace
{
    _pointSpace = pointSpace;
    [self setNeedsDisplay];
}

- (void)drawRect:(CGRect)rect
{
    if (self.alignStyle == WXPointIndicatorAlignCenter) {
        CGFloat startX = 0.0f, centerX = self.frame.size.width / 2.0f;
        if (self.pointCount % 2) {
            startX = centerX - (self.pointSize + self.pointSpace) * (int)(self.pointCount / 2.0f) - self.pointSize / 2.0f;
        } else {
            startX = centerX - (self.pointSize + self.pointSpace) * (int)(self.pointCount / 2.0f) +  self.pointSpace / 2.0f;   
        }
        
        CGContextRef context=UIGraphicsGetCurrentContext();
        CGContextBeginPath(context);
        
        for (int i = 0; i < self.pointCount; i++) {
            if (self.currentPoint == i) {
                CGContextSetFillColorWithColor(context, self.lightColor.CGColor);
                CGContextAddEllipseInRect(context, CGRectMake(startX, (self.frame.size.height - self.pointSize) / 2.0f, self.pointSize, self.pointSize));
                CGContextFillPath(context);
            } else {
                CGContextSetFillColorWithColor(context, self.pointColor.CGColor);
                CGContextAddEllipseInRect(context, CGRectMake(startX, (self.frame.size.height - self.pointSize) / 2.0f, self.pointSize, self.pointSize));
                CGContextFillPath(context);
            }
            startX += self.pointSize + self.pointSpace;
        }
    } else if (self.alignStyle == WXPointIndicatorAlignRight) {
        CGFloat startX = self.frame.size.width - self.pointSize * self.pointCount - self.pointSpace * (self.pointCount - 1) - 10;   //10 right margin
        CGContextRef context=UIGraphicsGetCurrentContext();
        CGContextBeginPath(context);
        
        for(int i = 0; i < self.pointCount; i++) {
            if (self.currentPoint == i) {
                CGContextSetFillColorWithColor(context, self.lightColor.CGColor);
                CGContextAddEllipseInRect(context, CGRectMake(startX, (self.frame.size.height - self.pointSize) / 2.0f, self.pointSize, self.pointSize));
                CGContextFillPath(context);
            } else {
                CGContextSetFillColorWithColor(context, self.pointColor.CGColor);
                CGContextAddEllipseInRect(context, CGRectMake(startX, (self.frame.size.height - self.pointSize) / 2.0f, self.pointSize, self.pointSize));
                CGContextFillPath(context);
            }
            startX += self.pointSize + self.pointSpace;
        }
    } else if (self.alignStyle == WXPointIndicatorAlignLeft) {
        CGFloat startX = 10.0f;   //10 left margin
        CGContextRef context=UIGraphicsGetCurrentContext();
        CGContextBeginPath(context);
        for(int i = 0; i < self.pointCount; i++) {
            if (self.currentPoint == i) {
                CGContextSetFillColorWithColor(context, self.lightColor.CGColor);
                CGContextAddEllipseInRect(context, CGRectMake(startX, (self.frame.size.height - self.pointSize) / 2.0f, self.pointSize, self.pointSize));
                CGContextFillPath(context);
            } else {
                CGContextSetFillColorWithColor(context, self.pointColor.CGColor);
                CGContextAddEllipseInRect(context, CGRectMake(startX, (self.frame.size.height - self.pointSize) / 2.0f, self.pointSize, self.pointSize));
                CGContextFillPath(context);
            }
            startX += self.pointSize + self.pointSpace;
        }
    }
}

@end

@interface WXIndicatorComponent()

@property (nonatomic, strong) WXIndicatorView *indicatorView;

@property (nonatomic, strong) UIColor *itemColor;
@property (nonatomic, strong) UIColor *itemSelectedColor;
@property (nonatomic) CGFloat itemSize;

@end

@implementation WXIndicatorComponent

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _itemColor = styles[@"itemColor"] ? [WXConvert UIColor:styles[@"itemColor"]]:[UIColor colorWithRed:0xff/255.0f green:0xff/255.0f blue:0xff/255.0f alpha:0.5f];
        _itemSelectedColor = styles[@"itemSelectedColor"] ? [WXConvert UIColor:styles[@"itemSelectedColor"]]:[UIColor colorWithRed:0xff/255.0f green:0xd5/255.0f blue:0x45/255.0f alpha:1.0f];
        _itemSize = styles[@"itemSize"] ? [WXConvert WXPixelType:styles[@"itemSize"]] : 5.0f;
    }
    return self;
}

- (UIView *)loadView
{
    return [[WXIndicatorView alloc] init];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    _indicatorView = (WXIndicatorView *)self.view;
    _indicatorView.alignStyle = WXPointIndicatorAlignCenter;
    _indicatorView.userInteractionEnabled = NO;
    _indicatorView.pointColor = _itemColor;
    _indicatorView.lightColor = _itemSelectedColor;
    _indicatorView.pointSize = _itemSize;
    
    WXComponent *parent = self.supercomponent;
    if([parent isKindOfClass:[WXSliderComponent class]]) {
        WXSliderComponent *parentSlider = (WXSliderComponent *)parent;
        [parentSlider setIndicatorView:_indicatorView];
    }
    else {
         NSAssert(NO, @"");
    }
}

- (void)updateStyles:(NSDictionary *)styles
{
    BOOL styleChange = NO;
    
    if (styles[@"itemColor"]) {
        styleChange = YES;
        _itemColor = [WXConvert UIColor:styles[@"itemColor"]];
        [_indicatorView setPointColor:_itemColor];
    }
    
    if (styles[@"itemSelectedColor"]) {
        styleChange = YES;
        _itemSelectedColor = [WXConvert UIColor:styles[@"itemSelectedColor"]];
        [_indicatorView setLightColor:_itemSelectedColor];
    }
    
    if (styles[@"itemSize"]) {
        styleChange = YES;
        _itemSize = [WXConvert WXPixelType:styles[@"itemSize"]];
        [_indicatorView setPointSize:_itemSize];
    }
    
    if (styleChange) {
        [self setNeedsDisplay];
    }
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXTextComponent.h"
#import "WXSDKInstance_private.h"
#import "WXComponent_internal.h"
#import "WXLayer.h"
#import "WXUtility.h"
#import "WXConvert.h"
#import <pthread/pthread.h>

@interface WXText : UIView

@property (nonatomic, strong) NSTextStorage *textStorage;

@end

@implementation WXText

- (instancetype)initWithFrame:(CGRect)frame
{
    if ((self = [super initWithFrame:frame])) {
        self.isAccessibilityElement = YES;
        self.accessibilityTraits |= UIAccessibilityTraitStaticText;
        
        self.opaque = NO;
        self.contentMode = UIViewContentModeRedraw;
        self.textStorage = [NSTextStorage new];
    }
    return self;
}

+ (Class)layerClass
{
    return [WXLayer class];
}

- (UIImage *)drawTextWithBounds:(CGRect)bounds padding:(UIEdgeInsets)padding
{
    if (bounds.size.width <=0 || bounds.size.height <= 0) {
        return nil;
    }
    UIGraphicsBeginImageContextWithOptions(bounds.size, self.layer.opaque, WXScreenScale());
    CGContextRef context = UIGraphicsGetCurrentContext();
    
    if ([self.wx_component _needsDrawBorder]) {
        [self.wx_component _drawBorderWithContext:context size:bounds.size];
    } else {
        WXPerformBlockOnMainThread(^{
            [self.wx_component _resetNativeBorderRadius];
        });
    }
    NSLayoutManager *layoutManager = _textStorage.layoutManagers.firstObject;
    NSTextContainer *textContainer = layoutManager.textContainers.firstObject;
    
    CGRect textFrame = UIEdgeInsetsInsetRect(bounds, padding);
    NSRange glyphRange = [layoutManager glyphRangeForTextContainer:textContainer];
    
    [layoutManager drawBackgroundForGlyphRange:glyphRange atPoint:textFrame.origin];
    [layoutManager drawGlyphsForGlyphRange:glyphRange atPoint:textFrame.origin];
    
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    
    UIGraphicsEndImageContext();
    
    return image;
}

- (void)setTextStorage:(NSTextStorage *)textStorage
{
    if (_textStorage != textStorage) {
        _textStorage = textStorage;
        [self.wx_component setNeedsDisplay];
    }
}

- (NSString *)description
{
    NSString *superDescription = super.description;
    NSRange semicolonRange = [superDescription rangeOfString:@";"];
    NSString *replacement = [NSString stringWithFormat:@"; text: %@; frame:%f,%f,%f,%f", _textStorage.string, self.frame.origin.x, self.frame.origin.y, self.frame.size.width, self.frame.size.height];
    return [superDescription stringByReplacingCharactersInRange:semicolonRange withString:replacement];
}

- (NSString *)accessibilityValue
{
    return _textStorage.string;
}

@end

@implementation WXTextComponent
{
    UIEdgeInsets _border;
    UIEdgeInsets _padding;
    NSTextStorage *_textStorage;
    CGFloat _textStorageWidth;
    
    NSString *_text;
    UIColor *_color;
    NSString *_fontFamily;
    CGFloat _fontSize;
    CGFloat _fontWeight;
    WXTextStyle _fontStyle;
    NSUInteger _lines;
    NSTextAlignment _textAlign;
    WXTextDecoration _textDecoration;
    NSString *_textOverflow;
    CGFloat _lineHeight;
    
   
    pthread_mutex_t _textStorageMutex;
    pthread_mutexattr_t _textStorageMutexAttr;
}

static BOOL _isUsingTextStorageLock = NO;
+ (void)useTextStorageLock:(BOOL)isUsingTextStorageLock
{
    _isUsingTextStorageLock = isUsingTextStorageLock;
}

- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString *)type
                     styles:(NSDictionary *)styles
                 attributes:(NSDictionary *)attributes
                     events:(NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        if (_isUsingTextStorageLock) {
            pthread_mutexattr_init(&_textStorageMutexAttr);
            pthread_mutexattr_settype(&_textStorageMutexAttr, PTHREAD_MUTEX_RECURSIVE);
            pthread_mutex_init(&_textStorageMutex, &_textStorageMutexAttr);
        }
        
        [self fillCSSStyles:styles];
        [self fillAttributes:attributes];
    }
    
    return self;
}

- (void)dealloc
{
    if (_isUsingTextStorageLock) {
        pthread_mutex_destroy(&_textStorageMutex);
        pthread_mutexattr_destroy(&_textStorageMutexAttr);
    }
}



#define WX_STYLE_FILL_TEXT(key, prop, type, needLayout)\
do {\
    id value = styles[@#key];\
    if (value) {\
        _##prop = [WXConvert type:value];\
        [self setNeedsRepaint];\
        if (needLayout) {\
            [self setNeedsLayout];\
        }\
    }\
} while(0);

#define WX_STYLE_FILL_TEXT_PIXEL(key, prop, needLayout)\
do {\
    id value = styles[@#key];\
    if (value) {\
        _##prop = [WXConvert WXPixelType:value scaleFactor:self.weexInstance.pixelScaleFactor];\
        [self setNeedsRepaint];\
    if (needLayout) {\
        [self setNeedsLayout];\
    }\
}\
} while(0);

- (void)fillCSSStyles:(NSDictionary *)styles
{
    WX_STYLE_FILL_TEXT(color, color, UIColor, NO)
    WX_STYLE_FILL_TEXT(fontFamily, fontFamily, NSString, YES)
    WX_STYLE_FILL_TEXT_PIXEL(fontSize, fontSize, YES)
    WX_STYLE_FILL_TEXT(fontWeight, fontWeight, WXTextWeight, YES)
    WX_STYLE_FILL_TEXT(fontStyle, fontStyle, WXTextStyle, YES)
    WX_STYLE_FILL_TEXT(lines, lines, NSUInteger, YES)
    WX_STYLE_FILL_TEXT(textAlign, textAlign, NSTextAlignment, NO)
    WX_STYLE_FILL_TEXT(textDecoration, textDecoration, WXTextDecoration, YES)
    WX_STYLE_FILL_TEXT(textOverflow, textOverflow, NSString, NO)
    WX_STYLE_FILL_TEXT_PIXEL(lineHeight, lineHeight, YES)
    
    UIEdgeInsets padding = {
        WXFloorPixelValue(self.cssNode->style.padding[CSS_TOP] + self.cssNode->style.border[CSS_TOP]),
        WXFloorPixelValue(self.cssNode->style.padding[CSS_LEFT] + self.cssNode->style.border[CSS_LEFT]),
        WXFloorPixelValue(self.cssNode->style.padding[CSS_BOTTOM] + self.cssNode->style.border[CSS_BOTTOM]),
        WXFloorPixelValue(self.cssNode->style.padding[CSS_RIGHT] + self.cssNode->style.border[CSS_RIGHT])
    };
    
    if (!UIEdgeInsetsEqualToEdgeInsets(padding, _padding)) {
        _padding = padding;
        [self setNeedsRepaint];
    }
}

- (void)fillAttributes:(NSDictionary *)attributes
{
    id text = attributes[@"value"];
    if (text) {
        _text = [WXConvert NSString:text];
        [self setNeedsRepaint];
        [self setNeedsLayout];
    }
}

- (void)setNeedsRepaint
{
    if (_isUsingTextStorageLock) {
        pthread_mutex_lock(&_textStorageMutex);
    }
    _textStorage = nil;
    if (_isUsingTextStorageLock) {
        pthread_mutex_unlock(&_textStorageMutex);
    }
}

#pragma mark - Subclass

- (void)setNeedsLayout
{
    [super setNeedsLayout];
}

- (void)viewDidLoad
{
    if (_isUsingTextStorageLock) {
        pthread_mutex_lock(&_textStorageMutex);
    }
    ((WXText *)self.view).textStorage = _textStorage;
    if (_isUsingTextStorageLock) {
        pthread_mutex_unlock(&_textStorageMutex);
    }
    [self setNeedsDisplay];
}

- (UIView *)loadView
{
    return [[WXText alloc] init];
}

- (WXDisplayBlock)displayBlock
{
    WXText *textView = ((WXText *)self.view);
    return ^UIImage *(CGRect bounds, BOOL(^isCancelled)(void)) {
        if (isCancelled()) {
            return nil;
        }
        if (_isUsingTextStorageLock) {
            pthread_mutex_lock(&_textStorageMutex);
        }
        
        UIImage *image = [textView drawTextWithBounds:bounds padding:_padding];
        
        if (_isUsingTextStorageLock) {
            pthread_mutex_unlock(&_textStorageMutex);
        }
        
        return image;
    };
}

- (CGSize (^)(CGSize))measureBlock
{
    __weak typeof(self) weakSelf = self;
    return ^CGSize (CGSize constrainedSize) {
        NSTextStorage *textStorage = [weakSelf textStorageWithWidth:constrainedSize.width];
        
        NSLayoutManager *layoutManager = textStorage.layoutManagers.firstObject;
        NSTextContainer *textContainer = layoutManager.textContainers.firstObject;
        CGSize computedSize = [layoutManager usedRectForTextContainer:textContainer].size;
        
        //TODO:more elegant way to use max and min constrained size
        if (!isnan(weakSelf.cssNode->style.minDimensions[CSS_WIDTH])) {
            computedSize.width = MAX(computedSize.width, weakSelf.cssNode->style.minDimensions[CSS_WIDTH]);
        }
        
        if (!isnan(weakSelf.cssNode->style.maxDimensions[CSS_WIDTH])) {
            computedSize.width = MIN(computedSize.width, weakSelf.cssNode->style.maxDimensions[CSS_WIDTH]);
        }
        
        if (!isnan(weakSelf.cssNode->style.minDimensions[CSS_HEIGHT])) {
            computedSize.height = MAX(computedSize.height, weakSelf.cssNode->style.minDimensions[CSS_HEIGHT]);
        }
        
        if (!isnan(weakSelf.cssNode->style.maxDimensions[CSS_HEIGHT])) {
            computedSize.height = MIN(computedSize.height, weakSelf.cssNode->style.maxDimensions[CSS_HEIGHT]);
        }
        
        return (CGSize) {
            WXCeilPixelValue(computedSize.width),
            WXCeilPixelValue(computedSize.height)
        };
    };
}

#pragma mark Text Building
- (NSString *)text
{
    return _text;
}

- (NSAttributedString *)buildAttributeString
{
    NSString *string = [self text] ?: @"";
    
    NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:string];
    
    // set textColor
    if(_color){
        [attributedString addAttribute:NSForegroundColorAttributeName value:_color range:NSMakeRange(0, string.length)];
    }
    
    // set font
    if (!_fontFamily) {
        NSString *regex = @".*[\\u4e00-\\u9faf].*";//Has Simplified Chinese char
        NSPredicate *pred = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",regex];
        if ([pred evaluateWithObject:string]) {
            if ([[UIDevice currentDevice].systemVersion floatValue] < 9.0) {
                //“Heiti SC” font is "[UIFont systemFontOfSize:]" for Simplified Chinese before iOS 9.0.
                _fontFamily = @"Heiti SC";
            } else {
                //“PingFang SC” font is "[UIFont systemFontOfSize:]" for Simplified Chinese from iOS 9.0.
                _fontFamily = @"PingFang SC";
            }
        }
    }
    UIFont *font = [WXUtility fontWithSize:_fontSize textWeight:_fontWeight textStyle:_fontStyle fontFamily:_fontFamily scaleFactor:self.weexInstance.pixelScaleFactor];
    if (font) {
        [attributedString addAttribute:NSFontAttributeName value:font range:NSMakeRange(0, string.length)];
    }
    
    if(_textDecoration == WXTextDecorationUnderline){
        [attributedString addAttribute:NSUnderlineStyleAttributeName value:@(NSUnderlinePatternSolid | NSUnderlineStyleSingle) range:NSMakeRange(0, string.length)];
    } else if(_textDecoration == WXTextDecorationLineThrough){
        [attributedString addAttribute:NSStrikethroughStyleAttributeName value:@(NSUnderlinePatternSolid | NSUnderlineStyleSingle) range:NSMakeRange(0, string.length)];
    }
    
    NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];

    if (_textAlign) {
        paragraphStyle.alignment = _textAlign;
    }
    
    if (_lineHeight) {
        paragraphStyle.maximumLineHeight = _lineHeight;
        paragraphStyle.minimumLineHeight = _lineHeight;
    }
    
    if (_lineHeight || _textAlign) {
        [attributedString addAttribute:NSParagraphStyleAttributeName
                                 value:paragraphStyle
                                 range:(NSRange){0, attributedString.length}];
    }

    return attributedString;
}

- (NSTextStorage *)textStorageWithWidth:(CGFloat)width
{
    if (_textStorage && width == _textStorageWidth) {
        return _textStorage;
    }
    
    NSLayoutManager *layoutManager = [NSLayoutManager new];
    
    // build AttributeString
    NSAttributedString *attributedString = [self buildAttributeString];
    
    NSTextStorage *textStorage = [[NSTextStorage alloc] initWithAttributedString:attributedString];
    [textStorage addLayoutManager:layoutManager];
    
    NSTextContainer *textContainer = [NSTextContainer new];
    textContainer.lineFragmentPadding = 0.0;
    
    textContainer.lineBreakMode = NSLineBreakByClipping;
    if (_textOverflow && [_textOverflow length] > 0) {
        if ([_textOverflow isEqualToString:@"ellipsis"])
            textContainer.lineBreakMode = NSLineBreakByTruncatingTail;
    }
    textContainer.maximumNumberOfLines = _lines > 0 ? _lines : 0;
    textContainer.size = (CGSize){isnan(width) ? CGFLOAT_MAX : width, CGFLOAT_MAX};

    [layoutManager addTextContainer:textContainer];
    [layoutManager ensureLayoutForTextContainer:textContainer];
    
    _textStorageWidth = width;
    
    if (_isUsingTextStorageLock) {
        pthread_mutex_lock(&_textStorageMutex);
    }
    _textStorage = textStorage;
    if (_isUsingTextStorageLock) {
        pthread_mutex_unlock(&_textStorageMutex);
    }
    
    return textStorage;
}

- (void)syncTextStorageForView
{
    CGFloat width = self.calculatedFrame.size.width - (_padding.left + _padding.right);
    NSTextStorage *textStorage = [self textStorageWithWidth:width];
    
    [self.weexInstance.componentManager  _addUITask:^{
        if ([self isViewLoaded]) {
            if (_isUsingTextStorageLock) {
                pthread_mutex_lock(&_textStorageMutex);
            }
            ((WXText *)self.view).textStorage = textStorage;
            if (_isUsingTextStorageLock) {
                pthread_mutex_unlock(&_textStorageMutex);
            }
            [self readyToRender]; // notify super component
            [self setNeedsDisplay];
        }
    }];
}

- (void)_frameDidCalculated:(BOOL)isChanged
{
    [super _frameDidCalculated:isChanged];
    [self syncTextStorageForView];
}

- (void)_updateStylesOnComponentThread:(NSDictionary *)styles resetStyles:(NSMutableArray *)resetStyles isUpdateStyles:(BOOL)isUpdateStyles
{
    [super _updateStylesOnComponentThread:styles resetStyles:(NSMutableArray *)resetStyles isUpdateStyles:isUpdateStyles];
    
    [self fillCSSStyles:styles];
    
    [self syncTextStorageForView];
}

- (void)_updateAttributesOnComponentThread:(NSDictionary *)attributes
{
    [super _updateAttributesOnComponentThread:attributes];
    
    [self fillAttributes:attributes];
    
    [self syncTextStorageForView];
}

#ifdef UITEST
- (NSString *)description
{
    return super.description;
}
#endif
 
- (void)_resetCSSNodeStyles:(NSArray *)styles
{
    [super _resetCSSNodeStyles:styles];
    if ([styles containsObject:@"color"]) {
        _color = [UIColor blackColor];
        [self setNeedsRepaint];
    }
    if ([styles containsObject:@"fontSize"]) {
        _fontSize = WX_TEXT_FONT_SIZE;
        [self setNeedsRepaint];
        [self setNeedsLayout];
    }
}

@end


/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXTextInputComponent.h"
#import "WXConvert.h"
#import "WXUtility.h"

@interface WXTextInputView : UITextField
@property (nonatomic, assign) UIEdgeInsets border;
@property (nonatomic, assign) UIEdgeInsets padding;
@end

@implementation WXTextInputView

- (instancetype)init
{
    self = [super init];
    if (self) {
        _padding = UIEdgeInsetsZero;
        _border = UIEdgeInsetsZero;
    }
    return self;
}

- (CGRect)textRectForBounds:(CGRect)bounds
{
    bounds.size.width -= self.padding.left + self.border.left;
    bounds.origin.x += self.padding.left + self.border.left;
    
    bounds.size.height -= self.padding.top + self.border.top;
    bounds.origin.y += self.padding.top + self.border.top;
    
    bounds.size.width -= self.padding.right + self.border.right;
    
    bounds.size.height -= self.padding.bottom + self.border.bottom;
    
    return bounds;
}

- (CGRect)editingRectForBounds:(CGRect)bounds
{
    return [self textRectForBounds:bounds];
}
@end

@interface WXTextInputComponent()

@property (nonatomic, strong) WXTextInputView *inputView;
//attribute
@property (nonatomic, strong) UIColor *placeholderColor;
@property (nonatomic, strong) NSString *placeholder;
@property (nonatomic) NSUInteger maxLength;
//style
@property (nonatomic) WXPixelType fontSize;
@property (nonatomic) WXTextStyle fontStyle;
@property (nonatomic) WXTextWeight fontWeight;
@property (nonatomic, strong) NSString *fontFamily;
//event
@property (nonatomic) BOOL inputEvent;
@property (nonatomic) BOOL focusEvent;
@property (nonatomic) BOOL blurEvent;
@property (nonatomic) BOOL changeEvent;
@property (nonatomic) BOOL clickEvent;
@property (nonatomic, strong) NSString *changeEventString;

@end

@implementation WXTextInputComponent
{
    UIEdgeInsets _border;
    UIEdgeInsets _padding;
    NSTextStorage* _textStorage;
}

@synthesize border = _border;
@synthesize padding = _padding;
@synthesize textStorage = _textStorage;

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        _inputEvent = NO;
        _focusEvent = NO;
        _blurEvent = NO;
        _changeEvent = NO;
        _clickEvent = NO;
        
        _inputView = [[WXTextInputView alloc] init];
        if (attributes[@"type"]) {
            [self setType: attributes[@"type"]];
        }
        
        if (attributes[@"autofocus"]) {
            [self setAutofocus:[attributes[@"autofocus"] boolValue]];
        }
        if (attributes[@"disabled"]) {
            [_inputView setEnabled:[attributes[@"disabled"] boolValue]];
        }
        if (attributes[@"placeholder"]) {
            _placeholder = attributes[@"placeholder"];
            _inputView.placeholder = _placeholder;
        } else {
            _placeholder = @"";
        }
        if (attributes[@"value"]) {
            _inputView.text = attributes[@"value"];
        }
        if (attributes[@"maxlength"]) {
            _maxLength = [attributes[@"maxlength"] integerValue];
        } else {
            _maxLength = 0;
        }
        
        if (styles[@"color"]) {
            [_inputView setTextColor:[WXConvert UIColor:styles[@"color"]]];
        }
        if (styles[@"fontSize"]) {
            _fontSize = [WXConvert WXPixelType:styles[@"fontSize"]];
        }
        if (styles[@"fontWeight"]) {
            _fontWeight = [WXConvert WXTextWeight:styles[@"fontWeight"]];
        }
        if (styles[@"fontStyle"]) {
            _fontStyle = [WXConvert WXTextStyle:styles[@"fontStyle"]];
        }
        if (styles[@"fontFamily"]) {
            _fontFamily = styles[@"fontFamily"];
        }
        if (styles[@"textAlign"]) {
            [_inputView setTextAlignment:[WXConvert NSTextAlignment:styles[@"textAlign"]]] ;
        }
        
        if (styles[@"placeholderColor"]) {
            _placeholderColor = [WXConvert UIColor:styles[@"placeholderColor"]];
        }else {
            _placeholderColor = [UIColor colorWithRed:0x99/255.0 green:0x99/255.0 blue:0x99/255.0 alpha:1.0];
        }
        [self setPlaceholderAttributedString];
        [self setTextFont];
        
        UIEdgeInsets padding = UIEdgeInsetsMake(self.cssNode->style.padding[CSS_TOP], self.cssNode->style.padding[CSS_LEFT], self.cssNode->style.padding[CSS_BOTTOM], self.cssNode->style.padding[CSS_RIGHT]);
        if (!UIEdgeInsetsEqualToEdgeInsets(padding, _padding)) {
            [self setPadding:padding];
        }
        UIEdgeInsets border = UIEdgeInsetsMake(self.cssNode->style.border[CSS_TOP], self.cssNode->style.border[CSS_LEFT], self.cssNode->style.border[CSS_BOTTOM], self.cssNode->style.border[CSS_RIGHT]);
        if (!UIEdgeInsetsEqualToEdgeInsets(border, _border)) {
            [self setBorder:border];
        }
    }
    
    return self;
}

-(UIView *)loadView
{
    return _inputView;
}

#pragma mark - lifeCircle

- (void)viewDidLoad
{
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textFiledEditChanged:)
                                                 name:UITextFieldTextDidChangeNotification
                                               object:_inputView];
    _padding = UIEdgeInsetsZero;
    _border = UIEdgeInsetsZero;
    _inputView.delegate = self;
    
    UIBarButtonItem *barButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(closeKeyboard)];
    UIBarButtonItem *space = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil];
    UIToolbar *toolbar = [[UIToolbar alloc] initWithFrame:CGRectMake(0, 0, 0, 44)];
    toolbar.items = [NSArray arrayWithObjects:space, barButton, nil];
    
    _inputView.inputAccessoryView = toolbar;
}

- (void)viewWillUnload
{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UITextFieldTextDidChangeNotification object:_inputView];
}

#pragma mark - Add Event
- (void)addEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"input"]) {
        _inputEvent = YES;
    }
    if ([eventName isEqualToString:@"focus"]) {
        _focusEvent = YES;
    }
    if ([eventName isEqualToString:@"blur"]) {
        _blurEvent = YES;
    }
    if ([eventName isEqualToString:@"change"]) {
        _changeEvent = YES;
    }
    if ([eventName isEqualToString:@"click"]) {
        _clickEvent = YES;
    }
}

#pragma Remove Event

-(void)removeEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"input"]) {
        _inputEvent = NO;
    }
    if ([eventName isEqualToString:@"focus"]) {
        _focusEvent = NO;
    }
    if ([eventName isEqualToString:@"blur"]) {
        _blurEvent = NO;
    }
    if ([eventName isEqualToString:@"change"]) {
        _changeEvent = NO;
    }
    if ([eventName isEqualToString:@"click"]) {
        _clickEvent = NO;
    }
}

#pragma mark - upate attributes

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"type"]) {
        [self setType: attributes[@"type"]];
    }
    if (attributes[@"autofocus"]) {
        [self setAutofocus:[attributes[@"autofocus"] boolValue]];
    }
    if (attributes[@"disabled"]) {
        [_inputView setEnabled:[attributes[@"disabled"] boolValue]];
    }
    if (attributes[@"maxlength"]) {
        _maxLength = [attributes[@"maxlength"] integerValue];
    }
    
    if (attributes[@"placeholder"]) {
        _placeholder = attributes[@"placeholder"];
        _inputView.placeholder = _placeholder;
    }
    if (attributes[@"value"]) {
        _inputView.text = attributes[@"value"];
    }
    
    [self setPlaceholderAttributedString];
}

#pragma mark - upate styles

- (void)updateStyles:(NSDictionary *)styles
{
    if (styles[@"color"]) {
        [_inputView setTextColor:[WXConvert UIColor:styles[@"color"]]];
    }
    if (styles[@"fontSize"]) {
        _fontSize = [WXConvert WXPixelType:styles[@"fontSize"]];
    }
    if (styles[@"fontWeight"]) {
        _fontWeight = [WXConvert WXTextWeight:styles[@"fontWeight"]];
    }
    if (styles[@"fontStyle"]) {
        _fontStyle = [WXConvert WXTextStyle:styles[@"fontStyle"]];
    }
    if (styles[@"fontFamily"]) {
        _fontFamily = styles[@"fontFamily"];
    }
    if (styles[@"textAlign"]) {
        [_inputView setTextAlignment:[WXConvert NSTextAlignment:styles[@"textAlign"]]] ;
    }
    if (styles[@"placeholderColor"]) {
        _placeholderColor = [WXConvert UIColor:styles[@"placeholderColor"]];
    }else {
        _placeholderColor = [UIColor colorWithRed:0x99/255.0 green:0x99/255.0 blue:0x99/255.0 alpha:1.0];
    }
    [self setPlaceholderAttributedString];
    
    UIEdgeInsets padding = UIEdgeInsetsMake(self.cssNode->style.padding[CSS_TOP], self.cssNode->style.padding[CSS_LEFT], self.cssNode->style.padding[CSS_BOTTOM], self.cssNode->style.padding[CSS_RIGHT]);
    if (!UIEdgeInsetsEqualToEdgeInsets(padding, _padding)) {
        [self setPadding:padding];
    }
    
    UIEdgeInsets border = UIEdgeInsetsMake(self.cssNode->style.border[CSS_TOP], self.cssNode->style.border[CSS_LEFT], self.cssNode->style.border[CSS_BOTTOM], self.cssNode->style.border[CSS_RIGHT]);
    if (!UIEdgeInsetsEqualToEdgeInsets(border, _border)) {
        [self setBorder:border];
    }
    
    [self setTextFont];
}

- (CGSize (^)(CGSize))measureBlock
{
    __weak typeof(self) weakSelf = self;
    return ^CGSize (CGSize constrainedSize) {
        
        CGSize computedSize = [[[NSString alloc] init]sizeWithAttributes:nil];
        //TODO:more elegant way to use max and min constrained size
        if (!isnan(weakSelf.cssNode->style.minDimensions[CSS_WIDTH])) {
            computedSize.width = MAX(computedSize.width, weakSelf.cssNode->style.minDimensions[CSS_WIDTH]);
        }
        
        if (!isnan(weakSelf.cssNode->style.maxDimensions[CSS_WIDTH])) {
            computedSize.width = MIN(computedSize.width, weakSelf.cssNode->style.maxDimensions[CSS_WIDTH]);
        }
        
        if (!isnan(weakSelf.cssNode->style.minDimensions[CSS_HEIGHT])) {
            computedSize.width = MAX(computedSize.height, weakSelf.cssNode->style.minDimensions[CSS_HEIGHT]);
        }
        
        if (!isnan(weakSelf.cssNode->style.maxDimensions[CSS_HEIGHT])) {
            computedSize.width = MIN(computedSize.height, weakSelf.cssNode->style.maxDimensions[CSS_HEIGHT]);
        }
        
        return (CGSize) {
            WXCeilPixelValue(computedSize.width),
            WXCeilPixelValue(computedSize.height)
        };
    };
}


#pragma mark -
#pragma mark UITextFieldDelegate

- (void)textFieldDidBeginEditing:(UITextField *)textField
{
    _changeEventString = [textField text];
    if (_focusEvent) {
        [self fireEvent:@"focus" params:nil];
    }
    if (_clickEvent) {
        [self fireEvent:@"click" params:nil];
    }
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string
{
    if (_maxLength) {
        NSUInteger oldLength = [textField.text length];
        NSUInteger replacementLength = [string length];
        NSUInteger rangeLength = range.length;
        
        NSUInteger newLength = oldLength - rangeLength + replacementLength;
        
        return newLength <= _maxLength ;
    }
    return YES;
}

- (void)textFieldDidEndEditing:(UITextField *)textField
{
    if (_changeEvent) {
        if (![[textField text] isEqualToString:_changeEventString]) {
            [self fireEvent:@"change" params:@{@"value":[textField text]} domChanges:@{@"attrs":@{@"value":[textField text]}}];
        }
    }
    if (_blurEvent) {
        [self fireEvent:@"blur" params:nil];
    }
}

- (void)textFiledEditChanged:(NSNotification *)notifi{
    if (_inputEvent) {
        UITextField *textField = (UITextField *)notifi.object;
        [self fireEvent:@"input" params:@{@"value":textField.text}];
    }
}

#pragma mark

- (void)setPlaceholderAttributedString
{
    if (_placeholderColor) {
        NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:_placeholder];
        [attributedString addAttribute:NSForegroundColorAttributeName value:_placeholderColor range:NSMakeRange(0, _placeholder.length)];
        [_inputView setAttributedPlaceholder:attributedString];
    }
}

- (void)setTextFont
{
    UIFont *font = [WXUtility fontWithSize:_fontSize textWeight:_fontWeight textStyle:_fontStyle fontFamily:_fontFamily];
    [_inputView setFont:font];
}

- (void)setAutofocus:(BOOL)b
{
    if (b) {
        [_inputView becomeFirstResponder];
    } else {
        [_inputView resignFirstResponder];
    }
}

- (void)setType:(NSString*)type
{
    [_inputView setKeyboardType:UIKeyboardTypeDefault];
    [_inputView setSecureTextEntry:NO];
    
    if ([type isEqualToString:@"text"]) {
        [_inputView setKeyboardType:UIKeyboardTypeDefault];
    }
    else if ([type isEqualToString:@"password"]) {
        [_inputView setSecureTextEntry:YES];
    }
    else if ([type isEqualToString:@"tel"]) {
        [_inputView setKeyboardType:UIKeyboardTypePhonePad];
    }
    else if ([type isEqualToString:@"email"]) {
        [_inputView setKeyboardType:UIKeyboardTypeEmailAddress];
    }
    else if ([type isEqualToString:@"url"]) {
        [_inputView setKeyboardType:UIKeyboardTypeURL];
    }
    else if ([type isEqualToString:@"date"]) {
        [_inputView setKeyboardType:UIKeyboardTypeNumberPad];
    }
    else if ([type isEqualToString:@"time"]) {
        [_inputView setKeyboardType:UIKeyboardTypeNumberPad];
    }
    else if ([type isEqualToString:@"datetime"]) {
        [_inputView setKeyboardType:UIKeyboardTypeNumberPad];
    }
}

- (void)setPadding:(UIEdgeInsets)padding
{
    _padding = padding;
    [_inputView setPadding:padding];
}

- (void)setBorder:(UIEdgeInsets)border
{
    _border = border;
    [_inputView setBorder:border];
}

- (void)closeKeyboard
{
    [_inputView resignFirstResponder];
}

@end

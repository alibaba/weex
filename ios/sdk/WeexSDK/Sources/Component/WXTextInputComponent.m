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
#import "WXSDKInstance.h"
#import "WXSDKInstance_private.h"
#import "WXDefine.h"
#import "WXAssert.h"
#import "WXComponent_internal.h"
#import "WXComponent+PseudoClassManagement.h"

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
@property (nonatomic, strong) WXDatePickerManager *datePickerManager;
@property (nonatomic, strong) NSDictionary *attr;
//attribute
@property (nonatomic, strong) UIColor *placeholderColor;
@property (nonatomic, strong) NSString *placeholderString;
@property (nonatomic) NSNumber *maxLength;
@property (nonatomic) NSString * value;
@property (nonatomic) BOOL autofocus;
@property (nonatomic) BOOL disabled;
@property (nonatomic, copy) NSString *inputType;
//style
@property (nonatomic) WXPixelType fontSize;
@property (nonatomic) WXTextStyle fontStyle;
@property (nonatomic) CGFloat fontWeight;
@property (nonatomic, strong) NSString *fontFamily;
@property (nonatomic, strong) UIColor *colorForStyle;
@property (nonatomic)NSTextAlignment textAlignForStyle;

//event
@property (nonatomic) BOOL inputEvent;
@property (nonatomic) BOOL focusEvent;
@property (nonatomic) BOOL blurEvent;
@property (nonatomic) BOOL changeEvent;
@property (nonatomic, strong) NSString *changeEventString;
@property (nonatomic, assign) CGSize keyboardSize;

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

WX_EXPORT_METHOD(@selector(focus))
WX_EXPORT_METHOD(@selector(blur))

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        _inputEvent = NO;
        _focusEvent = NO;
        _blurEvent = NO;
        _changeEvent = NO;
        // handle attributes
        _autofocus = [attributes[@"autofocus"] boolValue];
        _disabled = [attributes[@"disabled"] boolValue];
        _value = [WXConvert NSString:attributes[@"value"]]?:@"";
        _placeholderString = [WXConvert NSString:attributes[@"placeholder"]]?:@"";
        if(attributes[@"type"]) {
            _inputType = [WXConvert NSString:attributes[@"type"]];
            _attr = attributes;
        }
        if (attributes[@"maxlength"]) {
            _maxLength = [NSNumber numberWithUnsignedInteger:[attributes[@"maxlength"] integerValue]];
        }
        
        // handle styles
        if (styles[@"color"]) {
            _colorForStyle = [WXConvert UIColor:styles[@"color"]];
        }
        if (styles[@"fontSize"]) {
            _fontSize = [WXConvert WXPixelType:styles[@"fontSize"] scaleFactor:self.weexInstance.pixelScaleFactor];
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
            _textAlignForStyle = [WXConvert NSTextAlignment:styles[@"textAlign"]];
        }
        
        if (styles[@"placeholderColor"]) {
            _placeholderColor = [WXConvert UIColor:styles[@"placeholderColor"]];
        }else {
            _placeholderColor = [UIColor colorWithRed:0x99/255.0 green:0x99/255.0 blue:0x99/255.0 alpha:1.0];
        }
    }
    
    return self;
}

- (UIView *)loadView
{
    _inputView = [[WXTextInputView alloc] init];
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
    _inputView.userInteractionEnabled = YES;
    [self setType];
    _inputView.text = _value;
    [self setAutofocus:_autofocus];
    [self setTextFont];
    [self setPlaceholderAttributedString];
    [_inputView setTextAlignment:_textAlignForStyle];
    [_inputView setTextColor:_colorForStyle];
    [_inputView setText:_value];
    [_inputView setEnabled:!_disabled];
    [self updatePattern];
    
    UIBarButtonItem *barButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(closeKeyboard)];
    UIBarButtonItem *space = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil];
    UIToolbar *toolbar = [[UIToolbar alloc] initWithFrame:CGRectMake(0, 0, 0, 44)];
    toolbar.items = [NSArray arrayWithObjects:space, barButton, nil];
    
    _inputView.inputAccessoryView = toolbar;
    [self handlePseudoClass];
}

- (void)viewWillLoad
{
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(keyboardWasShown:)
                                                 name:UIKeyboardWillShowNotification
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(keyboardWillHide:)
                                                 name:UIKeyboardWillHideNotification
                                               object:nil];
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

-(void)focus
{
    if(self.inputView) {
        [self.inputView becomeFirstResponder];
    }
}

-(void)blur
{
    if(self.inputView) {
        [self.inputView resignFirstResponder];
    }
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
}

#pragma mark - upate attributes

- (void)updateAttributes:(NSDictionary *)attributes
{
    _attr = attributes;
    if (attributes[@"type"]) {
        _inputType = [WXConvert NSString:attributes[@"type"]];
    }
    [self setType];
    _autofocus = [attributes[@"autofocus"] boolValue];
    [self setAutofocus:_autofocus];
    _disabled = [attributes[@"disabled"] boolValue];
    [_inputView setEnabled:!_disabled];
    if (attributes[@"maxlength"]) {
        _maxLength = [NSNumber numberWithInteger:[attributes[@"maxlength"] integerValue]];
    }
    if (attributes[@"placeholder"]) {
        _placeholderString = [WXConvert NSString:attributes[@"placeholder"]]?:@"";
        [self setPlaceholderAttributedString];
    }
    if (attributes[@"value"]) {
        _value = [WXConvert NSString:attributes[@"value"]]?:@"";
        [_inputView setText:_value];
    }
}

#pragma mark - upate styles

- (void)updateStyles:(NSDictionary *)styles
{
    if (styles[@"color"]) {
        _colorForStyle = [WXConvert UIColor:styles[@"color"]];
       [_inputView setTextColor:_colorForStyle];
    }
    if (styles[@"fontSize"]) {
        _fontSize = [WXConvert WXPixelType:styles[@"fontSize"] scaleFactor:self.weexInstance.pixelScaleFactor];
    }
    if (styles[@"fontWeight"]) {
        _fontWeight = [WXConvert WXTextWeight:styles[@"fontWeight"]];
    }
    if (styles[@"fontStyle"]) {
        _fontStyle = [WXConvert WXTextStyle:styles[@"fontStyle"]];
    }
    if (styles[@"fontFamily"]) {
        _fontFamily = [WXConvert NSString:styles[@"fontFamily"]];
    }
    [self setTextFont];
    
    if (styles[@"textAlign"]) {
        _textAlignForStyle = [WXConvert NSTextAlignment:styles[@"textAlign"]];
        [_inputView setTextAlignment:_textAlignForStyle] ;
    }
    if (styles[@"placeholderColor"]) {
        _placeholderColor = [WXConvert UIColor:styles[@"placeholderColor"]];
    }else {
        _placeholderColor = [UIColor colorWithRed:0x99/255.0 green:0x99/255.0 blue:0x99/255.0 alpha:1.0];
    }
    [self setPlaceholderAttributedString];
    [self updatePattern];
    
}

-(void)updatePattern
{
    UIEdgeInsets padding = UIEdgeInsetsMake(self.cssNode->style.padding[CSS_TOP], self.cssNode->style.padding[CSS_LEFT], self.cssNode->style.padding[CSS_BOTTOM], self.cssNode->style.padding[CSS_RIGHT]);
    if (!UIEdgeInsetsEqualToEdgeInsets(padding, _padding)) {
        [self setPadding:padding];
    }
    
    UIEdgeInsets border = UIEdgeInsetsMake(self.cssNode->style.border[CSS_TOP], self.cssNode->style.border[CSS_LEFT], self.cssNode->style.border[CSS_BOTTOM], self.cssNode->style.border[CSS_RIGHT]);
    if (!UIEdgeInsetsEqualToEdgeInsets(border, _border)) {
        [self setBorder:border];
    }
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

#pragma mark WXDatePickerManagerDelegate

-(void)fetchDatePickerValue:(NSString *)value
{
    _inputView.text = value;
    if (_changeEvent) {
        if (![[_inputView text] isEqualToString:_changeEventString]) {
            [self fireEvent:@"change" params:@{@"value":[_inputView text]} domChanges:@{@"attrs":@{@"value":[_inputView text]}}];
        }
    }
}

#pragma mark UITextFieldDelegate

- (BOOL)textFieldShouldBeginEditing:(UITextField *)textField{
    if([self isDateType])
    {
        [[[UIApplication sharedApplication] keyWindow] endEditing:YES];
        _changeEventString = [textField text];
        [_datePickerManager show];
        return NO;
    }
    return  YES;
}

#pragma mark UITextFieldDelegate

- (void)textFieldDidBeginEditing:(UITextField *)textField
{
    _changeEventString = [textField text];
    if (_focusEvent) {
        [self fireEvent:@"focus" params:nil];
    }
    [self handlePseudoClass];
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string
{
    if (_maxLength) {
        NSUInteger oldLength = [textField.text length];
        NSUInteger replacementLength = [string length];
        NSUInteger rangeLength = range.length;
        
        NSUInteger newLength = oldLength - rangeLength + replacementLength;
        
        return newLength <= [_maxLength integerValue] ;
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
    if(self.pseudoClassStyles && [self.pseudoClassStyles count]>0){
        [self recoveryPseudoStyles:self.styles];
    }
}

- (void)textFiledEditChanged:(NSNotification *)notifi
{
    if (_inputEvent) {
        UITextField *textField = (UITextField *)notifi.object;
        // bind each other , the key must be attrs
        [self fireEvent:@"input" params:@{@"value":[textField text]} domChanges:@{@"attrs":@{@"value":[textField text]}}];
    }
}

- (void)setViewMovedUp:(BOOL)movedUp
{
    UIView *rootView = self.weexInstance.rootView;
    CGRect rect = self.weexInstance.frame;
    CGRect rootViewFrame = rootView.frame;
    CGRect inputFrame = [_inputView.superview convertRect:_inputView.frame toView:rootView];
    if (movedUp) {
        CGFloat offset = inputFrame.origin.y-(rootViewFrame.size.height-_keyboardSize.height-inputFrame.size.height);
        if (offset > 0) {
            rect = (CGRect){
                .origin.x = 0.f,
                .origin.y = -offset,
                .size = rootViewFrame.size
            };
        }
    }
    self.weexInstance.rootView.frame = rect;
}


#pragma mark private method

- (BOOL)isDateType
{
    if([_inputType isEqualToString:@"date"] || [_inputType isEqualToString:@"time"])
        return YES;
    return NO;
}

- (void)setPlaceholderAttributedString
{
    NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:_placeholderString];
    [attributedString addAttribute:NSForegroundColorAttributeName value:_placeholderColor range:NSMakeRange(0, _placeholderString.length)];
    [_inputView setAttributedPlaceholder:attributedString];
}

- (void)setTextFont
{
    UIFont *font = [WXUtility fontWithSize:_fontSize textWeight:_fontWeight textStyle:_fontStyle fontFamily:_fontFamily scaleFactor:self.weexInstance.pixelScaleFactor];
    [_inputView setFont:font];
}

- (void)setAutofocus:(BOOL)b
{
    if (b) {
        if([self isDateType])
        {
            [_datePickerManager show];
        }else
        {
            [_inputView becomeFirstResponder];
        }
    } else {
        if([self isDateType])
        {
            [_datePickerManager hide];
        }else
        {
            [_inputView resignFirstResponder];
        }
    }
}

- (void)setType
{
    [_inputView setKeyboardType:UIKeyboardTypeDefault];
    [_inputView setSecureTextEntry:NO];
    
    if ([_inputType isEqualToString:@"text"]) {
        [_inputView setKeyboardType:UIKeyboardTypeDefault];
    }else if ([_inputType isEqualToString:@"password"]) {
        [_inputView setSecureTextEntry:YES];
    }else if ([_inputType isEqualToString:@"tel"]) {
        [_inputView setKeyboardType:UIKeyboardTypePhonePad];
    }else if ([_inputType isEqualToString:@"email"]) {
        [_inputView setKeyboardType:UIKeyboardTypeEmailAddress];
    }else if ([_inputType isEqualToString:@"url"]) {
        [_inputView setKeyboardType:UIKeyboardTypeURL];
    }else if ([self isDateType]) {
        if (!_datePickerManager) {
            _datePickerManager = [[WXDatePickerManager alloc] init];
            _datePickerManager.delegate = self;
        }
        [_datePickerManager updateDatePicker:_attr];
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

#pragma mark update touch styles
-(void)handlePseudoClass
{
    NSMutableDictionary *styles = [NSMutableDictionary new];
    NSMutableDictionary *recordStyles = [NSMutableDictionary new];
    if(_disabled){
        recordStyles = [self getPseudoClassStylesByKeys:@[@"disabled"]];
        [styles addEntriesFromDictionary:recordStyles];
    }else {
        recordStyles = [NSMutableDictionary new];
        recordStyles = [self getPseudoClassStylesByKeys:@[@"enabled"]];
        [styles addEntriesFromDictionary:recordStyles];
    }
    if ([_inputView isFirstResponder]){
        recordStyles = [NSMutableDictionary new];
        recordStyles = [self getPseudoClassStylesByKeys:@[@"focus"]];
        [styles addEntriesFromDictionary:recordStyles];
    }
    NSString *disabledStr = @"enabled";
    if (_disabled){
        disabledStr = @"disabled";
    }
    if ([_inputView isFirstResponder]) {
        NSString *focusStr = @"focus";
        recordStyles = [NSMutableDictionary new];
        recordStyles = [self getPseudoClassStylesByKeys:@[focusStr,disabledStr]];
        [styles addEntriesFromDictionary:recordStyles];
    }
    [self updatePseudoClassStyles:styles];
}

#pragma mark keyboard
- (void)keyboardWasShown:(NSNotification*)notification
{
    if(![_inputView isFirstResponder]) {
        return;
    }
    CGRect begin = [[[notification userInfo] objectForKey:@"UIKeyboardFrameBeginUserInfoKey"] CGRectValue];
    
    CGRect end = [[[notification userInfo] objectForKey:@"UIKeyboardFrameEndUserInfoKey"] CGRectValue];
    if(begin.size.height <= 44 ){
        return;
    }
    _keyboardSize = end.size;
    UIView * rootView = self.weexInstance.rootView;
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGRect keyboardRect = (CGRect){
        .origin.x = 0,
        .origin.y = CGRectGetMaxY(screenRect) - _keyboardSize.height - 54,
        .size = _keyboardSize
    };
    CGRect inputFrame = [_inputView.superview convertRect:_inputView.frame toView:rootView];
    if (keyboardRect.origin.y - inputFrame.size.height <= inputFrame.origin.y) {
        [self setViewMovedUp:YES];
        self.weexInstance.isRootViewFrozen = YES;
    }
}

- (void)keyboardWillHide:(NSNotification*)notification
{
    if (![_inputView isFirstResponder]) {
        return;
    }
    UIView * rootView = self.weexInstance.rootView;
    if (!CGRectEqualToRect(self.weexInstance.frame, rootView.frame)) {
        [self setViewMovedUp:NO];
        self.weexInstance.isRootViewFrozen = NO;
    }
}

- (void)closeKeyboard
{
    [_inputView resignFirstResponder];
}

#pragma mark -reset color
- (void)resetStyles:(NSArray *)styles
{
    if ([styles containsObject:@"color"]) {
        [_inputView setTextColor:[UIColor blackColor]];
    }
    if ([styles containsObject:@"fontSize"]) {
        _fontSize = WX_TEXT_FONT_SIZE;
        [self setTextFont];
    }
}
@end

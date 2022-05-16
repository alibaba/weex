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

#import "WXEditComponent.h"
#import "WXConvert.h"
#import "WXUtility.h"
#import "WXSDKInstance.h"
#import "WXSDKInstance_private.h"
#import "WXDefine.h"
#import "WXAssert.h"
#import "WXComponent_internal.h"
#import "WXComponent+PseudoClassManagement.h"
#import "WXTextInputComponent.h"
#import "WXComponent+Layout.h"
#import "WXComponent_internal.h"

@interface WXEditComponent()
{
    CGFloat _upriseOffset; // additional space when edit is lifted by keyboard
}

//@property (nonatomic, strong) WXTextInputView *inputView;
@property (nonatomic, strong) WXDatePickerManager *datePickerManager;
@property (nonatomic, strong) NSDictionary *attr;
//attribute
@property (nonatomic) NSNumber *maxLength;
@property (nonatomic) NSString * value;
@property (nonatomic) BOOL autofocus;
@property (nonatomic) UIReturnKeyType returnKeyType;
@property (nonatomic) BOOL disabled;
@property (nonatomic, copy) NSString *inputType;
@property (nonatomic) NSUInteger rows;
@property (nonatomic) BOOL hideDoneButton;

//style
@property (nonatomic) WXPixelType fontSize;
@property (nonatomic) WXTextStyle fontStyle;
@property (nonatomic) CGFloat fontWeight;
@property (nonatomic, strong) NSString *fontFamily;
@property (atomic, strong) UIColor *colorForStyle;
@property (atomic, strong) UIColor *darkSchemeColorForStyle;
@property (atomic, strong) UIColor *lightSchemeColorForStyle;
@property (nonatomic)NSTextAlignment textAlignForStyle;

//event
@property (nonatomic) BOOL inputEvent;
@property (nonatomic) BOOL clickEvent;
@property (nonatomic) BOOL focusEvent;
@property (nonatomic) BOOL blurEvent;
@property (nonatomic) BOOL changeEvent;
@property (nonatomic) BOOL returnEvent;
@property (nonatomic) BOOL keyboardEvent;
@property (nonatomic, strong) NSString *changeEventString;
@property (nonatomic, assign) CGSize keyboardSize;

// formatter
@property (nonatomic, strong) NSString * formatRule;
@property (nonatomic, strong) NSString * formatReplace;
@property (nonatomic, strong) NSString * recoverRule;
@property (nonatomic, strong) NSString * recoverReplace;
@property (nonatomic, strong) NSDictionary * formaterData;

// disable move rootView up as the keyboard show up.
@property (nonatomic, assign) BOOL disableMoveViewUp;

// avoid keyboardWillHide executes twice
@property (nonatomic, assign) BOOL keyboardHidden;

@end

@implementation WXEditComponent
{
    UIEdgeInsets _border;
    UIEdgeInsets _padding;
}

WX_EXPORT_METHOD(@selector(focus))
WX_EXPORT_METHOD(@selector(blur))
WX_EXPORT_METHOD(@selector(setSelectionRange:selectionEnd:))
WX_EXPORT_METHOD(@selector(getSelectionRange:))
WX_EXPORT_METHOD(@selector(setTextFormatter:))

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        _inputEvent = NO;
        _focusEvent = NO;
        _blurEvent = NO;
        _changeEvent = NO;
        _returnEvent = NO;
        _clickEvent = NO;
        _keyboardEvent = NO;
        _keyboardHidden = YES;
        _textAlignForStyle = NSTextAlignmentNatural;
        // handle attributes
        _autofocus = [attributes[@"autofocus"] boolValue];
        _disabled = [attributes[@"disabled"] boolValue];
        _value = [WXConvert NSString:attributes[@"value"]]?:@"";
        _placeholderString = [WXConvert NSString:attributes[@"placeholder"]]?:@"";
        _upriseOffset = 20; // 20 for better appearance
        
        if (attributes[@"upriseOffset"]) {
            _upriseOffset = [WXConvert CGFloat:attributes[@"upriseOffset"]];
        }
        
        if(attributes[@"type"]) {
            _inputType = [WXConvert NSString:attributes[@"type"]];
            _attr = attributes;
        }
        if (attributes[@"maxlength"]) {
            _maxLength = [NSNumber numberWithUnsignedInteger:[attributes[@"maxlength"] integerValue]];
        }
        if (attributes[@"returnKeyType"]) {
            _returnKeyType = [WXConvert UIReturnKeyType:attributes[@"returnKeyType"]];
        }
        if (attributes[@"rows"]) {
            _rows = [attributes[@"rows"] integerValue];
        } else {
            _rows = 2;
        }
        
        if (attributes[@"hideDoneButton"]) {
            _hideDoneButton = [attributes[@"hideDoneButton"] boolValue];
        }
        if (attributes[@"disableMoveViewUp"]) {
            _disableMoveViewUp = [WXConvert BOOL:attributes[@"disableMoveViewUp"]];
        }
        
        // handle styles
        if (styles[@"color"]) {
            self.colorForStyle = [WXConvert UIColor:styles[@"color"]];
        }
        else {
            self.colorForStyle = [UIColor blackColor];
        }
        if (styles[@"weexDarkSchemeColor"]) {
            self.darkSchemeColorForStyle = [WXConvert UIColor:styles[@"weexDarkSchemeColor"]];
        }
        if (styles[@"weexLightSchemeColor"]) {
            self.lightSchemeColorForStyle = [WXConvert UIColor:styles[@"weexLightSchemeColor"]];
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
            self.placeholderColor = [WXConvert UIColor:styles[@"placeholderColor"]];
        }else {
            self.placeholderColor = [UIColor colorWithRed:0x99/255.0 green:0x99/255.0 blue:0x99/255.0 alpha:1.0];
        }
        if (styles[@"weexDarkSchemePlaceholderColor"]) {
            self.darkSchemePlaceholderColor = [WXConvert UIColor:styles[@"weexDarkSchemePlaceholderColor"]];
        }
        if (styles[@"weexLightSchemePlaceholderColor"]) {
            self.lightSchemePlaceholderColor = [WXConvert UIColor:styles[@"weexLightSchemePlaceholderColor"]];
        }
    }
    
    return self;
}

#pragma mark - lifeCircle

- (void)viewDidLoad
{
    UIView * view = self.view;
    if ([view isKindOfClass:[UITextField class]]){
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textFiledEditChanged:)
                                                     name:UITextFieldTextDidChangeNotification
                                                   object:view];
    }
    _padding = UIEdgeInsetsZero;
    _border = UIEdgeInsetsZero;
    self.userInteractionEnabled = YES;
    [self setType];
    [self setAutofocus:_autofocus];
    [self setTextFont];
    [self setPlaceholderAttributedString];
    [self setTextAlignment];
    [self setTextColor:[self.weexInstance chooseColor:self.colorForStyle lightSchemeColor:self.lightSchemeColorForStyle darkSchemeColor:self.darkSchemeColorForStyle invert:self.invertForDarkScheme scene:WXColorSceneText]];
    [self setText:_value];
    [self setEnabled:!_disabled];
    [self setRows:_rows];
    [self setReturnKeyType:_returnKeyType];
    [self updatePattern];
    
    if (!self.hideDoneButton) {
        UIBarButtonItem *barButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(closeKeyboard)];
        UIBarButtonItem *space = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil];
        UIToolbar *toolbar = [[UIToolbar alloc] initWithFrame:CGRectMake(0, 0, 0, 44)];
        toolbar.items = [NSArray arrayWithObjects:space, barButton, nil];
        
        self.inputAccessoryView = toolbar;
    }

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

- (void)layoutDirectionDidChanged:(BOOL)isRTL {
    [self setTextAlignment];
}

-(void)focus
{
    if(self.view) {
        [self.view becomeFirstResponder];
        self.weexInstance.apmInstance.forceStopRecordInteractionTime = YES;
    }
}

-(void)blur
{
    if(self.view) {
        [[NSNotificationCenter defaultCenter] postNotificationName:UIKeyboardWillHideNotification object:nil];
        [self.view resignFirstResponder];
    }
}

-(void)setSelectionRange:(NSInteger)selectionStart selectionEnd:(NSInteger)selectionEnd
{
    if(selectionStart>self.text.length || selectionEnd>self.text.length) {
        return;
    }
    [self.view becomeFirstResponder];
    [self setEditSelectionRange:selectionStart selectionEnd:selectionEnd];
}

-(void)getSelectionRange:(WXKeepAliveCallback)callback
{
    NSDictionary *res = [self getEditSelectionRange];
    if(callback) {
        callback(res,NO);
    }
}

- (void)setTextFormatter:(NSDictionary*)formater
{
    _formaterData = formater;
    if (formater[@"formatRule"]) {;
        _formatRule = [self _preProcessInputTextFormatter:[WXConvert NSString:formater[@"formatRule"]]];
    }
    if (formater[@"formatReplace"]) {
        _formatReplace = [self _preProcessInputTextFormatter:[WXConvert NSString:formater[@"formatReplace"]]];
    }
    if (formater[@"recoverRule"]) {
        _recoverRule = [self _preProcessInputTextFormatter:[WXConvert NSString:formater[@"recoverRule"]]];
    }
    if (formater[@"recoverReplace"]) {
        _recoverReplace = [self _preProcessInputTextFormatter:[WXConvert NSString:formater[@"recoverReplace"]]];
    }
}

- (NSString*)_preProcessInputTextFormatter:(NSString*)formater
{
    NSRange start = [formater rangeOfString:@"/"];
    NSRange end = [formater rangeOfString:@"/g"];
    if (start.location == NSNotFound || end.location == NSNotFound || end.location < start.location) {
        return formater;
    }
    NSRange subStringRange = NSMakeRange(start.location+1, end.location - start.location-1);
    
    return [formater substringWithRange:subStringRange];
}

#pragma mark - Overwrite Method
-(NSString *)text
{
    return @"";
}

- (void)setText:(NSString *)text
{
}

- (void)_setTextColor
{
    [self setTextColor:[self.weexInstance chooseColor:self.colorForStyle lightSchemeColor:self.lightSchemeColorForStyle darkSchemeColor:self.darkSchemeColorForStyle invert:self.invertForDarkScheme scene:WXColorSceneText]];
}

-(void)setTextColor:(UIColor *)color
{
}

- (void)setTextAlignment {
    if ([self isDirectionRTL] && _textAlignForStyle == NSTextAlignmentNatural) {
        [self setTextAlignment:NSTextAlignmentRight];
    } else {
        [self setTextAlignment:_textAlignForStyle];
    }
}

-(void)setTextAlignment:(NSTextAlignment)textAlignForStyle
{
}

-(void)setUserInteractionEnabled:(BOOL)userInteractionEnabled
{
}

-(void)setEnabled:(BOOL)enabled
{
}

-(void)setReturnKeyType:(UIReturnKeyType)returnKeyType
{
}

-(void)setInputAccessoryView:(UIView *)inputAccessoryView
{
}

-(void)setEditSelectionRange:(NSInteger)selectionStart selectionEnd:(NSInteger)selectionEnd
{
}

-(NSDictionary *)getEditSelectionRange
{
    return @{};
}

-(void)setKeyboardType:(UIKeyboardType)keyboardType
{
}

-(void)setSecureTextEntry:(BOOL)secureTextEntry
{
}

-(void)setEditPadding:(UIEdgeInsets)padding
{
}

-(void)setEditBorder:(UIEdgeInsets)border
{
}

-(void)setAttributedPlaceholder:(NSMutableAttributedString *)attributedString font:(UIFont *)font
{
}

-(void)setFont:(UIFont *)font
{
}

-(void)setRows:(NSUInteger)rows
{
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
    if ([eventName isEqualToString:@"return"]) {
        _returnEvent = YES;
    }
    if ([eventName isEqualToString:@"click"]) {
        _clickEvent = YES;
    }
    if ([eventName isEqualToString:@"keyboard"]) {
        _keyboardEvent = YES;
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
    if ([eventName isEqualToString:@"return"]) {
        _returnEvent = NO;
    }
    if ([eventName isEqualToString:@"click"]) {
        _clickEvent = NO;
    }
    if ([eventName isEqualToString:@"keyboard"]) {
        _keyboardEvent = NO;
    }
}

#pragma mark - upate attributes

- (void)updateAttributes:(NSDictionary *)attributes
{
    _attr = attributes;
    if (attributes[@"type"]) {
        _inputType = [WXConvert NSString:attributes[@"type"]];
        [self setType];
    }
    if (attributes[@"autofocus"]) {
        self.autofocus = [attributes[@"autofocus"] boolValue];
    }
    if (attributes[@"disabled"]) {
        _disabled = [attributes[@"disabled"] boolValue];
        [self setEnabled:!_disabled];
    }
    if (attributes[@"maxlength"]) {
        _maxLength = [NSNumber numberWithInteger:[attributes[@"maxlength"] integerValue]];
    }
    
    if (attributes[@"disableMoveViewUp"]) {
        _disableMoveViewUp = [WXConvert BOOL:attributes[@"disableMoveViewUp"]];
    }
    if (attributes[@"value"]) {
        _value = [WXConvert NSString:attributes[@"value"]]?:@"";
        if (_maxLength && [_value length] > [_maxLength integerValue]&& [_maxLength integerValue] >= 0) {
            _value = [_value substringToIndex:([_maxLength integerValue])];
        }
        [self setText:_value];
    }
    if (attributes[@"placeholder"]) {
        _placeholderString = [WXConvert NSString:attributes[@"placeholder"]]?:@"";
        [self setPlaceholderAttributedString];
        if(_value.length > 0){
            _placeHolderLabel.text = @"";
        }
    }
    if (attributes[@"returnKeyType"]) {
        _returnKeyType = [WXConvert UIReturnKeyType:attributes[@"returnKeyType"]];
        [self setReturnKeyType:_returnKeyType];
    }
    if (attributes[@"rows"]) {
        _rows = [attributes[@"rows"] integerValue];
        [self setRows:_rows];
    } else {
        _rows = 2;
        [self setRows:_rows];
    }
    if (attributes[@"upriseOffset"]) {
        _upriseOffset = [WXConvert CGFloat:attributes[@"upriseOffset"]];
    }
}

#pragma mark - upate styles

- (void)updateStyles:(NSDictionary *)styles
{
    BOOL colorChanged = NO;
    if (styles[@"color"]) {
        self.colorForStyle = [WXConvert UIColor:styles[@"color"]];
        colorChanged = YES;
    }
    if (styles[@"weexDarkSchemeColor"]) {
        self.darkSchemeColorForStyle = [WXConvert UIColor:styles[@"weexDarkSchemeColor"]];
        colorChanged = YES;
    }
    if (styles[@"weexLightSchemeColor"]) {
        self.lightSchemeColorForStyle = [WXConvert UIColor:styles[@"weexLightSchemeColor"]];
        colorChanged = YES;
    }
    if (colorChanged) {
        [self _setTextColor];
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
        [self setTextAlignment:_textAlignForStyle] ;
    }
    
    BOOL placeholderColorChanged = NO;
    if (styles[@"placeholderColor"]) {
        self.placeholderColor = [WXConvert UIColor:styles[@"placeholderColor"]];
        placeholderColorChanged = YES;
    }else {
        self.placeholderColor = [UIColor colorWithRed:0x99/255.0 green:0x99/255.0 blue:0x99/255.0 alpha:1.0];
    }
    if (styles[@"weexDarkSchemePlaceholderColor"]) {
        self.darkSchemePlaceholderColor = [WXConvert UIColor:styles[@"weexDarkSchemePlaceholderColor"]];
        placeholderColorChanged = YES;
    }
    if (styles[@"weexLightSchemePlaceholderColor"]) {
        self.lightSchemePlaceholderColor = [WXConvert UIColor:styles[@"weexLightSchemePlaceholderColor"]];
        placeholderColorChanged = YES;
    }
    if (placeholderColorChanged && [self.placeHolderLabel.text length] > 0) {
        [self setPlaceholderAttributedString];
    }
    
    [self updatePattern];
}

-(void)updatePattern
{
    if (self.flexCssNode == nullptr) {
        return;
    }
    
        UIEdgeInsets padding_flex = UIEdgeInsetsMake(
                                                     self.flexCssNode->getPaddingTop(),
                                                     self.flexCssNode->getPaddingLeft(),
                                                     self.flexCssNode->getPaddingBottom(),
                                                     self.flexCssNode->getPaddingRight()
                                                     );
        
        if (!UIEdgeInsetsEqualToEdgeInsets(padding_flex, _padding)) {
            [self setPadding:padding_flex];
        }
        
        
        UIEdgeInsets border_flex = UIEdgeInsetsMake(self.flexCssNode->getBorderWidthTop(), self.flexCssNode->getBorderWidthLeft(), self.flexCssNode->getBorderWidthBottom(), self.flexCssNode->getBorderWidthRight());

        if (!UIEdgeInsetsEqualToEdgeInsets(border_flex, _border)) {
            [self setBorder:border_flex];
        }
}

- (CGSize (^)(CGSize))measureBlock
{
    __weak typeof(self) weakSelf = self;
    return ^CGSize (CGSize constrainedSize) {
        __strong typeof(self) strongSelf = weakSelf;
        if (strongSelf == nil) {
            return CGSizeZero;
        }
        
        if (strongSelf.flexCssNode == nullptr) {
            return CGSizeZero;
        }
        
        CGSize computedSize = [[[NSString alloc] init]sizeWithAttributes:nil];
            if (!isnan(strongSelf.flexCssNode->getMinWidth())) {
                computedSize.width = MAX(computedSize.width, strongSelf.flexCssNode->getMinWidth());
            }
            
            if (!isnan(strongSelf.flexCssNode->getMaxWidth())) {
                computedSize.width = MIN(computedSize.width, strongSelf.flexCssNode->getMaxWidth());
            }
            
            if (!isnan(strongSelf.flexCssNode->getMinHeight())) {
                computedSize.height = MAX(computedSize.height, strongSelf.flexCssNode->getMinHeight());
            }
            
            if (!isnan(strongSelf.flexCssNode->getMaxHeight())) {
                computedSize.height = MIN(computedSize.height, strongSelf.flexCssNode->getMaxHeight());
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
    self.text = value;
    if (_changeEvent) {
        if (![[self text] isEqualToString:_changeEventString]) {
            [self fireEvent:@"change" params:@{@"value":[self text]} domChanges:@{@"attrs":@{@"value":[self text]}}];
        }
    }
}

- (void)datePickerValueDidChange:(NSString *)value
{
    self.text = value;
    if (_inputEvent) {
        [self fireEvent:@"input" params:@{@"value":[self text]} domChanges:@{@"attrs":@{@"value":[self text]}}];
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
    if (!string.length) {
        ((WXTextInputView*)textField).deleteWords = YES;
        ((WXTextInputView*)textField).editWords = [textField.text substringWithRange:range];
    } else {
        ((WXTextInputView*)textField).deleteWords = FALSE;
        ((WXTextInputView*)textField).editWords = string;
    }
  
    if ([_inputType isEqualToString:@"tel"] || [_inputType isEqualToString:@"number"] ) {
        if (![self isPureInt:string]) {
            if ([string isEqualToString:@"+"]||[string isEqualToString:@"."]||[string isEqualToString:@"*"]||[string isEqualToString:@"#"]||(string.length == 0 && range.length == 1))
            {
                return YES;
            }
            return NO;
        }
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

- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    if (_returnEvent) {
        NSString *typeStr = [WXUtility returnKeyType:_returnKeyType];
        [self fireEvent:@"return" params:@{@"value":[textField text],@"returnKeyType":typeStr} domChanges:@{@"attrs":@{@"value":[textField text]}}];
    }
    [self blur];
    return YES;
}

- (void)textFiledEditChanged:(NSNotification *)notifi
{
    WXTextInputView *textField = (WXTextInputView *)notifi.object;
    if (_formaterData && _recoverRule && _recoverReplace && _formatRule && _formatReplace) {
        UITextRange * textRange = textField.selectedTextRange;
        NSInteger cursorPosition = [textField offsetFromPosition:textField.beginningOfDocument toPosition:textRange.start];
        NSMutableString * preText = [[textField.text substringToIndex:cursorPosition] mutableCopy];
        NSMutableString * lastText = [[textField.text substringFromIndex:cursorPosition] mutableCopy];
        
        NSRegularExpression *recoverRule = [NSRegularExpression regularExpressionWithPattern:_recoverRule options:NSRegularExpressionCaseInsensitive error:NULL];
        [recoverRule replaceMatchesInString:preText options:0 range:NSMakeRange(0, preText.length) withTemplate:_recoverReplace];
        [recoverRule replaceMatchesInString:lastText options:0 range:NSMakeRange(0, lastText.length) withTemplate:_recoverReplace];
        NSMutableString * newString = [NSMutableString stringWithFormat:@"%@%@", preText, lastText];
        NSRegularExpression *formatRule = [NSRegularExpression regularExpressionWithPattern:_formatRule options:NSRegularExpressionCaseInsensitive error:NULL];
        [formatRule replaceMatchesInString:newString options:0 range:NSMakeRange(0, newString.length) withTemplate:_formatReplace];
        NSString * oldText = textField.text;
        NSInteger adjust = 0;
        
        if (cursorPosition == textField.text.length) {
            adjust = newString.length-oldText.length;
        }
        if (!textField.deleteWords || ![textField.editWords isKindOfClass:[NSString class]] || ![_recoverRule isEqualToString:textField.editWords]) {
            textField.text = [newString copy];
            UITextPosition * newPosition = [textField positionFromPosition:textField.beginningOfDocument offset:cursorPosition+adjust];
            textField.selectedTextRange = [textField textRangeFromPosition:newPosition toPosition:newPosition];
        }

    }
    
    if (_maxLength) {
        NSString *toBeString = textField.text;
        NSString *language = [[UIApplication sharedApplication] textInputMode].primaryLanguage;
        if ([language isEqualToString:@"zh-Hans"]) {
            UITextRange *selectedRange = [textField markedTextRange];
            UITextPosition *position = [textField positionFromPosition:selectedRange.start offset:0];
            if (!position) {
                if (toBeString.length > _maxLength.integerValue) {
                    textField.text = [toBeString substringToIndex:_maxLength.integerValue];
                }
            }
        } else {
            if (toBeString.length > _maxLength.integerValue) {
                textField.text = [toBeString substringToIndex:_maxLength.integerValue];
            }
        }
    }

    if (_inputEvent) {
        // bind each other , the key must be attrs
        [self fireEvent:@"input" params:@{@"value":[textField text]} domChanges:@{@"attrs":@{@"value":[textField text]}}];
    }
}

- (void)setViewMovedUp:(BOOL)movedUp
{
    UIView *rootView = self.weexInstance.rootView;
    CGRect rect = self.weexInstance.frame;
    CGRect rootViewFrame = rootView.frame;
    CGRect inputFrame = [self.view.superview convertRect:self.view.frame toView:rootView];
    if (movedUp) {
        CGFloat inputOffset = inputFrame.size.height - (rootViewFrame.size.height - inputFrame.origin.y);
        CGFloat offset = inputFrame.origin.y-(rootViewFrame.size.height-_keyboardSize.height- (inputOffset > 0 ? inputFrame.size.height - inputOffset : inputFrame.size.height)) + _upriseOffset;
        if (offset > 0) {
            rect = (CGRect){
                .origin.x = 0.f,
                .origin.y = rect.origin.y - offset,
                .size = rootViewFrame.size
            };
        }
    }
    self.weexInstance.rootView.frame = rect;
}

#pragma mark textview Delegate
- (BOOL)textViewShouldBeginEditing:(UITextView *)textView
{
    if([self isDateType])
    {
        [[[UIApplication sharedApplication] keyWindow] endEditing:YES];
        _changeEventString = [textView text];
        [_datePickerManager show];
        return NO;
    }
    return  YES;
}

- (void)textViewDidBeginEditing:(UITextView *)textView
{
    _changeEventString = [textView text];
    if (_focusEvent) {
        [self fireEvent:@"focus" params:nil];
    }
    if (_clickEvent) {
        [self fireEvent:@"click" params:nil];
    }
    [textView becomeFirstResponder];
    [self handlePseudoClass];
}

- (void)textViewDidChange:(UITextView *)textView
{
    if(textView.text && [textView.text length] > 0) {
        self.placeHolderLabel.text = @"";
    }else{
        [self setPlaceholderAttributedString];
    }
    if (_inputEvent) {
        [self fireEvent:@"input" params:@{@"value":[textView text]} domChanges:@{@"attrs":@{@"value":[textView text]}}];
    }
}

- (void)textViewDidEndEditing:(UITextView *)textView
{
    if (![textView.text length]) {
        [self setPlaceholderAttributedString];
    }
    if (_changeEvent) {
        if (![[textView text] isEqualToString:_changeEventString]) {
            [self fireEvent:@"change" params:@{@"value":[textView text]} domChanges:@{@"attrs":@{@"value":[textView text]}}];
        }
    }
    if (_blurEvent) {
        [self fireEvent:@"blur" params:nil];
    }
    if(self.pseudoClassStyles && [self.pseudoClassStyles count]>0){
        [self recoveryPseudoStyles:self.styles];
    }
}

- (BOOL)textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text
{
    if ([text isEqualToString:@"\n"]) {
        NSString *typeStr = [WXUtility returnKeyType:_returnKeyType];
        if (_returnEvent) {
            [self fireEvent:@"return" params:@{@"value":[textView text],@"returnKeyType":typeStr} domChanges:@{@"attrs":@{@"value":[textView text]}}];
        }
        if(typeStr.length > 0 && ![@"default" isEqualToString:typeStr]){
            [self blur];
            return NO;
        }
    }
    
    if (_maxLength) {
        NSUInteger oldLength = [textView.text length];
        NSUInteger replacementLength = [text length];
        NSUInteger rangeLength = range.length;
        NSUInteger newLength = oldLength - rangeLength + replacementLength;
        return newLength <= [_maxLength integerValue] ;
    }
    
    return YES;
}

#pragma mark private method

- (BOOL)isDateType
{
    if([_inputType isEqualToString:@"date"] || [_inputType isEqualToString:@"time"])
        return YES;
    return NO;
}

- (BOOL)isPureInt:(NSString*)textString
{
    int val;
    NSScanner* scan = [NSScanner scannerWithString:textString];
    return[scan scanInt:&val] && [scan isAtEnd];
}

- (void)setPlaceholderAttributedString
{
    UIColor* placeholderColor = [self.weexInstance chooseColor:self.placeholderColor lightSchemeColor:self.lightSchemePlaceholderColor darkSchemeColor:self.darkSchemePlaceholderColor invert:self.invertForDarkScheme scene:WXColorSceneText];
    NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:_placeholderString];
    [attributedString addAttribute:NSForegroundColorAttributeName value:placeholderColor range:NSMakeRange(0, _placeholderString.length)];
    UIFont *font = [WXUtility fontWithSize:_fontSize textWeight:_fontWeight textStyle:_fontStyle fontFamily:_fontFamily scaleFactor:self.weexInstance.pixelScaleFactor];
    [self setAttributedPlaceholder:attributedString font:font];
}

- (void)setTextFont
{
    UIFont *font = [WXUtility fontWithSize:_fontSize textWeight:_fontWeight textStyle:_fontStyle fontFamily:_fontFamily scaleFactor:self.weexInstance.pixelScaleFactor];
    [self setFont:font];
}

- (void)setAutofocus:(BOOL)b
{
    if (b) {
        if([self isDateType])
        {
            [_datePickerManager show];
        }else
        {
            [self.view becomeFirstResponder];
             self.weexInstance.apmInstance.forceStopRecordInteractionTime = YES;
        }
    } else {
        if([self isDateType])
        {
            [_datePickerManager hide];
        }else
        {
            [self.view resignFirstResponder];
        }
    }
}

- (void)setType
{
    [self setKeyboardType:UIKeyboardTypeDefault];
    [self setSecureTextEntry:NO];
    if ([_inputType isEqualToString:@"text"]) {
        [self setKeyboardType:UIKeyboardTypeDefault];
    }else if ([_inputType isEqualToString:@"password"]) {
        [self setSecureTextEntry:YES];
    }else if ([_inputType isEqualToString:@"tel"]) {
        [self setKeyboardType:UIKeyboardTypePhonePad];
    }else if ([_inputType isEqualToString:@"email"]) {
        [self setKeyboardType:UIKeyboardTypeEmailAddress];
    }else if ([_inputType isEqualToString:@"url"]) {
        [self setKeyboardType:UIKeyboardTypeURL];
    }else if ([_inputType isEqualToString:@"number"]) {
        [self setKeyboardType:UIKeyboardTypeDecimalPad];
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
    [self setEditPadding:padding];
}

- (void)setBorder:(UIEdgeInsets)border
{
    _border = border;
    [self setEditBorder:border];
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
    if ([self.view isFirstResponder]){
        recordStyles = [NSMutableDictionary new];
        recordStyles = [self getPseudoClassStylesByKeys:@[@"focus"]];
        [styles addEntriesFromDictionary:recordStyles];
    }
    NSString *disabledStr = @"enabled";
    if (_disabled){
        disabledStr = @"disabled";
    }
    if ([self.view isFirstResponder]) {
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
    if(![self.view isFirstResponder]) {
        return;
    }
    
    CGRect end = [[[notification userInfo] objectForKey:@"UIKeyboardFrameEndUserInfoKey"] CGRectValue];
    if (!_disableMoveViewUp) {
        _keyboardSize = end.size;
        UIView * rootView = self.weexInstance.rootView;
        CGRect screenRect = [[UIScreen mainScreen] bounds];
        CGRect keyboardRect = (CGRect){
            .origin.x = 0,
            .origin.y = CGRectGetMaxY(screenRect) - _keyboardSize.height - 54,
            .size = _keyboardSize
        };
        CGRect inputFrame = [self.view.superview convertRect:self.view.frame toView:rootView];
        if (keyboardRect.origin.y - inputFrame.size.height <= inputFrame.origin.y) {
            [self setViewMovedUp:YES];
            self.weexInstance.isRootViewFrozen = YES;
        }
    }
    
    if (_keyboardEvent) {
        [self fireEvent:@"keyboard" params:@{ @"isShow": @YES, @"keyboardSize": @(end.size.height / self.weexInstance.pixelScaleFactor) }];
    }
    
    _keyboardHidden = NO;
}

- (void)keyboardWillHide:(NSNotification*)notification
{
    if (![self.view isFirstResponder] || _keyboardHidden) {
        return;
    }
    if (!_disableMoveViewUp) {
        UIView * rootView = self.weexInstance.rootView;
        if (!CGRectEqualToRect(self.weexInstance.frame, rootView.frame)) {
            [self setViewMovedUp:NO];
        }
        self.weexInstance.isRootViewFrozen = NO;
    }
    if (_keyboardEvent) {
        [self fireEvent:@"keyboard" params:@{ @"isShow": @NO }];
    }
    
    _keyboardHidden = YES;
}

- (void)closeKeyboard
{
    [[NSNotificationCenter defaultCenter] postNotificationName:UIKeyboardWillHideNotification object:nil];
    [self.view resignFirstResponder];
}

#pragma mark -reset color
- (void)resetStyles:(NSArray *)styles
{
    BOOL colorChanged = NO;
    if ([styles containsObject:@"color"]) {
        self.colorForStyle = [UIColor blackColor];
        colorChanged = YES;
    }
    if ([styles containsObject:@"weexDarkSchemeColor"]) {
        self.darkSchemeColorForStyle = nil;
        colorChanged = YES;
    }
    if ([styles containsObject:@"weexLightSchemeColor"]) {
        self.lightSchemeColorForStyle = nil;
        colorChanged = YES;
    }
    if (colorChanged) {
        [self _setTextColor];
    }
    
    if ([styles containsObject:@"fontSize"]) {
        _fontSize = WX_TEXT_FONT_SIZE;
        [self setTextFont];
    }
}

- (void)schemeDidChange:(NSString*)scheme
{
    [super schemeDidChange:scheme];
    if (_view) {
        [self _setTextColor];
        if ([self.placeHolderLabel.text length] > 0) {
            [self setPlaceholderAttributedString];
        }
    }
}

@end


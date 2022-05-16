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

#import "WXTextAreaComponent.h"
#import "WXUtility.h"
#import "WXComponent+Layout.h"
#import "WXComponent_internal.h"
#import "WXComponent+Layout.h"

#define CorrectX 4 //textview fill text 4 pixel from left. so placeholderlabel have 4 pixel too
#define CorrectY 8 // textview fill text 8 pixel from top
typedef UITextView WXTextAreaView;

@interface WXTextAreaComponent()

@property (nonatomic, strong) WXTextAreaView *textView;
@property (nonatomic) NSUInteger rows;

@end

@implementation WXTextAreaComponent {
    UIEdgeInsets _border;
    UIEdgeInsets _padding;
}

-(void)viewDidLoad
{
    _padding = UIEdgeInsetsZero;
    _border = UIEdgeInsetsZero;
    if (self.placeholderString) {
        self.placeHolderLabel = [[UILabel alloc] init];
        self.placeHolderLabel.numberOfLines = 0;
        [_textView addSubview:self.placeHolderLabel];
    }
    [self _updateTextContentInset];
    // default placeholder hide from voice over
    self.placeHolderLabel.isAccessibilityElement = NO;
    _textView.isAccessibilityElement = YES;
    _textView.delegate = self;
    [_textView setNeedsDisplay];
    [_textView setClipsToBounds:YES];
    [super viewDidLoad];
}

- (void)viewWillUnload
{
    _textView = nil;
}

- (UIView *)loadView
{
    _textView = [[WXTextAreaView alloc] init];
    return _textView;
}

#pragma mark measure frame
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
        
        CGSize computedSize = [[[NSString alloc] init]sizeWithAttributes:@{NSFontAttributeName:[UIFont systemFontOfSize:strongSelf.textView.font.pointSize]}];
        computedSize.height = strongSelf.rows ? computedSize.height * strongSelf.rows + (CorrectY + CorrectY/2):0;
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

#pragma mark -Overwrite method
-(NSString *)text
{
    return _textView.text;
}

- (void)setText:(NSString *)text
{
    _textView.text = text;
    if ([text length] >0) {
        self.placeHolderLabel.text = @"";
    }
}

-(void)setTextColor:(UIColor *)color
{
    [_textView setTextColor:color];
}

-(void)setTextAlignment:(NSTextAlignment)textAlignForStyle
{
    [_textView setTextAlignment:textAlignForStyle];
}

-(void)setUserInteractionEnabled:(BOOL)userInteractionEnabled
{
    [_textView setUserInteractionEnabled:userInteractionEnabled];
}

-(void)setEnabled:(BOOL)enabled
{
    _textView.editable = enabled;
    _textView.selectable = enabled;
}

-(void)setReturnKeyType:(UIReturnKeyType)returnKeyType
{
    [_textView setReturnKeyType:returnKeyType];
}

-(void)setInputAccessoryView:(UIView *)inputAccessoryView
{
    [_textView setInputAccessoryView:inputAccessoryView];
}

-(void)setEditSelectionRange:(NSInteger)selectionStart selectionEnd:(NSInteger)selectionEnd
{
    [self.textView becomeFirstResponder];
    UITextPosition *startPos =  [self.textView positionFromPosition:self.textView.beginningOfDocument offset:selectionStart];
    UITextPosition *endPos = [self.textView positionFromPosition:self.textView.beginningOfDocument offset:selectionEnd];
    UITextRange *textRange = [self.textView textRangeFromPosition:startPos
                                                       toPosition:endPos];
    self.textView.selectedTextRange = textRange;
}

-(NSDictionary *)getEditSelectionRange
{
    NSInteger selectionStart = [self.textView offsetFromPosition:self.textView.beginningOfDocument toPosition:self.textView.selectedTextRange.start];
    NSInteger selectionEnd = [self.textView offsetFromPosition:self.textView.beginningOfDocument toPosition:self.textView.selectedTextRange.end];
    NSDictionary *res = @{@"selectionStart":@(selectionStart),@"selectionEnd":@(selectionEnd)};
    return res;
}

-(void)setKeyboardType:(UIKeyboardType)keyboardType
{
    [_textView setKeyboardType:keyboardType];
}

-(void)setSecureTextEntry:(BOOL)secureTextEntry
{
    [_textView setSecureTextEntry:secureTextEntry];
}

-(void)setEditPadding:(UIEdgeInsets)padding
{
    _padding = padding;
    [self _updateTextContentInset];
}

-(void)setEditBorder:(UIEdgeInsets)border
{
    _border = border;
    [self _updateTextContentInset];
}

-(void)setAttributedPlaceholder:(NSMutableAttributedString *)attributedString font:(UIFont *)font
{
    UIColor* placeholderColor = [self.weexInstance chooseColor:self.placeholderColor lightSchemeColor:self.lightSchemePlaceholderColor darkSchemeColor:self.darkSchemePlaceholderColor invert:self.invertForDarkScheme scene:WXColorSceneText];
    [attributedString addAttribute:NSForegroundColorAttributeName value:placeholderColor range:NSMakeRange(0, self.placeholderString.length)];
    [attributedString addAttribute:NSFontAttributeName value:font range:NSMakeRange(0, self.placeholderString.length)];
    
    self.placeHolderLabel.backgroundColor = [UIColor clearColor];
    CGRect expectedLabelSize = [attributedString boundingRectWithSize:(CGSize){self.view.frame.size.width, CGFLOAT_MAX}
                                                              options:NSStringDrawingUsesLineFragmentOrigin
                                                              context:nil];
    
    self.placeHolderLabel.clipsToBounds = NO;
    CGRect newFrame = self.placeHolderLabel.frame;
    newFrame.size.height = ceil(expectedLabelSize.size.height);
    newFrame.size.width = _textView.frame.size.width- CorrectX*2;
    newFrame.origin.x = CorrectX + _padding.left + _border.left; // the cursor origin.x
    self.placeHolderLabel.frame = newFrame;
    self.placeHolderLabel.attributedText = attributedString;
}

-(void)setFont:(UIFont *)font
{
    [_textView setFont:font];
}

-(void)setRows:(NSUInteger)rows
{
    _rows = rows;
    [self setNeedsLayout];
}

#pragma mark -Private Method
- (void)_updateTextContentInset
{
    [_textView setTextContainerInset:UIEdgeInsetsMake(_padding.top + _border.top,
                                                      _padding.left + _border.left,
                                                      _padding.bottom + _border.bottom,
                                                      _border.right + _border.right)];
    
    //when textview update, placeHolderLabel update too
    CGRect newFrame = self.placeHolderLabel.frame;
    newFrame.size.width = self.textView.frame.size.width - (_padding.left + _border.left) -CorrectX*2;
    newFrame.origin.x = CorrectX + _padding.left + _border.left; // the cursor origin.x
    newFrame.origin.y = _padding.top + _border.top;
    self.placeHolderLabel.frame = newFrame;
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXSelectComponent.h"
#import "WXUtility.h"
#import "WXComponent+Events.h"

@interface WXSelectComponent()

@property (nonatomic, strong) UITapGestureRecognizer *tap;
@property (nonatomic, strong) UIPickerView *pickerView;
@property (nonatomic, strong) NSArray *options;
@property (nonatomic, assign) NSInteger selectIndex;
@property (nonatomic, assign) BOOL disabled;

@end

@implementation WXSelectComponent
- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance];
    if (self) {
        _tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(popupPicker)];
        _tap.delegate = self;
        
        if (attributes[@"options"]) {
            _options = [attributes[@"options"] componentsSeparatedByString:@","];
        }
        if (attributes[@"selectIndex"]) {
            _selectIndex = [attributes[@"selectIndex"] integerValue];
        }
        if (attributes[@"disabled"]) {
            _disabled = [attributes[@"disabled"] boolValue];
        }
        
        if (styles[@""]) {
            // setting style when init
        }
        
        UIWindow * window = [UIApplication sharedApplication].keyWindow;
        CGSize windowSize = window.rootViewController.view.frame.size;
        CGFloat pickerViewHeight = 200.0;
        _pickerView = [[UIPickerView alloc] initWithFrame:CGRectMake(0, 0, windowSize.width, pickerViewHeight)];
        [_pickerView setBackgroundColor:[UIColor redColor]];
        _pickerView.dataSource = self;
        _pickerView.delegate = self;
    }
    
    return self;
}

- (void)viewDidLoad
{
    [_pickerView selectRow:_selectIndex inComponent:0 animated:YES];
    // show selected item
    _pickerView.showsSelectionIndicator=YES;
}

- (void)viewWillUnload
{
}

- (UIView *)loadView {
    
    return _pickerView;
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"options"]) {
        _options = [attributes[@"options"] componentsSeparatedByString:@","];
    }
    if (attributes[@"selectIndex"]) {
        _selectIndex = [attributes[@"selectIndex"] integerValue];
    }
    if (attributes[@"disabled"]) {
        _disabled = [attributes[@"disabled"] boolValue];
    }
    [_pickerView reloadAllComponents];
}

- (void)updateStyles:(NSDictionary *)styles
{
    
}

#pragma mark - action
- (void)popupPicker
{
    if (_disabled)
        return;
    
    [self fireEvent:@"focus" params:nil];
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer
{
    if (gestureRecognizer == _tap)
        return YES;
    
    if (otherGestureRecognizer == _tap)
        return YES;
    
    return [super gestureRecognizer:gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:otherGestureRecognizer];
}

#pragma mark - pickerView delegate
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView {
    return 1;
}


- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component {
    return [_options count];
}

- (CGFloat)pickerView:(UIPickerView *)pickerView widthForComponent:(NSInteger)component {
    
    return self.calculatedFrame.size.width;
}

- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component
{
    [self fireEvent:@"change" params:@{@"index":[NSNumber numberWithInteger:row],
                                       @"value":[_options objectAtIndex:row]}];
}

-(NSString*)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
    return [_options objectAtIndex:row];
}

@end

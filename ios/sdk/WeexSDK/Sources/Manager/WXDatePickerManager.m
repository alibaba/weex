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

#import "WXDatePickerManager.h"
#import <UIKit/UIDatePicker.h>
#import <UIKit/UIKit.h>
#import "WXConvert.h"
#import "WXUtility.h"
#import "WXLegacyAdapter.h"

#define WXPickerHeight 266

@interface WXDatePickerManager() <UIGestureRecognizerDelegate>

@property(nonatomic,strong)UIDatePicker *datePicker;
@property(nonatomic,strong)UIView *backgroudView;
@property(nonatomic,strong)UIView *datePickerView;
@property(nonatomic,copy)NSString *type;
@property(nonatomic)BOOL isAnimating;

@end

@implementation WXDatePickerManager
@synthesize datePicker;

- (instancetype)init
{
    self = [super init];
    if (self) {
        if(!self.backgroudView)
        {
            self.backgroudView = [self createBackgroundView];
            UITapGestureRecognizer *tapGesture=[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(hide)];
            if (WX_SYS_VERSION_GREATER_THAN_OR_EQUAL_TO(@"11.0") && WX_SYS_VERSION_LESS_THAN(@"11.1")) {
                tapGesture.delegate = self;
            }
            [self.backgroudView addGestureRecognizer:tapGesture];
        }
        
        if(!self.datePickerView)
        {
            self.datePickerView = [self createDatePickerView];
        }
        
        if(!datePicker)
        {
            datePicker = [[UIDatePicker alloc]init];
        }
    #if (defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 130400)
        if (@available(iOS 13.4, *)) {
            datePicker.preferredDatePickerStyle = UIDatePickerStyleWheels;
        }
    #endif
        datePicker.datePickerMode=UIDatePickerModeDate;
        CGRect pickerFrame = CGRectMake(0, 44, [UIScreen mainScreen].bounds.size.width, WXPickerHeight-44);
        datePicker.backgroundColor = [UIColor whiteColor];
        datePicker.frame = pickerFrame;
        [datePicker addTarget:self action:@selector(valueChanged:) forControlEvents:UIControlEventValueChanged];
        UIToolbar *toolBar=[[UIToolbar alloc]initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, 44)];
        [toolBar setBackgroundColor:[UIColor whiteColor]];
        UIBarButtonItem* noSpace = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFixedSpace target:nil action:nil];
        noSpace.width=10;
        UIBarButtonItem* doneBtn = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(done:)];
        UIBarButtonItem *flexSpace = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:nil];
        UIBarButtonItem* cancelBtn = [[UIBarButtonItem alloc]initWithBarButtonSystemItem:UIBarButtonSystemItemCancel target:self action:@selector(cancel:)];
        [toolBar setItems:[NSArray arrayWithObjects:noSpace,cancelBtn,flexSpace,doneBtn,noSpace, nil]];
        [self.datePickerView addSubview:datePicker];
        [self.datePickerView addSubview:toolBar];
        [self.backgroudView addSubview:self.datePickerView];
    }
    return self;
}

- (void)updateDatePicker:(NSDictionary *)attributes
{
    NSString *type = [WXConvert NSString:attributes[@"type"]];
    if(type)
    {
        _type = type;
        if( [_type isEqualToString:@"date"])
        {
            self.datePicker.datePickerMode = UIDatePickerModeDate;
            NSString *value = [WXConvert NSString:attributes[@"value"]];
            if(value)
            {
                NSDate *date = [WXUtility dateStringToDate:value];
                if(date)
                {
                    self.datePicker.date =date;
                }
            }
            NSString *max = [WXConvert NSString:attributes[@"max"]];
            if(max)
            {
                NSDate *date = [WXUtility dateStringToDate:max];
                if(date)
                {
                    self.datePicker.maximumDate =date;
                }
            }
            NSString *min = [WXConvert NSString:attributes[@"min"]];
            if(min)
            {
                NSDate *date = [WXUtility dateStringToDate:min];
                if(date)
                {
                    self.datePicker.minimumDate =date;
                }
            }
        }else if([_type isEqualToString:@"time"])
        {
            self.datePicker.datePickerMode = UIDatePickerModeTime;
            NSString *value = [WXConvert NSString:attributes[@"value"]];
            if(value)
            {
                NSDate *date = [WXUtility timeStringToDate:value];
                if(date)
                {
                    self.datePicker.date = date;
                }
            }
        }
    }
}

-(UIView *)createBackgroundView
{
    UIView *view = [UIView new];
    view.frame = [UIScreen mainScreen].bounds;
    view.backgroundColor = [UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:0.4];
    return view;
}

-(UIView *)createDatePickerView
{
    UIView *view = [UIView new];
    view.frame = CGRectMake(0, [UIScreen mainScreen].bounds.size.height, [UIScreen mainScreen].bounds.size.width, WXPickerHeight);
    view.backgroundColor = [UIColor whiteColor];
    return view;
}

-(void)show
{
    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    [window addSubview:self.backgroudView];
    UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, self.datePicker);
    if(self.isAnimating)
    {
        return;
    }
    self.isAnimating = YES;
    self.backgroudView.hidden = NO;
    [UIView animateWithDuration:0.35f animations:^{
        self.datePickerView.frame = CGRectMake(0, [UIScreen mainScreen].bounds.size.height - WXPickerHeight, [UIScreen mainScreen].bounds.size.width, WXPickerHeight);
        self.backgroudView.alpha = 1;
    } completion:^(BOOL finished) {
        self.isAnimating = NO;
    }];
}

-(void)hide
{
    if(self.isAnimating)
    {
        return;
    }
    self.isAnimating = YES;
    [UIView animateWithDuration:0.35f animations:^{
        self.datePickerView.frame = CGRectMake(0, [UIScreen mainScreen].bounds.size.height, [UIScreen mainScreen].bounds.size.width, WXPickerHeight);
        self.backgroudView.alpha = 0;
    } completion:^(BOOL finished) {
        self.backgroudView.hidden = YES;
        self.isAnimating = NO;
        [self.backgroudView removeFromSuperview];
        
        // move focus to original view;
        if ([self.delegate isKindOfClass:[WXComponent class]]) {
            UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, ((WXComponent*)self.delegate).view);
        }else if ([self.delegate isKindOfClass:[UIView class]]) {
            UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, (UIView*)self.delegate);
        }
    }];
}

-(void)cancel:(id)sender
{
    [self hide];
}

-(void)done:(id)sender
{
    [self hide];
    if (self.delegate && [self.delegate respondsToSelector:@selector(fetchDatePickerValue:)]) {
        NSString *value = @"";
        if([_type isEqualToString:@"time"])
        {
            value = [WXUtility timeToString:self.datePicker.date];
        }else if([_type isEqualToString:@"date"])
        {
            value = [WXUtility dateToString:self.datePicker.date];
        }
        [self.delegate fetchDatePickerValue:value];
    }
    
}

- (void)valueChanged:(id)sender
{
    if ([self.delegate respondsToSelector:@selector(datePickerValueDidChange:)]) {
        NSString *value = @"";
        if ([_type isEqualToString:@"time"]) {
            value = [WXUtility timeToString:self.datePicker.date];
        } else if ([_type isEqualToString:@"date"]) {
            value = [WXUtility dateToString:self.datePicker.date];
        }
        [self.delegate datePickerValueDidChange:value];
    };
}

#pragma mark - UIGestureRecognizerDelegate
- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch {
    if (self.datePickerView && [touch.view isDescendantOfView:self.datePickerView]) {
        return NO;
    }
    return YES;
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXDatePickerManager.h"
#import <UIKit/UIDatePicker.h>
#import <UIKit/UIKit.h>
#import "WXConvert.h"
#import "WXUtility.h"

#define WXPickerHeight 266

@interface WXDatePickerManager()

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
            self.backgroudView = [self createBackgroudView];
            UITapGestureRecognizer *tapGesture=[[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(hide)];
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
        
        datePicker.datePickerMode=UIDatePickerModeDate;
        CGRect pickerFrame = CGRectMake(0, 44, [UIScreen mainScreen].bounds.size.width, WXPickerHeight-44);
        datePicker.backgroundColor = [UIColor whiteColor];
        datePicker.frame = pickerFrame;
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

-(UIView *)createBackgroudView
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

@end

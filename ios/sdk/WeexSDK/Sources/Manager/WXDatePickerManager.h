/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@protocol WXDatePickerManagerDelegate <NSObject>
@optional
- (void)fetchDatePickerValue:(NSString *)value;
@end

@interface WXDatePickerManager : NSObject

@property (nonatomic, weak) id<WXDatePickerManagerDelegate> delegate;

-(void)show;
-(void)hide;
-(void)updateDatePicker:(NSDictionary *)attributes;

@end

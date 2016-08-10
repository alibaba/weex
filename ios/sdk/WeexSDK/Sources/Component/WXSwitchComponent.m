/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXSwitchComponent.h"
#import "WXConvert.h"

@interface WXSwitchView : UISwitch

@end

@implementation WXSwitchView

@end

@interface WXSwitchComponent()

@property (nonatomic, strong)   WXSwitchView    *switchView;
@property (nonatomic, assign)   BOOL    changeEvent;
@property (nonatomic, assign)   BOOL    checked;
@property (nonatomic, assign)   BOOL    disabled;

@end

@implementation WXSwitchComponent

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _checked = attributes[@"checked"] ? [WXConvert BOOL:attributes[@"checked"]] : NO;
        _disabled = attributes[@"disabled"] ? [WXConvert BOOL:attributes[@"disabled"]] : NO;
        
        self.cssNode->style.dimensions[CSS_WIDTH] = 51;
        self.cssNode->style.dimensions[CSS_HEIGHT] = 31;
    }
    return self;
}

- (UIView *)loadView
{
    return [[WXSwitchView alloc] init];
}

- (void)viewDidLoad
{
    _switchView = (WXSwitchView *)self.view;
    [_switchView setOn:_checked animated:YES];
    [_switchView setEnabled:!_disabled];
    [_switchView addTarget:self action:@selector(checkChanged) forControlEvents:UIControlEventValueChanged];
}

- (void)addEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"change"]) {
        _changeEvent = YES;
    }
}

- (void)removeEvent:(NSString *)eventName
{
    if ([eventName isEqualToString:@"change"]) {
        _changeEvent = NO;
    }
}

- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"checked"]) {
        _checked = [WXConvert BOOL:attributes[@"checked"]];
        [_switchView setOn:_checked animated:YES];
    }
    else if (attributes[@"disabled"]) {
        _disabled = [WXConvert BOOL:attributes[@"disabled"]];
        [_switchView setEnabled:!_disabled];
    }
}

- (void)checkChanged
{
   if (_changeEvent) {
        [self fireEvent:@"change" params:@{@"value":@([_switchView isOn])} domChanges:@{@"attrs": @{@"checked": @([_switchView isOn])}}];
   }
}

@end

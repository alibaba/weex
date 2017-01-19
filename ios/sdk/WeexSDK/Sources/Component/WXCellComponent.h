/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent.h"
@class WXListComponent;

@interface WXCellComponent : WXComponent

@property (nonatomic, strong) NSString *scope;
@property (nonatomic, assign) UITableViewRowAnimation insertAnimation;
@property (nonatomic, assign) UITableViewRowAnimation deleteAnimation;
@property (nonatomic, weak) WXListComponent *list;

@end

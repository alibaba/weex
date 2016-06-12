/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent.h"
#import "WXNavigationProtocol.h"

@interface WXComponent (Navigation)

- (void)setNavigationBarHidden:(BOOL)hidden;

- (void)setNavigationBackgroundColor:(UIColor *)backgroundColor;

- (void)setNavigationItemWithParam:(NSDictionary *)param position:(WXNavigationItemPosition)position;

- (void)setNavigationWithStyles:(NSDictionary *)styles;
    
@end

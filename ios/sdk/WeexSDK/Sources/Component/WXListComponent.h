/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXScrollerComponent.h"

@class WXCellComponent;
@class WXHeaderComponent;
@interface WXListComponent : WXScrollerComponent

- (void)cellDidRemove:(WXCellComponent *)cell;

- (void)cellDidLayout:(WXCellComponent *)cell;

- (void)headerDidLayout:(WXHeaderComponent *)header;

- (void)cellDidRendered:(WXCellComponent *)cell;

- (void)cell:(WXCellComponent *)cell didMoveToIndex:(NSUInteger)index;

@end

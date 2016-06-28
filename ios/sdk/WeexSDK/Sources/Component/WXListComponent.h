/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXCellComponent.h"
#import "WXScrollerComponent.h"

@interface WXListComponent : WXScrollerComponent

- (void)cellWillRemove:(WXCellComponent *)cell;

- (void)cellDidRemove:(WXCellComponent *)cell;

- (void)cellDidLayout:(WXCellComponent *)cell;

- (void)cellDidRendered:(WXCellComponent *)cell;

- (void)cell:(WXCellComponent *)cell didMoveFromIndexPath:(NSIndexPath *)fromIndexPath toIndexPath:(NSIndexPath *)toIndexPath;

@end
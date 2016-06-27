/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXScrollerProtocol.h"
#import "WXComponent.h"

@interface WXScrollerComponent : WXComponent <WXScrollerProtocol, UIScrollViewDelegate>

@property (nonatomic, copy) void (^onScroll)(UIScrollView *);

@property (nonatomic, assign) NSUInteger loadmoreretry;

@property (nonatomic, assign) CGSize contentSize;

@property (nonatomic, readonly, assign) css_node_t *scrollerCSSNode;

- (NSUInteger)childrenCountForScrollerLayout;

@end


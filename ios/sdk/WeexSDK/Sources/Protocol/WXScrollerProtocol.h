/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

@class WXComponent;
@protocol WXScrollerProtocol <NSObject>

/**
 * @abstract add sticky component
 */
- (void)addStickyComponent:(WXComponent *)sticky;

/**
 * @abstract remove sticky component
 */
- (void)removeStickyComponent:(WXComponent *)sticky;

/**
 * @abstract adjust sticky components
 */
- (void)adjustSticky;

/**
 * @abstract add scroll listener
 */
- (void)addScrollToListener:(WXComponent *)target;

/**
 * @abstract remove scroll listener
 */
- (void)removeScrollToListener:(WXComponent *)target;

- (void)scrollToComponent:(WXComponent *)component withOffset:(CGFloat)offset;

- (BOOL)isNeedLoadMore;

- (void)loadMore;

- (CGPoint)contentOffset;

- (void)setContentOffset:(CGPoint)contentOffset animated:(BOOL)animated;

- (CGSize)contentSize;

- (void)setContentSize:(CGSize)size;

- (UIEdgeInsets)contentInset;

- (void)setContentInset:(UIEdgeInsets)contentInset;

- (void)resetLoadmore;

@end


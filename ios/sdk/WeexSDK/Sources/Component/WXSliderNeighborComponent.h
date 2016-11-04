/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXComponent.h"

typedef NS_ENUM(NSInteger, WXSliderNeighborOption)
{
    WXSliderNeighborOptionWrap = 0,
    WXSliderNeighborOptionShowBackfaces,
    WXSliderNeighborOptionOffsetMultiplier,
    WXSliderNeighborOptionVisibleItems,
    WXSliderNeighborOptionCount,
    WXSliderNeighborOptionArc,
    WXSliderNeighborOptionAngle,
    WXSliderNeighborOptionRadius,
    WXSliderNeighborOptionTilt,
    WXSliderNeighborOptionSpacing,
    WXSliderNeighborOptionFadeMin,
    WXSliderNeighborOptionFadeMax,
    WXSliderNeighborOptionFadeRange,
    WXSliderNeighborOptionFadeMinAlpha
};

@class WXSliderNeighborView;

@protocol WXSliderNeighborDelegate <NSObject>
@optional

- (void)sliderNeighborWillBeginScrollingAnimation:(WXSliderNeighborView * _Nonnull )sliderNeighbor;
- (void)sliderNeighborDidEndScrollingAnimation:(WXSliderNeighborView *_Nonnull)sliderNeighbor;
- (void)sliderNeighborDidScroll:(WXSliderNeighborView * _Nonnull)sliderNeighbor;
- (void)sliderNeighborCurrentItemIndexDidChange:(WXSliderNeighborView * _Nonnull)sliderNeighbor from:(NSInteger) from to:(NSInteger)to;
- (void)sliderNeighborWillBeginDragging:(WXSliderNeighborView * _Nonnull)sliderNeighbor;
- (void)sliderNeighborDidEndDragging:(WXSliderNeighborView * _Nonnull)sliderNeighbor willDecelerate:(BOOL)decelerate;
- (void)sliderNeighborWillBeginDecelerating:(WXSliderNeighborView * _Nonnull)sliderNeighbor;
- (void)sliderNeighborDidEndDecelerating:(WXSliderNeighborView * _Nonnull)sliderNeighbor;

- (BOOL)sliderNeighbor:(WXSliderNeighborView * _Nonnull)sliderNeighbor shouldSelectItemAtIndex:(NSInteger)index;
- (void)sliderNeighbor:(WXSliderNeighborView * _Nonnull)sliderNeighbor didSelectItemAtIndex:(NSInteger)index;
- (void)sliderNeighbor:(WXSliderNeighborView * _Nonnull)sliderNeighbor didScrollToItemAtIndex:(NSInteger)index;

- (CGFloat)sliderNeighborItemWidth:(WXSliderNeighborView * _Nonnull)sliderNeighbor;
- (CGFloat)sliderNeighbor:(WXSliderNeighborView * _Nonnull)sliderNeighbor valueForOption:(WXSliderNeighborOption)option withDefault:(CGFloat)value;

@end

@protocol WXSliderNeighborDataSource <NSObject>

- (NSInteger)numberOfItemsInSliderNeighbor:(WXSliderNeighborView * _Nonnull)sliderNeighbor;
- (UIView * _Nonnull)sliderNeighbor:(WXSliderNeighborView * _Nonnull)sliderNeighbor viewForItemAtIndex:(NSInteger)index reusingView:( UIView * _Nonnull)view;

@optional

- (NSInteger)numberOfPlaceholdersInsliderNeighbor:(WXSliderNeighborView * _Nonnull)sliderNeighbor;
- (UIView * _Nonnull)sliderNeighbor:(WXSliderNeighborView * _Nonnull)sliderNeighbor placeholderViewAtIndex:(NSInteger)index reusingView:( UIView * _Nonnull)view;

@end

@interface WXSliderNeighborComponent : WXComponent<WXSliderNeighborDelegate, WXSliderNeighborDataSource>

@end


/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXScrollerProtocol.h"
#import "WXComponent.h"
#import "WXConvert.h"
@class WXTouchGestureRecognizer;
@class WXThreadSafeCounter;


/**
 * The following variables and methods are used in Weex INTERNAL logic.
 * @warning These variables and methods must never be called or overridden.
 */
@interface WXComponent ()
{
@package
    NSString *_type;
    /**
     *  Layout
     */
    css_node_t *_cssNode;
    BOOL _isLayoutDirty;
    CGRect _calculatedFrame;
    CGPoint _absolutePosition;
    WXPositionType _positionType;
    
    /**
     *  View
     */
    UIColor *_backgroundColor;
    WXClipType _clipToBounds;
    UIView *_view;
    CGFloat _opacity;
    WXVisibility  _visibility;
    
    /**
     *  Events
     */
    BOOL _appearEvent;
    BOOL _disappearEvent;
    UITapGestureRecognizer *_tapGesture;
    NSMutableArray *_swipeGestures;
    UILongPressGestureRecognizer *_longPressGesture;
    UIPanGestureRecognizer *_panGesture;
    BOOL _listenPanStart;
    BOOL _listenPanMove;
    BOOL _listenPanEnd;
    WXTouchGestureRecognizer* _touchGesture;
    
    /**
     *  Display
     */
    CALayer *_layer;
    BOOL _composite;
    BOOL _compositingChild;
    WXThreadSafeCounter *_displayCounter;
    
    UIColor *_borderTopColor;
    UIColor *_borderRightColor;
    UIColor *_borderLeftColor;
    UIColor *_borderBottomColor;
    
    CGFloat _borderTopWidth;
    CGFloat _borderRightWidth;
    CGFloat _borderLeftWidth;
    CGFloat _borderBottomWidth;
    
    CGFloat _borderTopLeftRadius;
    CGFloat _borderTopRightRadius;
    CGFloat _borderBottomLeftRadius;
    CGFloat _borderBottomRightRadius;
    
    WXBorderStyle _borderTopStyle;
    WXBorderStyle _borderRightStyle;
    WXBorderStyle _borderBottomStyle;
    WXBorderStyle _borderLeftStyle;
    
    
    BOOL _isFixed;
    BOOL _async;
    BOOL _isNeedJoinLayoutSystem;
    BOOL _lazyCreateView;
    
    NSString *_transform;
    NSString *_transformOrigin;
}

///--------------------------------------
/// @name Package Internal Methods
///--------------------------------------

- (void)_layoutDidFinish;
- (void)_calculateFrameWithSuperAbsolutePosition:(CGPoint)superAbsolutePosition
                           gatherDirtyComponents:(NSMutableSet<WXComponent *> *)dirtyComponents;


- (void)_willDisplayLayer:(CALayer *)layer;

- (void)_unloadView;

- (id<WXScrollerProtocol>)ancestorScroller;

- (void)_insertSubcomponent:(WXComponent *)subcomponent atIndex:(NSInteger)index;
- (void)_removeFromSupercomponent;
- (void)_moveToSupercomponent:(WXComponent *)newSupercomponent atIndex:(NSUInteger)index;

- (void)_updateStylesOnComponentThread:(NSDictionary *)styles;
- (void)_updateAttributesOnComponentThread:(NSDictionary *)attributes;
- (void)_updateStylesOnMainThread:(NSDictionary *)styles;
- (void)_updateAttributesOnMainThread:(NSDictionary *)attributes;

- (void)_addEventOnComponentThread:(NSString *)eventName;
- (void)_removeEventOnComponentThread:(NSString *)eventName;
- (void)_addEventOnMainThread:(NSString *)eventName;
- (void)_removeEventOnMainThread:(NSString *)eventName;

///--------------------------------------
/// @name Protected Methods
///--------------------------------------

- (BOOL)_needsDrawBorder;

- (void)_drawBorderWithContext:(CGContextRef)context size:(CGSize)size;

- (void)_frameDidCalculated:(BOOL)isChanged;

- (NSUInteger)_childrenCountForLayout;

- (void)_fillAbsolutePositions;

///--------------------------------------
/// @name Private Methods
///--------------------------------------

- (void)_initCSSNodeWithStyles:(NSDictionary *)styles;

- (void)_updateCSSNodeStyles:(NSDictionary *)styles;

- (void)_recomputeCSSNodeChildren;

- (void)_recomputeBorderRadius;

- (void)_handleBorders:(NSDictionary *)styles isUpdating:(BOOL)updating;

- (void)_initViewPropertyWithStyles:(NSDictionary *)styles;

- (void)_updateViewStyles:(NSDictionary *)styles;

- (void)_initEvents:(NSArray *)events;

- (void)_removeAllEvents;

- (void)_setupNavBarWithStyles:(NSMutableDictionary *)styles attributes:(NSMutableDictionary *)attributes;

- (void)_updateNavBarAttributes:(NSDictionary *)attributes;

- (void)_handleFirstScreenTime;

@end

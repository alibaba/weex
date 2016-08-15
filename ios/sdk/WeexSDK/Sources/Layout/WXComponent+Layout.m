/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent+Layout.h"
#import "WXComponent_internal.h"
#import "WXTransform.h"
#import "WXAssert.h"

@implementation WXComponent (Layout)

#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"

#pragma mark Public

- (void)setNeedsLayout
{
    _isLayoutDirty = YES;
    WXComponent *supercomponent = [self supercomponent];
    if(supercomponent){
        [supercomponent setNeedsLayout];
    }
}

- (BOOL)needsLayout
{
    return _isLayoutDirty;
}

- (CGSize (^)(CGSize))measureBlock
{
    return nil;
}

- (void)layoutDidFinish
{
    WXAssertMainThread();
}

#pragma mark Private

- (void)_initCSSNodeWithStyles:(NSDictionary *)styles
{
    _cssNode = new_css_node();
    
    _cssNode->print = cssNodePrint;
    _cssNode->get_child = cssNodeGetChild;
    _cssNode->is_dirty = cssNodeIsDirty;
    if ([self measureBlock]) {
        _cssNode->measure = cssNodeMeasure;
    }
    _cssNode->context = (__bridge void *)self;
    
    [self _recomputeCSSNodeChildren];
    [self _fillCSSNode:styles];
    
    // To be in conformity with Android/Web, hopefully remove this in the future.
    if ([self.ref isEqualToString:WX_SDK_ROOT_REF]) {
        if (isUndefined(_cssNode->style.dimensions[CSS_HEIGHT]) && self.weexInstance.frame.size.height) {
            _cssNode->style.dimensions[CSS_HEIGHT] = self.weexInstance.frame.size.height;
        }
        
        if (isUndefined(_cssNode->style.dimensions[CSS_WIDTH]) && self.weexInstance.frame.size.width) {
            _cssNode->style.dimensions[CSS_WIDTH] = self.weexInstance.frame.size.width;
        }
    }
}

- (void)_updateCSSNodeStyles:(NSDictionary *)styles
{
    [self _fillCSSNode:styles];
}

- (void)_recomputeCSSNodeChildren
{
    _cssNode->children_count = (int)[self _childrenCountForLayout];
}

- (NSUInteger)_childrenCountForLayout
{
    NSUInteger count = self.subcomponents.count;
    for (WXComponent *component in self.subcomponents) {
        if (!component->_isNeedJoinLayoutSystem) {
            count--;
        }
    }
    return (int)(count);
}

- (void)_frameDidCalculated:(BOOL)isChanged
{
    WXAssertComponentThread();
}

- (void)_calculateFrameWithSuperAbsolutePosition:(CGPoint)superAbsolutePosition
                           gatherDirtyComponents:(NSMutableSet<WXComponent *> *)dirtyComponents
{
    WXAssertComponentThread();
    
    if (!_cssNode->layout.should_update) {
        return;
    }
    _cssNode->layout.should_update = false;
    _isLayoutDirty = NO;
    
    CGRect newFrame = CGRectMake(WXRoundPixelValue(_cssNode->layout.position[CSS_LEFT]),
                                 WXRoundPixelValue(_cssNode->layout.position[CSS_TOP]),
                                 WXRoundPixelValue(_cssNode->layout.dimensions[CSS_WIDTH]),
                                 WXRoundPixelValue(_cssNode->layout.dimensions[CSS_HEIGHT]));
    
    BOOL isFrameChanged = NO;
    if (!CGRectEqualToRect(newFrame, _calculatedFrame)) {
        isFrameChanged = YES;
        _calculatedFrame = newFrame;
        [self _recomputeBorderRadius];
        [dirtyComponents addObject:self];
    }
    
    CGPoint newAboslutePosition = CGPointMake(WXRoundPixelValue(superAbsolutePosition.x + _cssNode->layout.position[CSS_LEFT]),
                                              WXRoundPixelValue(superAbsolutePosition.y + _cssNode->layout.position[CSS_TOP]));
    
    if(!CGPointEqualToPoint(_absolutePosition, newAboslutePosition)){
        _absolutePosition = newAboslutePosition;
    }
    
    _cssNode->layout.dimensions[CSS_WIDTH] = CSS_UNDEFINED;
    _cssNode->layout.dimensions[CSS_HEIGHT] = CSS_UNDEFINED;
    _cssNode->layout.position[CSS_LEFT] = 0;
    _cssNode->layout.position[CSS_TOP] = 0;
    
    [self _frameDidCalculated:isFrameChanged];
    
    for (WXComponent *subcomponent in self.subcomponents) {
        [subcomponent _calculateFrameWithSuperAbsolutePosition:newAboslutePosition gatherDirtyComponents:dirtyComponents];
    }
}

- (void)_layoutDidFinish
{
    WXAssertMainThread();
    
    if ([self isViewLoaded] && !CGRectEqualToRect(_calculatedFrame, self.view.frame)
        && [self isViewFrameSyncWithCalculated]) {
        self.view.frame = _calculatedFrame;
        // transform does not belong to layout, move it to other place hopefully
        if (_transform) {
            _layer.transform = [[WXTransform new] getTransform:_transform withView:self.view withOrigin:_transformOrigin];
        }
        [_layer setNeedsDisplay];
    }
    
    if (_positionType == WXPositionTypeSticky) {
        [self.ancestorScroller adjustSticky];
    }
    
    [self layoutDidFinish];
}

#define WX_STYLE_FILL_CSS_NODE(key, cssProp, type)\
do {\
    id value = styles[@#key];\
    if (value) {\
        _cssNode->style.cssProp = (typeof(_cssNode->style.cssProp))[WXConvert type:value];\
        [self setNeedsLayout];\
    }\
} while(0);

#define WX_STYLE_FILL_CSS_NODE_ALL_DIRECTION(key, cssProp, type) \
do {\
    WX_STYLE_FILL_CSS_NODE(key, cssProp[CSS_TOP], type)\
    WX_STYLE_FILL_CSS_NODE(key, cssProp[CSS_LEFT], type)\
    WX_STYLE_FILL_CSS_NODE(key, cssProp[CSS_RIGHT], type)\
    WX_STYLE_FILL_CSS_NODE(key, cssProp[CSS_BOTTOM], type)\
} while(0);

- (void)_fillCSSNode:(NSDictionary *)styles;
{
    // flex
    WX_STYLE_FILL_CSS_NODE(flex, flex, CGFloat)
    WX_STYLE_FILL_CSS_NODE(flexDirection, flex_direction, css_flex_direction_t)
    WX_STYLE_FILL_CSS_NODE(alignItems, align_items, css_align_t)
    WX_STYLE_FILL_CSS_NODE(alignSelf, align_self, css_align_t)
    WX_STYLE_FILL_CSS_NODE(flexWrap, flex_wrap, css_wrap_type_t)
    WX_STYLE_FILL_CSS_NODE(justifyContent, justify_content, css_justify_t)
    
    // position
    WX_STYLE_FILL_CSS_NODE(position, position_type, css_position_type_t)
    WX_STYLE_FILL_CSS_NODE(top, position[CSS_TOP], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(left, position[CSS_LEFT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(right, position[CSS_RIGHT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(bottom, position[CSS_BOTTOM], WXPixelType)
    
    // dimension
    WX_STYLE_FILL_CSS_NODE(width, dimensions[CSS_WIDTH], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(height, dimensions[CSS_HEIGHT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(minWidth, minDimensions[CSS_WIDTH], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(minHeight, minDimensions[CSS_HEIGHT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(maxWidth, maxDimensions[CSS_WIDTH], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(maxHeight, maxDimensions[CSS_HEIGHT], WXPixelType)
    
    // margin
    WX_STYLE_FILL_CSS_NODE_ALL_DIRECTION(margin, margin, WXPixelType)
    WX_STYLE_FILL_CSS_NODE(marginTop, margin[CSS_TOP], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(marginLeft, margin[CSS_LEFT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(marginRight, margin[CSS_RIGHT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(marginBottom, margin[CSS_BOTTOM], WXPixelType)
    
    // border
    WX_STYLE_FILL_CSS_NODE_ALL_DIRECTION(borderWidth, border, WXPixelType)
    WX_STYLE_FILL_CSS_NODE(borderTopWidth, border[CSS_TOP], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(borderLeftWidth, border[CSS_LEFT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(borderRightWidth, border[CSS_RIGHT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(borderBottomWidth, border[CSS_BOTTOM], WXPixelType)
    
    // padding
    WX_STYLE_FILL_CSS_NODE_ALL_DIRECTION(padding, padding, WXPixelType)
    WX_STYLE_FILL_CSS_NODE(paddingTop, padding[CSS_TOP], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(paddingLeft, padding[CSS_LEFT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(paddingRight, padding[CSS_RIGHT], WXPixelType)
    WX_STYLE_FILL_CSS_NODE(paddingBottom, padding[CSS_BOTTOM], WXPixelType)
}

- (void)_fillAbsolutePositions
{
    CGPoint absolutePosition = self.absolutePosition;
    for (WXComponent *subcomponent in self.subcomponents) {
        subcomponent.absolutePosition = CGPointMake(absolutePosition.x + subcomponent.calculatedFrame.origin.x, absolutePosition.y + subcomponent.calculatedFrame.origin.y);
        [subcomponent _fillAbsolutePositions];
    }
}

#pragma mark CSS Node Override

static void cssNodePrint(void *context)
{
    WXComponent *component = (__bridge WXComponent *)context;
    // TODO:
    printf("%s:%s ", component.ref.UTF8String, component->_type.UTF8String);
}

static css_node_t * cssNodeGetChild(void *context, int i)
{
    WXComponent *component = (__bridge WXComponent *)context;
    
    for (int j = 0; j <= i && j < component.subcomponents.count; j++) {
        WXComponent *child = component.subcomponents[j];
        if (!child->_isNeedJoinLayoutSystem) {
            i++;
        }
    }
    
    if(i >= 0 && i < component.subcomponents.count){
        WXComponent *child = component.subcomponents[i];
        return child->_cssNode;
    }
    
    return NULL;
}

static bool cssNodeIsDirty(void *context)
{
    WXAssertComponentThread();
    
    WXComponent *component = (__bridge WXComponent *)context;
    BOOL needsLayout = [component needsLayout];
    
    return needsLayout;
}

static css_dim_t cssNodeMeasure(void *context, float width, css_measure_mode_t widthMode, float height, css_measure_mode_t heightMode)
{
    WXComponent *component = (__bridge WXComponent *)context;
    CGSize (^measureBlock)(CGSize) = [component measureBlock];
    
    if (!measureBlock) {
        return (css_dim_t){NAN, NAN};
    }
    
    CGSize constrainedSize = CGSizeMake(width, height);
    CGSize resultSize = measureBlock(constrainedSize);
    
    return (css_dim_t){resultSize.width, resultSize.height};
}

@end

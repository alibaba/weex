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
#import "WXComponent_internal.h"
#import "WXSDKInstance_private.h"

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

-(void)_resetCSSNodeStyles:(NSArray *)styles
{
    [self _resetCSSNode:styles];
}

- (void)_recomputeCSSNodeChildren
{
    _cssNode->children_count = (int)[self _childrenCountForLayout];
}

- (NSUInteger)_childrenCountForLayout
{
    NSArray *subcomponents = _subcomponents;
    NSUInteger count = subcomponents.count;
    for (WXComponent *component in subcomponents) {
        if (!component->_isNeedJoinLayoutSystem) {
            count--;
        }
    }
    return (int)(count);
}

- (void)_frameDidCalculated:(BOOL)isChanged
{
    WXAssertComponentThread();
    
    if ([self isViewLoaded] && isChanged && [self isViewFrameSyncWithCalculated]) {
        
        __weak typeof(self) weakSelf = self;
        [self.weexInstance.componentManager _addUITask:^{
            __strong typeof(weakSelf) strongSelf = weakSelf;
            if (strongSelf->_transform && !CATransform3DEqualToTransform(strongSelf.layer.transform, CATransform3DIdentity)) {
                // From the UIView's frame documentation:
                // https://developer.apple.com/reference/uikit/uiview#//apple_ref/occ/instp/UIView/frame
                // Warning : If the transform property is not the identity transform, the value of this property is undefined and therefore should be ignored.
                // So layer's transform must be reset to CATransform3DIdentity before setFrame, otherwise frame will be incorrect
                strongSelf.layer.transform = CATransform3DIdentity;
            }
            
            strongSelf.view.frame = strongSelf.calculatedFrame;
            
            if (strongSelf->_transform) {
                WXTransform *transform = [[WXTransform alloc] initWithInstance:strongSelf.weexInstance];
                strongSelf.layer.transform = [transform getTransform:strongSelf->_transform withView:strongSelf.view withOrigin:strongSelf->_transformOrigin];
            }
            
            [strongSelf setNeedsDisplay];
        }];
    }
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
        [dirtyComponents addObject:self];
    }
    
    CGPoint newAbsolutePosition = [self computeNewAbsolutePosition:superAbsolutePosition];
    
    _cssNode->layout.dimensions[CSS_WIDTH] = CSS_UNDEFINED;
    _cssNode->layout.dimensions[CSS_HEIGHT] = CSS_UNDEFINED;
    _cssNode->layout.position[CSS_LEFT] = 0;
    _cssNode->layout.position[CSS_TOP] = 0;
    
    [self _frameDidCalculated:isFrameChanged];
    
    for (WXComponent *subcomponent in _subcomponents) {
        [subcomponent _calculateFrameWithSuperAbsolutePosition:newAbsolutePosition gatherDirtyComponents:dirtyComponents];
    }
}

- (CGPoint)computeNewAbsolutePosition:(CGPoint)superAbsolutePosition
{
    // Not need absolutePosition any more
 //   [self _computeNewAbsolutePosition:superAbsolutePosition];
    return superAbsolutePosition;
}

- (CGPoint)_computeNewAbsolutePosition:(CGPoint)superAbsolutePosition
{
    CGPoint newAbsolutePosition = CGPointMake(WXRoundPixelValue(superAbsolutePosition.x + _cssNode->layout.position[CSS_LEFT]),
                                              WXRoundPixelValue(superAbsolutePosition.y + _cssNode->layout.position[CSS_TOP]));
    
    if(!CGPointEqualToPoint(_absolutePosition, newAbsolutePosition)){
        _absolutePosition = newAbsolutePosition;
    }
    
    return newAbsolutePosition;
}

- (void)_layoutDidFinish
{
    WXAssertMainThread();
    
    if (_positionType == WXPositionTypeSticky) {
        [self.ancestorScroller adjustSticky];
    }
    
    [self layoutDidFinish];
}

#define WX_STYLE_FILL_CSS_NODE(key, cssProp, type)\
do {\
    id value = styles[@#key];\
    if (value) {\
        typeof(_cssNode->style.cssProp) convertedValue = (typeof(_cssNode->style.cssProp))[WXConvert type:value];\
        _cssNode->style.cssProp = convertedValue;\
        [self setNeedsLayout];\
    }\
} while(0);

#define WX_STYLE_FILL_CSS_NODE_PIXEL(key, cssProp)\
do {\
    id value = styles[@#key];\
    if (value) {\
        CGFloat pixel = [self WXPixelType:value];\
        if (isnan(pixel)) {\
            WXLogError(@"Invalid NaN value for style:%@, ref:%@", @#key, self.ref);\
        } else {\
            _cssNode->style.cssProp = pixel;\
            [self setNeedsLayout];\
        }\
    }\
} while(0);

#define WX_STYLE_FILL_CSS_NODE_ALL_DIRECTION(key, cssProp)\
do {\
    WX_STYLE_FILL_CSS_NODE_PIXEL(key, cssProp[CSS_TOP])\
    WX_STYLE_FILL_CSS_NODE_PIXEL(key, cssProp[CSS_LEFT])\
    WX_STYLE_FILL_CSS_NODE_PIXEL(key, cssProp[CSS_RIGHT])\
    WX_STYLE_FILL_CSS_NODE_PIXEL(key, cssProp[CSS_BOTTOM])\
} while(0);


- (CGFloat)WXPixelType:(id)value
{
    return [WXConvert WXPixelType:value scaleFactor:self.weexInstance.pixelScaleFactor];
}

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
    WX_STYLE_FILL_CSS_NODE_PIXEL(top, position[CSS_TOP])
    WX_STYLE_FILL_CSS_NODE_PIXEL(left, position[CSS_LEFT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(right, position[CSS_RIGHT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(bottom, position[CSS_BOTTOM])
    
    // dimension
    WX_STYLE_FILL_CSS_NODE_PIXEL(width, dimensions[CSS_WIDTH])
    WX_STYLE_FILL_CSS_NODE_PIXEL(height, dimensions[CSS_HEIGHT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(minWidth, minDimensions[CSS_WIDTH])
    WX_STYLE_FILL_CSS_NODE_PIXEL(minHeight, minDimensions[CSS_HEIGHT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(maxWidth, maxDimensions[CSS_WIDTH])
    WX_STYLE_FILL_CSS_NODE_PIXEL(maxHeight, maxDimensions[CSS_HEIGHT])
    
    // margin
    WX_STYLE_FILL_CSS_NODE_ALL_DIRECTION(margin, margin)
    WX_STYLE_FILL_CSS_NODE_PIXEL(marginTop, margin[CSS_TOP])
    WX_STYLE_FILL_CSS_NODE_PIXEL(marginLeft, margin[CSS_LEFT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(marginRight, margin[CSS_RIGHT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(marginBottom, margin[CSS_BOTTOM])
    
    // border
    WX_STYLE_FILL_CSS_NODE_ALL_DIRECTION(borderWidth, border)
    WX_STYLE_FILL_CSS_NODE_PIXEL(borderTopWidth, border[CSS_TOP])
    WX_STYLE_FILL_CSS_NODE_PIXEL(borderLeftWidth, border[CSS_LEFT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(borderRightWidth, border[CSS_RIGHT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(borderBottomWidth, border[CSS_BOTTOM])
    
    // padding
    WX_STYLE_FILL_CSS_NODE_ALL_DIRECTION(padding, padding)
    WX_STYLE_FILL_CSS_NODE_PIXEL(paddingTop, padding[CSS_TOP])
    WX_STYLE_FILL_CSS_NODE_PIXEL(paddingLeft, padding[CSS_LEFT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(paddingRight, padding[CSS_RIGHT])
    WX_STYLE_FILL_CSS_NODE_PIXEL(paddingBottom, padding[CSS_BOTTOM])
}

#define WX_STYLE_RESET_CSS_NODE(key, cssProp, defaultValue)\
do {\
    if (styles && [styles containsObject:@#key]) {\
        _cssNode->style.cssProp = defaultValue;\
        [self setNeedsLayout];\
    }\
} while(0);

#define WX_STYLE_RESET_CSS_NODE_ALL_DIRECTION(key, cssProp, defaultValue)\
do {\
    WX_STYLE_RESET_CSS_NODE(key, cssProp[CSS_TOP], defaultValue)\
    WX_STYLE_RESET_CSS_NODE(key, cssProp[CSS_LEFT], defaultValue)\
    WX_STYLE_RESET_CSS_NODE(key, cssProp[CSS_RIGHT], defaultValue)\
    WX_STYLE_RESET_CSS_NODE(key, cssProp[CSS_BOTTOM], defaultValue)\
} while(0);

- (void)_resetCSSNode:(NSArray *)styles;
{
    // flex
    WX_STYLE_RESET_CSS_NODE(flex, flex, 0.0)
    WX_STYLE_RESET_CSS_NODE(flexDirection, flex_direction, CSS_FLEX_DIRECTION_COLUMN)
    WX_STYLE_RESET_CSS_NODE(alignItems, align_items, CSS_ALIGN_STRETCH)
    WX_STYLE_RESET_CSS_NODE(alignSelf, align_self, CSS_ALIGN_AUTO)
    WX_STYLE_RESET_CSS_NODE(flexWrap, flex_wrap, CSS_NOWRAP)
    WX_STYLE_RESET_CSS_NODE(justifyContent, justify_content, CSS_JUSTIFY_FLEX_START)

    // position
    WX_STYLE_RESET_CSS_NODE(position, position_type, CSS_POSITION_RELATIVE)
    WX_STYLE_RESET_CSS_NODE(top, position[CSS_TOP], CSS_UNDEFINED)
    WX_STYLE_RESET_CSS_NODE(left, position[CSS_LEFT], CSS_UNDEFINED)
    WX_STYLE_RESET_CSS_NODE(right, position[CSS_RIGHT], CSS_UNDEFINED)
    WX_STYLE_RESET_CSS_NODE(bottom, position[CSS_BOTTOM], CSS_UNDEFINED)
    
    // dimension
    WX_STYLE_RESET_CSS_NODE(width, dimensions[CSS_WIDTH], CSS_UNDEFINED)
    WX_STYLE_RESET_CSS_NODE(height, dimensions[CSS_HEIGHT], CSS_UNDEFINED)
    WX_STYLE_RESET_CSS_NODE(minWidth, minDimensions[CSS_WIDTH], CSS_UNDEFINED)
    WX_STYLE_RESET_CSS_NODE(minHeight, minDimensions[CSS_HEIGHT], CSS_UNDEFINED)
    WX_STYLE_RESET_CSS_NODE(maxWidth, maxDimensions[CSS_WIDTH], CSS_UNDEFINED)
    WX_STYLE_RESET_CSS_NODE(maxHeight, maxDimensions[CSS_HEIGHT], CSS_UNDEFINED)
    
    // margin
    WX_STYLE_RESET_CSS_NODE_ALL_DIRECTION(margin, margin, 0.0)
    WX_STYLE_RESET_CSS_NODE(marginTop, margin[CSS_TOP], 0.0)
    WX_STYLE_RESET_CSS_NODE(marginLeft, margin[CSS_LEFT], 0.0)
    WX_STYLE_RESET_CSS_NODE(marginRight, margin[CSS_RIGHT], 0.0)
    WX_STYLE_RESET_CSS_NODE(marginBottom, margin[CSS_BOTTOM], 0.0)
    
    // border
    WX_STYLE_RESET_CSS_NODE_ALL_DIRECTION(borderWidth, border, 0.0)
    WX_STYLE_RESET_CSS_NODE(borderTopWidth, border[CSS_TOP], 0.0)
    WX_STYLE_RESET_CSS_NODE(borderLeftWidth, border[CSS_LEFT], 0.0)
    WX_STYLE_RESET_CSS_NODE(borderRightWidth, border[CSS_RIGHT], 0.0)
    WX_STYLE_RESET_CSS_NODE(borderBottomWidth, border[CSS_BOTTOM], 0.0)
    
    // padding
    WX_STYLE_RESET_CSS_NODE_ALL_DIRECTION(padding, padding, 0.0)
    WX_STYLE_RESET_CSS_NODE(paddingTop, padding[CSS_TOP], 0.0)
    WX_STYLE_RESET_CSS_NODE(paddingLeft, padding[CSS_LEFT], 0.0)
    WX_STYLE_RESET_CSS_NODE(paddingRight, padding[CSS_RIGHT], 0.0)
    WX_STYLE_RESET_CSS_NODE(paddingBottom, padding[CSS_BOTTOM], 0.0)
}

- (void)_fillAbsolutePositions
{
    CGPoint absolutePosition = _absolutePosition;
    NSArray *subcomponents = self.subcomponents;
    for (WXComponent *subcomponent in subcomponents) {
        subcomponent->_absolutePosition = CGPointMake(absolutePosition.x + subcomponent.calculatedFrame.origin.x, absolutePosition.y + subcomponent.calculatedFrame.origin.y);
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
    NSArray *subcomponents = component->_subcomponents;
    for (int j = 0; j <= i && j < subcomponents.count; j++) {
        WXComponent *child = subcomponents[j];
        if (!child->_isNeedJoinLayoutSystem) {
            i++;
        }
    }
    
    if(i >= 0 && i < subcomponents.count){
        WXComponent *child = subcomponents[i];
        return child->_cssNode;
    }
    
    
    WXAssert(NO, @"Can not find component:%@'s css node child at index: %ld, totalCount:%ld", component, i, subcomponents.count);
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

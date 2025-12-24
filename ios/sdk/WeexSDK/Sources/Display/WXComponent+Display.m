/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import "WXComponent+Display.h"
#import "WXComponent.h"
#import "WXComponent_internal.h"
#import "WXComponent+BoxShadow.h"
#import "WXLayer.h"
#import "WXAssert.h"
#import "WXUtility.h"
#import "WXDisplayQueue.h"
#import "WXThreadSafeCounter.h"
#import "UIBezierPath+Weex.h"
#import "WXRoundedRect.h"
#import "WXSDKInstance.h"
#import "WXDarkSchemeProtocol.h"
#import "WXHandlerFactory.h"

#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"

typedef NS_ENUM(NSInteger, WXComponentBorderRecord) {
    WXComponentBorderRecordNone = 0,
    WXComponentBorderRecordTop = 1,
    WXComponentBorderRecordRight = 1 << 1,
    WXComponentBorderRecordBottom = 1 << 2,
    WXComponentBorderRecordLeft = 1 << 3,
    WXComponentBorderRecordAll = WXComponentBorderRecordTop | WXComponentBorderRecordRight | WXComponentBorderRecordBottom | WXComponentBorderRecordLeft
};

@implementation WXComponent (Display)

#pragma mark Public

- (void)setNeedsDisplay
{
    WXAssertMainThread();
    
    if (_isCompositingChild) {
        WXComponent *supercomponent = self.supercomponent;
        while (supercomponent) {
            if (supercomponent->_useCompositing) {
                break;
            }
            supercomponent = supercomponent.supercomponent;
        }
        [supercomponent setNeedsDisplay];
    } else if (!_layer || _layer.frame.size.width ==0 || _layer.frame.size.height == 0) {
        return;
    } else {
        [_layer setNeedsDisplay];
    }
}

- (BOOL)needsDrawRect
{
    if (_useCompositing || _isCompositingChild) {
        return YES;
    }
    
    if (![self _needsDrawBorder] && _lastBorderRecords == WXComponentBorderRecordNone) {
        WXLogDebug(@"No need to draw border for %@", self.ref);
        WXPerformBlockOnMainThread(^{
            [self _resetNativeBorderRadius];
        });
        
        return NO;
    }
    
    return YES;
}

- (UIImage *)drawRect:(CGRect)rect
{
    CGSize size = rect.size;
    if (size.width <= 0 || size.height <= 0) {
        WXLogDebug(@"No need to draw border for %@, because width or height is zero", self.ref);
        return nil;
    }
    
    CGContextRef context = UIGraphicsGetCurrentContext();
    [self _drawBorderWithContext:context size:size];

    return nil;
}

- (void)didFinishDrawingLayer:(BOOL)success
{
    WXAssertMainThread();
}

- (void)schemeDidChange:(NSString*)scheme
{
    WXAssertMainThread();
    if (_view) {
        if (![self _needsDrawBorder]) {
            _layer.borderColor = [self.weexInstance chooseColor:_borderTopColor lightSchemeColor:_lightSchemeBorderTopColor darkSchemeColor:_darkSchemeBorderTopColor invert:self.invertForDarkScheme scene:[self colorSceneType]].CGColor;
            _layer.backgroundColor = [self.weexInstance chooseColor:self.styleBackgroundColor lightSchemeColor:self.lightSchemeBackgroundColor darkSchemeColor:self.darkSchemeBackgroundColor invert:self.invertForDarkScheme scene:[self colorSceneType]].CGColor;
        }
        else {
            [self setNeedsDisplay];
        }
        
        if (_backgroundImage) {
            [self setGradientLayer];
        }
        
        WXBoxShadow* usingBoxShadow = [self _chooseBoxShadow];
        if (usingBoxShadow) {
            _lastBoxShadow = usingBoxShadow;
            [self configBoxShadow:usingBoxShadow];
        }
    }
}

- (WXColorScene)colorSceneType
{
    return WXColorSceneUnknown;
}

#pragma mark Private

- (WXDisplayBlock)_displayBlock
{
    __weak WXComponent* wself = self;
    WXDisplayBlock displayBlock = ^UIImage *(CGRect bounds, BOOL(^isCancelled)(void)) {
        if (isCancelled()) {
            return nil;
        }
        
        __strong WXComponent* sself = wself;
        if (sself) {
            CGFloat width = bounds.size.width ?: 1;
            CGFloat height = bounds.size.height ?: 1;
            CGSize size = CGSizeMake(width, height);
            UIGraphicsBeginImageContextWithOptions(bounds.size, [sself _bitmapOpaqueWithSize:bounds.size] , 0.0);
            UIImage *image = [sself drawRect:bounds];
            if (!image) {
                image = UIGraphicsGetImageFromCurrentImageContext();
            }
            UIGraphicsEndImageContext();
            
            return image;
        }
        else {
            return nil;
        }
    };
    
    return displayBlock;
}

- (WXDisplayCompletionBlock)_displayCompletionBlock
{
    __weak typeof(self) weakSelf = self;
    return ^(CALayer *layer, BOOL finished) {
        [weakSelf didFinishDrawingLayer:finished];
    };
}

- (void)_initCompositingAttribute:(NSDictionary *)attributes
{
    _useCompositing = attributes[@"compositing"] ? [WXConvert BOOL:attributes[@"compositing"]] : NO;
}

- (void)_willDisplayLayer:(CALayer *)layer
{
    WXAssertMainThread();
    
    if (_isCompositingChild) {
        // compsiting children do not have own layers, so return here.
        return;
    }
    
    CGRect displayBounds = CGRectMake(0, 0, self.calculatedFrame.size.width, self.calculatedFrame.size.height);
    
    BOOL needsDrawRect = [self needsDrawRect];
    WXDisplayBlock displayBlock;
    if (_useCompositing) {
        displayBlock = [self _compositeDisplayBlock];
    } else {
        displayBlock = [self _displayBlock];
    }
    WXDisplayCompletionBlock completionBlock = [self _displayCompletionBlock];
    
    if (!displayBlock || !needsDrawRect) {
        if (completionBlock) {
            completionBlock(layer, NO);
        }
        return;
    }
    
    if (_async) {
        WXThreadSafeCounter *displayCounter = _displayCounter;
        int32_t displayValue = [displayCounter increase];
        BOOL (^isCancelled)(void) = ^BOOL(){
            return displayValue != displayCounter.value;
        };
        
        [WXDisplayQueue addBlock:^{
            if (isCancelled()) {
                if (completionBlock) {
                    dispatch_async(dispatch_get_main_queue(), ^{
                        completionBlock(layer, NO);
                    });
                }
                return;
            }
            
            UIImage *image = displayBlock(displayBounds, isCancelled);
            
            dispatch_async(dispatch_get_main_queue(), ^{
                if (isCancelled()) {
                    if (completionBlock) {
                        completionBlock(layer, NO);
                    }
                    return;
                }
                
                layer.contents = (id)(image.CGImage);
                
                if (completionBlock) {
                    completionBlock(layer, YES);
                }
            });
            
        }];
    } else {
        UIImage *image = displayBlock(displayBounds, ^BOOL(){
            return NO;
        });
        
        _layer.contents = (id)image.CGImage;
        
        if (completionBlock) {
            completionBlock(layer, YES);
        }
    }
}

- (void)triggerDisplay
{
    WXPerformBlockOnMainThread(^{
        [self _willDisplayLayer:_layer];
    });
}

- (CGContextRef)beginDrawContext:(CGRect)bounds
{
    CGFloat width = bounds.size.width ?: 1;
    CGFloat height = bounds.size.height ?: 1;
    CGSize size = CGSizeMake(width, height);
    UIGraphicsBeginImageContextWithOptions(size, [self _bitmapOpaqueWithSize:size], 0.0);
    CGContextRef context = UIGraphicsGetCurrentContext();
    
//    float scaleFactor = [[UIScreen mainScreen] scale];
//    CGColorSpaceRef	colorSpace = CGColorSpaceCreateDeviceRGB();
//    CGContextRef context = CGBitmapContextCreate(NULL, bounds.size.width * scaleFactor, bounds.size.height * scaleFactor, 8, 4 * bounds.size.width * scaleFactor, colorSpace, kCGImageAlphaPremultipliedLast | kCGBitmapByteOrder32Big);
//    CGContextScaleCTM(context, scaleFactor, scaleFactor);
//
//    // Adjusts position and invert the image.
//    // The OpenGL uses the image data upside-down compared commom image files.
//    CGContextTranslateCTM(context, 0, bounds.size.height);
//    CGContextScaleCTM(context, 1.0, -1.0);
//    
//    CGColorSpaceRelease(colorSpace);
    
    return context;
}

- (UIImage *)endDrawContext:(CGContextRef)context
{
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
//    CGImageRef imageRef= CGBitmapContextCreateImage(context);
//    UIImage *image = [[UIImage alloc] initWithCGImage:imageRef];
//    CGContextRelease(context);
    
    return image;
}

- (WXDisplayBlock)_compositeDisplayBlock
{
    return ^UIImage* (CGRect bounds, BOOL(^isCancelled)(void)) {
        if (isCancelled()) {
            return nil;
        }
        NSMutableArray *displayBlocks = [NSMutableArray array];
        
        CGContextRef context = [self beginDrawContext:bounds];
        
        UIGraphicsPushContext(context);
        
        [self _collectCompositingDisplayBlocks:displayBlocks context:context isCancelled:isCancelled];
        
        for (dispatch_block_t block in displayBlocks) {
            if (isCancelled()) {
                [self endDrawContext:context];
                return nil;
            }
            block();
        }
        
        UIGraphicsPopContext();
        
        UIImage *image = [self endDrawContext:context];
        return image;
    };
}

- (void)_collectCompositingDisplayBlocks:(NSMutableArray *)displayBlocks context:(CGContextRef)context isCancelled:(BOOL(^)(void))isCancelled
{
    // TODO: compositingChild has no chance to applyPropertiesToView, need update here?
    UIColor *backgroundColor = [self.weexInstance chooseColor:self.styleBackgroundColor lightSchemeColor:self.lightSchemeBackgroundColor darkSchemeColor:self.darkSchemeBackgroundColor invert:self.invertForDarkScheme scene:[self colorSceneType]];
    BOOL clipsToBounds = _clipToBounds;
    CGRect frame = self.calculatedFrame;
    CGRect bounds = CGRectMake(0, 0, frame.size.width, frame.size.height);
    
    if (_useCompositing) {
        frame.origin = CGPointMake(0, 0);
    }
    
    BOOL needsDrawRect = [self needsDrawRect];
    
    BOOL shouldDisplay = needsDrawRect && (backgroundColor || CGPointEqualToPoint(CGPointZero, frame.origin) == NO || clipsToBounds);
    
    if (shouldDisplay) {
        dispatch_block_t displayBlockToPush = ^{
            CGContextSaveGState(context);
            CGContextTranslateCTM(context, frame.origin.x, frame.origin.y);
            
            if (isCancelled && isCancelled()) {
                return ;
            }
            
            if (_isCompositingChild && clipsToBounds) {
                [[UIBezierPath bezierPathWithRect:bounds] addClip];
            }
            
            UIImage *image = [self drawRect:bounds];
            if (image) {
                [image drawInRect:bounds];
            }
        };
        [displayBlocks addObject:[displayBlockToPush copy]];
    }
    
    for (WXComponent *component in self.subcomponents) {
        if (!isCancelled()) {
            [component _collectCompositingDisplayBlocks:displayBlocks context:context isCancelled:isCancelled];
        }
    }
    
    if (shouldDisplay) {
        dispatch_block_t blockToPop = ^{
            CGContextRestoreGState(context);
        };
        [displayBlocks addObject:[blockToPop copy]];
    }
}

#pragma mark Border Drawing

- (void)_drawBorderWithContext:(CGContextRef)context size:(CGSize)size
{
    CGRect rect = CGRectMake(0, 0, size.width, size.height);
    WXRoundedRect *borderRect = [[WXRoundedRect alloc] initWithRect:rect topLeft:_borderTopLeftRadius topRight:_borderTopRightRadius bottomLeft:_borderBottomLeftRadius bottomRight:_borderBottomRightRadius];
    // here is computed radii, do not use original style
    WXRadii *radii = borderRect.radii;
    CGFloat topLeft = radii.topLeft, topRight = radii.topRight, bottomLeft = radii.bottomLeft, bottomRight = radii.bottomRight;
    
    CGContextSetAlpha(context, _opacity);
    // fill background color
    UIColor* bgColor = [self.weexInstance chooseColor:self.styleBackgroundColor lightSchemeColor:self.lightSchemeBackgroundColor darkSchemeColor:self.darkSchemeBackgroundColor invert:self.invertForDarkScheme scene:[self colorSceneType]];
    
    if (bgColor && [bgColor respondsToSelector:@selector(CGColor)]) {
        if (CGColorGetAlpha(bgColor.CGColor) > 0) {
            CGContextSetFillColorWithColor(context, bgColor.CGColor);
            UIBezierPath *bezierPath = [UIBezierPath wx_bezierPathWithRoundedRect:rect topLeft:topLeft topRight:topRight bottomLeft:bottomLeft bottomRight:bottomRight];
            [bezierPath fill];
            __weak WXComponent* wself = self;
            WXPerformBlockOnMainThread(^{
                __strong WXComponent* sself = wself;
                if (sself) {
                    sself->_view.backgroundColor = UIColor.clearColor;
                }
            });
        }
    }
    // Top
    if (_borderTopWidth > 0) {
        if(_borderTopStyle == WXBorderStyleDashed || _borderTopStyle == WXBorderStyleDotted){
            CGFloat lengths[2];
            lengths[0] = lengths[1] = (_borderTopStyle == WXBorderStyleDashed ? 3 : 1) * _borderTopWidth;
            CGContextSetLineDash(context, 0, lengths, sizeof(lengths) / sizeof(*lengths));
        } else{
            CGContextSetLineDash(context, 0, 0, 0);
        }
        CGContextSetLineWidth(context, _borderTopWidth);
        CGContextSetStrokeColorWithColor(context,
                                         [self.weexInstance chooseColor:_borderTopColor lightSchemeColor:_lightSchemeBorderTopColor darkSchemeColor:_darkSchemeBorderTopColor invert:self.invertForDarkScheme scene:[self colorSceneType]].CGColor);
        CGContextAddArc(context, size.width-topRight, topRight, topRight-_borderTopWidth/2, -M_PI_4+(_borderRightWidth>0?0:M_PI_4), -M_PI_2, 1);
        CGContextMoveToPoint(context, size.width-topRight, _borderTopWidth/2);
        CGContextAddLineToPoint(context, topLeft, _borderTopWidth/2);
        CGContextAddArc(context, topLeft, topLeft, topLeft-_borderTopWidth/2, -M_PI_2, -M_PI_2-M_PI_4-(_borderLeftWidth>0?0:M_PI_4), 1);
        CGContextStrokePath(context);
        _lastBorderRecords |= WXComponentBorderRecordTop;
    } else {
        _lastBorderRecords &= ~(WXComponentBorderRecordTop);
    }
    
    // Left
    if (_borderLeftWidth > 0) {
        if(_borderLeftStyle == WXBorderStyleDashed || _borderLeftStyle == WXBorderStyleDotted){
            CGFloat lengths[2];
            lengths[0] = lengths[1] = (_borderLeftStyle == WXBorderStyleDashed ? 3 : 1) * _borderLeftWidth;
            CGContextSetLineDash(context, 0, lengths, sizeof(lengths) / sizeof(*lengths));
        } else{
            CGContextSetLineDash(context, 0, 0, 0);
        }
        CGContextSetLineWidth(context, _borderLeftWidth);
        CGContextSetStrokeColorWithColor(context,
                                         [self.weexInstance chooseColor:_borderLeftColor lightSchemeColor:_lightSchemeBorderLeftColor darkSchemeColor:_darkSchemeBorderLeftColor invert:self.invertForDarkScheme scene:[self colorSceneType]].CGColor);
        CGContextAddArc(context, topLeft, topLeft, topLeft-_borderLeftWidth/2, -M_PI, -M_PI_2-M_PI_4+(_borderTopWidth > 0?0:M_PI_4), 0);
        CGContextMoveToPoint(context, _borderLeftWidth/2, topLeft);
        CGContextAddLineToPoint(context, _borderLeftWidth/2, size.height-bottomLeft);
        CGContextAddArc(context, bottomLeft, size.height-bottomLeft, bottomLeft-_borderLeftWidth/2, M_PI, M_PI-M_PI_4-(_borderBottomWidth>0?0:M_PI_4), 1);
        CGContextStrokePath(context);
        _lastBorderRecords |= WXComponentBorderRecordLeft;
    } else {
        _lastBorderRecords &= ~WXComponentBorderRecordLeft;
    }
    
    // Bottom
    if (_borderBottomWidth > 0) {
        if(_borderBottomStyle == WXBorderStyleDashed || _borderBottomStyle == WXBorderStyleDotted){
            CGFloat lengths[2];
            lengths[0] = lengths[1] = (_borderBottomStyle == WXBorderStyleDashed ? 3 : 1) * _borderBottomWidth;
            CGContextSetLineDash(context, 0, lengths, sizeof(lengths) / sizeof(*lengths));
        } else{
            CGContextSetLineDash(context, 0, 0, 0);
        }
        CGContextSetLineWidth(context, _borderBottomWidth);
        CGContextSetStrokeColorWithColor(context,
                                         [self.weexInstance chooseColor:_borderBottomColor lightSchemeColor:_lightSchemeBorderBottomColor darkSchemeColor:_darkSchemeBorderBottomColor invert:self.invertForDarkScheme scene:[self colorSceneType]].CGColor);
        CGContextAddArc(context, bottomLeft, size.height-bottomLeft, bottomLeft-_borderBottomWidth/2, M_PI-M_PI_4+(_borderLeftWidth>0?0:M_PI_4), M_PI_2, 1);
        CGContextMoveToPoint(context, bottomLeft, size.height-_borderBottomWidth/2);
        CGContextAddLineToPoint(context, size.width-bottomRight, size.height-_borderBottomWidth/2);
        CGContextAddArc(context, size.width-bottomRight, size.height-bottomRight, bottomRight-_borderBottomWidth/2, M_PI_2, M_PI_4-(_borderRightWidth > 0?0:M_PI_4), 1);
        CGContextStrokePath(context);
        _lastBorderRecords |= WXComponentBorderRecordBottom;
    } else {
        _lastBorderRecords &= ~WXComponentBorderRecordBottom;
    }
    
    // Right
    if (_borderRightWidth > 0) {
        if(_borderRightStyle == WXBorderStyleDashed || _borderRightStyle == WXBorderStyleDotted){
            CGFloat lengths[2];
            lengths[0] = lengths[1] = (_borderRightStyle == WXBorderStyleDashed ? 3 : 1) * _borderRightWidth;
            CGContextSetLineDash(context, 0, lengths, sizeof(lengths) / sizeof(*lengths));
        } else{
            CGContextSetLineDash(context, 0, 0, 0);
        }
        CGContextSetLineWidth(context, _borderRightWidth);
        CGContextSetStrokeColorWithColor(context,
                                         [self.weexInstance chooseColor:_borderRightColor lightSchemeColor:_lightSchemeBorderRightColor darkSchemeColor:_darkSchemeBorderRightColor invert:self.invertForDarkScheme scene:[self colorSceneType]].CGColor);
        CGContextAddArc(context, size.width-bottomRight, size.height-bottomRight, bottomRight-_borderRightWidth/2, M_PI_4+(_borderBottomWidth>0?0:M_PI_4), 0, 1);
        CGContextMoveToPoint(context, size.width-_borderRightWidth/2, size.height-bottomRight);
        CGContextAddLineToPoint(context, size.width-_borderRightWidth/2, topRight);
        CGContextAddArc(context, size.width-topRight, topRight, topRight-_borderRightWidth/2, 0, -M_PI_4-(_borderTopWidth > 0?0:M_PI_4), 1);
        CGContextStrokePath(context);
        _lastBorderRecords |= WXComponentBorderRecordRight;
    } else {
        _lastBorderRecords &= ~WXComponentBorderRecordRight;
    }

    CGContextStrokePath(context);
    
    //clipRadius is beta feature
    //TO DO: remove _clipRadius property
    if (_clipToBounds && _clipRadius) {
        BOOL radiusEqual = _borderTopLeftRadius == _borderTopRightRadius && _borderTopRightRadius == _borderBottomRightRadius && _borderBottomRightRadius == _borderBottomLeftRadius;
        if (!radiusEqual) {
            self.layer.mask = [self drawBorderRadiusMaskLayer:rect];
        }
    }
}

- (BOOL)_needsDrawBorder
{
    if (_isCompositingChild) {
        return YES;
    }
    
    if (![_layer isKindOfClass:[WXLayer class]]) {
        // Only support WXLayer
        return NO;
    }
    // Set border property for most of components because border drawing consumes a lot of memory (v0.6.0)
//    if (_async) {
//        // Async layer always draw border
//        return YES;
//    }
    if (!(_borderLeftStyle == _borderTopStyle &&
          _borderTopStyle == _borderRightStyle &&
          _borderRightStyle == _borderBottomStyle &&
          _borderBottomStyle == WXBorderStyleSolid)
        ) {
        // Native border property doesn't support dashed or dotted border
        return YES;
    }
    
    // user native border property only when border width & color & radius are equal;
    BOOL widthEqual = _borderTopWidth == _borderRightWidth && _borderRightWidth == _borderBottomWidth && _borderBottomWidth == _borderLeftWidth;
    if (!widthEqual) {
        return YES;
    }
    BOOL radiusEqual = _borderTopLeftRadius == _borderTopRightRadius && _borderTopRightRadius == _borderBottomRightRadius && _borderBottomRightRadius == _borderBottomLeftRadius;
    if (!radiusEqual) {
        return YES;
    }
    
    BOOL invert = self.invertForDarkScheme;
    WXColorScene scene = [self colorSceneType];
    UIColor* usingBorderTopColor = [self.weexInstance chooseColor:_borderTopColor lightSchemeColor:_lightSchemeBorderTopColor darkSchemeColor:_darkSchemeBorderTopColor invert:invert scene:scene];
    UIColor* usingBorderRightColor = [self.weexInstance chooseColor:_borderRightColor lightSchemeColor:_lightSchemeBorderRightColor darkSchemeColor:_darkSchemeBorderRightColor invert:invert scene:scene];
    UIColor* usingBorderBottomColor = [self.weexInstance chooseColor:_borderBottomColor lightSchemeColor:_lightSchemeBorderBottomColor darkSchemeColor:_darkSchemeBorderBottomColor invert:invert scene:scene];
    UIColor* usingBorderLeftColor = [self.weexInstance chooseColor:_borderLeftColor lightSchemeColor:_lightSchemeBorderLeftColor darkSchemeColor:_darkSchemeBorderLeftColor invert:invert scene:scene];
    
    BOOL colorEqual = [usingBorderTopColor isEqual:usingBorderRightColor] &&
        [usingBorderRightColor isEqual:usingBorderBottomColor] &&
        [usingBorderBottomColor isEqual:usingBorderLeftColor];
    if (!colorEqual) {
        return YES;
    }
    
    return NO;
}

- (void)_handleBorders:(NSDictionary *)styles isUpdating:(BOOL)updating
{
    if (!updating) {
        // init with default value
        _borderTopStyle = _borderRightStyle = _borderBottomStyle = _borderLeftStyle = WXBorderStyleSolid;
        _borderTopColor = _borderLeftColor = _borderRightColor = _borderBottomColor = [UIColor blackColor];
        _borderTopWidth = _borderLeftWidth = _borderRightWidth = _borderBottomWidth = 0;
        _borderTopLeftRadius = _borderTopRightRadius = _borderBottomLeftRadius = _borderBottomRightRadius = 0;
    }
    
    BOOL previousNeedsDrawBorder = YES;
    if (updating) {
        previousNeedsDrawBorder = [self _needsDrawBorder];
    }
    
#define WX_CHECK_BORDER_PROP(prop, direction1, direction2, direction3, direction4, type)\
do {\
    BOOL needsDisplay = NO; \
    NSString *styleProp= WX_NSSTRING(WX_CONCAT(border, prop));\
    if (styles[styleProp]) {\
        _border##direction1##prop = _border##direction2##prop = _border##direction3##prop = _border##direction4##prop = [WXConvert type:styles[styleProp]];\
        needsDisplay = YES;\
    }\
    NSString *styleDirection1Prop = WX_NSSTRING(WX_CONCAT_TRIPLE(border, direction1, prop));\
    if (styles[styleDirection1Prop]) {\
        _border##direction1##prop = [WXConvert type:styles[styleDirection1Prop]];\
        needsDisplay = YES;\
    }\
    NSString *styleDirection2Prop = WX_NSSTRING(WX_CONCAT_TRIPLE(border, direction2, prop));\
    if (styles[styleDirection2Prop]) {\
        _border##direction2##prop = [WXConvert type:styles[styleDirection2Prop]];\
        needsDisplay = YES;\
    }\
    NSString *styleDirection3Prop = WX_NSSTRING(WX_CONCAT_TRIPLE(border, direction3, prop));\
    if (styles[styleDirection3Prop]) {\
        _border##direction3##prop = [WXConvert type:styles[styleDirection3Prop]];\
        needsDisplay = YES;\
    }\
    NSString *styleDirection4Prop = WX_NSSTRING(WX_CONCAT_TRIPLE(border, direction4, prop));\
    if (styles[styleDirection4Prop]) {\
        _border##direction4##prop = [WXConvert type:styles[styleDirection4Prop]];\
        needsDisplay = YES;\
    }\
    if (needsDisplay && updating) {\
        [self setNeedsDisplay];\
    }\
} while (0);
    
// TODO: refactor this hopefully
#define WX_CHECK_BORDER_PROP_PIXEL(prop, direction1, direction2, direction3, direction4)\
do {\
    BOOL needsDisplay = NO; \
    NSString *styleProp= WX_NSSTRING(WX_CONCAT(border, prop));\
    if (styles[styleProp]) {\
        _border##direction1##prop = _border##direction2##prop = _border##direction3##prop = _border##direction4##prop = [WXConvert WXPixelType:styles[styleProp] scaleFactor:self.weexInstance.pixelScaleFactor];\
    needsDisplay = YES;\
    }\
    NSString *styleDirection1Prop = WX_NSSTRING(WX_CONCAT_TRIPLE(border, direction1, prop));\
    if (styles[styleDirection1Prop]) {\
        _border##direction1##prop = [WXConvert WXPixelType:styles[styleDirection1Prop] scaleFactor:self.weexInstance.pixelScaleFactor];\
        needsDisplay = YES;\
    }\
    NSString *styleDirection2Prop = WX_NSSTRING(WX_CONCAT_TRIPLE(border, direction2, prop));\
    if (styles[styleDirection2Prop]) {\
        _border##direction2##prop = [WXConvert WXPixelType:styles[styleDirection2Prop] scaleFactor:self.weexInstance.pixelScaleFactor];\
        needsDisplay = YES;\
    }\
    NSString *styleDirection3Prop = WX_NSSTRING(WX_CONCAT_TRIPLE(border, direction3, prop));\
    if (styles[styleDirection3Prop]) {\
        _border##direction3##prop = [WXConvert WXPixelType:styles[styleDirection3Prop] scaleFactor:self.weexInstance.pixelScaleFactor];\
        needsDisplay = YES;\
    }\
    NSString *styleDirection4Prop = WX_NSSTRING(WX_CONCAT_TRIPLE(border, direction4, prop));\
    if (styles[styleDirection4Prop]) {\
        _border##direction4##prop = [WXConvert WXPixelType:styles[styleDirection4Prop] scaleFactor:self.weexInstance.pixelScaleFactor];\
        needsDisplay = YES;\
    }\
    if (needsDisplay && updating) {\
        [self setNeedsDisplay];\
    }\
} while (0);
    
    
    WX_CHECK_BORDER_PROP(Style, Top, Left, Bottom, Right, WXBorderStyle)
    WX_CHECK_BORDER_PROP(Color, Top, Left, Bottom, Right, UIColor)
    do {
        BOOL needsDisplay = NO;
        if (styles[@"weexDarkSchemeBorderColor"]) {
            _darkSchemeBorderTopColor = _darkSchemeBorderLeftColor = _darkSchemeBorderRightColor = _darkSchemeBorderBottomColor = [WXConvert UIColor:styles[@"weexDarkSchemeBorderColor"]];
            needsDisplay = YES;
        }
        if (styles[@"weexDarkSchemeBorderTopColor"]) {
            _darkSchemeBorderTopColor = [WXConvert UIColor:styles[@"weexDarkSchemeBorderTopColor"]];
            needsDisplay = YES;
        }
        if (styles[@"weexDarkSchemeBorderLeftColor"]) {
            _darkSchemeBorderLeftColor = [WXConvert UIColor:styles[@"weexDarkSchemeBorderLeftColor"]];
            needsDisplay = YES;
        }
        if (styles[@"weexDarkSchemeBorderRightColor"]) {
            _darkSchemeBorderRightColor = [WXConvert UIColor:styles[@"weexDarkSchemeBorderRightColor"]];
            needsDisplay = YES;
        }
        if (styles[@"weexDarkSchemeBorderBottomColor"]) {
            _darkSchemeBorderBottomColor = [WXConvert UIColor:styles[@"weexDarkSchemeBorderBottomColor"]];
            needsDisplay = YES;
        }
        if (needsDisplay && updating) {
            [self setNeedsDisplay];
        }
    } while (0);
    do {
        BOOL needsDisplay = NO;
        if (styles[@"weexLightSchemeBorderColor"]) {
            _lightSchemeBorderTopColor = _lightSchemeBorderLeftColor = _lightSchemeBorderRightColor = _lightSchemeBorderBottomColor = [WXConvert UIColor:styles[@"weexLightSchemeBorderColor"]];
            needsDisplay = YES;
        }
        if (styles[@"weexLightSchemeBorderTopColor"]) {
            _lightSchemeBorderTopColor = [WXConvert UIColor:styles[@"weexLightSchemeBorderTopColor"]];
            needsDisplay = YES;
        }
        if (styles[@"weexLightSchemeBorderLeftColor"]) {
            _lightSchemeBorderLeftColor = [WXConvert UIColor:styles[@"weexLightSchemeBorderLeftColor"]];
            needsDisplay = YES;
        }
        if (styles[@"weexLightSchemeBorderRightColor"]) {
            _lightSchemeBorderRightColor = [WXConvert UIColor:styles[@"weexLightSchemeBorderRightColor"]];
            needsDisplay = YES;
        }
        if (styles[@"weexLightSchemeBorderBottomColor"]) {
            _lightSchemeBorderBottomColor = [WXConvert UIColor:styles[@"weexLightSchemeBorderBottomColor"]];
            needsDisplay = YES;
        }
        if (needsDisplay && updating) {
            [self setNeedsDisplay];
        }
    } while (0);
    WX_CHECK_BORDER_PROP_PIXEL(Width, Top, Left, Bottom, Right)
    WX_CHECK_BORDER_PROP_PIXEL(Radius, TopLeft, TopRight, BottomLeft, BottomRight)

    if (updating) {
        WX_CHECK_COMPONENT_TYPE(self.componentType)
        BOOL nowNeedsDrawBorder = [self _needsDrawBorder];
        if (nowNeedsDrawBorder && !previousNeedsDrawBorder) {
            _layer.cornerRadius = 0;
            _layer.borderWidth = 0;
            _layer.backgroundColor = NULL;
        } else if (!nowNeedsDrawBorder) {
            [self _resetNativeBorderRadius];
            _layer.borderWidth = _borderTopWidth;
            _layer.borderColor = [self.weexInstance chooseColor:_borderTopColor lightSchemeColor:_lightSchemeBorderTopColor darkSchemeColor:_darkSchemeBorderTopColor invert:self.invertForDarkScheme scene:[self colorSceneType]].CGColor;
            if ((_transition.transitionOptions & WXTransitionOptionsBackgroundColor) != WXTransitionOptionsBackgroundColor ) {
                _layer.backgroundColor = [self.weexInstance chooseColor:self.styleBackgroundColor lightSchemeColor:self.lightSchemeBackgroundColor darkSchemeColor:self.darkSchemeBackgroundColor invert:self.invertForDarkScheme scene:[self colorSceneType]].CGColor;
            }
        }
    }
}

- (BOOL)_bitmapOpaqueWithSize:(CGSize)size
{
    CGRect rect = CGRectMake(0, 0, size.width, size.height);
    WXRoundedRect *borderRect = [[WXRoundedRect alloc] initWithRect:rect topLeft:_borderTopLeftRadius topRight:_borderTopRightRadius bottomLeft:_borderBottomLeftRadius bottomRight:_borderBottomRightRadius];
    WXRadii *radii = borderRect.radii;
    BOOL hasBorderRadius = [radii hasBorderRadius];
    UIColor* currentBgColor = [self.weexInstance chooseColor:self.styleBackgroundColor lightSchemeColor:self.lightSchemeBackgroundColor darkSchemeColor:self.darkSchemeBackgroundColor invert:self.invertForDarkScheme scene:[self colorSceneType]];
    return (!hasBorderRadius) && _opacity == 1.0 && CGColorGetAlpha(currentBgColor.CGColor) == 1.0 && [self _needsDrawBorder];
}

- (CAShapeLayer *)drawBorderRadiusMaskLayer:(CGRect)rect
{
    if ([self hasBorderRadiusMaskLayer]) {
        WXRoundedRect *borderRect = [[WXRoundedRect alloc] initWithRect:rect topLeft:_borderTopLeftRadius topRight:_borderTopRightRadius bottomLeft:_borderBottomLeftRadius bottomRight:_borderBottomRightRadius];
        WXRadii *radii = borderRect.radii;
        UIBezierPath *bezierPath = [UIBezierPath wx_bezierPathWithRoundedRect:rect topLeft:radii.topLeft topRight:radii.topRight bottomLeft:radii.bottomLeft bottomRight:radii.bottomRight];
        CAShapeLayer *maskLayer = [CAShapeLayer layer];
        maskLayer.path = bezierPath.CGPath;
        return maskLayer;
    }
    return nil;
}

- (BOOL)hasBorderRadiusMaskLayer
{
    return _borderTopLeftRadius > 0.001 || _borderTopRightRadius > 0.001 || _borderBottomLeftRadius > 0.001 || _borderBottomLeftRadius > 0.001;
}

- (WXBoxShadow*)_chooseBoxShadow
{
    if ([self.weexInstance isDarkScheme]) {
        if (_darkSchemeBoxShadow) {
            return _darkSchemeBoxShadow;
        }
        else {
            return _boxShadow;
        }
    }
    else if (_lightSchemeBoxShadow) {
        return _lightSchemeBoxShadow;
    }
    else {
        return _boxShadow;
    }
}

#pragma mark - Deprecated

- (WXDisplayBlock)displayBlock
{
    return [self _displayBlock];
}

- (WXDisplayCompletionBlock)displayCompletionBlock
{
    return [self _displayCompletionBlock];
}

@end

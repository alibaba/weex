/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent+ViewManangement.h"
#import "WXComponent_internal.h"
#import "WXAssert.h"
#import "WXView.h"
#import "WXSDKInstance_private.h"
#import "WXTransform.h"

#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"

@implementation WXComponent (ViewManangement)

#pragma mark Public

- (UIView *)loadView
{
    return [[WXView alloc] init];
}

- (BOOL)isViewLoaded
{
    return (_view != nil);
}

- (UIView *)view
{
    if ([self isViewLoaded]) {
        return _view;
    } else {
        WXAssertMainThread();
        
        // compositing child will be drew by its composited ancestor
        if (_compositingChild) {
            return nil;
        }
        
        [self viewWillLoad];
        
        _view = [self loadView];
        
        _layer = _view.layer;
        _view.frame = _calculatedFrame;
        
        _view.hidden = _visibility == WXVisibilityShow ? NO : YES;
        _view.clipsToBounds = _clipToBounds;
        
        if (![self _needsDrawBorder]) {
            _layer.borderColor = _borderTopColor.CGColor;
            _layer.borderWidth = _borderTopWidth;
            _layer.cornerRadius = _borderTopLeftRadius;
            _layer.opacity = _opacity;
            _view.backgroundColor = _backgroundColor;
        }
        
        _view.wx_component = self;
        _layer.wx_component = self;
        
        [self _initEvents:self.events];
        
        if (_positionType == WXPositionTypeSticky) {
            [self.ancestorScroller addStickyComponent:self];
        }
        
        if (self.supercomponent && self.supercomponent->_async) {
            self->_async = YES;
        }
        
        [self setNeedsDisplay];
        [self viewDidLoad];
        
        if (_lazyCreateView) {
            if (self.supercomponent && !((WXComponent *)self.supercomponent)->_lazyCreateView) {
                NSInteger index = [((WXComponent *)self.supercomponent).subcomponents indexOfObject:self];
                if (index != NSNotFound) {
                    [((WXComponent *)self.supercomponent) insertSubview:self atIndex:index];
                }
            }
            for (WXComponent *subcomponent in self.subcomponents) {
                [self.view addSubview:subcomponent.view];
            }
        }
        
        return _view;
    }
}

- (CALayer *)layer
{
    return _layer;
}

- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index
{
    WXAssertMainThread();
    
    if (subcomponent->_positionType == WXPositionTypeFixed) {
        [self.weexInstance.rootView addSubview:subcomponent.view];
        return;
    }
    
    // use _lazyCreateView to forbid component like cell's view creating
    if(_lazyCreateView) {
        subcomponent->_lazyCreateView = YES;
    }
    
    if (!subcomponent->_lazyCreateView || (self->_lazyCreateView && [self isViewLoaded])) {
        [self.view insertSubview:subcomponent.view atIndex:index];
    }
}

- (void)removeFromSuperview
{
    WXAssertMainThread();
    
    if ([self isViewLoaded]) {
        [self.view removeFromSuperview];
    }
}

- (void)moveToSuperview:(WXComponent *)newSupercomponent atIndex:(NSUInteger)index
{
    [self removeFromSuperview];
    [newSupercomponent insertSubview:self atIndex:index];
}

- (void)viewWillLoad
{
    WXAssertMainThread();
}

- (void)viewDidLoad
{
    WXAssertMainThread();
}

- (void)viewWillUnload
{
    WXAssertMainThread();
}

- (void)viewDidUnload
{
    WXAssertMainThread();
}

#pragma mark Private

- (void)_initViewPropertyWithStyles:(NSDictionary *)styles
{
    _backgroundColor = styles[@"backgroundColor"] ? [WXConvert UIColor:styles[@"backgroundColor"]] : [UIColor clearColor];
    _opacity = styles[@"opacity"] ? [WXConvert CGFloat:styles[@"opacity"]] : 1.0;
    _clipToBounds = styles[@"overflow"] ? [WXConvert WXClipType:styles[@"overflow"]] : NO;
    _visibility = styles[@"visibility"] ? [WXConvert WXVisibility:styles[@"visibility"]] : WXVisibilityShow;
    _positionType = styles[@"position"] ? [WXConvert WXPositionType:styles[@"position"]] : WXPositionTypeRelative;
    _transform = styles[@"transform"] ? [WXConvert NSString:styles[@"transform"]] : nil;
    _transformOrigin = styles[@"transformOrigin"] ? [WXConvert NSString:styles[@"transformOrigin"]] : nil;
}

- (void)_updateViewStyles:(NSDictionary *)styles
{
    if (styles[@"backgroundColor"]) {
        _backgroundColor = [WXConvert UIColor:styles[@"backgroundColor"]];
        _layer.backgroundColor = _backgroundColor.CGColor;
        [self setNeedsDisplay];
    }
    
    if (styles[@"opacity"]) {
        _opacity = [WXConvert CGFloat:styles[@"opacity"]];
        _layer.opacity = _opacity;
    }
    
    if (styles[@"overflow"]) {
        _clipToBounds = [WXConvert WXClipType:styles[@"overflow"]];
        _view.clipsToBounds = _clipToBounds;
    }
    
    if (styles[@"position"]) {
        WXPositionType positionType = [WXConvert WXPositionType:styles[@"position"]];
        if (positionType == WXPositionTypeSticky) {
            [self.ancestorScroller addStickyComponent:self];
        } else if (_positionType == WXPositionTypeSticky) {
            [self.ancestorScroller removeStickyComponent:self];
        }
        
        if (positionType == WXPositionTypeFixed) {
            [self.weexInstance.componentManager addFixedComponent:self];
            _isNeedJoinLayoutSystem = NO;
        } else if (_positionType == WXPositionTypeFixed) {
            [self.weexInstance.componentManager removeFixedComponent:self];
            _isNeedJoinLayoutSystem = YES;
        }
        
        _positionType = positionType;
    }
    
    if (styles[@"visibility"]) {
        _visibility = [WXConvert WXVisibility:styles[@"visibility"]];
        if (_visibility == WXVisibilityShow) {
            self.view.hidden = NO;
        }
        else {
            self.view.hidden = YES;
        }
    }
    
    if (styles[@"transformOrigin"]) {
        _transformOrigin = [WXConvert NSString:styles[@"transformOrigin"]];
    }
    
    if (styles[@"transform"]) {
        if (!CGRectEqualToRect(self.calculatedFrame, CGRectZero)) {
            _transform = [WXConvert NSString:styles[@"transform"]];
            _layer.transform = [[WXTransform new] getTransform:_transform withView:_view withOrigin:_transformOrigin];
            [_layer setNeedsDisplay];
        }
    }
}

- (void)_unloadView
{
    WXAssertMainThread();
    
    [self viewWillUnload];
    
    [_view removeFromSuperview];
    [_layer removeFromSuperlayer];
    
    _view.gestureRecognizers = nil;
    
    [self _removeAllEvents];
    
    if(self.ancestorScroller){
        [self.ancestorScroller removeStickyComponent:self];
        [self.ancestorScroller removeScrollToListener:self];
    }
    
    for (WXComponent *subcomponents in self.subcomponents) {
        [subcomponents _unloadView];
    }
    
    _view = nil;
    _layer = nil;
    
    [self viewDidUnload];
}

@end

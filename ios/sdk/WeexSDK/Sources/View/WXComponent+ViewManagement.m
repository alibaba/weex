/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent+ViewManagement.h"
#import "WXComponent_internal.h"
#import "WXAssert.h"
#import "WXView.h"
#import "WXSDKInstance_private.h"
#import "WXTransform.h"

#pragma clang diagnostic ignored "-Wobjc-protocol-method-implementation"

@implementation WXComponent (ViewManagement)

#pragma mark Public

- (UIView *)loadView
{
    return [[WXView alloc] init];
}

- (BOOL)isViewLoaded
{
    return (_view != nil);
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
    
    _view.gestureRecognizers = nil;
    
    [self _removeAllEvents];
    
    if(self.ancestorScroller){
        [self.ancestorScroller removeStickyComponent:self];
        [self.ancestorScroller removeScrollToListener:self];
    }
    
    for (WXComponent *subcomponents in [self.subcomponents reverseObjectEnumerator]) {
        [subcomponents _unloadView];
    }
    
    _view = nil;
    _layer = nil;
    
    [self viewDidUnload];
}

@end

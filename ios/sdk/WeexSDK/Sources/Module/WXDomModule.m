/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXDomModule.h"
#import "WXDefine.h"
#import "WXSDKManager.h"
#import "WXComponentManager.h"
#import "WXSDKInstance_private.h"
#import "WXLog.h"
#import "WXModuleProtocol.h"
#import "WXUtility.h"
#import "WXRuleManager.h"
#import "WXSDKInstance.h"

@interface WXDomModule ()

@end

@implementation WXDomModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(createBody:))
WX_EXPORT_METHOD(@selector(addElement:element:atIndex:))
WX_EXPORT_METHOD(@selector(removeElement:))
WX_EXPORT_METHOD(@selector(moveElement:parentRef:index:))
WX_EXPORT_METHOD(@selector(addEvent:event:))
WX_EXPORT_METHOD(@selector(removeEvent:event:))
WX_EXPORT_METHOD(@selector(createFinish))
WX_EXPORT_METHOD(@selector(updateFinish))
WX_EXPORT_METHOD(@selector(refreshFinish))
WX_EXPORT_METHOD(@selector(scrollToElement:options:))
WX_EXPORT_METHOD(@selector(updateStyle:styles:))
WX_EXPORT_METHOD(@selector(updateAttrs:attrs:))
WX_EXPORT_METHOD(@selector(addRule:rule:))
WX_EXPORT_METHOD(@selector(getComponentRect:callback:))


- (void)performBlockOnComponentMananger:(void(^)(WXComponentManager *))block
{
    if (!block) {
        return;
    }
    __weak typeof(self) weakSelf = self;
    
    WXPerformBlockOnComponentThread(^{
        WXComponentManager *mananger = weakSelf.weexInstance.componentManager;
        if (!mananger.isValid) {
            return;
        }
        [mananger startComponentTasks];
        block(mananger);
    });
}
- (void)performSelectorOnRuleManager:(void(^)(void))block{
    if (!block) {
        return;
    }
    WXPerformBlockOnComponentThread(^{
        block();
    });
}

- (NSThread *)targetExecuteThread
{
    return [WXComponentManager componentThread];
}

- (void)createBody:(NSDictionary *)body
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager createRoot:body];
    }];
}

- (void)addElement:(NSString *)parentRef element:(NSDictionary *)element atIndex:(NSInteger)index
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager addComponent:element toSupercomponent:parentRef atIndex:index appendingInTree:NO];
    }];
}

- (void)removeElement:(NSString *)ref
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager removeComponent:ref];
    }];
}

- (void)moveElement:(NSString *)elemRef parentRef:(NSString *)parentRef index:(NSInteger)index
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager moveComponent:elemRef toSuper:parentRef atIndex:index];
    }];
}

- (void)addEvent:(NSString *)elemRef event:(NSString *)event
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager addEvent:event toComponent:elemRef];
    }];
}

- (void)removeEvent:(NSString *)elemRef event:(NSString *)event
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager removeEvent:event fromComponent:elemRef];
    }];
}

- (void)createFinish
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager createFinish];
    }];
}

- (void)updateFinish
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager updateFinish];
    }];
}

- (void)refreshFinish
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager refreshFinish];
    }];
}

- (void)scrollToElement:(NSString *)elemRef options:(NSDictionary *)dict
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager scrollToComponent:elemRef options:dict];
    }];
}

-(void)updateStyle:(NSString *)elemRef styles:(NSDictionary *)styles
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager updateStyles:styles forComponent:elemRef];
    }];
}

- (void)updateAttrs:(NSString *)elemRef attrs:(NSDictionary *)attrs
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager updateAttributes:attrs forComponent:elemRef];
    }];
}

- (void)addRule:(NSString*)type rule:(NSDictionary *)rule {
    if ([WXUtility isBlankString:type] || ![rule count]) {
        return;
    }
    
    [self performSelectorOnRuleManager:^{
        [WXRuleManager sharedInstance].instance = weexInstance;
        [[WXRuleManager sharedInstance] addRule:type rule:rule];
        
    }];
}

- (void)getComponentRect:(NSString*)ref callback:(WXModuleKeepAliveCallback)callback {
    [self performBlockOnComponentMananger:^(WXComponentManager * manager) {
        NSMutableDictionary * callbackRsp = [[NSMutableDictionary alloc] init];
        UIView *rootView = manager.weexInstance.rootView;
        CGRect rootRect = [rootView.superview convertRect:rootView.frame toView:rootView];
        CGFloat scaleFactor = self.weexInstance.pixelScaleFactor;
        if ([ref isEqualToString:@"viewport"]) {
            [callbackRsp setObject:@(true) forKey:@"result"];
            [callbackRsp setObject:@{
                                     @"width":@(rootRect.size.width / scaleFactor),
                                     @"height":@(rootRect.size.height / scaleFactor),
                                     @"bottom":@(CGRectGetMaxY(rootRect) / scaleFactor),
                                     @"left":@(rootRect.origin.x / scaleFactor),
                                     @"right":@(CGRectGetMaxX(rootRect) / scaleFactor),
                                     @"top":@(rootRect.origin.y / scaleFactor)
                                     } forKey:@"size"];
            callback(callbackRsp, false);
        }else {
            WXComponent *component = [manager componentForRef:ref];
            dispatch_async(dispatch_get_main_queue(), ^{
                if (!component) {
                    [callbackRsp setObject:@(false) forKey:@"result"];
                    [callbackRsp setObject:[NSString stringWithFormat:@"Illegal parameter, no ref about \"%@\" can be found",ref] forKey:@"errMsg"];
                } else {
                    CGRect componentRect = [component.view.superview convertRect:component.calculatedFrame toView:rootView];
                    [callbackRsp setObject:@(true)forKey:@"result"];
                    [callbackRsp setObject:@{
                                             @"width":@(componentRect.size.width / scaleFactor),
                                             @"height":@(componentRect.size.height / scaleFactor),
                                             @"bottom":@(CGRectGetMaxY(componentRect) / scaleFactor),
                                             @"left":@(componentRect.origin.x / scaleFactor),
                                             @"right":@(CGRectGetMaxX(componentRect) / scaleFactor),
                                             @"top":@(componentRect.origin.y / scaleFactor)
                                             } forKey:@"size"];
                }
                callback(callbackRsp, false);
            });
           
        }
    }];
}

- (void)destoryInstance
{
    [self performBlockOnComponentMananger:^(WXComponentManager *manager) {
        [manager unload];
    }];
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXSDKInstance.h"
#import "WXComponentManager.h"
#import "WXModuleMethod.h"

@interface WXSDKInstance ()

@property (nonatomic, assign) CGFloat viewportWidth;

@property (nonatomic, strong) NSMutableDictionary *moduleInstances;
@property (nonatomic, strong) NSMutableDictionary *naviBarStyles;
@property (nonatomic, strong) NSMutableDictionary *styleConfigs;
@property (nonatomic, strong) NSMutableDictionary *attrConfigs;

@property (nonatomic, readonly, strong) WXComponentManager *componentManager;

- (void)addModuleEventObservers:(NSString*)event callback:(NSString*)callbackId option:(NSDictionary*)option moduleClassName:(NSString*)moduleClassName;
- (void)_addModuleEventObserversWithModuleMethod:(WXModuleMethod*)method;
- (void)removeModuleEventObserver:(NSString*)event moduleClassName:(NSString*)moduleClassName;
- (void)_removeModuleEventObserverWithModuleMethod:(WXModuleMethod*)method;

@end

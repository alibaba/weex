/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXModuleFactory.h"
#import "WXAssert.h"
#import "WXLog.h"
#import "WXInvocationConfig.h"

#import <objc/runtime.h>
#import <objc/message.h>

/************************************************************************************************/

@interface WXModuleConfig : WXInvocationConfig

@end

@implementation WXModuleConfig

@end

@interface WXModuleFactory ()

@property (nonatomic, strong)  NSMutableDictionary  *moduleMap;
@property (nonatomic, strong)  NSLock   *moduleLock;

@end

@implementation WXModuleFactory

static WXModuleFactory *_sharedInstance = nil;

#pragma mark Private Methods

+ (WXModuleFactory *)_sharedInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (!_sharedInstance) {
            _sharedInstance = [[self alloc] init];
        }
    });
    return _sharedInstance;
}

+ (instancetype)allocWithZone:(struct _NSZone *)zone
{
    if (!_sharedInstance) {
        _sharedInstance = [super allocWithZone:zone];
    }
    return _sharedInstance;
}

- (instancetype)init
{
    @synchronized(self) {
        self = [super init];
        if (self) {
            _moduleMap = [NSMutableDictionary dictionary];
            _moduleLock = [[NSLock alloc] init];
        }
    }
    return self;
}

- (Class)_classWithModuleName:(NSString *)name
{
    WXAssert(name, @"Fail to find class with module name, please check if the parameter are correct ！");
    
    WXModuleConfig *config = nil;
    
    [_moduleLock lock];
    config = [_moduleMap objectForKey:name];
    [_moduleLock unlock];
    
    if (!config || !config.clazz) return nil;
    
    return NSClassFromString(config.clazz);
}

- (SEL)_selectorWithModuleName:(NSString *)name methodName:(NSString *)method isSync:(BOOL *)isSync
{
    WXAssert(name && method, @"Fail to find selector with module name and method, please check if the parameters are correct ！");
    
    NSString *selectorString = nil;;
    WXModuleConfig *config = nil;
    
    [_moduleLock lock];
    config = [_moduleMap objectForKey:name];
    if (config.syncMethods) {
        selectorString = [config.syncMethods objectForKey:method];
        if (selectorString && isSync) {
            *isSync = YES;
        }
    }
    if (!selectorString && config.asyncMethods) {
        selectorString = [config.asyncMethods objectForKey:method];;
    }
    [_moduleLock unlock];
    
    return NSSelectorFromString(selectorString);
}

- (NSString *)_registerModule:(NSString *)name withClass:(Class)clazz
{
    WXAssert(name && clazz, @"Fail to register the module, please check if the parameters are correct ！");
    
    [_moduleLock lock];
    //allow to register module with the same name;
    WXModuleConfig *config = [[WXModuleConfig alloc] init];
    config.name = name;
    config.clazz = NSStringFromClass(clazz);
    [config registerMethods];
    [_moduleMap setValue:config forKey:name];
    [_moduleLock unlock];
    
    return name;
}

- (NSMutableDictionary *)_moduleMethodMapsWithName:(NSString *)name
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    NSMutableArray *methods = [self _defaultModuleMethod];
    
    [_moduleLock lock];
    [dict setValue:methods forKey:name];
    
    WXModuleConfig *config = _moduleMap[name];
    void (^mBlock)(id, id, BOOL *) = ^(id mKey, id mObj, BOOL * mStop) {
        [methods addObject:mKey];
    };
    [config.syncMethods enumerateKeysAndObjectsUsingBlock:mBlock];
    [config.asyncMethods enumerateKeysAndObjectsUsingBlock:mBlock];
    [_moduleLock unlock];
    
    return dict;
}

// module common method
- (NSMutableArray*)_defaultModuleMethod
{
    return [NSMutableArray arrayWithObjects:@"addEventListener",@"removeAllEventListeners", nil];
}

- (NSDictionary *)_getModuleConfigs {
    NSMutableDictionary *moduleDic = [[NSMutableDictionary alloc] init];
    void (^moduleBlock)(id, id, BOOL *) = ^(id mKey, id mObj, BOOL * mStop) {
        WXModuleConfig *moduleConfig = (WXModuleConfig *)mObj;
        if (moduleConfig.clazz && moduleConfig.name) {
            [moduleDic setObject:moduleConfig.clazz forKey:moduleConfig.name];
        }
    };
    [_moduleMap enumerateKeysAndObjectsUsingBlock:moduleBlock];
    return moduleDic;
}

#pragma mark Public Methods

+ (NSDictionary *)moduleConfigs {
    return [[self _sharedInstance] _getModuleConfigs];
}

+ (Class)classWithModuleName:(NSString *)name
{
    return [[self _sharedInstance] _classWithModuleName:name];
}

+ (SEL)selectorWithModuleName:(NSString *)name methodName:(NSString *)method isSync:(BOOL *)isSync
{
    return [[self _sharedInstance] _selectorWithModuleName:name methodName:method isSync:isSync];
}

+ (NSString *)registerModule:(NSString *)name withClass:(Class)clazz
{
    return [[self _sharedInstance] _registerModule:name withClass:clazz];
}

+ (NSMutableDictionary *)moduleMethodMapsWithName:(NSString *)name
{
    return [[self _sharedInstance] _moduleMethodMapsWithName:name];
}

@end

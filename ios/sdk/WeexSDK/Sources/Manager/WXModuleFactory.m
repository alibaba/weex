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
#import <objc/runtime.h>
#import <objc/message.h>

/************************************************************************************************/

@interface WXModuleConfig : NSObject
/**
 *  The module name
 **/
@property (nonatomic, strong) NSString  *name;
/**
 *  The module class
 **/
@property (nonatomic, strong) NSString  *clazz;
/**
 *  The methods map
 **/
@property (nonatomic, strong) NSMutableDictionary   *methods;

@end

@implementation WXModuleConfig

- (instancetype)init
{
    self = [super init];
    if (self) {
        _methods = [NSMutableDictionary dictionary];
    }
    return self;
}

- (void)registerModuleMethods
{
    Class currentClass = NSClassFromString(_clazz);
    
    if (!currentClass) {
        WXLogWarning(@"The module class [%@] doesn't exit！", _clazz);
        return;
    }
    
    while (currentClass != [NSObject class]) {
        unsigned int methodCount = 0;
        Method *methodList = class_copyMethodList(object_getClass(currentClass), &methodCount);
        for (unsigned int i = 0; i < methodCount; i++) {
            NSString *selStr = [NSString stringWithCString:sel_getName(method_getName(methodList[i])) encoding:NSUTF8StringEncoding];
            
            if (![selStr hasPrefix:@"wx_export_method_"]) continue;
            
            NSString *name = nil, *method = nil;
            SEL selector = NSSelectorFromString(selStr);
            if ([currentClass respondsToSelector:selector]) {
                method = ((NSString* (*)(id, SEL))[currentClass methodForSelector:selector])(currentClass, selector);
            }
            
            if (method.length <= 0) {
                WXLogWarning(@"The module class [%@] doesn't has any method！", _clazz);
                continue;
            }
            
            NSRange range = [method rangeOfString:@":"];
            if (range.location != NSNotFound) {
                name = [method substringToIndex:range.location];
            } else {
                name = method;
            }
            
            [_methods setObject:method forKey:name];
        }
                
        free(methodList);
        currentClass = class_getSuperclass(currentClass);
        
    }
}

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

- (SEL)_methodWithModuleName:(NSString *)name withMethod:(NSString *)method
{
    WXAssert(name && method, @"Fail to find selector with module name and method, please check if the parameters are correct ！");
    
    NSString *selStr = nil; SEL selector = nil;
    WXModuleConfig *config = nil;
    
    [_moduleLock lock];
    config = [_moduleMap objectForKey:name];
    if (config.methods) {
        selStr = [config.methods objectForKey:method];
    }
    if (selStr) {
        selector = NSSelectorFromString(selStr);
    }
    [_moduleLock unlock];
    
    return selector;
}

- (NSString *)_registerModule:(NSString *)name withClass:(Class)clazz
{
    WXAssert(name && clazz, @"Fail to register the module, please check if the parameters are correct ！");
    
    [_moduleLock lock];
    //allow to register module with the same name;
    WXModuleConfig *config = [[WXModuleConfig alloc] init];
    config.name = name;
    config.clazz = NSStringFromClass(clazz);
    [config registerModuleMethods];
    [_moduleMap setValue:config forKey:name];
    [_moduleLock unlock];
    
    return name;
}

- (NSMutableDictionary *)_moduleMethodMapsWithName:(NSString *)name
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    NSMutableArray *methods = [NSMutableArray array];
    
    [_moduleLock lock];
    [dict setValue:methods forKey:name];
    
    WXModuleConfig *config = _moduleMap[name];
    void (^mBlock)(id, id, BOOL *) = ^(id mKey, id mObj, BOOL * mStop) {
        [methods addObject:mKey];
    };
    [config.methods enumerateKeysAndObjectsUsingBlock:mBlock];
    [_moduleLock unlock];
    
    return dict;
}

- (NSDictionary *)_getModuleConfigs {
    NSMutableDictionary *modelesDic = [[NSMutableDictionary alloc] init];
    void (^moduleBlock)(id, id, BOOL *) = ^(id mKey, id mObj, BOOL * mStop) {
        WXModuleConfig *modeleConfig = (WXModuleConfig *)mObj;
        [modelesDic setObject:modeleConfig.clazz forKey:modeleConfig.name];
    };
    [_moduleMap enumerateKeysAndObjectsUsingBlock:moduleBlock];
    return modelesDic;
}

#pragma mark Public Methods

+ (NSDictionary *)moduleConfigs {
    return [[self _sharedInstance] _getModuleConfigs];
}

+ (Class)classWithModuleName:(NSString *)name
{
    return [[self _sharedInstance] _classWithModuleName:name];
}

+ (SEL)methodWithModuleName:(NSString *)name withMethod:(NSString *)method
{
    return [[self _sharedInstance] _methodWithModuleName:name withMethod:method];
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

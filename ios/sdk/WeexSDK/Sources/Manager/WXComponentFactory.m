/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponentFactory.h"
#import "WXAssert.h"
#import "WXLog.h"

@interface WXComponentConfig : NSObject

@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSString *clazz;
@property (nonatomic, strong) NSDictionary *properties;

- (instancetype)initWithName:(NSString *)name class:(NSString *)clazz pros:(NSDictionary *)pros;

@end

@implementation WXComponentConfig

- (instancetype)initWithName:(NSString *)name class:(NSString *)clazz pros:(NSDictionary *)pros
{
    if (self = [super init]) {
        _name = name;
        _clazz = clazz;
        _properties = pros;
    }
    
    return self;
}

@end

@implementation WXComponentFactory
{
    NSMutableDictionary *_componentConfigs;
    NSLock *_configLock;
}

#pragma mark Life Cycle

+ (instancetype)sharedInstance {
    static id _sharedInstance = nil;
    static dispatch_once_t oncePredicate;
    dispatch_once(&oncePredicate, ^{
        _sharedInstance = [[self alloc] init];
    });
    return _sharedInstance;
}

- (instancetype)init
{
    if(self = [super init]){
        _componentConfigs = [NSMutableDictionary dictionary];
        _configLock = [[NSLock alloc] init];
    }
    return self;
}

#pragma mark Public

+ (Class)classWithComponentName:(NSString *)name
{
    return [[self sharedInstance] classWithComponentName:name];
}

+ (void)registerComponent:(NSString *)name withClass:(Class)clazz withPros:(NSDictionary *)pros
{
    [[self sharedInstance] registerComponent:name withClass:clazz withPros:pros];
}

+ (void)registerComponents:(NSArray *)components
{
    [[self sharedInstance] registerComponents:components];
}

+ (void)unregisterAllComponents
{
    [[self sharedInstance] unregisterAllComponents];
}

+ (NSDictionary *)componentConfigs {
    return [[self sharedInstance] getComponentConfigs];
}

#pragma mark Private

- (NSDictionary *)getComponentConfigs {
    NSMutableDictionary *componentDic = [[NSMutableDictionary alloc] init];
    void (^componentBlock)(id, id, BOOL *) = ^(id mKey, id mObj, BOOL * mStop) {
        WXComponentConfig *componentConfig = (WXComponentConfig *)mObj;
        NSMutableDictionary *configDic = [[NSMutableDictionary alloc] init];
        [configDic setObject:componentConfig.name forKey:@"name"];
        [configDic setObject:componentConfig.clazz forKey:@"clazz"];
        if (componentConfig.properties) {
            [configDic setObject:componentConfig.properties forKey:@"pros"];
        }
        [componentDic setObject:configDic forKey:componentConfig.name];
    };
    [_componentConfigs enumerateKeysAndObjectsUsingBlock:componentBlock];
    return componentDic;
}

- (Class)classWithComponentName:(NSString *)name
{
    WXAssert(name, @"Can not find class for a nil component name");
    
    WXComponentConfig *config = nil;
    
    [_configLock lock];
    config = [_componentConfigs objectForKey:name];
    if (!config) {
        WXLogWarning(@"No component config for name:%@, use default config", name);
        config = [_componentConfigs objectForKey:@"div"];
    }
    [_configLock unlock];
    
    if(!config || !config.clazz) {
        return nil;
    }
    
    return NSClassFromString(config.clazz);
}

- (void)registerComponent:(NSString *)name withClass:(Class)clazz withPros:(NSDictionary *)pros
{
    WXAssert(name && clazz, @"name or clazz must not be nil for registering component.");
    
    WXComponentConfig *config = nil;
    [_configLock lock];
    config = [_componentConfigs objectForKey:name];
    
    if(config){
        WXLogInfo(@"Overrider component name:%@ class:%@, to name:%@ class:%@",
                  config.name, config.class, name, clazz);
    }
    
    config = [[WXComponentConfig alloc] initWithName:name class:NSStringFromClass(clazz) pros:pros];
    [_componentConfigs setValue:config forKey:name];
    [_configLock unlock];
}


- (void)registerComponents:(NSArray *)components
{
    WXAssert(components, @"components array must not be nil for registering component.");
    
    [_configLock lock];
    for(NSDictionary *dict in components){
        NSString *name = dict[@"name"];
        NSString *clazz = dict[@"class"];
        WXAssert(name && clazz, @"name or clazz must not be nil for registering components.");
        
        WXComponentConfig *config = [[WXComponentConfig alloc] initWithName:name class:clazz pros:nil];
        if(config){
            [_componentConfigs setValue:config forKey:name];
        }
    }
    [_configLock unlock];
}

- (void)unregisterAllComponents
{
    [_configLock lock];
    [_componentConfigs removeAllObjects];
    [_configLock unlock];
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXServiceFactory.h"
#import "WXAssert.h"
#import "WXLog.h"

#import <objc/runtime.h>

@implementation WXServiceFactory
{

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

    }
    return self;
}

#pragma mark Public
/**
 * @abstract Unregisters a component for a given name
 *
 * @param name The service name to register
 *
 * @return script
 *
 */
+ (NSString *)registerServiceScript:(NSString *)name withRawScript:(NSString *)serviceScript withOptions:(NSDictionary *)options
{
    NSDictionary *dic = [[self sharedInstance] registerServiceScript:name withRawScript:serviceScript withOptions:options];
    return [dic objectForKey:@"script"];
}


+ (NSString *)unregisterServiceScript:(NSString *)name
{
    return [[self sharedInstance] unregisterServiceScript:name];
}


#pragma mark Private

- (NSDictionary *)registerServiceScript:(NSString *)name withRawScript:(NSString *)serviceScript withOptions:(NSDictionary *)options
{
    WXAssert(name && options && serviceScript, @"name or options or code must not be nil for registering service.");
    
    NSDictionary *serverConfig = @{
                                   @"name": name,
                                   @"options": options,
                                   @"script": [self registerService:name withRawScript:serviceScript withOptions:options]
                                   };
    
    return serverConfig;
}

- (NSString *) registerService:(NSString *)name withRawScript:(NSString *)serviceScript withOptions:(NSDictionary *)options {
    NSError *error;
    
    // setup options for service
    NSMutableDictionary *optionDic = [NSMutableDictionary dictionaryWithDictionary:options];
    [optionDic setObject:name forKey:@"serviceName"];
    NSData *optionsData = [NSJSONSerialization dataWithJSONObject:optionDic options:NSJSONWritingPrettyPrinted error:&error];
    NSString *optionsString = [[NSString alloc] initWithData:optionsData encoding:NSUTF8StringEncoding];
    
    // setup global function to service
    NSString *funcString = @"{"
                            @"register: global.registerService,"
                            @"unregister: global.unregisterService"
                            @"}";
    
    NSString *script = [NSString stringWithFormat:@";(function(service, options){ %@ })(%@, %@);"
                        , serviceScript, funcString, optionsString];
    return script;
}

- (NSString *) unregisterServiceScript: (NSString *) name
{
    NSString *script = [NSString stringWithFormat:@";global.unregisterService(%@);", name];
    return script;
}

@end

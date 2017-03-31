/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXAppConfiguration.h"

@interface WXAppConfiguration ()

@property (nonatomic, strong) NSString * appGroup;
@property (nonatomic, strong) NSString * appName;
@property (nonatomic, strong) NSString * appVersion;
@property (nonatomic, strong) NSString * externalUA;
@property (nonatomic, strong) NSString * JSFrameworkVersion;
@property (nonatomic, strong) NSArray  * customizeProtocolClasses;
@end

@implementation WXAppConfiguration

+ (instancetype)sharedConfiguration
{
    static id _sharedInstance = nil;
    static dispatch_once_t oncePredicate;
    dispatch_once(&oncePredicate, ^{
        _sharedInstance = [[self alloc] init];
    });
    return _sharedInstance;
}

+ (NSString *)appGroup
{
    return [WXAppConfiguration sharedConfiguration].appGroup;
}

+ (void)setAppGroup:(NSString *)appGroup
{
    [WXAppConfiguration sharedConfiguration].appGroup = appGroup;
}

+ (NSString *)appName
{
    return [WXAppConfiguration sharedConfiguration].appName ?: [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
}

+ (void)setAppName:(NSString *)appName
{
    [WXAppConfiguration sharedConfiguration].appName = appName;
}

+ (NSString *)appVersion
{
    return [WXAppConfiguration sharedConfiguration].appVersion ?: [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
}

+ (void)setAppVersion:(NSString *)appVersion
{
    [WXAppConfiguration sharedConfiguration].appVersion = appVersion;
}

+ (NSString *)externalUserAgent
{
    return [WXAppConfiguration sharedConfiguration].externalUA;
}

+ (void)setExternalUserAgent:(NSString *)userAgent
{
    [WXAppConfiguration sharedConfiguration].externalUA = userAgent;
}

+ (NSString *)JSFrameworkVersion
{
    return [WXAppConfiguration sharedConfiguration].JSFrameworkVersion ?: @"";
}

+ (void)setJSFrameworkVersion:(NSString *)JSFrameworkVersion
{
    [WXAppConfiguration sharedConfiguration].JSFrameworkVersion = JSFrameworkVersion;
}

+ (NSArray*)customizeProtocolClasses{
    return [WXAppConfiguration sharedConfiguration].customizeProtocolClasses;
}

+ (void)setCustomizeProtocolClasses:(NSArray *)customizeProtocolClasses{
    [WXAppConfiguration sharedConfiguration].customizeProtocolClasses = customizeProtocolClasses;
}


@end

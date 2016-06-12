/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXUtility.h"
#import "WXLog.h"
#import "WXSDKEngine.h"
#import "WXAppConfiguration.h"
#import <objc/runtime.h>
#import <objc/message.h>
#import <sys/utsname.h>
#import <UIKit/UIScreen.h>

void WXPerformBlockOnMainThread(void (^ _Nonnull block)())
{
    if ([NSThread isMainThread]) {
        block();
    } else {
        dispatch_async(dispatch_get_main_queue(), ^{
            block();
        });
    }
}

void WXPerformBlockSyncOnMainThread(void (^ _Nonnull block)())
{
    if ([NSThread isMainThread]) {
        block();
    } else {
        dispatch_sync(dispatch_get_main_queue(), ^{
            block();
        });
    }
}

void WXSwizzleInstanceMethod(Class class, SEL original, SEL replaced)
{
    Method originalMethod = class_getInstanceMethod(class, original);
    Method newMethod = class_getInstanceMethod(class, replaced);
    
    BOOL didAddMethod = class_addMethod(class, original, method_getImplementation(newMethod), method_getTypeEncoding(newMethod));
    if (didAddMethod) {
        class_replaceMethod(class, replaced, method_getImplementation(newMethod), method_getTypeEncoding(newMethod));
    } else {
        method_exchangeImplementations(originalMethod, newMethod);
    }
}

void WXSwizzleInstanceMethodWithBlock(Class class, SEL original, id block, SEL replaced)
{
    Method originalMethod = class_getInstanceMethod(class, original);
    IMP implementation = imp_implementationWithBlock(block);
    
    class_addMethod(class, replaced, implementation, method_getTypeEncoding(originalMethod));
    Method newMethod = class_getInstanceMethod(class, replaced);
    method_exchangeImplementations(originalMethod, newMethod);
}

SEL WXSwizzledSelectorForSelector(SEL selector)
{
    return NSSelectorFromString([NSString stringWithFormat:@"wx_swizzle_%x_%@", arc4random(), NSStringFromSelector(selector)]);
}

CGFloat WXScreenScale(void)
{
    static CGFloat _scale;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _scale = [UIScreen mainScreen].scale;
    });
    return _scale;
}

CGSize WXScreenSize(void)
{
    return [UIScreen mainScreen].bounds.size;
}

CGFloat WXScreenResizeRadio(void)
{
    static CGFloat resizeScale;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        CGSize size = WXScreenSize();
        CGFloat deviceWidth;
        if (size.width > size.height) {
            // Landscape
            deviceWidth = size.height;
        } else {
            deviceWidth = size.width;
        }
        
        resizeScale = deviceWidth / WXDefaultScreenWidth;
    });
    
    return resizeScale;
}

CGFloat WXRoundPixelValue(CGFloat value)
{
    CGFloat scale = WXScreenScale();
    return round(value * scale) / scale;
}

CGFloat WXCeilPixelValue(CGFloat value)
{
    CGFloat scale = WXScreenScale();
    return ceil(value * scale) / scale;
}

CGFloat WXFloorPixelValue(CGFloat value)
{
    CGFloat scale = WXScreenScale();
    return floor(value * scale) / scale;
}

CGFloat WXPixelResize(CGFloat value)
{
    return WXCeilPixelValue(value * WXScreenResizeRadio());
}

CGRect WXPixelFrameResize(CGRect value)
{
    CGRect new = CGRectMake(value.origin.x * WXScreenResizeRadio(),
                            value.origin.y * WXScreenResizeRadio(),
                            value.size.width * WXScreenResizeRadio(),
                            value.size.height * WXScreenResizeRadio());
    return new;
}

CGPoint WXPixelPointResize(CGPoint value)
{
    CGPoint new = CGPointMake(value.x * WXScreenResizeRadio(),
                              value.y * WXScreenResizeRadio());
    return new;
}

@implementation WXUtility

+ (NSDictionary *)getEnvironment
{
    NSString *platform = @"iOS";
    NSString *sysVersion = [[UIDevice currentDevice] systemVersion];
    NSString *weexVersion = WX_SDK_VERSION;
    NSString *machine = [self deviceName] ? : @"";
    NSString *appVersion = [WXAppConfiguration appVersion] ? : @"";
    NSString *appName = [WXAppConfiguration appName] ? : @"";
    
    CGFloat deviceWidth = [[UIScreen mainScreen] bounds].size.width;
    CGFloat deviceHeight = [[UIScreen mainScreen] bounds].size.height;
    CGFloat scale = [[UIScreen mainScreen] scale];
    
    NSMutableDictionary *data = [NSMutableDictionary dictionaryWithDictionary:@{
                                    @"platform":platform,
                                    @"osVersion":sysVersion,
                                    @"weexVersion":weexVersion,
                                    @"deviceModel":machine,
                                    @"appName":appName,
                                    @"appVersion":appVersion,
                                    @"deviceWidth":@(deviceWidth * scale),
                                    @"deviceHeight":@(deviceHeight * scale),
                                    @"scale":@(scale),
                                    @"logLevel":[WXLog logLevelString]
                                }];
    return data;
}

+ (NSString *)userAgent
{
    // Device UA
    NSString *deviceUA = [NSString stringWithFormat:@"%@(iOS/%@)", [self deviceName]?:@"UNKNOWN", [[UIDevice currentDevice] systemVersion]]?:@"0.0.0";
    
    // App UA
    NSString *appUA = [NSString stringWithFormat:@"%@(%@/%@)", [WXAppConfiguration appGroup]?:@"WeexGroup", [WXAppConfiguration appName]?:@"WeexApp", [WXAppConfiguration appVersion]?:@"0.0.0"];

    // Weex UA
    NSString *weexUA = [NSString stringWithFormat:@"Weex/%@", WX_SDK_VERSION];
    
    // external UA
    NSString *externalUA = [WXAppConfiguration externalUserAgent] ? [NSString stringWithFormat:@" %@", [WXAppConfiguration externalUserAgent]] : @"";
    
    // Screen Size
    CGFloat w = [[UIScreen mainScreen] bounds].size.width;
    CGFloat h = [[UIScreen mainScreen] bounds].size.height;
    CGFloat s = [[UIScreen mainScreen] scale];
    NSString * screenUA = [NSString stringWithFormat:@"%dx%d", (int)(s * w), (int)(s * h)];
    
    // New UA
    return [NSString stringWithFormat:@"%@ %@ %@%@ %@", deviceUA, appUA, weexUA, externalUA, screenUA];
}

+ (id)objectFromJSON:(NSString *)json
{
    if (!json) return nil;
    
    NSData *data = [json dataUsingEncoding:NSUTF8StringEncoding];
    NSError *error = nil;
    id obj = [NSJSONSerialization JSONObjectWithData:data
                                             options:NSJSONReadingAllowFragments | NSJSONReadingMutableContainers | NSJSONReadingMutableLeaves
                                               error:&error];
    if(error){
        WXLogError(@"%@", [error description]);
        return nil;
    }
    
    return obj;
}

+ (NSString *)JSONString:(id)object
{
    if(!object) return nil;
    
    NSError *error = nil;
    if([object isKindOfClass:[NSArray class]] || [object isKindOfClass:[NSDictionary class]]){
        NSData *data = [NSJSONSerialization dataWithJSONObject:object
                                                       options:NSJSONWritingPrettyPrinted
                                                         error:&error];
        if (error) {
            WXLogError(@"%@", [error description]);
            return nil;
        }
        
        return [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    
    } else if ([object isKindOfClass:[NSString class]]) {
        NSArray *array = @[object];
        NSData *data = [NSJSONSerialization dataWithJSONObject:array
                                                       options:NSJSONWritingPrettyPrinted
                                                         error:&error];
        if (error) {
            WXLogError(@"%@", [error description]);
            return nil;
        }
        
        NSString *string = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
        if (string.length <= 4) {
            WXLogError(@"json convert length less than 4 chars.");
            return nil;
        }
        
        return [string substringWithRange:NSMakeRange(2, string.length - 4)];
    } else {
        WXLogError(@"object isn't avaliable class");
        return nil;
    }
}

+ (id)copyJSONObject:(id)object
{
    if ([object isKindOfClass:[NSArray class]]) {
        NSArray *array = (NSArray *)object;
        NSMutableArray *copyObjs = [NSMutableArray array];
        
        [array enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            id copyObj = [self copyJSONObject:obj];
            [copyObjs insertObject:copyObj atIndex:idx];
        }];
        
        return copyObjs;
    } else if ([object isKindOfClass:[NSDictionary class]]) {
        NSDictionary *dict = (NSDictionary *)object;
        NSMutableDictionary *copyObjs = [NSMutableDictionary dictionary];
        
        [dict enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
            id copyObj = [self copyJSONObject:obj];
            [copyObjs setObject:copyObj forKey:key];
        }];
        
        return copyObjs;
    } else {
        return [object copy];
    }
}

+ (BOOL)isBlankString:(NSString *)string {
    if (string == nil || string == NULL || [string isKindOfClass:[NSNull class]]) {
        return true;
    }
    if ([[string stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] length] == 0) {
        return true;
    }
    
    return false;
}

+ (NSError *)errorWithCode:(NSInteger)code message:(NSString *)message
{
    message = message ? : @"";
    return [NSError errorWithDomain:@"WeexErrorDomain" code:code userInfo:@{@"errMsg":message}];
}

+ (UIFont *)fontWithSize:(CGFloat)size textWeight:(WXTextWeight)textWeight textStyle:(WXTextStyle)textStyle fontFamily:(NSString *)fontFamily
{
    CGFloat fontSize = (isnan(size) || size == 0) ?  WX_TEXT_FONT_SIZE : size;
    UIFont *font;
    
    if (fontFamily) {
        font = [UIFont fontWithName:fontFamily size:fontSize];
        if (!font) {
            WXLogWarning(@"Unknown fontFamily:%@", fontFamily);
            font = [UIFont systemFontOfSize:fontSize];
        }
    } else {
        font = [UIFont systemFontOfSize:fontSize];
    }
    
    UIFontDescriptor *fontD = font.fontDescriptor;
    UIFontDescriptorSymbolicTraits traits = 0;
    traits = (textStyle == WXTextStyleItalic) ? (traits | UIFontDescriptorTraitItalic) : traits;
    traits = (textWeight == WXTextWeightBold) ? (traits | UIFontDescriptorTraitBold) : traits;
    fontD = [fontD fontDescriptorWithSymbolicTraits:traits];
    font = [UIFont fontWithDescriptor:fontD size:0];
    
    return font;
}

+ (NSString *)documentDirectory
{
    static NSString *docPath = nil;
    if (!docPath){
        docPath = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
    }
    return docPath;
}

+ (NSString *)cacheDirectory
{
    static NSString *cachePath = nil;
    if (!cachePath) {
        cachePath = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject;
    }
    return cachePath;
}

+ (NSString *)libraryDirectory
{
    static NSString *libPath = nil;
    if (!libPath) {
        libPath = NSSearchPathForDirectoriesInDomains(NSLibraryDirectory, NSUserDomainMask, YES).firstObject;
    }
    return libPath;
}

+ (NSCache *)globalCache
{
    static NSCache *cache;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        cache = [NSCache new];
        cache.totalCostLimit = 5 * 1024 * 1024;
        
        [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationDidReceiveMemoryWarningNotification object:nil queue:nil usingBlock:^(__unused NSNotification *note) {
            [cache removeAllObjects];
        }];
    });
    return cache;
}

+ (NSString *)deviceName
{
    struct utsname systemInfo;
    uname(&systemInfo);
    return [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
}

+ (void)addStatTrack:(NSString *)appName
{
    if (!appName) {
        return;
    }
    
    // App name for non-commercial use
    NSString *urlString = [NSString stringWithFormat:@"http://gm.mmstat.com/weex.1003?appname=%@", appName];
    NSURL *URL = [NSURL URLWithString:urlString];
    NSURLRequest *request = [NSURLRequest requestWithURL:URL];
    
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                            completionHandler:
                                  ^(NSData *data, NSURLResponse *response, NSError *error) {
                                  }];
    [task resume];
}

@end

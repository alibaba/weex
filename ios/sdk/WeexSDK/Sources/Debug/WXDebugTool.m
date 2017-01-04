/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXDebugTool.h"
//#import "WXFPSLabel.h"
#import "WXHandlerFactory.h"
#import "WXNetworkProtocol.h"
#import "WXUtility.h"
#import "WXSDKManager.h"
#import "WXSDKEngine.h"
#import "WXResourceRequest.h"
#import "WXResourceResponse.h"
#import "WXResourceLoader.h"

static BOOL WXIsDebug;
static BOOL WXIsDevToolDebug;
static NSString* WXDebugrepBundleJS;
static NSString* WXDebugrepJSFramework;

@implementation WXDebugTool

//+ (void)showFPS
//{
//    UIWindow *window = [[[UIApplication sharedApplication] delegate] window];
//    WXFPSLabel *label = [[WXFPSLabel alloc] initWithFrame:CGRectMake(window.frame.size.width-135, window.frame.size.height-35, 120, 20)];
//    label.layer.zPosition = MAXFLOAT;
//    [window addSubview:label];
//}

+ (void)setDebug:(BOOL)isDebug
{
    WXIsDebug = isDebug;
}

+ (BOOL)isDebug
{
    return WXIsDebug;
}

+ (void)setDevToolDebug:(BOOL)isDevToolDebug {
    WXIsDevToolDebug = isDevToolDebug;
}

+ (BOOL)isDevToolDebug {
    return WXIsDevToolDebug;
}

+ (void)setReplacedBundleJS:(NSURL*)url{
    [self getData:url key:@"bundlejs"];
}

+ (NSString*)getReplacedBundleJS{
    return WXDebugrepBundleJS;
}

+ (void)setReplacedJSFramework:(NSURL*)url{
    [self getData:url key:@"jsframework"];
}

+ (NSString*)getReplacedJSFramework{
    
    return WXDebugrepJSFramework;
}

+ (void)getData:(NSURL*)url key:(NSString*)key{
    void(^scriptLoadFinish)(NSString*, NSString*) = ^(NSString* key, NSString* script){
        if ([key isEqualToString:@"jsframework"]) {
            WXDebugrepJSFramework = script;
            [WXSDKManager unload];
            [WXSDKEngine initSDKEnvironment:script];
        }else {
            WXDebugrepBundleJS = script;
        }
    };
    if ([url isFileURL]) {
        // File URL
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            NSString *path = [url path];
            NSData *scriptData = [[NSFileManager defaultManager] contentsAtPath:path];
            NSString *script = [[NSString alloc] initWithData:scriptData encoding:NSUTF8StringEncoding];
            if (!script || script.length <= 0) {
                NSString *errorDesc = [NSString stringWithFormat:@"File read error at url: %@", url];
                WXLogError(@"%@", errorDesc);
            }
            scriptLoadFinish(key, script);
        });
    } else {
        // HTTP/HTTPS URL
        WXResourceRequest *request = [WXResourceRequest requestWithURL:url resourceType:WXResourceTypeMainBundle referrer:nil cachePolicy:NSURLRequestUseProtocolCachePolicy];
        request.userAgent = [WXUtility userAgent];
        WXResourceLoader *loader = [[WXResourceLoader alloc] initWithRequest:request];
        
        loader.onFinished = ^(const WXResourceResponse * response, NSData *data) {
            if ([response isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse *)response).statusCode != 200) {
                __unused NSError *error = [NSError errorWithDomain:WX_ERROR_DOMAIN
                                                              code:((NSHTTPURLResponse *)response).statusCode
                                                          userInfo:@{@"message":@"status code error."}];
                
                return ;
            }
            
            NSString * script = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
            scriptLoadFinish(key, script);
        };
        
        [loader start];
    }
}

@end

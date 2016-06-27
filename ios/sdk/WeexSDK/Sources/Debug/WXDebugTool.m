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

#import "PonyDebugger.h"

static BOOL WXIsDebug;
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
    /*
#ifdef DEBUG
    return YES;
#endif
     */
    return WXIsDebug;
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
            [[WXSDKManager bridgeMgr] unload];
            [WXSDKEngine initSDKEnviroment:script];
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
            if (!script) {
                NSString *errorDesc = [NSString stringWithFormat:@"File read error at url: %@", url];
                WXLogError(@"%@", errorDesc);
            }
            scriptLoadFinish(key, script);
        });
    } else {
        // HTTP/HTTPS URL
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setValue:[WXUtility userAgent] forHTTPHeaderField:@"User-Agent"];
        
        id<WXNetworkProtocol> networkHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXNetworkProtocol)];
        
        __block NSURLResponse *urlResponse;
        [networkHandler sendRequest:request
                    withSendingData:^(int64_t bytesSent, int64_t totalBytes) {}
                       withResponse:^(NSURLResponse *response) {
                           urlResponse = response;
                       }
                    withReceiveData:^(NSData *data) {}
                    withCompeletion:^(NSData *totalData, NSError *error) {
                        if (error) {
                            
                        } else {
                            if ([urlResponse isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse *)urlResponse).statusCode != 200) {
                                __unused NSError *error = [NSError errorWithDomain:WX_ERROR_DOMAIN
                                                                     code:((NSHTTPURLResponse *)urlResponse).statusCode
                                                                 userInfo:@{@"message":@"status code error."}];
                                
                                return ;
                            }
                            NSString * script = [[NSString alloc] initWithData:totalData encoding:NSUTF8StringEncoding];
                            scriptLoadFinish(key, script);
                        }
                    }];
    }
}

#pragma mark weex inspector
+ (void)launchInspectorWithSocketUrl:(NSURL *)url {
    
    PDDebugger *debugger = [PDDebugger defaultInstance];
    //    [debugger serverStartWithHost:@"localhost" port:9009];
    
    // Enable Network debugging, and automatically track network traffic that comes through any classes that implement either NSURLConnectionDelegate, NSURLSessionTaskDelegate, NSURLSessionDataDelegate or NSURLSessionDataDelegate methods.
    [debugger enableNetworkTrafficDebugging];
    [debugger forwardAllNetworkTraffic];
    
    // Enable Core Data debugging, and broadcast the main managed object context.
    //     [debugger enableCoreDataDebugging];
    //     [debugger addManagedObjectContext:self.managedObjectContext withName:@"PonyDebugger Test App MOC"];
    
    // Enable View Hierarchy debugging. This will swizzle UIView methods to monitor changes in the hierarchy
    // Choose a few UIView key paths to display as attributes of the dom nodes
    [debugger enableViewHierarchyDebugging];
    [debugger setDisplayedViewAttributeKeyPaths:@[@"frame", @"hidden", @"alpha", @"opaque", @"accessibilityLabel", @"text"]];
    
    // Enable remote logging to the DevTools Console via PDLog()/PDLogObjects().
    [debugger enableRemoteLogging];
    
    // Enable remote logging to the DevTools source.
    [debugger enableRemoteDebugger];
    //    [debugger remoteDebuggertest];
    
    [debugger enableTimeline];
    
    [debugger enableCSSStyle];
    
    // Connect to a specific host
    if ([url isKindOfClass:NSString.class]) {
        url = [NSURL URLWithString:(NSString *)url];
    }
    
    // Prevents app crashing on argument type error like sending NSNull instead of NSURL
    if (![url isKindOfClass:NSURL.class]) {
        url = nil;
    }
    [debugger connectToURL:url];
    // Or auto connect via bonjour discovery
    //[debugger autoConnect];
    // Or to a specific ponyd bonjour service
    //[debugger autoConnectToBonjourServiceNamed:@"MY PONY"];

}

+ (void)launchDebugWithSocketUrl:(NSString *)url {
    [WXDebugTool setDebug:YES];
    [WXSDKEngine connectDebugServer:url];
}

@end

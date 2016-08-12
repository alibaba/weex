/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXSDKEngine.h"
#import "WXModuleFactory.h"
#import "WXHandlerFactory.h"
#import "WXComponentFactory.h"

#import "WXAppConfiguration.h"
#import "WXNetworkDefaultImpl.h"
#import "WXNavigationDefaultImpl.h"
#import "WXSDKManager.h"
#import "WXSDKError.h"
#import "WXMonitor.h"
#import "WXSimulatorShortcutMananger.h"
#import "WXAssert.h"
#import "WXLog.h"
#import "WXUtility.h"

@implementation WXSDKEngine

# pragma mark Module Register

// register some default modules when the engine initializes.
+ (void)_registerDefaultModules
{
    [self registerModule:@"dom" withClass:NSClassFromString(@"WXDomModule")];
    [self registerModule:@"navigator" withClass:NSClassFromString(@"WXNavigatorModule")];
    [self registerModule:@"stream" withClass:NSClassFromString(@"WXStreamModule")];
    [self registerModule:@"animation" withClass:NSClassFromString(@"WXAnimationModule")];
    [self registerModule:@"modal" withClass:NSClassFromString(@"WXModalUIModule")];
    [self registerModule:@"webview" withClass:NSClassFromString(@"WXWebViewModule")];
    [self registerModule:@"instanceWrap" withClass:NSClassFromString(@"WXInstanceWrap")];
    [self registerModule:@"timer" withClass:NSClassFromString(@"WXTimerModule")];
    [self registerModule:@"storage" withClass:NSClassFromString(@"WXStorageModule")];
    [self registerModule:@"clipboard" withClass:NSClassFromString(@"WXClipboardModule")];
}

+ (void)registerModule:(NSString *)name withClass:(Class)clazz
{
    WXAssert(name && clazz, @"Fail to register the module, please check if the parameters are correct ！");
    
    NSString *moduleName = [WXModuleFactory registerModule:name withClass:clazz];
    NSDictionary *dict = [WXModuleFactory moduleMethodMapsWithName:moduleName];
    
    [[WXSDKManager bridgeMgr] registerModules:dict];
}

# pragma mark Component Register

// register some default components when the engine initializes.
+ (void)_registerDefaultComponents
{
    [self registerComponent:@"container" withClass:NSClassFromString(@"WXDivComponent") withProperties:nil];
    [self registerComponent:@"div" withClass:NSClassFromString(@"WXComponent") withProperties:nil];
    [self registerComponent:@"text" withClass:NSClassFromString(@"WXTextComponent") withProperties:nil];
    [self registerComponent:@"image" withClass:NSClassFromString(@"WXImageComponent") withProperties:nil];
    [self registerComponent:@"scroller" withClass:NSClassFromString(@"WXScrollerComponent") withProperties:nil];
    [self registerComponent:@"list" withClass:NSClassFromString(@"WXListComponent") withProperties:nil];
    
    [self registerComponent:@"header" withClass:NSClassFromString(@"WXHeaderComponent")];
    [self registerComponent:@"cell" withClass:NSClassFromString(@"WXCellComponent")];
    [self registerComponent:@"embed" withClass:NSClassFromString(@"WXEmbedComponent")];
    [self registerComponent:@"a" withClass:NSClassFromString(@"WXAComponent")];
    
    [self registerComponent:@"select" withClass:NSClassFromString(@"WXSelectComponent")];
    [self registerComponent:@"switch" withClass:NSClassFromString(@"WXSwitchComponent")];
    [self registerComponent:@"input" withClass:NSClassFromString(@"WXTextInputComponent")];
    [self registerComponent:@"video" withClass:NSClassFromString(@"WXVideoComponent")];
    [self registerComponent:@"indicator" withClass:NSClassFromString(@"WXIndicatorComponent")];
    [self registerComponent:@"slider" withClass:NSClassFromString(@"WXSliderComponent")];
    [self registerComponent:@"web" withClass:NSClassFromString(@"WXWebComponent")];
    [self registerComponent:@"loading" withClass:NSClassFromString(@"WXLoadingComponent")];
    [self registerComponent:@"loading-indicator" withClass:NSClassFromString(@"WXLoadingIndicator")];
    [self registerComponent:@"refresh" withClass:NSClassFromString(@"WXRefreshComponent")];
    [self registerComponent:@"textarea" withClass:NSClassFromString(@"WXTextAreaComponent")];
}

+ (void)registerComponent:(NSString *)name withClass:(Class)clazz
{
    [self registerComponent:name withClass:clazz withProperties: @{@"append":@"tree"}];
}

+ (void)registerComponent:(NSString *)name withClass:(Class)clazz withProperties:(NSDictionary *)properties
{
    if (!name || !clazz) {
        return;
    }
    
    WXAssert(name && clazz, @"Fail to register the component, please check if the parameters are correct ！");
    
    [WXComponentFactory registerComponent:name withClass:clazz withPros:properties];
    
    if (properties) {
        NSMutableDictionary *props = [properties mutableCopy];
        props[@"type"] = name;
        [[WXSDKManager bridgeMgr] registerComponents:@[props]];
    } else {
        [[WXSDKManager bridgeMgr] registerComponents:@[name]];
    }
}

# pragma mark Handler Register

// register some default handlers when the engine initializes.
+ (void)_registerDefaultHandlers
{
    [self registerHandler:[WXNetworkDefaultImpl new] withProtocol:@protocol(WXNetworkProtocol)];
    [self registerHandler:[WXNavigationDefaultImpl new] withProtocol:@protocol(WXNavigationProtocol)];
}

+ (void)registerHandler:(id)handler withProtocol:(Protocol *)protocol
{
    WXAssert(handler && protocol, @"Fail to register the handler, please check if the parameters are correct ！");
    
    [WXHandlerFactory registerHandler:handler withProtocol:protocol];
}

# pragma mark SDK Initialize

+ (void)initSDKEnviroment
{
    WX_MONITOR_PERF_START(WXPTInitalize)
    WX_MONITOR_PERF_START(WXPTInitalizeSync)
    
    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"main" ofType:@"js"];
    NSString *script = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    [WXSDKEngine initSDKEnviroment:script];
    
    WX_MONITOR_PERF_END(WXPTInitalizeSync)
    
#if TARGET_OS_SIMULATOR
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [WXSimulatorShortcutMananger registerSimulatorShortcutWithKey:@"i" modifierFlags:UIKeyModifierCommand | UIKeyModifierAlternate action:^{
            NSURL *URL = [NSURL URLWithString:@"http://localhost:8687/launchDebugger"];
            NSURLRequest *request = [NSURLRequest requestWithURL:URL];
            
            NSURLSession *session = [NSURLSession sharedSession];
            NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                                    completionHandler:
                                          ^(NSData *data, NSURLResponse *response, NSError *error) {
                                              // ...
                                          }];
            
            [task resume];
            WXLogInfo(@"Launching browser...");
            
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [self connectDebugServer:@"ws://localhost:8687/debugger/0/renderer"];
            });
            
        }];
    });
#endif
}

+ (void)initSDKEnviroment:(NSString *)script
{
    if (!script || script.length <= 0) {
        WX_MONITOR_FAIL(WXMTJSFramework, WX_ERR_JSFRAMEWORK_LOAD, @"framework loading is failure!");
        return;
    }
    
    [self _registerDefaultComponents];
    [self _registerDefaultModules];
    [self _registerDefaultHandlers];
    
    [[WXSDKManager bridgeMgr] executeJsFramework:script];
}

+ (NSString*)SDKEngineVersion
{
    return WX_SDK_VERSION;
}

+ (WXSDKInstance *)topInstance
{
    return [WXSDKManager bridgeMgr].topInstance;
}

# pragma mark Debug

+ (void)unload
{
    [WXSDKManager unload];
    [WXComponentFactory unregisterAllComponents];
}

+ (void)restart
{
    NSDictionary *components = [WXComponentFactory componentConfigs];
    NSDictionary *modules = [WXModuleFactory moduleConfigs];
    NSDictionary *handlers = [WXHandlerFactory handlerConfigs];
    [WXSDKManager unload];
    [WXComponentFactory unregisterAllComponents];
    NSString *filePath = [[NSBundle mainBundle] pathForResource:@"main" ofType:@"js"];
    NSString *script = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    
    [self _originalRegisterComponents:components];
    [self _originalRegisterModules:modules];
    [self _originalRegisterHandlers:handlers];
    
    [[WXSDKManager bridgeMgr] executeJsFramework:script];
}

+ (void)connectDebugServer:(NSString*)URL
{
    [[WXSDKManager bridgeMgr] connectToWebSocket:[NSURL URLWithString:URL]];
}

+ (void)connectDevToolServer:(NSString *)URL
{
    [[WXSDKManager bridgeMgr] connectToDevToolWithUrl:[NSURL URLWithString:URL]];

}

+ (void)_originalRegisterComponents:(NSDictionary *)components {
    void (^componentBlock)(id, id, BOOL *) = ^(id mKey, id mObj, BOOL * mStop) {
        
        NSString *name = mObj[@"name"];
        NSString *componentClass = mObj[@"clazz"];
        NSDictionary *pros = nil;
        if (mObj[@"pros"]) {
            pros = mObj[@""];
        }
        [self registerComponent:name withClass:NSClassFromString(componentClass) withProperties:pros];
    };
    [components enumerateKeysAndObjectsUsingBlock:componentBlock];
    
}

+ (void)_originalRegisterModules:(NSDictionary *)modules {
    void (^moduleBlock)(id, id, BOOL *) = ^(id mKey, id mObj, BOOL * mStop) {
        
        [self registerModule:mKey withClass:NSClassFromString(mObj)];
    };
    [modules enumerateKeysAndObjectsUsingBlock:moduleBlock];
}

+ (void)_originalRegisterHandlers:(NSDictionary *)handlers {
    void (^handlerBlock)(id, id, BOOL *) = ^(id mKey, id mObj, BOOL * mStop) {
        [self registerHandler:mObj withProtocol:NSProtocolFromString(mKey)];
    };
    [handlers enumerateKeysAndObjectsUsingBlock:handlerBlock];
}

@end

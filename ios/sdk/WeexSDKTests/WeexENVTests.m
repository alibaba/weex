/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXSDKEngine.h"
#import <objc/runtime.h>
#import "WXSDKInstance.h"
#import "WXDivComponent.h"

@interface NSBundle(TBHookTest)
+(void)hookContainer;
@end


@implementation NSBundle(TBHookTest)
- (NSURL *)hookURLForResource:(NSString *)name withExtension:(NSString *)ext {
    if ([ext hasSuffix:@"plist"]) {
        NSURL* bundleConfigurationURL = [[NSBundle bundleForClass:NSClassFromString(@"WeexSDKTests")] hookURLForResource:name withExtension:ext];
        return bundleConfigurationURL;
    }
    return [self hookURLForResource:name withExtension:ext];
}

+(void)hookContainer{
    Method originalMethod=class_getInstanceMethod([self class],@selector(URLForResource:withExtension:));
    Method swizzedMethod=class_getInstanceMethod([self class],@selector(hookURLForResource:withExtension:));
    method_exchangeImplementations(originalMethod,swizzedMethod);
}

@end


@interface WeexENVTests : XCTestCase

@end

@implementation WeexENVTests

- (void)setUp
{
//    [NSBundle hookContainer];
//    
//    WXDivComponent *div = [WXDivComponent new];
}

- (void)testJSFramework
{
//    NSString * path = [[NSBundle bundleForClass:NSClassFromString(@"WeexSDKTests")] pathForResource:@"weex" ofType:@"js"];
//    NSString * jsScript = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
//    
//    dispatch_semaphore_t sema = dispatch_semaphore_create(0);
//    
//    [WXSDKEngine initSDKEnviroment:jsScript];
//    
//    dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);
//    XCTAssert(NO, @"init成功");
}

- (void)testRegistModule
{
//    [WXSDKEngine registerModule:@"dom" withClass:@"WXDomModule"];
//    
//    XCTAssert(NO, @"注册成功");
}

- (void)testRegistComponent
{
//    [WXSDKEngine registerComponent:@"div" withClass:@"WXDivComponent"];
//    XCTAssert(NO, @"注册成功");
}

- (void)testCreateInstance
{
//    NSString * path = [[NSBundle bundleForClass:NSClassFromString(@"WeexSDKTests")] pathForResource:@"weex" ofType:@"js"];
//    NSString * jsScript = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
//    
//    dispatch_semaphore_t sema = dispatch_semaphore_create(0);
//    
//    [WXSDKEngine initSDKEnviroment:jsScript];
//
//    WXSDKInstance *instance = [[WXSDKInstance alloc] init];
//    
//    path = [[NSBundle bundleForClass:NSClassFromString(@"WeexSDKTests")] pathForResource:@"test" ofType:@"js"];
//    jsScript = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
//    
//    [instance renderView:jsScript options:nil data:nil];
//    dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);
}


@end

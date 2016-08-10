/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXSDKEngine.h"
#import "WXModuleFactory.h"
#import "WXComponentFactory.h"
#import "WXHandlerFactory.h"
#import "WXNetworkDefaultImpl.h"

@interface WXSDKEngineTests : XCTestCase

@end

@implementation WXSDKEngineTests

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testExample {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

- (void)testRegisterModule {
    
    [WXSDKEngine registerModule:@"stream" withClass:NSClassFromString(@"WXStreamModule")];
    
    NSDictionary *result = [WXModuleFactory moduleMethodMapsWithName:@"stream"];
    NSArray *maps = result[@"stream"];
    XCTAssertTrue(maps.count > 0);
    
    NSDictionary *moduleConfigs = [WXModuleFactory moduleConfigs];
    XCTAssertNotNil(moduleConfigs);
    XCTAssertEqualObjects(moduleConfigs[@"stream"], @"WXStreamModule");
    
    Class cls = [WXModuleFactory classWithModuleName:@"stream"];
    XCTAssertEqualObjects(NSStringFromClass(cls), @"WXStreamModule");
    
    SEL selector = [WXModuleFactory methodWithModuleName:@"stream" withMethod:@"fetch"];
    XCTAssertEqualObjects(NSStringFromSelector(selector), @"fetch:callback:progressCallback:");
}

- (void)testRegisterComponent {
    
    [WXSDKEngine registerComponent:@"embed" withClass:NSClassFromString(@"WXEmbedComponent")];
    
    Class cls = [WXComponentFactory classWithComponentName:@"embed"];
    XCTAssertEqualObjects(NSStringFromClass(cls), @"WXEmbedComponent");
    
    NSDictionary *componentConfigs = [WXComponentFactory componentConfigs];
    NSDictionary *config = componentConfigs[@"embed"];
    XCTAssertNotNil(config);
    XCTAssertEqualObjects(config[@"name"], @"embed");
    XCTAssertEqualObjects(config[@"clazz"], @"WXEmbedComponent");
}

- (void)testRegisterComponentwithProperties {
    
    [WXSDKEngine registerComponent:@"embed" withClass:NSClassFromString(@"WXEmbedComponent") withProperties: @{@"key":@"abc"}];
    
    Class cls = [WXComponentFactory classWithComponentName:@"embed"];
    XCTAssertEqualObjects(NSStringFromClass(cls), @"WXEmbedComponent");
    
    NSDictionary *componentConfigs = [WXComponentFactory componentConfigs];
    NSDictionary *config = componentConfigs[@"embed"];
    XCTAssertNotNil(config);
    
    XCTAssertEqualObjects(config[@"name"], @"embed");
    XCTAssertEqualObjects(config[@"clazz"], @"WXEmbedComponent");
    XCTAssertEqualObjects(config[@"pros"], @{@"key":@"abc"});
}

- (void)testRegisterHandler {
    
    [WXSDKEngine registerHandler:[WXNetworkDefaultImpl new] withProtocol:@protocol(WXNetworkProtocol)];
    id handler = [WXHandlerFactory handlerForProtocol:@protocol(WXNetworkProtocol)];
    XCTAssertNotNil(handler);
    XCTAssertTrue([handler conformsToProtocol:@protocol(WXNetworkProtocol)]);
    
    NSDictionary *handlerConfigs = [WXHandlerFactory handlerConfigs];
    handler = [handlerConfigs objectForKey:NSStringFromProtocol(@protocol(WXNetworkProtocol))];
    XCTAssertNotNil(handler);
    XCTAssertTrue([handler conformsToProtocol:@protocol(WXNetworkProtocol)]);
}

- (void)testComponentFactory {
    
    Class cls = [WXComponentFactory classWithComponentName:@"abc"];
    XCTAssertNil(cls);

    NSDictionary *component = @{@"name": @"div", @"class": @"WXComponent"};
    [WXComponentFactory registerComponents: [NSArray arrayWithObjects:component, nil]];
    
    NSDictionary *componentConfigs = [WXComponentFactory componentConfigs];
    NSDictionary *config = componentConfigs[@"div"];
    XCTAssertNotNil(config);
    XCTAssertEqualObjects(config[@"name"], @"div");
    XCTAssertEqualObjects(config[@"clazz"], @"WXComponent");
    
    cls = [WXComponentFactory classWithComponentName:@"abc"];
    XCTAssertEqualObjects(NSStringFromClass(cls), @"WXComponent");
    
    [WXComponentFactory unregisterAllComponents];
    componentConfigs = [WXComponentFactory componentConfigs];
    XCTAssertTrue([componentConfigs allKeys].count == 0);
}

- (void)testModuleFactory {
    
    Class cls = [WXModuleFactory classWithModuleName:@"abc"];
    XCTAssertNil(cls);
}

- (void)testInitSDKEnviroment {
    
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXStreamModule.h"
#import <WeexSDK/WeexSDK.h>
#import "WXResourceRequestHandlerDefaultImpl.h"

@interface WXStreamModuleTests : XCTestCase
@property (nonatomic, strong)  WXStreamModule *streamModule;
@property (nonatomic, strong)XCTestExpectation *exp;

@end

@implementation WXStreamModuleTests

- (void)setUp {
    [super setUp];
    _streamModule = [[WXStreamModule alloc] init];
    [WXSDKEngine registerHandler:[WXResourceRequestHandlerDefaultImpl new] withProtocol:@protocol(WXResourceRequestHandler)];
    _exp = [self expectationWithDescription:@"SendRequestSuccess Unit Test Error!"];
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testSendHttpGet {
    
    NSDictionary *getOption = @{
        @"method" : @"GET",
        @"url"    : @"http://httpbin.org/get"
    };
    [self sendHttp:getOption];
    
}
- (void)testSendHttpPost {
    NSDictionary *postOption = @{
        @"method" : @"POST",
        @"url"    : @"http://httpbin.org/post",
        @"body"   : @"username=weex&&password=weex"
    };
    [self sendHttp:postOption];
}

- (void)sendHttp:(NSDictionary*)options {
    __block id callbackResult = nil;
    [_streamModule sendHttp:options callback:^(id result) {
        callbackResult = result;
        [_exp fulfill];
    }];
    [self waitForExpectationsWithTimeout:20 handler:^(NSError * error) {
        XCTAssertNotNil(callbackResult);
    }];
    
}

- (void)fetch:(NSDictionary*)options {
    __block id callbackRet = nil, progressCallbackRet = nil;
    [_streamModule fetch:options callback:^(id result) {
        callbackRet = result;
    } progressCallback:^(id result, BOOL keepAlive) {
        progressCallbackRet = result;
        [_exp fulfill];
    }];
    
    [self waitForExpectationsWithTimeout:10 handler:^(NSError * error) {
        XCTAssertNotNil(callbackRet); // final result
    }];
}

@end

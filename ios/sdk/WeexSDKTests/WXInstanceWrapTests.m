/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXInstanceWrap.h"
#import "WXSDKInstance.h"

@interface WXInstanceWrapTests : XCTestCase

@property (nonatomic, strong) WXInstanceWrap *instanceWrap;

@property (nonatomic, strong)  XCTestExpectation *exp;

@property (nonatomic, strong)  NSError *error;

@end

@implementation WXInstanceWrapTests

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
    
    self.instanceWrap = [[WXInstanceWrap alloc] init];
    
    __weak typeof(self) weakSelf = self;
    WXSDKInstance *instance = [[WXSDKInstance alloc] init];
    instance.onFailed = ^(NSError *error) {
        weakSelf.error = error;
        [weakSelf.exp fulfill];
    };
    
    self.instanceWrap.weexInstance = instance;
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testExample {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
}

- (void)testErrorCodeInfo {
    
    self.exp = [self expectationWithDescription:@" Error!"];
    
    [self.instanceWrap error:11 code:101 info:@"101"];
    
    __weak typeof(self) weakSelf = self;
    [self waitForExpectationsWithTimeout:2 handler:^(NSError * _Nullable error) {
        if (error) {
            NSLog(@"Timeout Error: %@", error);
        }
        
        XCTAssert(weakSelf.error.code == 101);
        XCTAssertEqualObjects(weakSelf.error.domain , @"11");
        XCTAssertEqualObjects(weakSelf.error.userInfo[NSLocalizedDescriptionKey], @"101");
    }];
}

@end

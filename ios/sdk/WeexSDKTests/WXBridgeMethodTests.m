/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXCallJSMethod.h"
#import "WXSDKInstance.h"

@interface WXBridgeMethodTests : XCTestCase

@end

@implementation WXBridgeMethodTests

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
    WXSDKInstance *instance = [[WXSDKInstance alloc] init];
    
    WXCallJSMethod *method = [[WXCallJSMethod alloc] initWithModuleName:@"dom" methodName:@"test" arguments:@[@"1", @"2", @"3"] instance:instance];
    
    NSDictionary *task = [method callJSTask];
    XCTAssertEqualObjects(task[@"module"], @"dom");
    XCTAssertEqualObjects(task[@"method"], @"test");
    
    NSArray *args = task[@"args"];
    XCTAssertTrue(args.count == 3);
    XCTAssertEqualObjects(args[0], @"1");
    XCTAssertEqualObjects(args[1], @"2");
    XCTAssertEqualObjects(args[2], @"3");
    
    WXCallJSMethod *method2 = [[WXCallJSMethod alloc] initWithModuleName:nil methodName:nil arguments:nil instance:[[WXSDKInstance alloc] init]];
    
    task = [method2 callJSTask];
    XCTAssertEqualObjects(task[@"module"], @"");
    XCTAssertEqualObjects(task[@"method"], @"");
    
    args = task[@"args"];
    XCTAssertNotNil(args);
    XCTAssertTrue(args.count == 0);
}

@end

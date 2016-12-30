/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXBridgeMethod.h"
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
    
    NSDictionary *data = @{@"module":@"dom", @"method":@"test", @"args":@[@"1", @"2", @"3"]};
    WXBridgeMethod *method = [[WXBridgeMethod alloc] initWithInstance:@"0" data:[NSMutableDictionary dictionaryWithDictionary:data]];
    
    NSDictionary *desc = [method dataDesc];
    XCTAssertEqualObjects(desc[@"module"], @"dom");
    XCTAssertEqualObjects(desc[@"method"], @"test");
    
    NSArray *args = desc[@"args"];
    XCTAssertTrue(args.count == 3);
    XCTAssertEqualObjects(args[0], @"1");
    XCTAssertEqualObjects(args[1], @"2");
    XCTAssertEqualObjects(args[2], @"3");
    
    method = [[WXBridgeMethod alloc] initWithInstance:@"1" data:[NSMutableDictionary dictionary]];
    
    desc = [method dataDesc];
    XCTAssertEqualObjects(desc[@"module"], @"");
    XCTAssertEqualObjects(desc[@"method"], @"");
    
    args = desc[@"args"];
    XCTAssertNotNil(args);
    XCTAssertTrue(args.count == 0);
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end

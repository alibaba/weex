//
//  WXFloatCompareTests.m
//  WeexSDK
//
//  Created by 齐山 on 17/1/22.
//  Copyright © 2017年 taobao. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "WXUtility.h"

@interface WXFloatCompareTests : XCTestCase

@end

@implementation WXFloatCompareTests

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testWXFloatEqual {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    float a = 0.1;
    double b = 0.1;
    BOOL boolval = WXFloatEqual(a, b);
    XCTAssertTrue(boolval);
}

- (void)testWXFloatEqualWithPrecision {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    float a = 0.1;
    double b = 0.1;
    BOOL boolval = WXFloatEqualWithPrecision(a, b , 0.01);
    XCTAssertTrue(boolval);
}

- (void)testWXFloatLessThan {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    float a = 0.1;
    double b = 0.2;
    BOOL boolval = WXFloatLessThan(a, b);
    XCTAssertTrue(boolval);
}

- (void)testWXFloatLessThanWithPrecision {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    float a = 0.1;
    double b = 0.2;
    BOOL boolval = WXFloatLessThanWithPrecision(a, b, 0.01);
    XCTAssertTrue(boolval);
}

- (void)testWXFloatGreaterThan {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    float a = 0.2;
    double b = 0.1;
    BOOL boolval = WXFloatGreaterThan(a, b);
    XCTAssertTrue(boolval);
}

- (void)testWXFloatGreaterThanWithPrecision {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
    float a = 0.2;
    double b = 0.1;
    BOOL boolval = WXFloatGreaterThanWithPrecision(a, b,0.01);
    XCTAssertTrue(boolval);
}

@end

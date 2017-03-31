/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXSDKManager.h"
#import "WXSDKInstance.h"
#import "TestSupportUtils.h"

@interface WXSDKManagerTests : XCTestCase

@end

@implementation WXSDKManagerTests

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

- (void)testWXSDKManager {
    id bridgeMgr = [WXSDKManager bridgeMgr];
    XCTAssertNotNil(bridgeMgr);
    XCTAssertTrue([bridgeMgr isKindOfClass:NSClassFromString(@"WXBridgeManager")]);
    
    [WXSDKManager storeInstance:[WXSDKInstance new] forID:@"0"];
    WXSDKInstance *instance0 = [WXSDKManager instanceForID:@"0"];
    XCTAssertNotNil(instance0);
    
    [WXSDKManager storeInstance:[WXSDKInstance new] forID:@"1"];
    WXSDKInstance *instance1 = [WXSDKManager instanceForID:@"1"];
    XCTAssertNotNil(instance1);
    
    [WXSDKManager removeInstanceforID:@"0"];
    instance0 = [WXSDKManager instanceForID:@"0"];
    XCTAssertNil(instance0);
    
    [WXSDKManager unload];
   // [TestSupportUtils waitSecs:5];
    instance1 = [WXSDKManager instanceForID:@"1"];
    //XCTAssertNil(instance1);
}

- (void)testUnload {
    
}

@end

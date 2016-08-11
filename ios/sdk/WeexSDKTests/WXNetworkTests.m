/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXNetworkDefaultImpl.h"
#import "WXUtility.h"

@interface WXNetworkTests : XCTestCase

@property (nonatomic, strong)  WXNetworkDefaultImpl *networkHandler;

@end

@implementation WXNetworkTests

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
    
    self.networkHandler = [[WXNetworkDefaultImpl alloc] init];
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

- (void) testSendRequestSuccess {
    
    XCTestExpectation *exp = [self expectationWithDescription:@"SendRequestSuccess Unit Test Error!"];
    
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://www.taobao.com"]];
    
    __block NSURLResponse *urlResponse;
    __block NSError *respError;
    __block NSData *respData;
    
    [_networkHandler sendRequest:request
                withSendingData:^(int64_t bytesSent, int64_t totalBytes) {}
                   withResponse:^(NSURLResponse *response) {
                       urlResponse = response;
                   }
                withReceiveData:^(NSData *data) {}
                withCompeletion:^(NSData *totalData, NSError *error) {
                    
                    if (!error && [urlResponse isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse *)urlResponse).statusCode != 200) {
                        error = [NSError errorWithDomain:WX_ERROR_DOMAIN
                                                    code:((NSHTTPURLResponse *)urlResponse).statusCode
                                                userInfo:@{@"message":@"status code error."}];
                    }
                    
                    respError = error;
                    respData = totalData;
                    
                    [exp fulfill];
                }];
    
    [self waitForExpectationsWithTimeout:10 handler:^(NSError * _Nullable error) {
        XCTAssertNil(respError);
        XCTAssertNotNil(respData);
    }];
}

/*- (void) testSendRequestFailure {
    
    XCTestExpectation *exp = [self expectationWithDescription:@"SendRequestFailure Unit Test Error!"];
    
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://www.123.abc"]];
    
    __block NSURLResponse *urlResponse;
    __block NSError *respError;
    __block NSData *respData;
    
    [_networkHandler sendRequest:request
                 withSendingData:^(int64_t bytesSent, int64_t totalBytes) {}
                    withResponse:^(NSURLResponse *response) {
                        urlResponse = response;
                    }
                 withReceiveData:^(NSData *data) {}
                 withCompeletion:^(NSData *totalData, NSError *error) {
                     
                     if (!error && [urlResponse isKindOfClass:[NSHTTPURLResponse class]] && ((NSHTTPURLResponse *)urlResponse).statusCode != 200) {
                         error = [NSError errorWithDomain:WX_ERROR_DOMAIN
                                                     code:((NSHTTPURLResponse *)urlResponse).statusCode
                                                 userInfo:@{@"message":@"status code error."}];
                     }
                     
                     respError = error;
                     respData = totalData;
                     [exp fulfill];
                 }];
    
    [self waitForExpectationsWithTimeout:10 handler:^(NSError * _Nullable error) {
        XCTAssertNotNil(respError);
        XCTAssertNil(respData);
    }];
}*/

@end

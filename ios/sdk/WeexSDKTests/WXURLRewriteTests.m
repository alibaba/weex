//
//  WXURLRewriteTests.m
//  WeexSDK
//
//  Created by yinfeng on 2016/11/24.
//  Copyright © 2016年 taobao. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "WXURLRewriteProtocol.h"
#import "WXHandlerFactory.h"
#import "WXSDKInstance.h"
#import "WXSDKEngine.h"
#import <OCMock/OCMock.h>

@interface WXURLRewriteTests : XCTestCase

@property (nonatomic, strong) id<WXURLRewriteProtocol> rewriteHandler;
@property (nonatomic, strong) WXSDKInstance *instance;

@end

static id _mockNSBundle;

@implementation WXURLRewriteTests

- (void)setUp {
    [super setUp];
    [WXSDKEngine registerHandler:[[NSClassFromString(@"WXURLRewriteDefaultImpl") alloc] init] withProtocol:@protocol(WXURLRewriteProtocol)];
    _rewriteHandler = [WXHandlerFactory handlerForProtocol:@protocol(WXURLRewriteProtocol)];
    _instance = [[WXSDKInstance alloc] init];
    _instance.scriptURL = [NSURL URLWithString:@"https://www.weex.com/test/test.js"];
    
    _mockNSBundle = [OCMockObject niceMockForClass:[NSBundle class]];
    NSBundle *correctMainBundle = [NSBundle bundleForClass:self.class];
    [[[_mockNSBundle stub] andReturn:correctMainBundle] mainBundle];
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
    _rewriteHandler = nil;
}

- (void)testHttpURL {
    NSString *testURL1 = @"http://www.weex2.net/test.jpg";
    NSURL *rewriteURL1 = [_rewriteHandler rewriteURL:testURL1 withResourceType:WXResourceTypeImage withInstance:_instance];
    XCTAssertEqualObjects(testURL1, rewriteURL1.absoluteString);
    
    NSString *testURL2 = @"https://www.weex3.org/test.ttf";
    NSURL *rewriteURL2 = [_rewriteHandler rewriteURL:testURL2 withResourceType:WXResourceTypeFont withInstance:_instance];
    XCTAssertEqualObjects(testURL2, rewriteURL2.absoluteString);
}

- (void)testNoSchemeURL {
    NSString *testURL = @"//www.weex.net/test.jpg";
    NSURL *rewriteURL = [_rewriteHandler rewriteURL:testURL withResourceType:WXResourceTypeImage withInstance:_instance];
    XCTAssertEqualObjects(@"https://www.weex.net/test.jpg", [rewriteURL absoluteString]);
}

- (void)testRelativeURL {
    NSString *testURL1 = @"./test.jpg";
    NSURL *rewriteURL1 = [_rewriteHandler rewriteURL:testURL1 withResourceType:WXResourceTypeImage withInstance:_instance];
    XCTAssertEqualObjects(@"https://www.weex.com/test/test.jpg", rewriteURL1.absoluteString);
    
    NSString *testURL2 = @"../test.jpg";
    NSURL *rewriteURL2 = [_rewriteHandler rewriteURL:testURL2 withResourceType:WXResourceTypeImage withInstance:_instance];
    XCTAssertEqualObjects(@"https://www.weex.com/test.jpg", rewriteURL2.absoluteString);
    
    NSString *testURL3 = @"/test.jpg";
    NSURL *rewriteURL3 = [_rewriteHandler rewriteURL:testURL3 withResourceType:WXResourceTypeImage withInstance:_instance];
    XCTAssertEqualObjects(@"https://www.weex.com/test.jpg", rewriteURL3.absoluteString);
    
    NSString *testURL4 = @"test.jpg";
    NSURL *rewriteURL4 = [_rewriteHandler rewriteURL:testURL4 withResourceType:WXResourceTypeImage withInstance:_instance];
    XCTAssertEqualObjects(@"https://www.weex.com/test/test.jpg", rewriteURL4.absoluteString);
}

- (void)testFileURL {
    NSBundle *bundle = [NSBundle bundleForClass:[self class]];
    NSURL *fileURL = [bundle URLForResource:@"testRootView" withExtension:@"js"];
    NSURL *rewriteURL = [_rewriteHandler rewriteURL:fileURL.absoluteString withResourceType:WXResourceTypeMainBundle withInstance:_instance];
    XCTAssertEqualObjects(fileURL.absoluteString, [rewriteURL absoluteString]);
}

- (void)testLocalURL {
    NSString *testURL = @"local://testRootView.js";
    NSBundle *bundle = [NSBundle bundleForClass:[self class]];
    NSURL *fileURL = [bundle URLForResource:@"testRootView" withExtension:@"js"];
    NSURL *rewriteURL = [_rewriteHandler rewriteURL:testURL withResourceType:WXResourceTypeMainBundle withInstance:_instance];
    XCTAssertEqualObjects(fileURL.absoluteString, [rewriteURL absoluteString]);
}

@end

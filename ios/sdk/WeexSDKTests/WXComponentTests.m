//
//  WXComponentTests.m
//  WeexSDK
//
//  Created by yinfeng on 16/7/18.
//  Copyright © 2016年 taobao. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "WXSDKInstance.h"
#import "WXComponent.h"
#import "WXComponent_internal.h"

@interface WXTestComponent : WXComponent

@end

@implementation WXTestComponent

@end

@interface WXComponentTests : XCTestCase

@end

@implementation WXComponentTests

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

- (void)testDefaultProperties {
    WXComponent *component = [[WXComponent alloc] initWithRef:@"0" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:[[WXSDKInstance alloc] init]];
    
    /**
     *  Layout
     */
    XCTAssertTrue(component->_isLayoutDirty);
    XCTAssertTrue(CGRectEqualToRect(component.calculatedFrame, CGRectZero));
    XCTAssertTrue(CGPointEqualToPoint(component.absolutePosition, CGPointZero));
    XCTAssertEqual(component->_positionType, WXPositionTypeRelative);
    
    /**
     *  View
     */
    XCTAssertEqual(component->_backgroundColor, [UIColor clearColor]);
    XCTAssertEqual(component->_clipToBounds, NO);
    XCTAssertNil(component->_view);
    XCTAssertEqual(component->_opacity, 1.0);
    XCTAssertEqual(component->_visibility, WXVisibilityShow);
}

- (void)testComponentCreatedOnBackgroundCanCreateView
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        WXComponent *component = [[WXComponent alloc] initWithRef:@"0" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:[[WXSDKInstance alloc] init]];
        dispatch_async(dispatch_get_main_queue(), ^{
            XCTAssertNotNil(component.view, @"Component's view should be created");
        });
    });
}

- (void)testReferenceCounting
{
    WXComponent *component = [[WXComponent alloc] initWithRef:@"0" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:[[WXSDKInstance alloc] init]];
    
    XCTAssertTrue(1 == component.retainCount, @"unexpected retain count:%tu", component.retainCount);
    
    [component retain];
    XCTAssertTrue(2 == component.retainCount, @"unexpected retain count:%tu", component.retainCount);
    
    [component release];
    XCTAssertTrue(1 == component.retainCount);
}


@end

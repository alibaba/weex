/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXSDKInstance.h"
#import "WXComponent.h"
#import "WXConvert.h"
#import "WXComponent_internal.h"
#import "WXAnimationModule.h"
#import "TestSupportUtils.h"

@interface WXAnimationModuleTests : XCTestCase

@end

@implementation WXAnimationModuleTests

- (void)setUp {
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testExample {
    
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

- (void)testAnimationRotate {
    WXComponent *component = [self component];
    WXAnimationModule *object = [[WXAnimationModule alloc]init];
    [object animation:component args:@{@"duration":@500, @"timingFunction":@"ease-in-out", @"styles":@{@"transform":@"rotate(90deg)"}} callback:nil];
    [TestSupportUtils waitSecs:1];
    
    XCTAssert(CATransform3DEqualToTransform(component.layer.transform, CATransform3DMakeAffineTransform(CGAffineTransformRotate(CGAffineTransformIdentity, M_PI / 2))));
}

- (void)testAnimationTranslate {
    WXComponent *component = [self component];
    WXAnimationModule *object = [[WXAnimationModule alloc]init];
    [object animation:component args:@{@"duration":@500, @"timingFunction":@"linear", @"styles":@{@"transform":@"translate(50%, 50%)"}} callback:nil];
    [TestSupportUtils waitSecs:1];
    
    CGRect frame = component.layer.frame;
    XCTAssert(frame.origin.x == 50.0f && frame.origin.y == 50.0f);
}

- (void)testAnimationScale {
    WXComponent *component = [self component];
    WXAnimationModule *object = [[WXAnimationModule alloc]init];
    [object animation:component args:@{@"duration":@500, @"timingFunction":@"linear", @"styles":@{@"transform":@"scale(2)"}} callback:nil];
    [TestSupportUtils waitSecs:1];
    
    CGRect frame = component.layer.frame;
    XCTAssert(frame.size.width == 200.0f && frame.size.height == 200.0f);
}

- (void)testAnimationOpacity {
    WXComponent *component = [self component];
    WXAnimationModule *object = [[WXAnimationModule alloc]init];
    [object animation:component args:@{@"duration":@500, @"timingFunction":@"linear", @"styles":@{@"backgroundColor":@"blue"}} callback:nil];
    [TestSupportUtils waitSecs:1];
    XCTAssert(component.layer.backgroundColor==[WXConvert CGColor:@"blue"]);
}

- (WXComponent *)component {
    WXComponent *component = [[WXComponent alloc] initWithRef:@"0" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:[[WXSDKInstance alloc] init]];
    XCTAssertNotNil(component.view, @"Component's view should be created");
    
    component.view.frame = CGRectMake(0.0f, 0.0f, 100.0f, 100.0f);
    component.view.backgroundColor = [UIColor redColor];
    
    return component;
}

@end

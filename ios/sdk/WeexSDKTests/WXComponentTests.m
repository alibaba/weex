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
#import "WXComponent_internal.h"
#import "WXUtility.h"

@interface WXTestComponent : WXComponent

@end

@implementation WXTestComponent

- (UIView *)loadView
{
    UIView *view = [[UIView alloc] init];
    view.tag = 999;
    return view;
}

@end

@interface WXComponentTests : XCTestCase

@end

@implementation WXComponentTests

- (void)setUp
{
    [super setUp];
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown
{
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testDefaultProperties
{
    WXComponent *component = [[WXComponent alloc] initWithRef:@"0" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:[[WXSDKInstance alloc] init]];
    
    /**
     *  Layout
     */
    XCTAssertTrue(component->_isLayoutDirty);
    XCTAssertTrue(CGRectEqualToRect(component.calculatedFrame, CGRectZero));
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

- (void)testThatComponentCreatedOnBackgroundCanCreateView
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        WXComponent *component = [[WXComponent alloc] initWithRef:@"0" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:[[WXSDKInstance alloc] init]];
        dispatch_async(dispatch_get_main_queue(), ^{
            XCTAssertNotNil(component.view, @"Component's view should be created");
        });
    });
}

- (void)testThatLoadViewTakeEffect
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        WXComponent *component = [[WXTestComponent alloc] initWithRef:@"0" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:[[WXSDKInstance alloc] init]];
        dispatch_async(dispatch_get_main_queue(), ^{
            XCTAssertEqual(component.view.tag, 999, @"Component's loadView not take effect.");
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

- (void)testLazyCreatView
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        WXSDKInstance *instance = [[WXSDKInstance alloc] init];
        WXComponent *component = [[WXComponent alloc] initWithRef:@"0" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:instance];
        WXComponent *subcomponent = [[WXComponent alloc] initWithRef:@"1" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:instance];
        WXComponent *subSubcomponent = [[WXComponent alloc] initWithRef:@"2" type:@"div" styles:@{} attributes:@{} events:@[] weexInstance:instance];
        subcomponent->_lazyCreateView = YES;
        [component _insertSubcomponent:subcomponent atIndex:0];
        [subcomponent _insertSubcomponent:subSubcomponent atIndex:0];
        dispatch_async(dispatch_get_main_queue(), ^{
            __unused UIView *view = component.view;
            XCTAssertFalse([subcomponent isViewLoaded], @"Component which has lazyCreateView should create view when used");
            XCTAssertFalse([subSubcomponent isViewLoaded], @"Component which has lazyCreateView should create view when used");
            __unused UIView *subView = subcomponent.view;
            XCTAssertTrue([subSubcomponent isViewLoaded], @"Component's lazyCreateView can not create subview.");
            XCTAssertEqual(subSubcomponent.view.superview, subcomponent.view, @"Component's lazyCreateView can not add subcomponent's view to subview");
        });
    });
}

#define XCTAssertEqualCGFloat(expression1, expression2, ...) \
    XCTAssertEqualWithAccuracy(expression1, expression2, 0.00001)

- (void)testCSSNodeStyleConvert
{
    NSDictionary *testStyles =
    @{
      @"flex":@2.0,
      @"flexDirection":@"row",
      @"alignItems":@"flex-start",
      @"alignSelf":@"flex-end",
      @"flexWrap":@"wrap",
      @"justifyContent":@"space-between",
      @"position" : @"absolute",
      @"left" : @1.2f,
      @"top" : @2.3f,
      @"right" : @3.4f,
      @"bottom" : @4.5f,
      @"width" : @100.1f,
      @"height" : @199.9f,
      @"minWidth" : @88.8f,
      @"minHeight" : @188.8f,
      @"maxWidth" : @188.8f,
      @"maxHeight" : @200.1f,
      @"marginTop" : @5.4f,
      @"marginLeft" : @4.3f,
      @"marginRight" : @3.2f,
      @"marginBottom" : @2.1f,
      @"borderLeftWidth" : @2.3f,
      @"borderRightWidth" : @2.3f,
      @"borderTopWidth" : @3.4f,
      @"borderBottomWidth" : @3.4f,
      @"paddingTop" : @1.2f,
      @"paddingLeft" : @2.3f,
      @"paddingRight" : @3.4f,
      @"paddingBottom" : @4.5f
      };
    
    WXComponent *component = [[WXComponent alloc] initWithRef:@"1" type:@"div" styles:testStyles attributes:nil events:nil weexInstance:[[WXSDKInstance alloc] init]];
    
    css_node_t *cssNode = component.cssNode;
    CGFloat scale = WXScreenResizeRadio();
    
    XCTAssertEqual(cssNode->style.flex, 2.0);
    XCTAssertEqual(cssNode->style.flex_direction, CSS_FLEX_DIRECTION_ROW);
    XCTAssertEqual(cssNode->style.align_items, CSS_ALIGN_FLEX_START);
    XCTAssertEqual(cssNode->style.align_self, CSS_ALIGN_FLEX_END);
    XCTAssertEqual(cssNode->style.flex_wrap, CSS_WRAP);
    XCTAssertEqual(cssNode->style.justify_content, CSS_JUSTIFY_SPACE_BETWEEN);
    XCTAssertEqual(cssNode->style.position_type, CSS_POSITION_ABSOLUTE);
    XCTAssertEqualCGFloat(cssNode->style.position[CSS_LEFT], 1.2 * scale);
    XCTAssertEqualCGFloat(cssNode->style.position[CSS_TOP], 2.3 * scale);
    XCTAssertEqualCGFloat(cssNode->style.position[CSS_RIGHT], 3.4 * scale);
    XCTAssertEqualCGFloat(cssNode->style.position[CSS_BOTTOM], 4.5 * scale);
    XCTAssertEqualCGFloat(cssNode->style.dimensions[CSS_WIDTH], 100.1 * scale);
    XCTAssertEqualCGFloat(cssNode->style.dimensions[CSS_HEIGHT], 199.9 * scale);
    XCTAssertEqualCGFloat(cssNode->style.minDimensions[CSS_WIDTH], 88.8 * scale);
    XCTAssertEqualCGFloat(cssNode->style.minDimensions[CSS_HEIGHT], 188.8 * scale);
    XCTAssertEqualCGFloat(cssNode->style.maxDimensions[CSS_WIDTH], 188.8 * scale);
    XCTAssertEqualCGFloat(cssNode->style.maxDimensions[CSS_HEIGHT], 200.1 * scale);
    XCTAssertEqualCGFloat(cssNode->style.margin[CSS_TOP], 5.4 * scale);
    XCTAssertEqualCGFloat(cssNode->style.margin[CSS_LEFT], 4.3 * scale);
    XCTAssertEqualCGFloat(cssNode->style.margin[CSS_RIGHT], 3.2 * scale);
    XCTAssertEqualCGFloat(cssNode->style.margin[CSS_BOTTOM], 2.1 * scale);
    XCTAssertEqualCGFloat(cssNode->style.border[CSS_LEFT], 2.3 * scale);
    XCTAssertEqualCGFloat(cssNode->style.border[CSS_TOP], 3.4 * scale);
    XCTAssertEqualCGFloat(cssNode->style.border[CSS_RIGHT], 2.3 * scale);
    XCTAssertEqualCGFloat(cssNode->style.border[CSS_BOTTOM], 3.4 * scale);
    XCTAssertEqualCGFloat(cssNode->style.padding[CSS_TOP], 1.2 * scale);
    XCTAssertEqualCGFloat(cssNode->style.padding[CSS_LEFT], 2.3 * scale);
    XCTAssertEqualCGFloat(cssNode->style.padding[CSS_RIGHT], 3.4 * scale);
    XCTAssertEqualCGFloat(cssNode->style.padding[CSS_BOTTOM], 4.5 * scale);
}


@end

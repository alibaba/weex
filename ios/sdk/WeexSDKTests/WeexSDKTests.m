/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <XCTest/XCTest.h>
#import "WXModuleFactory.h"
#import "WXRenderFactory.h"
#import "WXDomModule.h"
#import "WXUtility.h"
#import <objc/runtime.h>
#import "WXNodeProtocol.h"

@interface WeexSDKTests : XCTestCase

@end

@implementation WeexSDKTests

//- (void)setUp {
//    [super setUp];
//    
////    WXDomModule *module = [[WXDomModule alloc] init];
////    NSLog(@"%@", module);
//    
//    unsigned int methodCount = 0;
//    Method *methodList = class_copyMethodList([WXDomModule class], &methodCount);
//    
//    NSLog(@"%d", methodCount);
//    for (unsigned int i = 0; i < methodCount; i++) {
//        NSString *selStr = [NSString stringWithCString:sel_getName(method_getName(methodList[i])) encoding:NSUTF8StringEncoding];
//        
//        NSLog(@"%@", selStr);
//    }
//}
//
//- (void)tearDown {
//    // Put teardown code here. This method is called after the invocation of each test method in the class.
//    [super tearDown];
//}
//
///**
// * 测试注册模块
// **/
//- (void)testSDKRegist {
//    
//    // Put setup code here. This method is called before the invocation of each test method in the class.
//    
//    NSString *path = [[NSBundle bundleForClass:[WeexSDKTests class]] pathForResource:@"weex_config" ofType:@"plist"];
//    if(!path || ![[NSFileManager defaultManager] fileExistsAtPath:path]){
//        return;
//    }
//    
//    NSDictionary *dict = [NSDictionary dictionaryWithContentsOfFile:path];
//    
//    if(!dict) return;
//    
//    // 注册模块
//    WX_REGISTER_MODULES(dict[@"module"]);
//    
//    // 注册组件
//    WX_REGISTER_COMPONENTS(dict[@"component"]);
//}
//
///**
// * 测试JS脚本拼接
// **/
//- (void)testScriptFunc {
//    NSDictionary *param = @{@"option":@"SYNC"};
//    NSDictionary *data = @{@"data":@{@"key":@"value"}};
//    
//    NSString *script = WXJSScript(@"createInstance", @"123", param, data, nil);
//    
//    
//    NSString *result = [NSString stringWithFormat:@"createInstance(%@, %@, %@)", @"123", WXEncodeJson(param), WXEncodeJson(data)];
//    XCTAssert(![script isEqualToString:result], @"脚本方法错误！");
//}
//
///**
// * 测试销毁实例
// **/
//- (void)testSDKInit {
//    
//}
//
//- (void)testPerformanceExample {
//    // This is an example of a performance test case.
//    [self measureBlock:^{
//        // Put the code you want to measure the time of here.
//    }];
//}
//
@end

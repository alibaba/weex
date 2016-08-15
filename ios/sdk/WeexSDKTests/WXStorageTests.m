//
//  WXStorageTests.m
//  WeexSDK
//
//  Created by Jun Shi on 7/22/16.
//  Copyright © 2016 taobao. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "WeexSDK.h"
#import "WXStorageModule.h"

@interface WXStorageTests : XCTestCase

@property (nonatomic, strong) WXStorageModule *storage;

@end

@implementation WXStorageTests

- (void)setUp {
    [super setUp];
    self.storage = [WXStorageModule new];
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}


- (void)testGetItem {
    NSLog(@"================ Set Item ======================");
    [self.storage setItem:@"key" value:@"value" callback:^(id result) {
        NSLog(@"%@",result);
    }];
    
    [self.storage setItem:@"key1" value:@"value1" callback:^(id result) {
        NSLog(@"%@",result);
    }];
    [self.storage setItem:@"key2" value:@"value2" callback:^(id result) {
        NSLog(@"%@",result);
    }];
    
    [self.storage setItem:@"key3" value:@"value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3value3" callback:^(id result) {
        NSLog(@"== %@",result);
    }];
    NSLog(@"================ Get Item ======================");
    [self.storage getItem:@"key" callback:^(id result) {
        NSLog(@"%@",result);
    }];
    
    [self.storage getItem:@"key1" callback:^(id result) {
        NSLog(@"%@",result);
    }];
    
    [self.storage getItem:@"key2" callback:^(id result) {
        NSLog(@"%@",result);
    }];
    
    [self.storage getItem:@"key3" callback:^(id result) {
        NSLog(@"%@",result);
    }];
    
    [self.storage getAllKeys:^(id result) {
        NSLog(@"getAllKeys : %@",result);
    }];
    
    [self.storage removeItem:@"key3" callback:^(id result) {
        NSLog(@"%@",result);
    }];
    
    [self.storage getItem:@"key3" callback:^(id result) {
        NSLog(@"%@",result);
    }];
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end

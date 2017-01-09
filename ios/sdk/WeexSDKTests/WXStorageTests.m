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
@property (nonatomic, strong) dispatch_queue_t storageQueue;
@property (nonatomic, copy) NSString *directory;
@property (nonatomic, copy) NSString *filePath;
@property (nonatomic, copy) NSString *indexPath;
@property (nonatomic, copy) NSString *infoPath;
@property (nonatomic, copy) NSString *longValue;

@end

@implementation WXStorageTests

- (void)setUp {
    [super setUp];
    
    self.directory = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
    self.directory = [self.directory stringByAppendingPathComponent:@"wxstorage"];
    NSLog(@"---storage directory: %@",self.directory);
    self.filePath = [self.directory stringByAppendingPathComponent:@"wxstorage.plist"];
    self.infoPath = [self.directory stringByAppendingPathComponent:@"wxstorage.info.plist"];
    self.indexPath = [self.directory stringByAppendingPathComponent:@"wxstorage.index.plist"];
    
    // clear storage
    [[NSFileManager defaultManager] removeItemAtPath:self.filePath error:nil];
    [[NSFileManager defaultManager] removeItemAtPath:self.infoPath error:nil];
    [[NSFileManager defaultManager] removeItemAtPath:self.indexPath error:nil];
    
    self.storage = [WXStorageModule new];
    
    self.longValue = @"longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4longValue4";
    
    [self.storage setItem:@"initKey1" value:@"initValue1" callback:^(id result) {}];
    [self.storage setItem:@"initKey2" value:@"initValue2" callback:^(id result) {}];
    [self.storage setItem:@"initKey3" value:@"initValue3" callback:^(id result) {}];
    [self.storage setItemPersistent:@"initKey4" value:@"1234" callback:^(id result) {}];
    
    self.storageQueue = [self.storage targetExecuteQueue];
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
}

- (void)testGetLength {
    XCTestExpectation *expectation = [self expectationWithDescription:@"storage"];

    NSDictionary *dic = [NSDictionary dictionaryWithContentsOfFile:self.filePath];
    NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:self.infoPath];
    NSArray *indexArray = [NSArray arrayWithContentsOfFile:self.indexPath];
    
    __weak typeof(self) weakSelf = self;
    dispatch_async(self.storageQueue, ^{
        [weakSelf.storage length:^(id result) {
            [expectation fulfill];
            
            NSInteger count = [result[@"data"] integerValue];
            XCTAssert(dic.count == count);
            XCTAssert(infoDic.count == count);
            XCTAssert(indexArray.count == count);
        }];
    });
    
    [self waitForExpectationsWithTimeout:5 handler:nil];
}

- (void)testGetAllKeys {
    XCTestExpectation *expectation = [self expectationWithDescription:@"storage"];

    NSDictionary *dic = [NSDictionary dictionaryWithContentsOfFile:self.filePath];
    NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:self.infoPath];
    NSArray *indexArray = [NSArray arrayWithContentsOfFile:self.indexPath];
    
    __weak typeof(self) weakSelf = self;
    dispatch_async(self.storageQueue, ^{
        [weakSelf.storage getAllKeys:^(id result) {
            [expectation fulfill];

            NSArray *keys = result[@"data"];
            NSComparator block = ^NSComparisonResult(NSString *str1, NSString *str2) {
                return [str1 compare:str2];
            };
            keys = [keys sortedArrayUsingComparator:block];
            NSArray *dicKeys = [[dic allKeys] sortedArrayUsingComparator:block];
            NSArray *infoDicKeys = [[infoDic allKeys] sortedArrayUsingComparator:block];
            NSArray *indexKeys = [indexArray sortedArrayUsingComparator:block];
            XCTAssert((keys.count == 0 && [dic allKeys].count == 0) || [keys isEqualToArray:dicKeys]);
            XCTAssert((keys.count == 0 && [infoDic allKeys].count == 0) || [keys isEqualToArray:infoDicKeys]);
            XCTAssert((keys.count == 0 && indexArray.count == 0) || [keys isEqualToArray:indexKeys]);
        }];
    });
    
    [self waitForExpectationsWithTimeout:5 handler:nil];
}

- (void)testSetItem {
    XCTestExpectation *expectation = [self expectationWithDescription:@"storage"];

    __weak typeof(self) weakSelf = self;
    dispatch_async(self.storageQueue, ^{
        [weakSelf.storage setItem:@"key1" value:@"shortValue1" callback:^(id ret) {
            [weakSelf.storage setItem:@"key1" value:@"shortValue12" callback:^(id result) {
                [expectation fulfill];

                NSDictionary *dic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.filePath];
                NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];
                NSArray *indexArray = [NSArray arrayWithContentsOfFile:weakSelf.indexPath];
                
                NSTimeInterval tsNow = [[NSDate date] timeIntervalSince1970];
                NSTimeInterval ts = [infoDic[@"key1"][@"ts"] doubleValue];
                NSLog(@"ts:%f",ts);
                
                XCTAssert([@"success" isEqualToString:result[@"result"]]);
                XCTAssert([@"shortValue12" isEqualToString:dic[@"key1"]]);
                XCTAssertEqual(infoDic[@"key1"][@"persistent"], @(NO));
                XCTAssertEqual(infoDic[@"key1"][@"size"], @([@"shortValue12" length]));
                XCTAssertTrue([indexArray containsObject:@"key1"]);
                XCTAssertTrue(ABS(tsNow - ts) <= 0.1);
            }];
        }];
    });
    
    [self waitForExpectationsWithTimeout:5 handler:nil];
}

- (void)testSetItemPersistent {
    XCTestExpectation *expectation = [self expectationWithDescription:@"storage"];

    __weak typeof(self) weakSelf = self;
    dispatch_async(self.storageQueue, ^{
        [self.storage setItem:@"key2" value:@"shortValue2" callback:^(id result) {
            NSDictionary *infoDic1 = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];
            
            XCTAssertEqual(result[@"result"], @"success");
            XCTAssertEqual(infoDic1[@"key2"][@"persistent"], @(NO));
            
            [self.storage setItemPersistent:@"key2" value:@"shortValue22" callback:^(id result) {
                NSDictionary *infoDic2 = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];

                XCTAssertEqual(result[@"result"], @"success");
                XCTAssertEqual(infoDic2[@"key2"][@"persistent"], @(YES));
                
                [self.storage setItem:@"key2" value:@"shortValue23" callback:^(id result) {
                    [expectation fulfill];

                    NSDictionary *infoDic3 = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];
                    
                    XCTAssertEqual(result[@"result"], @"success");
                    XCTAssertEqual(infoDic3[@"key2"][@"persistent"], @(NO));
                }];
            }];
        }];
    });
        
    [self waitForExpectationsWithTimeout:5 handler:nil];
}

- (void)testTimestamp {
    XCTestExpectation *expectation = [self expectationWithDescription:@"storage"];

    __weak typeof(self) weakSelf = self;
    dispatch_async(self.storageQueue, ^{
        [self.storage setItem:@"key3" value:@"shortValue3" callback:^(id result) {
            NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];
            NSTimeInterval tsNow = [[NSDate date] timeIntervalSince1970];
            NSTimeInterval ts = [infoDic[@"key3"][@"ts"] doubleValue];
            XCTAssertTrue(ABS(tsNow - ts) <= 0.1);

            [NSThread sleepForTimeInterval:2];
            
            [self.storage setItem:@"key3" value:@"shortValue32" callback:^(id result) {
                NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];
                NSTimeInterval tsNow = [[NSDate date] timeIntervalSince1970];
                NSTimeInterval ts = [infoDic[@"key3"][@"ts"] doubleValue];
                XCTAssertTrue(ABS(tsNow - ts) <= 0.1);

                [NSThread sleepForTimeInterval:2];
                
                [self.storage getItem:@"key3" callback:^(id result) {
                    [expectation fulfill];

                    NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];
                    NSTimeInterval tsNow = [[NSDate date] timeIntervalSince1970];
                    NSTimeInterval ts = [infoDic[@"key3"][@"ts"] doubleValue];
                    XCTAssertTrue(ABS(tsNow - ts) <= 0.1);
                    
                    [NSThread sleepForTimeInterval:2];
                }];
            }];
        }];
    });
    
    [self waitForExpectationsWithTimeout:20 handler:nil];
}

- (void)testSetItemLongValue {
    XCTestExpectation *expectation = [self expectationWithDescription:@"storage"];

    NSString *longValue = self.longValue;
    XCTAssertTrue(longValue.length > 1024);
    
    __weak typeof(self) weakSelf = self;
    dispatch_async(self.storageQueue, ^{
        [self.storage setItem:@"key4" value:longValue callback:^(id result) {
            
            NSDictionary *dic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.filePath];
            NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];
            NSArray *indexArray = [NSArray arrayWithContentsOfFile:weakSelf.indexPath];
            
            NSTimeInterval tsNow = [[NSDate date] timeIntervalSince1970];
            NSTimeInterval ts = [infoDic[@"key4"][@"ts"] doubleValue];
            
            XCTAssertEqual(result[@"result"], @"success");
            XCTAssertNotEqual(dic[@"key4"], longValue);
            XCTAssertTrue([dic[@"key4"] isEqualToString:@"#{eulaVlluNegarotSXW}"]);
            XCTAssertFalse([infoDic[@"key4"][@"persistent"] boolValue]);
            XCTAssertTrue([infoDic[@"key4"][@"size"] integerValue] == [longValue length]);
            XCTAssertTrue([indexArray containsObject:@"key4"]);
            XCTAssertTrue(ABS(tsNow - ts) <= 0.5);
            
            [self.storage getItem:@"key4" callback:^(id result) {
                [expectation fulfill];

                NSString *value = result[@"data"];
                XCTAssertEqual(value, longValue);
            }];
        }];
    });
    
    [self waitForExpectationsWithTimeout:5 handler:nil];
}

- (void)testGetItem {
    XCTestExpectation *expectation = [self expectationWithDescription:@"storage"];

    __weak typeof(self) weakSelf = self;
    dispatch_async(self.storageQueue, ^{
        [self.storage setItem:@"key5" value:@"shortValue5" callback:^(id result) {
            [weakSelf.storage getItem:@"key5" callback:^(id result) {
                NSString *data = result[@"data"];
                
                XCTAssertEqual(result[@"result"], @"success");
                XCTAssertEqual(data, @"shortValue5");
                
                [weakSelf.storage setItem:@"key5" value:@"shortValue52" callback:^(id result) {
                    [weakSelf.storage getItem:@"key5" callback:^(id result) {
                        [expectation fulfill];
                        
                        NSString *data = result[@"data"];
                        
                        XCTAssertEqual(result[@"result"], @"success");
                        XCTAssertEqual(data, @"shortValue52");
                    }];
                }];
            }];
        }];
    });
    
    [self waitForExpectationsWithTimeout:5 handler:nil];
}

- (void)testRemoveItem {
    XCTestExpectation *expectation = [self expectationWithDescription:@"storage"];

    __weak typeof(self) weakSelf = self;
    dispatch_async(self.storageQueue, ^{
        NSString *longValue = [@"longvalue6" stringByAppendingString:self.longValue];
        [self.storage setItem:@"key6" value:@"shortValue6" callback:^(id result) {
            [weakSelf.storage getItem:@"key6" callback:^(id result) {
                NSString *value = result[@"data"];
                XCTAssertEqual(value, @"shortValue6");
                
                [weakSelf.storage removeItem:@"key6" callback:^(id result) {
                    NSDictionary *dic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.filePath];
                    NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];
                    NSArray *indexArray = [NSArray arrayWithContentsOfFile:weakSelf.indexPath];
                    
                    XCTAssertEqual(result[@"result"], @"success");
                    XCTAssertNil(dic[@"key6"]);
                    XCTAssertNil(infoDic[@"key6"]);
                    XCTAssertFalse([indexArray containsObject:@"key6"]);
                    
                    [weakSelf.storage setItem:@"key6" value:longValue callback:^(id result) {
                        [weakSelf.storage getItem:@"key6" callback:^(id result) {
                            NSString *value = result[@"data"];
                            XCTAssertEqual(value, longValue);
                            
                            [weakSelf.storage removeItem:@"key6" callback:^(id result) {
                                [expectation fulfill];

                                NSDictionary *dic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.filePath];
                                NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:weakSelf.infoPath];
                                NSArray *indexArray = [NSArray arrayWithContentsOfFile:weakSelf.indexPath];
                                
                                XCTAssertEqual(result[@"result"], @"success");
                                XCTAssertNil(dic[@"key6"]);
                                XCTAssertNil(infoDic[@"key6"]);
                                XCTAssertFalse([indexArray containsObject:@"key6"]);
                            }];
                        }];
                    }];
                }];
            }];
        }];
    });
    
    [self waitForExpectationsWithTimeout:5 handler:nil];
}

- (void)testStorageLimit {
    XCTestExpectation *expectation = [self expectationWithDescription:@"storage"];

    dispatch_group_t storageGroup = dispatch_group_create();
    for (NSInteger i = 7; i < 1100; i++) {
        dispatch_group_enter(storageGroup);
        __weak typeof(self) weakSelf = self;
        dispatch_async(self.storageQueue, ^{
            NSString *key = [@"key" stringByAppendingString:[NSString stringWithFormat:@"%ld",i]];
            if (i % 3 == 0) {
                [weakSelf.storage setItemPersistent:key value:self.longValue callback:^(id result) {
                    XCTAssertEqual(result[@"result"], @"success");
                    dispatch_group_leave(storageGroup);
                }];
            } else {
                [weakSelf.storage setItem:key value:self.longValue callback:^(id result) {
                    XCTAssertEqual(result[@"result"], @"success");
                    dispatch_group_leave(storageGroup);
                }];
            }
        });
    }
    
    __weak typeof(self) welf = self;
    dispatch_group_notify(storageGroup, dispatch_get_main_queue(), ^{
        [expectation fulfill];
        
        NSDictionary *dic = [NSDictionary dictionaryWithContentsOfFile:welf.filePath];
        NSDictionary *infoDic = [NSDictionary dictionaryWithContentsOfFile:welf.infoPath];
        NSArray *indexArray = [NSArray arrayWithContentsOfFile:welf.indexPath];
        
        NSLog(@"---indexArray: %@", indexArray);
        
        XCTAssertEqual(dic.count, infoDic.count);
        XCTAssertEqual(indexArray.count, infoDic.count);
        XCTAssertNil(infoDic[@"key7"]);
        XCTAssertFalse([indexArray containsObject:@"key7"]);
        XCTAssertNotNil(infoDic[@"key9"]);
        XCTAssertTrue([indexArray containsObject:@"key9"]);
    });
    
    [self waitForExpectationsWithTimeout:300 handler:nil];
}

- (void)testGetItemold {
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

@end

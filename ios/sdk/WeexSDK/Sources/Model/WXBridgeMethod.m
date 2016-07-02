/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXBridgeMethod.h"

@implementation WXBridgeMethod

- (instancetype)initWihData:(NSDictionary *)data
{
    self = [super init];
    if(self){
        _module = [data valueForKey:@"module"];
        _method = [data valueForKey:@"method"];
        _arguments = [data valueForKey:@"args"];
    }
    return self;
}

- (instancetype)initWithInstance:(NSString *)instance data:(NSMutableDictionary *)data
{
    self = [self initWihData:data];
    if (self) {
        _instance = instance;
    }
    return self;
}

- (NSDictionary *)dataDesc
{
    NSString *module = _module ? : @"";
    NSString *method = _method ? : @"";
    NSArray *arguments = _arguments ? : @[];
    return @{@"module":module, @"method":method, @"args":arguments};
}

@end

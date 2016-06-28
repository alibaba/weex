/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@interface WXBridgeMethod : NSObject

@property (nonatomic, strong) NSString  *instance;
@property (nonatomic, strong) NSString  *module;
@property (nonatomic, strong) NSString  *method;
@property (nonatomic, strong) NSArray   *arguments;

- (instancetype)initWihData:(NSDictionary *)data;

- (instancetype)initWithInstance:(NSString *)instance data:(NSMutableDictionary *)data;

- (NSDictionary *)dataDesc;

@end

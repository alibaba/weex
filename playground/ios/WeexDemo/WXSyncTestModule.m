/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import "WXSyncTestModule.h"

@implementation WXSyncTestModule

WX_EXPORT_METHOD_SYNC(@selector(getString))
WX_EXPORT_METHOD_SYNC(@selector(getNumber))
WX_EXPORT_METHOD_SYNC(@selector(getArray))
WX_EXPORT_METHOD_SYNC(@selector(getObject))

- (NSString *)getString
{
    return @"testString";
}

- (NSUInteger)getNumber
{
    return 111111;
}

- (NSArray *)getArray
{
    return @[@(111111),@"testString",@"testString2"];
}

- (NSDictionary *)getObject
{
    return @{@"number":@(111111), @"string1":@"testString",@"string2":@"testString2"};
}

@end

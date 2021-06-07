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

#import "WXConfigCenterDefaultImpl.h"

@implementation WXConfigCenterDefaultImpl

- (id)configForKey:(NSString *)key defaultValue:(id)defaultValue isDefault:(BOOL *)isDefault
{
    NSArray<NSString*>* keys = [key componentsSeparatedByString:@"."];
    if ([keys[0] isEqualToString:@"iOS_weex_ext_config"] && [keys[1] isEqualToString:@"text_render_useCoreText"]){
        return @YES;
    }
    if ([keys[0] isEqualToString:@"iOS_weex_ext_config"] && [keys[1] isEqualToString:@"slider_class_name"]){
        return @"WXCycleSliderComponent";
    }
    if ([keys[0] isEqualToString:@"iOS_weex_prerender_config"] && [keys[1] isEqualToString:@"is_switch_on"]){
        return @YES;
    }
    if ([keys[0] isEqualToString:@"iOS_weex_prerender_config"] && [keys[1] isEqualToString:@"cacheTime"]){
        return @300000;
    }
    if ([keys[0] isEqualToString:@"iOS_weex_prerender_config"] && [keys[1] isEqualToString:@"max_cache_num"]){
        return @2;
    }
    return defaultValue;
}

@end

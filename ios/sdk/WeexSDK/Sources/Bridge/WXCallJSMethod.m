/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXCallJSMethod.h"

@implementation WXCallJSMethod
{
    NSString *_moduleName;
}

- (instancetype)initWithModuleName:(NSString *)moduleName
                        methodName:(NSString *)methodName
                         arguments:(NSArray *)arguments
                          instance:(WXSDKInstance *)instance
{
    if (self = [super initWithMethodName:methodName arguments:arguments instance:instance]) {
        _moduleName = moduleName;
    }
    
    return self;
}

- (NSDictionary *)callJSTask
{
    return @{@"module":_moduleName ?: @"",
             @"method":self.methodName ?: @"",
             @"args":self.arguments ?: @[]};
}

@end

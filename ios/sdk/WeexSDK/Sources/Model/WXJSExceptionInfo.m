//
//  WXJSException.m
/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXJSExceptionInfo.h"
#import "WXAppConfiguration.h"

@implementation WXJSExceptionInfo

- (instancetype)initWithInstanceId:(NSString *)instanceId
                         bundleUrl:(NSString *)bundleUrl
                         errorCode:(NSString *)errorCode
                      functionName:(NSString *)functionName
                         exception:(NSString *)exception
                          userInfo:(NSMutableDictionary *)userInfo
{
    if (self = [super init]) {
        self.instanceId = instanceId;
        self.bundleUrl = bundleUrl;
        self.errorCode = errorCode;
        self.exception = exception;
        self.userInfo = userInfo;
        self.functionName = functionName;
        _jsfmVersion = [WXAppConfiguration JSFrameworkVersion];
        _sdkVersion = WX_SDK_VERSION;
    }
    return self;
}

- (NSString *)description {
    return [NSString stringWithFormat:@"instanceId:%@ bundleUrl:%@ errorCode:%@ functionName:%@ exception:%@ userInfo:%@ jsfmVersion:%@ sdkVersion:%@", _instanceId?:@"", _bundleUrl?:@"", _errorCode?:@"", _functionName?:@"", _exception?:@"", _userInfo?:@"", _jsfmVersion, _sdkVersion];
}
@end

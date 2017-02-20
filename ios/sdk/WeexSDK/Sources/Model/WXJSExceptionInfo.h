/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@interface WXJSExceptionInfo : NSObject
/**
 * instance id
 */
@property(nonatomic,strong) NSString * instanceId;
/**
 * the URL where the exception occurred
 */
@property(nonatomic,strong) NSString * bundleUrl;
/**
 * error code
 */
@property(nonatomic,strong) NSString * errorCode;
/**
 * the function name of exception
 */
@property(nonatomic,strong) NSString * functionName;
/**
 * exception detail;
 */
@property(nonatomic,strong) NSString * exception;
/**
 * extend filed
 */
@property(nonatomic,strong) NSMutableDictionary * userInfo;
/**
 * weex sdk version
 */
@property(nonatomic,strong, readonly) NSString * sdkVersion;
/**
 * js framework verison
 */
@property(nonatomic,strong, readonly) NSString * jsfmVersion;

/**
 * @abstract Initializes a WXJSException instance
 * @param instanceId the id of instance
 * @param bundleUrl the page URL where the exception occurred
 * @param errorCode error Code
 * @param exception exception detail
 * @param userInfo  extend field
 */
- (instancetype)initWithInstanceId:(NSString *)instanceId
                         bundleUrl:(NSString *)bundleUrl
                         errorCode:(NSString *)errorCode
                      functionName:(NSString *)functionName
                         exception:(NSString *)exception
                          userInfo:(NSMutableDictionary *)userInfo;

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>

@interface WXDevToolType : NSObject

/**
 *  set debug status
 *  @param isDebug  : YES:open debug model and inspect model;
 *                    default is NO,if isDebug is NO, open inspect only;
 **/
+ (void)setDebug:(BOOL)isDebug;


/**
 *  get debug status
 **/
+ (BOOL)isDebug;

@end

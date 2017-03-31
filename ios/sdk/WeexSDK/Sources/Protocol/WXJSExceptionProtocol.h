/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXJSExceptionInfo.h"

@protocol WXJSExceptionProtocol<NSObject>

/**
 * report js exception
 *
 * @param exception {@link WXJSException}
 */

- (void)onJSException:(WXJSExceptionInfo *)exception;

@end

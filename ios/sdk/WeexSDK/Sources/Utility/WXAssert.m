/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXAssert.h"
#import "WXLog.h"

void WXAssertIntenal(NSString *func, NSString *file, int lineNum, NSString *format, ...)
{
    va_list args;
    va_start(args, format);
    NSString *message = [[NSString alloc] initWithFormat:format arguments:args];
    va_end(args);
    
    WXLogError(@"%@", message);
    [[NSAssertionHandler currentHandler] handleFailureInFunction:func file:file lineNumber:lineNum description:format, message];
}

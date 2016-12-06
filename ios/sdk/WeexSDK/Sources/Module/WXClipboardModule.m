/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXClipboardModule.h"

@implementation WXClipboardModule

WX_EXPORT_METHOD(@selector(setString:))
WX_EXPORT_METHOD(@selector(getString:))

- (dispatch_queue_t)targetExecuteQueue {
    return dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
}

- (void)setString:(NSString *)content
{
    UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
    clipboard.string = (content ? : @"");
}

- (void)getString:(WXModuleCallback)callback{
    UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
    NSDictionary *result = [@{} mutableCopy];
    if(clipboard.string)
    {
        [result setValue:clipboard.string forKey:@"data"];
        [result setValue:@"success" forKey:@"result"];
    }else
    {
        [result setValue:@"" forKey:@"data"];
        [result setValue:@"fail" forKey:@"result"];
    }
    callback(result);

}

@end

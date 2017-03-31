/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXURLRewriteDefaultImpl.h"
#import "WXLog.h"
#import "WXSDKInstance.h"


NSString *const WXURLLocalScheme = @"local";

@implementation WXURLRewriteDefaultImpl

- (NSURL *)rewriteURL:(NSString *)url
     withResourceType:(WXResourceType)resourceType
         withInstance:(WXSDKInstance *)instance
{
    NSURL *completeURL = [NSURL URLWithString:url];
    if ([completeURL isFileURL]) {
        return completeURL;
    } else if ([self isLocalURL:completeURL]) {
        NSString *resourceName = [[completeURL host] stringByAppendingString:[completeURL path]];
        NSURL *resourceURL = [[NSBundle mainBundle] URLForResource:resourceName withExtension:@""];
        if (!resourceURL) {
            WXLogError(@"Invalid local resource URL:%@, no resouce found.", url);
        }
        
        return resourceURL;
    } else {
        return [instance completeURL:url];
    }
}

- (BOOL)isLocalURL:(NSURL *)url
{
    return[[[url scheme] lowercaseString] isEqualToString:WXURLLocalScheme];
}

@end

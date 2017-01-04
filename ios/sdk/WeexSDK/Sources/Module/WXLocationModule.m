/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXLocationModule.h"
#import "WXSDKInstance.h"

@implementation WXLocationModule

WX_EXPORT_METHOD(@selector(reload:))
WX_EXPORT_METHOD(@selector(replace:))

@synthesize weexInstance;

- (void)reload:(BOOL)forcedReload
{
    WXSDKInstance *instance = self.weexInstance;
    [instance reload:forcedReload];
}

- (void)replace:(NSString *)url
{
    
}


@end

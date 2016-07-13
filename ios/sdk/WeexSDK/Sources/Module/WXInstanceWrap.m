/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXInstanceWrap.h"
#import "WXEmbedComponent.h"

@implementation WXInstanceWrap

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(error:code:info:))
WX_EXPORT_METHOD(@selector(refresh))

- (void)error:(NSInteger)type code:(NSInteger)code info:(NSString *)info
{
    NSString *domain = [NSString stringWithFormat:@"%ld", (long)type];
    NSDictionary *userInfo = @{ NSLocalizedDescriptionKey:info };
    NSError *error = [NSError errorWithDomain:domain code:code userInfo:userInfo];
    if (weexInstance.onFailed)
        weexInstance.onFailed(error);
}

- (void)refresh
{
    if (self.weexInstance.parentInstance) {
        WXSDKInstance *instance = self.weexInstance.parentInstance;
        NSString *nodeRef = self.weexInstance.parentNodeRef;
        WXEmbedComponent *embedComponent= (WXEmbedComponent *)[instance componentForRef:nodeRef];
        [embedComponent refreshWeex];
    }
    else {
        UIViewController *controller = self.weexInstance.viewController;
        if ([controller respondsToSelector:@selector(refreshWeex)]) {
            [controller performSelector:@selector(refreshWeex) withObject:nil];
        }
    }
}

@end

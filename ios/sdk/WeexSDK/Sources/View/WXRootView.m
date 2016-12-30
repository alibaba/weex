/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXRootView.h"
#import "WXSDKInstance.h"

@implementation WXRootView

- (void)setFrame:(CGRect)frame
{
    BOOL shouldNotifyLayout = NO;
    if (_instance.onLayoutChange && !CGRectEqualToRect(self.frame, frame)) {
        shouldNotifyLayout = YES;
    }
    
    [super setFrame:frame];
    
    if (shouldNotifyLayout && _instance.onLayoutChange) {
        _instance.onLayoutChange(self);
    }
}

@end

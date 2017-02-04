/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "UIView+UIThreadCheck.h"
#import <WeexSDK/NSObject+WXSwizzle.h>

#define WXCheckUIThread() NSAssert([NSThread isMainThread], \
@"You can not change UI on main thread!")

@implementation UIView (UIThreadCheck)

+ (void)wx_checkUIThread
{
    [self weex_swizzle:[self class] Method:@selector(setNeedsLayout) withMethod:@selector(wx_setNeedsLayout)];
    [self weex_swizzle:[self class] Method:@selector(setNeedsDisplay) withMethod:@selector(wx_setNeedsDisplay)];
    [self weex_swizzle:[self class] Method:@selector(setNeedsDisplayInRect:) withMethod:@selector(wx_setNeedsDisplayInRect:)];
}

- (void)wx_setNeedsLayout
{
    WXCheckUIThread();
    [self wx_setNeedsLayout];
}

- (void)wx_setNeedsDisplay
{
    WXCheckUIThread();
    [self wx_setNeedsDisplay];
}

- (void)wx_setNeedsDisplayInRect:(CGRect)rect
{
    WXCheckUIThread();
    [self wx_setNeedsDisplayInRect:rect];
}

@end

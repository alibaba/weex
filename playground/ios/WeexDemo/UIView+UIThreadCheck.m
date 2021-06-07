/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

#import "UIView+UIThreadCheck.h"
#import <WeexSDK/NSObject+WXSwizzle.h>

#define WXCheckUIThread() NSAssert([NSThread isMainThread], \
@"You must change UI on main thread!")

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

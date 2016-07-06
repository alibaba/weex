/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "NSObject+WXSwizzle.h"
#import <objc/runtime.h>

@implementation NSObject (WXSwizzle)

+ (BOOL)weex_swizzle:(Class)originalClass Method:(SEL)originalSelector withMethod:(SEL)swizzledSelector
{
    if (!(originalClass && originalSelector && swizzledSelector)) {
        return NO;
    }
    
    Class class = [self class];
    
    Method originalMethod = class_getInstanceMethod(originalClass, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);
    
    BOOL didAddMethod = class_addMethod(originalClass, originalSelector, method_getImplementation(swizzledMethod), method_getTypeEncoding(swizzledMethod));
    
    if (didAddMethod) {
        class_replaceMethod(class, swizzledSelector, method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));
    } else {
        method_exchangeImplementations(originalMethod, swizzledMethod);
    }
    
    return YES;
}

@end

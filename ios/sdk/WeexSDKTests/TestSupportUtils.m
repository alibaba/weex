/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "TestSupportUtils.h"


bool WXIsDoubleApproximate(double x, double y) {
    return fabs(x - y) < 0.001;
}

bool WXTransform3DApproximateToTransform(CATransform3D a,CATransform3D b)
{
    return
    WXIsDoubleApproximate(a.m11, b.m11) &&
    WXIsDoubleApproximate(a.m12, b.m12) &&
    WXIsDoubleApproximate(a.m13, b.m13) &&
    WXIsDoubleApproximate(a.m14, b.m14) &&
    WXIsDoubleApproximate(a.m21, b.m21) &&
    WXIsDoubleApproximate(a.m22, b.m22) &&
    WXIsDoubleApproximate(a.m23, b.m23) &&
    WXIsDoubleApproximate(a.m24, b.m24) &&
    WXIsDoubleApproximate(a.m31, b.m31) &&
    WXIsDoubleApproximate(a.m32, b.m32) &&
    WXIsDoubleApproximate(a.m33, b.m33) &&
    WXIsDoubleApproximate(a.m34, b.m34) &&
    WXIsDoubleApproximate(a.m41, b.m41) &&
    WXIsDoubleApproximate(a.m42, b.m42) &&
    WXIsDoubleApproximate(a.m43, b.m43) &&
    WXIsDoubleApproximate(a.m44, b.m44);
}

bool WXRectApproximateToRect(CGRect a,CGRect b)
{
    return
    WXIsDoubleApproximate(a.origin.x, b.origin.x) &&
    WXIsDoubleApproximate(a.origin.y, b.origin.y) &&
    WXIsDoubleApproximate(a.size.width, b.size.width) &&
    WXIsDoubleApproximate(a.size.height, b.size.height);
}


@implementation TestSupportUtils

+(void)waitSecs:(NSTimeInterval)secs{
    NSDate *timeoutDate = [NSDate dateWithTimeIntervalSinceNow:secs];
    while ( [timeoutDate timeIntervalSinceNow] > 0) {
        CFRunLoopRunInMode(kCFRunLoopDefaultMode, 0.01, YES);
    }
}

@end

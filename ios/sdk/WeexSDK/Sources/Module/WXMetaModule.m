/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */
#import "WXMetaModule.h"
#import "WXConvert.h"
#import "WXUtility.h"
#import "WXSDKInstance_private.h"

@implementation WXMetaModule

@synthesize weexInstance;

WX_EXPORT_METHOD(@selector(setViewport:))

- (void)setViewport:(NSDictionary *)viewportArguments
{
    CGFloat viewportWidthFloat;
    id viewportWidth = viewportArguments[@"width"];
    if ([viewportWidth isKindOfClass:[NSString class]]) {
        if ([viewportWidth isEqualToString:@"device-width"]) {
            viewportWidthFloat = [WXUtility portraitScreenSize].width * WXScreenScale();
        } else if ([viewportWidth isEqualToString:@"device-height"]) {
            viewportWidthFloat = [WXUtility portraitScreenSize].height * WXScreenScale();
        } else {
            viewportWidthFloat = [WXConvert CGFloat:viewportWidth];
        }
    } else {
        viewportWidthFloat = [WXConvert CGFloat:viewportWidth];
    }
    
    if (viewportWidthFloat > 0) {
        self.weexInstance.viewportWidth = viewportWidthFloat;
    }
}

@end

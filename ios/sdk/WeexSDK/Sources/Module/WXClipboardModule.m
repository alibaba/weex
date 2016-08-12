//
//  WXClipboardModule.m
//  WeexSDK
//
//  Created by Jun Shi on 7/21/16.
//  Copyright © 2016 taobao. All rights reserved.
//

#import "WXClipboardModule.h"

@implementation WXClipboardModule

WX_EXPORT_METHOD(@selector(setString:))
WX_EXPORT_METHOD(@selector(getString:))

- (void)setString:(NSString *)content
{
    UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
    clipboard.string = (content ? : @"");
}

- (void)getString:(WXModuleCallback)callback{
    UIPasteboard *clipboard = [UIPasteboard generalPasteboard];
    callback((clipboard.string ? : @""));
}

@end

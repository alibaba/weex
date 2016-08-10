//
//  WXUtility+Hash.m
//  WeexSDK
//
//  Created by Jun Shi on 8/2/16.
//  Copyright © 2016 taobao. All rights reserved.
//

#import "WXUtility+Hash.h"

@implementation WXUtility (Hash)

+ (NSString *)md5:(NSString *)string
{
    const char *str = string.UTF8String;
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5(str, (CC_LONG)strlen(str), result);
    
    return [NSString stringWithFormat:@"%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x",
            result[0], result[1], result[2], result[3],
            result[4], result[5], result[6], result[7],
            result[8], result[9], result[10], result[11],
            result[12], result[13], result[14], result[15]
            ];
}

@end

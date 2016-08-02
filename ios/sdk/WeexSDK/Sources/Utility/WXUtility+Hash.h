//
//  WXUtility+Hash.h
//  WeexSDK
//
//  Created by Jun Shi on 8/2/16.
//  Copyright © 2016 taobao. All rights reserved.
//

#import <WeexSDK/WeexSDK.h>
#import <CommonCrypto/CommonCrypto.h>

@interface WXUtility (Hash)

+ (NSString *)md5:(NSString *)string;

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXResourceRequest.h"

NSString * const kHTTPHeaderNameUserAgent = @"User-Agent";
NSString * const kHTTPHeaderNameReferrer = @"Referer"; // The misspelling referer originated in the original proposal by computer "scientist" Phillip Hallam-Baker to incorporate the field into the HTTP specification. ╮(╯_╰)╭

@implementation WXResourceRequest

+ (instancetype)requestWithURL:(NSURL *)url
                  resourceType:(WXResourceType)type
                      referrer:(NSString *)referrer
                   cachePolicy:(NSURLRequestCachePolicy)cachePolicy
{
    return [[self alloc] initWithURL:url resourceType:type referrer:referrer cachePolicy:cachePolicy];
}

- (instancetype)initWithURL:(NSURL *)url
               resourceType:(WXResourceType)type
                   referrer:(NSString *)referrer cachePolicy:(NSURLRequestCachePolicy)cachePolicy
{
    if (self = [super initWithURL:url]) {
        self.type = type;
        self.cachePolicy = cachePolicy;
        [self setValue:referrer forHTTPHeaderField:kHTTPHeaderNameReferrer];
    }
    
    return self;
}

- (NSString *)referrer
{
    return [self valueForHTTPHeaderField:kHTTPHeaderNameReferrer];
}

- (void)setReferrer:(NSString *)referrer
{
    [self setValue:referrer forHTTPHeaderField:kHTTPHeaderNameReferrer];
}

- (NSString *)userAgent
{
    return [self valueForHTTPHeaderField:kHTTPHeaderNameUserAgent];
}

- (void)setUserAgent:(NSString *)userAgent
{
    [self setValue:userAgent forHTTPHeaderField:kHTTPHeaderNameUserAgent];
}

@end

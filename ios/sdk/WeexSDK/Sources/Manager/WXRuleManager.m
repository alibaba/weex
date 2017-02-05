/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXRuleManager.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXUtility.h"
#import "WXConvert.h"
#import "WXHandlerFactory.h"
#import "WXURLRewriteProtocol.h"
#import "WXComponentManager.h"

@interface WXRuleManager()
@property (nonatomic, strong) WXThreadSafeMutableDictionary *fontStorage;
@end

@implementation WXRuleManager

static WXRuleManager *_sharedInstance = nil;

+ (WXRuleManager *)sharedInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (!_sharedInstance) {
            _sharedInstance = [[self alloc] init];
            _sharedInstance.fontStorage = [[WXThreadSafeMutableDictionary alloc] init];
        }
    });
    return _sharedInstance;
}

- (void)removeRule:(NSString *)type rule:(NSDictionary *)rule
{
    if ([type isEqualToString:@"fontFace"]) {
        if (rule[@"fontFamily"]) {
            [_fontStorage removeObjectForKey:rule[@"fontFamily"]];
        } else {
            [_fontStorage removeAllObjects];
        }
    }
}

- (void)addRule:(NSString*)type rule:(NSDictionary *)rule
{
    if ([type isEqualToString:@"fontFace"] && [rule[@"src"] isKindOfClass:[NSString class]]) {
        if (rule[@"src"] && rule[@"fontFamily"] && ![WXUtility isBlankString:rule[@"src"]]) {
            NSString *ruleSrc = [WXConvert NSString:rule[@"src"]];
            if (!ruleSrc) {
                WXLogError(@"%@ is illegal for font src",rule[@"src"]);
                return;
            }
            NSUInteger start = [rule[@"src"] rangeOfString:@"url('"].location + @"url('".length;
            NSUInteger end  = [rule[@"src"] rangeOfString:@"')" options:NSBackwardsSearch].location;
            if (end <= start || start == NSNotFound || end == NSNotFound) {
                WXLogWarning(@"font url is not specified");
                return;
            }
            
            NSString *fontSrc = [rule[@"src"] substringWithRange:NSMakeRange(start, end-start)];
            NSMutableString *newFontSrc = [fontSrc mutableCopy];
            WX_REWRITE_URL(fontSrc, WXResourceTypeFont, self.instance, &newFontSrc)
            
            if (!newFontSrc) {
                return;
            }
            
            fontSrc = newFontSrc;
            NSMutableDictionary * fontFamily = [self.fontStorage objectForKey:rule[@"fontFamily"]];
            if (fontFamily && [fontFamily[@"src"] isEqualToString:fontSrc]) {
                // if the new src is same as src in dictionary , ignore it, or update it
                return;
            }
            if (!fontFamily) {
                fontFamily = [NSMutableDictionary dictionary];
            }
            NSURL *fontURL = [NSURL URLWithString:fontSrc];
            if (!fontURL) {
                // if the fontSrc string is illegal, the fontURL will be nil
                return;
            }
            if([fontURL isFileURL]){
                [fontFamily setObject:fontSrc forKey:@"src"];
            }else {
                [fontFamily setObject:fontSrc forKey:@"tempSrc"];
            }
            
            [_fontStorage setObject:fontFamily forKey:rule[@"fontFamily"]];
            // remote font file
            NSString *fontfile = [NSString stringWithFormat:@"%@/%@",WX_FONT_DOWNLOAD_DIR,[WXUtility md5:[fontURL absoluteString]]];
            if ([WXUtility isFileExist:fontfile]) {
                // if has been cached, load directly
                [fontFamily setObject:[NSURL fileURLWithPath:fontfile] forKey:@"localSrc"];
                return;
            }
            __weak typeof(self) weakSelf = self;
            [WXUtility getIconfont:fontURL completion:^(NSURL * _Nonnull url, NSError * _Nullable error) {
                if (!error && url) {
                    // load success
                    NSMutableDictionary * dictForFontFamily = [weakSelf.fontStorage objectForKey:rule[@"fontFamily"]];
                    NSString *fontSrc = [dictForFontFamily objectForKey:@"tempSrc"];
                    [dictForFontFamily setObject:fontSrc forKey:@"src"];
                    [dictForFontFamily setObject:url forKey:@"localSrc"];
                } else {
                    //there was some errors during loading
                    WXLogError(@"load font failed %@",error.description);
                }
            }];
        }
    }
}

- (WXThreadSafeMutableDictionary *)getRule:(NSString *)type {
    
    if ([type isEqualToString:@"fontFace"]) {
        return _fontStorage;
    }
    
    return nil;
}

@end

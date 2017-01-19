/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponent+PseudoClassManagement.h"
#import "WXComponent_internal.h"
#import "WXAssert.h"
#import "WXComponentManager.h"
#import "WXSDKInstance_private.h"
#import "WXUtility.h"

@implementation WXComponent (PseudoClassManagement)

-(NSMutableDictionary *)parseStyles:(NSDictionary *)styles
{
    NSMutableDictionary *newStyles = [NSMutableDictionary new];
    _pseudoClassStyles = [NSMutableDictionary new];
    if (styles && [styles count] > 0 ) {
        for (NSString *key in styles){
            if([key rangeOfString:@":"].location != NSNotFound){
                if ([key rangeOfString:@"active"].location != NSNotFound) { //all active listen
                    _isListenPseudoTouch = YES;
                }
                [_pseudoClassStyles setObject:styles[key] forKey:key];
            }else {
                [newStyles setObject:styles[key] forKey:key];
            }
        }
    }
    return newStyles;
}

- (void)updatePseudoClassStyles:(NSDictionary *)pseudoClassStyles
{
    WXAssertMainThread();
    NSMutableDictionary *styles = [NSMutableDictionary new];
    for (NSString *k in pseudoClassStyles) {
        [styles setObject:pseudoClassStyles[k] forKey:[self getPseudoKey:k]];
    }
    if ([styles count]>0) {
        __weak typeof(self) weakSelf = self;
        WXPerformBlockOnComponentThread(^{
            WXComponentManager *manager = weakSelf.weexInstance.componentManager;
            if (!manager.isValid) {
                return;
            }
            [manager updatePseudoClassStyles:styles forComponent:self.ref];
            [manager startComponentTasks];
        });
    }
    
    if (styles && [styles count] > 0) {
        if(!_updatedPseudoClassStyles) {
            _updatedPseudoClassStyles = [NSMutableDictionary new];
        }
        for (NSString *key in styles) {
            [_updatedPseudoClassStyles setObject:styles[key] forKey:key];
        }
    }
}

-(NSString *)getPseudoKey:(NSString *)key
{
    if ([key rangeOfString:@":"].location == NSNotFound) {
        return key;
    }
    NSRange range = [key rangeOfString:@":"];
    NSString *subKey = [key substringToIndex:range.location];
    return subKey;
}

-(NSMutableDictionary *)getPseudoClassStyles:(NSString *)key
{
    NSMutableDictionary *styles = [NSMutableDictionary new];
    [styles addEntriesFromDictionary:[self getPseudoClassStyles:key level:1]];
    [styles addEntriesFromDictionary:[self getPseudoClassStyles:key level:2]];
    return styles;
}

-(NSMutableDictionary *)getPseudoClassStyles:(NSString *)key level:(NSInteger )level
{
    NSMutableDictionary *styles = [NSMutableDictionary new];
    if (_pseudoClassStyles && [_pseudoClassStyles count] > 0 ) {
        for (NSString *k in _pseudoClassStyles){
            if ([k rangeOfString:key].location != NSNotFound && [WXUtility getSubStringNumber:k subString:@":"] == level) {
                [styles setObject:_pseudoClassStyles[k] forKey:[self getPseudoKey:k]];
            }
        }
    }
    return styles;
}

-(NSMutableDictionary *)getPseudoClassStylesByKeys:(NSArray *)keys
{
    NSMutableDictionary *styles = [NSMutableDictionary new];
    if(keys && [keys count]>0) {
        if (_pseudoClassStyles && [_pseudoClassStyles count] > 0 ) {
            for (NSString *k in _pseudoClassStyles){
                if([WXUtility getSubStringNumber:k subString:@":"] == [keys count]){
                    BOOL isContain = YES;
                    for(NSString *pKey in keys){
                        if ([k rangeOfString:pKey].location == NSNotFound) {
                            isContain = NO;
                            break;
                        }
                    }
                    if (isContain) {
                        [styles setObject:_pseudoClassStyles[k] forKey:[self getPseudoKey:k]];
                    }
                }
            }
        }
    }
    
    return styles;
}

- (void)recoveryPseudoStyles:(NSDictionary *)styles
{
    WXAssertMainThread();
    __weak typeof(self) weakSelf = self;
    NSMutableDictionary *resetStyles = [styles mutableCopy];
    if(_updatedPseudoClassStyles && [_updatedPseudoClassStyles count]>0){
        for (NSString *key in _updatedPseudoClassStyles) {
            if (![styles objectForKey:key] && [key length]>0) {
                [resetStyles setObject:@"" forKey:key];
            }
        }
    }
    WXPerformBlockOnComponentThread(^{
        WXComponentManager *manager = weakSelf.weexInstance.componentManager;
        if (!manager.isValid) {
            return;
        }
        [manager updatePseudoClassStyles:resetStyles forComponent:self.ref];
        [manager startComponentTasks];
    });
}

@end

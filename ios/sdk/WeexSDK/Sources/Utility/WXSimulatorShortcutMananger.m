/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXSimulatorShortcutMananger.h"
#import "WXUtility.h"
#import <objc/message.h>

#if TARGET_OS_SIMULATOR

@interface UIEvent (WXSimulatorShortcutMananger)

@property (nonatomic, strong) NSString *_modifiedInput;
@property (nonatomic, strong) NSString *_unmodifiedInput;
@property (nonatomic, assign) UIKeyModifierFlags _modifierFlags;
@property (nonatomic, assign) BOOL _isKeyDown;
@property (nonatomic, assign) long _keyCode;

@end

@interface WXKeyInput : NSObject

@property (nonatomic, strong) NSString *key;
@property (nonatomic, assign) UIKeyModifierFlags flags;

@end

@implementation WXKeyInput

+ (instancetype)keyInputForKey:(NSString *)key flags:(UIKeyModifierFlags)flags
{
    WXKeyInput *keyInput = [[self alloc] init];
    if (keyInput) {
        keyInput.key = key;
        keyInput.flags = flags;
    }
    return keyInput;
}

- (BOOL)isEqual:(id)object
{
    BOOL isEqual = NO;
    if ([object isKindOfClass:[WXKeyInput class]]) {
        WXKeyInput *keyInput = (WXKeyInput *)object;
        isEqual = [self.key isEqualToString:keyInput.key] && self.flags == keyInput.flags;
    }
    return isEqual;
}

@end


@implementation WXSimulatorShortcutMananger
{
    NSCache *_actions;
}

+ (instancetype)sharedManager
{
    static WXSimulatorShortcutMananger *_sharedInstance = nil;
    static dispatch_once_t oncePredicate;
    dispatch_once(&oncePredicate, ^{
        _sharedInstance = [[self alloc] init];
        _sharedInstance->_actions = [[NSCache alloc] init];
        SEL handleKeyEventSelector = NSSelectorFromString(@"handleKeyUIEvent:");
        SEL replacedSelector = WXSwizzledSelectorForSelector(handleKeyEventSelector);
        WXSwizzleInstanceMethodWithBlock([UIApplication class], handleKeyEventSelector, ^(UIApplication *application, UIEvent *event) {
            [[[self class] sharedManager] handleKeyUIEvent:event];
            ((void(*)(id, SEL, id))objc_msgSend)(application, replacedSelector, event);
        }, replacedSelector);
    });
    return _sharedInstance;
}

+ (void)registerSimulatorShortcutWithKey:(NSString *)key modifierFlags:(UIKeyModifierFlags)flags action:(dispatch_block_t)action
{
    WXKeyInput *keyInput = [WXKeyInput keyInputForKey:key flags:flags];
    [[WXSimulatorShortcutMananger sharedManager]->_actions setObject:action forKey:keyInput];
}

- (void)handleKeyUIEvent:(UIEvent *)event
{
    BOOL isKeyDown = NO;
    NSString *modifiedInput = nil;
    NSString *unmodifiedInput = nil;
    UIKeyModifierFlags flags = 0;
    if ([event respondsToSelector:@selector(_isKeyDown)]) {
        isKeyDown = [event _isKeyDown];
    }
    
    if ([event respondsToSelector:@selector(_modifiedInput)]) {
        modifiedInput = [event _modifiedInput];
    }
    
    if ([event respondsToSelector:@selector(_unmodifiedInput)]) {
        unmodifiedInput = [event _unmodifiedInput];
    }
    
    if ([event respondsToSelector:@selector(_modifierFlags)]) {
        flags = [event _modifierFlags];
    }
    
    if (isKeyDown && [modifiedInput length] > 0) {
        WXKeyInput *keyInput = [WXKeyInput keyInputForKey:unmodifiedInput flags:flags];
        dispatch_block_t block = [_actions objectForKey:keyInput];
        if (block) {
            block();
        }
    }
}

@end

#endif

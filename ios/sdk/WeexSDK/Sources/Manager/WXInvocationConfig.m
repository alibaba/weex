/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXInvocationConfig.h"
#import "WXLog.h"
#import "WXSDKInstance.h"
#import "WXSDKManager.h"
#import "WXSDKInstance_private.h"
#import "WXModuleManager.h"
#import "WXMonitor.h"
#import "WXSDKError.h"
#import "WXComponentFactory.h"
#import "WXModuleFactory.h"
#import "WXUtility.h"

#import <objc/runtime.h>

@interface WXInvocationConfig()
@end

@implementation WXInvocationConfig

+ (instancetype)sharedInstance
{
    static id _sharedInstance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _sharedInstance = [[self alloc] init];
    });
    
    return _sharedInstance;
}

- (instancetype)init
{
    
    if (self = [super init]) {
        _methods = [NSMutableDictionary new];
    }
    
    return self;
}

- (instancetype)initWithName:(NSString *)name class:(NSString *)clazz
{
    if (self = [super init]) {
        _methods = [NSMutableDictionary new];
        _name = name;
        _clazz = clazz;
    }
    return self;
}

- (void)dispatchMethod:(WXBridgeMethod *)method
{
    if(method.targets) {
        WXSDKInstance *weexInstance = [WXSDKManager instanceForID:method.instance];
        [[weexInstance componentManager] dispatchComponentMethod:method];
    }
    if (method.module) {
        [[WXSDKManager moduleMgr] dispatchMethod:method];
    }
}

- (NSInvocation*)invocationWithTargetMethod:(id)target method:(WXBridgeMethod*)method
{
    if (!target) {
        NSString *errorMessage = [NSString stringWithFormat:@"%@ doesn't exist！",method.targets[@"component"]?:method.module];
        WX_MONITOR_FAIL(WXMTJSBridge, WX_ERR_INVOKE_NATIVE, errorMessage);
        
        return nil;
    }
    SEL selector = nil;
    if ([target conformsToProtocol:NSProtocolFromString(@"WXModuleProtocol")]) {
        selector = [WXModuleFactory methodWithModuleName:method.module withMethod:method.method];
    }else if ([target isKindOfClass:NSClassFromString(@"WXComponent")]) {
        selector = [WXComponentFactory methodWithComponentName:method.targets[@"component"] withMethod:method.method];
    }
    
    // neither a component nor a module
    if (!selector) {
        NSString *errorMessage = [NSString stringWithFormat:@"%@ is not a component or module", method.targets[@"component"]?:method.module];
        WX_MONITOR_FAIL(WXMTJSBridge, WX_ERR_INVOKE_NATIVE, errorMessage);
        return nil;
    }
    
    NSArray *arguments = method.arguments;
    NSMethodSignature *signature = [target methodSignatureForSelector:selector];
    if (!signature) {
        NSString *errorMessage = [NSString stringWithFormat:@"%@, method：%@ doesn't exist", method.targets[@"component"]?:method.module, method.method];
        WX_MONITOR_FAIL(WXMTJSBridge, WX_ERR_INVOKE_NATIVE, errorMessage);
        return nil;
    }
    
    if (signature.numberOfArguments - 2 != method.arguments.count) {
        NSString *errorMessage = [NSString stringWithFormat:@"%@, the parameters in calling method [%@] and registered method [%@] are not consistent！", method.targets[@"component"]?:method.module, method.method, NSStringFromSelector(selector)];
        WX_MONITOR_FAIL(WXMTJSBridge, WX_ERR_INVOKE_NATIVE, errorMessage);
        return nil;
    }
    
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    invocation.target = target;
    invocation.selector = selector;
    NSString *instanceId = method.instance;
    void **freeList = NULL;
    
    NSMutableArray *blockArray = [NSMutableArray array];
    WX_ALLOC_FLIST(freeList, arguments.count);
    for (int i = 0; i < arguments.count; i ++ ) {
        id obj = arguments[i];
        const char *parameterType = [signature getArgumentTypeAtIndex:i + 2];
        static const char *blockType = @encode(typeof(^{}));
        id argument;
        if (!strcmp(parameterType, blockType)) {
            // callback
            argument = [^void(NSString *result, BOOL keepAlive) {
                [[WXSDKManager bridgeMgr]callBack:instanceId funcId:(NSString *)obj params:result keepAlive:keepAlive];
            } copy];
            
            // retain block
            [blockArray addObject:argument];
            [invocation setArgument:&argument atIndex:i + 2];
        } else {
            argument = obj;
            WX_ARGUMENTS_SET(invocation, signature, i, argument, freeList);
        }
    }
    [invocation retainArguments];
    WX_FREE_FLIST(freeList, arguments.count);
    
    return invocation;
}

- (void)registerMethods
{
    Class currentClass = NSClassFromString(_clazz);
    
    if (!currentClass) {
        WXLogWarning(@"The module class [%@] doesn't exit！", _clazz);
        return;
    }
    
    while (currentClass != [NSObject class]) {
        unsigned int methodCount = 0;
        Method *methodList = class_copyMethodList(object_getClass(currentClass), &methodCount);
        for (unsigned int i = 0; i < methodCount; i++) {
            NSString *selStr = [NSString stringWithCString:sel_getName(method_getName(methodList[i])) encoding:NSUTF8StringEncoding];
            
            if (![selStr hasPrefix:@"wx_export_method_"]) continue;
            
            NSString *name = nil, *method = nil;
            SEL selector = NSSelectorFromString(selStr);
            if ([currentClass respondsToSelector:selector]) {
                method = ((NSString* (*)(id, SEL))[currentClass methodForSelector:selector])(currentClass, selector);
            }
            
            if (method.length <= 0) {
                WXLogWarning(@"The module class [%@] doesn't has any method！", _clazz);
                continue;
            }
            
            NSRange range = [method rangeOfString:@":"];
            if (range.location != NSNotFound) {
                name = [method substringToIndex:range.location];
            } else {
                name = method;
            }
            
            [_methods setObject:method forKey:name];
        }
        
        free(methodList);
        currentClass = class_getSuperclass(currentClass);
    }
    
}


@end

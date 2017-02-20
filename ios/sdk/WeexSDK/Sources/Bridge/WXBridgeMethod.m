/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXBridgeMethod.h"
#import "WXSDKInstance.h"
#import "WXMonitor.h"
#import "WXAssert.h"
#import "WXUtility.h"
#import "WXSDKManager.h"
#import <objc/runtime.h>

@implementation WXBridgeMethod

- (instancetype)initWithMethodName:(NSString *)methodName arguments:(NSArray *)arguments instance:(WXSDKInstance *)instance
{
    if (self = [super init]) {
        _methodName = methodName;
        _arguments = arguments;
        _instance = instance;
    }
    
    return self;
}

- (NSString *)description
{
    return [NSString stringWithFormat:@"<%@: %p; instance = %@; method = %@; arguments= %@>", NSStringFromClass([self class]), self, _instance.instanceId, _methodName, _arguments];
}

//check parameter:NSNumber contains int,float,double;object contains nsarray,nsstring,nsdictionary ;block is block
-(void)checkParameter:(id)obj parameterType:(const char *)parameterType order:(int)order
{
    BOOL check = YES;
    if(strcmp(parameterType,"f")==0 || strcmp(parameterType,"i")==0 || strcmp(parameterType,"d")==0) {
        check =  [obj isKindOfClass:[NSNumber class]];
        WXAssert(check,@"<%@: %p; instance = %@; method = %@; arguments= %@; the number %d parameter type is not right,it should be int,float or double>",NSStringFromClass([self class]), self, _instance.instanceId, _methodName, _arguments,order);
    }
    if(strcmp(parameterType,"@")==0) {
        check =  [obj isKindOfClass:[NSArray class]] || [obj isKindOfClass:[NSDictionary class]] ||[obj isKindOfClass:[NSString class]];
        WXAssert(check,@"<%@: %p; instance = %@; method = %@; arguments= %@ ;the number %d parameter type is not right,it should be array ,map or string>",NSStringFromClass([self class]), self, _instance.instanceId, _methodName, _arguments,order);
    }
    if(strcmp(parameterType,"@?")==0) {
        const char *blockType = @encode(typeof(^{}));
        check =  !strcmp(parameterType, blockType);
        WXAssert(check,@"<%@: %p; instance = %@; method = %@; arguments= %@; the number %d parameter type is not right,it should be block>",NSStringFromClass([self class]), self, _instance.instanceId, _methodName, _arguments,order);
    }
}

- (NSInvocation *)invocationWithTarget:(id)target selector:(SEL)selector
{
    WXAssert(target, @"No target for method:%@", self);
    WXAssert(selector, @"No selector for method:%@", self);
    
    NSMethodSignature *signature = [target methodSignatureForSelector:selector];
    if (!signature) {
        NSString *errorMessage = [NSString stringWithFormat:@"target:%@, selector:%@ doesn't have a method signature", target, NSStringFromSelector(selector)];
        WX_MONITOR_FAIL(WXMTJSBridge, WX_ERR_INVOKE_NATIVE, errorMessage);
        return nil;
    }
    
    NSArray *arguments = _arguments;
    if (signature.numberOfArguments - 2 < arguments.count) {
        NSString *errorMessage = [NSString stringWithFormat:@"%@, the parameters in calling method [%@] and registered method [%@] are not consistent！", target, _methodName, NSStringFromSelector(selector)];
        WX_MONITOR_FAIL(WXMTJSBridge, WX_ERR_INVOKE_NATIVE, errorMessage);
        return nil;
    }
    
    NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
    invocation.target = target;
    invocation.selector = selector;
    NSString *instanceId = _instance.instanceId;
    void **freeList = NULL;
    
    NSMutableArray *blockArray = [NSMutableArray array];
    WX_ALLOC_FLIST(freeList, arguments.count);
    for (int i = 0; i < arguments.count; i ++ ) {
        id obj = arguments[i];
        const char *parameterType = [signature getArgumentTypeAtIndex:i + 2];
#ifdef DEBUG
        [self checkParameter:obj parameterType:parameterType order:i];
#endif
        static const char *blockType = @encode(typeof(^{}));
        id argument;
        if (!strcmp(parameterType, blockType)) {
            // callback
            argument = [^void(NSString *result, BOOL keepAlive) {
                [[WXSDKManager bridgeMgr] callBack:instanceId funcId:(NSString *)obj params:result keepAlive:keepAlive];
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

@end

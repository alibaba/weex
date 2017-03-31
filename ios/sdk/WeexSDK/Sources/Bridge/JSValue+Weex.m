/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "JSValue+Weex.h"
#import <objc/runtime.h>

@implementation JSValue (Weex)

+ (JSValue *)wx_valueWithReturnValueFromInvocation:(NSInvocation *)invocation inContext:(JSContext *)context
{
    if (!invocation || !context) {
        return nil;
    }
    
    const char * returnType = [invocation.methodSignature methodReturnType];
    
    JSValue *returnValue;
    switch (returnType[0] == _C_CONST ? returnType[1] : returnType[0]) {
        case _C_VOID: {
            // 1.void
            returnValue = [JSValue valueWithUndefinedInContext:context];
            break;
        }
        
        case _C_ID: {
            // 2.id
            void *value;
            [invocation getReturnValue:&value];
            id object = (__bridge id)value;
        
            returnValue = [JSValue valueWithObject:[object copy] inContext:context];
            break;
        }
        
#define WX_JS_VALUE_RET_CASE(typeString, type) \
        case typeString: {                      \
            type value;                         \
            [invocation getReturnValue:&value];  \
            returnValue = [JSValue valueWithObject:@(value) inContext:context]; \
            break; \
        }
        // 3.number
        WX_JS_VALUE_RET_CASE(_C_CHR, char)
        WX_JS_VALUE_RET_CASE(_C_UCHR, unsigned char)
        WX_JS_VALUE_RET_CASE(_C_SHT, short)
        WX_JS_VALUE_RET_CASE(_C_USHT, unsigned short)
        WX_JS_VALUE_RET_CASE(_C_INT, int)
        WX_JS_VALUE_RET_CASE(_C_UINT, unsigned int)
        WX_JS_VALUE_RET_CASE(_C_LNG, long)
        WX_JS_VALUE_RET_CASE(_C_ULNG, unsigned long)
        WX_JS_VALUE_RET_CASE(_C_LNG_LNG, long long)
        WX_JS_VALUE_RET_CASE(_C_ULNG_LNG, unsigned long long)
        WX_JS_VALUE_RET_CASE(_C_FLT, float)
        WX_JS_VALUE_RET_CASE(_C_DBL, double)
        WX_JS_VALUE_RET_CASE(_C_BOOL, BOOL)
            
        case _C_STRUCT_B: {
            NSString *typeString = [NSString stringWithUTF8String:returnType];
            
#define WX_JS_VALUE_RET_STRUCT(_type, _methodName)                             \
            if ([typeString rangeOfString:@#_type].location != NSNotFound) {   \
                _type value;                                                   \
                [invocation getReturnValue:&value];                            \
                returnValue = [JSValue _methodName:value inContext:context]; \
                break;                                                         \
            }
            // 4.struct
            WX_JS_VALUE_RET_STRUCT(CGRect, valueWithRect)
            WX_JS_VALUE_RET_STRUCT(CGPoint, valueWithPoint)
            WX_JS_VALUE_RET_STRUCT(CGSize, valueWithSize)
            WX_JS_VALUE_RET_STRUCT(NSRange, valueWithRange)
            
        }
        case _C_CHARPTR:
        case _C_PTR:
        case _C_CLASS: {
            returnValue = [JSValue valueWithUndefinedInContext:context];
            break;
        }
    }
    
    return returnValue;
}

@end

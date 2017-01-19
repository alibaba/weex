/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXComponentMethod.h"
#import "WXComponentFactory.h"
#import "WXComponentManager.h"
#import "WXSDKInstance.h"
#import "WXLog.h"
#import "WXUtility.h"

@implementation WXComponentMethod
{
    NSString *_componentName;
    NSString *_componentRef;
}

- (instancetype)initWithComponentRef:(NSString *)ref
                          methodName:(NSString *)methodName
                           arguments:(NSArray *)arguments
                            instance:(WXSDKInstance *)instance
{
    if (self = [super initWithMethodName:methodName arguments:arguments instance:instance]) {
        _componentRef = ref;
    }
    
    return self;
}

- (void)invoke
{
    WXPerformBlockOnComponentThread(^{
        WXComponent *component = [self.instance componentForRef:_componentRef];
        if (!component) {
            WXLogError(@"component not found for ref:%@, type:%@", _componentRef, _componentName);
        }
        SEL selector = [WXComponentFactory methodWithComponentName:component.type withMethod:self.methodName];
        NSInvocation * invocation = [self invocationWithTarget:component selector:selector];
        WXPerformBlockOnMainThread(^{
            [invocation invoke];
        });
    });
    
    
}

@end

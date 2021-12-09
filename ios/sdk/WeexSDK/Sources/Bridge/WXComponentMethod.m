/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
            return;
        }
        BOOL synchronous = NO;
        SEL selector = [WXComponentFactory methodWithComponentName:component.type withMethod:self.methodName isSync:&synchronous];
        NSInvocation * invocation = [self invocationWithTarget:component selector:selector];
        if (synchronous) {
            [invocation invoke];
        }
        else {
            WXPerformBlockOnMainThread(^{
                [invocation invoke];
            });
        }
    });
    
    
}

@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXModuleManager.h"
#import "WXModuleProtocol.h"
#import "WXUtility.h"
#import "WXAssert.h"
#import "WXModuleFactory.h"
#import "WXSDKError.h"
#import "WXMonitor.h"
#import "WXSDKManager.h"
#import "WXThreadSafeMutableDictionary.h"
#import "WXInvocationConfig.h"

#import <objc/message.h>

@interface WXModuleManager ()

@property (nonatomic, strong) WXThreadSafeMutableDictionary *indexDict;

@end

@implementation WXModuleManager

- (instancetype)init
{
    self = [super init];
    if(self){
        _indexDict = [[WXThreadSafeMutableDictionary alloc]init];
    }
    return self;
}

#pragma mark Private Methods

- (void)_executeModuleThead:(NSThread *)thread withBlock:(dispatch_block_t)block
{
    if (!thread || !block) return;
    
    if ([NSThread currentThread] == thread) {
        block();
    } else {
        [self performSelector:@selector(_executeModuleBlock:)
                     onThread:thread
                   withObject:[block copy]
                waitUntilDone:NO];
    }
}

- (void)_executeModuleBlock:(dispatch_block_t)block
{
    if (block) block();
}

- (void)_executeModuleMethod:(id)module withMethod:(WXBridgeMethod *)method
{
    NSInvocation *invocation = [[WXInvocationConfig sharedInstance] invocationWithTargetMethod:module method:method];
    [invocation invoke];
}

#pragma mark Public Methods

- (void)dispatchMethod:(WXBridgeMethod *)method
{
    if (!method) return;
    
    Class module =  [WXModuleFactory classWithModuleName:method.module];
    if (!module) {
        NSString *errorMessage = [NSString stringWithFormat:@"Module：%@ doesn't exist！", method.module];
        WX_MONITOR_FAIL(WXMTJSBridge, WX_ERR_INVOKE_NATIVE, errorMessage);
        return;
    }
    
//    WXLogDebug(@"execute：[module %@], [method %@], [parameter %@]", method.module, method.method, method.arguments);
    
    WXSDKInstance *weexInstance = [WXSDKManager instanceForID:method.instance];
    id<WXModuleProtocol> moduleInstance = [weexInstance moduleForClass:module];
    
    // dispatch to user specified queue or thread, default is main thread
    __weak typeof(self) weakSelf = self;
    dispatch_block_t dipatchMethodBlock = ^ (){
        [weakSelf _executeModuleMethod:moduleInstance withMethod:method];
    };
    
    NSThread *targetThread = nil;
    dispatch_queue_t targetQueue = nil;
    if([moduleInstance respondsToSelector:@selector(targetExecuteQueue)]){
        targetQueue = [moduleInstance targetExecuteQueue] ?: dispatch_get_main_queue();
    } else if([moduleInstance respondsToSelector:@selector(targetExecuteThread)]){
        targetThread = [moduleInstance targetExecuteThread] ?: [NSThread mainThread];
    } else {
        targetThread = [NSThread mainThread];
    }
    
    WXAssert(targetQueue || targetThread, @"No queue or thread found for module:%@", moduleInstance);
    
    if (targetQueue) {
        dispatch_async(targetQueue, dipatchMethodBlock);
    } else {
        WXPerformBlockOnThread(^{
            dipatchMethodBlock();
        }, targetThread);
    }
}

@end

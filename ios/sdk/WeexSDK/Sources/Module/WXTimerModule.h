/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXModuleProtocol.h"

@interface WXTimerModule : NSObject <WXModuleProtocol>

- (NSMutableDictionary *)timers;

- (void)createTimerWithCallback:(NSString *)callbackID time:(NSTimeInterval)milliseconds target:(id)target selector:(SEL)selector shouldRepeat:(BOOL)shouldRepeat;

- (void)clearTimeout:(NSString *)callbackID;

@end

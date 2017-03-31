/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <WeexSDK/WeexSDK.h>
#import "WXCanvasModule.h"
#import <GLKit/GLKit.h>

@interface WXCanvasComponent : WXComponent <GLKViewDelegate>

- (void) addDrawActions:(NSArray *)actions canvasModule:(WXCanvasModule*)canvasModule;

@end

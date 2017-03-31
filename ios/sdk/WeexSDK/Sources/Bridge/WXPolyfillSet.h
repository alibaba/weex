/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@protocol WXPolyfillSetJSExports <JSExport>

+ (instancetype)create;

- (BOOL)has:(id)value;

- (NSUInteger)size;

- (void)add:(id)value;

- (BOOL)delete:(id)value;

- (void)clear;

@end

@interface WXPolyfillSet : NSObject <WXPolyfillSetJSExports>

@end


/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <WeexSDK/WeexSDK.h>

@interface WXComponent (PseudoClassManagement)

/**
 *  @abstract filter common styles and pseudoClassStyles.
 *
 */
-(NSMutableDictionary *)parseStyles:(NSDictionary *)styles;

/**
 *  @abstract filter common styles and pseudoClassStyles.
 *
 */
-(NSString *)getPseudoKey:(NSString *)key;

/**
 *  @abstract get pseudo class styles through key.
 *
 *  @param key      the key to search pseudo class
 *
 *  @return pseudo class.
 */
-(NSMutableDictionary *)getPseudoClassStyles:(NSString *)key;

/**
 *  @abstract get pseudo class styles through keys.
 *
 *  @param keys      the keys to search pseudo class
 *  
 *  @return pseudo class.
 */
-(NSMutableDictionary *)getPseudoClassStylesByKeys:(NSArray *)keys;

///--------------------------------------
/// @name Updating PseudoClass
///--------------------------------------

/**
 * @abstract Called when component's style are updated
 *
 * @param styles The updated style dictionary
 * @discussion It can be overrided to handle specific style updating. The method is called on the main thread.
 **/
- (void)updatePseudoClassStyles:(NSDictionary *)pseudoClassStyles;

///--------------------------------------
/// @name recovery styles
///--------------------------------------

/**
 * @abstract Called when component recovery styles
 *
 * @discussion It can be overrided to handle specific style recovery. The method is called on the main thread.
 **/
- (void)recoveryPseudoStyles:(NSDictionary *)styles;

@end

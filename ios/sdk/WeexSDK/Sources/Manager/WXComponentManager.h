/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

@class WXBridgeMethod;
@class WXSDKInstance;
@class WXComponent;

extern void WXPerformBlockOnComponentThread(void (^block)());


@interface WXComponentManager : NSObject

@property (nonatomic, readonly, weak) WXSDKInstance *weexInstance;
@property (nonatomic, readonly, assign) BOOL isValid;

/**
 * @abstract initialize with weex instance
 **/
- (instancetype)initWithWeexInstance:(WXSDKInstance *)weexInstance;

/**
 * @abstract return the component thread
 **/
+ (NSThread *)componentThread;

/**
 * @abstract starting component tasks
 **/
- (void)startComponentTasks;

/**
 * @abstract tell the component mananger that instance root view's frame has been changed
 **/
- (void)rootViewFrameDidChange:(CGRect)frame;

///--------------------------------------
/// @name Component Tree Building
///--------------------------------------

/**
 * @abstract create root of component tree
 **/
- (void)createRoot:(NSDictionary *)data;

/**
 * @abstract add component
 **/
- (void)addComponent:(NSDictionary *)componentData toSupercomponent:(NSString *)superRef atIndex:(NSInteger)index appendingInTree:(BOOL)appendingInTree;

/**
 * @abstract remove component
 **/
- (void)removeComponent:(NSString *)ref;

/**
 * @abstract move component
 **/
- (void)moveComponent:(NSString *)ref toSuper:(NSString *)superRef atIndex:(NSInteger)index;

/**
 * @abstract return component for specific ref, must be called on component thread by calling WXPerformBlockOnComponentThread
 */
- (WXComponent *)componentForRef:(NSString *)ref;

/**
 * @abstract return root component
 */
- (WXComponent *)componentForRoot;

/**
 * @abstract number of components created, must be called on component thread by calling WXPerformBlockOnComponentThread
 */
- (NSUInteger)numberOfComponents;


///--------------------------------------
/// @name Updating
///--------------------------------------

/**
 * @abstract update styles
 **/
- (void)updateStyles:(NSDictionary *)styles forComponent:(NSString *)ref;

///--------------------------------------
/// @name Updating pseudo class
///--------------------------------------

/**
 * @abstract update  pseudo class styles
 **/

- (void)updatePseudoClassStyles:(NSDictionary *)styles forComponent:(NSString *)ref;

/**
 * @abstract update attributes
 **/
- (void)updateAttributes:(NSDictionary *)attributes forComponent:(NSString *)ref;

/**
 * @abstract add event
 **/
- (void)addEvent:(NSString *)event toComponent:(NSString *)ref;

/**
 * @abstract remove event
 **/
- (void)removeEvent:(NSString *)event fromComponent:(NSString *)ref;

/**
 * @abstract scroll to specific component
 **/
- (void)scrollToComponent:(NSString *)ref options:(NSDictionary *)options;

///--------------------------------------
/// @name Life Cycle
///--------------------------------------

/**
 * @abstract called when all doms are created
 **/
- (void)createFinish;

/**
 * @abstract called when all doms are refreshed
 **/
- (void)refreshFinish;

/**
 * @abstract called when all doms are updated
 **/
- (void)updateFinish;

/**
 * @abstract unload
 **/
- (void)unload;


///--------------------------------------
/// @name Fixed
///--------------------------------------

/**
 *  @abstract add a component which has a fixed position
 *
 *  @param component
 */
- (void)addFixedComponent:(WXComponent *)fixComponent;

/**
 *  @abstract remove a component which has a fixed position
 *
 *  @param component
 */
- (void)removeFixedComponent:(WXComponent *)fixComponent;

- (void)_addUITask:(void (^)())block;


@end

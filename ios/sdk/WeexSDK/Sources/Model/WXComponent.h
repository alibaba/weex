/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <Foundation/Foundation.h>
#import "WXLayoutDefine.h"

@class WXSDKInstance;

/**
 * @abstract the component callback , result can be string or dictionary.
 * @discussion callback data to js, the id of callback function will be removed to save memory.
 */
typedef void (^WXCallback)(_Nonnull id result);

/**
 * @abstract the component callback , result can be string or dictionary.
 * @discussion callback data to js, you can specify the keepAlive parameter to keep callback function id keepalive or not. If the keepAlive is true, it won't be removed unitl instance destroyed, so you can call it repetitious.
 */
typedef void (^WXKeepAliveCallback)(_Nonnull id result, BOOL keepAlive);

NS_ASSUME_NONNULL_BEGIN

@interface WXComponent : NSObject

///--------------------------------------
/// @name Component Hierarchy Management
///--------------------------------------

/**
 *  @abstract Initializes a new component using the specified  properties.
 *
 *  @param ref          the identity string of component
 *  @param type         component type
 *  @param styles       component's styles
 *  @param attributes   component's attributes
 *  @param events       component's events
 *  @param weexInstance the weexInstance with which the component associated
 *
 *  @return A WXComponent instance.
 */
- (instancetype)initWithRef:(NSString *)ref
                       type:(NSString*)type
                     styles:(nullable NSDictionary *)styles
                 attributes:(nullable NSDictionary *)attributes
                     events:(nullable NSArray *)events
               weexInstance:(WXSDKInstance *)weexInstance;

/**
 *  @abstract The component's identifier string.
 */
@property (nonatomic, readonly, strong) NSString *ref;

/**
 *  @abstract The component's type string.
 */
@property (nonatomic, readonly, copy) NSString *type;

/**
 *  @abstract The component's styles.
 */
@property (nonatomic, readonly, strong) NSDictionary *styles;

/**
 *  @abstract The component's pseudoClassStyles.
 */
@property (nonatomic, readonly, strong) NSDictionary *pseudoClassStyles;

/**
 *  @abstract The component's attributes.
 */
@property (nonatomic, readonly, strong) NSDictionary *attributes;

/**
 *  @abstract The component's events.
 */
@property (nonatomic, readonly, strong) NSArray *events;

/**
 *  @abstract The reference to
 */
@property (nonatomic, readonly, weak, nullable) WXSDKInstance *weexInstance;

/**
 * @abstract The component's subcomponents.
 */
@property (nonatomic, readonly, strong, nullable) NSArray<WXComponent *> *subcomponents;

/**
 * @abstract The component's supercomponent.
 */
@property (nonatomic, readonly, weak, nullable) WXComponent *supercomponent;

///--------------------------------------
/// @name Layout
///--------------------------------------

/**
 * @abstract Return the calculated frame.
 *
 * @warning Subclasses must not override this.
 */
@property(nonatomic, readonly, assign) CGRect calculatedFrame;

/**
 * @abstract Tell if component's view frame will keep synchronized with calculatedFrame. 
 * Default Value is YES.
 */
@property(nonatomic, assign) BOOL isViewFrameSyncWithCalculated;

///**
// * @abstract Return the calculated absolute position.
// *
// * @warning Subclasses must not override this.
// */
//@property(nonatomic, assign) CGPoint absolutePosition;

/**
 * @abstract Return the css node used to layout.
 *
 * @warning Subclasses must not override this.
 */
@property(nonatomic, readonly, assign) css_node_t *cssNode;

/**
 * @abstract Invalidates the component's layout and marks it as needing an update.
 *
 * @discussion You can call this method to indicate that the layout of a component has changed and must be updated. Weex typically calls this method automatically when the layout-related styles change or when subcomponents are added or removed.
 *
 */
- (void)setNeedsLayout;

/**
 * @abstract Returns a Boolean indicating whether the component has been marked as needing a layout update.
 *
 * @return YES if the component has been marked as requiring a layout update.
 *
 */
- (BOOL)needsLayout;

/**
 * @abstract return a measure block for measure component's layout
 *
 * constrainedSize: The maximum size the receiver should fit in.
 *
 * @return A block which will ask the component to measure and return the size that best fits for a constrained size.
 *
 * @discussion Subclasses can override this method to perform their own layout behaviour.  Weex will use the returned block to measure the component's layout, ignoring its own layout mechanism.
 *
 */
- (nullable CGSize (^)(CGSize constrainedSize))measureBlock;

/**
 * @abstract Called on main thread when the component has just laid out.
 */
- (void)layoutDidFinish;


///--------------------------------------
/// @name View Management
///--------------------------------------

/**
 * @abstract The view that the component manages.
 *
 * @discussion If you access this property and its value is currently nil, the component automatically calls the loadView method and returns the resulting view.
 *
 * @warning It must be on accessed on the main thread.Subclasses must not override this;
 */
@property(nonatomic, readonly, strong) UIView *view;

/**
 * @abstract The layer that the component manages.
 *
 * @discussion The layer property is also lazily initialized, similar to the view property.
 *
 * @warning It must be on accessed on the main thread. Subclasses must not override this;
 */
@property(nonatomic, readonly, strong) CALayer *layer;

/**
 * @abstract Creates the view that the component manages.
 *
 * @return View to be created
 *
 * @discussion This method loads or creates a view and assigns it to the view property. This is where subclasses should create their custom view hierarchy. Should never be called directly.The method is called on the main thread.
 *
 * @warning Your custom implementation of this method should not call super
 */
- (UIView *)loadView;

/**
 * @abstract Returns a Boolean value indicating whether the view is currently loaded.
 */
- (BOOL)isViewLoaded;

/**
 * @abstract Called before the load of component's view .
 *
 * @discussion This is before -loadView. The method is called on the main thread.
 */
- (void)viewWillLoad;

/**
 * @abstract Called after the component's view is loaded and set.
 *
 * @discussion This is after -loadView. This is the best time to perform additional initialization like adding gesture recognizers to the view.The method is called on the main thread.
 */
- (void)viewDidLoad;

/**
 * @abstract Called just before releasing the component's view.The method is called on the main thread.
 */
- (void)viewWillUnload;

/**
 * @abstract Called when the component's view is released.The method is called on the main thread.
 */
- (void)viewDidUnload;

/**
 * @abstract Inserts a subview at the specified index.
 *
 * @param subcomponent The subcomponent whose view will be inserted in the component's view.
 * @param index        The index in the array of the subcomponents property at which to insert the view. subcomponent indices start at 0 and cannot be greater than the number of subcomponents.
 *
 * @discussion This will insert subcomponent's view to the view hierachy by default, it can be overrided to change the view hierachy. The method is called on the main thread.
 */
- (void)insertSubview:(WXComponent *)subcomponent atIndex:(NSInteger)index;

/**
 * @abstract Tells the component that a subcomponent's view is about to be removed.
 *
 * @discussion The method is called on the main thread.
 */
- (void)willRemoveSubview:(WXComponent *)component;

/**
 * @abstract Remove the component's view from its superview.
 *
 * @discussion The method is called on the main thread.
 */
- (void)removeFromSuperview;

/**
 * @abstract Moves the subview to a new super component in the scene. The node maintains its current position in scene coordinates.
 *
 * @param newSupercomponent An WXComponent object to move the component to
 * @param index             The index in the array of the subcomponents property at which to insert the view. subcomponent indices start at 0 and cannot be greater than the number of subcomponents.
 */
- (void)moveToSuperview:(WXComponent *)newSupercomponent atIndex:(NSUInteger)index;

///--------------------------------------
/// @name Events
///--------------------------------------

/**
 * @abstract Fire an event to the component in Javascript.
 *
 * @param eventName The name of the event to fire
 * @param params The parameters to fire with
 **/
- (void)fireEvent:(NSString *)eventName params:(nullable NSDictionary *)params;

/**
 * @abstract Fire an event to the component and tell Javascript which value has been changed. 
 * Used for two-way data binding.
 *
 * @param eventName The name of the event to fire
 * @param params The parameters to fire with
 * @param domChanges The values has been changed, used for two-way data binding.
 **/
- (void)fireEvent:(NSString *)eventName params:(nullable NSDictionary *)params domChanges:(nullable NSDictionary *)domChanges;

///--------------------------------------
/// @name Updating
///--------------------------------------

/**
 * @abstract Called when component's style are updated
 *
 * @param styles The updated style dictionary
 * @discussion It can be overrided to handle specific style updating. The method is called on the main thread.
 **/
- (void)updateStyles:(NSDictionary *)styles;

/**
 * @abstract Called when component's style are reset
 *
 * @param styles The reset style's elements
 * @discussion It can be overrided to handle specific style reseting. The method is called on the main thread.
 **/
- (void)resetStyles:(NSArray *)styles;

/**
 * @abstract Called when component's attributes are updated
 *
 * @param attributes The updated attributes dictionary
 * @discussion It can be overrided to handle specific attribute updating. The method is called on the main thread.
 **/
- (void)updateAttributes:(NSDictionary *)attributes;

/**
 * @abstract Called when adding an event to the component
 *
 * @param eventName The added event's name
 * @discussion It can be overrided to handle specific event adding. The method is called on the main thread.
 **/
- (void)addEvent:(NSString *)eventName;

/**
 * @abstract Called when removing an event from the component
 *
 * @param eventName The removed event's name
 * @discussion It can be overrided to handle specific event removing. The method is called on the main thread.
 **/
- (void)removeEvent:(NSString *)eventName;

///--------------------------------------
/// @name Display
///--------------------------------------

typedef UIImage * _Nonnull(^WXDisplayBlock)(CGRect bounds, BOOL(^isCancelled)(void));
typedef void(^WXDisplayCompletionBlock)(CALayer *layer, BOOL finished);

/**
 * @abstract Marks the view as needing display. The method should be called on the main thread.
 */
- (void)setNeedsDisplay;

/**
 * @abstract Return a block to be called to draw layer.
 *
 * @discussion The block returned will be called on any thread.
 *
 */
- (WXDisplayBlock)displayBlock;

/**
 * readyToRender
 */
- (void)readyToRender;

/**
 * @abstract Return a block to be called while drawing is finished.
 *
 * @discussion The block returned will be called on main thread.
 *
 */
- (WXDisplayCompletionBlock)displayCompletionBlock;

@end

@interface UIView (WXComponent)

@property (nonatomic, weak) WXComponent *wx_component;

@property (nonatomic, weak) NSString *wx_ref;

@end

@interface CALayer (WXComponent)

@property (nonatomic, weak) WXComponent *wx_component;

@end

NS_ASSUME_NONNULL_END

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import "WXModuleProtocol.h"

/**
 * This enum is used to define the position of navbar item.
 */
typedef NS_ENUM(NSInteger, WXNavigationItemPosition) {
    WXNavigationItemPositionCenter = 0x00,
    WXNavigationItemPositionRight,
    WXNavigationItemPositionLeft,
    WXNavigationItemPositionMore
};

/**
 * @abstract The callback after executing navigator operations. The code has some status such as 'WX_SUCCESS'、'WX_FAILED' etc. The responseData
 * contains some useful info you can handle.
 */
typedef void (^WXNavigationResultBlock)(NSString *code, NSDictionary * responseData);

@protocol WXNavigationProtocol <WXModuleProtocol>

/**
 * @abstract Returns the navigation controller.
 *
 * @param container The target controller.
 */
- (id)navigationControllerOfContainer:(UIViewController *)container;

/**
 * @abstract Sets the navigation bar hidden.
 *
 * @param hidden If YES, the navigation bar is hidden.
 *
 * @param animated Specify YES to animate the transition or NO if you do not want the transition to be animated.
 *
 * @param container The navigation controller.
 *
 */
- (void)setNavigationBarHidden:(BOOL)hidden animated:(BOOL)animated
                 withContainer:(UIViewController *)container;

/**
 * @abstract Sets the background color of navigation bar.
 *
 * @param backgroundColor The background color of navigation bar.
 *
 * @param container The target controller.
 *
 */
- (void)setNavigationBackgroundColor:(UIColor *)backgroundColor
                       withContainer:(UIViewController *)container;

/**
 * @abstract Sets the item in navigation bar.
 *
 * @param param The data which is passed to the implementation of the protocol.
 *
 * @param position The value indicates the position of item.
 *
 * @param block A block called once the action is completed.
 *
 * @param container The target controller.
 *
 */
- (void)setNavigationItemWithParam:(NSDictionary *)param
                          position:(WXNavigationItemPosition)position
                        completion:(WXNavigationResultBlock)block
                     withContainer:(UIViewController *)container;

/**
 * @abstract Clears the item in navigation bar.
 *
 * @param param The data which is passed to the implementation of the protocol.
 *
 * @param position The value indicates the position of item.
 *
 * @param block A block called once the action is completed.
 *
 * @param container The target controller.
 *
 */
- (void)clearNavigationItemWithParam:(NSDictionary *)param
                            position:(WXNavigationItemPosition)position
                          completion:(WXNavigationResultBlock)block
                       withContainer:(UIViewController *)container;

/**
 * @abstract Pushes a view controller onto the receiver’s stack.
 *
 * @param param The data which is passed to the implementation of the protocol.
 *
 * @param block A block called once the action is completed.
 *
 * @param container The target controller.
 *
 */
- (void)pushViewControllerWithParam:(NSDictionary *)param
                         completion:(WXNavigationResultBlock)block
                      withContainer:(UIViewController *)container;

/**
 * @abstract Pops the top view controller from the navigation stack.
 *
 * @param param The data which is passed to the implementation of the protocol.
 *
 * @param block A block called once the action is completed.
 *
 * @param container The target controller.
 *
 */
- (void)popViewControllerWithParam:(NSDictionary *)param
                        completion:(WXNavigationResultBlock)block
                     withContainer:(UIViewController *)container;

    
@optional
    
/**
 * @abstract open the resource at the specified URL which supports many common schemes, including the http, https, tel and mailto schemes.
 *
 * @param param The data which is passed to the implementation of the protocol.
 *
 * @param success A block called once the action is completed successfully.
 *
 * @param failure A block called once the action failed to be completed.
 *
 * @param container The target controller.
 *
 */
- (void)open:(NSDictionary *)param success:(WXModuleCallback)success
                                   failure:(WXModuleCallback)failure
                             withContainer:(UIViewController *)container;


/**
  * @abstract close the current weex page
  *
  * @param param The data which is passed to the implementation of the protocol.
  *
  * @param success A block called once the action is completed successfully.
  *
  * @param failure A block called once the action failed to be completed.
  *
  * @param container The target controller.
  *
  */
- (void)close:(NSDictionary *)param success:(WXModuleCallback)success
                                   failure:(WXModuleCallback)failure
                             withContainer:(UIViewController *)container;
@end

/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>

/**
 * The WXBaseViewController class provides the infrastructure for managing the weex view in your app. It is 
 * responsible for creating a weex instance or rendering the weex view, for observing the lifecycle of the
 * view such as "appear" or "disappear"、"foreground" or "background" etc. You can initialize this controller by
 * special bundle URL.
 */

@interface WXBaseViewController : UIViewController <UIGestureRecognizerDelegate>

/**
 * @abstract initializes the viewcontroller with bundle url.
 *
 * @param sourceURL The url of bundle rendered to a weex view.
 *
 * @return a object the class of WXBaseViewController.
 *
 */
- (instancetype)initWithSourceURL:(NSURL *)sourceURL;

/**
 * @abstract refreshes the weex view in controller.
 */
- (void)refreshWeex;

@end

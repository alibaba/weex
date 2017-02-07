/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>

/**
 * The WXRootViewController class inherited from UINavigationController class which implements a specialized
 * view controller that manages the navigation of hierarchical content. Developing an iOS application, you
 * need a series of customer pages which will be render by weex bundle. Sometimes, these pages are embedded in
 * viewcontroller. This navigation controller makes it possible to present your page efficiently and makes it
 * easier for the user to navigate that content.
 */

@interface WXRootViewController : UINavigationController

/**
 * @abstract initialize the RootViewController with bundle url.
 *
 * @param sourceURL The bundle url which can be render to a weex view.
 *
 * @return a object the class of WXRootViewController.
 *
 * @discussion initialize this controller in function 'application:didFinishLaunchingWithOptions', and make it as rootViewController of window. In the
 * weex application, all page content can be managed by the navigation, such as push or pop.
 */
- (id)initWithSourceURL:(NSURL *)sourceURL;

@end

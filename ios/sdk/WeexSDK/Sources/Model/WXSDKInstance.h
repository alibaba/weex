/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import "WXComponent.h"

extern NSString *const bundleUrlOptionKey;

@interface WXSDKInstance : NSObject

/**
 * The viewControler which the weex bundle is rendered in.
 **/
@property (nonatomic, weak) UIViewController *viewController;

/**
 * The rootView which the weex bundle is rendered at.
 **/
@property (nonatomic, strong) UIView *rootView;

/**
 * The scriptURL of weex bundle.
 **/
@property (nonatomic, strong) NSURL *scriptURL;

/**
 * The parent instance.
 **/
@property (nonatomic, weak) WXSDKInstance *parentInstance;

/**
 * The node reference of parent instance.
 **/
@property (nonatomic, weak) NSString *parentNodeRef;

/**
 * The unique id to indentify current weex instance.
 **/
@property (nonatomic, strong) NSString *instanceId;

/**
 * The state of current instance.
 **/
typedef NS_ENUM(NSInteger, WXState) {//state.code
    WeexInstanceAppear = 100,
    WeexInstanceDisappear,
    WeexInstanceForeground,
    WeexInstanceBackground,
    WeexInstanceMemoryWarning,
    WeexInstanceDestroy
};

@property (nonatomic, assign) WXState state;

/**
 *  The callback triggered when the instance finishes creating the body.
 *
 *  @param view The rootView.
 **/
@property (nonatomic, copy) void (^onCreate)(UIView *);

/**
 *  The callback triggered when the instance finishes refreshing weex view.
 *
 *  @param view The rootView.
 **/
@property (nonatomic, copy) void (^refreshFinish)(UIView *);

/**
 *  The callback triggered when the instance finishes rendering.
 *
 *  @param view The rootView.
 **/
@property (nonatomic, copy) void (^renderFinish)(UIView *);

/**
 *  The callback triggered when the instance finishes updating.
 *
 *  @param view The rootView.
 **/
@property (nonatomic, copy) void (^updateFinish)(UIView *);


typedef NS_ENUM(NSInteger, WXErrorType) {//error.domain
    TemplateErrorType = 1,
};
typedef NS_ENUM(NSInteger, WXErrorCode) {//error.code
    PlatformErrorCode = 1000,
    OSVersionErrorCode,
    AppVersionErrorCode,
    WeexSDKVersionErrorCode,
    DeviceModelErrorCode,
    FrameworkVersionErrorCode,
};

/**
 *  The callback triggered when the instance fails to render.
 *
 *  @param error The error code .
 **/
@property (nonatomic, copy) void (^onFailed)(NSError *error);

/**
 *  The callback triggered when the instacne executes scrolling .
 *
 *  @param contentOffset The point at which the origin of the content view is offset from the origin of the scroll view
 **/
@property (nonatomic, copy) void (^onScroll)(CGPoint contentOffset);

/**
 * the callback to be run repeatedly while the instance is rendering.
 *
 * @param renderRect The view's frame that is just rendered.
 **/
@property (nonatomic, copy) void (^onRenderProgress)(CGRect renderRect);

/**
 *  the frame of current instance.
 **/
@property (nonatomic, assign) CGRect frame;

/**
 *  the info stored by user.
 */
@property (nonatomic, strong) NSDictionary *userInfo;

/**
 * Renders weex view with bundle url.
 *
 * @param url The url of bundle rendered to a weex view.
 **/
- (void)renderWithURL:(NSURL *)url;

/**
 * Renders weex view with bundle url and some others.
 *
 * @param url The url of bundle rendered to a weex view.
 *
 * @param options The params passed by user, sometimes you should pass the value of "bundleUrl".
 *
 * @param data The data the bundle needs when rendered.
 **/
- (void)renderWithURL:(NSURL *)url options:(NSDictionary *)options data:(id)data;

/**
 * Renders weex view with source string of bundle and some others.
 *
 * @param url The source string of bundle rendered to a weex view.
 *
 * @param options The params passed by user, sometimes you should pass the value of "bundleUrl".
 *
 * @param data The data the bundle needs when rendered.
 **/
- (void)renderView:(NSString *)source options:(NSDictionary *)options data:(id)data;

/**
 * Refreshes current instance with data.
 *
 * @param data The data the bundle needs when rendered.
 **/
- (void)refreshInstance:(id)data;

/**
 * Destroys current instance.
 **/
- (void)destroyInstance;

/**
 * get module instance by class
 */
- (id)moduleForClass:(Class)moduleClass;

/**
 * get Componet instance by ref
 */
- (WXComponent *)componentForRef:(NSString *)ref;

/**
 * Number of components created
 */
- (NSUInteger)numberOfComponents;

/**
 * application performance statistics
 */
@property (nonatomic, strong) NSString *bizType;
@property (nonatomic, strong) NSString *pageName;
@property (nonatomic, weak) id pageObject;
@property (nonatomic, strong) NSMutableDictionary *performanceDict;


@property (nonatomic, strong) NSDictionary *properties DEPRECATED_MSG_ATTRIBUTE();
@property (nonatomic, assign) NSTimeInterval networkTime DEPRECATED_MSG_ATTRIBUTE();

- (void)finishPerformance DEPRECATED_MSG_ATTRIBUTE();

- (void)reloadData:(id)data  DEPRECATED_MSG_ATTRIBUTE("Use refreshInstance: method instead.");

@end

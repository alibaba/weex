/**
 * Created by Weex.
 * Copyright (c) 2016, Alibaba, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache Licence 2.0.
 * For the full copyright and license information,please view the LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import "WXComponent.h"
@class WXResourceRequest;

extern NSString *const bundleUrlOptionKey;

@interface WXSDKInstance : NSObject

/**
 * The viewControler which the weex bundle is rendered in.
 **/
@property (nonatomic, weak) UIViewController *viewController;

/**
 * The Native root container used to bear the view rendered by weex file. 
 * The root view is controlled by WXSDKInstance, so you can only get it, but not change it.
 **/
@property (nonatomic, strong) UIView *rootView;

/**
 * Component can freeze the rootview frame through the variable isRootViewFrozen
 * If Component want to freeze the rootview frame, set isRootViewFrozen YES, weex will not change the rootview frame when layout,or set NO.
 **/
@property (nonatomic, assign) BOOL isRootViewFrozen;

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
    WeexInstanceBindChanged,
    WeexInstanceDestroy
};


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


@property (nonatomic, assign) WXState state;

/**
 *  The callback triggered when the instance finishes creating the body.
 *
 *  @param view The rootView.
 **/
@property (nonatomic, copy) void (^onCreate)(UIView *);

/**
 *  The callback triggered when the root container's frame has changed.
 *
 *  @param view The rootView.
 **/
@property (nonatomic, copy) void (^onLayoutChange)(UIView *);

/**
 *  The callback triggered when the instance finishes rendering.
 *
 *  @param view The rootView.
 **/
@property (nonatomic, copy) void (^renderFinish)(UIView *);

/**
 *  The callback triggered when the instance finishes refreshing weex view.
 *
 *  @param view The rootView.
 **/
@property (nonatomic, copy) void (^refreshFinish)(UIView *);

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
@property (nonatomic, strong) NSMutableDictionary *userInfo;

/**
 *  scale factor from css unit to device pixel.
 */
@property (nonatomic, assign, readonly) CGFloat pixelScaleFactor;

/**
 * track component render
 */
@property (nonatomic, assign)BOOL trackComponent;
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
 * @param options The params passed by user
 *
 * @param data The data the bundle needs when rendered.  Defalut is nil.
 **/
- (void)renderWithURL:(NSURL *)url options:(NSDictionary *)options data:(id)data;

///**
// * Renders weex view with resource request.
// *
// * @param request The resource request specifying the URL to render with.
// *
// * @param options The params passed by user.
// *
// * @param data The data the bundle needs when rendered.  Defalut is nil.
// **/
//- (void)renderWithRequest:(WXResourceRequest *)request options:(NSDictionary *)options data:(id)data;

/**
 * Renders weex view with source string of bundle and some others.
 *
 * @param options The params passed by user.
 *
 * @param data The data the bundle needs when rendered. Defalut is nil.
 **/
- (void)renderView:(NSString *)source options:(NSDictionary *)options data:(id)data;

/**
 * Reload the js bundle from the current URL and rerender.
 *
 * @param forcedReload when this parameter is true, the js bundle will always be reloaded from the server. If it is false, the instance may reload the js bundle from its cache. Default is false.
 *
 **/
- (void)reload:(BOOL)forcedReload;

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
 * get Component instance by ref, must be called on component thread by calling WXPerformBlockOnComponentThread
 */
- (WXComponent *)componentForRef:(NSString *)ref;

/**
 * Number of components created, must be called on component thread by calling WXPerformBlockOnComponentThread
 */
- (NSUInteger)numberOfComponents;


/**
 * check whether the module eventName is registered
 */
- (BOOL)checkModuleEventRegistered:(NSString*)event moduleClassName:(NSString*)moduleClassName;

/**
 * fire module event;
 */
- (void)fireModuleEvent:(Class)module eventName:(NSString *)eventName params:(NSDictionary*)params;

/**
 * fire global event
 */
- (void)fireGlobalEvent:(NSString *)eventName params:(NSDictionary *)params;

/**
 * complete url based with bundle url
 */
- (NSURL *)completeURL:(NSString *)url;

/**
 * application performance statistics
 */
@property (nonatomic, strong) NSString *bizType;
@property (nonatomic, strong) NSString *pageName;
@property (nonatomic, weak) id pageObject;
@property (nonatomic, strong) NSMutableDictionary *performanceDict;


/** 
 * Deprecated 
 */
@property (nonatomic, strong) NSDictionary *properties DEPRECATED_MSG_ATTRIBUTE();
@property (nonatomic, assign) NSTimeInterval networkTime DEPRECATED_MSG_ATTRIBUTE();
@property (nonatomic, copy) void (^updateFinish)(UIView *);

@end

@interface WXSDKInstance (Deprecated)

- (void)finishPerformance DEPRECATED_MSG_ATTRIBUTE();
- (void)reloadData:(id)data  DEPRECATED_MSG_ATTRIBUTE("Use refreshInstance: method instead.");
- (void)creatFinish DEPRECATED_MSG_ATTRIBUTE();

@end

//
//  PDPageDomain.h
//  PonyDebuggerDerivedSources
//
//  Generated on 8/23/12
//
//  Licensed to Square, Inc. under one or more contributor license agreements.
//  See the LICENSE file distributed with this work for the terms under
//  which Square, Inc. licenses this file to you.
//

#import "PDObject.h"
#import "PDDebugger.h"
#import "PDDynamicDebuggerDomain.h"

@class PDPageFrame;
@class PDPageFrameResourceTree;

@protocol PDPageCommandDelegate;

// Actions and events related to the inspected page belong to the page domain.
@interface PDPageDomain : PDDynamicDebuggerDomain 

@property (nonatomic, assign) id <PDPageCommandDelegate, PDCommandDelegate> delegate;

// Events
- (void)domContentEventFiredWithTimestamp:(NSNumber *)timestamp;
- (void)loadEventFiredWithTimestamp:(NSNumber *)timestamp;

// Fired once navigation of the frame has completed. Frame is now associated with the new loader.
// Param frame: Frame object.
- (void)frameNavigatedWithFrame:(PDPageFrame *)frame;

// Fired when frame has been detached from its parent.
// Param frameId: Id of the frame that has been detached.
- (void)frameDetachedWithFrameId:(NSString *)frameId;

//yangshengtao test
- (void)workerRegistrationUpdated;
- (void)workerVersionUpdated;

@end

@protocol PDPageCommandDelegate <PDCommandDelegate>
@optional

// Enables page domain notifications.
- (void)domain:(PDPageDomain *)domain enableWithCallback:(void (^)(id error))callback;

// Disables page domain notifications.
- (void)domain:(PDPageDomain *)domain disableWithCallback:(void (^)(id error))callback;
// Callback Param identifier: Identifier of the added script.
- (void)domain:(PDPageDomain *)domain addScriptToEvaluateOnLoadWithScriptSource:(NSString *)scriptSource callback:(void (^)(NSString *identifier, id error))callback;
- (void)domain:(PDPageDomain *)domain removeScriptToEvaluateOnLoadWithIdentifier:(NSString *)identifier callback:(void (^)(id error))callback;

// Reloads given page optionally ignoring the cache.
// Param ignoreCache: If true, browser cache is ignored (as if the user pressed Shift+refresh).
// Param scriptToEvaluateOnLoad: If set, the script will be injected into all frames of the inspected page after reload.
- (void)domain:(PDPageDomain *)domain reloadWithIgnoreCache:(NSNumber *)ignoreCache scriptToEvaluateOnLoad:(NSString *)scriptToEvaluateOnLoad callback:(void (^)(id error))callback;

// Navigates current page to the given URL.
// Param url: URL to navigate the page to.
- (void)domain:(PDPageDomain *)domain navigateWithUrl:(NSString *)url callback:(void (^)(id error))callback;

// Returns all browser cookies. Depending on the backend support, will either return detailed cookie information in the <code>cookie</code> field or string cookie representation using <code>cookieString</code>.
// Callback Param cookies: Array of cookie objects.
// Callback Param cookiesString: document.cookie string representation of the cookies.
- (void)domain:(PDPageDomain *)domain getCookiesWithCallback:(void (^)(NSArray *cookies, NSString *cookiesString, id error))callback;

// Deletes browser cookie with given name for the given domain.
// Param cookieName: Name of the cookie to remove.
// Param domain: Domain of the cookie to remove.
- (void)domain:(PDPageDomain *)domain deleteCookieWithCookieName:(NSString *)cookieName domain:(NSString *)domain callback:(void (^)(id error))callback;

// Returns present frame / resource tree structure.
// Callback Param frameTree: Present frame / resource tree structure.
- (void)domain:(PDPageDomain *)domain getResourceTreeWithCallback:(void (^)(PDPageFrameResourceTree *frameTree, id error))callback;

// Returns content of the given resource.
// Param frameId: Frame id to get resource for.
// Param url: URL of the resource to get content for.
// Callback Param content: Resource content.
// Callback Param base64Encoded: True, if content was served as base64.
- (void)domain:(PDPageDomain *)domain getResourceContentWithFrameId:(NSString *)frameId url:(NSString *)url callback:(void (^)(NSString *content, NSNumber *base64Encoded, id error))callback;

// Searches for given string in resource content.
// Param frameId: Frame id for resource to search in.
// Param url: URL of the resource to search in.
// Param query: String to search for.
// Param caseSensitive: If true, search is case sensitive.
// Param isRegex: If true, treats string parameter as regex.
// Callback Param result: List of search matches.
- (void)domain:(PDPageDomain *)domain searchInResourceWithFrameId:(NSString *)frameId url:(NSString *)url query:(NSString *)query caseSensitive:(NSNumber *)caseSensitive isRegex:(NSNumber *)isRegex callback:(void (^)(NSArray *result, id error))callback;

// Searches for given string in frame / resource tree structure.
// Param text: String to search for.
// Param caseSensitive: If true, search is case sensitive.
// Param isRegex: If true, treats string parameter as regex.
// Callback Param result: List of search results.
- (void)domain:(PDPageDomain *)domain searchInResourcesWithText:(NSString *)text caseSensitive:(NSNumber *)caseSensitive isRegex:(NSNumber *)isRegex callback:(void (^)(NSArray *result, id error))callback;

// Sets given markup as the document's HTML.
// Param frameId: Frame id to set HTML for.
// Param html: HTML content to set.
- (void)domain:(PDPageDomain *)domain setDocumentContentWithFrameId:(NSString *)frameId html:(NSString *)html callback:(void (^)(id error))callback;

// Checks whether <code>setDeviceMetricsOverride</code> can be invoked.
// Callback Param result: If true, <code>setDeviceMetricsOverride</code> can safely be invoked on the agent.
- (void)domain:(PDPageDomain *)domain canOverrideDeviceMetricsWithCallback:(void (^)(NSNumber *result, id error))callback;

// Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results) and the font scale factor.
// Param width: Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.
// Param height: Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.
// Param fontScaleFactor: Overriding font scale factor value (must be positive). 1 disables the override.
// Param fitWindow: Whether a view that exceeds the available browser window area should be scaled down to fit.
- (void)domain:(PDPageDomain *)domain setDeviceMetricsOverrideWithWidth:(NSNumber *)width height:(NSNumber *)height fontScaleFactor:(NSNumber *)fontScaleFactor fitWindow:(NSNumber *)fitWindow callback:(void (^)(id error))callback;

// Requests that backend shows paint rectangles
// Param result: True for showing paint rectangles
- (void)domain:(PDPageDomain *)domain setShowPaintRectsWithResult:(NSNumber *)result callback:(void (^)(id error))callback;

// Determines if scripts can be executed in the page.
// Callback Param result: Script execution status: "allowed" if scripts can be executed, "disabled" if script execution has been disabled through page settings, "forbidden" if script execution for the given page is not possible for other reasons.
- (void)domain:(PDPageDomain *)domain getScriptExecutionStatusWithCallback:(void (^)(NSString *result, id error))callback;

// Switches script execution in the page.
// Param value: Whether script execution should be disabled in the page.
- (void)domain:(PDPageDomain *)domain setScriptExecutionDisabledWithValue:(NSNumber *)value callback:(void (^)(id error))callback;

// Overrides the Geolocation Position or Error.
// Param latitude: Mock longitude
// Param longitude: Mock latitude
// Param accuracy: Mock accuracy
- (void)domain:(PDPageDomain *)domain setGeolocationOverrideWithLatitude:(NSNumber *)latitude longitude:(NSNumber *)longitude accuracy:(NSNumber *)accuracy callback:(void (^)(id error))callback;

// Clears the overriden Geolocation Position and Error.
- (void)domain:(PDPageDomain *)domain clearGeolocationOverrideWithCallback:(void (^)(id error))callback;

// Checks if Geolocation can be overridden.
// Callback Param result: True if browser can ovrride Geolocation.
- (void)domain:(PDPageDomain *)domain canOverrideGeolocationWithCallback:(void (^)(NSNumber *result, id error))callback;

// Overrides the Device Orientation.
// Param alpha: Mock alpha
// Param beta: Mock beta
// Param gamma: Mock gamma
- (void)domain:(PDPageDomain *)domain setDeviceOrientationOverrideWithAlpha:(NSNumber *)alpha beta:(NSNumber *)beta gamma:(NSNumber *)gamma callback:(void (^)(id error))callback;

// Clears the overridden Device Orientation.
- (void)domain:(PDPageDomain *)domain clearDeviceOrientationOverrideWithCallback:(void (^)(id error))callback;

// Check the backend if Web Inspector can override the device orientation.
// Callback Param result: If true, <code>setDeviceOrientationOverride</code> can safely be invoked on the agent.
- (void)domain:(PDPageDomain *)domain canOverrideDeviceOrientationWithCallback:(void (^)(NSNumber *result, id error))callback;

// Toggles mouse event-based touch event emulation.
// Param enabled: Whether the touch event emulation should be enabled.
- (void)domain:(PDPageDomain *)domain setTouchEmulationEnabledWithEnabled:(NSNumber *)enabled callback:(void (^)(id error))callback;

@end

@interface PDDebugger (PDPageDomain)

@property (nonatomic, readonly, strong) PDPageDomain *pageDomain;

@end

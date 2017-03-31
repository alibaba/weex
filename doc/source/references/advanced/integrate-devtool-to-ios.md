---
title: Integrate Devtool to iOS   
type: references
order: 11.6
version: 2.1
---

# Integrate Devtool to iOS

Weex devtools is a custom devtools for weex that implements Chrome Debugging Protocol inspired by Stetho, it is designed to help you quickly inspect your app and debug your JS bundle source in a Chrome web page. To make it work, at first you must integrate devtool to your App. This page will help you integrate devtool to your iOS App.

## Integrate to iOS 

### Installing Dependencies

There are two choices to install dependencies: 

#### No.1 From cocoapods

```
source https://github.com/CocoaPods/Specs.git，
pod  'WXDevtool',   '0.7.0', :configurations => ['Debug']，
```

I strongly recommend you use the latest version since both Weex SDK and devtools are developed iteratively and rapidly.

#### No.2 From source code

1. Get source code by [GitHub](https://github.com/weexteam/weex-devtool-iOS).

2. Copy source folder to your project.

  ![drag](//img.alicdn.com/tps/TB1MXjjNXXXXXXlXpXXXXXXXXXX-795-326.png)

3. Choose options as the picture shows.

  ![_](//img.alicdn.com/tps/TB1A518NXXXXXbZXFXXXXXXXXXX-642-154.png)

### Integrate

#### Step 1. Add header file in `AppDelegate.m`

  - From cocoapods:

    ```
    #import <TBWXDevtool/WXDevtool.h>
    ``
  
  - From source code

    ```
    #import "WXDevtool.h"
    ```

#### Step 2. Initialize inspector when the APP launched

You can see the WXDevtool header file as follows:
    
```object-c
#import <Foundation/Foundation.h>

@interface WXDevTool : NSObject
/**
*  set debug status
*  @param isDebug  : YES:open debug model and inspect model;
*                    default is NO,if isDebug is NO, open inspect only;
* */
+ (void)setDebug:(BOOL)isDebug;


/**
*  get debug status
* */  
+ (BOOL)isDebug;


/**
*  launch weex debug
*  @param url  : ws://ip:port/debugProxy/native, ip and port is your devtool server address
* eg:@"ws://30.30.29.242:8088/debugProxy/native"
* */
+ (void)launchDevToolDebugWithUrl:(NSString *)url;

@end
```

**Note: The inspector API must be called before weex is initialized**

- `setDebug`

  `setDebug` is used to control the state of debug mode, when its value is `YES`, open the debug mode, otherwise closed.

- `(void)launchDevToolDebugWithUrl:(NSString *)url;`

  wssip was the wss address showing in the chrome address bar.

open debug model and inspector model

eg：

```object-c 
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions { [WXDevTool setDebug:YES]; [WXDevTool launchDevToolDebugWithUrl:@"ws://wssip/debugProxy/native"]; }
```

open inspect model, remove the `@selector
(setDebug:)` or add `[WXDevTool setDebug:NO]`

eg：

```object-c 
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions { [WXDevTool launchDevToolDebugWithUrl:@"ws://wssip/debugProxy/native"]; }
```

#### Step 3. Auto refresh

Q: Why do we need auto refresh feature?

A: As shown in future, when you click the debugger button, Javascript runtime environment will change from the phone (JavaScriptCore) to PC (Chrome V8), then Weex need to re-initialize the Weex environment, re-render the page. Page rendering is required for the developer to add on its own page.

![_debug](//img.alicdn.com/tps/TB1xRHhNXXXXXakXpXXXXXXXXXX-1498-668.png)

Q: What kind of scene need to add refresh feature?

- Click debugger button
- Switch remoteDebug
- Refresh inspect page

Q: How to add auto refresh feature?

Register events when Weex initialization.

```object-c
[[NSNotificationCenter defaultCenter] addObserver:self selector:notificationRefreshInstance: name:@"RefreshInstance" object:nil];
```

**Notes: You must cancel this event in the `dealloc` method. For example:**

```
- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}
```

For example, First you can destroy the current instance, and then re-create instance:

    
```
- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}
```

页面刷新实现，先销毁当前 instance，然后重新创建 instance，举例如下:

```
  - (void)render
  {
    CGFloat width = self.view.frame.size.width;
    [_instance destroyInstance];
    _instance = [[WXSDKInstance alloc] init];
    _instance.viewController = self;
    _instance.frame = CGRectMake(self.view.frame.size.width-width, 0, width, _weexHeight);
    
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:weakSelf.weexView];
        UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification,  weakSelf.weexView);
    };
    _instance.onFailed = ^(NSError *error) {
        
    };
    
    _instance.renderFinish = ^(UIView *view) {
        [weakSelf updateInstanceState:WeexInstanceAppear];
    };
    
    _instance.updateFinish = ^(UIView *view) {
    };
    if (!self.url) {
        return;
    }
    NSURL *URL = [self testURL: [self.url absoluteString]];
    NSString *randomURL = [NSString stringWithFormat:@"%@?random=%d",URL.absoluteString,arc4random()];
    [_instance renderWithURL:[NSURL URLWithString:randomURL] options:@{@"bundleUrl":URL.absoluteString} data:nil];
}
```

You can see the details in this case [WXDemoViewController.m](https://github.com/weexteam/weex-devtool-iOS/blob/master/Devtools/playground/WeexDemo/WXDemoViewController.m)

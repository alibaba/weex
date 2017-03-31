---
title: 集成 Devtools 到 iOS
type: references
order: 11.7
version: 2.1
---

# 集成 Devtools 到 iOS

Weex Devtools 能够方便调试 Weex 页面，但此功能离不开 Native 的支持。如何让你的 App 也集成 Devtools，在本章将会详细说明 iOS 端如何接入 Weex Devtools。

## iOS 应用接入

### 添加依赖

#### 方法一：cocoapods 依赖

在工程目录的 podfile 添加如下代码
 
```
source https://github.com/CocoaPods/Specs.git，
pod  'WXDevtool',   '0.7.0', :configurations => ['Debug']，
```

目前有如下几个版本：

0.7.0, 0.6.1, 0.1.1, 0.1.0 [master repo]

---

可以通过更新本地 podspec repo，pod search 来查询最新版本，在 podfile 文件添加依赖。


*** 推荐在DEBUG模式下依赖。 ***

#### 方法二：github 源码依赖


1. [拉取](https://github.com/weexteam/weex-devtool-iOS)最新的WXDevtool代码。
  
2. 按照如下图示：直接拖动source目录源文件到目标工程中

  ![drag](//img.alicdn.com/tps/TB1MXjjNXXXXXXlXpXXXXXXXXXX-795-326.png)

3. 按照红框中配置勾选

  ![_](//img.alicdn.com/tps/TB1A518NXXXXXbZXFXXXXXXXXXX-642-154.png)


  在相对较大的互联网 App 研发中, framework 静态库被广泛应用，所以推荐使用方法一接入。

### 集成功能

如果按照方法一接入：podfile 的方式，添加头文件包含：

``` 
#import <TBWXDevtool/WXDevtool.h>
```

如果按照方法二接入：源码依赖的方式，添加头文件包含：

```
#import "WXDevtool.h"
```     

查看 WXDevtool 头文件如下：
     
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

`setDebug`：参数为 `YES` 时，直接开启 debug 模式，反之关闭，使用场景如下所述

在你自己的程序中添加如下代码：

```object-c    
[WXDevTool launchDevToolDebugWithUrl:@"ws://30.30.31.7:8088/debugProxy/native"];
```

其中的 ws 地址正是 Weex debug 控制台中出现的地址，直接 copy 到 `launchDevToolDebugWithUrl` 接口中。

如果程序一启动就开启 Weex 调试，**需要在 WeexSDK 引擎初始化之前**添加代码：

```object-c  
[WXDevTool setDebug:YES];
[WXDevTool launchDevToolDebugWithUrl:@"ws://30.30.31.7:8088/debugProxy/native"];
```
    
#### 附加页面刷新功能  

- 为什么需要页面刷新功能？

  如下图所示，当点击 debugger 按钮时，js 的运行环境会从手机端（JavaScriptCore）切换到 Chrome（V8），这时需要重新初始化 Weex 环境，重新渲染页面。页面渲染是需要接入方在自己的页面添加。
         
  ![_debug](//img.alicdn.com/tps/TB1xRHhNXXXXXakXpXXXXXXXXXX-1498-668.png)

- 什么场景下需要添加页面刷新功能? 

  - 点击 debugger 按钮调试
  - 切换 RemoteDebug 开关
  - 刷新 Chrome 页面（command+R）
       
- 如何添加刷新  

  在 Weex 页面初始化或 `viewDidLoad` 方法时添加注册通知，举例如下：
    
  ```object-c
  [[NSNotificationCenter defaultCenter] addObserver:self selector:notificationRefreshInstance: name:@"RefreshInstance" object:nil];
  ```
    
  最后**千万记得**在 `dealloc` 方法中取消通知，如下所示
    
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

具体实现可参考 [playground](https://github.com/weexteam/weex-devtool-iOS/blob/master/Devtools/playground/WeexDemo/WXDemoViewController.m)  `WXDemoViewController.m` 文件

*说明：目前版本需要注册的通知名称为固定的 “RefreshInstance”，下个版本会添加用户自定义 name 。*

## 使用

如果未安装 Debugger Server，在命令行执行 `npm install -g weex-toolkit` 既可以安装调试服务器，运行命令 `weex debug` 就会启动 DebugServer 并打开一个调试页面（详情请查看 [《Get started》](../../guide/index.html)）。页面下方会展示一个二维码，这个二维码用于向 App 传递 Server 端的地址建立连接。


1. 日志级别控制

  ![_](//img.alicdn.com/tps/TB1F8WONXXXXXa_apXXXXXXXXXX-1706-674.png)
  日志级别可以控制native端关于weex的日志。

  日记级别描述如下：
    
  ```
  Off       = 0, 
  Error     = Error
  Warning   = Error | Warning,
  Info      = Warning | Info,
  Log       = Log | Info,
  Debug     = Log | Debug,    
  All       = NSUIntegerMax
  ```

  解释：off 关闭日志，Warning 包含 Error、Warning，Info 包含 Warning、Info，Log 包含 Info、Log，Debug 包含 Log、Debug，All 包含所有。

2. Vdom/Native tree选择

  ![](//img.alicdn.com/tps/TB19Yq5NXXXXXXVXVXXXXXXXXXX-343-344.png)

  *图一*

  ![图二](//img.alicdn.com/tps/TB1vomVNXXXXXcXaXXXXXXXXXXX-2072-1202.png)  

  *图二*
    
  点击图一所示native选项会打开图二，方便查看native tree以及view property

  ![vdom](//img.alicdn.com/tps/TB116y0NXXXXXXNaXXXXXXXXXXX-1448-668.png)
  
  *图三*

  ![vdom_tree](//img.alicdn.com/tps/TB16frmNXXXXXa7XXXXXXXXXXXX-2106-1254.png)  
  
  *图四*

  点击图三所示 vdom 选项会打开图四，方便查看 vdom tree 以及 component property。 

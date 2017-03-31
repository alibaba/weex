---
title: Devtools for iOS
type: tools
order: 2.2
version: 0.10
---

# Devtools for iOS

通过Chrome开发者工具远程调试你的原生iOS app
## 启动weex-devtool：
1. 安装和运行 weex-devtool
   
   ```
   $:npm install -g weex-devtool
   
   $:weex-devtool  
   ```
   
   它会启动chrome浏览器，展示wss ip 地址在chrome地址栏。
## playground 安装 WXDevtool
1. 安装依赖.
   
      $:pod install
### 使用
1. AppDelegate.m 头文件 
   
   ```
   #import "WXDevTool.h"
   ```
2. 在App启动的时候初始化 inspector
   
     **注意: The inspector API 必须在weex初始化之前调用**
   - (void)setDebug:(BOOL)isDebug;
     
     isDebug默认是NO，那么你打开的是inspect模式。假如设置isDebug为YES，那么打开debug模式和inspect模式。
     - (void)launchDevToolDebugWithUrl:(NSString *)url;
     
     wssip 是 展示在 chrome 地址栏的wss 地址.
   - 打开 debug 模式 和 inspector 模式
     
       eg：- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
         {
           [WXDevTool setDebug:YES];
           [WXDevTool launchDevToolDebugWithUrl:@"ws://wssip/debugProxy/native"];
         }
   - 打开 inspect 模式, 移除 @selector(setDebug:) 或者 增加 [WXDevTool setDebug:NO]
     
       eg：- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
         {
           [WXDevTool launchDevToolDebugWithUrl:@"ws://wssip/debugProxy/native"];
         }
3. 编译和运行APP，chrome会显示你的设备，选择inspector。
4. 支持不同级别的Log打印。
   
      eg: #import "WXDevTool.h"
          PDLogE()/PDLogW()
### WXDevtool依赖

你的app必须链接下面的frameworks/dylibs
- libicucore.dylib
- CFNetwork.framework
- CoreData.framework
- Security.framework
- Foundation.framework

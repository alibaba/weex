---
title: 集成到 iOS
type: advanced
order: 5
has_chapter_content: true
version: 0.10
---

# Weex SDK 集成到 iOS

### cocoaPods 引入 Weex iOS SDK到工程

可以通过源码编译出 Weex SDK，可以在新的 feature 或者 bugfix 分支，尝试最新的 feature
#### cocoaPods集成

  假设你已经完成了安装[iOS 开发环境](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html) 和 [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)

1. 从 github 上 clone 一份代码    
   
   ```
   git clone https://github.com/alibaba/weex.git
   ```

2. 把 WeexSDK 导入到你已有的项目，如果没有，可以[参考](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/Setup/Setup.html)新建项目  
   拷贝 `ios/sdk` 下面目录到你的项目目录，在添加依赖之前，确保项目目录有 `Podfile`，如果没有，创建一个，用文本编辑器打开，添加如下依赖

    如果使用正式版本如 0.6.1 的，就不需要做  拷贝 `ios/sdk` 这个操作，直接引用 cocoaPods 的 master repo 上就可以，这个需要在 Podfile 最前面添加

    ```
    source 'https://github.com/CocoaPods/Specs.git'
    ```

    ```object-c
    target 'YourTarget' do
        platform :ios, '7.0' 
        pod 'WeexSDK', :path=>'./sdk/'   # pod 'WeexSDK', '0.6.1'
    end
    ```

    在命令行（terminal）中，切换到当前目录，运行 `pod install`, 过一会，项目的 .workspace 结尾的文件就被创建出来，到这步，依赖已经添加完了

3. 初始化 Weex 环境  
   在 AppDelegate.m 文件中做初始化操作，一般会在 `didFinishLaunchingWithOptions` 方法中如下添加
   
   ```object-c
   //business configuration
   [WXAppConfiguration setAppGroup:@"AliApp"];
   [WXAppConfiguration setAppName:@"WeexDemo"];
   [WXAppConfiguration setAppVersion:@"1.0.0"];
   
   //init sdk enviroment   
   [WXSDKEngine initSDKEnviroment];
   
   //register custom module and component，optional
   [WXSDKEngine registerComponent:@"MyView" withClass:[MyViewComponent class]];
   [WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
   
   //register the implementation of protocol, optional
   [WXSDKEngine registerHandler:[WXNavigationDefaultImpl new] withProtocol:@protocol(WXNavigationProtocol)];
   
   //set the log level    
   [WXLog setLogLevel: WXLogLevelAll];
   ```

4. 渲染 weex Instance
   Weex 支持整体页面渲染和部分渲染两种模式，你需要做的事情是用指定的 URL 渲染 weex 的 view，然后添加到它的父容器上，父容器一般都是 viewController
   
   ```object-c
   #import <WeexSDK/WXSDKInstance.h>
   - (void)viewDidLoad 
   {
       [super viewDidLoad];
   
       _instance = [[WXSDKInstance alloc] init];
       _instance.viewController = self;
       _instance.frame = self.view.frame; 
   
       __weak typeof(self) weakSelf = self;
       _instance.onCreate = ^(UIView *view) {
           [weakSelf.weexView removeFromSuperview];
           [weakSelf.view addSubview:weakSelf.weexView];
       };
   
       _instance.onFailed = ^(NSError *error) {
           //process failure
       };
   
       _instance.renderFinish = ^ (UIView *view) {
           //process renderFinish
       };
       [_instance renderWithURL:self.url options:@{@"bundleUrl":[self.url absoluteString]} data:nil];
   }
   ```
   
   WXSDKInstance 是很重要的一个类，提供了基础的方法和一些回调，如`renderWithURL`,`onCreate`,`onFailed`等，可以参见 `WXSDKInstance.h`的  声明

5. 销毁 Weex Instance

   在 viewController 的 dealloc 阶段 销毁掉 weex instance， 释放内存，避免造成内存泄露
   
   ```object-c
   - (void)dealloc
   {
       [_instance destroyInstance];
   }
   ```
   
### 导入 Weex SDK framework到工程

  参考[此处](https://open.taobao.com/doc2/detail?spm=a219a.7629140.0.0.tFddsV&&docType=1&articleId=104829)直接导入weexSDK

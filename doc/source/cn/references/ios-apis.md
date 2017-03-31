---
title: iOS APIs
type: references
order: 1.1
version: 2.1
---

# iOS APIs

## Native 对外接口

 - 注册 SDK 默认的 Module、Handler 和 Component
 - 注册自定义 module、Handler 和 Component
 - 重置 JSFramework

## Handler (对应于 Android 的 Adapter) 介绍
  
- `WXImgLoaderDefaultImpl` 图片下载 handler。Weex 会把需要设置图片的 View 和 URL 透露出来，Native 端需要实现这个接口进行图片下载。WeexSDK kernel 本身没有提供图片下载的默认实现。

  接口定义如下：

  ```object-c
    @protocol WXImgLoaderProtocol <WXModuleProtocol>
  /**
    * @abstract Creates a image download handler with a given URL
    *
    * @param imageUrl The URL of the image to download
    *
    * @param imageFrame  The frame of the image you want to set
    *
    * @param options : The options to be used for this download
    *
    * @param completedBlock : A block called once the download is completed.
    *                 image : the image which has been download to local.
    *                 error : the error which has happened in download.
    *              finished : a Boolean value indicating whether download action has finished.
    */
  - (id<WXImageOperationProtocol>)downloadImageWithURL:(NSString *)url imageFrame:(CGRect)imageFrame userInfo:(NSDictionary *)options completed:(void(^)(UIImage *image,  NSError *error, BOOL finished))completedBlock;
  @end 
  ```

## Native 和 JS 通信

- 自定义通知事件

  用于 native 自定义部分和 js 进行实践通知，比如传递下拉事件到 js，这个是在 component 基类的方法，可以直接使用
  
  ```
  /**
    * @abstract Fire an event to the component and tell Javascript which value has been changed. 
    * @param eventName 事件名称，可以在weex文件某个标签组件监听，命名规范为 onXXX
    * @param params 数据
    * @param domChanges 发生改变的数据
    **/
  - (void)fireEvent:(NSString *)eventName params:(NSDictionary *)params domChanges:(NSDictionary *)domChanges
  ```

- 事件回调

  多用于 Module 回调结果给 js，回调类型分为下面两种：

  1. `WXModuleCallback` 为了性能考虑，该回调只能回调通知js一次，之后会被释放，多用于一次结果
  
  2. `WXModuleKeepAliveCallback` 该回调可以设置是否为多次回调类型，多次回调的场景如持续监听位置的变化，并返回给 js。
  
  ```
  @implementation WXEchoModule
  @synthesize weexInstance; // 让该module 获得当前instance
  WX_EXPORT_METHOD(@selector(echo:))
  - (void)echo:(NSString *)param callback:(WXModuleKeepAliveCallback)callback
  {
    callback(param,ture);// 此处设置true，该回调function 可以多次回调执行，可以写循环测试.
  }
  ```

## 动态适配容器

WeexSDK 在 `WXSDKInstance` 类中提供了方法 `setFrame(CGRect)` 来改变容器的大小。

如：在导航栏从有到无过程，需要 weexView 的变化， 可以在此时 native 调用该方法设置
 

## 降级使用

Weex 处于发展阶段会增加一些新的特性和功能，但是这些新的特性和功能都必须升级 SDK 才能实现，对于没有升级的应用应该怎么处理呢？可以使用降级功能。

所谓降级功能就是 Weex 无法运行的版本或者手机，可以用 Weex h5 来代替。

Native 端可以通过接口 WXSDKInstance 中的 onFailed 回调进行处理，如果是主动降级则返回的错误 domain 为 `TemplateErrorType`，Native 端可以跳转到对应的 H5 页面，或者用其他的方式提示用户当前环境不支持 Weex。

	  
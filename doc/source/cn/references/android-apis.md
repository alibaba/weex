---
title: Android APIs
type: references
order: 1.2
version: 2.1
---

# Android APIs

Weex 初步接入请参考：https://github.com/weexteam/article/issues/25

## WXSDKEngine 是 Weex 对外的总入口。
主要提供了一下功能：

1. 设置相关 Adapter 和获取 adapter。
2. 注册自定义 module 和 component
3. 重置 JSFramework

## Adapter 介绍
Weex 为了重用 Native 通用库提供了对应的接口进行设置。
1. IWXImgLoaderAdapter 图片适配器。

  Weex 会把需要设置图片的 View 和 URL 透露出来，Native 端需要实现这个接口进行图片下载。 Weex 没有提供图片默认实现。

  接口定义如下：

  ```java
  public interface IWXImgLoaderAdapter {
    void setImage(String url, ImageView view, WXImageQuality quality, WXImageStrategy strategy);
  }
  ```

  `WXImageQuality` 表示图片的质量，`WXImageQuality` 取如下值 `LOW`, `NORMAL`, `HIGH`, `ORIGINAL` 图片质量依次变高。默认为 `LOW`。`WXImageStrategy` 为扩展类，表示了图片是否可以裁剪 (isClipping) 锐化 (isSharpen) 占位符 (placeHolder) 等。

2. IWXHttpAdapter 网络下载适配器。

  Weex 自定义了 `WXRequest` 和 `OnHttpListener`，Native 重载接口后可以从 Request 中获取URL，Header 等参数，网络请求完成后可以通过 `OnHttpListener` 进行回调通知。Weex 提供了默认网络请求：`DefaultWXHttpAdapter`， 使用的是 `HttpURLConnection` 进行网络请求。

  接口定义如下：

  ```java
  public interface IWXHttpAdapter {
    void sendRequest(WXRequest request, OnHttpListener listener);
  }
  ```

  `WXRequest` 定义了网络请求相关的参数，请求方法，请求主体，超时时间。Weex默认超时时间是3000.

  `OnHttpListener` 定义了网络请求结束后对应方法。定义如下：

  ```java
  interface OnHttpListener {
    /**
    * start request
    */
    void onHttpStart();

    /**
    * headers received
    */
    void onHeadersReceived(int statusCode,Map<String,List<String>> headers);

    /**
    * post progress
    * @param uploadProgress
    */
    void onHttpUploadProgress(int uploadProgress);

    /**
    * response loaded length (bytes), full length should read from headers (content-length)
    * @param loadedLength
    */
    void onHttpResponseProgress(int loadedLength);

    /**
    * http response finish
    * @param response
    */
    void onHttpFinish(WXResponse response);
  }
  ```

3. IWXUserTrackAdapter Weex 相关性能数据 (首屏加载时间、JS-Native 通信时间、dom 更新时间等) 和其他通用信息 (JSLib 文件大小, Weex SDK 版本号等)。

  接口定义：

  ```java
  public interface IWXUserTrackAdapter {
    void commit(Context context, String eventId, String type, WXPerformance perf, Map<String, Serializable> params);
  }
  ```
  Native 实现接口后可以通过 `WXPerformance` 和 `params` 获取对应的信息。
  WXPerformane 对应字段表示含义请参考文档：https://github.com/weexteam/article/issues/124

  后续随着开发 Weex 还会定义更多的 Adapter，此文档也会定时更新。

## Native 和 JS 通信

1. 自定义事件通知

  多用于某个自定义控件进行事件通知，例如自定义点击事件，响应下拉事件等。

  WXSDKInstance.java 

  ```java
    public void fireEvent(String elementRef,final String type, final Map<String, Object> data,final Map<String, Object> domChanges){  }

    public void fireEvent(String elementRef,final String type, final Map<String, Object> data){
      fireEvent(elementRef,type,data,null);
    }

    public void fireEvent(String elementRef, String type){
      fireEvent(ref,type,new HashMap<String, Object>());
    }
  ```

  `elementRef`：事件发生的控件 ID。

  `type`: 自定义事件，Weex 默认以 onXxxxx 开头为自定义事件。onPullDown (下拉事件)。

  `data`: 需要透出的参数，例如当前控件的大小，坐标等其他信息。

  `domChanges`：更新 ref 对应控件的 Attribute 和 Style。

2. 事件回调 

  多用于 Module 回调，例如定位 Module 完成后需要通知 JS。使用方法如下：

  ```java
  public class WXLocation extends WXModule {

    @JSMethod
    public void getLocation(JSCallback callback){
      //获取定位代码.....
      Map<String,String> data=new HashMap<>();
      data.put("x","x");
      data.put("y","y");
      //通知一次
      callback.invoke(data);
      //持续通知
      callback.invokeAndKeepAlive(data);
      
      //invoke方法和invokeAndKeepAlive两个方法二选一
    }
  }
  ```

## 注册滑动事件

Weex 获取滑动事件可以通过 `WXSDKInstance` 注册 `registerOnWXScrollListener` 监听

接口定义如下：

```java
public interface OnWXScrollListener {

  /**
   * The  view is not currently scrolling.
   */
  int IDLE = RecyclerView.SCROLL_STATE_IDLE;
  /**
   * The view is currently being dragged by outside input such as user touch input.
   */
  int DRAGGING = RecyclerView.SCROLL_STATE_DRAGGING;
  /**
   * The view is currently animating to a final position while not under
   * outside control.
   */
  int SETTLING = RecyclerView.SCROLL_STATE_SETTLING;

  /**
   * Callback method to be invoked when the view has been scrolled. This will be
   * called after the scroll has completed.
   * <p>
   * This callback will also be called if visible item range changes after a layout
   * calculation. In that case, dx and dy will be 0.
   *
   */
  void onScrolled(View view, int x, int y);

  /**
   * Callback method to be invoked when view's scroll state changes.
   *
   */
  void onScrollStateChanged(View view, int x, int y, int newState);
}
```

## 自定义NavBar

Weex 提供了 `WXNavigatorModule` 进行导航控制，对应的方法可以通过设置 `IActivityNavBarSetter` 接口进行定制。

使用方法:

```java
WXSDKEngine.setActivityNavBarSetter(new IActivityNavBarSetter(){
});
```

## 其他介绍
### 动态适配容器

因为 Android 手机的碎片化导致屏幕适配很困难。Weex 对外提供的接口 render 需要动态传入容器的宽高，但是传入的宽高有时会发生变化，例如 ActionBar 隐藏等，这是传入的 Weex 容器也要进行对应的变化。
为了适应这种变化，Weex 提供了接口 `WXSDKInstance.setSize(int width, int height)` 来改变容器的大小。

```java
/**
   * 
   * @param width 容器宽度
   * @param height 容器高度
   */
  public void setSize(int width, int height){};
```

### 降级使用

Weex 处于发展阶段会增加一些新的特性和功能，但是这些新的特性和功能都必须升级 SDK 才能实现，对于没有升级的应用应该怎么处理呢？可以使用降级功能。

所谓降级功能就是 Weex 无法运行的版本或者手机，可以用 Weex h5 来代替。

Native 端可以通过接口 `IWXRenderListener` 中的 `onException` 方法进行处理，如果是主动降级 errCode 是以“|”分割的字符。“|"前面的字符为1表示主动降级，Native 端可以跳转到对应的 H5 页面。或者用其他的方式提示用户当前环境不支持 Weex。

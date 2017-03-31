---
title: Android APIs   
type: references
order: 1.2
version: 2.1
---

# Android APIs

## WXSDKEngine

1. Set up various adapters

```java
WXSDKEngine.initialize(this, new InitConfig.Builder().setImgAdapter(new ImageAdapter()).setDebugAdapter(new PlayDebugAdapter()).build());
```

2. Register the module and component

```java
WXSDKEngine.registerComponent("richtext", RichText.class);
WXSDKEngine.registerModule("event", WXEventModule.class);
```
3. Overloading framework

```java
WXSDKEngine.reload(this,framework,false);
```

## Adapter

1. IWXImgLoaderAdapter

  Weex need to implement this interface to download the picture
  The interface is defined as follows:

  ```java
  public interface IWXImgLoaderAdapter {

    void setImage(String url, ImageView view, WXImageQuality quality, WXImageStrategy strategy);
  }
  ```

  `WXImageQuality` that the quality of the picture variables, take the following values `LOW`, `NORMAL`, `HIGH`, `ORIGINAL` picture quality in turn higher. The default is `LOW`.

  `WXImageStrategy` is an extension class that indicates whether the image can be cut (isClipping) sharpening (isSharpen) placeholder (placeHolder) and so on.

2. IWXHttpAdapter

  Weex custom `WXRequest` and `OnHttpListener`, Native reload interface can be obtained from the Request URL, Header and other parameters, the network request can be completed through `OnHttpListener` callback notification. Weex provides the default network request: `DefaultWXHttpAdapter`, using `HttpURLConnection` for network requests.

  The interface is defined as follows:

  ```java
  public interface IWXHttpAdapter {
    void sendRequest(WXRequest request, OnHttpListener listener);
  }
  ```

  `WXRequest` defines the parameters related to the network request, the request method, the request body, and the timeout time. Weex default timeout is 3000.

  `OnHttpListener` defines the corresponding method after the network request ends. Defined as follows:

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
3. IWXUserTrackAdapter

  Weex related performance data (first screen loading time, JS-Native communication time, dom update time, etc.) and other general information (JSLib file size, Weex SDK version number, etc.).
  Interface definition:


  ```java
  public interface IWXUserTrackAdapter {
    void commit(Context context, String eventId, String type, WXPerformance perf, Map<String, Serializable> params);
  }
  ```

  Native implementation interface can be obtained through `WXPerformance` and `params` corresponding information.

## Native interacts with JavaScript

### Custom events

Used for a custom control for event notifications, such as custom click events, response drop events, and so on.

`WXSDKInstance.java `

```java
  public void fireEvent(String elementRef,final String type, final Map<String, Object> data,final Map<String, Object> domChanges){  }

  public void fireEvent(String elementRef,final String type, final Map<String, Object> data){
    fireEvent(elementRef,type,data,null);
  }

  public void fireEvent(String elementRef, String type){
    fireEvent(ref,type,new HashMap<String, Object>());
  }
```

`elementRef`：The event occurred for the control ID。

`type`: Custom events, Weex defaults to a custom event starting with onXxxxx. OnPullDown (drop-down event)

`data`: Need to reveal the parameters, such as the current control of the size, coordinates and other information。

`domChanges`：Update ref for the control's Attribute and Style

## Event callback
Used for Module callback, for example, after the completion of positioning Module need to notify JS. Use as follows:

```java
public class WXLocation extends WXModule {

  @JSMethod
  public void getLocation(JSCallback callback){
    //Get the code for the location information .....
    Map<String,String> data=new HashMap<>();
    data.put("x","x");
    data.put("y","y");
    //notify once
    callback.invoke(data);
    //Continuous connection
    callback.invokeAndKeepAlive(data);
    
    //Invoke method and invokeAndKeepAlive two methods of choice  }
}
```

# OnWXScrollListener

Weex gets the scroll event You can register `registerOnWXScrollListener` via `WXSDKInstance`
The interface is defined as follows:

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

## IActivityNavBarSetter

Weex provides `WXNavigatorModule` for navigation control, and the corresponding method can be customized by setting the `IActivityNavBarSetter` interface.

Instructions:

```java
 WXSDKEngine.setActivityNavBarSetter(new IActivityNavBarSetter(){
});
```

## Other Introduction
### setSize

You can use the `mWXSDKInstance.setSize()` method to change the size of the Weex container.

### Downgrade

Weex in the development stage will add some new features and new methods, but these new features and functions must be upgraded to achieve the SDK, for the application should not be upgraded how to deal with it? You can use the downgrade feature.

Native can be handled by the `onException` method in interface `IWXRenderListener`, and if it is an active demoulding errCode is a character that is divided by "|". "|" The preceding character is 1 for active demotion, and the Native side can jump to the corresponding H5 page. Or otherwise prompted the user's current environment does not support Weex.
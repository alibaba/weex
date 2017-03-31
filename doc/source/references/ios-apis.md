---
title: iOS APIs  
type: references
order: 1.1
version: 2.1
---

# iOS APIs

## Handler(like Android Adapter)

- `WXImgLoaderDefaultImpl` Image load handler. Weex need to implement this interface to download the picture. The interface is defined as follows:

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

## Native interacts with JavaScript

- Custom events

  Used for a custom control for event notifications, such as custom click events, response drop events, and so on. This is a method in the component base class that can be used directly.

  ```object-c
  /**
    * @abstract Fire an event to the component and tell Javascript which value has been changed. 
    * @param eventName
    * @param params
    * @param domChanges
    **/
  - (void)fireEvent:(NSString *)eventName params:(NSDictionary *)params domChanges:(NSDictionary *)domChanges
  ```

- Event callback

  Used for Module callback. There are two types of callback:

  - `WXModuleCallback`: For performance reasons, the callback can only callback js once, and then will be released.

  - `WXModuleKeepAliveCallback`: This callback can be set to multiple callbacks, multiple callbacks of the scene such as continually listen scrolls event and return to js.

  ```object-c
  @implementation WXEchoModule
  @synthesize weexInstance;
  WX_EXPORT_METHOD(@selector(echo:))
  - (void)echo:(NSString *)param callback:(WXModuleKeepAliveCallback)callback
  {
    callback(param,ture);
  }
  ```

## Set size of the Weex container

You can use the `setFrame(CGRect)` method to change the size of the Weex container.

## Downgrade

Weex in the development stage will add some new features and new methods, but these new features and functions must be upgraded to achieve the SDK, for the application should not be upgraded how to deal with it? You can use the downgrade feature.

Native can be handled by the `onFailed` method in interface `WXSDKInstance`, and if it is an active demoulding error domain is `TemplateErrorType`, and the Native side can jump to the corresponding H5 page. Or otherwise prompted the user’s current environment does not support Weex.
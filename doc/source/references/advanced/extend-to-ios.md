---
title: Extend to iOS
type: references
order: 11.1
version: 2.1
---

# Extend to iOS

### Module extend

Weex SDK provides only rendering capabilities, rather than have other capabilities, such as network, picture, and URL redirection. If you want these features, you need to implement it.

For example: If you want to implement an address jumping function, you can achieve a Module following the steps below.

#### Step to customize a module

1. Module
    customized must implement WXModuleProtocol
2. A macro named `WX_EXPORT_METHOD` must be added, as it is the only way to export methods to JavaScript.
3. The weexInstance should be synthesized. Each module object is bind to a specific instance.
4. Module methods will be invoked in UI thread, so do not put time consuming operation there. If you want to  execute the whole module methods in other     thread, please implement the method `- (NSThread *)targetExecuteThread` in protocol. In the way, tasks distributed to this module will be executed in targetExecuteThread.
5. Weex params can be String or Map.
6. Module supports to return results to Javascript in callback. This callback is type of `WXModuleCallback`, the params of which can be String or Map.

```objective-c
@implementation WXEventModule
@synthesize weexInstance;
    WX_EXPORT_METHOD(@selector(openURL:callback))

- (void)openURL:(NSString *)url callback:(WXModuleCallback)callback
{
    NSString *newURL = url;
    if ([url hasPrefix:@"//"]) {
        newURL = [NSString stringWithFormat:@"http:%@", url];
    } else if (![url hasPrefix:@"http"]) {
        newURL = [NSURL URLWithString:url relativeToURL:weexInstance.scriptURL].absoluteString;
    }

    UIViewController *controller = [[WXDemoViewController alloc] init];
    ((WXDemoViewController *)controller).url = [NSURL URLWithString:newURL];

    [[weexInstance.viewController navigationController] pushViewController:controller animated:YES];
    callback(@{@"result":@"success"});
}

@end
```

In addition, `0.10.0` begins to support synchronous module API call, you can use macro `WX_EXPORT_METHOD_SYNC` to export module methods which could make JavaScript receive return values from native,  it **can only be called on JS thread**.

#### Register the module

You can register the customized module by calling the method `registerModule:withClass` in WXSDKEngine.

```objective-c
WXSDKEngine.h
/**
*  @abstract Registers a module for a given name
*  @param name The module name to register
*  @param clazz  The module class to register
**/
+ (void)registerModule:(NSString *)name withClass:(Class)clazz;

[WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
```

### Handler extend

Weex SDK doesn't have capabilitis, such as image download 、navigator operation，please implement these protocols by yourself.

#### WXImgLoaderProtocol
<font color="gray">
Weex SDK has no image download capability, you need to implement `WXImgLoaderProtocol`. Refer to the following examples.

```objective-c
WXImageLoaderProtocol.h
@protocol WXImgLoaderProtocol <WXModuleProtocol>

/**
    * @abstract Creates a image download handler with a given URL
    * @param imageUrl The URL of the image to download
    * @param imageFrame  The frame of the image you want to set
    * @param options : The options to be used for this download
    * @param completedBlock : A block called once the download is completed.
    image : the image which has been download to local.
    error : the error which has happened in download.
    finished : a Boolean value indicating whether download action has finished.
    */
    -(id<WXImageOperationProtocol>)downloadImageWithURL:(NSString *)url imageFrame:(CGRect)imageFrame userInfo:(NSDictionary *)options completed:(void(^)(UIImage *image,  NSError *error, BOOL finished))completedBlock;
    @end
```

Implement above protocol as follows.


```objective-c
@implementation WXImgLoaderDefaultImpl
#pragma mark -
#pragma mark WXImgLoaderProtocol

- (id<WXImageOperationProtocol>)downloadImageWithURL:(NSString *)url imageFrame:(CGRect)imageFrame userInfo:(NSDictionary *)userInfo completed:(void(^)(UIImage *image,  NSError *error, BOOL finished))completedBlock
{
    if ([url hasPrefix:@"//"]) {
        url = [@"http:" stringByAppendingString:url];
    }
    return (id<WXImageOperationProtocol>)[[SDWebImageManager sharedManager] downloadImageWithURL:[NSURL URLWithString:url] options:0 progress:^(NSInteger receivedSize, NSInteger expectedSize) {
    } completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, BOOL finished, NSURL *imageURL) {
    if (completedBlock) {
        completedBlock(image, error, finished);
    }
    }];
}
@end
```

#### Register the handler

You can register the handler which implements the protocol by calling  `registerHandler:withProtocol` in WXSDKEngine.

```objective-c
WXSDKEngine.h
/**
* @abstract Registers a handler for a given handler instance and specific protocol
* @param handler The handler instance to register
* @param protocol The protocol to confirm
*/
+ (void)registerHandler:(id)handler withProtocol:(Protocol *)protocol;

[WXSDKEngine registerHandler:[WXImgLoaderDefaultImpl new] withProtocol:@protocol(WXImgLoaderProtocol)];
```

## Custom Native Components for iOS

### Component extend

There are a lot of native components ready to be used in the Weex SDK,  but users always have their own use cases. You might have written an awesome native UI widget in your previous work and just want to wrap up it and export to Weex. So we provide a way to enable developers to create their own custom fully-native components.

This guide will use the implementation of existing component `image` to show you how to build a native component. It will also assume that you are familiar with iOS programming.

#### Registration

Defining a custom native component is simple. Just call `[WXSDKEngine registerComponent:withClass:]` with the component's tag name as first argument.

```objective-c
[WXSDKEngine registerComponent:@"image" withClass:[WXImageComponent class]];
```

Then you can create a `WXImageComponent` class to represent the implementation of image component.

Now you can use `<image>` wherever you want in the template.

```html
<image></image>
```

#### Adding Properties

The next thing we can do is to extend some native properties to make the component more powerful. As an image, let's say we should have a `src` attribute as image's remote source and a `resize` attribute as image's resize mode(contain/cover/stretch).

```objective-c
@interface WXImageComponent ()

@property (nonatomic, strong) NSString *imageSrc;
@property (nonatomic, assign) UIViewContentMode resizeMode;

@end
```

All of the styles, attributes and events will be passed to the component's initialization method, so here you can store the properties which you are interested in.

```objective-c
@implementation WXImageComponent

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
        _imageSrc = [WXConvert NSString:attributes[@"src"]];
        _resizeMode = [WXConvert UIViewContentMode:attributes[@"resize"]];
    }

    return self;
}

@end
```

The properties getted in the attributes are of `id` type, so we have to convert them to the type we want using a conversion function.  Basic conversion functions can be found in the `WXConvert` file,  or you can just add your own conversion function.


#### Hooking Render Life Cycle

A Native Component has a life cycle managed by Weex. Weex creates it, layout it, renders it and destroys it.

Weex offers component life cycle hooks that give you visibility into these key moments and the ability to act when they occur.

method| description
:----:|------
initWithRef:type:...| Initializes a new component using the specified  properties.
layoutDidFinish | Called when the component has just laid out.
loadView   | Creates the view that the component manages.
viewWillLoad | Called before the load of component's view .
viewDidLoad | Called after the component's view is loaded and set.
viewWillUnload | Called just before releasing the component's view.
viewDidUnload | Called when the component's view is released.
updateStyles:| Called when component's style are updated.
updateAttributes:| Called when component's attributes are updated.
addEvent:| Called when adding an event to the component.
removeEvent:| Called when removing an event frome the component.


As in the image component example, if we need to use our own image view, we can override the `loadView` method.


```objective-c
- (UIView *)loadView
{
    return [[WXImageView alloc] init];
}
```

Now Weex will use `WXImageView` to render the `image` component.

As an image component, we will need to fetch the remote image and set it to the image view.  This can be done in `viewDidLoad` method when the view is created and loaded. `viewDidLoad` is also the best time to perform additional initialization for your view， such as content mode changing.


```objective-c
- (void)viewDidLoad
{
    UIImageView *imageView = (UIImageView *)self.view;
    imageView.contentMode = _resizeMode;
    imageView.userInteractionEnabled = YES;
    imageView.clipsToBounds = YES;
    imageView.exclusiveTouch = YES;

    // Do your image fetching and updating logic
}
```

If image's remote source can be changed, you can also hook the `updateAttributes:` method to perform your attributes changing logic. Component's view always has been loaded while `updateAttributes:` or `updateStyles:` is called.


```objective-c
- (void)updateAttributes:(NSDictionary *)attributes
{
    if (attributes[@"src"]) {
        _imageSrc = [WXConvert NSString:attributes[@"src"]];
        // Do your image updating logic
    }

    if (attributes[@"resize"]) {
        _resizeMode = [WXConvert UIViewContentMode:attributes[@"resize"]];
        self.view.contentMode = _resizeMode;
    }
}
```

Maybe there is even more life cycle hooks you might need to consider, such as `layoutDidFinish` while layout computing is finished.  If you want to go deeper, check out the `WXComponent.h` file in the source code.

Now you can use `<image>` and its attributes wherever you want in the template.

```html
<image style="your-custom-style" src="image-remote-source" resize="contain/cover/stretch"></image>
```

#### Component Method
from WeexSDK `0.9.5`, you can define your component method by macro `WX_EXPORT_METHOD`
for example:

```
@implementation WXMyComponent
 +WX_EXPORT_METHOD(@selector(focus))
 +- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
 {
     if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
         // handle your attributes
         // handle your styles
     }
     
     return self;
 }

 
 - (void)focus
   {
   		NSLog(@"you got it");
   }
@end
```
   
after your registration for your own custom component, now you can call it in your js file.
 
```html
<template>
  <mycomponent id='mycomponent'></mycomponent>
</template>
<script>
  module.exports = {
    created: function() {
      this.$el('mycomponent').focus();
    }
  }
</script>
``` 
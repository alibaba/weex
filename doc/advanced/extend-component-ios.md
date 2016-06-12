## Custom Native Components for iOS

### Introduction 

There are a lot of native components ready to be used in the Weex SDK,  but users always have their own use cases. You might have written an awesome native UI widget in your previous work and just want to wrap up it and export to Weex. So we provide a way to enable developers to create their own custom fully-native components.

This guide will use the implementation of existing component `image` to show you how to build a native component. It will also assume that you are familiar with iOS programming.

### Registration

Defining a custom native component is simple. Just call `[WXSDKEngine registerComponent:withClass:]` with the component's tag name as first argument.

```
[WXSDKEngine registerComponent:@"image" withClass:[WXImageComponent class]];
```

Then you can create a `WXImageComponent` class to represent the implementation of image component.

Now you can use `<image>` wherever you want in the template.

```
<image></image>
```

### Adding Properties

The next thing we can do is to extend some native properties to make the component more powerful. As an image, let's say we should have a `src` attribute as image's remote source and a `resize` attribute as image's resize mode(contain/cover/stretch).

```
@interface WXImageComponent ()

@property (nonatomic, strong) NSString *imageSrc;
@property (nonatomic, assign) UIViewContentMode resizeMode;

@end
```

All of the styles, attributes and events will be passed to the component's initialization method, so here you can store the properties which you are interested in.

```
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


### Hooking Render Life Cycle

A Native Component has a life cycle managed by Weex. Weex creates it, layout it, renders it and destroys it.

Weex offers component life cycle hooks that give you visibility into these key moments and the ability to act when they occur.

method| description 
:----:|------
initWithRef:type:...| Initializes a new component using the specified  properties. 
layoutDidFinish | Called when the component has just laid out.
loadView   | Creates the view that the component manages.  
viewWillLoad | Called before the load of component's view .  
viewDidLoad | Called after the component's view is loaded and set.
viewWillUnload | Called just before releasing the component's view.
viewDidUnload | Called when the component's view is released.
updateStyles:| Called when component's style are updated.
updateAttributes:| Called when component's attributes are updated.
addEvent:| Called when adding an event to the component.
removeEvent:| Called when removing an event frome the component.


As in the image component example, if we need to use our own image view, we can override the `loadView` method.


```
- (UIView *)loadView
{
    return [[WXImageView alloc] init];
}
```

Now Weex will use `WXImageView` to render the `image` component.

As an image component, we will need to fetch the remote image and set it to the image view.  This can be done in `viewDidLoad` method when the view is created and loaded. `viewDidLoad` is also the best time to perform additional initialization for your view， such as content mode changing.


```
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


```
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

```
<image style="your-custom-style" src="image-remote-source" resize="contain/cover/stretch"></image>
```










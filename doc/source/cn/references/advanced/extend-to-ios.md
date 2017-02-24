---
title: iOS 扩展
type: references
order: 11.1
version: 2.1
---

## Module 扩展

[swift](https://github.com/weexteam/article/issues/55) 扩展 module 

Weex SDK 只提供渲染，而不是其他的能力，如果你需要 像网络，图片，URL跳转这些特性，需要自己动手实现他们
例如，如果你想实现一个url地址跳转函数，你可以按照如下步骤实现一个 Module
1. **自定义module的步骤**
   1. 自定义的module类 必须实现 `WXModuleProtocol`
   2. 必须添加宏`WX_EXPORT_METHOD`, 它可以被weex识别，它的参数是 JavaScript调用 module指定方法的参数
   3. 添加`@synthesized weexInstance`，每个moudle对象被绑定到一个指定的实例上
   4. Module 方法会在UI线程中被调用，所以不要做太多耗时的任务在这里，如果要在其他线程执行整个module 方法，需要实现`WXModuleProtocol`中`- (NSThread *)targetExecuteThread`的方法，这样，分发到这个module的任务会在指定的线程中运行
   5. Weex 的参数可以是 String 或者Map
   6. Module 支持返回值给 JavaScript中的回调，回调的类型是`WXModuleCallback`,回调的参数可以是String或者Map
      
      ```object-c
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
2. **Register the module**
   通过调用 WXSDKEngine 中的 `registerModule:withClass`方法来注册自己的module
   
   ```object-c
   WXSDKEngine.h
   /**
   *  @abstract Registers a module for a given name
   *  @param name The module name to register
   *  @param clazz  The module class to register
   **/
   + (void)registerModule:(NSString *)name withClass:(Class)clazz;
   [WXSDKEngine registerModule:@"event" withClass:[WXEventModule class]];
   ```
3. **使用自己的module**
    这里的  require 里面的event 就是在 上一步调用`registerModule:` 注册module 时候的name
   
   ```javascript
    var eventModule = weex.requireModule('event'); 
    eventModule.openURL('url',function(ret) {   
        nativeLog(ret);
    });
   ```
   
   Weex SDK没有 图片下载，navigation 操作的能力，请大家自己实现这些 protocol

4. **WXImgLoaderProtocol**  

   weexSDK 没有图片下载的能力，需要实现 WXImgLoaderProtocol,参考下面的例子
   
   ```object-c
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
   
   实现上述协议  
   
   ```object-c
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

5. **handler注册** 
 
   你可以通过WXSDKEngine 中的 `registerHandler:withProtocol`注册handler
   
   ```object-c
   WXSDKEngine.h
   /**
   * @abstract Registers a handler for a given handler instance and specific protocol
   * @param handler The handler instance to register
   * @param protocol The protocol to confirm
   */
   + (void)registerHandler:(id)handler withProtocol:(Protocol *)protocol;
   
   [WXSDKEngine registerHandler:[WXImgLoaderDefaultImpl new] withProtocol:@protocol(WXImgLoaderProtocol)]
   ```

## Components 扩展

虽然 WeexSDK 中有很多的 native 的 Component，但这有可能并不能满足你的需求。在之前你可能已经写了一些很酷炫 native 的组件，想包装一下，导入到 Weex 中，因此我们提供了让开发者实现自己的 native Component。下面将以 WeexSDK 中已经存在的 Component：`image` 为例子，介绍一下如何构建一个 native Component。假设你已经了解 iOS 开发

### 注册 Component

注册一个 component 比较简单，调用 `WXSDKEngine` 中的 `registerComponent:withClass:` 方法，传入组件的标签名称，还有对应的 class  然后你可以创建一个 `WXImageComponent` 表示 `image` 组件的实现。在 `.we` 文件中，只需要写 `<image></image>`

### 添加属性 

现在我们要做一些让 image component 更加强大的事情。既然作为一个图片的 component，那它应该要有源，给他加上一个  `src` 的属性，同时给它加上一个 `resize` 的属性（可以配置的有 `contain/cover/stretch`）

```object-c
@interface WXImageComponent ()

@property (nonatomic, strong) NSString *imageSrc;
@property (nonatomic, assign) UIViewContentMode resizeMode;

@end
```

component 中所有的 style，attribute，events 都会被传递到 Component 的初始化方法中，所以，你可以在初始化方法中存储你感兴趣的一些属性值

```object-c
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

attribute 中拿到的值的类型都是 `id`，我们可以用转换方法把它转换到任何值。Weex SDK 提供了一些基础的转换方法，可以参考 `WXConvert` 类，或者你可以添加自己的转换函数。

### Hooking 渲染生命周期

native 的 component 是由 Weex 管理的，Weex 创建，布局，渲染，销毁。Weex 的 component 生命周期都是可以 hook 的，你可以在这些生命周期中去做自己的事情。

| 方法 | 描述 |
| :-: | --- |
| initWithRef:type:... | 用给定的属性初始化一个component. |
| layoutDidFinish | 在component完成布局时候会调用. |
| loadView | 创建component管理的view. |
| viewWillLoad | 在component的view加载之前会调用. |
| viewDidLoad | 在component的view加载完之后调用. |
| viewWillUnload | 在component的view被释放之前调用. |
| viewDidUnload | 在component的view被释放之后调用. |
| updateStyles: | 在component的style更新时候调用. |
| updateAttributes: | 在component的attribute更新时候调用. |
| addEvent: | 给component添加event的时候调用. |
| removeEvent: | 在event移除的时候调用. |

在 image component 的例子里面，如果我们需要我们自己的 image view 的话，可以复写 `loadView`这个方法.

```object-c
- (UIView *)loadView
{
return [[WXImageView alloc] init];
}
```

现在我们使用 `WXImageView` 渲染 `image` component。  
作为一个 image component，我们需要拿到服务器图片，而且把它设置进 image view 里. 这个操作可以在 `viewDidLoad` 方法中做，这个方法是在 view 已经被创建而且加载了时候 Weex SDK 会调用到，而且 `viewDidLoad` 这个方法是你做额外初始化工作比如改变 content mode(也就是设置resize) 的最好时间.

```object-c
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

如果可以改变 image 的 src，也可以 hook `updateAttributes:`  方法来做属性更新操作，当 `updateAttributes:` 或者  `updateStyles:` 被调用的时候， component 的 view 已经加载完成

```object-c
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

或许你需要考虑更多的生命周期方法去 Hook，当布局完成时候，像 `layoutDidFinish`，如果你想了解更多，可以参考一下`WXComponent.h` 声明的方法。

现在你可以用在任何 `.we` 文件里面使用 `<image>`，而且可以加上 image 的属性。

```html
<image style="your-custom-style" src="image-remote-source" resize="contain/cover/stretch"></image>
```

##### component 方法

WeexSDK 0.9.5 之后支持了在 js 中直接调用 component 的方法，这里提供一个例子
  
- 自定义一个 WXMyCompoenent 的组件
  
  ```
  @implementation WXMyComponent
  WX_EXPORT_METHOD(@selector(focus)) // 暴露该方法给js
  - (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
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
	
- 注册组件 `[WXSDKEngine registerComponent:@"mycomponent" withClass:[WXMyComponent class]]`

- 在 weex 文件中调用

  ```html
  <template>
    <mycomponent id='mycomponent'></mycomponent>
  </template>
  <script>
    module.exports = {
      created:function() {
        this.$el('mycomponent').focus();
      }
    }
  </script>
  ``` 

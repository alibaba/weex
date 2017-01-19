---
title: 自定义 native 组件
type: advanced
order: 7
has_chapter_content: true
version: 0.10
---

# 如何自定义 native 组件？

Weex 已经包含了最关键的平台组件，例如 `ScrollView, ListView, Text, Imageview` 等等。当然，这些组件并不能完全满足你的需求。另外，那些在你的工程中常用的大量原生 UI 组件，可能需要被简单地集合到 Weex 中。幸运的是，通过任意已存在的组件来创建你的自定义组件是一件很方便的事。

## Android

### 步骤：

1.自定义组件必须继承自 `WXComponent` 或者 `WXContainer` ；
2.weex SDK 可以识别 @WXComponentProp (name = value(value 是 attr 或者 dsl style))；
3.方法必须是 `public` 的；
4.组件类不能是一个内部类；
5.自定义组件不能被 ProGuard 之类的工具混淆；
6.组件方法在 UI 线程被调用，因此不要在里面进行耗时的操作；
7.Weex 的参数类型可以是 int, double, float, String, Map, List 和实现了 WXObject 接口的自定义类；

### 参考以下例子：

``` java
 `package com.taobao.weex.ui.component;
// ……

public class  MyViewComponent extends WXComponent{

       public MyViewComponent(WXSDKInstance instance, WXDomObject node, 
                    WXVContainer parent,  String instanceId, boolean lazy) {                
           super(instance, node, parent, instanceId, lazy);
        }

       @Override
       protected void initView() {
          //TODO:your own code ……
       }

      @Override
      public WXFrameLayout getView() {
         //TODO:your own code ………        
      }
      @WXComponentProp(name=WXDomPropConstant.WX_ATTR_VALUE)
      public void setMyViewValue(String value) {
         ((TextView)mHost).setText(value);
      }

}
```

必须注册组件：

``` java
WXSDKEngine.registerComponent("MyView", MyViewComponent.class);
```

## iOS

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

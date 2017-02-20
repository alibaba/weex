---
title: 常见问题
type: faq
layout: post
---

# 常见问题解答

## 如何查阅旧文档？

你可以通过文档左侧目录最后一项 “旧文档” 进入对于的历史文档页面。也可以直接访问以下链接访问：

- [Guide](./v-0.10/guide/index.html)
- [手册](./v-0.10/references/index.html)
- [高阶知识](./v-0.10/advanced/index.html)
- [工具](./v-0.10/tools/index.html)

## Windows 指令错误

请先安装 [Git for Windows](https://git-scm.com/download/win)，在 [For Windows](https://github.com/alibaba/weex/tree/dev#for-windows) 中查看更多信息。


## Android Studio 中 Gradle 错误

下载 `license-gradle-plugin.jar` 可能引发一些错误，比如 `链接被重置（Connection reset）` 和 `证书无效（peer not authenticated）` 。这可能是由于网络问题导致的，请尝试使用代理或VPN。

## 使用本地图片

Weex 的原生运行机制支持从设备中加载图片，你只需要设置文件 url，例如 `file:///sdcard/image_new0.png` 这样的格式。但是 Weex 暂时还不支持加载你工程中的图片文件。

## Windows 错误 `The header content contains invalid characters ` （头中包含非法字符）

这是由于 weex-toolkit 的依赖 http-server 导致的，http-server 的老版本在中文 windows 中的支持不是很好。我们已经修复了这个问题，请在使用前升级 weex-toolkit 版本。

## Playground 应用在扫面后什么都没有显示（白屏）

最好的方法是查看 debug 日志来查找原因，你可以按照 [这篇文档](./guide/how-to/debug-with-devtools.html) 中的说明来查明导致这一问题的原因。

## 关于 ECMAScript 版本问题

Weex 在 iOS 中使用 JSCore ，在 Android 中使用 v8，因此他们都支持 ECMAScript 5。另外，我们还在原生环境中加了一些 polyfills：

-  `Promise` in iOS/Android
-  `Timer APIs` (setTimeout/clearTimeout/setInterval/clearInterval`) in iOS/Android
-  `console` in iOS/Android

在浏览器中我们暂时是包含了一个 `Promise` 的 polyfill。

在未来，开发者可以选择是否通过 configurations 来导入一个 polyfill。

你也可以通过带有 `webpack` 的 `babel` 来写 ES6，这个加载器能够自动将 ES6 转换为 ES5。

如果你还想要更多的 ES6 polyfills，你可以把他们引入到 JS Bundle 中。

## 前端依赖

在 Weex 中你有很多方法来 import/require 一个组件或者一个 JS 模块。以 ES5 为例：

-   `require('xxx.js')` : 依赖一个 JS 文件
-  `require('npm-module-name')` : 依赖一个 NPM 模块
-   `require('xxx.we')` : 包含一个 `.we` 文件来注册一个 Weex 自定义组件
-  `require('@weex-module/xxx')` : 依赖一个 Weex 原生模块。注意这只支持 `*.we` 文件而不支持 `*.js` 文件。如果你想要在一个 `*.js` 文件中使用 Weex 原生模块，暂时你可以这样写：

```js
// use this piece of code below to get Weex native module "modal"
var modal
__weex_define__('@weex-temp/x', function (__weex_require__) {
  modal = __weex_require__('@weex-module/modal')
})

// use APIs in "modal" module
modal.toast({message: 'hello'})
```

以后我们会给大家带来一个更好的设计。

## iOS 文本 `line-height` 样式不正常

`line-height`  样式在 `<text>` 组件中的表现与 H5 和 Android 不同，文本不会在行内居中，而是贴近行底部，因为这里使用的 iOS 原生 API。我们正在努力优化，与其他两端保持一致。

## Android 只支持 `overflow:hidden`

`overflow` 样式在 Android 默认为 `hidden` 并且无法修改，原因是 Android View framework 限制。这个问题只出现在 Android 端，iOS 端和 H5 正常。

## Android 不支持 emoji

由于 Android NDK 仅支持 Modified UTF-8，因此不支持 emoji。Android 6.0 以下使用 emoji 可能会导致崩溃，在 Android 6.0 以上则可能出现意外的行为。只能使用 Modified UTF-8，**不要使用 emoji**。

## 如何取消 750 像素自适应并以宽高比计算真实像素？

`this.$getConfig()` 方法会返回一个对象，这个对象的 `deviceHeight` 和 `deviceWidth` 属性即实际设备宽度/高度（以像素为单位），而不是以 750 适配的。

因此，您可以使用它们来计算实际像素的宽度/高度。

假设您需要显示固定为 88 px 的导航栏，该导航栏的高度将是：

``` javascript
var height = 88 * 750 / env.deviceWidth 
```

## 如何在 JavaScript 中检测是否支持某个原生的 module/component

### 检测原生 module

```javascript
var xxx = require('@weex-module/xxx')
if (xxx) {
  // todo: use this module
}
else {
  // todo: handle the exception
}
```

### 检测原生 component

```html
<template>
  <component is="{{type}}"></component>
</template>

<script>
  var type = 'xxx'
  var xxx = require('@weex-component/xxx')
  if (!xxx) {
    type = 'div' // downgrade to <div>
  }
  module.exports = {
    data: function () {
      return {
        type: type
      }
    }
  }
</script>
```

## 如何在 pages 之间传递数据

如果你有两个页面，A 页面和 B 页面

1. A -> B，使用 [getConfig api](/references/api.md#getconfig) or [storage module](/modules/storage.md) 传递数据；
2. B -> A，使用 [storage module](/modules/storage.md) 传递数据。


## 父子组件之间进行 repeat 操作

如果你有需求，在父子组件之间进行 repeat 操作，需要注意，必须严格按照官网文档的语法来书写代码。如果缺少子组件定义 data 数据，或者是没有指定需要向下传递的 props，都会导致页面不正常渲染。

错误示例：

```html
<element name="child">
  <template>
    <div>
      <text style="font-size:100">{{title}}</text>
    </div>
  </template>
</element>

<template>
  <div>
    <child repeat="item in lists"></child>
  </div>
</template>
<script>
  module.exports = {
    data: {
      lists: [
        { title: 'A' },
        { title: 'B' },
        { title: 'C' }
      ]
    },
    ready: function () {
      this.lists.splice(0, 1)
    }
  }
</script>
```

以上示例的理想执行情况，应该是页面上第一个元素 A 被删除，剩下 B、C 两个元素。
但是，由于错误的写法，导致列表执行 splice 操作之后，出现错误的更新情况：页面最后一个元素 C 被删除。

正确的写法如下：

```html
<element name="child">
  <template>
    <div>
      <text style="font-size:100">{{title}}</text>
    </div>
  </template>
  
  <script>
    module.exports = {
      data: {
        title: null
      }
    }
  </script>
</element>

<template>
  <div>
    <child repeat="item in lists" title="{{ item.title }}"></child>
  </div>
</template>
<script>
  module.exports = {
    data: {
      lists: [
        { title: 'A' },
        { title: 'B' },
        { title: 'C' }
      ]
    },
    ready: function () {
      this.lists.splice(0, 1)
    }
  }
</script>
```

在线示例请见：

* [错误示例](http://dotwe.org/de97cf2c1b7ec09a53728edc9c27ad2a)

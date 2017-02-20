---
title: Weex 和 Web 平台的差异
type: references
order: 12
version: 2.1
has_chapter_content: true
---

# Weex 和 Web 平台的差异

Weex 是一个跨平台解决方案，Web 平台只是其一种运行环境，除此之外还可以在 Android 和 iOS 客户端中运行。原生开发平台和 Web 平台之间的差异，在功能和开发体验上都有一些差异。

## Weex 环境中没有 DOM

DOM（Document Object Model），即文档对象模型，是 HTML 和 XML 文档的编程接口，是 Web 中的概念。Weex 的运行环境以原生应用为主，在 Android 和 iOS 环境中渲染出来的是原生的组件，不是 DOM Element。

### 不支持 DOM 操作

既然原生环境中不支持 Web API，没有 `Element` 、`Event` 、`File` 等对象，详细列表可以参考 [Web APIs on MDN](https://developer.mozilla.org/en-US/docs/Web/API)。不支持选中元素，如 `document.getElementById` 、 `document.querySelector` 等；当然也不支持基于 DOM API 的程序库（如 jQuery）。

### 有限的事件类型

Weex 支持在标签上绑定事件，和在浏览器中的写法一样，但是 Weex 中的事件是由原生组件捕获并触发的，行为和浏览器中有所不同，事件中的属性也和 Web 中有差异。

+ 并不支持 Web 中所有的事件类型，详情请参考[《通用事件》](./common-event.html)。
+ 不区分事件的捕获阶段和冒泡阶段，相当于 DOM 0 级事件。

## Weex 环境中没有 BOM

BOM（Browser Object Model），即浏览器对象模型，是浏览器环境为 javascript 提供的接口。Weex 在原生端没有并不基于浏览器运行，不支持浏览器提供的 BOM 接口。

### 没有 `window` 、`screen` 对象

Weex 中并未提供浏览器中的 `window` 和 `screen` 对象，不支持使用全局变量。如果是想要获取设备的屏幕或环境信息，可以使用 `WXEnvironment` 变量。

+ `WXEnvironment`
  + `weexVersion`: WeexSDK 的版本。
  + `appName`: 应用的名称。
  + `appVersion`: 应用的版本。
  + `platform`: 运行平台，可能的值是 `Web` 、`Android` 、`iOS` 之一。
  + `osName`: 系统的名称。
  + `osVersion`: 系统版本。
  + `deviceWidth`: 设备宽度。
  + `deviceHeight`: 设备高度。

### 没有 `document` 对象

在浏览器中 `document` 表示了当前活动的文档模型，在 Android 和 iOS 环境中并没有这个对象，也不支持与其相关的 DOM 操作。

### 没有 `history` 、`location` 、`navigator` 对象

+ `history` 保存了当前页面的历史记录，并且提供了前进后退操作。
+ `location` 记录了当前页面 URL 相关的信息。
+ `navigator` 记录了当前浏览器中的信息。

这些接口与浏览器自身的实现有关，可以控制页面的前进后退并且获取状态信息。虽然在 Android 和 iOS 中也有“历史”和“导航”的概念，但是它是用于多个管理视图之间的跳转的。换句话说，在浏览器中执行“前进”、“后退”仍然会处于同一个页签中，在原生应用中“前进”、“后退”则会真实的跳转到其他页面。

此外 Weex 也提供了 `navigator` 模块来操作页面的跳转，使用方法参考[《navigator 导航控制》](./modules/navigator.html)。

## 能够调用移动设备原生 API

在 Weex 中能够调用移动设备原生 API，使用方法是通过注册、调用模块来实现。其中有一些模块是 Weex 内置的，如 clipboard 、 navigator 、storage 等。

+ [《clipboard 剪切板》](./modules/clipboard.html)
+ [《navigator 导航控制》](./modules/navigator.html)
+ [《storage 本地存储 》](./modules/storage.html)

为了保持框架的通用性，Weex 内置的原生模块有限，不过 Weex 提供了横向扩展的能力，可以扩展原生模块，具体的扩展方法请参考[《iOS 扩展》](./advanced/index.html) 和[《Android 扩展》](./advanced/extend-to-android.html)。

> 有些接口在浏览器环境中也存在，不过在使用时应该注意浏览器的兼容性；如剪贴板功能，出于安全性考虑，绝大多数浏览器都限制其使用。

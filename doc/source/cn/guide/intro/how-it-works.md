---
title: 工作原理
type: guide
order: 4.1
has_chapter_content: false
chapter_title: 优势介绍
version: 2.1
---

# 工作原理

## 整体架构

Weex 表面上是一个客户端技术，但实际上它串联起了从本地开发环境到云端部署和分发的整个链路。开发者首先可以在本地像撰写 web 页面一样撰写一个 app 的页面，然后编译成一段 JavaScript 代码，形成 Weex 的一个 JS bundle；在云端，开发者可以把生成的 JS bundle 部署上去，然后通过网络请求或预下发的方式传递到用户的移动应用客户端；在移动应用客户端里，WeexSDK 会准备好一个 JavaScript 引擎，并且在用户打开一个 Weex 页面时执行相应的 JS bundle，并在执行过程中产生各种命令发送到 native 端进行的界面渲染或数据存储、网络通信、调用设备功能、用户交互响应等移动应用的场景实践；同时，如果用户没有安装移动应用，他仍然可以在浏览器里打开一个相同的 web 页面，这个页面是使用相同的页面源代码，通过浏览器里的 JavaScript 引擎运行起来的。

![How it works](../images/flow.png)

## 本地开发环境

Weex 的本地开发环境基于 web 开发体验而设计，web 开发者可以通过自己熟悉的 HTML/CSS/JavaScript 技术和语法实现移动应用的界面。同时 Weex 也对 [Vue.js](https://vuejs.org/) 这一非常优秀的前端框架做了官方的支持。

除此之外，Weex 的工程设计也是 web 开发者非常熟悉的，首先 web 开发者可以使用自己熟悉的 npm 进行依赖管理；其次 web 开发者在通过项目脚手架初始化工程、开发、调试、质量控制等各个环节，都可以参考 web 开发已有的最佳实践。

和如今 web 开发的最佳实践一样，Weex 会把一个页面的源代码全部编译打包成一个 JS bundle，在浏览器中，我们需要把这个 JS bundle 作为一段 `<script>` 载入网页，在客户端里，我们把这段 JS bundle 载入本地，并通过 WeexSDK 直接执行。

**相关阅读**

* [Weex 和 web 平台的差异](../../references/platform-difference.html)
* [Vue 2.x 在 Weex 和 web 中的差异](../../references/vue/difference-with-web.html)
* [快速上手](../index.html)
* [使用 Devtools](./devtools.html)

## 云端部署和分发

Weex 的 JS bundle 可以作为 web 开发中的一段静态资源进行部署和下发。几乎可以复用 HTML5 所有的工程体系和最佳实践。比如在本地开发环境通过部署工具将 JS bundle 部署到 CDN、通过 CMS 或搭建平台把业务数据和模块化的前端组件自动化拼接生成 JS bundle、通过服务端 JS bundle 的流量和日志统计页面的访问情况、通过 AppCache 或类似的方式对 JS bundle 在客户端进行缓存或预加载以降低网络通信的成本等。

## 客户端 JavaScript 引擎

Weex 的 iOS 和 Android 客户端中都会运行一个 JavaScript 引擎，来执行 JS bundle，同时向各端的渲染层发送规范化的指令，调度客户端的渲染和其它各种能力。我们在 iOS 下选择了 JavaScriptCore 内核，而在 Android 下选择了 UC 提供的 v8 内核。无论是从性能还是稳定性方面都提供了强有力的保障。

为了让整个移动应用的资源利用得更好，我们在客户端提供的 JavaScript 引擎是单例的，即所有 JS bundle 公用一个 JavaScript 内核实例，同时对每个 JS bundle 在运行时进行了上下文的隔离，使得每个 JS bundle 都能够高效安全的工作。我们还把 Vue 2.0 这样的 JS Framework 做了预置，开发者不必把 JS Framework 打包在每个 JS bundle 里，从而大大减少了 JS bundle 的体积，也就进一步保障了页面打开的速度。

## 客户端渲染层

Weex 目前提供了 iOS 和 Android 两个客户端的 native 渲染层。每个端都基于 DOM 模型设计并实现了标准的界面渲染接口供 JavaScript 引擎调用。并且结合 web 标准和 native 的特点和优势实现了一套统一的组件和模块。Weex 在性能方面的表现也是非常优异的，尤其是界面首屏加载时间、native 下长列表的资源开销和复用情况、CPU、内存、帧率 等关键指标。当然，尽管 Weex 官方已经提供了一组开发者最常用的组件和模块，但面对丰富多样的移动应用研发需求，团队也难免会力不从心，为此我们提供了灵活自由的横向扩展能力，开发者可以根据自身的情况定制属于自己的客户端组件和模块，进一步丰富 Weex 在客户端上的能力。

**相关链接**

* [Weex 的组件和模块跟 web 标准的区别](../../references/web-standards.html)
* [如何使用 iOS](../../references/ios-apis.html)
* [如何使用 Android](../../references/android-apis.html)
* [如何扩展 iOS](../../references/advanced/extend-to-ios.html)
* [如何扩展 Android](../../references/advanced/extend-to-android.html)

## 浏览器渲染

Weex 除了提供 iOS 和 Android 的客户端渲染层之外，还基于 Vue 2.0 对官方的所有组件和模块进行了封装，开发者可以基于 Vue 2.0 用同一套源代码构建出在浏览器中相同效果的页面。并且同样可以横向扩展。

**相关链接**

* [如何使用 HTML5](../../references/html5-apis.html)
* [如何扩展 HTML5](../../references/advanced/extend-to-html5.html)

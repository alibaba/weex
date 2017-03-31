---
title: Web 开发体验
type: guide
order: 4.2
version: 2.1
---

# Web 开发体验

## 什么是 Web 开发体验

Weex 的开发体验和 web 的开发体验是非常接近的，它通过 HTML 或基于 HTML 模板来描述界面的结构和内容，通过 CSS 的方式描述界面的展现形式，用 JavaScript 来描述用户行为和业务逻辑。同时有完整的工程机制，如创建、开发、调试、部署。

## 为什么选择 Web 开发体验

我们选择基于 Web 开发体验有以下几方面原因：

1. 今天在技术社区有大量的 web 开发者，Weex 可以赋能更多的 web 开发者构建高性能和高体验的移动应用。
2. Web 开发本身具有非常强的高效率和灵活性，这和 Weex 想解决的移动端动态性问题不谋而合。
3. Web 标准和开发体验是很多顶尖而优秀的科技公司共同讨论和建设的结果，本身的设计和理念都有极高的品质保障，同时 Weex 也希望可以借此机会努力为标准贡献一点自己的微薄之力。
4. Web 是一种标准化的技术，标准本身就是一种力量，基于标准、尊重标准、贴近标准都意味着拥有更多的可能性。
5. Web 今天的生态和社区是非常繁荣的，有很多成熟的工具、库、工程体系、最佳实践可以使用、引入和借鉴。

## Weex 对 Web 标准的支持情况怎么样？

我们从以下几个方面进行介绍和梳理：

* HTML 标签：目前 Weex 支持了基本的容器 (div)、文本 (text)、图片 (image)、视频 (video) 等组件，HTML 中几乎所有的块级标签都可以通过容器组件进行自定义模拟，inline 的标签则可以通过文本组件进行自定义模拟，另外 Weex 还支持了 input/textarea 这样的表单型组件。
* CSS：Weex 支持了部分常用的 CSS 属性、值类型和单位，并且会根据用户反馈和在 web 中的使用频度陆续支持更多。
* JavaScript：目前 Weex 提供了一套简化版的 DOM APIs，用来操作原生界面，同时 Weex 在陆续支持更多的 W3C Device APIs。
* 在框架方面，Weex 官方支持了 Vue 2.0，以及相关的 vuex, vue-router 等，同时开发者可以直接使用各种第三方 JavaScript 工具库。
* 在工程方面，Weex 推荐 npm 包管理工具，也推荐用 webpack 进行 JS bundle 打包，并提供了 weex-devtool 开发工具，让开发者可以像调试 Chrome 一样调试 Weex 原生应用，同时 Weex 的页面发布系统、客户端缓存机制都尊重目前 Web 的最佳实践。

**相关链接**

* [Weex 和 web 标准的差异](../../references/web-standards.html)
* [使用 Vue.js](./using-vue.html)
* [使用 Devtools](./devtools.html)

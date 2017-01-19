---
title: 使用 Vue 开发 Weex 页面
type: guide
order: 4.3
version: 2.1
---

# 使用 Vue 开发 Weex 页面

## Vue & Weex 介绍

[Vue.js](https://vuejs.org/) 是 Evan You 开发的渐进式 JavaScript 框架，在易用性、灵活性和性能等方面都非常优秀。开发者能够通过撰写 `*.vue` 文件，基于 `<template>`, `<style>`, `<script>` 快速构建组件化的 web 应用。

![a vue file](//cn.vuejs.org/images/vue-component.png)

Vue.js 在 2016 年 10 月正式发布了 2.0 版本，该版本加入了 Virtual-DOM 和预编译器的设计，使得该框架在运行时能够脱离 HTML 和 CSS 解析，只依赖 JavaScript；同时 Virtual-DOM 也使得 Vue 2.x 渲染成原生 UI 成为了可能。

[Weex](https://weex-project.io/) 是一套简单易用的跨平台开发方案，能以 Web 的开发体验构建高性能、可扩展的原生应用。 Weex 与 Vue 有官方合作，支持将 Vue 2.x 作为内置的前端框架，Vue 也借此具备了开发原生应用的能力。

## 尝鲜体验

 > 开始之前，希望你能对 Weex 和 Vue 有基本的了解，推荐阅读 [Weex Tutorial](../index.html) 和 [Vue Introduction](https://vuejs.org/v2/guide/) 了解更多信息。

### 快速创建项目

Weex 官方提供了 [weex-toolkit](https://github.com/weexteam/weex-toolkit) 的脚手架工具来辅助开发和调试。

首先安装 `weex-toolkit` 工具：

```bash
npm install weex-toolkit@beta -g
```

> 注：目前 weex-toolkit 仅在 beta 版中才支持初始化 Vue 项目，使用前请确认版本是否正确。

然后初始化 Weex 项目：

```bash
weex init awesome-project
```

执行完命令后，在 `awesome-project` 目录中就创建了一个使用 Weex 和 Vue 的模板项目，生成的项目功能和用法可以参考其 package.json 和 README 。

## 编写代码

在创建了项目并且配置好了开发环境之后，我们就可以开始写代码了。

虽然开发的是原生应用，但是代码写起来和 Web 中并没什么不一样。你可以选择自己喜欢的前端开发环境、可以写 `.vue` 文件、也可以直接写 javascript 文件、可以使用 ES6+ 、可以使用发布在 npm 上的模块、可以扩展 Weex 的组件或者模块。

### 注意事项

Vue.js 最初是为 Web 设计的，虽然可以基于 Weex 开发移动应用，但是 Web 开发和原生开发毕竟不同，在功能和开发体验上都有一些差异，这些差异从本质上讲是原生开发平台和 Web 平台之间的差异，Weex 正在努力缩小这个差异的范围。

参考文章[《Vue 2.x 在 Weex 和 Web 中的差异》](../../references/vue/index.html)了解存在差异的原因和细节。

### 使用其他工具库

Vue.js 也有较多周边技术产品，如 [Vuex](https://github.com/vuejs/vuex) 和 [vue-router](https://github.com/vuejs/vue-router) 等，这些库也可以在 Weex 中很好的工作。

关于 Vuex 和 vue-louter 的使用方法，可以参考[《在 Weex 项目中使用 Vuex 和 vue-router》](../../references/vue/difference-of-vuex.html)。

> 我们基于 Weex 和 Vue 开发了一个的完整项目 [weex-hackernews](https://github.com/weexteam/weex-hackernews) ，引入了包含 Vue 2.x 的 WeexSDK，创建了三端的项目和基本的编译配置。在项目中使用了 Vuex 和 vue-router ，能够实现同一份代码，在 iOS、Android、Web 下都能完整地工作。

### 扩展 Weex

Weex 内置了一些通用的组件和模块，可以满足基本上使用需求。为了控制 SDK 的体积和保持框架的通用性，我们会谨慎地选择内置的组件和模块，并不会包罗万象将所有功能都封装进 SDK。不过我们提供了额外的组件市场，在其中将能找到满足不同需求、各式各样的组件和模块，此外 Weex 也具备横向扩展的能力，开发者可以自行定制和扩展 Weex 组件和模块。

Weex 的底层设计比较灵活，除了组件和模块以外，开发者甚至可以定制 Weex 内置的前端框架，Vue 2.x 就是一个成功的例子。

可以阅读以下文档了解更多信息：

+ [《iOS 扩展》](../../references/advanced/index.html)
+ [《Android 扩展》](../../references/advanced/extend-to-android.html)
+ [《HTML5 扩展》](../../references/advanced/extend-to-html5.html)
+ [《定制自己的 JS Framework》](../../references/advanced/extend-to-jsfm.html)

## Vue 2.x 在 Weex 中的特色功能

我想，你一定对 **Vue 为什么能渲染成原生页面** 、**Weex 为什么能将内核切换成 Vue** 心存好奇。如果你对这些细节感兴趣，可以阅读这篇文章 [《how it works》](./index.html)。

### 流式渲染

在 Weex 中，我们可以通过 `<foo append="tree|node">` 的方式定义页面首次渲染时的渲染颗粒度，这让开发者有机会根据界面的复杂度和业务需求对首次渲染过程进行定制。`append="tree"` 表示整个结点包括其所有子结点全部生成完毕之后，才会一次性渲染到界面上；而 `append="node"` 则表示该结点会先渲染在界面上作为一个容器，其子结点会稍后做进一步渲染。

<!-- dotwe demo -->

### 表单控件绑定

在 Weex 中，我们针对 `<input>` 和 `<textarea>` 这两个表单控件提供了和 web 体验相同的 `v-model` 指令。通过 `<input v-model="message">` 或 `<textarea v-model="message">`，开发者可以把数据 `message` 的值自动展示在文本框上，同时用户修改了文本框的值的时候，数据 `message` 会自动被更新。

<!-- dotwe demo -->

### 多页面上下文隔离

如 Weex 工作原理文中所述，所有 Weex 的 JS bundle 公用一个 JavaScript 内核实例。所以如何能够让多个 JS bundle 中使用的 Vue 是完全隔离的，并且其中一个页面对 Vue 进行扩展或改写不会影响到其它页面就变成了一个问题，通过 Weex 和 Vue 双方的协作，这一问题已经得以解决。大家可以放心使用。

<!-- html5 apis -->

### `<transition>` 过渡状态

Weex 支持了 Vue 2.x 中经典的 `<transition>` 写法，开发者可以通过 `<transition>` 轻松定义一个界面在两种状态中的过渡方式。

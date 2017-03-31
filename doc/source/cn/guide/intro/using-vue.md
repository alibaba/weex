---
title: 使用 Vue 开发 Weex 页面
type: guide
order: 4.3
version: 2.1
---

# 使用 Vue 开发 Weex 页面

## Vue in Weex

[Vue.js](https://vuejs.org/) 是 Evan You 开发的渐进式 JavaScript 框架，在易用性、灵活性和性能等方面都非常优秀。开发者能够通过撰写 `*.vue` 文件，基于 `<template>`, `<style>`, `<script>` 快速构建组件化的 web 应用。

![a vue file](//cn.vuejs.org/images/vue-component.png)

Vue.js 在 2016 年 10 月正式发布了 2.0 版本，该版本加入了 Virtual-DOM 和预编译器的设计，使得该框架在运行时能够脱离 HTML 和 CSS 解析，只依赖 JavaScript；同时 Virtual-DOM 也使得 Vue 2.x 渲染成原生 UI 成为了可能。

目前 Weex 与 Vue 正在展开官方合作，并将 Vue 2.x 作为内置的前端框架，Vue 也因此具备了开发原生应用的能力。

**相关链接**

* [Weex 快速上手](../index.html)
* [Vue 介绍](https://cn.vuejs.org/v2/guide/)
* [Weex 工作原理](./index.html)

## Vue 2.x 在 Weex 中的特色功能

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

## 注意事项

Vue.js 最初是为 Web 设计的，虽然可以基于 Weex 开发移动应用，但是 Web 开发和原生开发毕竟不同，在功能和开发体验上都有一些差异，这些差异从本质上讲是原生开发平台和 Web 平台之间的差异，Weex 正在努力缩小这个差异的范围。

参考文章[《Vue 2.x 在 Weex 和 Web 中的差异》](../../references/vue/index.html)了解存在差异的原因和细节。

## 使用其他 Vue 的工具库

Vue.js 也有较多周边技术产品，如 [Vuex](https://github.com/vuejs/vuex) 和 [vue-router](https://github.com/vuejs/vue-router) 等，这些库也可以在 Weex 中很好的工作。

关于 Vuex 和 vue-router 的使用方法，可以参考[《在 Weex 项目中使用 Vuex 和 vue-router》](../../references/vue/difference-of-vuex.html)。

> 我们基于 Weex 和 Vue 开发了一个的完整项目 [weex-hackernews](https://github.com/weexteam/weex-hackernews) ，引入了包含 Vue 2.x 的 WeexSDK，创建了三端的项目和基本的编译配置。在项目中使用了 Vuex 和 vue-router ，能够实现同一份代码，在 iOS、Android、Web 下都能完整地工作。

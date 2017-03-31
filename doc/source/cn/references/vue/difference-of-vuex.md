---
title: 使用 Vuex 和 vue-router
type: references
order: 10.2
version: 2.1
---

# 使用 Vuex 和 vue-router

Vue.js 也有较多周边技术产品，如 [Vuex](https://github.com/vuejs/vuex) 和 [vue-router](https://github.com/vuejs/vue-router) 等，这些库也可以在 Weex 中很好的工作。

> 我们基于 Weex 和 Vue 开发了一个的完整项目 [weex-hackernews](https://github.com/weexteam/weex-hackernews) ，在项目中使用了 Vuex 和 vue-router ，能够实现同一份代码，在 iOS、Android、Web 下都能完整地工作。

## 使用 Vuex

![Vuex](//vuex.vuejs.org/zh-cn/images/vuex.png)

Vuex 是一个专为 Vue.js 应用程序开发的状态管理工具库，可以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

由于在 Vuex 本身就是平台无关的，有较强的移植能力，完全可以在 Weex 中正常地使用 Vuex ，阅读其[官方文档](https://vuex.vuejs.org/zh-cn/)可以了解详细的使用方法。

Vuex 也集成到了其官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)中，提供了诸如 time-travel 调试、状态快照导入导出等高级调试功能。这些工具在 Web 平台中可以一如既往地工作。

## 使用 vue-router

vue-router 是专为 Vue.js 开发的便于实现单页应用的工具库，能够以声明式的方法编写页面的导航和跳转信息。

由于 Weex 的运行环境不只是浏览器，通常是以移动端原生环境为主，然而在 Android 和 iOS 中都没有浏览器的 History API，也不存在 DOM，因此如果想在 Weex 环境中使用 vue-router ，有些功能受到了限制，使用时应该注意。

### 路由模式

vue-router 提供了三种运行模式：

+ `hash`: 使用 URL hash 值来作路由。默认模式。
+ `history`: 依赖 HTML5 History API 和服务器配置。查看 [HTML5 History 模式](https://router.vuejs.org/zh-cn/essentials/history-mode.html)。
+ `abstract`: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。

配置方法是在定义路由时，传递 `mode` 属性：

```js
new Router({
  mode: 'abstract',
  // ...
})
```

从三种模式的介绍中也可以看出来，Weex 环境中只支持使用 abstract 模式。不过，vue-router 自身会对环境做校验，**如果发现没有浏览器的 API，vue-router 会自动强制进入 abstract 模式**，所以在使用时只要不写 `mode` 配置即可。默认 vue-router 会在浏览器环境中使用 hash 模式，在移动端原生环境中使用 abstract 模式。

### 编程式导航

vue-router 中使用 `<router-link>` 创建导航链接，不过在其中使用了基于 DOM 事件的一些特性，在 Weex 原生环境中并不能很好的工作。在 Weex 中，你必须使用[编程式导航](https://router.vuejs.org/zh-cn/essentials/navigation.html)来编写页面跳转逻辑。

编程式导航其实就是通过主动调用 router 实例上的 `push` 方法实现跳转。

使用 `<router-link>` 的代码示例：

```html
<!-- 只能在 Web 中使用，Native 环境不支持！ -->
<template>
  <div>
    <router-link to="profile">
      <text>Profile</text>
    </router-link>
  </div>
</template>
```

在 Weex 中，需要写成这个样子：

```html
<template>
  <div>
    <text @click="jump">Profile</text>
  </div>
</template>

<script>
  import router from './path/to/router'
  export default {
    methods: {
      jump () {
        router.push('profile')
      }
    }
  }
</script>
```

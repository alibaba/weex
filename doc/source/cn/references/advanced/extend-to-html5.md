---
title: HTML5 扩展
type: references
order: 11.3
version: 2.1
---

# 如何扩展 Weex Web 端的组件和模块

Weex 本身提供了很多内置组件和模块，也具备横向扩展的能力，允许开发者自行扩展和定制。需要注意的是，Weex 是一个跨平台的解决方案，扩展其内置组件或模块，需要在三端（Android、iOS、Web）中都有相应的实现。

Weex 将内核切换成 Vue 2.x 之后，在 Web 端扩展 Vue 组件将变得更加容易。

## 扩展 Web 组件

Vue.js 本身就是一个独立的前端框架，在浏览器中完全能够不基于 Weex 容器渲染。因此，针对 Weex 平台扩展 Vue.js 的 Web 端组件，和直接使用 Vue.js 开发一个 Web 组件是一样的。具体的组件编写方法可以参考其官方文档：[组件](https://cn.vuejs.org/v2/guide/components.html) ，另外建议使用 `.vue` 格式的文件编写组件，使用方法参考：[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)。

### 扩展组件示例

以扩展 `<sidebar>` 为例，首先应该编写组件自身的逻辑：

```html
<!-- sidebar.vue -->

<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<style scoped>
  .sidebar {
    /* ... */
  }
</style>

<script>
  export default {
    props: [],
    data () {
      return {}
    }
  }
</script>
```

然后在使用之前，全局注册 `<sidebar>` 组件：

```js
import Vue from 'vue'
import Sidebar from './path/to/sidebar.vue'

// 全局注册 sidebar 组件
Vue.component('sidebar', Sidebar)
```

在扩展 Weex 组件时，如果只使用了 Weex 提供的内置组件，并且使用的都是 Weex 支持的样式，那么就和普通的自定义组件无异，不需要 Native 端再有相应的实现。

如果你定制组件时不得不用到目前 Weex 不支持的标签和样式，在这种情况下才是真正的“扩展”了 Weex 的组件，你还需要在 Android 和 iOS 中有相应的实现，不然会导致渲染异常。

## 扩展 Web 模块

除了通用组件以外，Weex 还有提供了通用的模块，可以方便的调用原生 API。通常来说，注册 Weex 模块要求三端都得有相应的实现，否则会影响其正常的使用。

### 注册模块

如果你引入了 `weex-vue-render` 这个库，那么在全局能获取到 `weex` 这个变量，其中提供了 `registerModule` 方法可以注册模块。

#### API 格式

+ `registerModule`
  0. `name`: {String} 必选，模块名称。
  0. `define`: {Object} 必选，模块的定义。

#### 注册模块示例

下边的代码注册了一个名为 `guide` 的模块：

```js
weex.registerModule('guide', {
  greeting () {
    console.log('Hello, nice to meet you. I am your guide.')
  },
  farewell () {
    console.log('Goodbye, I am always at your service.')
  }
})
```

### 使用模块

在 `weex` 上提供了 `require` 方法用于获取已注册的模块，直接传递模块名即可：

```js
// 获取模块
const guide = weex.requireModule('guide')

// 可以直接调用模块中的方法
guide.greeting()
guide.farewell()
```

上述写法在 Native 环境中依然有效，只不过模块中的方法是由 Native 提供的。

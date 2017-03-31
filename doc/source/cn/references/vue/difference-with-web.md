---
title: Vue 2.x 在 Weex 和 Web 中的差异
type: references
order: 10.1
version: 2.1
---


# Vue.js 在 Weex 和 Web 中的差异

## 平台差异

Vue.js 最初是为 Web 平台设计的，虽然可以基于 Weex 开发原生应用，但是 Web 开发和原生开发毕竟不同，在功能和开发体验上都有一些差异，这些差异从本质上讲是原生开发平台和 Web 平台之间的差异，可以通过[《Weex 和 Web 平台的差异》](../platform-difference.html)了解更多细节和原因。

由于运行平台存在差异，Weex 不支持 Vue.js 中与 DOM 相关的功能：

+ 不支持事件冒泡和捕获机制，`.prevent` 、`.capture` 、`.stop` 、`.self` 等事件修饰符在原生环境中无意义。
+ 键盘事件的 `.{keyCode | keyAlias}` 修饰符在原生环境中无意义。(参考 [Vue 相关文档](https://cn.vuejs.org/v2/guide/events.html#按键修饰符))
+ 无需自行调用 `vm.$mount`，默认会将入口组件挂载到原生应用的视图中。
+ 不支持 `v-html` 和 `v-text` 指令。

## 功能差异

### 仅引入了 Vue Runtime

Vue 除了提供默认的完整包以外，还提供一个更小巧的 `vue.runtime.js`，在这个文件中移除了模板编译的相关操作，Weex 中也仅引入 Vue Runtime 的功能，这样做除了可以减少代码体积以外，还能减少运行期编译模板的负担，提升性能。

具体的差异有：

+ 定义组件时不支持使用 `template` 属性。
+ 不支持使用 `x-templates`。
+ 不支持使用 `Vue.compile`。

### 隔离多页面的作用域

Weex 在原生端使用的是“多页”的实现，不同的 js bundle 将会在不同的原生页面中执行；也就是说，不同的 js bundle 之间将不同共享 js 变量。即使是 `Vue` 这个变量，在不同页面中也对应了不同的引用。

基于这个特性，Vue 中全局功能将只在当前页面内生效：

+ `Vue.config`
+ `Vue.component`
+ `Vue.directive`
+ `Vue.filter`
+ `Vue.mixin`
+ `Vue.use`

> 注：以上接口的功能并未受影响，只是其生效范围将会限制在同一页面内。

## 样式差异

Web 中的 CSS 非常的灵活，积累了特别多的属性，支持多种布局方法；这是其优势，也是浏览器性能优化的一个瓶颈。

Weex 中的样式是由原生渲染器解析的，出于性能和功能复杂度的考虑，Weex 对 CSS 的特性做了一些取舍，使其更符合最佳实践。

### 单类名选择器和作用域

Weex 中只支持单个类名选择器，不支持关系选择器，也不支持属性选择器。

```css
/* 支持单个类名选择器 */
.one-class {
  font-size: 36px;
}

/* 不支持关系选择器 */
.parent > .child {
  padding-top: 10px;
}

/* 不支持属性选择器，不支持 `v-cloak` 指令 */
[v-cloak] {
  color: #FF6600;
}
```

这个只是对样式定义的限制，不影响样式类名的使用，在标签中可以添加多个样式类名，如：

```html
<template>
  <div class="one two three"><div>
</template>
```

### 组件级别的作用域

在 Weex 中，写在组件 `<style>` 里的样式只能用在当前组件中，默认是 `scoped` 作用域。为了保持和 Native 的一致性，建议在 `.vue` 文件中写样式时，加上 `scoped` 属性，即： `<style scoped>`。

### 支持的样式属性

Weex 支持的样式特性是 CSS 的子集，并且会不断扩充；在实现过程中我们参考了 [CSS 属性在浏览器中的使用频率](https://gist.github.com/Jinjiang/ea6b403036b7287cf8b8508729b77ac0#css-properties)，优先实现其中频率最高的一些属性。

Weex 支持了基本的盒模型和 flexbox 布局，以及其他常用样式，详情可参考[Weex 通用样式文档](../common-style.html)。

在编写样式时，还应该注意一下几点：

+ 不需要写样式前缀。
+ Weex 不支持 `display: none;`，因此也不支持 `v-show` 指令。
+ 为了优化样式解析的效率，样式属性暂不支持简写，涉及一下属性：
  + `border` 、`border-(top|bottom|left|right)`
  + `margin`
  + `padding`
  + `flex`

## 编译环境的差异

在 Weex 中使用 Vue.js ，你所需要关注的运行平台除了 Web 之外还有 Android 和 iOS ，在开发和编译环境上还有一些不同点。针对 Web 和原生平台，将 Vue 项目源文件编译成目标文件，有两种不同的方式：

+ 针对 Web 平台，和普通 Vue 2.X 项目一样，可以使用任意官方推荐的方式编译源文件，如 Webpack + vue-loader 或者 Browserify + vueify 。
+ 针对 Android 和 iOS 平台，我们提供了 [weex-loader](https://github.com/weexteam/weex-loader) 工具支持编译 `.vue` 格式的单文件组件；也就是说，目前只能使用 Webpack + weex-loader 来生成原生端可用的 js bundle。

### 使用 weex-loader

weex-loader 是 Webpack 的一个加载器，使用方法参考其[官方文档](http://webpack.github.io/docs/using-loaders.html)。需要提醒的是，如果 Webpack 配置的入口文件是个 `.vue` 格式的文件的话，还需要额外传递 `entry` 参数，通常设置为 `true`，表示将当前组件作为入口组件。为了能正常匹配 `.vue` 文件，Webpack 配置文件中 weex-loader 的匹配规则也需要有所调整。

```js
module.exports = {
  // 针对 .vue 文件要添加 entry 参数
  entry: './path/to/App.vue?entry=true',

  // 其他配置项 ...

  module: {
    loaders: [{

      // 匹配包含了 entry 参数的 .vue 文件路径
      test: /\.vue(\?[^?]+)?$/,
      loaders: ['weex-loader']
    }]
  },
}
```

如果使用 `.js` 文件作为 Webpack 配置的入口文件，则不需要额外配置这些参数，我们推荐使用 Javascript 文件作为编译的入口文件。

### 搭建原生开发环境

Weex 项目生成的是原生应用，学习一些开发原生应用的基础知识，会对你开发 Weex 项目很有帮助。参考[《集成 Weex 到已有应用》](../../guide/integrate-to-your-app.html)了解更多信息。

---
title: 语法介绍
type: guide
order: 3
has_chapter_content: true
version: 0.10
---

# 语法综述

Weex 代码由 `<template>`、`<style>`、`<script>` 三个部分构成。

- `<template>`：_必须的_，使用 HTML 语法描述页面结构，内容由多个标签组成，不同的标签代表不同的组件。
- `<style>`：_可选的_，使用 CSS 语法描述页面的具体展现形式。
- `<script>`：_可选的_，使用 JavaScript 描述页面中的数据和页面的行为，Weex 中的数据定义也在 `<script>` 中进行。

```html
<template>
  <!-- (required) the structure of page -->
</template>

<style>
  /* (optional) stylesheet */
</style>

<script>
  /* (optional) the definition of data, methods and life-circle */
</script>
```

这是一个典型的 M-V-VM 架构：通过 ViewModel 把 Model 和 View 建立更直接有效的关系，ViewModel 的实现以 `<script>` 的内容为主。

## `<template>` 模板

`<template>` 中的标签组织类似如下代码：

``` html
<template>
  <div>
    <image style="width: 200; height: 200;" src="https://gtms02.alicdn.com/tps/i2/TB1QHKjMXXXXXadXVXX20ySQVXX-512-512.png"></image>
    <text>Alibaba Weex Team</text>
  </div>
</template>
```

[体验一下](http://dotwe.org/5256e6e610ded330369f2e8010f7f0e6)

`<div>` 标签是一个根节点，里面包含描述图片的 `<image>` 标签和描述文字的 `<text>` 标签。

和 HTML 类似，不同标签代表的组件有各自的特性 (attribute)，部分组件可以拥有自己的子组件。

延伸阅读：[内置组件列表](../../references/components/index.html)

根节点：每个 Weex 页面最顶层的节点，我们称为根节点。下面是目前我们支持的三种根节点：

- `<div>`：普通根节点，有确定的尺寸，不可滚动。
- `<scroller>`：可滚动根节点，适用于需要全页滚动的场景。
- `<list>`：列表根节点，适用于其中包含重复的子元素的列表场景。

目前 Weex 仅支持以上三种根节点。

_注意事项：`<template>` 只支持一个根节点，多个根节点将无法被 Weex 正常的识别和处理。_

## `<style>` 样式

我们可以把 Weex 中的样式语法理解为 CSS 的一个子集，两者有一些细微的区别

第一种写法是，你能在标签上，直接通过内联 `style` 特性编写样式. 第二种写法，通过标签中的 `class` 特性与 `<style>` 标签中定义的样式建立对应关系，让 `<style>` 标签中定义的样式作用于特定标签之上。以下是例子：

```html
<template>
  <div>
    <text style="font-size: 64;">Alibaba</text>
    <text class="large">Weex Team</text>
  </div>
</template>

<style>
  .large {font-size: 64;}
</style>
```

[体验一下](http://dotwe.org/d8af9186bf045df74e7a538d91798db4)

上面的两个 `<text>` 组件都被设置了同样的字体大小，但分别用了两种不同的方式。

延伸阅读：[Weex 通用样式](../references/common-style.html)

**注意**：Weex 遵循 [HTML 特性](https://en.wikipedia.org/wiki/HTML_attribute) 命名规范，所以特性命名时**请不要使用陀峰格式 (CamelCase)**，采用以“-”分割的 **long-name** 形式。

## `<script>` 脚本

`<script>` 描述页面中的数据和页面的行为，代码遵循 JavaScript (ES5) 语法 (目前 iOS 端和浏览器端取决于内置 JavaScript 引擎对 ES 版本的支持情况，安卓端能够完整支持 ES5，但不原生支持 ES6，需要用类似 [babel](http://babeljs.io) 的工具对源代码进行转换)。下面是一个例子：

``` html
<template>
  <div>
    <text>The time is {{datetime}}</text>
    <text>{{title}}</text>
    <text>{{getTitle()}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      title: 'Alibaba',
      datetime: null
    },
    methods: {
      getTitle: function () {
        return 'Weex Team'
      }
    },
    created: function() {
      this.datetime = new Date().toLocaleString()
    }
  }
</script>
```

[体验一下](http://dotwe.org/8095bed0d9db4299fb39975d4b35b13f)

上面 `<script>` 标签中定义了被赋值给 `module.exports` 的对象，这个对象其实就是一个 ViewModel 选项，让三个 `<text>` 标签显示当前时间、“Alibaba”字样和“Weex Team”字样。

选项中的 `data` 用于存储数据，这些数据可以通过[数据绑定](./data-binding.html)机制和 `<template>` 标签中的内容绑定起来。当这些数据变更时，被绑定的模板内容也会自动更新。这些数据在 `<script>` 中的各个方法中可以通过类似 `this.x` 的方式进行读写操作。

而选项中的 `methods` 里则列出了当前上下文可执行的各种函数，比如 `getTitle()`。

选项中最后的 `created` 是生命周期函数，会在数据初始化之后、界面被绑定数据并渲染之前执行。类似的生命周期函数还有 `init`、`ready` 等，在这个例子中，`datetime` 会在界面渲染之前被更新为当前的时间。

延伸阅读：[ViewModel 选项](../../references/component-defs.html)

接下来，我们来详细介绍[数据绑定](./data-binding.html)的相关知识。

---
title: CSS 样式和类
type: guide
order: 3.2
version: 0.10
---

# CSS 样式和类

## 基础语法

CSS 样式可以理解为一系列的键值对，其中的每一对描述了一个特定的样式，例如组件的宽或者高。

```css
.div {
  width: 400; 
  height: 50;
}
```

键值对的形式是 `prop-name: prop-value;`。键名是 `prop-name`，键值是 `prop-value`。 一般情况下，键名按照连接符的方式进行命名，键和值之间由冒号 `:` 进行分隔，每对键值之间由分号 `;` 进行分隔。

在 Weex 页面上样式有两种形式：

- `<template>` 中的 `style` 特性
- `<style>` 样式表

### `<template>` 中的 `style` 特性

在 `style` 特性中编写样式，例如：

```html
<template>
  <div style="width: 400; height: 50;">
    ...
  </div>
</template>
```

这段代码的意思是 `<div>` 组件的宽和高分别为 400 像素和 50 像素。

### `<style>` 样式表

例如:

```html
<style>
  .wrapper { width: 600; }
  .title { width: 400; height: 50; }
  .highlight { color: #ff0000; }
</style>
```

样式表包含了多个样式规则，每条规则有一个对应的类，以及由 `{...}` 包括的若干条样式。例如：

```css
.title { width: 400; height: 50; }
```

### `class` 特性

`<template>` 标签中的 `class` 特性值用来匹配 `<style>` 样式表中的一个或多个 class 名，多个 class name 之间由空格分隔。例如：

```html
<template>
  <div class="wrapper">
    <text class="title">...</text>
    <text class="title highlight">...</text>
  </div>
</template>
<style>
  .wrapper { width: 600; }
  .title { width: 400; height: 50; }
  .highlight { color: #ff0000; }
</style>
```

[体验一下](http://dotwe.org/8487e2a33cd051c9adfa887d0bafbb44)

这段代码的含义是 `<div>` 组件的宽度是 600 像素，两个 `<text>` 组件的尺寸为 400x50，其中第二个文本组件是红色字。

**注意事项**

- 为了简化页面设计和实现，屏幕的宽度统一为 750 像素，不同设备屏幕都会按照比例转化为这一尺寸进行长度计算。
- 标准 CSS 支持很多样式选择器，但 Weex 目前只支持单个 class name 的选择器。
- 标准 CSS 支持很多的长度单位，但 Weex 目前只支持像素，并且 `px` 单位可以忽略不写，直接使用对应的数值。更多详情请查看[通用样式](../references/common-style.html)。
- 子元素的样式不会继承自父元素，这一点与标准 CSS 不同，比如 `color` 和 `font-size` 等样式作用在 `<text>` 上层的 `<div>` 上是无效的。
- 标准 CSS 包含了非常多的样式属性，但 Weex 只支持了其中的一部分，比如盒模型、flexbox、position 等布局属性，以及 `font-size`、`color` 等其它样式。

## 与数据绑定结合

请查阅[数据绑定](./data-binding.html)中有关 `style` 和 `class` 特性的相关部分。这里简单举个例子：

```html
<template>
  <div>
    <text style="font-size: {{fontSize}};">Alibaba</text>
    <text class="large {{textClass}}">Weex Team</text>
  </div>
</template>
<style>
  .large {font-size: 32;}
  .highlight {color: #ff0000;}
</style>
<script>
  module.exports = {
    data: {
      fontSize: 32,
      textClass: 'highlight'
    }
  }
</script>
```

[体验一下](http://dotwe.org/440d3318dc7b83e3bb0a110f3b3236ca)

下一篇：[事件处理](./events.html)

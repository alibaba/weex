---
title: <text>
type: references
order: 2.12
version: 0.10
---

# &lt;text&gt;

`<text>` 是 Weex 内置的组件，用来将文本按照指定的样式渲染出来。`<text>` 只能包含文本值，你可以使用 `{% raw %}{{}}{% endraw %}` 标记插入变量值作为文本内容。

## 子组件

此组件不支持子组件。

## 特性

- `value {string}`: 组件的值，与 `<text>` 标签中的文本内容相同。

## 样式

- `lines {number}`: 指定文本行数。默认值是 `0` 代表不限制行数。
- text styles: 查看 [文本样式](../text-style.html)

  - 支持 `color` 样式.
  - 支持 `font-size` 样式. iOS默认值：`32`，Android：不同设备不同，H5 默认值：`32`.
  - 支持 `font-style` 样式.
  - 支持 `font-weight` 样式.
  - 支持 `text-align` 样式.
  - 支持 `text-decoration` 样式.
  - 支持 `text-overflow` 样式.
  - 支持 `line-height`样式<sup class="wx-v">0.6.1+</sup> 。`line-height` 在 iOS 中与 H5 和 Android 中不同， 文本值将放置在框的底部。
  - 不支持 `flex-direction`, `justify-content`, `align-items` 这些为子节点设置的属性，并且`<text>`没有子节点。

- 通用样式：支持所有通用样式

  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- 通用事件
  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)

## 约束

1. `<text>` 里直接写文本头尾空白会被过滤，如果需要保留头尾空白，暂时只能通过数据绑定写头尾空格。

```html
<template>
  <div>
    <text>    测试1，直接放置头尾用空白的文本    </text>
    <text>{{msg}}</text>
  </div>
</template>
<script>
module.exports = {
  data: {
    msg: '    测试2，使用数据绑定     '
  }
}
</script>
```

[体验一下](http://dotwe.org/473d451e48ba322b606c4ba2577fd96a)

## 示例

```html
<template>
  <div>
    <text>this is text content</text>
    <text value="this is text value"></text>
    <text id="textid" onclick={{showtext}}>this is gettext content</text>
    <text value="{{text}}"></text>
    <text style="lines: 3;">Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.</text>
</div>
</template>

<style>
  .text {
    font-size: 24;
    text-decoration: underline;
  }
</style>

<script>
  module.exports = {
    data: {
      price1: '99.99',
      price2: '88.88',
      text:''
    },
    methods: {
      showtext: function(event) {
        var textComponent = this.$el("textid");
        this.text = textComponent.attr.value;
      }
    }
  };
</script>
```

[体验一下](http://dotwe.org/b2796940d6b9766000778c61446fcd26)

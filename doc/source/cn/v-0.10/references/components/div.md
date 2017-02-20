---
title: <div>
type: references
order: 2.2
version: 0.10
---

# &lt;div&gt;

`<div>` 组件是用于包装其它组件的最基本容器。支持所有的通用样式、特性、`flexbox` 布局。其类似于 HTML 的 `<div>` 容器，但**不能**直接在里面添加文本（字符串），如果要展示文本，应该使用 `<text>` 组件。历史版本中，`<div>` 别名是 `<container>`，目前**已经弃用**。

**注意：**

`<div>` 嵌套层级不可过深，否则容易引起性能问题，建议控制在 **10** 层以内。

一个简单例子：

```html
<template>
  <div>
    <text class="text">Hello World!</text>
  </div>
</template>

<style>
.text {
  font-size: 70;
  color: #ff0000
}
</style>

<script></script>
```

[体验一下](http://dotwe.org/a468998152ee680413588c38bd61c29e)

![mobile_preview](../images/div_1.jpg)

## 子组件

`<div>` 基本容器组件，因此支持包括 `<div>` 在内的任何组件作为自己的子组件。因此，在写一个组件时，推荐外层使用 `<div>` 作为根容器。

## 样式

`<div>` 支持所有通用样式：

- 盒模型
- `flexbox` 布局
- `position`
- `opacity`
- `background-color`

查看 [组件通用样式](../common-style.html)

## 事件

`<div>` 支持所有通用事件：

- `click`
- `longpress`
- `appear`
- `disappear`

查看 [通用事件](../common-event.html)

## 约束

1. **不能**直接在 `<div>` 中添加文本。

  错误示例，“Hello World!” 无法被正常渲染。

  ```html
  <template>
    <div>Hello World!</div>
  </template>

  <style>
  .text {
    font-size: 70;
    color: #ff0000
  }
  </style>

  <script></script>
  ```

  [体验一下](http://dotwe.org/3ef3ba3f0f162b27e24c525250c46a04)

2. `<div>` 不可滚动，即使显式设置高度也一样。

  [错误示例](http://dotwe.org/a2cc491c5b9e6f6eb06795e45e725efd)

## 示例

![mobile_preview](../images/div_4.jpg)

```html
<style>
.item {
  padding: 20;
  height: 220;
  border-bottom-width: 1;
  border-bottom-style: solid;
  border-bottom-color: #efefef;
}
.item-content {
  flex-direction: row;
  width: 710;
  background-color: #ffffff;
}
.item-imgbox {
  height: 180;
  width: 180;
  margin-right: 20;
}
.item-img {
  width: 180;
  height: 180;
}
.item-info {
  height: 180;
  width: 510;
  justify-content: center;
  position: relative;
}
.item-info-detail {
  position: relative;
  color: #A2A2A2;
}
.desc {
  lines: 4;
  text-overflow: ellipsis;
  font-size: 26;
  line-height: 30;
  color: #A2A2A2;
}
.title {
  lines: 1;
  text-overflow: ellipsis;
  font-size: 32;
  color: #2D2D2D;
  line-height: 40;
}
.detail-info {
  margin-top: 15;
}
.up {
  width: 70;
  height: 70;
  position: fixed;
  right: 20;
  bottom: 20;
}
.img {
  width: 70;
  height: 70;
}
</style>

<template>
  <div>
    <scroller>
      <div class="item" repeat="item in items" id="item-{{$index}}">
        <div class="item-content">
          <div class="item-imgbox">
            <img class="item-img" src="{{item.img}}" alt="" />
          </div>
          <div class="item-info">
            <div class="item-info-detail">
              <text class="title">{{item.title}}</text>
              <div class="detail-info">
                <text class="desc">{{item.desc}}</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <div class="up" onclick="goToTop">
      <img class="img" src="https://img.alicdn.com/tps/TB1ZVOEOpXXXXcQaXXXXXXXXXXX-200-200.png"></img>
    </div>
  </div>
</template>

<script>
  var dom = require('@weex-module/dom') || {}

  module.exports = {
    data: {
      items: [{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      },{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      },{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      },{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      },{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      },{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      },{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      },{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      },{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      },{
        img: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
        title: 'Who is Alan Mathison Turing?',
        desc: 'Alan Mathison Turing ( 23 June 1912 – 7 June 1954) was an English computer scientist, mathematician, logician, cryptanalyst and theoretical biologist. He was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general purpose computer.Turing is widely considered to be the father of theoretical computer science and artificial intelligence.'
      }]
    },
    created: function () {
    },
    methods: {
      goToTop: function (e) {
        dom.scrollToElement(this.$el('item-0'), {
          offset: 0
        })
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/799f54b32f5227f9c34cfbb5e6946ba7)

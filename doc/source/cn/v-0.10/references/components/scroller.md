---
title: <scroller>
type: references
order: 2.8
version: 0.10
---

# &lt;scroller&gt;

<span class="weex-version">v0.6.1+</span>

`<scroller>` 是一个竖直的，可以容纳多个排成一列的子组件的滚动器。如果子组件的总高度高于其本身，那么所有的子组件都可滚动。

**注意：** `<scroller>` 可以当作根元素或者嵌套元素使用。此组件的滚动方向是垂直方向的形式。

一个简单例子：

```html
<template>
  <scroller onloadmore="onloadmore" loadmoreoffset="100">
    <div repeat="v in items">
      <text style="font-size: 40; color: #000000">{{v.item}}</text>
    </div>
  </scroller>
</template>
<script>
  module.exports = {
    data: {
      items: [],
      triggered: false
    },
    created: function () {
      for (var i = 0; i < 50; i++) {
        this.items.push({
          'item': 'test data' + i
        });
      }
    },
    methods: {
      onloadmore: function () {
        if (!this.triggered) {
          for (var i = 100; i >= 50; i--) {
            this.items.push({
              'item': 'onloadmore triggered' + i
            });
          }
        }
        this.triggered = true;
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/6910f0b87aeabe3f2a0d62c0d658dbd2)

## 子组件

支持任意类型的 Weex 组件作为其子组件。 其中，还支持以下两个特殊组件作为子组件：

- `<refresh>`

  用于给列表添加下拉刷新的功能。

  使用文档请查看 [`<refresh>`](./refresh.html)

- `<loading>`

  `<loading>` 用法与特性和 `<refresh>` 类似，用于给列表添加上拉加载更多的功能。

  使用文档请查看 [`<loading>`](./loading.html)

## 特性

- `show-scrollbar {boolean}`：可选值为 `true`/ `false`，默认值为 `true`。控制是否出现滚动条。
- `scroll-direction {string}`：可选为 `horizontal` 或者 `vertical`，默认值为 `vertical` 。定义滚动的方向。
- `loadmoreoffset {number}`：默认值为 0，触发 `loadmore` 事件所需要的垂直偏移距离（设备屏幕底部与页面底部之间的距离）。当页面的滚动条滚动到足够接近页面底部时将会触发 `loadmore` 这个事件。

  ![mobile_preview](../images/scroller_1.jpg)

- `loadmoreretry {number}`：默认值为 0，当 `loadmore` 失败时是否重置 `loadmore` 相关的 UI，值不一样就会重置。

## 样式

- 通用样式：支持所有通用样式

  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- `loadmore` <sup class="wx-v">v0.5+</sup>：如果滚动到底部将会立即触发这个事件，你可以在这个事件的处理函数中加载下一页的列表项。
- 通用事件

  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)

## 扩展

### scrollToElement(node, options)

滚动到列表某个指定项是常见需求，`<list>` 拓展了该功能支持滚动到指定 `<cell>`。通过 `dom` module 访问，更多信息可参考 [dom module](../modules/dom.html) 。

#### 参数

- `node {node}`：指定目标节点。
- `options {Object}`：
    - `offset {number}`：一个到其可见位置的偏移距离，默认是0

#### 示例

```html
<template>
  <scroller>
    <div class="row" repeat="item in rows" id="item-{{$index}}">
      <text class="item-title">row {{item.id}}</text>
    </div>
    <div onclick="go" style="width: 750;height: 50; position: fixed; left: 0; right: 0; bottom: 0; background-color: #eeeeee;">
      <text style="text-align: center;">
        Go to 50th line.
      </text>
    </div>
  </scroller>
</template>

<script>
var dom = require('@weex-module/dom')

module.exports = {
  data: {
    rows: []
  },
  created: function () {
    for (var i = 0; i < 100; i++) {
      this.rows.push({
        id: i
      })
    }
  },
  methods: {
    go: function () {
      var el = this.$el('item-49')

      dom.scrollToElement(el, {
        offset: 0
      })
    }
  }
}
</script>
```

[体验一下](http://dotwe.org/483e5c878c52c0891e6e35e478f19854)

## 约束

**不允许**相同方向的 `<list>` 或者 `<scroller>` 互相嵌套，换句话说就是嵌套的 `<list>`/`<scroller>` 必须是不同的方向。

举个例子，**不允许**一个垂直方向的 `<list>` 嵌套的一个垂直方向的 `<scroller>` 中，但是一个垂直方向的 `<list>` 是可以嵌套的一个水平方向的 `<list>` 或者 `<scroller>` 中的。

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
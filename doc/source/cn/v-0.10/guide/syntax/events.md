---
title: 事件处理
type: guide
order: 3.3
version: 0.10
---

# 事件处理

Weex 允许对 `<template>` 中的元素绑定事件处理函数。

## 基本语法

以 `on...` 开头的就是用于绑定事件的特性，特性名中 `on` 之后的部分就是事件的类型，特性的值就是处理该事件的函数名。_函数名外不需要添加 mustache 语法中的大括号_。例如：

```html
<template>
  <div>
    <text onclick="toggle">Toggle: {{result}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      result: true
    },
    methods: {
      toggle: function () {
        this.result = !this.result
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/2f9f910a60ffc1ed54c797390d6615e1)

## 内联事件处理参数

同时我们也支持在事件绑定的特性值中内联写明被传入的参数。例如：

```html
<template>
  <div>
    <text onclick="update(1, 2)">Result: {{result}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      result: '<empty>'
    },
    methods: {
      update: function (x, y) {
        this.result = x + y
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/777056d8985e73567464e2d66cbe73fc)

## 特殊的内联事件处理参数

额外的，在这种内联的事件绑定写法中，你可以使用一个特殊的参数 `$event`，代表事件描述对象，即默认事件处理函数的第一个参数。所以 `<template>` 中的 `onclick="foo"` 和 `onclick="foo($event)"` 是等价的，`$event` 的用法可以更多参考下面的例子

```html
<template>
  <div>
    <text onclick="update($event, 1, 2)">Result: {{result}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      result: '<empty>'
    },
    methods: {
      update: function (e, x, y) {
        this.result = e.type + (x + y)
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/5e1e7c22f036725e44c3ff492f173400)

## 事件描述对象

每当一次事件被触发的时候，都会产生一个事件描述对象，该对象会默认作为第一个参数传递给事件处理函数，或以 `$event` 形参的方式出现在内联事件处理函数中。

每个事件描述对象至少包含以下几个特性：

- `type` (`string`): 事件名称, 如: `click`
- `target` (`Element`): 目标元素
- `timestamp` (`number`): 事件触发时的时间戳数字

下一节：[展示逻辑控制](./display-logic.html)

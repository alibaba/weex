---
title: 通用特性
type: references
order: 1.5
version: 0.10
---

# 通用特性

特性（attribute）与 HTML 中元素特性类似，提供了与 Weex 元素有关的其他附加信息。所有的元素都可以拥有特性, 特性总是在 Weex 元素的起始标签中定义，并总是以键值对的形式出现，例如：`name="value"`。可以使用 [Mustache](https://mustache.github.io/) 对特性值进行数据绑定。

**Notes!**

Weex 遵循 [HTML attribute](https://en.wikipedia.org/wiki/HTML_attribute) 命名规范, 所以请 **不要在特性中使用驼峰风格（CamelCase）** , 使用`-`连接符的**羊肉串风格（kebab-case）** 才是更好的命名方式。

所有 Weex 元素都拥有以下特性： 

## id

为 `<template>` 内定义的元素指定一个唯一的 id，通过 `this.$el(id)` 可以容易地获取一个 Weex 元素的引用。更多信息可参考 [Instance APIs](./api.html) 

```html
<template>
  <div id="wrapper">
    <list class="list">
      <cell class="row" repeat="item in rows" id="item-{{$index}}">
        <text class="item-title">row {{item.id}}</text>
      </cell>
    </list>
  </div>
</template>
<style></style>

<script>
module.exports = {
  data: {
    rows:[
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5}
    ]
  }
}
</script>
```

[体验一下](http://dotwe.org/b5032fa96e3e657711916148b1978ad3)

## style

为元素定义行内样式。

```html
<div style="width: 200px; height: 200px; color: #ff0000;"></div>
<div style="padding: {{x}}; margin: 0"></div>
```

## class

为元素定义一个或多个类名（引用样式表中的类）。    

```html
<div class="button"></div>
<div class="button {{btnStatus}}"></div>
```

## repeat

我们可以通过 `repeat` 特性根据一个数组进行渲染，迭代地生成当前标签的内容。`repeat` 特性有着 `item in items` 形式的特殊语法，其中，`items` 是数组数据，`item` 是数组元素迭代的别名。

```html
<template>
  <div>
    <list class="list">
      <cell class="row" repeat="item in rows" id="item-{{$index}}">
        <text class="item-title">row {{item.id}}</text>
      </cell>
    </list>
  </div>
</template>

<style></style>

<script>
module.exports = {
  data: {
    rows:[
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5}
    ]
  }
}
</script>
```

[体验一下](http://dotwe.org/b5032fa96e3e657711916148b1978ad3)

## if

提供一个布尔值来决定是否显示当前标签。当值为 `true` 时，元素显示，为 `false` 时元素隐藏。

```html
<div if="true"></div>
<div if="{{opened}}"></div>
<div if="{{direction === 'row'}}"></div>
```

## append

append 特性用于控制渲染次序。它的可选值为 `tree` 或 `node`，默认为 `tree`，不支持数据绑定。不同的值会执行不同的渲染过程：

- `append="tree"` 是一次性渲染整个节点树，渲染更高效，但是如果页面太大容易造成较长时间的白屏。
- `append="node"` 所有节点逐个渲染，整体渲染速度略慢，但是用户体验好一些。

通过 `node` 和 `tree` 可以精细化地控制页面展示的逻辑和颗粒度，一般比较好的实践为首屏以内按 `tree` 解析，首屏以外按 `node` 解析。

```html
<div append="tree"></div>
<div append="node"></div>
```

## 事件处理 (on...)

在 Weex 标签上注册事件处理器。以 `on` 加 事件名为 `key`，事件处理函数为 `value`。

```html
<template>
  <div class="btn" onClick="alertMsg"><text>Click me</text></div>
</template>

<style>
.btn {
  justify-content: center;
  align-items: center;
  width: 200;
  height: 100;
  background-color: #ff0000;
  border-radius: 5;
  color: #ffffff;
}
</style>

<script>
var modal = require('@weex-module/modal')

module.exports = {
  data: {},
  methods: {
    alertMsg: function (e) {
      modal.alert({
        message: 'click',
        okTitle: 'alert'
      }, function() {
      })
    }
  }
}
</script>
```

[体验一下](http://dotwe.org/97de59d24d7667aa91187d59123d24a6)

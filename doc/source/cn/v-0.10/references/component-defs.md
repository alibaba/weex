---
title: ViewModel 选项
type: references
order: 1.2
version: 0.10
---

# 组件定义

定义组件是通过一组选项来描述一个组件。这组选项总是被赋值给 `<script>` 标签中的 `module.exports` 。

``` javascript
module.exports = {
  // a set of options here
}
```
## 数据和方法

``` javascript
module.exports = {
  data: function () {
    return {x: 1, y: 2}
  },
  methods: {
    doThis: function () {...},
    doThat: function () {...}
  },
  ...
}
```

`data` 选项是一个函数，它返回这个视图模型可监听的数据对象。而 `methods` 是一个映射，其中包含所有视图模型的方法。

每个 `data` 或 `method` 属性将被代理到视图模型实例中。所以，你能通过 `this.x` 读写数据，或者通过 `this.doThis()` 调用方法。

一个完整的例子：

```html
<template>
  <div style="width: {{w}}; height: {{h}}; background-color: red;" onclick="update"></div>
</template>
<script>
  module.exports = {
    data: function () {
      return {w: 750, h: 200}
    },
    methods: {
      update: function (e) {
        this.h += 200
      }
    }
  }
</script>
```
## 事件

``` javascript
module.exports = {
  data: ...,
  methods: {
    foo: function () {
      ...
      this.$emit('customtype1', data)
    }
  },
  events: {
    customtype1: function (e) {
      console.log(e.type, e.detail)
    }
  },
  ...
}
```

`events` 选项允许你在视图模型被创建时注册自定义事件。然后，它会监听这些类型的事件，并通过函数类型的值处理它们。

Weex 会把一个事件对象作为第一个参数传递给其绑定的事件，这个事件对象在 `e.detail` 中包含事件数据。
## 生命周期

``` javascript
module.exports = {
  data: ...,
  methods: ...,
  init: function () {
    console.log('ViewModel constructor begins')
  },
  created: function () {
    console.log('Data observation finished')
  },
  ready: function () {
    console.log('Virtual DOM finished')
  },
  ...
}
```

Weex 视图模型现在支持生命周期内的钩子函数，这些钩子函数能被写为组件选项：
- `init`: 在视图模型的构造函数开始调用时激活；
- `created`: 当视图模型监听默认数据，但还未编译模板时激活；
- `ready`: 当视图模型监听默认数据并且编译模板生成虚拟DOM后被激活。

**注意：当 `methods`、`events` 或生命周期方法作为参数传递给别的函数时，务必确认函数执行时的上下文符合您的预期，例如：**

``` javascript
module.exports = {
  data: function () {
    return {x: 1, y: 2}
  },
  ready: function () {
    // `undefined`
    // 因为上下文发生了变化
    this.foo(this.bar)
    // `1`
    // 正确绑定上下文之后可以得到预期的值
    this.foo(this.bar.bind(this))
  },
  methods: {
    foo: function (fn) {
      return fn()
    },
    bar: function () {
      return this.x
    }
  }
}
```

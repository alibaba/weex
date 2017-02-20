---
title: 找节点
type: guide
order: 3.7
version: 0.10
---

# 找节点

在 Weex 中，您可以通过在特定的子组件上设置 `id` 特性，以此在该 `<template>` 内唯一标识这个组件。

## 获取子组件

您可以在父组件上下文中使用 `this.$el(id)` 来找到该组件，以运用 `scrollToElement()` 为例：

```html
<template>
  <div>
    <text id="goto-top">Top</text>
    <div style="height: 10000; background-color: #999999;"></div>
    <text onclick="back2Top">Back to Top</text>
  </div>
</template>
<script>
  var dom = require('@weex-module/dom')
  module.exports = {
    methods: {
      back2Top: function () {
        var el = this.$el('goto-top')
        dom.scrollToElement(el, { offset: 10 })
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/ed07068ef6f038d6c39af6c971ad08a0)

### `id` 和 `repeat` 特性配合使用

`id` 也可以和 `repeat` 语法配合使用，关于 `repeat` 更多详见 [展示逻辑控制](./display-logic.html)，但是要确保循环的节点需要用不同的 `id`，比如：

```html
<template>
  <div>
    <image
      repeat="image in images"
      id="img-{{image.id}}"
      src="{{image.url}}"
      onclick="getImageId"></image>
  </div>
</template>
<script>
module.exports = {
  data: {
    images: [
      {id: 1, url: '...'},
      {id: 2, url: '...'},
      {id: 3, url: '...'},
      ...
    ]
  },
  methods: {
    getImageId: function(e) {
      // get e.target.id
    }
  }
}
</script>
```

### 获取自定义子组件的上下文

另外，我们还可以通过 `this.$vm(id)` 方法可以访问自定义子组件的上下文：

```html
<element name="foo">
  <template>
    <div style="flex-direction: row;">
      <text>{{title}}</text>
    </div>
  </template>
  <script>
    module.exports = {
      data: {
        title: null
      },
      methods: {
        setTitle: function (text) {
          this.title = text
        }
      }
    }
  </script>
</element>

<template>
  <div>
    <foo id="sub" title="Hello"></foo>
    <text onclick="update">Click Me to Update</text>
  </div>
</template>
<script>
  module.exports = {
    methods: {
      update: function (e) {
        this.$vm('sub').setTitle('Updated')
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/1d332e6c238462e841743035c6bc697e)

实际上，如上述的例子，我们找到子组件上下文之后，直接在这个上下文中调用子组件方法或修改子组件的数据并不是我们认为最好的方式，我们更倾向于通过一套确定的组件间通信机制来完成这一工作。

### 获取父级组件或其上下文

除了可以自上而下寻找组件或其上下文，Weex 也支持自下而上做相同的事情。当前上下文中的 `this._parent` 可以获取其父级上下文。除了父级上下文，对于父级组件本身，相关处理也可以基于先获取父级上下文，然后在父级组件内部完成更多更细致的处理。更多内容可以深入了解组件间通信的部分。

_注意事项：在未来的版本中 `this._parent` 将改为 `this.$parent`。_

下一篇： [组件间通信](./comm.html)

---
title: 组件封装
type: guide
order: 3.6
version: 0.10
---

# 组件封装

经常我们会发现 Weex 的 `<template>` 中有很多可复用的部分，这时候我们可以将其封装成上层的自定义组件并重用。例如我们可以直接创建一个名为 `foo.we` 的文件，`<foo>` 就是自定义组件的组件名称：

```html
<!-- foo.we -->
<template>
  <div style="flex-direction: row;">
    <image src="{{image}}"></image>
    <text>{{title}}</text>
  </div>
</template>
<script>
  var env = 'foo'
  module.exports = {
    data: {
      title: null,
      image: null
    }
  }
</script>
```

`foo.we` 的也包含 `<template>`，`<style>` 和 `<script>`，定义好了后，直接用 `<foo>` 标签即可将其引入到其它组件的 `<template>` 中，并且在 `<foo>` 标签上设置其 `data` 同名的特性会将这个值赋给 `<foo>` 的上下文：

_注意事项：由于 HTML 语法中特性名是不区分大小写的，所以您无法直接用驼峰命名，我们提供了 hyphenated 语法，在解析之后这些名称会自动转换为驼峰命名 (比如在 `<template>` 的组件特性里用 `aaa-bbb-ccc` 表示其 `data` 或上下文里的 `aaaBbbCcc`)。_

```html
<!-- bar.we -->
<template>
  <foo title="..." image="..."></foo>
</template>
<script>
  var env = 'bar'
</script>
```

_注意事项：这里 `bar.we` 和 `foo.we` 必须在同目录下才能自动建立依赖关系。_

_注意事项：`foo.we` 文件的 `<script>` 具有相对独立的作用域，不会和 `bar.we` 中的 `<script>` 产生干扰。同时 `<foo>` 对象具有相对独立的子组件上下文，即 `this`，也包括其定义的完全不同的数据和方法。_

## 组件嵌套

自定义组件也支持嵌套，如下：

```html
<!-- somepath/foo.we -->
<template>
  <div style="flex-direction: row;">
    <image src="{{image}}"></image>
    <text>{{title}}</text>
  </div>
</template>
<script>
  module.exports = {
    data: {
      // These keys must be declared explicitly here
      // or data-binding will not work from its parent.
      title: null,
      image: null
    }
  }
</script>
```

```html
<!-- samepath/foo.list.we -->
<template>
  <div>
    <text>{{description}}</text>
    <foo repeat="item in list" title="{{item.text}}" image="{{item.img}}"></foo>
  </div>
</template>
<script>
  module.exports = {
    data: {
      description: '',
      // This key must be declared explicitly here
      // or data-binding will not work from its parent.
      list: []
    }
  }
</script>
```

```html
<!-- samepath/main.we -->
<template>
  <foo-list list="{{list}}"></foo-list>
</template>
<script>
  module.exports = {
    data: {
      list: [
        {text: '...', img: '...'},
        {text: '...', img: '...'},
        {text: '...', img: '...'},
        ...
      ]
    }
  }
</script>
```

这里的 `main.we` 嵌套了 `<foo-list>`，`<foo-list>` 嵌套了 `<foo>`，同时组件可以正常的配合数据绑定、`repeat` 特性等使用。

## 更多子组件的定义和书写方式

除了在主文件同目录下创建和被封装组件同名的 `we` 文件之外，Weex 还支持另外几种子组件的书写方式：

* 在 `<script>` 中通过 `require` 其它目录的 `we` 文件定义同名组件
* 在主文件下新增 `<element name="xxx">` 标签，`name` 特性的值为新创建的组件名，其 `<element>` 内部的内容是定义该组件的代码

比如：

```html
<!-- path-a/main.we -->
<element name="foo">
  <text>Foo</text>
</element>

<template>
  <div>
    <foo></foo>
    <bar></bar>
  </div>
</template>

<script>
  require('path-b/bar.we')
</script>
```

```html
<!-- path-b/bar.we -->
<template>
  <text>Bar</text>
</template>
```

这样的话，`path-a/main.we` 最终展示的结果是“Foo”和“Bar”两段文本。

## 注意事项

- 组件各自的 `<style>` 是相互独立的，不会担心不同组件中相同的 class name 相互干扰。
- 如果自定义组件在父组件中有 `id` 特性，则可以在父组件上下文中通过 `this.$vm(id)` 接口来访问该自定义组件的上下文，也可以通过 `this.$el(id)` 来找到其背后真实的原生组件。更多详见[获取子组件信息](./id.html)
- 自定义组件之间通信的问题可以参考[组件间通信](./comm.html)
- 不论通过父组件把数据传递进来还是在当前组件内部对数据发起修改，只有在组件的 `data` 选项中明确写明的字段才会被正常的监听。
- 任何组件目前均不支持自闭合标签的写法，请勿使用。

下一节：[获取子组件信息](./id.html)

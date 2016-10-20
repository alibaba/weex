# 组件封装
<span class="weex-version">0.4</span>

经常我们会发现很多可复用的 weex 文件，这时候可以封装成 weex 组件。我们可以直接创建一个名为`foo.we`的文件，`<foo>`就是组件名。

```html
<!-- foo.we -->
<template>
  <container style="flex-direction: row;">
    <image src="{{image}}" style="width:100;height:100;"></image>
    <text>{{title}}</text>
  </container>
</template>
<script>
  module.exports = {
    data: {
      title: null,
      image: null
    }
  }
</script>
```
`foo.we` 的也包含 `<template>`，`<style>` 和 `<script>`，定义好了后，直接用`<foo>`标签即可, 注意这里`bar.we`和`foo.we`是在同目录下哦，如下：

```html
<template>
  <foo title="..." image="..."></foo>
</template>
```

## 组件嵌套

封装好的组件也支持嵌套，如下：

```html
<!-- somepath/foo.we -->
<template>
  <container style="flex-direction: row;">
    <image src="{{image}}"></image>
    <text>{{title}}</text>
  </container>
</template>
<script>
  module.exports = {
    data: {
      // 这几个 key 必须明确写好，不论是上层数据传递下来还是内部修改数据才会被正常监听
      title: null,
      image: null
    }
  }
</script>
```

```html
<!-- somepath/foo-list.we -->
<template>
  <container>
    <text>{{description}}</text>
    <foo repeat="{{list}}" title="{{text}}" image="{{img}}"></foo>
  </container>
</template>
<script>
  module.exports = {
    data: {
      description: '',
      // 因为上层组件会通过 list 向下传递数据，所以这里需要把字段明确写好
      list: []
    }
  }
</script>
```

```html
<!-- somepath/main.we -->
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

`main.we`嵌套了`<foo-list>`, `<foo-list>`嵌套了`<foo>`。

## 注意事项

- 每个封装好的组件都有一个独立的`<style>`
- 如果子组件有 `id` 属性，可以通过`this.$vm(id)`来访问子组件的上下文，并可以通过`this.$el(id)`来找节点。更多详见 [如何找节点](./id.md).
- 更多模块间通信问题可以参考[ 组件间如何通信](./comm.md)
- 只有在 `data` 选项中明确写明的 `key` 才会被数据监听，不论是基于上层数据传递下来的场景还是内部修改数据的时候

下一篇：[如何找节点](./id.md).

#  Events
<span class="weex-version">0.4</span>

weex 允许对`<template> `中的元素绑定事件处理器。属性名称是以`on...`为前缀加事件类型 和处理函数名。例如：`onclick="handler"`

```html
<template>
  <image onclick="handler" ...></image>
</template>

<script>
  module.exports = {
    methods: {
      handler: function (e) {
        // TODO
      }
    }
  }
</script>
```

当用户点击图片时，`<script>` 中定义的`handler` 函数将被执行。

## 添加参数
<span class="weex-version">0.5</span>

除了使用方法名外，你也可以自定义入参。

例如：
```html
<template>
  <image onclick="handler('arg1', $event)" ...></image>
</template>

<script>
  module.exports = {
    methods: {
      handler: function (arg1, e) {
        // TODO
      }
    }
  }
</script>
```

## 事件对象

当一个事件函数被调用，它会收到的第一个参数就是事件对象。每个事件对象包含一下属性。

* `type`: 事件名称, 如: `click`
* `target`: 目标元素
* `timestamp`: 事件触发的时间戳

接下来，请看[显示逻辑控制器](./display-logic.md).

---
title: <switch>
type: references
order: 2.12
version: 2.1
---

# &lt;switch&gt;

<span class="weex-version">v0.6.1+</span>

`<switch>` 是 Weex 的内置组件，用来创建与 iOS 一致样式的按钮。例如，在 iPhone 中的设置应用中的飞行模式按钮就是一个 switch 按钮。

## 子组件

`<switch>` 组件**不支持**任何子组件。

## 特性

- `checked {boolean}`：默认值为 `false`，表明按钮是否开启 is on or not.
- `disabled {boolean}`：默认值为 `false`，表明是否激活按钮

## 样式

值得注意的是，在这个组件上，有些样式组件属性**不能使用**，它们是：

- `width`
- `height`
- `min-width`
- `min-height`
- `margin`
- `padding`
- `border`

**注意：**

如果 `<switch>` 的容器没有设置为 `align-items：flex-start`，则 Android 中的开关将被拉伸。

- 通用样式

  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- `change`：改变开关状态时触发该事件。

  事件中 event 对象属性：

  - `value`: 组件布尔值真或假。
  - `timestamp`: 事件的时间戳。

- 通用事件

  支持所有通用事件：

  - `click`
  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)

## 示例

```html
<template>
  <div>
    <div class="example">
      <text class="label">normal</text>
      <switch></switch>
    </div>
    <div class="example">
      <text class="label">checked</text>
      <switch checked="true"></switch>
    </div>
    <div class="example">
      <text class="label">disabled</text>
      <switch disabled="true" checked="true"></switch>
      <switch disabled="true"></switch>
    </div>
    <div class="example">
      <text class="label">onchange</text>
      <switch @change="onchange"></switch>
      <text class="info">{{checked}}</text>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checked: false
      }
    },
    methods: {
      onchange (event) {
        console.log(`onchage, value: ${event.value}`)
        this.checked = event.value
      }
    }
  }
</script>

<style scoped>
  .example {
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 60px;
  }
  .label {
    font-size: 40px;
    line-height: 60px;
    width: 350px;
    color: #666;
    text-align: right;
    margin-right: 20px;
  }
  .info {
    font-size: 30px;
    line-height: 60px;
    color: #BBB;
    margin-left: 10px;
  }
</style>
```

[try it](../../../examples/switch.html)

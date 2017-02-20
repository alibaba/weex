---
title: <input>
type: references
order: 2.5
version: 2.1
---

# &lt;input&gt;

Weex 内置的 `<input>` 组件用来创建接收用户输入字符的输入组件。 `<input>` 组件的工作方式因 `type` 属性的值而异，比如 `<text>`， `password`，`url`，`email`，`tel` 等。

**注意：** 

此组件不支持 `click` 事件。请监听 `<input>` 或 `change` 来代替 `click` 事件。

## 子组件

不支持子组件。

## 特性

- `type {string}`：控件的类型，默认值是 `<text>`。`type` 值可以是 `text`，`password`，`url`，`email`，`tel` 。每个 `type` 值都符合 W3C 标准。
- `value {string}`：组件的接收到的输入字符。
- `placeholder {string}`：提示用户可以输入什么。 提示文本不能有回车或换行。
- `disabled {boolean}`：布尔类型的数据，表示是否支持输入。通常 `click` 事件在 `disabled` 控件上是失效的。
- `autofocus {boolean}`：布尔类型的数据，表示是否在页面加载时控件自动获得输入焦点。
- `maxlength {nubmer}`：<sup class="wx-v">v0.7</sup>一个数值类型的值，表示输入的最大长度。

## 样式

- `placeholder-color {color}`：placeholder 字符颜色。默认值是 `#999999`


- 伪类<span class="api-version">v0.9.5+</span>: `input` 支持以下伪类：

  * `active`
  * `focus`
  * `disabled`
  * `enabled`

- text styles
  - 支持 `color`
  - 支持 `font-size`
  - 支持 `font-style`
  - 支持 `font-weight`
  - 支持 `text-align`

  查看 [文本样式](../text-style.html)

- 通用样式：支持所有通用样式
  - 盒模型
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- `input`: 输入字符的值更改。

  事件中 event 对象属性：

  - `value`: 触发事件的组件；
  - `timestamp`: 事件发生时的时间戳。

- `change`: 当用户输入完成时触发。通常在 `blur` 事件之后。

  事件中 event 对象属性：

  - `value`: 触发事件的组件；

  - `timestamp`: 事件发生时的时间戳。

- `focus`: 组件获得输入焦点。

  事件中 event 对象属性：

  - `timestamp`: 事件发生时的时间戳。

- `blur`: 组件失去输入焦点。

  事件中 event 对象属性：

  - `timestamp`: 事件发生时的时间戳。

- 通用事件

  **注意：**
  不支持 `click` 事件。 请监听 `input` 或 `change` 事件代替。

  支持以下通用事件：

  - `longpress`
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)



## Methods

- `focus()` <span class="api-version">v0.9+</span>

  `focus()` 方法用于将 `input` 组件聚焦。

- `blur()` <span class="api-version">v0.9+</span>

  `blur()` 方法用于从 `input` 组件中移除焦点并关闭软键盘（如果它具有焦点）。

## 约束

目前不支持 `this.$el(id).value = ''` 这种方式改写 input value。只支持在 `<input>` 组件的 `input`、`change` 事件中改写。

## 示例

```html
<template>
  <div class="wrapper">
    <input ref="input" class="input" type="text" @input="oninput" @change="onchange" @focus="onfocus" @blur="onblur">
  </div>
</template>

<script>
  const modal = weex.requireModule('modal')

  export default {
    methods: {
      oninput (event) {
        console.log('oninput:', event.value)
        modal.toast({
          message: `oninput: ${event.value}`,
          duration: 0.8
        })
      },
      onchange (event) {
        console.log('onchange:', event.value)
        modal.toast({
          message: `onchange: ${event.value}`,
          duration: 0.8
        })
      },
      onfocus (event) {
        console.log('onfocus:', event.value)
        modal.toast({
          message: `onfocus: ${event.value}`,
          duration: 0.8
        })
      },
      onblur (event) {
        console.log('onblur:', event.value)
        modal.toast({
          message: `input blur: ${event.value}`,
          duration: 0.8
        })
      }
    }
  }
</script>

<style>
  .input {
    font-size: 50px;
    width: 650px;
    margin-top: 50px;
    margin-left: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    color: #666666;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
</style>
```

[try it](../../../examples/input.html)

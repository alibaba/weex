---
title: <textarea>
type: references
order: 2.14
version: 2.1
---

# &lt;textarea&gt;

<span class="weex-version">v0.8+</span>

`textarea` 是 Weex 内置的一个组件，用于用户交互，接受用户输入数据。 可以认为是允许多行的 `<input>`

**Notes:** `<textarea>`支持 `<input>` 支持的所有的事件。

## 子组件

`textarea` 组件不支持子组件。

## 特性

- `value {string}`：组件的接收到的输入字符。
- `placeholder {string}`：提示用户可以输入什么。 提示文本不能有回车或换行。
- `disabled {boolean}`：表示是否支持输入。通常 `click` 事件在 `disabled` 控件上是失效的。
- `autofocus {boolean}`：表示是否在页面加载时控件自动获得输入焦点。
- `rows {number}`：接收 number 类型的数据，指定组件的高度，默认值是 2

## 样式

- 伪类<span class="api-version">v0.9.5+</span>: `textarea` 支持以下伪类：

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

## 示例

```html
<template>
  <div class="wrapper">
    <textarea class="textarea" @input="oninput" @change="onchange" @focus="onfocus" @blur="onblur"></textarea>
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
  .textarea {
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

[try it](../../../examples/textarea.html)

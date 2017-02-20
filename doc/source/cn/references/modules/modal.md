---
title: modal
type: references
order: 3.4
version: 2.1
---

# `modal` 模态

`modal` 模块提供了以下展示消息框的 API：`toast`、`alert`、`confirm` 和 `prompt`。

## API

### `toast(options)`

`toast()` 会在一个小浮层里展示关于某个操作的简单反馈。例如，在邮件发送前离开邮编编辑界面，可以触发一个“草稿已保存”的 toast，告知用户以后可以继续编辑。toast 会在显示一段时间之后自动消失。

#### 参数

- `options {Object}`：相关选项
  - `message {string}`：展示的内容
  - `duration {number}`：展示的持续时间（以秒为单位）

### `alert(options, callback)`

警告框经常用于确保用户可以得到某些信息。当警告框出现后，用户需要点击确定按钮才能继续进行操作。

#### 参数

- `options {Object}`：alert选项
  - `message {string}`：警告框内显示的文字信息
  - `okTitle {string}`：确定按钮上显示的文字信息，默认是“OK”
  - `callback {Function}`：用户操作完成后的回调

### `confirm(options, callback)`

确认框用于使用户可以验证或者接受某些信息。当确认框出现后，用户需要点击确定或者取消按钮才能继续进行操作。

#### 参数

- `options {object}`：confirm 选项
  - `message {string}`：确认框内显示的文字信息
  - `okTitle {string}`：确认按钮上显示的文字信息，默认是 `OK`
  - `cancelTitle {string}`：取消按钮上显示的文字信息，默认是 `Cancel`
- `callback {function (result)}`：用户操作完成后的回调，回调函数的参数 `result` 是确定按钮上的文字信息字符串

### `prompt(options, callback)`

提示框经常用于提示用户在进入页面前输入某个值。当提示框出现后，用户需要输入某个值，然后点击确认或取消按钮才能继续操作。

#### 参数

- `options {object}`：prompt 选项
  - `message {string}`：提示框内要显示的文字信息
  - `okTitle {string}`：确认按钮上显示的文字信息，默认是 `OK`
  - `cancelTitle {string}`：取消按钮上显示的文字信息，默认是 `Cancel`
- `callback {function (ret)}`：用户操作完成后的回调，回调函数的参数 `ret` 格式形如 `{ result: 'OK', data: 'hello world' }`，如下
  - `result {string}`：用户按下的按钮上的文字信息
  - `data {string}`：用户输入的文字信息


## Example

```html
<template>
  <div class="wrapper">
    <text class="button" @click="showToast">Toast</text>
    <text class="button" @click="showAlert">Alert</text>
    <text class="button" @click="showConfirm">Confirm</text>
    <text class="button" @click="showPrompt">Prompt</text>
  </div>
</template>

<script>
  var modal = weex.requireModule('modal')

  export default {
    methods: {
      showToast (event) {
        console.log('will show toast')
        modal.toast({
          message: 'This is a toast',
          duration: 0.3
        })
      },
      showAlert (event) {
        console.log('will show alert')
        modal.alert({
          message: 'This is a alert',
          duration: 0.3
        }, function (value) {
          console.log('alert callback', value)
        })
      },
      showConfirm (event) {
        console.log('will show confirm')
        modal.confirm({
          message: 'Do you confirm ?',
          duration: 0.3
        }, function (value) {
          console.log('confirm callback', value)
        })
      },
      showPrompt (event) {
        console.log('will show prompt')
        modal.prompt({
          message: 'This is a prompt',
          duration: 0.3
        }, function (value) {
          console.log('prompt callback', value)
        })
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .button {
    font-size: 60px;
    width: 450px;
    text-align: center;
    margin-top: 30px;
    margin-left: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    color: #666666;
    border-color: #DDDDDD;
    background-color: #F5F5F5
  }
</style>
```

[try it](../../../examples/modal.html)

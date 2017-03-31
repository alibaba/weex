---
title: modal
type: references
order: 4.4
version: 0.10
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

#### 示例

```html
<template>
  <div style="height: 200px; width: 400px; background-color: #00bfff;
    justify-content: center; align-items: center" onclick="{{perform}}">
    <text style="font-size: 60px; color: #ffffff">Toast</text>
  </div>
</template>

<script>
  module.exports = {
    methods: {
      perform: function () {
        var modal = require('@weex-module/modal');
        modal.toast({
          'message': 'I am a toast',
          'duration': 3
        });
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/a1b8699c49d1cbb3d0de66c1c5175387)

### `alert(options, callback)`

警告框经常用于确保用户可以得到某些信息。当警告框出现后，用户需要点击确定按钮才能继续进行操作。

#### 参数

- `options {Object}`：alert选项
  - `message {string}`：警告框内显示的文字信息
  - `okTitle {string}`：确定按钮上显示的文字信息，默认是“OK”
  - `callback {Function}`：用户操作完成后的回调

#### 示例

```html
<template>
  <div>
    <div style="height: 200px; width: 400px; background-color: #00bfff;
      justify-content: center; align-items: center" onclick="{{perform}}">
      <text style="font-size: 60px; color: #ffffff">Alert</text>
    </div>
    <text>{{params}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      params: ''
    },
    methods: {
      perform: function () {
        var modal = require('@weex-module/modal');
        var self = this;
        modal.alert({
          'message': 'I am alert message',
          'okTitle': 'YES'
        }, function (result) {
          self.params = String(result)
        });
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/18e2a4bdff4d2f7db865c11eadfcd13e)

### `confirm(options, callback)`

确认框用于使用户可以验证或者接受某些信息。当确认框出现后，用户需要点击确定或者取消按钮才能继续进行操作。

#### 参数

- `options {object}`：confirm 选项
  - `message {string}`：确认框内显示的文字信息
  - `okTitle {string}`：确认按钮上显示的文字信息，默认是 `OK`
  - `cancelTitle {string}`：取消按钮上显示的文字信息，默认是 `Cancel`
- `callback {function (result)}`：用户操作完成后的回调，回调函数的参数 `result` 是确定按钮上的文字信息字符串

#### 示例

```html
<template>
  <div>
    <div style="height: 200px; width: 400px; background-color: #00bfff;
      justify-content: center; align-items: center" onclick="{{perform}}">
      <text style="font-size: 60px; color: #ffffff">Confirm</text>
    </div>
    <text>{{params}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      params: ''
    },
    methods: {
      perform: function () {
        var modal = require('@weex-module/modal');
        var self = this;
        modal.confirm({
          'message': 'I have read and accept the terms.',
          'okTitle': 'YES',
          'cancelTitle': 'NO'
        }, function (e) {
          self.params = String(e)
        });
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/3534b9d5eac99045015d97b20af22c27)

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

### 示例

```html
<template>
  <div>
    <div style="height: 200px; width: 400px; background-color: #00bfff;
      justify-content: center; align-items: center" onclick="{{perform}}">
      <text style="font-size: 60px; color: #ffffff">Prompt</text>
    </div>
    <text>{{params}}</text>
  </div>
</template>

<script>
  module.exports = {
    data: {
      params: ''
    },
    methods: {
      perform: function () {
        var modal = require('@weex-module/modal');
        var self = this;
        modal.prompt({
          'message': 'I am a prompt',
          'okTitle': 'YES',
          'cancelTitle': 'NO'
        }, function (e) {
          self.params = JSON.stringify(e)
        });
      }
    }
  }
</script>
```

[体验一下](http://dotwe.org/9f089100f5808dbc55ef4872a2c0c77b)

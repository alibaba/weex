---
title: clipboard
type: references
order: 4.2
version: 0.10
---

# `clipboard` 剪切板
<span class="weex-version">v0.8+</span>

我们可以通过 `clipboard` 模块的 `getString()`、`setString()` 接口从系统的粘贴板获取内容或者设置内容。

以前当我们收到一条短信验证码信息时，除了人肉拷贝，我们无法获取拷贝短信的内容。这是非常苦恼的。但是现在我们可以通过简单的调用 `clipboard.getString()` 接口来获取短信内容了。

## 示例

```html
<template>
  <div>
      <div class="div">
        <text class="text" onclick="onItemClick">hello {{message}}</text>
      </div>
      <div class="div">
        <text class="text" onclick="setContent">click me to set: {{tobecopied}}</text>
      </div>
  </div>
</template>

<script>
  var clipboard = require('@weex-module/clipboard');
  module.exports ={
    data:{
      tobecopied:'yay!',
      message:"nothing."
    },
    methods:{
      setContent:function(e){
        clipboard.setString(this.tobecopied);
      },
      onItemClick:function(e){
        this.message='clicked! ';
        clipboard.getString(function(ret) {
          this.message = 'text from clipboard:'+ ret;
        }.bind(this));
      }
    }
  }
</script>

<style>
  .div {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 750;
    height: 90;
    padding-left:30;
    padding-right:30;

    border-bottom-width: 1;
    border-style: solid;
    border-color: #dddddd;
  }
  .text {
    width: 750;
    height: 90;
  }
</style>
```

[体验一下](http://dotwe.org/b6a9d613462d85dce56f81085b094dfa)

**注意**

* 仅支持文本拷贝
* 出于安全考虑和平台限制，只支持 Android 和 iOS，不支持 html5。

## API

### `getString(callback)`

从系统粘贴板读取内容。

#### 参数

* `callback {function (ret)}`：执行完读取操作后的回调函数。`ret {Object}` 为 `callback` 函数的参数，有两个属性：
  - `ret.data`：获取到的文本内容；
  - `ret.result`：返回状态，可能为 `success` 或 `fail`。

#### 示例

```javascript
var clipboard = require('@weex-module/clipboard');
clipboard.getString(function(ret) {
  console.log("text from clipboard： " + ret.data);
});
```

### `setString(text)`

将一段文本复制到剪切板，相当于手动复制文本。

#### 参数

* `text {string}`：要复制到剪切板的字符串。

#### 示例

```javascript
var clipboard = require('@weex-module/clipboard');
clipboard.setString("SomeStringHere");
```

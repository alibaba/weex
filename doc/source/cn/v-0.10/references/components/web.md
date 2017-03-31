---
title: <web>
type: references
order: 2.15
version: 0.10
---

# &lt;web&gt;

<span class="weex-version">v0.5+</span>

使用 `<web>` 组件在 Weex 页面中嵌入一张网页内容。`src` 属性用来指定资源地址。你也可以使用 `webview module` 来控制 `web` 的行为，比如前进、后退和重载。可以在这里查看 [`webview` module](../modules/webview.html)。

## 子组件

不支持子组件。

## 特性

- `src {string}`：此特性指定嵌入的 web 页面 url。

## 样式

- 通用样式：不支持部分盒模型样式，支持列表如下：

  - `width`

    组件的宽度，默认值是0。这个样式定义必须指定数值。
    
  - `height`

    组件的高度，默认值是0。这个样式定义必须指定数值。
    
  - `flexbox` 布局
  - `position`
  - `opacity`
  - `background-color`

  查看 [组件通用样式](../common-style.html)

## 事件

- `pagestart`: `<web>` 组件开始加载时发送此事件消息。
- `pagefinish`: `<web>` 组件完成加载时发送此事件消息。
- `error`: 如果 `<web>` 组件加载出现错误，会发送此事件消息。

- 通用事件

  支持以下通用事件：
  - `appear`
  - `disappear`

  查看 [通用事件](../common-event.html)

**注意：**

不支持 `click` 事件。

## 示例

我们用一个简易浏览器示例，来展示如何使用 `<web>` 组件和 `webview` module。 查看 [webview module](../modules/webview.html)。

```html
<template>
  <div class="browserStyle">
    <div style="flex-direction: row">
      <input id="urlInput" type="url"  autofocus="false"  placeholder="input url" onchange="change" oninput="input" class="textStyle"   value="https://www.baidu.com">
      </input>
    </div>
    <div style="flex-direction: row">
      <text class="buttonSytle" onclick="loadURL">LoadURL</text>
      <text class="buttonSytle" onclick="backforward">Backward</text>
      <text class="buttonSytle"  onclick="forward">Forward</text>
    </div>
    <div>
      <web id="webview" src="{{src}}" class="webStyle"></web>
    </div>
  </div>
</template>

<style>
  .browserStyle {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color:#778899 ;
  }

  .textStyle {
    width: 750;
    height: 50;
    background-color: #D3D3D3;
    font-size: 30;
  }

  .buttonSytle {
    width:200;
    height: 50;
    background-color: #D3D3D3;
    margin:10;
    padding-left: 5;
    padding-right: 5;
    font-size: 30;
  }

  .webStyle {
    width: 750;
    height: 800;
    background-color: #8B0000;
  }
</style>

<script>
  var web_module = require('@weex-module/webview')

  module.exports = {
    data: {
      src : "https://h5.m.taobao.com",
    },

    methods: {
      loadURL: function (e) {
        var input = this.$el("urlInput");
        this.src = input.attr.value;
      },

      backforward: function (e) {
        var web_element = this.$el('webview');
        web_module.goBack(web_element);
      },

      forward: function (e) {
        var web_element = this.$el('webview');
        web_module.goForward(web_element);
       }
    }
  }
</script>
```

[体验一下](http://dotwe.org/84741a6befeb0f1e5ce11b47ecf1123f)

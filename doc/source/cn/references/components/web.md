---
title: <web>
type: references
order: 2.16
version: 2.1
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
  <div class="wrapper">
    <div class="group">
      <input class="input" ref="input" type="url" autofocus="false" value="https://m.taobao.com"></input>
    </div>
    <div class="group">
      <text class="button" @click="loadURL">LoadURL</text>
      <text class="button" @click="reload">reload</text>
    </div>
    <web ref="webview" :src="url" class="webview" @pagestart="start" @pagefinish="finish" @error="error"></web>
  </div>
</template>

<script>
  const webview = weex.requireModule('webview')
  const modal = weex.requireModule('modal')

  export default {
    data () {
      return {
        url : 'https://m.alibaba.com'
      }
    },
    methods: {
      loadURL (event) {
        this.url = this.$refs.input.value
        modal.toast({ message: 'load url:' + this.url })
        setTimeout(() => {
          console.log('will go back.')
          modal.toast({ message: 'will go back' })
          webview.goBack(this.$refs.webview)
        }, 10000)
      },
      reload (event) {
        console.log('will reload webview')
        modal.toast({ message: 'reload' })
        webview.reload(this.$refs.webview)
      },
      start (event) {
        console.log('pagestart', event)
        modal.toast({ message: 'pagestart' })
      },
      finish (event) {
        console.log('pagefinish', event)
        modal.toast({ message: 'pagefinish' })
      },
      finish (event) {
        console.log('error', event)
        modal.toast({ message: 'error' })
      }
    }
  }
</script>

<style scoped>
  .group {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
  }
  .input {
    width: 600px;
    font-size: 36px;
    padding-top: 15px;
    padding-bottom: 15px;
    border-width: 2px;
    border-style: solid;
    border-color: #BBBBBB;
  }
  .button {
    width: 225px;
    text-align: center;
    background-color: #D3D3D3;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 30px;
    font-size: 30px;
  }

  .webview {
    margin-left: 75px;
    width: 600px;
    height: 750px;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
</style>
```

[try it](../../../examples/web.html)

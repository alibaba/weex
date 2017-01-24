---
title: webview
type: references
order: 3.8
version: 2.1
---

# `webview`

一系列的 `<web>` 组件操作接口。 比如 `goBack`、`goForward`、和 `reload`。`webview` module 与 `<web>` 组件共用。

## 示例

查看 [简单浏览器](../components/web.html) ，一个结合 `<web>` 组件和 `webview` module 的示例。

## API

### `goBack(webElement)`

加载历史记录里的前一个资源地址。

#### 参数

* `webElement {Element}`：`<web>` 组件对象。

### `goForward(webElement)`

加载历史记录里的下一个资源地址。

#### 参数

* `webElement {Element}`：`<web>` 组件对象。

### `reload(webElement)`

刷新当前页面。

#### 参数

* `webElement {Element}`：`<web>` 组件对象。

*注意事项：未来 `<web>` 组件的 `Element` 对象将会支持直接这些方法，届时 `webview` module 将不再需要*

## Example

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

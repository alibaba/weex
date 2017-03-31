---
title: webview
type: references
order: 3.9
version: 2.1
---

# webview

A series of web operation api like `goBack`, `goForward`, and `reload`. 'webview' module used with the web component.

## API

### goBack(webElement)

Loads the previous location in the history stack.

**Arguments**

* webElement(web): the element of the web component.

#### Example

```
var webview = weex.requireModule('webview');
var webElement = this.$el('webview');
webview.goBack(webElement);
```

### goForward(webElement)

Loads the next location in the history stack.

**Arguments**

* webElement(web): the element of the web component.

#### Example

```
var webview = weex.requireModule('webview');
var webElement = this.$el('webview');
webview.goForward(webElement);
```

### reload(webElement)

Reloads the current web page.

**Arguments**

* webElement(web): the element of the web component.

#### Example

```
var webview = weex.requireModule('webview');
var webElement = this.$el('webview');
webview.reload(webElement.ref);
```

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

[try it](../../examples/web.html)
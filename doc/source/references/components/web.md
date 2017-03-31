---
title: <web>
type: references
order: 2.15
version: 2.1
---

# &lt;web&gt;
<span class="weex-version">v0.5+</span>

Use web component to display any web content in the weex page. The `src`attribute is used to specify a special source. You also can use `webview` module to control some web operation such as goBack,goForward and reload. see [webview module](../modules/webview.html).For example,You can use web component and webview module to assemble a browser.

## Child Components

This component supports no child components.

## Attributes

**src**(string): this attribute specifies the page source to load.

## Styles

**width**(float): the width of the component, default value is 0. This style must be specified.

**height**(float): the height of the component, default value is 0. This style must be specifed.


### common styles

check out the [common styles](../common-style.html).

support flexbox related styles
support box model related styles
support `position` related styles

## Events

**pagestart**: sent after the web component starts loading a page.
**pagefinish**: sent after the web component finishes loading a page.
**error**: sent if the web component failed to load a page.

### common events

support `appear` / `disappear` event.

Check out [common events](../common-event.html)

### Notes
not support `click` event. 

## Example

We use a simple Browser Demo to show how to use web component and webview module. Check out [webview module](../modules/webview.html).


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
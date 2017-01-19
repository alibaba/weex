---
title: webview
type: references
order: 3.9
version: 0.10
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
var webview = require('@weex-module/webview');
var webElement = this.$el('webview');
webview.goBack(webElement);
```

### goForward(webElement)

Loads the next location in the history stack.

**Arguments**

* webElement(web): the element of the web component.

#### Example

```
var webview = require('@weex-module/webview');
var webElement = this.$el('webview');
webview.goForward(webElement);
```

### reload(webElement)

Reloads the current web page.

**Arguments**

* webElement(web): the element of the web component.

#### Example

```
var webview = require('@weex-module/webview');
var webElement = this.$el('webview');
webview.reload(webElement.ref);
```

## Example

```html
<template>
  <div class="browserStyle">
    <div style="flex-direction: row">
      <input id="urlInput" type="url"  autofocus="false"  placeholder="..."  class="textStyle" value="{{input_text}}" oninput="input">
      </input>
    </div>
    <div style="flex-direction: row">
      <wxc-button value="LoadURL"  class="buttonSytle" size="small" onclick="loadURL"></wxc-button>
      <wxc-button value="Backward" class="buttonSytle" size="small" onclick="backforward"></wxc-button>
      <wxc-button value="Forward" class="buttonSytle" size="small" onclick="forward"></wxc-button>
    </div>
    <div>
      <web id="webview" src="{{src}}" class="webStyle"></web>
    </div>
  </div>
</template>

<style>

  .browserStyle
  {
    width:600;
    height: 825;
    background-color:#778899 ;
  }

  .textStyle
  {
    width:600;
    height: 50;
    background-color: #D3D3D3;
  }

  .buttonSytle
  {
    width:180;
    height: 50;
    font-size: 12;
    background-color: #D3D3D3;
    margin:10;
    padding-left: 5;
    padding-right: 5;
  }

  .webStyle
  {
    width:600;
    height: 700;
    background-color: #8B0000;
  }

</style>

<script>

  var web_module = require('@weex-module/webview');

  module.exports = {
    data: {
      src : "https://h5.m.taobao.com",
      input_text:"https://www.tmall.com"
    },

    methods: {

      loadURL: function (e) {
        var web_element = this.$el('webview');
        var input = this.$el("urlInput");
        this.src = this.input_text;
        web_module.reload(web_element);
      },

      backforward: function (e) {
        var web_element = this.$el('webview');
        web_module.goBack(web_element);
        this.input_text = web_element.attr.src;
      },

      forward: function (e) {
        var web_element = this.$el('webview');
        web_module.goForward(web_element);
        this.input_text = web_element.attr.src;
      },
      input:function (e) {
        var input = this.$el("urlInput");
        this.input_text = input.attr.value;
      }

    }
  }
</script>
```

[Try it](http://dotwe.org/103d472645206cc1564f49717585abb4)



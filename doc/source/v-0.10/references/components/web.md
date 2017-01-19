---
title: <web>
type: references
order: 2.15
version: 0.10
---

# &lt;web&gt;
<span class="weex-version">v0.5+</span>

Use web component to display any web content in the weex page. The `src`attribute is used to specify a special source. You also can use `webview` module to control some web operation such as goBack,goForward and reload. see [webview module](https://alibaba.github.io/weex/doc/modules/webview.html).For example,You can use web component and webview module to assemble a browser.

## Child Components

This component supports no child components.

## Attributes

**src**(string): this attribute specifies the page source to load.

Other attributes please check out the [common attributes](../common-attrs.html).

## Styles

**width**(float): the width of the component, default value is 0. This style must be specified.

**height**(float): the height of the component, default value is 0. This style must be specifed.


### common styles

check out the [common styles](../common-attrs.html).

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

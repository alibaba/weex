---
title: <text>
type: references
order: 2.12
version: 0.10
---

# &lt;text&gt;

The weex builtin component 'text' is used to render text with specified style rule. <text> tag can contain text value only. You can use variable interpolation in the text content with the mark `{% raw %}{{}}{% endraw %}`.

## Child Components

This component supports no child components.

## Attributes

* value(string): text value of this component. This is equal to the content of 'text'. 

### example

```
var textComponent = this.$el("textid");
this.text = textComponent.attr.value;
```

## Styles

* lines: specify the text lines. Default value is `0` for unlimited.
* text styles: check out [text styles](../text-style.html)

  * support 'color' style.
  * support 'font-size' style. iOS: default vlaue `32`. Android: platform specify. HTML5: default value `32`.
  * support 'font-style' style.
  * support 'font-weight' style.
  * support 'text-align' style.
  * support 'text-decoration' style.
  * support 'text-overflow' style.
  * support 'line-height'(available from v0.6.1) style. line-height in iOS is different from h5 and Android, text value will be placed at bottom of line box.
  * not support 'flex-direction, 'justify-content', 'align-items' which is active for child nodes, and text has no child nodes.

### common styles
check out [common styles for components](../common-style.html)

* support flexbox related styles.
* support box model related styles.
* support 'position' related styles.
* support 'opacity', 'background-color' etc.

## Events

### common events
check out [common events](../common-event.html)

* support 'click' event.
* support 'appear' / 'disappear' event. 

## Example

```html
<template>
  <div>
    <text>this is text content</text>
    <text value="this is text value"></text>
    <text style="text">{{price1}}</text>
    <text id="textid" onclick={{showtext}}>this is gettext content</text>
    <text value="{{text}}"></text>
  </div>
</template>

<style>
  .text {
    font-size: 24; 
    text-decoration: underline;
  }
</style>

<script>
  module.exports = {
    data: {
      price1: '99.99',
      price2: '88.88',
      text:''
    },
    methods: {
      showtext: function(event) {
        var textComponent = this.$el("textid");
        this.text = textComponent.attr.value;
      }
    }
  };
</script>
```
[Try it](http://dotwe.org/48f4d7c50245145c72c33161e2bb4325)

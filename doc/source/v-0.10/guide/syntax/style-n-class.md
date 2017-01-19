---
title: Style & Class
type: guide
order: 2.2
version: 0.10
---

# Style & Class

## The Basic Syntax

CSS style description can be viewed as a series of key-value pairs,each of which describes a particular style, such as the width and height of a component.

```css
.box {
  width: 400; 
  height: 50;
}
```

The format of key-value pairs is `prop-name: prop-value;`. The key name is `prop-name`, the value name is `prop-value`.  Usually,the key name and the value name follow Horizontal connection nomenclature, the value may be a number(the default units is px); The key and the value must be separated by `:`, between each key-value pairs must be separated by `;`.

The style description will appear on a weex page in two formats:

* Style attribute of `<template>` label
* Stylesheets of `<style>` label

### style attribute

The style written in the style label, for example:

```html
<template>
  <container style="width: 400; height: 50;">
    ...
  </container>
</template>
```

It is said that the width and height of `<container>` label is 400 pixels and 50 pixels respectively.

### the `<style>` tag

For example:

```html
<style>
  .wrapper {width: 600;}
  .title {width: 400; height: 50;}
  .highlight {color: #ff0000;}
</style>
```

The stylesheets contain multiple style rules, each style rule has only one class which is contained by its style selector, a pair of curly braces `{...}`, and the styles of the curly braces. For example:

```css
.title {
  width: 400; 
  height: 50;
}
```

The above is a rule.

### Class attribute

The selectors of `<style>` label are matched with the class attribute of `<template>` label, we should use spaces to separate the class names. For example:

```html
<template>
  <container class="wrapper">
    <text class="title">...</text>
    <text class="title highlight">...</text>
  </container>
</template>
<style>
  .wrapper {width: 600;}
  .title {width: 400; height: 50;}
  .highlight {color: #ff0000;}
</style>
```

It means that the width of the outermost container is 600px, The inside of the two title text is 400 pixels wide 50 pixels high, the second piece of text is red.

### Notes

* In order to simplify the page design and the complete underlying implementation, the width of our default screen is unified to 750 pixels, different screens should be scaled with corresponding ratio.
* The CSS standard may support a lot of selectors, but now weex only support single-class selector.
* The CSS standard can support many types of length units, but now weex only support pixel, and the `px` unit could be ignored, you can write number directly. More details can be found in [commmon styles](../../references/common-style.html).
* The styles of Weex cannot be inherited to children elements, this is different to the CSS standard, such as `color` and `font-size`.
* The CSS standard contains a lot of styles, but weex only sopport few styles which include layouts such as box model, flexbox, positions. And styles include `font-size`, `color`, etc.

## With Data-binding

Page [data](./data-binding.html) can be bound in `style` and `class` attribute. For example:

```html
<template>
  <container>
    <text style="font-size: {{fontSize}};">Alibaba</text>
    <text class="large {{textClass}}">Weex Team</text>
  </container>
</template>
<style>
  .large {font-size: 32;}
  .highlight {color: #ff0000;}
</style>
<script>
  module.exports = {
    data: {
      fontSize: 32,
      textClass: 'highlight'
    }
  }
</script>
```

Next, let's have a look at [events](./events.html).

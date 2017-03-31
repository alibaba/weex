---
title: Syntax
type: guide
order: 2
has_chapter_content: true
version: 0.10
---

# Syntax

*The syntax of Weex is deeply inspired from [Vue.js](http://vuejs.org/), an elegant JavaScript framework with component system and reactive data binding.*

A simple Weex page sample is just a piece of `<template>` code, a piece of `<style>` code and a piece of `<script>` code. The three parts together describe a whole Weex page.

- `<template>`: *required*. Just uses HTML syntax and describes the structure of a Weex page, which is build upon several tags. Each tag means a type of *component*.
- `<style>`: *optional*. Describes the presentation details, and the content is based on CSS syntax.
- `<script>`: *optional*. Describes the data and behavior with JavaScript syntax. It defines data and how these data are processed etc.

```html
<template>
  <!-- (required) the structure of page -->
</template>

<style>
  /* (optional) stylesheet */
</style>

<script>
  /* (optional) the definition of data, methods and life-circle */
</script>
```

## `<template>`

We describe page structure in `<template>` tag like the following definition:

```html
<template>
  <container>
    <image style="width: 200; height: 200;" src="http://gtms02.alicdn.com/tps/i2/TB1QHKjMXXXXXadXVXX20ySQVXX-512-512.png"></image>
    <text>Alibaba Weex Team</text>
  </container>
</template>
```

Here `container` tag is the root element of the component. `image` tag describes a picture, while `text` tag means a paragraph of text.

Just similar to HTML, each component could have its own attributes, some components also have children as their sub components.

The root element of template: In a `template` tag, there could be only one root component which has no display logics directive. Here are three types of root component we support now:

- `<container>`: a common native container
- `<scroller>`: a native scroll view
- `<list>`: a native cell-reusable list view

Only these type of components are allowed for root element.

* [See all built-in components](../../references/components/index.html).

## `<style>`

You can consider the Weex style syntax is a subset of the CSS syntax, but there is still some differences.

First we could write inline `style` attribute in `<template>` element. Second we could use the `class` attribute to apply stylesheets, which are defined with single-class selectors in `<style>` code. Here is an example:

```html
<template>
  <container>
    <text style="font-size: 64;">Alibaba</text>
    <text class="large">Weex Team</text>
  </container>
</template>

<style>
  .large {font-size: 64;}
</style>
```

Both the two `text` components above have the same `font-size`, which is `64` pixel.

* [See common styles in Weex](../../references/common-style.html)


### Notes!
weex is basically following [HTML attribute](https://en.wikipedia.org/wiki/HTML_attribute) naming rule , so please **do not use CamelCase** in your attribute , **long-name** with “-” as delimiter is much better.

## `<script>`

The syntax is JavaScript (ES5) and it describes data and behavior of a Weex page. Here we create three paragraphs:

```html
<template>
  <container>
    <text>The time is {{datetime}}</text>
    <text>{{title}}</text>
    <text>{{getTitle()}}</text>
  </container>
</template>

<script>
  module.exports = {
    data: {
      title: 'Alibaba',
      datetime: null
    },
    methods: {
      getTitle: function () {
        return 'Weex Team'
      }
    },
    created: function() {
      this.datetime = new Date().toLocaleString()
    }
  }
</script>
```

This piece of `<script>` code will generate some component options and assign it to `module.exports`. The three text components above respectively shows the current datetime, 'Alibaba' and 'Weex Team'. The `data` in the `<script>` code stores component data which could be used for [data-binding](./data-binding.html) in the `<template>`. When data changes, the bound value will be updated automatically. Also it could be read and written by `this.x` in its methods.

* [See component definitions references](../../references/component-defs.html)

Next, let's have a look at [data-binding](./data-binding.html).

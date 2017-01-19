---
title: <a>
type: references
order: 2.1
version: 2.1
---

# &lt;a&gt;

`a` defines a hyperlink to a page in the web. Its purpose and syntax is very similar to [<a>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) in HTML5.

## Child Components

This type of component supports all kinds of weex component as it's child components except for its own kind.

## Attributes

* href: href attributes defines the URL of the hyperlink.

## Styles:

### common styles

Check out the [common styles](../common-style.html)

## Events

### common events

Check out the [common events](../common-event.html)

### Notes

We can't guarantee the order of execution between onclick function and href. we recommend that do not use the click event in `a`.

## Examples

```html
<template>
  <div class="wrapper">
    <a class="button" href="http://dotwe.org/raw/dist/3e0e40f9ddad79f98cd236753965ffd8.js">
      <text class="text">Jump</text>
    </a>
  </div>
</template>

<style scoped>
  .wrapper {
    flex-direction: column;
    justify-content: center;
  }
  .button {
    width: 450px;
    margin-top: 30px;
    margin-left: 150px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: #DDDDDD;
    background-color: #F5F5F5
  }
  .text {
    font-size: 60px;
    color: #666666;
    text-align: center;
  }
</style>
```

[try it](../../examples/a.html)

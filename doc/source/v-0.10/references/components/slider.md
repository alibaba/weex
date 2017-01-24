---
title: <slider>
type: references
order: 2.9
version: 0.10
---

# &lt;slider&gt;

## Summary

A slide's player to show slides (mostly as pictures) one page by another. The default interval between two slides is 3 seconds.

## Child Components

It supports all kinds of weex components as its slides, especially the `indicator` component which can be used only as a child component of `slider`.

## Attributes

- `auto-play`: &lt;boolean&gt; `true` | `false`. This value determines whether the slides plays automatically after the page rendering finished. The default value is `false`.
- `interval`: &lt;number&gt; millisecond. This value determines time interval for each page displayed in slider.
- `index`: &lt;number&gt; . This value determines the  index of current shown slide. The default value is `0`.

Other attributes please check out the [common attributes](../references/common-attrs.html).

## Styles

**common styles**: check out [common styles for components](../references/common-style.html)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

## Events

- `change`: triggerd when the slide's index is changed. The event object contains the attribute of `index`, which is the index number of the currently shown slide.

**common events**: check out the [common events](../references/common-event.html)

- support `click` event. Check out [common events](../references/common-event.html)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.html)

### Example

```html
<template>
  <div>
    <slider class="slider" interval="3000" auto-play="true">
      <div class="slider-pages" repeat="item in itemList">
        <image class="img" src="{{item.pictureUrl}}"></image>
        <text class="title">{{item.title}}</text>
      </div>
      <indicator class="indicator"></indicator>
    </slider>
  </div>
</template>

<style>
  .img {
    width: 714;
    height: 150;
  }
  .title {
    position: absolute;
    top: 20;
    left: 20;
    color: #ff0000;
    font-size: 48;
    font-weight: bold;
    background-color: #eeeeee;
  }
  .slider {
    flex-direction: row;
    margin: 18;
    width: 714;
    height: 230;
  }
  .slider-pages {
    flex-direction: row;
    width: 714;
    height: 200;
  }
  .indicator {
    width:714;
    height:200;
    position:absolute;
    top:1;
    left:1;
    item-color: red;
    item-selectedColor: blue;
    item-size: 20;
  }
</style>

<script>
  module.exports = {
    data: {
      itemList: [
        {itemId: '520421163634', title: 'item1', pictureUrl: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
        {itemId: '522076777462', title: 'item2', pictureUrl: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
        {itemId: '522076777462', title: 'iten3', pictureUrl: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
      ]
    }
  }
</script>
```

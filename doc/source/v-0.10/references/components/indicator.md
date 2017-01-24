---
title: <indicator>
type: references
order: 2.10
version: 0.10
---

# &lt;indicator&gt;

### Summary

This component must be used as a subcomponent of a [`slider`](./slider.html) component.

### Child Components

This component supports no child components.

### Attributes

There is no specific attribute for this component other than the [common attributes](../common-attrs.html).

### Styles

- `item-color`: &lt;colors&gt; This style attribute sets the normal item color using either a named color or a color specified in the hexadecimal #RRGGBB format.
- `item-selectedColor`: &lt;colors&gt; This style attribute sets the selected item color using either a named color or a color specified in the hexadecimal #RRGGBB format.
- `item-size`: &lt;length&gt; The size of the indicator elements, which is an float attribute.

**common styles**: check out the [common styles](../common-attrs.html)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles

**Note:** There are some specific details about the style `width` and `height` on this component: the position of indicator will not only depend on the `top`, `left`, `bottom` and `right`, but also depend on the value of `width` and `height`. Imagine there is a virtual container outside the indicator, and it inherit the `width` and `height` of the indicator. The `top`, `left`, `right` and `bottom` will always take effect on this container, not the indicator points themselves, and the indicator points will be positioned in the center of it. And also you should know the default `width` and `height` is the parent slider's `width` and `height`.

**Note:** `background-color` is not recommended to apply on this component, and you should use `item-color` and `item-selectedColor` instead.

### Events

**common events**: check out the [common events](../common-event.html)

- support `click` event. Check out [common events](../common-event.html)
- support `appear` / `disappear` event. Check out [common events](../common-event.html)

### Example

```html
<template>
  <div>
    <slider class="slider">
      <div class="slider-pages" repeat="{{itemList}}">
        <image class="img" src="{{pictureUrl}}"></image>
        <text class="title">{{title}}</text>
      </div>

      <indicator class="indicator"></indicator>
    </slider>
  </div>
</template>

<style>
  .img {width: 150; height: 150;}
  .title {flex: 1; color: #ff0000; font-size: 48; font-weight: bold; background-color: #eeeeee;}
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

---
title: <indicator>
type: references
order: 2.10
version: 2.1
---

# &lt;indicator&gt;

### Summary

This component must be used as a subcomponent of a [`slider`](./slider.html) component.

### Child Components

This component supports no child components.

### Attributes

There is no specific attribute for this component.

### Styles

- `item-color`: &lt;colors&gt; This style attribute sets the normal item color using either a named color or a color specified in the hexadecimal #RRGGBB format.
- `item-selectedColor`: &lt;colors&gt; This style attribute sets the selected item color using either a named color or a color specified in the hexadecimal #RRGGBB format.
- `item-size`: &lt;length&gt; The size of the indicator elements, which is an float attribute.

**common styles**: check out the [common styles](../common-style.html)

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
    <slider class="slider" interval="4500" @change="onchange">
      <div class="frame" v-for="img in imageList">
        <image class="image" resize="cover" :src="img.src"></image>
        <text class="title">{{img.title}}</text>
      </div>
      <indicator class="indicator"></indicator>
    </slider>
  </div>
</template>

<style>
  .image {
    width: 700px;
    height: 700px;
  }
  .slider {
    margin-top: 25px;
    margin-left: 25px;
    width: 700px;
    height: 700px;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
  .title {
    position: absolute;
    top: 20px;
    left: 20px;
    padding-left: 20px;
    width: 200px;
    color: #FFFFFF;
    font-size: 36px;
    line-height: 60px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .frame {
    width: 700px;
    height: 700px;
    position: relative;
  }
  .indicator {
    width: 700px;
    height: 700px;
    item-color: green;
    item-selected-color: red;
    item-size: 50px;
    top: 200px;
    left: 200px;
  }
</style>

<script>
  export default {
    data () {
      return {
        imageList: [
          { title: 'item A', src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          { title: 'item B', src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          { title: 'item C', src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
        ]
      }
    },
    methods: {
      onchange (event) {
        console.log('changed:', event.index)
      }
    }
  }
</script>
```

[try it](../../examples/indicator.html)
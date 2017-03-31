---
title: <slider>
type: references
order: 2.9
version: 2.1
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

## Styles

**common styles**: check out [common styles for components](../common-style.html)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

## Events

- `change`: triggerd when the slide's index is changed. The event object contains the attribute of `index`, which is the index number of the currently shown slide.

**common events**: check out the [common events](../common-event.html)

- support `click` event. Check out [common events](../common-event.html)
- support `appear` / `disappear` event. Check out [common events](../common-event.html)

### Example

```html
<template>
  <div>
    <slider class="slider" interval="3000" auto-play="true">
      <div class="frame" v-for="img in imageList">
        <image class="image" resize="cover" :src="img.src"></image>
      </div>
    </slider>
  </div>
</template>

<style scoped>
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
  .frame {
    width: 700px;
    height: 700px;
    position: relative;
  }
</style>

<script>
  export default {
    data () {
      return {
        imageList: [
          { src: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'},
          { src: 'https://gd3.alicdn.com/bao/uploaded/i3/TB1x6hYLXXXXXazXVXXXXXXXXXX_!!0-item_pic.jpg'}
        ]
      }
    }
  }
</script>
```

[try it](../../examples/slider.html)
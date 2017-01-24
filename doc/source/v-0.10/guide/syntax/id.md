---
title: Find an Element
type: guide
order: 2.7
version: 0.10
---

# Find an Element

In Weex, we may set the `id` property for a particular element, just as unique identification of a particular element.

`id` can be used by `this.$el(id)` to find an element with a certain id. Take the API [`scrollToElement()`](../../references/modules/dom.html#scrolltoelementnode-options) For example:

```html
<template>
  <container>
    <text id="top">Top</text>
    <container style="height: 10000; background-color: #999999;">
    </container>
    <text onclick="back2Top">Back to Top</text>
  </container>
</template>
<script>
  var dom = require('@weex-module/dom')
  module.exports = {
    methods: {
      back2Top: function () {
        var top = this.$el('top')
        dom.scrollToElement(top)
      }
    }
  }
</script>
```

`id` can also work with `repeat` attribute [See more about display logical control](./display-logic.html), and ensure repetitive elements with different `id`:

```html
<template>
  <container>
    <image id="{{imgId}}" src="{{imgUrl}}" onclick="getImageId" repeat="{{images}}"></image>
  </container>
</template>
<script>
  module.exports = {
    data: {
      images: [
        {imgId: 1, imgUrl: '...'},
        {imgId: 2, imgUrl: '...'},
        {imgId: 3, imgUrl: '...'},
        ...
      ]
    },
    methods: {
      getImageId: function(e) {
        // get e.target.id
      }
    }
  }
</script>
```

Additionally, in the [composed components](./composed-component.html), we can get the corresponding sub component through `this.$vm(id)` APIs.

Next is how to [send messages between composed components](./comm.html).

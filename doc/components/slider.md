# &lt;slider&gt;
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/47"  class="weex-translate">cn</a>


### Summary

A slide's player to show slides (mostly as pictures) one page by another. The default interval between two slides is 3 seconds.

### Child Components

It supports all kinds of weex components as its slides, especially the `indicator` component which can be used only as a child component of `slider`.

### Attributes

- `auto-play`: &lt;boolean&gt; `true` | `false`. This value determines whether the slides plays automatically after the page rendering finished. The default value is `false`.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

**common styles**: check out [common styles for components](../references/common-style.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

- `change`: triggerd when the slide's index is changed. The event object contains the attribute of `index`, which is the index number of the currently shown slide.

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Example

```
<template>
  <div>
    <slider auto-play="true" onchange="change" style="...">
      <image repeat="{{imageList}}" src="{{src}}" style="..."></image>
      <indicator></indicator>
    </slider>
  </div>
</template>

<script>
  module.exports = {
    data: {
      imageList: [{src: '...'}, {src: '...'}, ...]
    },
    methods: {
      change: function (e) {
        // e.index
      }
    }
  }
</script>
```



# &lt;scroller&gt;
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/40"  class="weex-translate ">cn</a>

### Summary

A vertical scroller which can have multiple child components arranged in one column. If total height of its child components is higher then the height of itself, the whole child components are scrollable.

**Notes:** A `<scroller>` can be used as a root element or a embed element. The scroll direction of this component is column, and it can't be changed.

### Child Components

It supports all kinds of weex components as its child components.

* `refresh` component can be used inside scroller to add pull down to refresh functionality.
* `loading` component can be used inside scroller to add pull up to loadmore functionality.

* `refresh` and `loading` please check out the [refresh-loading](refresh-loading.md).

### Attributes

- `show-scrollbar`: &lt;boolean&gt; `true` | `false`. This value determines whether the scrollbar show. The default value is `true`.
- `scroll-direction`: &lt;string&gt; define scroll direction of component, `horizontal` or `vertical`.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

**common styles**: check out [common styles for components](../references/common-style.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Restriction
Nested lists or scrollers within the same direction are **not** supported. In other words. nested lists/scroller must have different directions.

For example, a vertical scroller nested in a vertical list or scroller is ** not ** allowed. However, a vertical scroller nested in a horizontal list or scroller is legal.

### Example

```
<template>
  <scroller>
    <div repeat="{{list}}">
      <text>{{name}}: ${{price}}</text>
    </div>
  </scroller>
</template>

<script>
  module.exports = {
    data: {
      list: [
        {name: '...', price: 100},
        {name: '...', price: 500},
        {name: '...', price: 1.5},
        ...
      ]
    }
  }
</script>
```

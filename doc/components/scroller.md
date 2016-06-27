# &lt;scroller&gt;
<span class="weex-version">0.4</span>

### Summary

A vertical scroller which can have multiple child components arranged in one column. If total height of its child components is higher then the height of itself, the whole child components are scrollable.

**Notes:** A `<scroller>` can be used as a root element or a embed element. The scoll direction of this component is column, and it can't be changed.

### Child Components

It supports all kinds of weex components as its child components.

### Attributes

- `scrollDirection`: &lt;string&gt; define scroll direction of component, `horizontal` or `vertical`.

There is no specific attribute for this component other than the [common attributes](../references/common-attrs.md).

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




# &lt;Scroller&gt;

A vertical/horizontal scroller.

## Style

- [common style](/references/common-style.md)
- scroll-direciton: vertical/horizontal, the default is vertical.

### Notes

A `<scroller>` can be used for a root element or a embed element.

## Event
`<scroller>` support `click` / `appear` / `disappear` , please refer to  [Common Events](/references/common-event.md)

## Code Example

```html
<template>
  <scoller>
    <container repeat="{{list}}">
      <text>{{name}}: ${{price}}</text>
    </container>
  </scoller>
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

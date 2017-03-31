---
title: <div>
type: references
order: 2.2
version: 0.10
---

# &lt;div&gt;

### Summary

The most fundamental component which is a contianer to wrap any other components. It supports all the common styles, attributes and layout of flexbox.

alias: `<container>` (deprecated)

### Child Components

This type of component supports all kinds of weex component as its child components including its own kind.

### Attributes

There is no specific attribute for this component other than the [common attributes](../common-attrs.html).

### Styles

**common styles**: check out the [common styles](../common-attrs.html)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

**common events**: check out the [common events](../common-event.html)

- support `click` event. Check out [common events](../common-event.html)
- support `appear` / `disappear` event. Check out [common events](../common-event.html)

### Examples

```html
<div>
  <image src="..."></image>
  <text>...</text>
</div>
```


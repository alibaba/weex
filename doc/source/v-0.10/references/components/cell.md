---
title: <cell>
type: references
order: 2.6
version: 0.10
---

# &lt;cell&gt;

### Summary

This component must be used as a subcomponent of a [`list`](./list.html) component, which is for the performance optimizing during scrolling.

### Child Components

This type of component supports all kinds of weex component as its child components.

### Attributes

There is no specific attribute for this component other than the [common attributes](../common-attrs.html).

**Notes:** you can't give `<cell>` a `flex` value. Width of `<cell>` is equal to the width of its parent component `<list>`, and you don't need to specify its height.

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

### Example

please refer to [List](./list.html)

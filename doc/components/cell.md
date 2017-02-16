# &lt;cell&gt;
<span class="weex-version">0.4</span>

### Summary

This component must be used as a subcomponent of a [`list`](list.md) component, which is for the performance optimizing during scrolling.

### Child Components

This type of component supports all kinds of weex component as its child components.

### Attributes

**common attributes**: check out the [common attributes](../references/common-attrs.md).

- support insert-animation('none'/'default'): specifies whether to perform animation when inserting the cell <span class="weex-version">0.10</span>
- support delete-animation('none'/'default'): specifies whether to perform animation when deleting the cell <span class="weex-version">0.10</span>

**Notes:** you can't give `<cell>` a `flex` value. Width of `<cell>` is equal to the width of its parent component `<list>`, and you don't need to specify its height.

### Styles

**common styles**: check out the [common styles](../references/common-attrs.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

**Notes:** cell itself is a container, its layout info is managed by list, so specifying cell's margin info will not work.

### Events

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Example

please refer to [List](list.md)

# &lt;cell&gt;
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

### Summary

This component must be used as a subcomponent of a [`list`](list.md) component, which is for the performance optimizing during scrolling.

### Child Components

This type of component supports all kinds of weex component as its child components.

### Attributes

There is no specific attribute for this component other than the [common attributes](../references/common-attrs.md).

**Notes:** you can't give `<cell>` a `flex` value. Width of `<cell>` is equal to the width of its parent component `<list>`, and you don't need to specify its height.

### Styles

**common styles**: check out the [common styles](../references/common-attrs.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Example

please refer to [List](list.md)

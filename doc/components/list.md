# &lt;list&gt; 
<span class="weex-version">0.4</span>

### Summary

A fixed height container which has multiple child components (cells) arranged in one column. If total height of its child components is higher then the height of itself, the whole child components are scrollable and it's high-performanced.

**Notes:** height of `list` must be specified (list's styles must contain `height` or pair of `top`, `bottom` or flex value if outter container's `flex-direction` value is `column`).

### Child Components

* `cell` is a available candidate to be used as a child component for `list`.
* `refresh` component can be used inside list to add pull to refresh functionality.
* `loading` component can be used inside list to add loading view at the bottom of scroller.

### Attributes

- `loadmoreoffset`: &lt;number&gt; the offset distance downwards the bottom of the list to trigger the loadmore event, which is triggered when the list scrolls down near enough to the bottom.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

**common styles**: check out [common styles for components](../references/common-style.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

- `loadmore` <sup class="wx-v">0.5</sup>: if the list scrolls to bottom, this event will be triggered immediately. You can load the next page of items in this event handler.
- `onappear` <sup class="wx-v">0.5</sup>: if the list's cells scroll to visible area, this event will be triggered when list is stopped. You can do something in this event handler.
- `ondisappear` <sup class="wx-v">0.5</sup>: if the list's cells scroll to invisible area, this event will be triggered when list is stopped. You can do something in this event handler.


**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)
- support `refresh` event  <sup class="wx-v">0.5</sup>.  If a refresh component is inside scroller, this event will be triggered when the scroller is swiping down.
- support `loading` event .  If a loading component is inside scroller, this event will be triggered when user scrolling to the bottom.

### Example

see [list-basic demo](https://github.com/alibaba/weex/blob/example/examples/component/list/list-basic.we)

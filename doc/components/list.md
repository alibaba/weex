# &lt;list&gt;
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>


### Summary

A core component which provides the most popular features for using a list of items.  

It can provide better experience and performace with smooth scrolling and memory reusing.

### Child Components

**Notes:** The `list`'s subcomponents can only contain `cell`, `header`, `refresh`, `loading` or fixed-position components. Other kind of components will not be displayed correctly.

* `cell` defines the attributes and behavior of the cells that appear in list. 
* `header` <sup class="wx-v">0.6.1</sup> header which will stick to the top when it reaches the top of the screen. 
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

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)
- support `refresh` event  <sup class="wx-v">0.5</sup>.  If a refresh component is inside scroller, this event will be triggered when the scroller is swiping down.
- support `loading` event .  If a loading component is inside scroller, this event will be triggered when user scrolling to the bottom.

### API

All cells or cell's subcomponents in list support the `scrollToElement` API in [dom module](../modules/dom.md)

### Example

see [list-basic demo](https://github.com/alibaba/weex/blob/example/examples/component/list/list-basic.we)

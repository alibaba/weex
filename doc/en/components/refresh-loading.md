# &lt;refresh-loading&gt;

### Summary

* `refresh` component can be used inside list/scroller to add pull to refresh functionality, the style of headerview can be set by specifying the style of refresh.
* `loading` component can be used inside list/scroller to add loading view at the bottom of container, the style of footerview can be set by specifying the style of loading.

### Child Components

**Notes:** `refresh` and `loading` is able to contain any type of sub-components you want, default loading animation can be achieved by using `loading-indicator` component from weex.

* `loading-indicator` default loading animation can be achieved by using this component in refresh and loading component，supports `color` property; Default `width` and `height` of `loading-indicator` is 0, so it must specify its `width` and `height`.

### Attributes

- `display` is a switch which toggles the visibility of refresh and loading component. `display` should be set to `show` in callback of `onrefresh` and `onloading`, and set to `hide` after refresh and loading is done.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Events

- support `onrefresh` event  <sup class="wx-v">0.5</sup>.  If a `refresh` component is inside `scroller` / `list`, this event will be triggered when it is pull down refresh.
- support `onloading` event .  If a `loading` component is inside `scroller` / `list`, this event will be triggered when it is pull up loadmore.

### Example

see [list-basic demo](https://github.com/alibaba/weex/blob/dev/examples/component/list/list-basic.we) and [scroller demo](https://github.com/alibaba/weex/blob/dev/examples/component/scroller-demo.we)

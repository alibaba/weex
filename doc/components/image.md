# &lt;image&gt;

### Summary

`image` tag is used to render a specified picture, and it shouldn't contain any subcomponents. You can use `img` as alias.

**Notes:** the styles of `width` and `height` should be specified, otherwise it won't work.

alias: `<img>`

### Subcomponents

This component supports no subcomponents.

### Attributes

- `src`: &lt;string&gt; image source url

Other attributes please check out the [common attributes](/references/common-attrs.md).

### Styles

- `width`: &lt;length&gt; the width of the component. This style should be specified.
- `height`: &lt;length&gt; the height of the component. This style should be specifed.

**common styles**: check out the [common styles](/references/common-attrs.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

**common events**: check out the [common events](/references/common-event.md)

- support `click` event. Check out [common events](/references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](/references/common-event.md)

### Examples

```
<div>
  <image src="..." ></image>
  <text>...</text>
</div>
```

# &lt;image&gt;
<span class="weex-version">0.4</span>

### Summary

`image` tag is used to render a specified picture, and it shouldn't contain any child component. You can use `img` as alias.

**Notes:** the styles of `width` and `height` should be specified, otherwise it won't work.

alias: `<img>`

### Child Components

This component supports no child components.

### Attributes

- `src`: &lt;string&gt; image source url
- `resize`: <span class="weex-version">0.5</span> &lt;string&gt; the 'ScaleType' of the component. The default value is ``stretch``, if this attribute is not specified. Possible values are ``cover``, ``contain``, each of which has the same meaning with w3c standard.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

- `width`: &lt;length&gt; the width of the component. This style should be specified.
- `height`: &lt;length&gt; the height of the component. This style should be specifed.

**common styles**: check out the [common styles](../references/common-attrs.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

### Events

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Examples

```
<div>
  <image src="..." ></image>
  <text>...</text>
</div>
```

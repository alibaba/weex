---
title: <image>
type: references
order: 2.3
version: 0.10
---

# &lt;image&gt;

### Summary

`image` tag is used to render a specified picture, and it shouldn't contain any child component. You can use `img` as alias.

**Notes:** the styles of `width` and `height` should be specified, otherwise it won't work.

alias: `<img>`

### Child Components

This component supports no child components.

### Attributes

- `src`: &lt;string&gt; image source url
- `resize`: <span class="api-version">v0.5+</span> &lt;string&gt; the 'ScaleType' of the component. The default value is ``stretch``, if this attribute is not specified. Possible values are ``cover``, ``contain``, each of which has the same meaning with w3c standard.

Other attributes please check out the [common attributes](../common-attrs.html).

### Styles

- `width`: &lt;length&gt; the width of the component. This style should be specified.
- `height`: &lt;length&gt; the height of the component. This style should be specifed.

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
  <image src="..." ></image>
  <text>...</text>
</div>
```

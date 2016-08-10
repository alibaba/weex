# &lt;text&gt;
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

### Summary

Render text with specified style rule, `<text>` tag can contain text value only. You can use variable interpolation in the text content with the mark `{{}}`.

### Child Components

This component supports no child components but a text content.

### Attributes

- `value`: &lt;string&gt; text value of this component. This is equal to the content of `<text>`.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

- `lines`: specify the text lines. Default value is `0` for unlimited.

**text styles**: checkout [text styles](../references/text-style.md)

- support `color` style.
- support `font-size` style.
	+ iOS: default vlaue `32`
  + Android: platform specify
  + HTML5: default value `32`
- support `font-style` style.
- support `font-weight` style.
- support `text-decoration` style.
- support `text-align` style.
- support `text-overflow` style.
- support `line-height`<sup class="wx-v">0.6.1</sup> style. 
- not support `flex-direction`, `justify-content`, `align-items` which is active for child nodes, and text has no child nodes.

**common styles**: check out [common styles for components](../references/common-style.md)

- support flexbox related styles
- support box model related styles
- support `position` related styles
- support `opacity`, `background-color` etc.

### Events

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Example

```
<div>
  <text>...</text>
  <text value="..."></text>
  <text style="font-size: 24; text-decoration: underline;">{{price}}</text>
  <text value="{% raw %}{{...}}{% endraw %}"></text>
</div>
```



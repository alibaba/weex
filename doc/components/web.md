# &lt;web&gt;

### Summary

Use &lt;web&gt; component to display any web content in the weex page. The `src` attribute can be used to specify a special web source. You also could use `webview` module to control the operation of web such as goBack、goForward and reload, see [webview module](../modules/webview.md).


### Child Components

This component supports no child components.

### Attributes

- `src`: &lt;string&gt; the attribute value specifies a special website you want to display.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

- `width`: &lt;length&gt; the width of the component. This style should be specified.
- `height`: &lt;length&gt; the height of the component. This style should be specifed.

**common styles**: check out the [common styles](../references/common-attrs.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles

### Events

- `pagestart`: sent after the web component starts loading a frame. 
- `pagefinish`: sent after the web component finishes loading a frame.
- `error`: sent if the web component failed to load a frame. 


*common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Example

```js
<div>
  <web style="width=...; height=...;" src="..." 	onpagestart="pagestart" onpagefinish="pagefinish" 	onerror="error">
  </web>
</div>
```
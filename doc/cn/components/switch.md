# &lt;switch&gt;
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/46"  class="weex-translate">cn</a>


### Summary

The weex builtin component `switch` is used to create and manage a IOS styled On/Off buttons used, for example, in the Settings app for options such as 'muted' and 'toggle color'.

### Child Components

This component supports no child components.

### Attributes

- `checked`: &lt;boolean&gt; `true` | `false`. The initial value of whether the status of this button is On or Off.

Other attributes please check out the [common attributes](../references/common-attrs.md).

### Styles

**Notes:** There are several style properties that you mustn't use on this component, mostly have impact on the layout. Here are all the invalid properties:

- `width`
- `height`
- `min-width`
- `min-height`
- `margin` and `margin-xx`s
- `padding` and `padding-xx`s
- `border` and `border-xx`s

**Notes:** Specially the `width` and `height` related properties is not configurable and the size of this component is fixed to `100x60` (for the design width 750px).

### Events

- `click`: check out [common events](../references/common-event.md)

**common events**: check out the [common events](../references/common-event.md)

- support `click` event. Check out [common events](../references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](../references/common-event.md)

### Parameters of events' object

- for `change` event:
  - value: the value of the component who dispatched this event, which is the boolean value ``true`` or ``false``.
  - timestamp: the time stamp of the event.

### Example

```html
<div>
  <text>muted:</text>
  <switch checked="true"></switch>
</div>
```

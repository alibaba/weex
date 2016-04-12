# &lt;input&gt;

### summary

The weex builtin component ``input`` is used to create interactive controls to accept data from users. How a ``input`` component works varies considerably depending on the value of its ``type`` attribute, such as ``text``, ``password``, ``url``, ``email``, ``tel`` etc.

### subcomponents

This component supports no subcomponents.

### attributes

- `type`: the type of controls to display. The default value is ``text``, if this attribute is not specified. Possible values are ``text``, ``password``, ``tel``, ``email``, ``url`` etc, each of which has the same meaning with w3c standard.
- `value`: the value of the control.
- `placeholder`: a hint to the user of which can be entered to the control. The placeholder text must have no carriage returns or line-feeds.
- `disabled`: a boolean attribute indicates that the form control is not available for interaction. In particular, the click event will not be dispatched on disabled controls.
- `autofocus`: a boolean attribute lets you specify that a form control should have input focus when the page loads.

**if you want a date picker or a time picker, please check out the component &lt;datepicker&gt; and &lt;timepicker&gt;.**

### styles

**common styles**: check out [common styles for components](/references/common-attrs.md)

- support flexbox related styles
- support box model related styles
- support ``position`` related styles
- support ``opacity``, ``background-color`` etc.

**special styles**

- `color`: the same as [text](text.md)
- `font-size`: the same as [text](text.md)
- `font-style`: the same as [text](text.md)
- `font-weight`: the same as [text](text.md)
- `text-align`: the same as [text](text.md)
- `placeholder-color`: the color of placeholder. ``#999999`` *non-standard*

### events

- support `click` event. Check out [common events](/references/common-event.md)
- support `appear` / `disappear` event. Check out [common events](/references/common-event.md) *non-standard*
- support `input` event. The value of an element changes.
- support `change` event. The change event is fired when a change to the component's value is commited by the user. It always come after a ``blur`` event.
- support `focus` event. A component has received focus.
- support `blur` event. A component has lost focus.

### parameters of events' object

- for ``input`` and ``change`` events:
  - value: the value of the component who dispatched this event.
  - timeStamp: the time stamp of the event.
- for ``focus`` and ``blur`` events:
  - timeStamp: the time stamp of the event.

### example

```html
<container>
  <input
    type="url"
    autofocus="true"
    placeholder="..."
    value="http://alibaba.github.io/weex/"
    style="placeholder-color: #666666;">
  </input>
</container>
```

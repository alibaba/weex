---
title: <textarea>
type: references
order: 2.13
version: 0.10
---

# &lt;textarea&gt;
<span class="weex-version">v0.8+</span>


### Summary

The weex builtin component `textarea` is used to create interactive controls to accept data from users. It can be a multi-line [input](./input.html).

**Notes:** `<textarea>` support all event which `<input>` had.

### Child Components

This component supports no child components.

### attributes

- `value`: &lt;string&gt; the value of the control.
- `placeholder`: &lt;string&gt; a hint to the user of which can be entered to the control. The placeholder text must have no carriage returns or line-feeds.
- `disabled`: &lt;boolean&gt; a boolean attribute indicates that the form control is not available for interaction. In particular, the click event will not be dispatched on disabled controls.
- `autofocus`: &lt;boolean&gt; a boolean attribute lets you specify that a form control should have input focus when the page loads.
- `rows:`&lt;number&gt; a number which can specify the height of textarea, default is `2`.

Other attributes please check out the [common attributes](../common-attrs.html).

### Styles

**text styles**: checkout [text styles](../text-style.html)

- support `color` style.
- support `font-size` style.
- support `font-style` style.
- support `font-weight` style.
- support `text-align` style.


**common styles**: check out [common styles for components](../common-style.html)

- support flexbox related styles.
- support box model related styles.
- support ``position`` related styles.
- support ``opacity``, ``background-color`` etc.

### Events

- `input`: the value of an element changes.
- `change`: the change event is fired when a change to the component's value is commited by the user. It always come after a ``blur`` event.
- `focus`: a component has received focus.
- `blur`: a component has lost focus.

**common events**: check out the [common events](../common-event.html)

- support `appear` / `disappear` event. Check out [common events](../common-event.html).

**Notes:** `<textarea>` does not support the common-event `click`. Please listen to the `input` or `change` event instead.

### Parameters of events' object

- for ``input`` and ``change`` events:
  - `value`: the value of the component who dispatched this event.
  - `timestamp`: the time stamp of the event.
- for ``focus`` and ``blur`` events:
  - `timestamp`: the time stamp of the event.

### Example

```html
<div>
  <textarea
    autofocus="true"
    placeholder="..."
    value="I am a multiple input">
  </textarea>
</div>
```

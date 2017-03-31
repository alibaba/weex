---
title: <textarea>
type: references
order: 2.13
version: 2.1
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

### Styles

**Pseudo-class**<span class="api-version">v0.9.5+</span>: `textarea` component support the following pseudo-classes:

* `active`
* `focus`
* `disabled`
* `enabled`

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
<template>
  <div class="wrapper">
    <textarea class="textarea" @input="oninput" @change="onchange" @focus="onfocus" @blur="onblur"></textarea>
  </div>
</template>

<script>
  const modal = weex.requireModule('modal')

  export default {
    methods: {
      oninput (event) {
        console.log('oninput:', event.value)
        modal.toast({
          message: `oninput: ${event.value}`,
          duration: 0.8
        })
      },
      onchange (event) {
        console.log('onchange:', event.value)
        modal.toast({
          message: `onchange: ${event.value}`,
          duration: 0.8
        })
      },
      onfocus (event) {
        console.log('onfocus:', event.value)
        modal.toast({
          message: `onfocus: ${event.value}`,
          duration: 0.8
        })
      },
      onblur (event) {
        console.log('onblur:', event.value)
        modal.toast({
          message: `input blur: ${event.value}`,
          duration: 0.8
        })
      }
    }
  }
</script>

<style>
  .textarea {
    font-size: 50px;
    width: 650px;
    margin-top: 50px;
    margin-left: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    color: #666666;
    border-width: 2px;
    border-style: solid;
    border-color: #41B883;
  }
</style>
```

[try it](../../examples/textarea.html)
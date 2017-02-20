---
title: <input>
type: references
order: 2.4
version: 0.10
---

# input

The weex builtin component `input` is used to create input controls to receive the user's input characters. How a `input` component works varies considerably depending on the value of its `type` attribute, such as `text`, `password`, `url`, `email`, `tel` etc.

**Notes:** does not support the common-event `click`. Please listen to the `input` or `change` event instead.

## Child Components

This component supports no child components.

## Attributes

* `type`: the type of controls to display. The default value is `text`, if this attribute is not specified. Possible values are `text`, `password`, `tel`, `email`, `url` etc. each of which has the same meaning with W3C standard.

* `value`: the value(text) of the control.

* `placeholder`: a hint to the user of which can be entered to the control. The placeholder text must have no carriage returns or line-feeds.

* `disabled`: a boolean attribute indicates that the form control is not available for interaction. In particular, the click event will not be dispatched on disabled controls.

* `autofocus`: a boolean attribute lets you specify that a form control should have input focus when the page loads.

* `maxlength`: <span class="api-version">v0.7+</span> a number value to specify maxlength of input.

Other attributes please check out the [common attributes](../common-attrs.html).

## Styles

* placeholder-color: the color of placeholder. Default value is '#999999'.

* text styles: checkout [text styles](../text-style.html)

  * support 'color' style.
  * support 'font-size' style.
  * support 'font-style' style.
  * support 'font-weight' style.
  * support 'text-align' style.

### common styles
check out [common styles for components](../common-style.html)

* support flexbox related styles.
* support box model related styles.
* support 'position' related styles.
* support 'opacity', 'background-color' etc.

## Events

* input: the value of an input character changes.
* change: the change event is fired when a change to the component's value is commited by the user. It always come after a 'blur' event.
* focus: a component has received focus.
* blur: a component has lost focus.

### common events
check out [common events](../common-event.html)

* support 'appear' / 'disappear' event. 

### Notes
does not support the common-event 'click'. Please listen to the 'input' or 'change' event instead.

### Parameters of events' object

* for 'input' and 'change' events:'value': the value of the component who dispatched this event.'timestamp': the time stamp of the event.
* for 'focus' and 'blur' events:'timestamp': the time stamp of the event.

## Example

```html
<template>
  <div>
      <input
        type="text"
        placeholder="Input Something"
        class="input"
        autofocus="true"
        value=""
        onchange="onchange"
        oninput="oninput"
      />
      <text>oninput: {{txtInput}}</text>
      <text>onchange: {{txtChange}}</text>
  </div>
</template>

<style>
  .input {
    font-size: 60;
    height: 80;
    width: 400;
  }
</style>

<script>
  require('weex-components');
  module.exports = {
    data: {
      txtInput: '',
      txtChange: ''
    },
    methods: {
      onchange: function(event) {
        this.txtChange = event.value;
        console.log('onchange', event.value);
      },
      oninput: function(event) {
        this.txtInput = event.value;
        console.log('oninput', event.value);
      }
    }
  };
</script>
```

[Try it](http://dotwe.org/e1b18eb89facb4e2a5467ee4bebd9be6)

Use [Weex Playground](https://alibaba.github.io/weex/download.html) App to Scan the QR image and view the example for  'input'. 

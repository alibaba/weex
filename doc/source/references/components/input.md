---
title: <input>
type: references
order: 2.4
version: 2.1
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

## Styles

* placeholder-color: the color of placeholder. Default value is '#999999'.

* Pseudo-class<span class="api-version">v0.9.5+</span>: `input` component support the following pseudo-classes:

  * `active`
  * `focus`
  * `disabled`
  * `enabled`

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


### Methoads 

 - `focus()` <span class="api-version">v0.9+</span>

  The `focus()` method is used to give focus to an input component and tigger soft keybord(if it can be focused).

 - `blur()`<span class="api-version">v0.9+</span>

  The `blur()` method is used to remove focus from an input component and close soft keybord(if it has focus).

### Notes
does not support the common-event 'click'. Please listen to the 'input' or 'change' event instead.

### Parameters of events' object

* for 'input' and 'change' events:'value': the value of the component who dispatched this event.'timestamp': the time stamp of the event.
* for 'focus' and 'blur' events:'timestamp': the time stamp of the event.

## Example

```html
<template>
  <div class="wrapper">
    <input ref="input" class="input" type="text" @input="oninput" @change="onchange" @focus="onfocus" @blur="onblur">
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
  .input {
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

[try it](../../examples/input.html)
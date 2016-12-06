# `change` Event Type <sup>standard name</sup>

## Summary

The `change` event is fired when user commit new values for an element.

## Details

* This kind of event will mutate the `value` attribute of the target element in the virtual-DOM.
* Apply to: `<input>`, `<slider>`, `<switch>`
* The different elements have different moment to fire this event.
  * `<slider>`: when current slide changed.
  * `<input>`: when they lost focus and change the value.
  * `<switch>`: when user change the state between `true` and `false`.

### Properties of Event Object

* `type:string`: `"change"`
* `target:Element`: The event target in the virtual-DOM tree.
* `timestamp:number`: The time stamp when this event fired.
* `value:string`: The new value of the element.

## Compare with Web Standard

* The event in Weex doesn't support bubbles. In another way all events will do `stopPropagation()` by default.

## Example

```html
<template>
  <div>
    <input value="{{x}}" onchange="update">
  </div>
</template>
<script>
  module.exports = {
    data: function () {
      return { x: 'Hello' }
    },
    methods: {
      update: function (e) {
        this.x = e.value
      }
    }
  }
</script>
```

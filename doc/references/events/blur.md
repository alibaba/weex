# `blur` Event Type <sup>standard name</sup>

## Summary

The `blur` event is fired when an element has lost focus.

## Details

* This kind of event will not mutate the virtual-DOM.
* Apply to: `<input>`

### Properties of Event Object

* `type:string`: `"blur"`
* `target:Element`: The event target in the virtual-DOM tree.
* `timestamp:number`: The time stamp when this event fired.

## Compare with Web Standard

* The event in Weex doesn't support bubbles. In another way all events will do `stopPropagation()` by default.

## Example

```html
<template>
  <div>
    <input value="{{x}}" onblur="update">
  </div>
</template>
<script>
  module.exports = {
    data: function () {
      return { x: 'Hello' }
    },
    methods: {
      update: function (e) {
        console.log('I have lost the focus')
      }
    }
  }
</script>
```

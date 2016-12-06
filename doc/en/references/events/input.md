# `input` Event Type <sup>standard name</sup>

## Summary

The `input` event is fired synchronously when an `<input>` element is changed.

The difference between `input` event and [`change`](./change.md) event for `<input>` is that the `change` event only happened when the element lost its focus.

## Details

* This kind of event will mutate the `value` attribute of the target element in the virtual-DOM.
* Apply to: `<input>`

### Properties of Event Object

* `type:string`: `"input"`
* `target:Element`: The event target in the virtual-DOM tree.
* `timestamp:number`: The time stamp when this event fired.
* `value:string`: The new value of the element.

## Compare with Web Standard

* The event in Weex doesn't support bubbles. In another way all events will do `stopPropagation()` by default.

## Example

```html
<template>
  <div>
    <input value="{{x}}" oninput="update">
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

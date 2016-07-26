# `focus` Event Type <sup>standard name</sup>

## Summary

The `focus` event is fired when when an element has received focus.

## Details

* This kind of event will not mutate the virtual-DOM.
* Apply to: `<input>`

### Properties of Event Object

* `type:string`: `"focus"`
* `target:Element`: The event target in the virtual-DOM tree.
* `timestamp:number`: The time stamp when this event fired.

## Compare with Web Standard

* The event in Weex doesn't support bubbles. In another way all events will do `stopPropagation()` by default.

## Example

```html
<template>
  <div>
    <input value="{{x}}" onfocus="update">
  </div>
</template>
<script>
  module.exports = {
    data: function () {
      return { x: 'Hello' }
    },
    methods: {
      update: function (e) {
        console.log('I am in focus')
      }
    }
  }
</script>
```

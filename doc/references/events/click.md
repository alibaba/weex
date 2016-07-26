# `click` Event Type <sup>standard name</sup>

## Summary

The `click` event is fired when user tap on a single element.

## Details

* This kind of event will not mutate the virtual-DOM.
* Apply to: all elements

### Properties of Event Object

* `type:string`: `"click"`
* `target:Element`: The event target in the virtual-DOM tree.
* `timestamp:number`: The time stamp when this event fired.

## Compare with Web Standard

* The event in Weex doesn't support bubbles. In another way all events will do `stopPropagation()` by default.
* The event time doesn't have 300ms delay in iOS/Android but depends on browsers in HTML5 renderer.

## Example

```html
<template>
  <div onclick="update">
    <text>{{foo}}</text>
  </div>
</template>
<script>
  module.exports = {
    data: function () {
      return { foo: 'x' }
    },
    methods: {
      update: function (e) {
        this.foo = e.type + ' ' + Date(e.timestamp)
      }
    }
  }
</script>
```

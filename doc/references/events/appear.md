# `appear` Event Type

## Summary

**non-standard**

The `appear` event is fired when the target element appeared into the viewport by user interaction or renderer self-changes.

## Details

* This kind of event will not mutate the virtual-DOM.
* Apply to: all elements

### Properties of Event Object

* `type:string`: `"appear"`
* `target:Element`: The event target in the virtual-DOM tree.
* `timestamp:number`: The time stamp when this event fired.

## Example

```html
<template>
  <tall-building>
    <floor repeat="v in list" onappear="activate" ondisappear="deactivate"></floor>
  </tall-building>
</template>
```

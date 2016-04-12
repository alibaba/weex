# Touch Events

Weex provides the way of setting `on` attributes on a node to listen some touch events.

## How to use

Example:

```
<template>
  <container ontouchstart="handleTouchstart"></container>
</template>

<script>
module.exports = {
  methods: {
    handleTouchstart: function(eventProperties) {
      // handling with the Event Properties
    }
  }
}
</script>
```

According to above code, a `touchstart` event is fired when a touch point is placed on the touch surface.

## The Event Types of Touch 

- The `touchstart` event - fired when a touch point is placed on the touch surface.
- The `touchmove` event - fired when a touch point is moved along the touch surface.
- The `touchend` event - fired when a touch point is removed from the touch surface.
- The `panstart` event - fired when a first touch moved of 10px or more occurs within 10 ms duration.
- The `panmove` event - fired when a touch moved of 10px or more occurs within 10 ms duration.
- The `panend` event - fired when a touch point is removed from the touch surface after `panstart`.
- The `longpress` event - fired when a touch point is sustained of 500 ms or more.

## The Event Properties

- The `type` property - The type of event.
- The `target` property - 
- The `timestamp` property - 
- The `changedTouches` property - A list of touches for every point of contact which contributed to the event. 

## The Touch Properties

- The `identifier` property - A unique identifier for this Touch object.
- The `pageX` property - The X coordinate of the touch point relative to the left edge of the document. 
- The `pageY` property - The Y coordinate of the touch point relative to the top of the document.
- The `screenX` property - The X coordinate of the touch point relative to the left edge of the screen.
- The `screenY` property - The Y coordinate of the touch point relative to the top edge of the screen.

For more information, please visite [Common Events](events.md).
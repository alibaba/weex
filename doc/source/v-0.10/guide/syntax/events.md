---
title: Events
type: guide
order: 2.3
version: 0.10
---

#  Events

Weex allow `<template>` to bind event type and handler on an Element. The attribute name is the event type with prefix `on...` and the attribute value is handler method name. For instance: `onclick="handler"`. e.g.

```html
<template>
  <image onclick="handler" ...></image>
</template>

<script>
  module.exports = {
    methods: {
      handler: function (e) {
        // TODO
      }
    }
  }
</script>
```

When user clicks the image , handler function which defined in `<script>` code will be executed.

## Inline Handler 

Beside a handler method name, you can also call a handler inline.

e.g.
```html
<template>
  <image onclick="handler('arg1', $event)" ...></image>
</template>

<script>
  module.exports = {
    methods: {
      handler: function (arg1, e) {
        // TODO
      }
    }
  }
</script>
```

## Event Object

When an event handler called, it will receive an event object as the first argument. Every event object will contains following properties.

* `type`: event name, eg: `click`
* `target`: target `Element` of the event
* `timestamp`: time stamp that event triggered

Next, let's have a look at [display logic control](./display-logic.html).

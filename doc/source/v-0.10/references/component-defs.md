---
title: Component Definition
type: references
order: 1.2
version: 0.10
---

# Component Definition

A component definition is a set of options to describe a component. It's always assigned to `module.exports` in `<script>`.

```javascript
module.exports = {
  // a set of options here
}
```

## Data & Methods options

```javascript
module.exports = {
  data: function () {
    return {x: 1, y: 2}
  },
  methods: {
    doThis: function () {...},
    doThat: function () {...}
  },
  ...
}
```

The `data` option is a function that return a observable data object for this ViewModel.
The `methods` option is a map which contains all ViewModel methods.

Each `data` or `methods` property will be proxied to the ViewModel instance. So you can read and write data with `this.x`, also you can call methods with `this.doThis(...)`.

A whole example:

```html
<template>
  <div style="width: {{w}}; height: {{h}}; background-color: red;" onclick="update"></div>
</template>
<script>
  module.exports = {
    data: function () {
      return {w: 750, h: 200}
    },
    methods: {
      update: function (e) {
        this.h += 200
      }
    }
  }
</script>
```

## Events options

```javascript
module.exports = {
  data: ...,
  methods: {
    foo: function () {
      ...
      this.$emit('customtype1', data)
    }
  },
  events: {
    customtype1: function (e) {
      console.log(e.type, e.detail)
    }
  },
  ...
}
```

The `events` options could allow you to add custom event listeners when ViewModel created. Then it will listen these type of events and handle them by the function-type value.

The first argument is a event object which contains event data in `e.detail`.

## Lifecycle options

```javascript
module.exports = {
  data: ...,
  methods: ...,
  init: function () {
    console.log('ViewModel constructor begins')
  },
  created: function () {
    console.log('Data observation finished')
  },
  ready: function () {
    console.log('Virtual DOM finished')
  },
  ...
}
```

Weex ViewModel now supports these lifecycle hook functions which could be write as component options:

* `init`: fired at the beginning of a ViewModel constructor call.
* `created`: fired when ViewModel observes default data but not compile the template.
* `ready`: fired when ViewModel observes default data and compiles the template to generate virtual DOM finally.

**Note: If you want to use the function in `methods`, `events` or lifecycle options as a parameter, please make sure the context is correct as expect. For example:**

```javascript
module.exports = {
  data: function () {
    return {x: 1, y: 2}
  },
  ready: function () {
    // `undefined`
    // because the context changed
    this.foo(this.bar)
    // `1`
    // because the context bound correct
    this.foo(this.bar.bind(this))
  },
  methods: {
    foo: function (fn) {
      return fn()
    },
    bar: function () {
      return this.x
    }
  }
}
```

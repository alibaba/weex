---
title: Require 3rd Party Libs
type: guide
order: 3.6
version: 0.10
---

# How to require 3rd Party Libs ?

In the paragraph Maintain Your Component Code, we learn that JavaScript code can be written in `<script>` tag in one component. But there must be some common functions or modules in your project, such as parsing url params, extending properties from some objects to another object and so on. It's a bad practice to copy and paste them in each component, therefore there's a urgent need of `require`. Weex provides CommonJS `require` syntax for developers.

Let take `extend` for example.

## Require Local Js Modules

A basic implementation of `extend` is as follows, and it's placed in directory path `./common/utils.js`.

```javascript
function extend(dest, src) {
  for (var key in src) {
    dest[key] = src[key]
  }
}
exports.extend = extend
```

In a `.we` file, `extend` can be used with the help of `require`:

```html
<script>
  var utils = require('./common/utils')
  var obj1 = {a: 1}
  var obj2 = {b: 2}
  utils.extend(obj1, obj2) // obj1 => {a: 1, b: 2}
</script>
```

## Require Installed Node Modules

Besides, [underscore](http://underscorejs.org) is a JavaScript library that provides a whole mess of useful functional programming helpers without extending any built-in objects. It implements a more robust version of [extend](http://underscorejs.org/#extend).

We can use underscore's extend instead of the version implemented by ourselves. After installing `underscore` to the `node_modules` directory, we can `require` and use it.

```bash
$ npm install underscore
```

```html
<script>
  var _ = require('underscore')
  var obj1 = {a: 1}
  var obj2 = {b: 2}
  var obj3 = {c: 3}
  var ret = _.extend(obj1, obj2, obj3) // ret => {a: 1, b: 2, c: 3}
</script>
```

# dom

## Summary

A series of dom api.

## API

### scrollTo(node, options)

#### Arguments

* `node`*(Node)*: an element that scrolled into the view.
* `options`*(object)*: some options.
  * `offset`*(number)*: An offset to the visible position, default is `0`.

#### Example

```javascript
var dom = require('@weex-module/dom');
dom.scrollTo(this.$el('someId'), {offset: 10});
```


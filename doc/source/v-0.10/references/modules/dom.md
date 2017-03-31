---
title: dom
type: references
order: 3.3
version: 0.10
---

# dom

## Summary

A series of dom apis that sending virtual-dom's messages to the native renderer to update the dom tree. The only API for developers to use in a `.we` file is `scrollToElement` <del>which you can use by calling the `$scrollTo` method</del>. Other APIs mentioned on this page should only be used through the native renderer in the `callNative` process.

## API

### scrollToElement(node, options)

Scroll the page to the specified node. This API should only be used on the element in the `scroller` or `list` component.

<del>This API can be used by calling the VM's method `$scrollTo` **(deprecated)**.</del> You can use `require('@weex-module/dom').scrollToElement` to call this API in your `.we` file.

#### Arguments

* `node`*(Node)*: an element that scrolled into the view.
* `options`*(object)*: some options.
  * `offset`*(number)*: An offset to the visible position, default is `0`.

#### Example

```javascript
var dom = require('@weex-module/dom');
dom.scrollToElement(this.$el('someId'), {offset: 10});
```

### createBody(element)

Create the body for the whole dom tree. Element type should only be the ones that can be used as roots (`div`, `scroller` and `list`).

#### Arguments

* `element`*(object)*: a object that specified the body node info like ref, type, children, etc.

### addElement(parentNode, element, index)

Add a element into the dom tree.

#### Arguments

* `parentNode`*(Node)*: specify the element's parent node.
* `element`*(object)*: a object that specified the config info for the node to be added.
* `index`*(number)*: insert the element to the specified position.

### removeElement(node)

Remove a node in the dom tree.

#### Arguments

* `node`*(Node)*: the node to be removed.

### moveElement(node, parentNode, index)

Move a exsited node into another parent (or the same parent) before the specified position.

#### Arguments

* `node`*(Node)*: the node to be moved.
* `parentNode`*(Node)*: the parent node to move into.
* `index`*(number)*:: according to the specified position index, will the node be inserted into.

### addEvent(node, type)

Inform the renderer that there are listeners for a specified event type.

#### Arguments

* `node`*(Node)*: the node to be listened on.
* `type`*(string)*: which type of events the node should be listened for.

### removeEvent(node, type)

Remove event listeners on the specified node for the specified event type.

#### Arguments

* `node`*(Node)*: on which node should the listeners to be removed
* `type`*(string)*: specify the event type.

### updateAttrs(node, attr)

Update attrbutes of the specified node.

#### Arguments

* `node`*(Node)*: the node to be updated.
* `attr`*(object)*: the attributes object with the attribute items to be updated.

### updateStyle(node, style)

Update styles of the specified node.

#### Arguments

* `node`*(Node)*: the node to be updated.
* `style`*(object)*: the style object with the style rules to be updated.

### createFinish()

Notify native renders that the series of messages for updating the native dom tree have reached a end.

### refreshFinish()

Notify native renders that the series of messages for refreshing a native dom tree have reached a end.


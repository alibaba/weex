---
title: Render Logic Control
type: guide
order: 2.5
version: 0.10
---

# Render Logic Control

## `append`

Attribute `append` do not have data-binding. It won't change the final rendering effect. But it determines whether this component should be rendered as a whole tree or a single node with child nodes appended after.

`append` has two key attributes, `tree` and `node`, the usage is:

```html
<template>
  <container>
    <container id="world" append="tree">
      <text>Hello World!</text>
    </container>
    <container id="weex" append="node">
      <text>Hello Weex!</text>
    </container>
  </container>
</template>
```

In the code snippet above, the element with id 'world' will wait for all its children to be rendered then it will be rendered entirely, while the element with id 'weex' will only render itself to the page, then its child elements will be rendered to page one by one.

The rendering result is obvious, The latter statement will render the element a bit faster on the first-paint, but the total time might be longger than `append="tree"` case.

By default, elements are rendered as `node` mode. Once an element is in `tree` rendering mode, its children elements will always be rendered in `tree` mode.

Next we will introduce [composed component](./composed-component.html).

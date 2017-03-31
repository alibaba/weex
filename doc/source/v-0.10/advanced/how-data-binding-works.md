---
title: How data-binding works
type: advanced
order: 2
has_chapter_content: true
version: 0.10
---

# How data-binding works

Weex JS Framework is a MVVM framework. It observe data and use `{% raw %}{{bindedKey}}{% endraw %}` syntax to bind in views. When data is changed in anyway, the view will automatically be updated due to data-binding.

For example, The content of a `<text>` component is bound with the key `notes` in data:

```html
<template>
  <div>
    <text>{{notes}}</text>
  </div>
<template>

<script>
  module.exports = {
    data: {
        notes: 'Hello'
    }
  }
</script>
```

Weex JS Framework first observe the data object to make sure each data change in the future will be observed. And then it will compile the whole `<template>`. When it finds that the content of the `<text>` is bound with `notes`, JS Framework will watch the `data.notes` changes and set a handler which will update the `<text>` content with new `data.notes`. So developer only need to manage the data, the view display could automatically do corresponding changes.

Some special data-binding syntax here:

* `{% raw %}<foo if="{{condition}}">{% endraw %}` will watch the condition value changes. When it changes to `true`, the `<foo>` element will be created and attached, otherwise it will be not created or removed.
* `{% raw %}<foo repeat="{{list}}">{% endraw %}` will watch the mutations of a list. At the beginning the `<foo>` element will be cloned and attached with each item in list. When some items are added, removed or moved, the `<foo>` element list will be re-generated new content in the right order with minimum alterations.
* `{% raw %}<foo if="{{condition}}" repeat="{{list}}">{% endraw %}` will process `repeat` first and `if` the second. In another way, it will walk through each item in list, if the item's condition value is true, a `<foo>` element will be cloned and attached with this certain item value.

Compared with virtual DOM diff algorithm, we just "diff" the data and only calculate/update the virtual DOM with minimum alterations for each user interaction or data-change operation. So it's more lightweight and fast especially for small views in mobile devices.

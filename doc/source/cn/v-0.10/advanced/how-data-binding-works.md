---
title: 数据绑定原理
type: advanced
order: 2
has_chapter_content: true
version: 0.10
---

# 数据绑定实现原理

Weex 的 JS Framework 是一个 MVVM，即 Model-View-ViewModel 框架。他会自动监听数据的变化，并通过 `{% raw %}{{字段名}}{% endraw %}` 的语法把数据和视图中所展示的内容自动绑定起来。当数据被改写的时候，视图会自动根据数据的变化而发生相应的变化。

比如下面这个例子，`<text>` 的内容被绑定在了 `notes` 数据字段上：

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

Weex 的 JS Framework 会首先对 `data` 里的数据进行监听，这样未来的数据变化都能够被监听到。然后我们会编译整个 `<template>` 标签里的内容。当我们找到 `<text>` 标签里的 `{% raw %}{{notes}}{% endraw %}` 时，JS Framework 会跟踪 `data.notes` 的变化并在其发生变化时触发一个句柄，将 `<text>` 的内容设置为 `data.notes` 最新的值。这样的话开发者就不必手动关心数据和视图之间的数据同步问题了。

在这个基础上我们还设计了一些特殊的语法：

- `<foo if="...">` 代表一个条件监听，当其值为 `true` 时，`<foo>` 元素将会被创建和载入，反之则不会被创建或被移除掉。
- `<foo repeat="...">` 代表一个列表监听，第一次加载的时候 `<foo>` 元素会被按照数组里的数据逐条 clone 并赋值。而当有列表项增加、移动或移除时，视图层也会自动触发相应的改变，并且智能优化至最小变更策略
- `<foo if="..." repeat="...">` 两个特殊语法共用时，将会优先展开 `repeat` 然后逐条判断 `if`。

相比于一些 virtual-DOM 的 diff 计算机制，我们会直接对数据进行 diff，而且只会 diff 由于用户操作或数据操作发生改变的那部分数据和视图，这是一种更小范围的计算方式。尤其在追求轻量快速的移动端界面上，这种更新机制更加显得具有优势。

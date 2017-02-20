---
title: 特殊元素
type: references
order: 1.11
version: 0.10
---

# 特殊元素

## `<content>`

`<content>` 在编写组件模板时作为作为内容节点元素存在，使用时将被真正的元素替换。

替代写法: `<slot>`。

## 示例

如示例中写法，`<content>`  节点被 `<text>` 替代。

```html
<element name="item">
  <template>
    <div>
      <content></content>
    </div>
  </template>
</element>

<template>
  <div>
    <item>
      <text>Content Text</text>
    </item>
  </div>
</template>
```

[体验一下](http://dotwe.org/bf4354a0e6dbe67470ad1a988cdd565e)

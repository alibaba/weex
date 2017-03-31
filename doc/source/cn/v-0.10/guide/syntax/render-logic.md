---
title: 渲染过程控制
type: guide
order: 3.5
version: 0.10
---

# 渲染过程控制

## `append`

`append` 特性定义了当前组件的子组件：

1. 以一整棵树的方式一次性添加到视图中 (`append="tree"`)，还是
2. 每个子组件都产生一次单独的添加到视图的指令 (`append="node"`)

``` html
<template>
  <div>
    <div>
      <text>Hello</text>
      <text>Weex</text>
    </div>
    <div append="node">
      <text>Hello</text>
      <text>Weex</text>
    </div>
    <div append="tree">
      <text>Hello</text>
      <text>Weex</text>
    </div>
  </div>
</template>
```

[体验一下](http://dotwe.org/417c75415efce66d8e22bf5942b380ee)

在上面的代码中，第一组和第二组 `<div>` 的渲染过程相同，即先添加空的父级 `<div>`，然后插入第一个 `<text>` Hello，然后插入第二个 `<text>` Weex；第三组 `<div>` 则是连带两个 `<text>` 子组件一齐传给渲染层进行渲染的。

渲染结果显而易见，前两组渲染方式会使首次绘制的响应速度比后者快些，但是总渲染时间可能比第三组 `append="tree"` 更长。开发者可以根据实际界面的情况自行选择合理的渲染过程。

默认情况下，除了 `<cell>` 组件的默认渲染过程是 `tree` 模式，其它组件都默认按照 `node` 模式进行渲染。

下一节：[自定义组件](./composed-component.html)

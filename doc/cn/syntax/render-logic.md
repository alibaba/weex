# 渲染逻辑控制器
<span class="weex-version">0.4</span>

## `append`

`append`属性没有做数据绑定的工作。它不会改变最终的渲染效果。但是此属性确定是以一整棵树或子节点的方式添加。

`append`有两个关键属性，`tree` 和 `node`，使用方法如下：

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

在上面的代码中，`id`为`world`的元素将等待其所有子元素渲染完成，才完全全部渲染。然而id为weex的元素只完成自身的渲染就会被呈现在页面上，其子元素渲染完成一个展示一个。

渲染结果显而易见，后者渲染方式会使第一次绘画的速度比前者快些，但是总体的渲染时间可能比 `append="tree"` 长些。

默认情况下，元素的呈现为 `node` 模式，只要元素是`tree`的渲染方式，其子元素都将已 tree模式渲染。

下一节我们将介绍 [组件封装](./composed-component.md).

---
title: 页面配置和页面数据
type: guide
order: 3.9
version: 0.10
---

# 页面配置和页面数据

在 Weex 中，你可以通过一些特殊的 `<script>` 进行页面整体配置。

_注意事项：这些配置会代表页面整体，所以写在自定义子组件中是无效的，只有写在顶级 ViewModel 的 `<sctipt>` 中才会生效。_

先举个例子：

```html
<!-- definition of sub components -->
<element name="sub-component-a">...</element>
<element name="sub-component-b">...</element>
<element name="sub-component-c">...</element>

<!-- definition of top-level component -->
<template>...</template>
<style></style>
<script>
  module.exports = {
    data: { x: 1, y: 2 }
  }
</script>

<!-- config and data -->
<script type="config">
  downgrade: {
    ios: {
      os: '9', // all of 9.x.x
      app: '~5.3.2',
      framework: '^1.3', // all of 1.3.x
      deviceModel: ['AAAA', 'BBBB']
    },
    android: {
      os: '*', // all of version
      app: '^5',
      framework: '',
      deviceModel: ''
    }
  }
</script>
<script type="data">
  { y: 200 }
</script>
```

## `<script type="config">`

开发者可以在顶级 ViewModel 中加入这样一段 `<script>`，以 JSON 格式描述页面整体的配置信息。

目前支持的配置信息只有 `downgrade`：用来从平台、应用等维度描述页面的降级规则。这样设计对于产品迭代最大的帮助是可以在高版本中使用 Weex，而在低版本中使用之前已有的渲染方式，这部分控制降级的细节需要 native 接入的时候进行相应的识别和具体操作。

未来这里会有更多的配置项出现在这里。

## `<script type="data">`

开发者可以在顶级 ViewModel 中加入这样一段 `<script>`，以 JSON 格式额外配置顶级 ViewModel 的数据，它会覆盖顶级 ViewModel 数据中相应的字段。比如上述例子中，最终的顶级 ViewModel 中的数据为 `{ x: 1, y: 200 }`。

## 总结

至此，Weex 基本的语法已经全部介绍过了。相信您对 Weex 的使用方式和开发方式有了更多的了解。

接下来我们推荐您阅读：

* [最佳实践](../how-to/index.html)
* [Weex 手册](../../references/index.html)

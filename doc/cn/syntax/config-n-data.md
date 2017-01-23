# 页面配置 & 数据
<span class="weex-version">0.4</span>

你可以在另外的`<script>`中写一些 配置和数据的实例，添加到 **top-level** weex 组件中。

* 配置实例中可以申明一些meta信息 比如SDK/Client版本。支持`降级`到H5 渲染方式。未来还将支持更多的扩展。
* 数据实例中可以设置外部数据替换掉默认`top-level`组件数据。

这些都使weex文件更具扩展和可配置，让其更容易的在其他工具和服务中工作，比如CMS系统。

```html
<!-- definition of sub components -->
<element name="sub-component-a">...</element>
<element name="sub-component-b">...</element>
<element name="sub-component-c">...</element>

<!-- definition of top-level component -->
<template>...</template>
<style>...</style>
<script>
  module.exports = {
    data: function () {return {x: 1, y: 2}}
  }
</script>

<!-- instance config and data -->
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
  {y: 200}
</script>
```

请注意，这两个附加`<script>`都是可选的并且有`type="config|data" `属性，当它是一个Weex实例的`top-level`组件才有效。

这是所有关于Weex语法。更多阅读，请查看：

* [how-tos](../how-to/main.md) articles and
* [advanced](../advanced/main.md) topics.

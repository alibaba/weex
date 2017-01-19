---
title: Page Config & Data
type: guide
order: 2.9
version: 0.10
---

# Page Config & Data

You can write some instance config and data in some additional `<script>` at the **top-level** Weex component.

* the instance config could declare some meta informations like which sdk/client version it supports or "downgrade" to HTML5 renderer. This part would be extended more in the future.
* the instance data could set an external data which would be processed instead of the default top-level component data.

They all make Weex files more extendable and configurable and works easy with other tools & services like CMS system.

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
    data: function () {return {x: 1, y: 2}}
  }
</script>

<!-- instance config and data -->
<script type="config">
  {
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
  }
</script>
<script type="data">
  {y: 200}
</script>
```

Notice that these two additional `<script>` are both optinal and have `type="config|data"` attribute and only works when it's the top-level component of a Weex instance.

So that's all about Weex syntax. For more reading, please check out:

* [how-tos](../how-to/index.html) articles and
* [advanced](../../advanced/index.html) topics.

---
title: Bootstrap
type: references
order: 1
has_chapter_content: false
chapter_title: 通用选项
version: 0.10
---

# Bootstrap

除了其默认的意义，`<script>`标签支持在页面的顶级组件中通过 `type` 属性定义两种配置。
- `type="data"`: 配置初始化数据，这里定义的数据会覆盖定义在`<script>`中的数据；
- `type="config"`: 定义配置项。

``` html
<script type="data">
  /* (可选) 定义初始化数据 */
</script>

<script type="config">
  /* (可选) 定义配置项 */
</script>

```
## 定义初始化数据

有时，很难在默认的`<script>`标签中维护巨大的数据结构。所以 Weex 允许我们通过 `<script type="data">` 标签定义初始化数据。在这里定义的数据将完全取代默认的 `<script>` 标签中定义的数据。

例如：

```html
<script type="data">
  module.exports = {
      title: 'Alibaba',
      date: new Date().toLocaleString()
  }
</script>
```
## 配置项

Weex 也允许我们通过 `<script type="config">` 定义一些配置项，目前，仅只支持配置 `downgrade`。
- `downgrade.osVersion`
- `downgrade.appVersion`
- `downgrade.weexVersion`
- `downgrade.deviceModel`

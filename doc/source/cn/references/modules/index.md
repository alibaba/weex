---
title: 内建模块
type: references
order: 3
has_chapter_content: true
version: 2.1
---

# 内建模块

## 如何使用

你可以简单的通过类似 `weex.requireModule('name')` 这样的语法获取一个模块的 API，比如：

```html
<script>
  const modal = weex.requireModule('modal')

  module.exports = {
    data: {},
    methods: {
      toast: function () {
        modal.toast({
          message: 'props: ' + event.data.join(', ')
        })
      }
    }
  }
</script>
```

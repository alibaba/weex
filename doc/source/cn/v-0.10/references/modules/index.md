---
title: 内建模块
type: references
order: 4
has_chapter_content: true
version: 0.10
---

# 内建模块

## 如何使用

你可以简单的通过类似 `require('@weex-module/name')` 这样的语法获取一个模块的 API，比如：

```javascript
var dom = require('@weex-module/dom')
dom.scrollToElement(this.$el('someIdForElement'), {
  offset: 0
})
```

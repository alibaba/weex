---
title: Built-in Modules
type: references
order: 3
has_chapter_content: true
version: 0.10
---

# Built-in Modules

## How to use

You can use a simply way like `require('@weex-module/name')` to access the apis of module. e.g.

```html
<script>
var dom = require('@weex-module/dom')

module.exports = {
  data: {},
  created: function () {
    dom.scrollToElement(this.$el('someIdForElement'), {
    offset: 0
    })
  }
}
</script>
```
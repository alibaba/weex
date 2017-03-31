---
title: Built-in Modules
type: references
order: 3
version: 2.1
---

# Built-in Modules

## How to use

You can use a simply way like `requireModule('name')` to access the apis of module. e.g.

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
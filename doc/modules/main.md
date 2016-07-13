# Built-in Modules
<span class="weex-version">0.5</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

## How to use

You can use a simply way like `require('@weex-module/name')` to access the apis of module. e.g.

```javascript
var dom = require('@weex-module/dom');
dom.scrollToElement(this.$el('someIdForElement'), {
    offset: 0
});
```
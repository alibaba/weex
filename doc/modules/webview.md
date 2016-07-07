# webview
<span class="weex-version">0.5</span>
<a href="https://github.com/weexteam/article/wiki/%E6%AC%A2%E8%BF%8E%E5%8F%82%E4%B8%8EWeex%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3%E7%BF%BB%E8%AF%91"  class="weex-translate incomplete">cn</a>

## Summary

A series of web operation api like `goBack`, `goForward`,  and `reload`.

## API

### goBack(ref)

##### Description

Loads the previous location in the history stack.

#### Arguments

* `ref`*(string)*: the reference of the web component.
 
##### Example

```js
var webview = require('@weex-module/webview');
var webElement = this.$el('webview');
webview.goBack(webElement.ref);
```

### goForward(ref)

##### Description
Loads the next location in the history stack.

#### Arguments

* `ref`*(string)*: the reference of the web component.
 
##### Example

```js
var webview = require('@weex-module/webview');
var webElement = this.$el('webview');
webview.goForward(webElement.ref);
```
    
### reload(ref)
#### Description
Reloads the current web page.

#### Arguments

* `ref`*(string)*: the reference of the web component.
 
##### Example

```js
var webview = require('@weex-module/webview');
var webElement = this.$el('webview');
webview.reload(webElement.ref);
```




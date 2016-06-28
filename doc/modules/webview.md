# webview
<span class="weex-version">0.5</span>

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




---
title: webview
type: references
order: 4.8
version: 0.10
---

# `webview`

一系列的 `<web>` 组件操作接口。 比如 `goBack`、`goForward`、和 `reload`。`webview` module 与 `<web>` 组件共用。

## 示例

查看 [简单浏览器](../components/web.html) ，一个结合 `<web>` 组件和 `webview` module 的示例。

## API

### `goBack(webElement)`

加载历史记录里的前一个资源地址。

#### 参数

* `webElement {Element}`：`<web>` 组件对象。

#### 示例

```javascript
var webview = require('@weex-module/webview')
var webElement = this.$el('webview')
webview.goBack(webElement)
```

### `goForward(webElement)`

加载历史记录里的下一个资源地址。

#### 参数

* `webElement {Element}`：`<web>` 组件对象。

#### 示例

```javascript
var webview = require('@weex-module/webview')
var webElement = this.$el('webview')
webview.goForward(webElement)
```

### `reload(webElement)`

刷新当前页面。

#### 参数

* `webElement {Element}`：`<web>` 组件对象。

#### 示例

```javascript
var webview = require('@weex-module/webview')
var webElement = this.$el('webview')
webview.reload(webElement.ref)
```

*注意事项：未来 `<web>` 组件的 `Element` 对象将会支持直接这些方法，届时 `webview` module 将不再需要*

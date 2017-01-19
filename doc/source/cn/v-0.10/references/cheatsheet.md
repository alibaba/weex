---
title: Weex 快查手册
type: references
order: 6
version: 0.10
---

# Weex 备忘录

## Native 组件
<style>
code {
  word-break: break-all;
}
</style>

| 组件 | 特性 | 样式 | 事件 | 特殊父组件 | 子组件 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| `<div>` | - | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear` | - | (any) |
| `<text>` | `value` | **box model**<br>flex<br>`position`<br>`background-color`<br>`opacity`<br>`color`<br>`font-size`<br>`font-style`<br>`font-weight`<br>`text-decoration`<br>`text-align`<br>`text-overflow`<br>`line-height` | `click`<br>`appear`<br>`disappear` | - | text only |
| `<image>` | `src` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity`<br>`resize` | `click`<br>`appear`<br>`disappear` | - | (none) |
| `<scroller>` | `show-scrollbar`<br>`scroll-direction` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear` | - | (any) |
| `<list>` | `loadmoreoffset` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear`<br>`loadmore`<br>`refresh`<br>`loading` | - | `<cell>`<br>`<header>`<br>`<refresh>`<br>`<loading>` |
| `<cell>` | - | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear` | `<list>` | (any) |
| `<slider>` | `auto-play` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear`<br>`change` | - | (any)<br>`<indicator>` |
| `<indicator>` | - | **box model**<br>**flexbox**<br>`position`<br>`item-color`<br>`item-selected-color`<br>`item-size` | `click`<br>`appear`<br>`disappear` | `<slider>` | (none) |
| `<wxc-navpage>` | `height`<br>`background-color`<br>`title`<br>`title-color`<br>`left-item-title`<br>`left-item-color`<br>`right-item-title`<br>`right-item-color`<br>`left-item-src`<br>`right-item-src` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear`<br>`naviBar.leftItem.click`<br>`naviBar.rightItem.click` | - | (any) |
| `<wxc-tabbar>` | `tab-items` |  **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `tabBar.onClick` | - | (none) |
| `<embed>` | `src` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear` | - | (none) |
| `<web>` | `src` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear`<br>`pagestart`<br>`pagefinish`<br>`error` | - | (none) |
| `<video>` | `src`<br>`play-status`<br>`auto-play` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear`<br>`start`<br>`pause`<br>`finish`<br>`fail` | - | (none) |
| `<a>` | `href` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `click`<br>`appear`<br>`disappear` | - | (any) |
| `<input>` | `type`<br>`value`<br>`placeholder`<br>`disabled`<br>`autofocus` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity`<br>`placeholder-color`<br>`color`<br>`font-size`<br>`font-style`<br>`font-weight`<br>`text-align` | `click`<br>`appear`<br>`disappear` | - | (none) |
| `<switch>` | `checked` | **box model**<br>**flexbox**<br>`position`<br>`background-color`<br>`opacity` | `appear`<br>`disappear`<br>`input`<br>`change`<br>`focus`<br>`blur` | - | (none) |

## Native Modules

| module | apis |
| ---- | ---- |
| `@weex-module/dom` | `scrollToElement(node, { offset })` |
| `@weex-module/modal` | `toast({ message, duration })`<br>`alert({ message, okTitle }, callback)`<br>`confirm({ message, okTitle, cancelTitle }, callback(result))`<br>`prompt({ message, okTitle, cancelTitle }, callback(result, data))` |
| `@weex-module/stream` | `fetch({ method, url, headers, type, body }, callback({ status, ok, statusText, data, headers }), progressCallback({ readyState, status, length, statusText, headers}))` |
| `@weex-module/webview` | `goBack(ref)`<br>`goForward(ref)`<br>`reload(ref)` |
| `@weex-module/navigator` | `push({ url, animated }, callback)`<br>`pop({ animated }, callback)` |
| `@weex-module/animation` | `transition(node, { styles, duration, timingFunction, delay, transform-origin }, callback)` |

## 特殊的模版语法

* `<foo x="abc">`
* `{% raw %}<foo x="{{expr}}">{% endraw %}`
* `<foo style="name1: value1; name2: value2">`
* `{% raw %}<foo style="name1: value1; name2: {{expr}}; name3: ...">{% endraw %}`
* `<foo class="a b c">`
* `{% raw %}<foo class="a {{expr}} c">{% endraw %}`
* `<foo onclick="methodName">`
* `<foo id="abc">`
* `<foo if="expr">`
* `<foo repeat="item in list">`
* `<foo repeat="(key,item) in list">`
* `<component type="foo">`
* `{% raw %}<component type="{{expr}}">{% endraw %}`

## ViewModel APIs

* `this.$vm(el)`
* `this.$el(el)`
* `this.$getConfig()`
* `this.$emit(type, data)`
* `this.$dispatch(type, data)`
* `this.$broadcast(type, data)`

## ViewModel Options

* `data`
* `methods`
* `computed`
* `init`, `created`, `ready`
* `events`

**示例：**

```javascript
module.exports = {

  data: function () {
    return {
      x: 1,
      y: 2
    }
  }

  methods: {
    foo: function () {
      console.log('foo')
    }
  },

  computed: {
    z: function () {
      return this.x + this.y
    }
  },

  events: {
    custom: function (e) {
      console.log(e)
    }
  },

  init: function () {},
  created: function () {},
  ready: function () {}
}
```

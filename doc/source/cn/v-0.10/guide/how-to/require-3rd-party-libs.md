---
title: 如何引入第三方库 
type: guide
order: 4.3
version: 0.10
---

# 如何引入第三方库 
<span class="weex-version">0.4</span>

在 [Get started](../index.html) 中，我们学习了知道可以在 `<script>` 标签中编写 JavaScript 代码。但是在项目中常用的功能或模块，例如解析url参数，将属性从一些对象扩展到另一个对象等等，在每个组件中复制和粘贴这些代码是一个糟糕的做法，因此迫切需要通过 `require` 的方式对可复用的代码进行管理。Weex 为开发人员提供了 CommonJS 风格的 require 语法。

我们以 `extend` 作为例子。

## 引入本地 JS Modules

下面是 `extend` 最简单的实现，并将其放在 `./common/utils.js` 路径中。

```javascript
function extend(dest, src) {
  for (var key in src) {
    dest[key] = src[key]
  }
}
exports.extend = extend
```

在 `.we` 文件中，`extend` 可以与`require`一起使用：

```html
<script>
  var utils = require('./common/utils')
  var obj1 = {a: 1}
  var obj2 = {b: 2}
  utils.extend(obj1, obj2) // obj1 => {a: 1, b: 2}
</script>
```

## 引入已经安装的 Node.js Modules

[underscore](http://underscorejs.org) 是一个 JavaScript 库，它提供了一整套函数式编程的实用功能，而不扩展任何 JavaScript 内置对象。它提供了一个更具稳健性的 [`extend`](http://underscorejs.org/#extend)。

我们可以使用 underscore 的 `extend`，而不是我们自己实现的版本。首先，在项目中安装 underscore，然后我们便可以将 underscore  `reuqire` 进来并使用它。

```bash
npm install underscore
```

```html
<script>
  var _ = require('underscore')
  var obj1 = {a: 1}
  var obj2 = {b: 2}
  var obj3 = {c: 3}
  var ret = _.extend(obj1, obj2, obj3) // ret => {a: 1, b: 2, c: 3}
</script>
```

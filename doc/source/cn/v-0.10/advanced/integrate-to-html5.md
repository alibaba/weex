---
title: 集成到 web
type: advanced
order: 6
has_chapter_content: true
version: 0.10
---

## 项目中引入 html5 版 Weex

### 简介

Weex 是一个跨平台可扩展的动态化移动框架，能够真正帮助开发者实现'一次开发，到处运行'。由 Weex 提供的相关工具进行打包好的 bundle 文件可以运行在 android, ios 以及 web（这里我们也称之为html5）平台的渲染器上。Weex HTML5 是一个专用于在移动端 webview 以及各种现代浏览器上渲染 weex 文件的渲染器。
### 获取 Weex HTML5

使用 npm 安装最新版本的 Weex HTML5，并在你的项目中 require 进来。
#### 从 npm 安装

请确保通过 `npm install` 或者 `npm update` 获取 Weex HTML5 的最新版本 npm 包。更多关于 npm 的信息情查阅 [npm 官方网站](https://docs.npmjs.com/)。

```bash
npm install weex-html5
```

通过 require 引入 weex-html5:

```bash
var weex = require('weex-html5')
```

**注意:** 介于 Weex 目前仍处于开源内测阶段，还没有完全开放源代码，因此 `weex-jsframework` 可能还没有在 npm 上发布。当前版本的 `weex-html5` 包含了 `weex-jsframework`，你只需要 require `weex-html5` 即可暂时在 web 平台上运行 weex 代码。建议关注 Weex 的后续版本发布并做必要的引用方式调整。
### 初始化 Weex

你可以通过 Weex 暴露的 API `init` 来初始化一个 Weex 实例。这个方法需要传递一些配置信息已确定一些环境变量等信息，这些配置信息介绍如下：
- `appId`: Weex 实例的 id，可以是任意字符串或者数字，并注意不要重复.
- `source`: 请求的 Weex bundle 文件地址，或者 Weex bundle 文件代码本身，取决于下面的 loader 配置.
- `loader`: 加载器类型，用于加载 weex bundle，值可以是 'xhr', 'jsonp' 或者 'source'.
  - `xhr`: 通过 XMLHttpRequest 加载 source(即 weex bundle 的 url 地址).
  - `jsonp`: 通过 JSONP 加载 weex bundle.
  - `source`: 直接接受 weex bundle 的代码作为参数.
- `rootId`: root 容器的 id，默认容器 id 是 'weex'.

以下是一个 Weex 初始化的示例:

``` javascript
function weexInit() {
  function getUrlParam (key) {
    var reg = new RegExp('[?|&]' + key + '=([^&]+)')
    var match = location.search.match(reg)
    return match && match[1]
  }

  var loader = getUrlParam('loader') || 'xhr'
  var page = getUrlParam('page')

  // 需要指定一个jsonp回调函数名称，如果没有则用默认值'weexJsonpCallback'
  var JSONP_CALLBACK_NAME = 'weexJsonpCallback'

  window.weex.init({
    jsonpCallback: JSONP_CALLBACK_NAME,
    appId: location.href,
    source: page,
    loader: loader,
    rootId: 'weex'
  })
}

weexInit()
```

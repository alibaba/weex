---
title: weex-html5 扩展
type: advanced
order: 11
has_chapter_content: true
version: 0.10
---

# 扩展 weex-html5

### 简介

Weex 是一个高可扩展性的跨平台动态化开发方案，你可以在现有组件基础上定制自己需要的三端组件。你可以为 Weex API 模块添加新的方法，或者创建新的 API 模块和新的加载器。按照以下几个步骤扩展你的组件，API 或者加载器。

首先要明确的是，组件和 API 模块是基于 Weex 的扩展，但是独立于 Weex，组件的定义本身是不需要依赖于 Weex 的，这样有助于组件的分散化管理，去除中心化依赖。

其次，当你扩展一个组件，你需要同时扩展三端的组件（android, ios 和 web 端），毕竟 Weex 是一个重视三端一致体验的跨平台移动框架。你可以一个端一个端的扩展，也可以召唤其他端上的开发者来共同完成你在其他端上的组件（你总是可以在社区找到对某个功能有共同需求的开发者）。这里有一些在 [android 端](./extend-to-android.md)和 [ios 端](./extend-to-ios.md)做扩展的文档可以参考。

你应该将你的扩展发布到 Weex 开发者可以方便找到和使用的渠道，比如 `npm`。我们推荐你将你开发的组件发布到 `npm` 供其他 Weex 开发者使用。

最重要的是，你的组件的命名需要遵守 Weex 组件命名规范：以 `weex-` 开头作为组件的前缀，并且以 `-<platform>` 做为结尾后缀，除非你发布的包是三端的实现都包含在内的。这里有个 [`<weex-hello-web`>](https://github.com/MrRaindrop/weex-hello-web) 的例子作为参考，这里注册了一个简单的自定义的组件。

### 创建新组件

步骤:
1. 在你的组件实现中必须继承 `Weex.Component` 这个类, 并选择性的重写其中的一些方法。
2. 你的组件的 exports 需要暴露一个 `init` 方法，并在其中使用 `Weex.registerComponent` 注册你的组件。

**这里用一个例子展示如何扩展一个新的组件**

看这个组件扩展的代码( web 端上的组件)：

``` javascript
const attr = {
  // ...
}
const style = {
  // ...
}
const event = {
  // ...
}
// 每个扩展组件都需要实现一个init方法，Weex会通过这方法进行安装和注册.
function init (Weex) {
  const Component = Weex.Component
  const extend = Weex.utils.extend

  // 组件的构造函数
  function Hello (data) {
    Component.call(this, data)
  }

  // prototype继承
  Hello.prototype = Object.create(Component.prototype)
  extend(Hello.prototype, proto)

  // 配置属性、样式以及事件
  extend(Hello.prototype, { attr })
  extend(Hello.prototype, {
    style: extend(Object.create(Component.prototype.style), style)
  })
  extend(Hello.prototype, { event })

  Weex.registerComponent('weex-hello', Hello)
}

// 暴露init方法接口.
export default { init }
```

上述代码摘引自 [weex-hello-web/src/index.js](https://github.com/MrRaindrop/weex-hello-web/blob/master/src/index.js#L46-L65)

这个demo重写了基类 `Component`中的`create`方法。你也可以选择重写`Component`中的一些其他方法来定制组件的行为。典型的方法包括：
- `create`: 创建组件的节点，在方法体中return这个节点.
- `createChildren` 创建子节点.
- `insertBefore` 在某个子节点之前插入一个新的子节点.
- `appendChild` 在子节点列表的最后加上一个节点.
- `removeChild` 移除一个子节点.

**进阶**：更多关于组件定制和扩展的细节和代码展示，可以参考 [weex 主仓库的代码](https://github.com/alibaba/weex/tree/dev/html5/browser/extend/components)，这里的组件基本上都是通过上述方式进行定义的。

重要的一点，注册组件的关键方法是 `Weex.registerComponent`，如示例里的 `weex-hello` 组件的注册：

``` javascript
Weex.registerComponent('weex-hello', Hello)
```

上述代码引自 [weex-hello-web/src/index.js](https://github.com/MrRaindrop/weex-hello-web/blob/master/src/index.js#L62)

在某个需要使用该组件的weex项目中使用 `Weex.install` 方法安装该组件：

``` javascript
// import the original weex-html5.
import weex from 'weex-html5'
import hello from 'weex-hello-web'
// install the component.
weex.install(hello)
```

上述代码引自 [weex_extend_demo/src/main.js](https://github.com/MrRaindrop/weex_extend_demo/blob/master/src/main.js#L1-L5)

在你的 `.we` 文件中直接使用这个组件：

``` html
<template>
  <div>
    <weex-hello class="hello" style="txt-color:#fff;bg-color:green"
      value="WEEX" onclick="handleClick">
    </weex-hello>
  </div>
</template>
```

上述代码引自[weex_extend_demo/demo/index.we](https://github.com/MrRaindrop/weex_extend_demo/blob/master/demo/index.we#L10-L15)
### 扩展API

你可以扩展新的 API 模块，或者为某个已有的模块添加新的 API. 比如，你可以添加一个 API 模块叫做 `user`，在里面添加一些用户登录登出处理的 API，比如 `login`, `logout` 等等。你可以通过 `require('@weex-module/moduleName)[methodName](arg1, arg2, ...)` ([Module APIs](../references/api.md)) 的方式调用你的 API.

步骤:
1. 实现你的 API module.
2. 在你的 API 安装模块里暴露一个 `init` 方法，并在这个方法里面使用 `Weex.registerAPIModules` 注册你的 API module.

**这里用一个例子展示如何扩展一个新的 API 模块**

创建一个文件 `user.js`，在其中定义登录登出 `login/logout` 方法.

``` javascript
const user = {
  // 定义用户登录方法.
  login (callbackId) {
    login.then(res => {
      this.sender.performCallback(callbackId, res)
    }).catch(err => {
      this.sender.performCallback(callbackId, err)
    })
  },

  // 定义用户登出方法.
  logout (callbackId) {
    logout.then(res => {
      this.sender.performCallback(callbackId, res)
    }).catch(err => {
      this.sender.performCallback(callbackId, err)
    })
  }
}

// 定义user模块的元 (meta) 信息.
const meta = {
  user: [{
    name: 'login',
    args: ['function']
  }, {
    name: 'logout',
    args: ['function']
  }]
}

export default {
  init (Weex) {
    // 注册这个模块，最后一个参数是模块的元信息.
    Weex.registerApiModule('user', user, meta)
  }
}
```

这个简单的 user helper 模块就实现好了，可以发布到 npm 上，我们可以给这个模块取个名字，比如说 `weex-user-helper`。

在你的新的 Weex 项目里安装这个模块:

``` javascript
import Weex from 'weex-html5'
import user from 'weex-user-helper'

Weex.install(user)
```

安装了这个模块，你就可以在 DSL 代码里引用这个模块干点事情了:

``` html
<template>
  <div>
    <div class="btn" onclick="handleClick">
      <text>LOGIN</text>
    </div>
  </div>
</template>

<script>
  var userHelper = require('@weex-module/user')
  module.exports = {
    methods: {
      handleClick: function () {
        userHelper.login(function () {
          // ... do sth. in callback.
        })
      }
    }
  }
</script>
```

### 定制加载器loader

**Loader仅用于weex-html5 (web端)加载dsl打包出来的bundle代码，native平台有其他的加载机制**

已有的加载器包括 `xhr`, `jsonp` 和 `source`. 你可以使用 `weex.registerLoader` 注册一个新的加载器。例如，你有一个获取 Weex bundle 的服务 `myServe.getWeexBundle` , 通过这个服务可以加载 weex bundle，为此你可以定义一个加载器：

``` javascript
function loadByMyServe(pageId, callback) {
  myServe.getWeexBundle(pageId).then(function (bundle) {
    callback(bundle)
  }).catch(function(err) {
    callback(err)
  })
}

// 暴露init方法用于Weex安装此加载器.
export default {
  init (Weex) {
    Weex.registerLoader('myserve', loadByMyServe)
  }
}
```

在你的 weex-html5 项目的启动文件里安装并使用这个加载器：

``` javascript
import Weex from 'weex-html5'

// 或者import from './myserve.js'，不管是import一个npm模块还是import一个文件.
import loader from 'myLoader'

Weex.install(loader)

// 在init方法里使用这个加载器加载bundle文件.
(function () {
  function getUrlParam (key) {
    const reg = new RegExp('[?|&]' + key + '=([^&]+)')
    const match = location.search.match(reg)
    return match && match[1]
  }
  const page = getUrlParam('page') || 'examples/build/index.js'
  Weex.init({
    appId: location.href,
    loader: 'myserve',  // 使用刚才定义的loader类型
    source: page,
    rootId: 'weex'
  })
})();
```

以上是 Weex 带来的扩展性里比较主要的一部分，更多实现细节可以在 [weex 项目代码库](https://github.com/alibaba/weex)以及 weex 的开源社区里找到。

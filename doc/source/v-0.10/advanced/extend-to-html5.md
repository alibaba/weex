---
title: Extend to web
type: advanced
order: 8
has_chapter_content: true
version: 0.10
---

# Extend Weex HTML5

### Intro

Weex is a extendable cross-platform solution for dynamic programming and publishing projects. You can build your own components on web platform or native platform by extending the components system. Also you can extend weex by adding new methods for one module, new moudles or new bundle loaders. Follow the steps bellow you can dive into the journy of creating multiple builtin components, APIs and loaders.

First of all, components, APIs and loaders are extensions to weex, so you can create your extensions without requiring the weex package, that means your extensions can be totally standalone. 

Second, you should always implement a extension for all the three platforms (android, ios and web), except that you only use it on one specific platform. After all weex is a cross platform framework and the equality of user expierence in all platforms is very important. Although you can create components separately on one platform by another, or welcome other developers on other platforms to join your work (You can always find coders who want the same feature with you in the commity). Here are docs about how to create native extensions on [ios](./extend-to-ios.html) and [android](./extend-to-android.html). 

You should publish your extensions somewhere weex developers can easily find, somewhere popular, independent and easy to search and use, such as, npm. Npm is what we strongly recommended.

The most important thing is, you'd better name your extension appropriately: it should begin with a `weex-` if it is a weex extension, and it should end up with a `-<platform>` as a platform mark. If your package is wrapped up with all the three platforms you can ignore it through. Here is a demonstrating component [`<weex-hello-web>`](https://github.com/MrRaindrop/weex-hello-web) to show how to define your own component.

### Create a new component

Steps:

1. Extend `Weex.Component`, override methods of component class.
2. Use `Weex.registerComponent` to register your customized component in the `init` method of the installation module.
3. export the `init` method for the installation (Every weex-html5 extension has to have a `init` method in the export object, which is for another weex project to install.)

Here's a example to create a weex component for web platform (weex-html5):

```javascript
const attr = {
  // ...
}
const style = {
  // ...
}
const event = {
  // ...
}
// every extension file should have a init method.
function init (Weex) {
  const Component = Weex.Component
  const extend = Weex.utils.extend

  // the component's constructor
  function Hello (data) {
    Component.call(this, data)
  }

  // extend the prototype
  Hello.prototype = Object.create(Component.prototype)
  extend(Hello.prototype, proto)

  // config the attributes, styles and events.
  extend(Hello.prototype, { attr })
  extend(Hello.prototype, {
    style: extend(Object.create(Component.prototype.style), style)
  })
  extend(Hello.prototype, { event })

  Weex.registerComponent('weex-hello', Hello)
}

// export the init method.
export default { init }
```

The code above is extracted from [weex-hello-web/src/index.js](https://github.com/MrRaindrop/weex-hello-web/blob/master/src/index.js#L46-L65).

This demo has overrided the `create` method of the base class `Component`. You can also override other methods to customize your component's behavior. The typical methods of class `Component` you may override are:

* `create`: to create the node of the component, and return it.
* `createChildren` to create the children's nodes.
* `insertBefore` to insert a child before another child.
* `appendChild` to append a child in the children list.
* `removeChild` to remove a child in the children list.

**Advanced**: Need more code demonstrations about overriding the component's methods ? Just take a look at the [weex repo's code](https://github.com/alibaba/weex/tree/dev/html5/browser/extend/components). Basically the most of the built-in components are defined this way.

Important! To register your component in the `init` method, use `Weex.registerComponent`. Here's the demo code:

```javascript
Weex.registerComponent('weex-hello', Hello)
```

The code above is from [weex-hello-web/src/index.js](https://github.com/MrRaindrop/weex-hello-web/blob/master/src/index.js#L62)

Install the component using `Weex.install`.

```javascript
// import the original weex-html5.
import weex from 'weex-html5'
import hello from 'weex-hello-web'
// install the component.
weex.install(hello)
```

The code above is from [weex_extend_demo/src/main.js](https://github.com/MrRaindrop/weex_extend_demo/blob/master/src/main.js#L1-L5)

use the component in your `.we` file:

```html
<template>
  <div>
    <weex-hello class="hello" style="txt-color:#fff;bg-color:green"
      value="WEEX" onclick="handleClick">
    </weex-hello>
  </div>
</template>
```

The code above is from [weex_extend_demo/demo/index.we](https://github.com/MrRaindrop/weex_extend_demo/blob/master/demo/index.we#L10-L15)

### Add a new API

You can add new API modules, or just add a new API for any existing API modules. For example, you can add a new module `user` with APIs like 'login', 'logout' etc. The developer can invoke the API by using `require('@weex-module/moduleName)[methodName](arg1, arg2, ...)` ([Module APIs](../references/api.html)).

Steps:

1. Implement your API modules.
2. Use `Weex.registerAPIModules` to register your API modules in the init method of your installation module.

**Here is a example for register a new API module**

First create a file named `user.js` for a new module, then define `login/logout` methods.

```javascript
const user = {
  // for user to login.
  login (callbackId) {
    login.then(res => {
      this.sender.performCallback(callbackId, res)
    }).catch(err => {
      this.sender.performCallback(callbackId, err)
    })
  },
  
  // for user to logout.
  logout (callbackId) {
    logout.then(res => {
      this.sender.performCallback(callbackId, res)
    }).catch(err => {
      this.sender.performCallback(callbackId, err)
    })
  }
}

// add meta info to user module.
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
    // Register your new module. The last parameter is your
    // new API module's meta info.
    Weex.registerApiModule('user', user, meta)
  }
}
```

After above coding work, you can publish this user helper API to npm now, for example, with the name of `weex-user-helper`.

Install the component using `Weex.install` in your new weex project.

```javascript
import Weex from 'weex-html5'
import user from 'weex-user-helper'

Weex.install(user)
```

Use the user helper API in your dsl code (xxx.we):

```html
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

### Add a new loader

**Loader is only a type of extension for weex-html5 (web platform), native platform is not needing this.**

Weex's builtin loaders to load a weex bundle are `xhr`, `jsonp` and `source`. The default loader is `xhr`. You can register your own loader by using `weex.registerLoader`. For example, you got a service method named `myServe.getWeexBundle`, which can load a weex bundle file through some magical tunnel:

```javascript
function loadByMyServe(pageId, callback) {
  myServe.getWeexBundle(pageId).then(function (bundle) {
    callback(bundle)
  }).catch(function(err) {
    callback(err)
  })
}

// export the init method to enable weex install this loader.
export default {
  init (Weex) {
    Weex.registerLoader('myserve', loadByMyServe)
  }
}
```

install and use your loader in your project's entry file:

```javascript
import Weex from 'weex-html5'

// or import from './myserve.js', no matter where you can import your loader file.
import loader from 'myLoader'

Weex.install(loader)

// use your loader in the init function:
(function () {
  function getUrlParam (key) {
    const reg = new RegExp('[?|&]' + key + '=([^&]+)')
    const match = location.search.match(reg)
    return match && match[1]
  }
  const page = getUrlParam('page') || 'examples/build/index.js'
  Weex.init({
    appId: location.href,
    loader: 'myserve',  // use the loader type you defined.
    source: page,
    rootId: 'weex'
  })
})();
```

That's the major extension feature weex brought to you. The deep details can be found in the [weex's repo](https://github.com/alibaba/weex) and the weex's community.


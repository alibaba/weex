## Extend Weex HTML5
<span class="weex-version">0.4</span>
<a href="https://github.com/weexteam/article/issues/11"  class="weex-translate">cn</a>

### Intro

Weex is a extendable cross-platform solution for dynamic programming and publishing projects. You can build your own components on web platform or native platform by extending the components system. Also you can extend weex by adding new methods for one module, new moudles or new bundle loaders. Follow the steps bellow you can dive into the journy of creating multiple builtin components, APIs and loaders.

### Create new component

Steps:

1. Require `weex-html5` package as `Weex` (or any other name you like).
2. Extend `Weex.Component`, override methods of component class.
3. Use `Weex.registerComponent` to register your customized component in the `init` method of the installation module.

You can override any method of class `Component` to customize your component's behavior. The typical methods of class `Component` you should override are:

* create
* createChildren
* insertBefore
* removeChild
* bindEvents

**Here is a example for creating a new component**

The component's implementation file `new-component.js`:

```javascript
// require weex-html5
var Weex = require('weex-html5')
var Component = Weex.Component

// The constructor of your component.
function NewComponent(data) {
  this.someAttr = data.attr.someAttr
  Component.call(this, data)
}

// Extend from Weex.Component.
NewComponent.prototype = Object.create(Component.prototype)

// Override the "create" method to build elements for the component.
NewComponent.prototype.create = function () {
  var node = document.createElement('div')
  node.setAttribute('data-some-attr', this.someAttr)
  return node
}

// Setup setters for updatable attributes.
NewComponent.prototype.attr = {
  updatableAttr: function (value) {
    this.node.setAttribute('data-updatable-attr', value)
  }
}

module.exports = NewComponent
```

Register your component in the init method of the installation module `installModule.js`

```javascript
var NewComponent = require('new-component.js')
module.exports = {
  init: function (Weex) {
    Weex.registerComponent('new-component', NewComponent)
  }
}
```

Install your module:

```javascript
var Weex = require('weex-html5')
var installationModule = require('installModule.js')

Weex.install(installationModule)
```

### Add new API

You can add new API modules, or just add a new API for any existing API modules. For example, you can add a new module `user` with APIs like 'login', 'logout' etc. Or you can just add a single new method such as `setTitle` for the exsiting module `pageInfo`. Whichever way you use, the developer can invoke the API by using `require('@weex-module/moduleName)[methodName](arg1, arg2, ...)` ([Module APIs](../references/api.md)).

Steps:

1. Require `weex-html5` package as `Weex` (or any other name you like).
2. Require your API modules.
3. Use `Weex.registerAPIModules` to register your API modules in the init method of your installation module.
4. Or use `Weex.registerAPI` to register your API for existing API modules in the init method of your installation module.

**Here is a example for register a new API module**

First create a file named `user.js` for a new module, then define `login/logout` methods.

```javascript
var user = {
  login: function (callbackId) {
    var self = this
    // your logic code.
    login.then(function (res) {
      self.sender.performCallback(callbackId, res)
    }).catch(function (err) {
      self.sender.performCallback(callbackId, err)
    })
  },

  logout: function (callbackId) {
    var self = this
    // your logic code.
    logout.then(function (res) {
      self.sender.performCallback(callbackId, res)
    }).catch(function (err) {
      self.sender.performCallback(callbackId, err)
    })
  }
}

// add meta info to user module.
user._meta = {
  user: [{
    name: 'login',
    args: ['function']
  }, {
    name: 'logout',
    args: ['function']
  }]
}

module.exports = user
```

Register your `user` module in the `installationModule.js`:

```javascript
// Require your module file, which is user.js.
var user = require('./user')

module.exports = {
  init: function (Weex) {
    // Register your new module. The last parameter is your
    // new API module's meta info.
    Weex.registerApiModule('user', user, user._meta)
  }
}
```

Install your module:

```javascript
var Weex = require('weex-html5')
var installationModule = require('installationModule.js')

Weex.install(installationModule)
```


**Another example for register a API to a exsiting API module**

First create a file named `pageInfo.js`, then define `setTitle` method:

```javascript
var pageInfo = {
  setTitle: function (title) {
    document.title = title
  }
}
```

Register `setTitle` method to the `pageInfo` module in the `installationModule.js`:

```javascript
var weex = require('weex-html5')

// Require your module file, which is pageInfo.js.
var pageInfo = require('./pageInfo')

module.exports = {
  init: function (Weex) {
    // Register your new method. The last parameter is your API's meta info.
    Weex.registerApi('pageInfo', 'setTitle', pageInfo.setTitle, ['string', 'string'])
  }
}
```

install the isntallation module:

```javascript
var Weex = require('weex-html5')
var installationModule = require('installationModule.js')

Weex.install(installationModule)
```

### Add new loader

The type of buildin loaders to load a weex bundle are `loadByXHR`, `loadByJsonp` and `loadBySourceCode`. You can register your own loader by using `weex.registerLoader`. For example, you got a service method named `myServe.getWeexBundle`, which can load a weex bundle file throught some magical tunnel:

```javascript
function loadByMyServe(pageId, callback) {
  myServe.getWeexBundle(pageId).then(function (bundle) {
    callback(bundle)
  }).catch(function(err) {
    callback(err)
  })
}

module.exports = {
  loadByMyServe: loadByMyServe
}
```

Register your loader in your installation module `loaderMod.js` and then install it:

```javascript
// Require your new loader.
var loadByMyServe = require('./loader').loadByMyServe

module.exports = {
  init: function (Weex) {
    // Register your new loader.
    Weex.registerLoader('myserve', loadByMyServe)
  }
}
```

install:

```javascript
var Weex = require('weex-html5')
var loaderMod = require('loaderMod.js')

Weex.install(loaderMod)
```





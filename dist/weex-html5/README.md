## weex-html5

### Intro

Weex is a solution for developers to build a world-class projects on multiple platforms (include both native and web platforms) based on html-css-javascript liked domain specific language. Weex is focused on lightweight, extendable and high performance, and the finally destination -- write once, run anywhere.

The dot we code transformed to weex bundle can currently run on android, ios and web platform. Weex HTML5 is a renderer for weex bundle to run in a webview or a browser environment.

### Get Weex HTML5

Use npm to install the latest version of Weex HTML5, require it from your code in the commonJS way and use it as a npm package. You can import Weex HTML5 from the javascript file as in the node modules' path `node_modules/weex-html5/dist/weex.js`, as in this way you don't need to require weex-jsframework manually since it is already embeded.

#### Install from npm

Make sure you get the latest version by `npm install` or `npm update`. Want more info about npm cmd? Please checkout the [npm official site](https://docs.npmjs.com/).

```
npm install weex-html5
```

#### use weex-html5

require weex-html5.

```
require('weex-html5');
```

or you can import script from `dist/weex.js`

This `weex.js` includes both `weex-jsframework` and `weex-html5`.

```
 <script src="./node_modules/weex-html5/dist/weex"></script>
```

Then you can use `window.weex` in the page.

### DEMO

In the root path of `node_modules/weex-html5`, the index page can show a simple demo whos source code is in the path `node_modules/weex-html5/demo/index.we`.

### Initialize

Once you have imported the weex-html5 into your page, you can use `window.weex` to initialize weex through the API ``init``. This method takes a config object as argument to confirm the runtime infomation and environment. Following parameters can be set by this config object:

* ``appId``: app instance id, can be either a string or a number
* ``source``: the requested url of weex bundle, or the transformed code it self.
* ``loader``: loader to load the request weex bundle, whose value is from 'xhr' or 'jsonp' or 'source'.
  * ``xhr``: load the source (weex bundle url) by XHR
  * ``source``: the source parameter above should be a weex bundle content (transformed bundle).
* ``rootId``: id of the root element. Default value is 'weex'.

Here is a example to do the initialzation:

```
(function () {
  function getUrlParam (key) {
    var reg = new RegExp('[?|&]' + key + '=([^&]+)')
    var match = location.search.match(reg)
    return match && match[1]
  }

  var loader = getUrlParam('loader') || 'xhr'
  var page = getUrlParam('page') || 'demo/build/index.js'

  window.weex.init({
    appId: location.href,
    loader: loader,
    source: page,
    rootId: 'weex'
  })
})();
```

### Initialize with multiple instances

```
var weexConfig = [{
  appId: 'weexCt1',
  source: '//your-source-provider/bundle1.js',
  loader: 'xhr',
  width: document.querySelector('#weexCt1').getBoundingClientRect().width,
  rootId: 'weexCt1'
}, {
  appId: 'weexCt2',
  source: '//your-source-provider/bundle2.js',
  loader: 'xhr',
  width: document.querySelector('#weexCt2').getBoundingClientRect().width,
  rootId: 'weexCt2'
}]

function weexInit() { 
  // Init with multiple config objects for multiple instances.
  window.weex.init(weexConfig)
}

weexInit()
```

### Extend

Weex is a extendable framework. You can extend the components and APIs by using the methods like `Weex.install`. Here are the ways to extend your components and APIs.

#### Extend the component

Let's say, you want to extend a component `MyComponent` from the base class `Weex.Componnet`. You can firstly create a installer with a `init` method to register your component, then require this module and install it by using `Weex.install`.

```
// MyComponent.js
module.exports = {
  init: function (Weex) {
    function MyComponent(data) {
      // ...
      Weex.Component.call(this, data)
    }
    Weex.Component.prototype = Object.create(MyComponent)
    Weex.Component.prototype.myMethod = function () {
      // ...
    }
    Weex.registerComponent('MyComponent', MyComponent)
  }
}

var weex = require('weex-html5')
weex.install(require('./MyComponent.js'))
```

#### Extend the API

```
// myAPIModule.js
var myAPIModule = {
  hello: function() {
    nativeLog('hello world!')
  }
}
myAPIModule._meta = {
  myAPIModule: [{
    name: 'hello',
    args: []
  }]
}
module.exports = {
  init: function (Weex) {
    Weex.registerApiModule('myAPIModule', myAPIModule, myAPIModule._meta)
  }
}

var weex = require('weex-html5')
weex.install(require('./myAPIModule.js'))
```

### MORE

* More info: [Weex official site](http://alibaba.github.io/weex/)
* Document : [Weex DOC](http://alibaba.github.io/weex/doc/)


## Integrate Weex HTML5 to your project
<span class="weex-version">0.4</span>

### Intro

Weex is a extendable cross-platform solution for dynamic programming and publishing projects, which is for developers to write code once and run the code everywhere.

The bundle transformed from the source can currently run on android, ios and web platform. Weex HTML5 is a renderer for weex bundle to run on a webview or a modern browser etc.

### Get Weex HTML5

Use npm to install the latest version of Weex HTML5, require it in your code by CommonJS and use it as a npm package. You should require Weex JS Framework as well, which is as a dependency to Weex HTML5.

#### Install from npm

Make sure you get the latest version by `npm install` or `npm update`. For more information of npm, please visit the [npm official site](https://docs.npmjs.com/).

```
npm install weex-jsframework
npm install weex-html5
```

require weex-jsframework and weex-html5:

```
require('weex-jsframework')
var weex = require('weex-html5')
```

**Note:** Since Weex is in a beta test phase, not fully open-sourced yet, the `weex-jsframework` may haven't been published to npm yet. You may have to wait for our code to fully open-sourced and till then you can install it from npm anytime you want.

### Initialize and run

You can initialize weex through the API `init`. This method takes a config object as the first argument to confirm the runtime infomation and environment. Following parameters can be set by this config object:

* `appId`: app instance id, can be either a string or a number
* `source`: the requested url of weex bundle, or the transformed code it self.
* `loader`: the loader type to load the weex bundle, which value is 'xhr' or 'jsonp' or 'source'.
  * `xhr`: load the source (weex bundle url) by XHR
  * `jsonp`: load the source bundle by JSONP
  * `source`: the source parameter above should be a weex bundle content (transformed bundle).
* `rootId`: the id of the root element. Default value is 'weex'.

Here is a example to do the initialzation:

```
function weexInit() {
  function getUrlParam (key) {
    var reg = new RegExp('[?|&]' + key + '=([^&]+)')
    var match = location.search.match(reg)
    return match && match[1]
  }

  var loader = getUrlParam('loader') || 'xhr'
  var page = getUrlParam('page')

  // jsonp callback name should be specified or be the default
  // value 'weexJsonpCallback' if the 'jsonp' loader is used.
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




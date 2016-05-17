'use strict'

require('./styles/base.css')

var config = require('./config')
var Loader = require('./loader')
var utils = require('./utils')
var protocol = require('./protocol')
var ComponentManager = require('./componentManager')
var Component = require('./components/component')
var Sender = require('./bridge/sender')
var receiver = require('./bridge/receiver')

// Components and apis.
var components = require('./components')
var api = require('./api')
require('envd')
require('httpurl')

var WEAPP_STYLE_ID = 'weapp-style'

var DEFAULT_DESIGN_WIDTH = 750
var DEFAULT_SCALE = window.innerWidth / DEFAULT_DESIGN_WIDTH
var DEFAULT_ROOT_ID = 'weex'
var DEFAULT_JSON_CALLBACK_NAME = 'weexJsonpCallback'

window.WXEnvironment = {
  weexVersion: config.weexVersion,
  appName: lib.env.aliapp ? lib.env.aliapp.appname : null,
  appVersion: lib.env.aliapp ? lib.env.aliapp.version.val : null,
  platform: 'Web',
  osName: lib.env.browser ? lib.env.browser.name : null,
  osVersion: lib.env.browser ? lib.env.browser.version.val : null,
  deviceHeight: window.innerHeight / DEFAULT_SCALE
}

var _instanceMap = {}
var _downgrades = {}

var downgradable = ['list', 'scroller']

; (function getGlobalDowngradesFromUrlParams() {

  // Get global _downgrades from url's params.
  var params = lib.httpurl(location.href).params
  for (var k in params) {
    if (params[k] !== true && params[k] !== 'true') {
      continue
    }
    var match = k.match(/downgrade_(\w+)/)
    if (!match || !match[1]) {
      continue
    }
    var downk = match[1]
    if (downk && (downgradable.indexOf(downk) !== -1)) {
      _downgrades[downk] = true
    }
  }

})()

function Weex(options) {

  if (!(this instanceof Weex)) {
    return new Weex(options)
  }

  // Width of the root container. Default is window.innerWidth.
  this.width = options.width || window.innerWidth
  this.bundleUrl = options.bundleUrl || location.href
  this.instanceId = options.appId
  this.rootId = options.rootId || (DEFAULT_ROOT_ID + utils.getRandom(10))
  this.designWidth = options.designWidth || DEFAULT_DESIGN_WIDTH
  this.jsonpCallback = options.jsonpCallback || DEFAULT_JSON_CALLBACK_NAME
  this.source = options.source
  this.loader = options.loader

  this.data = options.data

  this.initDowngrades(options.downgrade)
  this.initScale()
  this.initComponentManager()
  this.initBridge()
  Weex.addInstance(this)

  protocol.injectWeexInstance(this)

  this.loadBundle(function (err, appCode) {
    if (!err) {
      this.createApp(config, appCode)
    } else {
      console.error('load bundle err:', err)
    }
  }.bind(this))

}

Weex.init = function (options) {
  if (utils.isArray(options)) {
    options.forEach(function (config) {
      new Weex(config)
    })
  } else if (
      Object.prototype.toString.call(options).slice(8, -1) === 'Object'
    ) {
    new Weex(options)
  }
}

Weex.addInstance = function (instance) {
  _instanceMap[instance.instanceId] = instance
}

Weex.getInstance = function (instanceId) {
  return _instanceMap[instanceId]
}

Weex.prototype = {

  initDowngrades: function (dg) {
    this.downgrades = utils.extend({}, _downgrades)
    // Get downgrade component type from user's specification
    // in weex's init options.
    if (!utils.isArray(dg)) {
      return
    }
    for (var i = 0, l = dg.length; i < l; i++) {
      var downk = dg[i]
      if (downgradable.indexOf(downk) !== -1) {
        this.downgrades[downk] = true
      }
    }
  },

  initBridge: function () {
    receiver.init(this)
    this.sender = new Sender(this)
  },

  loadBundle: function (cb) {
    Loader.load({
      jsonpCallback: this.jsonpCallback,
      source: this.source,
      loader: this.loader
    }, cb)
  },

  createApp: function (config, appCode) {
    var root = document.querySelector('#' + this.rootId)
    if (!root) {
      root = document.createElement('div')
      root.id = this.rootId
      document.body.appendChild(root)
    }

    var promise = window.createInstance(
      this.instanceId
      , appCode
      , {
        bundleUrl: this.bundleUrl,
        debug: config.debug
      }
      , this.data
    )

    if (Promise && promise instanceof Promise) {
      promise.then(function () {
        // Weex._instances[this.instanceId] = this.root
      }.bind(this)).catch(function (err) {
        if (err && config.debug) {
          console.error(err)
        }
      })
    }

    // Do not destroy instance here, because in most browser
    // press back button to back to this page will not refresh
    // the window and the instance will not be recreated then.
    // window.addEventListener('beforeunload', function (e) {
    // })

  },

  initScale: function () {
    this.scale = this.width / this.designWidth
  },

  initComponentManager: function () {
    this._componentManager = new ComponentManager(this)
  },

  getComponentManager: function () {
    return this._componentManager
  },

  getRoot: function () {
    return document.querySelector('#' + this.rootId)
  }
}

Weex.appendStyle = function (css) {
  utils.appendStyle(css, WEAPP_STYLE_ID)
},

// Register a new component with the specified name.
Weex.registerComponent = function (name, comp) {
  ComponentManager.registerComponent(name, comp)
},

// Register a new api module.
// If the module already exists, just add methods from the
// new module to the old one.
Weex.registerApiModule = function (name, module, meta) {
  if (!protocol.apiModule[name]) {
    protocol.apiModule[name] = module
  } else {
    for (var key in module) {
      if (module.hasOwnProperty(key)) {
        protocol.apiModule[name][key] = module[key]
      }
    }
  }
  // register API module's meta info to jsframework
  if (meta) {
    protocol.setApiModuleMeta(meta)
    window.registerModules(protocol.getApiModuleMeta(name), true)
  }
},

// Register a new api method for the specified module.
// opts:
//  - args: type of arguments the API method takes such
//    as ['string', 'function']
Weex.registerApi = function (moduleName, name, method, args) {
  if (typeof method !== 'function') {
    return
  }
  if (!protocol.apiModule[moduleName]) {
    protocol.apiModule[moduleName] = {}
    protocol._meta[moduleName] = []
  }
  protocol.apiModule[moduleName][name] = method
  if (!args) {
    return
  }
  // register API meta info to jsframework
  protocol.setApiMeta(moduleName, {
    name: name,
    args: args
  })
  window.registerModules(protocol.getApiModuleMeta(moduleName, meta), true)
},

// Register a new weex-bundle-loader.
Weex.registerLoader = function (name, loaderFunc) {
  Loader.registerLoader(name, loaderFunc)
}

// To install components and plugins.
Weex.install = function (mod) {
  mod.init(Weex)
}

Weex.stopTheWorld = function () {
  for (var instanceId in _instanceMap) {
    if (_instanceMap.hasOwnProperty(instanceId)) {
      window.destroyInstance(instanceId)
    }
  }
}

(function startRefreshController() {
  if (location.search.indexOf('hot-reload_controller') === -1)  {
    return
  }
  if (!window.WebSocket) {
    console.info('auto refresh need WebSocket support')
    return
  }
  var host = location.hostname
  var port = 8082
  var client = new WebSocket('ws://' + host + ':' + port + '/',
    'echo-protocol'
  )
  client.onerror = function () {
    console.log('refresh controller websocket connection error')
  }
  client.onmessage = function (e) {
    console.log('Received: \'' + e.data + '\'')
    if (e.data  === 'refresh') {
      location.reload()
    }
  }
}())

// Weex.install(require('weex-components'))
Weex.install(components)
Weex.install(api)

Weex.Component = Component
Weex.ComponentManager = ComponentManager
Weex.utils = utils
Weex.config = config

global.weex = Weex
module.exports = Weex

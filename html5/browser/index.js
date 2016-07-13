/* global lib, WebSocket */

'use strict'

require('../native')

require('./styles/base.css')

// require('./polyfill')

const config = require('./config')
const Loader = require('./loader')
const utils = require('./utils')
const protocol = require('./protocol')
const ComponentManager = require('./componentManager')
const Component = require('./components/component')
const Sender = require('./bridge/sender')
const receiver = require('./bridge/receiver')

// Components and apis.
const components = require('./components')
const api = require('./api')
require('envd')
require('httpurl')

// gesture
require('./gesture')

const WEAPP_STYLE_ID = 'weapp-style'

const DEFAULT_DESIGN_WIDTH = 750
const DEFAULT_SCALE = window.innerWidth / DEFAULT_DESIGN_WIDTH
const DEFAULT_ROOT_ID = 'weex'
const DEFAULT_JSONP_CALLBACK_NAME = 'weexJsonpCallback'

window.WXEnvironment = {
  weexVersion: config.weexVersion,
  appName: lib.env.aliapp ? lib.env.aliapp.appname : null,
  appVersion: lib.env.aliapp ? lib.env.aliapp.version.val : null,
  platform: 'Web',
  osName: lib.env.browser ? lib.env.browser.name : null,
  osVersion: lib.env.browser ? lib.env.browser.version.val : null,
  deviceWidth: DEFAULT_DESIGN_WIDTH,
  deviceHeight: window.innerHeight / DEFAULT_SCALE
}

const _instanceMap = {}
const _downgrades = {}

const downgradable = ['list', 'scroller']

function initializeWithUrlParams () {
  // in casperjs the protocol is file.
  if (location.protocol.match(/file/)) {
    return
  }

  const params = lib.httpurl(location.href).params
  for (const k in params) {
    // Get global _downgrades from url's params.
    const match = k.match(/downgrade_(\w+)/)
    if (!match || !match[1]) {
      continue
    }
    if (params[k] !== true && params[k] !== 'true') {
      continue
    }
    const downk = match[1]
    if (downk && (downgradable.indexOf(downk) !== -1)) {
      _downgrades[downk] = true
    }
  }

  // set global 'debug' config to true if there's a debug flag in current url.
  const debug = params['debug']
  if (debug === true || debug === 'true') {
    config.debug = true
  }
}

initializeWithUrlParams()

const logger = require('./logger')
logger.init()

function Weex (options) {
  if (!(this instanceof Weex)) {
    return new Weex(options)
  }

  // Width of the root container. Default is window.innerWidth.
  this.width = options.width || window.innerWidth
  this.bundleUrl = options.bundleUrl || location.href
  this.instanceId = options.appId
  this.rootId = options.rootId || (DEFAULT_ROOT_ID + utils.getRandom(10))
  this.designWidth = options.designWidth || DEFAULT_DESIGN_WIDTH
  this.jsonpCallback = options.jsonpCallback || DEFAULT_JSONP_CALLBACK_NAME
  this.source = options.source
  this.loader = options.loader
  this.embed = options.embed

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
    }
    else {
      console.error('load bundle err:', err)
    }
  }.bind(this))
}

Weex.init = function (options) {
  if (utils.isArray(options)) {
    options.forEach(function (config) {
      new Weex(config)
    })
  }
  else if (utils.getType(options) === 'object') {
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
    for (let i = 0, l = dg.length; i < l; i++) {
      const downk = dg[i]
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
    let root = document.querySelector('#' + this.rootId)
    if (!root) {
      root = document.createElement('div')
      root.id = this.rootId
      document.body.appendChild(root)
    }

    const promise = window.createInstance(
      this.instanceId,
      appCode,
      {
        bundleUrl: this.bundleUrl,
        debug: config.debug
      },
      this.data
    )

    if (Promise && promise instanceof Promise) {
      promise.then(function () {
        // Weex._instances[this.instanceId] = this.root
      }).catch(function (err) {
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
}

// Register a new component with the specified name.
Weex.registerComponent = function (name, comp) {
  ComponentManager.registerComponent(name, comp)
}

// Register a new api module.
// If the module already exists, just add methods from the
// new module to the old one.
Weex.registerApiModule = function (name, module, meta) {
  if (!protocol.apiModule[name]) {
    protocol.apiModule[name] = module
  }
  else {
    for (const key in module) {
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
}

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
  window.registerModules(protocol.getApiModuleMeta(moduleName), true)
}

// Register a new weex-bundle-loader.
Weex.registerLoader = function (name, loaderFunc) {
  Loader.registerLoader(name, loaderFunc)
}

// To install components and plugins.
Weex.install = function (mod) {
  mod.init(Weex)
}

Weex.stopTheWorld = function () {
  for (const instanceId in _instanceMap) {
    if (_instanceMap.hasOwnProperty(instanceId)) {
      window.destroyInstance(instanceId)
    }
  }
}

function startRefreshController () {
  if (location.protocol.match(/file/)) {
    return
  }
  if (location.search.indexOf('hot-reload_controller') === -1) {
    return
  }
  if (typeof WebSocket === 'undefined') {
    console.info('auto refresh need WebSocket support')
    return
  }
  const host = location.hostname
  const port = 8082
  const client = new WebSocket('ws://' + host + ':' + port + '/',
    'echo-protocol'
  )
  client.onerror = function () {
    console.log('refresh controller websocket connection error')
  }
  client.onmessage = function (e) {
    console.log('Received: \'' + e.data + '\'')
    if (e.data === 'refresh') {
      location.reload()
    }
  }
}

startRefreshController()

// Weex.install(require('weex-components'))
Weex.install(components)
Weex.install(api)

Weex.Component = Component
Weex.ComponentManager = ComponentManager
Weex.utils = utils
Weex.config = config

global.weex = Weex
module.exports = Weex

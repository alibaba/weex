/* global lib, WebSocket */

'use strict'

import './style/base.css'

import { subversion } from '../../../../package.json'
import runtime from '../../../runtime'
import frameworks from '../../../frameworks'

runtime.config.frameworks = frameworks
const { framework, transformer } = subversion

// register framework meta info
global.frameworkVersion = framework
global.transformerVersion = transformer

// init bridge.
import { Sender, receiver } from '../bridge'
receiver.init()

// init frameworks
import Listener from '../dom/componentManager'
runtime.config.Document.Listener = Listener
const globalMethods = runtime.init(runtime.config)

// set global methods
for (const methodName in globalMethods) {
  global[methodName] = (...args) => {
    const ret = globalMethods[methodName](...args)
    if (ret instanceof Error) {
      console.error(ret.toString())
    }
    return ret
  }
}

import config from './config'
import { load } from './loader'
import * as utils from '../utils'
import Component from '../base/component'
import Atomic from '../base/atomic'
import ComponentManager from '../dom/componentManager'
import { bind as bindRegister } from './register'

import 'envd'
import 'httpurl'

// gesture
import './gesture'

const DEFAULT_DESIGN_WIDTH = 750
const DEFAULT_ROOT_ID = 'weex'
const DEFAULT_JSONP_CALLBACK_NAME = 'weexJsonpCallback'

global.WXEnvironment = {
  weexVersion: config.weexVersion,
  appName: lib.env.aliapp ? lib.env.aliapp.appname : null,
  appVersion: lib.env.aliapp ? lib.env.aliapp.version.val : null,
  platform: 'Web',
  osName: lib.env.browser ? lib.env.browser.name : null,
  osVersion: lib.env.browser ? lib.env.browser.version.val : null,
  deviceWidth: window.innerWidth,
  deviceHeight: window.innerHeight,
  devicePixelRatio: window.devicePixelRatio ? window.devicePixelRatio : (window.screen.width >= 1440 ? 3.5 : (window.screen.width >= 1080 ? 3 : (window.screen.width >= 800 ? 2.5 : (window.screen.width >= 640 ? 2 : (window.screen.width >= 480 ? 1.5 : 1)))))
}

const _weexInstance = {}

function noop () {}

function setupViewport (width) {
  document.querySelector('meta[name=viewport]').setAttribute('content', `width=${width}, user-scalable=no`)
}

; (function initializeWithUrlParams () {
  // in casperjs the protocol is file.
  if (location.protocol.match(/file/)) {
    return
  }

  const params = lib.httpurl(location.href).params

  // set global 'debug' config to true if there's a debug flag in current url.
  const debug = params['debug']
  config.debug = debug === true || debug === 'true'

  !config.debug && (console.debug = noop)

  // config for the 'downgrade'.
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const match = key.match(/^downgrade_(\w+)$/)
      if (!match || !match[1]) {
        continue
      }
      const dk = match[1]
      // downgrade in the config file has the highest priority.
      if (typeof config.downgrade[dk] === 'boolean') {
        continue
      }
      const dr = params[`downgrade_${dk}`]
      config.downgrade[dk] = dr === true || dr === 'true'
    }
  }
})()

export default function Weex (options) {
  if (!(this instanceof Weex)) {
    return new Weex(options)
  }

  // Width of the root container. Default is window.innerWidth.
  this.width = options.width || window.innerWidth
  this.bundleUrl = options.bundleUrl || location.href
  this.instanceId = options.appId
  this.rootId = options.rootId || (DEFAULT_ROOT_ID + utils.getRandom(10))
  this.jsonpCallback = options.jsonpCallback || DEFAULT_JSONP_CALLBACK_NAME
  this.source = options.source
  this.loader = options.loader
  this.embed = options.embed

  // init viewport
  setupViewport(DEFAULT_DESIGN_WIDTH)

  // downgrade options.
  const dg = options.downgrade || []
  dg.forEach(function (comp) {
    config.downgrade[comp] = true
  })

  this.data = options.data
  this.sender = new Sender(this)

  _weexInstance[this.instanceId] = this

  // load bundle.
  load({
    jsonpCallback: this.jsonpCallback,
    source: this.source,
    loader: this.loader
  }, function (err, appCode) {
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

Weex.getInstance = function (instanceId) {
  return _weexInstance[instanceId]
}

Weex.prototype = {

  createApp: function (config, appCode) {
    let root = document.querySelector('#' + this.rootId)
    if (!root) {
      root = document.createElement('div')
      root.id = this.rootId
      document.body.appendChild(root)
    }

    const instance = window.createInstance(
      this.instanceId,
      appCode,
      {
        bundleUrl: this.bundleUrl,
        debug: config.debug
      },
      this.data
    )

    if (instance instanceof Error) {
      return console.error('[h5-render]', instance)
    }

    // Do not destroy instance before unload, because in most browser
    // press back button to back to this page will not refresh
    // the window and the instance will not be recreated then.
    // window.addEventListener('beforeunload', function (e) {
    // })
  },

  getComponentManager: function () {
    if (!this._componentManager) {
      this._componentManager = ComponentManager.getInstance(this.instanceId)
    }
    return this._componentManager
  },

  getRoot: function () {
    return document.querySelector('#' + this.rootId)
  }
}

Weex.stopTheWorld = function (instanceId) {
  if (!instanceId) {
    return Object.keys(_weexInstance).map(function (instanceId) {
      Weex.stopTheWorld(instanceId)
    })
  }
  window.destroyInstance(instanceId)
}

// for weex-toolkit.
; (function startRefreshController () {
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
})()

bindRegister(Weex)

utils.extend(Weex, {
  Component,
  Atomic,
  ComponentManager,
  utils,
  config
})

global.weex = Weex

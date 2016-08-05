/* global lib, WebSocket */

'use strict'

import './style/base.css'

import '../runtime'

import config from './config'
import { load } from './loader'
import * as utils from '../utils'
import { Sender, receiver } from '../bridge'
import Component from '../base/component'
import Atomic from '../base/atomic'
import ComponentManager from '../dom/componentManager'
import { bind as bindRegister } from './register'

import 'envd'
import 'httpurl'

// gesture
import './gesture'

const DEFAULT_DESIGN_WIDTH = 750
const DEFAULT_SCALE = window.innerWidth / DEFAULT_DESIGN_WIDTH
const DEFAULT_ROOT_ID = 'weex'
const DEFAULT_JSONP_CALLBACK_NAME = 'weexJsonpCallback'

global.WXEnvironment = {
  weexVersion: config.weexVersion,
  appName: lib.env.aliapp ? lib.env.aliapp.appname : null,
  appVersion: lib.env.aliapp ? lib.env.aliapp.version.val : null,
  platform: 'Web',
  osName: lib.env.browser ? lib.env.browser.name : null,
  osVersion: lib.env.browser ? lib.env.browser.version.val : null,
  deviceWidth: DEFAULT_DESIGN_WIDTH,
  deviceHeight: window.innerHeight / DEFAULT_SCALE
}

const _weexInstance = {}

function noop () {}

; (function initializeWithUrlParams () {
  // in casperjs the protocol is file.
  if (location.protocol.match(/file/)) {
    return
  }

  const params = lib.httpurl(location.href).params

  // set global 'debug' config to true if there's a debug flag in current url.
  const debug = params['debug']
  if (debug === true || debug === 'true') {
    config.debug = true
  }

  !config.debug && (console.debug = noop)
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
  this.designWidth = options.designWidth || DEFAULT_DESIGN_WIDTH
  this.jsonpCallback = options.jsonpCallback || DEFAULT_JSONP_CALLBACK_NAME
  this.source = options.source
  this.loader = options.loader
  this.embed = options.embed

  this.data = options.data
  this.scale = this.width / this.designWidth
  receiver.init(this)
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

    if (!instance) {
      return console.error('[h5-render] createInstance error: get void for instance.')
    }

    if (instance instanceof Error) {
      return console.error('[h5-render]', instance)
    }

    if (instance instanceof Promise) {
      return instance.then(function (res) {
        this.appInstance = res
        // Weex._instances[this.instanceId] = this.root
      }).catch(function (err) {
        console.error('[h5-render]', err)
      })
    }

    this.appInstance = instance

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

'use strict'

var extend = require('./utils').extend
var isArray = require('./utils').isArray
var ComponentManager = require('./componentManager')

// for jsframework to register modules.
var _registerModules = function (config) {
  if (isArray(config)) {
    for (var i = 0, l = config.length; i < l; i++) {
      window.registerModules(config[i])
    }
  } else {
    window.registerModules(config)
  }
}

var protocol = {

  // weex instances
  _instances: [],

  // api meta info
  _meta: [],

  apiModule: {},

  injectWeexInstance: function (instance) {
    this._instances[instance.instanceId] = instance
  },

  getWeexInstance: function (instanceId) {
    return this._instances[instanceId]
  },

  // get the api method meta info array for the module.
  getApiModuleMeta: function (moduleName) {
    var metaObj = {}
    metaObj[moduleName] = this._meta[moduleName]
    return metaObj
  },

  // Set meta info for a api module.
  // If there is a same named api, just replace it.
  // opts:
  // - metaObj: meta object like
  // {
  //    dom: [{
  //      name: 'addElement',
  //      args: ['string', 'object']
  //    }]
  // }
  setApiModuleMeta: function (metaObj) {
    var moduleName
    for (var k in metaObj) {
      if (metaObj.hasOwnProperty(k)) {
        moduleName = k
      }
    }
    var metaArray = this._meta[moduleName]
    if (!metaArray) {
      this._meta[moduleName] = metaObj[moduleName]
    } else {
      var nameObj = {}
      metaObj[moduleName].forEach(function (api) {
        nameObj[api.name] = api
      })
      metaArray.forEach(function (api, i) {
        if (nameObj[api.name]) {
          metaArray[i] = nameObj[api.name]
          delete nameObj[api.name]
        }
      })
      for (var k in metaObj) {
        if (metaObj.hasOwnProperty(k)) {
          metaArray.push(metaObj[k])
        }
      }
    }
    this._meta[moduleName] = metaObj[moduleName]
  },

  // Set meta info for a single api.
  // opts:
  //  - moduleName: api module name.
  //  - meta: a meta object like:
  //  {
  //    name: 'addElement',
  //    args: ['string', 'object']
  //  }
  setApiMeta: function (moduleName, meta) {
    var metaArray = this._meta[moduleName]
    if (!metaArray) {
      this._meta[moduleName] = [meta]
    } else {
      var metaIdx = -1
      metaArray.forEach(function (api, i) {
        if (meta.name === name) {
          metaIdx = i
        }
      })
      if (metaIdx !== -1) {
        metaArray[metaIdx] = meta
      } else {
        metaArray.push(meta)
      }
    }
  }
}

_registerModules([{
  modal: [{
    name: 'toast',
    args: ['object', 'function']
  }, {
    name: 'alert',
    args: ['object', 'function']
  }, {
    name: 'confirm',
    args: ['object', 'function']
  }, {
    name: 'prompt',
    args: ['object', 'function']
  }]
}, {
  animation: [{
    name: 'transition',
    args: ['string', 'object', 'function']
  }]
}])

module.exports = protocol

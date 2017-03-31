import './WXEnvironment'
import * as utils from '../utils'
import { requireWeexModule } from '../modules'

const weexModules = {}

export default {
  utils,
  units: window.CSS_UNIT,
  config: {
    env: window.WXEnvironment,
    bundleUrl: location.href
  },

  requireModule (moduleName) {
    const module = requireWeexModule(moduleName)
    if (module) {
      return module
    }
    return weexModules[moduleName]
  },

  registerModule (...args) {
    return this.registerApiModule(...args)
  },

  // @deprecated
  require (...args) {
    console.log(`[Vue Render] "weex.require" is deprecated, please use "weex.requireModule" instead.`)
    return this.requireModule(...args)
  },

  // @deprecated
  // TODO: rename to registerModule
  registerApiModule (name, module, meta) {
    if (!weexModules[name]) {
      weexModules[name] = {}
    }
    for (const key in module) {
      if (module.hasOwnProperty(key)) {
        weexModules[name][key] = utils.bind(module[key], this)
      }
    }
  },

  // @deprecated
  getRoot () {},

  // @deprecated
  sender: {
    performCallback (callback, data, keepAlive) {
      if (typeof callback === 'function') {
        return callback(data)
      }
      return null
    }
  },

  // @deprecated
  install (module) {
    module.init(this)
  }
}

import ComponentManager from '../dom/componentManager'
import { registerLoader } from './loader'
import { protocol } from '../bridge'
import { extend } from '../utils'

const methods = {
  // Register a new component with the specified name.
  registerComponent (name, comp) {
    ComponentManager.registerComponent(name, comp)
  },

  // Register a new api module.
  // If the module already exists, just add methods from the
  // new module to the old one.
  registerApiModule (name, module, meta) {
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
      global.registerModules(protocol.getApiModuleMeta(name), true)
    }
  },

  // Register a new api method for the specified module.
  // opts:
  //  - args: type of arguments the API method takes such
  //    as ['string', 'function']
  registerApi (moduleName, name, method, args) {
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
    global.registerModules(protocol.getApiModuleMeta(moduleName), true)
  },

  // Register a new weex-bundle-loader.
  registerLoader (name, loaderFunc) {
    registerLoader(name, loaderFunc)
  }

}

// To install components and plugins.
function install (mod) {
  mod.init(this)
}

export function bind (Weex) {
  Weex.install = install.bind(Weex)
  extend(Weex, methods)
}

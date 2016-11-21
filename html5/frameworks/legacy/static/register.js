import Vm from '../vm/index'
import config from '../config'
import {
  initModules,
  initMethods
} from '../app/register'

const {
  nativeComponentMap
} = config

/**
 * Register the name of each native component.
 * @param  {array} components array of name
 */
export function registerComponents (components) {
  if (Array.isArray(components)) {
    components.forEach(function register (name) {
      /* istanbul ignore if */
      if (!name) {
        return
      }
      if (typeof name === 'string') {
        nativeComponentMap[name] = true
      }
      /* istanbul ignore else */
      else if (typeof name === 'object' && typeof name.type === 'string') {
        nativeComponentMap[name.type] = name
      }
    })
  }
}

/**
 * Register the name and methods of each module.
 * @param  {object} modules a object of modules
 */
export function registerModules (modules) {
  /* istanbul ignore else */
  if (typeof modules === 'object') {
    initModules(modules)
  }
}

/**
 * Register the name and methods of each api.
 * @param  {object} apis a object of apis
 */
export function registerMethods (methods) {
  /* istanbul ignore else */
  if (typeof methods === 'object') {
    initMethods(Vm, methods)
  }
}

// @todo: Hack for this framework only. Will be re-designed or removed later.
global.registerMethods = registerMethods

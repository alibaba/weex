import Vm from '../vm'
import config from '../config'

const {
  nativeComponentMap
} = config

/**
 * register the name of each native component
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
      else if (typeof name === 'object' && typeof name.type === 'string') {
        nativeComponentMap[name.type] = name
      }
    })
  }
}

/**
 * register the name and methods of each module
 * @param  {object} modules a object of modules
 */
export function registerModules (modules) {
  if (typeof modules === 'object') {
    Vm.registerModules(modules)
  }
}

/**
 * register the name and methods of each api
 * @param  {object} apis a object of apis
 */
export function registerMethods (apis) {
  if (typeof apis === 'object') {
    Vm.registerMethods(apis)
  }
}
global.registerMethods = registerMethods

import { typof } from '../../util'
import Vm from '../../vm'
import {
  isWeexComponent,
  isWeexModule,
  isNormalModule,
  isNpmModule,
  removeWeexPrefix,
  removeJSSurfix
} from './misc'

let commonModules = {}

export function clearCommonModules () {
  commonModules = {}
}

// define(name, factory) for primary usage
// or
// define(name, deps, factory) for compatibility
// Notice: DO NOT use function define() {},
// it will cause error after builded by webpack
export const define = function (name, deps, factory) {
  console.debug(`[JS Framework] define a component ${name}`)

  if (typof(deps) === 'function') {
    factory = deps
    deps = []
  }

  const _require = (name) => {
    let cleanName

    if (isWeexComponent(name)) {
      cleanName = removeWeexPrefix(name)
      return this.requireComponent(cleanName)
    }
    if (isWeexModule(name)) {
      cleanName = removeWeexPrefix(name)
      return this.requireModule(cleanName)
    }
    if (isNormalModule(name)) {
      cleanName = removeJSSurfix(name)
      return commonModules[name]
    }
    if (isNpmModule(name)) {
      cleanName = removeJSSurfix(name)
      return commonModules[name]
    }
  }
  const _module = { exports: {}}

  let cleanName
  if (isWeexComponent(name)) {
    cleanName = removeWeexPrefix(name)

    factory(_require, _module.exports, _module)

    this.registerComponent(cleanName, _module.exports)
  }
  else if (isWeexModule(name)) {
    cleanName = removeWeexPrefix(name)

    factory(_require, _module.exports, _module)

    Vm.registerModules({
      [cleanName]: _module.exports
    })
  }
  else if (isNormalModule(name)) {
    cleanName = removeJSSurfix(name)

    factory(_require, _module.exports, _module)

    commonModules[cleanName] = _module.exports
  }
  else if (isNpmModule(name)) {
    cleanName = removeJSSurfix(name)

    factory(_require, _module.exports, _module)

    const exports = _module.exports
    if (exports.template ||
        exports.style ||
        exports.methods) {
      // downgrade to old define method (define('componentName', factory))
      // the exports contain one key of template, style or methods
      // but it has risk!!!
      this.registerComponent(cleanName, exports)
    }
    else {
      commonModules[cleanName] = _module.exports
    }
  }
}

/**
 * @deprecated
 */
export function register (type, options) {
  console.warn('[JS Framework] Register is deprecated, please install lastest transformer.')
  this.registerComponent(type, options)
}

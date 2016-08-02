/**
 * @fileOverview
 * api that invoked by js bundle code
 *
 * - define(name, factory): define a new composed component type
 * - bootstrap(type, config, data): require a certain type &
 *         render with (optional) data
 *
 * deprecated:
 * - register(type, options): register a new composed component type
 * - render(type, data): render by a certain type with (optional) data
 * - require(type)(data): require a type then render with data
 */

import semver from 'semver'
import { typof, isPlainObject } from '../util'
import Vm from '../vm'
import * as downgrade from './downgrade'

const WEEX_COMPONENT_REG = /^@weex-component\//
const WEEX_MODULE_REG = /^@weex-module\//
const NORMAL_MODULE_REG = /^\.{1,2}\//
const JS_SURFIX_REG = /\.js$/

const isWeexComponent = name => !!name.match(WEEX_COMPONENT_REG)
const isWeexModule = name => !!name.match(WEEX_MODULE_REG)
const isNormalModule = name => !!name.match(NORMAL_MODULE_REG)
const isNpmModule = name => !isWeexComponent(name) &&
                              !isWeexModule(name) &&
                              !isNormalModule(name)

function removeWeexPrefix (str) {
  return str.replace(WEEX_COMPONENT_REG, '')
          .replace(WEEX_MODULE_REG, '')
}

function removeJSSurfix (str) {
  return str.replace(JS_SURFIX_REG, '')
}

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

export function bootstrap (app, name, config, data) {
  console.debug(`[JS Framework] bootstrap for ${name}`)

  let cleanName

  if (isWeexComponent(name)) {
    cleanName = removeWeexPrefix(name)
  }
  else if (isNpmModule(name)) {
    cleanName = removeJSSurfix(name)
    // check if define by old 'define' method
    /* istanbul ignore if */
    if (!app.customComponentMap[cleanName]) {
      return new Error(`It's not a component: ${name}`)
    }
  }
  else {
    return new Error(`Wrong component name: ${name}`)
  }

  config = isPlainObject(config) ? config : {}

  if (typeof config.transformerVersion === 'string' &&
    typeof global.transformerVersion === 'string' &&
    !semver.satisfies(config.transformerVersion,
      global.transformerVersion)) {
    return new Error(`JS Bundle version: ${config.transformerVersion} ` +
      `not compatible with ${global.transformerVersion}`)
  }

  const _checkDowngrade = downgrade.check(config.downgrade)
  /* istanbul ignore if */
  if (_checkDowngrade.isDowngrade) {
    app.callTasks([{
      module: 'instanceWrap',
      method: 'error',
      args: [
        _checkDowngrade.errorType,
        _checkDowngrade.code,
        _checkDowngrade.errorMessage
      ]
    }])
    return new Error(`Downgrade[${_checkDowngrade.code}]: ${_checkDowngrade.errorMessage}`)
  }

  app.vm = new Vm(cleanName, null, { _app: app }, null, data)
}

/**
 * @deprecated
 */
export function register (type, options) {
  console.warn('[JS Framework] Register is deprecated, please install lastest transformer.')
  this.registerComponent(type, options)
}

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
import {
  isPlainObject,
  isWeexComponent,
  isWeexModule,
  isNormalModule,
  isNpmModule,
  removeWeexPrefix,
  removeJSSurfix
} from '../util'
import Vm from '../vm'
import {
  registerCustomComponent,
  requireCustomComponent,
  initModules
} from './register'
import * as downgrade from './downgrade'

/**
 * @deprecated
 *
 * common modules are shared to all instances
 * it's very dangerous
 */
let commonModules = {}

/**
 * @deprecated
 */
export function clearCommonModules () {
  commonModules = {}
}

/**
 * define(name, factory) for primary usage
 * or
 * define(name, deps, factory) for compatibility
 * Notice: DO NOT use function define() {},
 * it will cause error after builded by webpack
 */
export function defineFn (app, name, ...args) {
  console.debug(`[JS Framework] define a component ${name}`)

  // adapt args:
  // 1. name, deps[], factory()
  // 2. name, factory()
  // 3. name, definition{}
  let factory, definition
  if (args.length > 1) {
    definition = args[1]
  }
  else {
    definition = args[0]
  }
  if (typeof definition === 'function') {
    factory = definition
    definition = null
  }

  // resolve definition from factory
  if (factory) {
    const r = (name) => {
      if (isWeexComponent(name)) {
        const cleanName = removeWeexPrefix(name)
        return requireCustomComponent(app, cleanName)
      }
      if (isWeexModule(name)) {
        const cleanName = removeWeexPrefix(name)
        return app.requireModule(cleanName)
      }
      if (isNormalModule(name) || isNpmModule(name)) {
        const cleanName = removeJSSurfix(name)
        return commonModules[cleanName]
      }
    }
    const m = { exports: {}}
    factory(r, m.exports, m)
    definition = m.exports
  }

  // apply definition
  if (isWeexComponent(name)) {
    const cleanName = removeWeexPrefix(name)
    registerCustomComponent(app, cleanName, definition)
  }
  else if (isWeexModule(name)) {
    const cleanName = removeWeexPrefix(name)
    initModules({ [cleanName]: definition })
  }
  else if (isNormalModule(name)) {
    const cleanName = removeJSSurfix(name)
    commonModules[cleanName] = definition
  }
  else if (isNpmModule(name)) {
    const cleanName = removeJSSurfix(name)
    if (definition.template ||
        definition.style ||
        definition.methods) {
      // downgrade to old define method (define('componentName', factory))
      // the exports contain one key of template, style or methods
      // but it has risk!!!
      registerCustomComponent(app, cleanName, definition)
    }
    else {
      commonModules[cleanName] = definition
    }
  }
}

/**
 * bootstrap app from a certain custom component with config & data
 */
export function bootstrap (app, name, config, data) {
  console.debug(`[JS Framework] bootstrap for ${name}`)

  // 1. validate custom component name first
  let cleanName
  if (isWeexComponent(name)) {
    cleanName = removeWeexPrefix(name)
  }
  else if (isNpmModule(name)) {
    cleanName = removeJSSurfix(name)
    // check if define by old 'define' method
    /* istanbul ignore if */
    if (!requireCustomComponent(app, cleanName)) {
      return new Error(`It's not a component: ${name}`)
    }
  }
  else {
    return new Error(`Wrong component name: ${name}`)
  }

  // 2. validate configuration
  config = isPlainObject(config) ? config : {}
  // 2.1 transformer version check
  if (typeof config.transformerVersion === 'string' &&
    typeof global.transformerVersion === 'string' &&
    !semver.satisfies(config.transformerVersion,
      global.transformerVersion)) {
    return new Error(`JS Bundle version: ${config.transformerVersion} ` +
      `not compatible with ${global.transformerVersion}`)
  }
  // 2.2 downgrade version check
  const downgradeResult = downgrade.check(config.downgrade)
  /* istanbul ignore if */
  if (downgradeResult.isDowngrade) {
    app.callTasks([{
      module: 'instanceWrap',
      method: 'error',
      args: [
        downgradeResult.errorType,
        downgradeResult.code,
        downgradeResult.errorMessage
      ]
    }])
    return new Error(`Downgrade[${downgradeResult.code}]: ${downgradeResult.errorMessage}`)
  }

  // 3. create a new Vm with custom component name and data
  app.vm = new Vm(cleanName, null, { _app: app }, null, data)
}

/**
 * @deprecated
 */
export function register (app, type, options) {
  console.warn('[JS Framework] Register is deprecated, please install lastest transformer.')
  registerCustomComponent(app, type, options)
}

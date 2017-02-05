import {
  isWeexComponent,
  isWeexModule,
  isNormalModule,
  isNpmModule,
  removeWeexPrefix,
  removeJSSurfix
} from '../../util/index'
import {
  registerCustomComponent,
  requireCustomComponent,
  initModules
} from '../register'

/**
 * define(name, factory) for primary usage
 * or
 * define(name, deps, factory) for compatibility
 * Notice: DO NOT use function define() {},
 * it will cause error after builded by webpack
 */
export const defineFn = function (app, name, ...args) {
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
        return app.commonModules[cleanName]
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
    app.commonModules[cleanName] = definition
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
      app.commonModules[cleanName] = definition
    }
  }
}

/**
 * @deprecated
 */
export function register (app, type, options) {
  console.warn('[JS Framework] Register is deprecated, please install lastest transformer.')
  registerCustomComponent(app, type, options)
}

/**
 * @fileOverview
 * instance controls from native
 *
 * - init bundle
 *
 * corresponded with the API of instance manager (framework.js)
 */

import Vm from '../../vm/index'
import { removeWeexPrefix } from '../../util/index'
import {
  defineFn,
  bootstrap,
  register
} from '../bundle/index'
import { updateActions } from './misc'

/**
 * Init an app by run code witgh data
 * @param  {object} app
 * @param  {string} code
 * @param  {object} data
 */
export function init (app, code, data, services) {
  console.debug('[JS Framework] Intialize an instance with:\n', data)
  let result

  // prepare app env methods
  const bundleDefine = (...args) => defineFn(app, ...args)
  const bundleBootstrap = (name, config, _data) => {
    result = bootstrap(app, name, config, _data || data)
    updateActions(app)
    app.doc.listener.createFinish()
    console.debug(`[JS Framework] After intialized an instance(${app.id})`)
  }
  const bundleVm = Vm
  /* istanbul ignore next */
  const bundleRegister = (...args) => register(app, ...args)
  /* istanbul ignore next */
  const bundleRender = (name, _data) => {
    result = bootstrap(app, name, {}, _data)
  }
  /* istanbul ignore next */
  const bundleRequire = name => _data => {
    result = bootstrap(app, name, {}, _data)
  }
  const bundleDocument = app.doc
  /* istanbul ignore next */
  const bundleRequireModule = name => app.requireModule(removeWeexPrefix(name))

  const weexGlobalObject = {
    config: app.options,
    define: bundleDefine,
    bootstrap: bundleBootstrap,
    requireModule: bundleRequireModule,
    document: bundleDocument,
    Vm: bundleVm
  }

  Object.freeze(weexGlobalObject)

  // prepare code
  let functionBody
  /* istanbul ignore if */
  if (typeof code === 'function') {
    // `function () {...}` -> `{...}`
    // not very strict
    functionBody = code.toString().substr(12)
  }
  /* istanbul ignore next */
  else if (code) {
    functionBody = code.toString()
  }
  // wrap IFFE and use strict mode
  functionBody = `(function(global){\n\n"use strict";\n\n ${functionBody} \n\n})(Object.create(this))`

  // run code and get result
  const { WXEnvironment } = global
  const timerAPIs = {}
  /* istanbul ignore if */
  if (WXEnvironment && WXEnvironment.platform !== 'Web') {
    // timer APIs polyfill in native
    const timer = app.requireModule('timer')
    Object.assign(timerAPIs, {
      setTimeout: (...args) => {
        const handler = function () {
          args[0](...args.slice(2))
        }
        timer.setTimeout(handler, args[1])
      },
      setInterval: (...args) => {
        const handler = function () {
          args[0](...args.slice(2))
        }
        timer.setInterval(handler, args[1])
      },
      clearTimeout: (n) => {
        timer.clearTimeout(n)
      },
      clearInterval: (n) => {
        timer.clearInterval(n)
      }
    })
  }
  // run code and get result
  const globalObjects = Object.assign({
    define: bundleDefine,
    require: bundleRequire,
    bootstrap: bundleBootstrap,
    register: bundleRegister,
    render: bundleRender,
    __weex_define__: bundleDefine, // alias for define
    __weex_bootstrap__: bundleBootstrap, // alias for bootstrap
    __weex_document__: bundleDocument,
    __weex_require__: bundleRequireModule,
    __weex_viewmodel__: bundleVm,
    weex: weexGlobalObject
  }, timerAPIs, services)
  callFunction(globalObjects, functionBody)

  return result
}

/**
 * Call a new function body with some global objects.
 * @param  {object} globalObjects
 * @param  {string} code
 * @return {any}
 */
function callFunction (globalObjects, body) {
  const globalKeys = []
  const globalValues = []
  for (const key in globalObjects) {
    globalKeys.push(key)
    globalValues.push(globalObjects[key])
  }
  globalKeys.push(body)

  const result = new Function(...globalKeys)
  return result(...globalValues)
}

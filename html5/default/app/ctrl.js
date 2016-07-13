/**
 * @fileOverview
 * instance controls from native
 *
 * - init bundle
 * - fire event
 * - callback
 * - destroy
 *
 * corresponded with the API of instance manager (framework.js)
 */

import { extend, bind } from '../util'
import {
  define,
  bootstrap,
  register
} from './bundle'

export function updateActions () {
  this.differ.flush()
  const tasks = []
  if (this.doc && this.doc.listener && this.doc.listener.updates.length) {
    tasks.push(...this.doc.listener.updates)
    this.doc.listener.updates = []
  }
  if (tasks.length) {
    return this.callTasks(tasks)
  }
}

export function init (code, data) {
  console.debug('[JS Framework] Intialize an instance with:\n', data)

  let result
  // @see: lib/app/bundle.js
  const bundleDefine = bind(define, this)
  const bundleBootstrap = (name, config, _data) => {
    result = bootstrap(this, name, config, _data || data)
    this.updateActions()
    this.doc.listener.createFinish()
    console.debug(`[JS Framework] After intialized an instance(${this.id})`)
  }

  // backward(register/render)
  const bundleRegister = bind(register, this)
  const bundleRender = (name, _data) => {
    result = bootstrap(this, name, {}, _data)
  }

  const bundleRequire = name => _data => {
    result = bootstrap(this, name, {}, _data)
  }

  const bundleDocument = this.doc

  let functionBody
  /* istanbul ignore if */
  if (typeof code === 'function') {
    // `function () {...}` -> `{...}`
    // not very strict
    functionBody = code.toString().substr(12)
  }
  else if (code) {
    functionBody = code.toString()
  }

  const { WXEnvironment } = global
  if (WXEnvironment && WXEnvironment.platform !== 'Web') {
    const timer = this.requireModule('timer')
    const timerAPIs = {
      setTimeout: (...args) => {
        const handler = function () {
          args[0](...args.slice(2))
        }
        timer.setTimeout(handler, args[1])
        return this.uid.toString()
      },
      setInterval: (...args) => {
        const handler = function () {
          args[0](...args.slice(2))
        }
        timer.setInterval(handler, args[1])
        return this.uid.toString()
      },
      clearTimeout: (n) => {
        timer.clearTimeout(n)
      },
      clearInterval: (n) => {
        timer.clearInterval(n)
      }
    }

    const fn = new Function(
      'define',
      'require',
      'document',
      'bootstrap',
      'register',
      'render',
      '__weex_define__', // alias for define
      '__weex_bootstrap__', // alias for bootstrap
      'setTimeout',
      'setInterval',
      'clearTimeout',
      'clearInterval',
      functionBody
    )

    fn(
      bundleDefine,
      bundleRequire,
      bundleDocument,
      bundleBootstrap,
      bundleRegister,
      bundleRender,
      bundleDefine,
      bundleBootstrap,
      timerAPIs.setTimeout,
      timerAPIs.setInterval,
      timerAPIs.clearTimeout,
      timerAPIs.clearInterval)
  }
  else {
    const fn = new Function(
      'define',
      'require',
      'document',
      'bootstrap',
      'register',
      'render',
      '__weex_define__', // alias for define
      '__weex_bootstrap__', // alias for bootstrap
      functionBody
    )

    fn(
      bundleDefine,
      bundleRequire,
      bundleDocument,
      bundleBootstrap,
      bundleRegister,
      bundleRender,
      bundleDefine,
      bundleBootstrap)
  }

  return result
}

export function destroy () {
  console.debug(`[JS Framework] Destory an instance(${this.id})`)

  this.id = ''
  this.options = null
  this.blocks = null
  this.vm = null
  this.doc = null
  this.customComponentMap = null
  this.callbacks = null
}

export function getRootElement () {
  const doc = this.doc || {}
  const body = doc.body || {}
  return body.toJSON ? body.toJSON() : {}
}

export function fireEvent (ref, type, e, domChanges) {
  console.debug(`[JS Framework] Fire a "${type}" event on an element(${ref}) in instance(${this.id})`)
  if (Array.isArray(ref)) {
    ref.some((ref) => {
      return this.fireEvent(ref, type, e) !== false
    })
    return
  }

  const el = this.doc.getRef(ref)

  if (el) {
    this.doc.close()
    const result = this.doc.fireEvent(el, type, e, domChanges)
    this.updateActions()
    this.doc.listener.updateFinish()
    this.doc.open()
    return result
  }

  return new Error(`invalid element reference "${ref}"`)
}

export function callback (callbackId, data, ifKeepAlive) {
  console.debug(`[JS Framework] Invoke a callback(${callbackId}) with`, data,
            `in instance(${this.id})`)

  const callback = this.callbacks[callbackId]

  if (typeof callback === 'function') {
    this.doc.close()
    callback(data) // data is already a object, @see: lib/runtime/index.js

    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
      this.callbacks[callbackId] = undefined
    }

    this.updateActions()
    this.doc.listener.updateFinish()
    this.doc.open()
    return
  }

  return new Error(`invalid callback id "${callbackId}"`)
}

export function refreshData (data) {
  console.debug(`[JS Framework] Refresh with`, data,
            `in instance[${this.id}]`)

  const vm = this.vm

  if (vm && data) {
    this.doc.close()
    if (typeof vm.refreshData === 'function') {
      vm.refreshData(data)
    }
    else {
      extend(vm, data)
    }
    this.updateActions()
    this.doc.listener.refreshFinish()
    this.doc.open()
    return
  }

  return new Error(`invalid data "${data}"`)
}

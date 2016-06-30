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

import * as _ from '../util'

export function updateActions () {
  this.differ.flush()
  const tasks = []
  if (this.doc && this.doc.listener && this.doc.listener.updates.length) {
    tasks.push(...this.doc.listener.updates)
    this.doc.listener.updates = []
  }
  if (tasks.length) {
    this.callTasks(tasks)
  }
}

export function init (code, data) {
  _.debug('Intialize an instance with:\n', code, data)

  let result
  // @see: lib/app/bundle.js
  const define = _.bind(this.define, this)
  const bootstrap = (name, config, _data) => {
    result = this.bootstrap(name, config, _data || data)
    this.updateActions()
    this.doc.listener.createFinish()
    _.debug(`After intialized an instance(${this.id})`)
  }

  // backward(register/render)
  const register = _.bind(this.register, this)
  const render = (name, _data) => {
    result = this.bootstrap(name, {}, _data)
  }

  const require = name => _data => {
    result = this.bootstrap(name, {}, _data)
  }

  const document = this.doc

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
      define,
      require,
      document,
      bootstrap,
      register,
      render,
      define,
      bootstrap,
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
      define,
      require,
      document,
      bootstrap,
      register,
      render,
      define,
      bootstrap)
  }

  return result
}

export function destroy () {
  _.debug(`Destory an instance(${this.id})`)

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
  _.debug(`Fire a "${type}" event on an element(${ref}) in instance(${this.id})`)
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
  _.debug(`Invoke a callback(${callbackId}) with`, data,
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
  _.debug(`Refresh with`, data,
            `in instance[${this.id}]`)

  const vm = this.vm

  if (vm && data) {
    this.doc.close()
    if (typeof vm.refreshData === 'function') {
      vm.refreshData(data)
    }
    else {
      _.extend(vm, data)
    }
    this.updateActions()
    this.doc.listener.refreshFinish()
    this.doc.open()
    return
  }

  return new Error(`invalid data "${data}"`)
}

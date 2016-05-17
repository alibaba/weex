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

import {
  bind, extend
}
from '../util'
import * as perf from '../perf'
import Listener, {createAction} from './dom-listener'

export function init(code, data) {
  var result
  // @see: lib/app/bundle.js
  const define = bind(this.define, this)
  const bootstrap = (name, config, _data) => {
    result = this.bootstrap(name, config, _data || data)
    this.updateActions()
    this.doc.listener.createFinish()
    this.doc.close()
  }

  // backward(register/render)
  const register = bind(this.register, this)
  const render = (name, _data) => {
    result = this.bootstrap(name, {}, _data)
  }

  const require = name => _data => {
    result = this.bootstrap(name, {}, _data)
  }

  const document = this.doc

  perf.start('run bundle', this.id)

  let functionBody
  /* istanbul ignore if */
  if (typeof code === 'function') {
    // `function () {...}` -> `{...}`
    // not very strict
    functionBody = code.toString().substr(12)
  } else if (code) {
    functionBody = code.toString()
  }

  let fn = new Function(
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

  perf.end('run bundle', this.id)
  return result
}

export function destroy() {
  this.id = ''
  this.eventManager = null
  this.options = null
  this.blocks = null
  this.vm = null
  this.doc = null
  this.customComponentMap = null
  this.callbacks = null
}

export function getRootElement() {
  const doc = this.doc || {}
  const body = doc.body || {}
  return body.toJSON ? body.toJSON() : {}
}

export function updateActions(addonTasks) {
  this.differ.flush()
  const tasks = []
  if (this.listener && this.listener.updates.length) {
    tasks.push(...this.listener.updates)
    this.listener.updates = []
  }
  if (addonTasks && addonTasks.length) {
    tasks.push(...addonTasks)
  }
  if (tasks.length) {
    this.callTasks(tasks)
  }
}

export function fireEvent(ref, type, e, domChanges) {
  if (Array.isArray(ref)) {
    ref.some((ref) => {
      return this.fireEvent(ref, type, e) !== false
    })
    return
  }

  const el = this.doc.getRef(ref)

  if (el) {
    perf.start('manage event', ref + '-' + type)
    e = e || {}
    e.type = type
    e.target = el
    e.timestamp = Date.now()
    if (domChanges) {
      updateElement(el, domChanges)
    }
    const result = this.eventManager.fire(el, type, e)
    perf.end('manage event', ref + '-' + type)
    this.updateActions()
    return result
  }

  return new Error(`invalid element reference "${ref}"`)
}

export function callback(callbackId, data, ifKeepAlive) {
  const callback = this.callbacks[callbackId]

  if (typeof callback === 'function') {
    callback(data) // data is already a object, @see: lib/framework.js

    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
      this.callbacks[callbackId] = undefined
    }

    this.updateActions()
    return
  }

  return new Error(`invalid callback id "${callbackId}"`)
}

export function refreshData(data) {
  const vm = this.vm

  if (vm && data) {
    if (typeof vm.refreshData === 'function') {
      vm.refreshData(data)
    } else {
      extend(vm, data)
    }
    this.updateActions([createAction('refreshFinish', [])])
    return
  }

  return new Error(`invalid data "${data}"`)
}

function updateElement(el, changes) {
  const attrs = changes.attrs || {}
  for (const name in attrs) {
    el.setAttr(name, attrs)
  }
  const style = changes.style || {}
  for (const name in style) {
    el.setStyle(name, style[name])
  }
}


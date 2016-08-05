/**
 * @fileOverview
 * instance controls from native
 *
 * - fire event
 * - callback
 * - destroy
 *
 * corresponded with the API of instance manager (framework.js)
 */
import { extend } from '../../util'

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

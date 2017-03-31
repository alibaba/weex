/**
 * For general callback management of a certain Weex instance.
 * Because function can not passed into native, so we create callback
 * callback id for each function and pass the callback id into native
 * in fact. And when a callback called from native, we can find the real
 * callback through the callback id we have passed before.
 */
export default class CallbackManager {
  constructor (instanceId) {
    this.instanceId = instanceId
    this.lastCallbackId = 0
    this.callbacks = []
  }
  add (callback) {
    this.lastCallbackId++
    this.callbacks[this.lastCallbackId] = callback
    return this.lastCallbackId
  }
  remove (callbackId) {
    const callback = this.callbacks[callbackId]
    this.callbacks[callbackId] = undefined
    return callback
  }
  consume (callbackId, data, ifKeepAlive) {
    const callback = this.callbacks[callbackId]
    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
      this.callbacks[callbackId] = undefined
    }
    if (typeof callback === 'function') {
      return callback(data)
    }
    return new Error(`invalid callback id "${callbackId}"`)
  }
  close () {
    this.callbacks = this.callbacks.map(cb => undefined)
  }
}

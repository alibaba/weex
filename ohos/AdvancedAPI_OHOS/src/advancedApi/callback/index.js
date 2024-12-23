class CallbackManager {
  constructor (cb) {
    this.lastCallbackId = 0
    this.callbacks = []
  }

  add (callback) {
    this.lastCallbackId++
    this.callbacks[this.lastCallbackId] = callback
    callback.__callbackId = this.lastCallbackId
    return this.lastCallbackId
  }

  consume (callbackId, data, ifKeepAlive) {
    const callback = this.callbacks[callbackId]
    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
      this.callbacks[callbackId] = undefined
    } else {
      callback.isKeepAlive = true
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

const callbackManager = new CallbackManager()
export default callbackManager

import callbackManager from './index'

export default class JSCallback {
  constructor (options) {
    this.id = options.id
    this._valid = true
  }

  invoke (data) {
    if (this._valid) {
      callbackManager.consume(this.id, data, data.ifKeepAlive)
    } else {
      console.error(`[AdvancedAPI] callback ${this.id} had be destroyed.`)
    }
  }

  invokeAndKeepAlive (data) {
    if (this._valid) {
      callbackManager.consume(this.id, data, true)
    } else {
      console.error(`[AdvancedAPI] callback ${this.id} had be destroyed.`)
    }
  }

  destroy () {
    this.id = undefined
    this._valid = false
  }
}

export const jsCallbackMap = new Map()

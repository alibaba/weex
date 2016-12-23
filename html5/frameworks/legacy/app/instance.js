/**
 * @fileOverview
 * Weex App constructor & definition
 */

import Differ from './differ'
import renderer from '../config'

/**
 * App constructor for Weex framework.
 * @param {string} id
 * @param {object} options
 * @param {object} callbackManager
 */
export default function App (id, options, callbackManager) {
  this.id = id
  this.options = options || {}
  this.vm = null
  this.customComponentMap = {}
  this.commonModules = {}

  // callbackManager
  Object.defineProperty(this, 'callbacks', {
    get: function () { return callbackManager.callbacks },
    set: function (v) { if (!v) callbackManager.close() }
  })
  Object.defineProperty(this, 'uid', {
    get: function () { return callbackManager.lastCallbackId },
    set: function (v) { callbackManager.lastCallbackId = v }
  })
  this.callbackManager = callbackManager

  // document
  this.doc = new renderer.Document(
    id,
    this.options.bundleUrl,
    null,
    renderer.Listener
  )
  this.differ = new Differ(id)
}

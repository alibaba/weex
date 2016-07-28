/**
 * @fileOverview
 * Weex instance constructor & definition
 */

import Differ from './differ'

import renderer from '../config'
import { requireModule } from './register'
import { updateActions, callTasks } from './ctrl'

/**
 * App constructor for Weex framework.
 * @param {string} id
 * @param {object} options
 */
export default function App (id, options) {
  this.id = id
  this.options = options || {}
  this.vm = null
  this.customComponentMap = {}
  this.callbacks = {}
  this.doc = new renderer.Document(id, this.options.bundleUrl)
  this.differ = new Differ(id)
  this.uid = 0
}

/**
 * @deprecated
 */
App.prototype.requireModule = function (name) {
  return requireModule(this, name)
}

/**
 * @deprecated
 */
App.prototype.updateActions = function () {
  updateActions(this)
}

/**
 * @deprecated
 */
App.prototype.callTasks = function (tasks) {
  callTasks(this, tasks)
}

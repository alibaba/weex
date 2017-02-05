/**
 * @fileOverview
 * Weex instance constructor & definition
 */

import { requireModule } from './register'
import { updateActions, callTasks } from './ctrl/index'
import App from './instance'

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
  return updateActions(this)
}

/**
 * @deprecated
 */
App.prototype.callTasks = function (tasks) {
  return callTasks(this, tasks)
}

/**
 * Prevent modification of App and App.prototype
 */
Object.freeze(App)
Object.freeze(App.prototype)

export default App

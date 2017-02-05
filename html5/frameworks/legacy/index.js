/**
 * @fileOverview Weex framework entry.
 */

import * as methods from './api/methods'

import Vm from './vm'
export { createInstance } from './static/create'
export { init, refreshInstance, destroyInstance } from './static/life'
import { registerComponents, registerModules, registerMethods } from './static/register'
export { receiveTasks } from './static/bridge'
export { getRoot } from './static/misc'

// register special methods for Weex framework
registerMethods(methods)

/**
 * Prevent modification of Vm and Vm.prototype
 */
Object.freeze(Vm)

export { registerComponents, registerModules, registerMethods }

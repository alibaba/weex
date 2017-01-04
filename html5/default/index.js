/**
 * @fileOverview Weex framework entry.
 */

export { createInstance } from './static/create'
export { init, refreshInstance, destroyInstance } from './static/life'
export { registerComponents, registerModules, registerMethods } from './static/register'
export { receiveTasks } from './static/bridge'
export { getRoot } from './static/misc'

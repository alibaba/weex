/**
 * @fileOverview Main entry, instance manager
 *
 * - createInstance(id, code, options, data)
 * - refreshInstance(id, data)
 * - destroyInstance(id)
 * - registerComponents(components)
 * - registerModules(modules)
 * - getRoot(id)
 * - instanceMap
 * - callJS(id, tasks)
 *   - fireEvent(ref, type, data)
 *   - callback(funcId, data)
 */

import config from './config'
import App from './app'
import {
  init as initApp,
  refresh,
  destroy,
  getRootElement,
  fireEvent,
  callback
} from './app/ctrl'
import {
  initModules,
  initMethods
} from './app/register'
import Vm from './vm'

const {
  nativeComponentMap
} = config
const instanceMap = {}

export function init (cfg) {
  config.Document = cfg.Document
  config.Element = cfg.Element
  config.Comment = cfg.Comment
  config.sendTasks = cfg.sendTasks
}

/**
 * create a Weex instance
 *
 * @param  {string} id
 * @param  {string} code
 * @param  {object} [options] option `HAS_LOG` enable print log
 * @param  {object} [data]
 */
export function createInstance (id, code, options, data) {
  let instance = instanceMap[id]
  options = options || {}
  let result
  if (!instance) {
    instance = new App(id, options)
    instanceMap[id] = instance
    result = initApp(instance, code, data)
  }
  else {
    result = new Error(`invalid instance id "${id}"`)
  }
  return result
}

/**
 * refresh a Weex instance
 *
 * @param  {string} id
 * @param  {object} data
 */
export function refreshInstance (id, data) {
  const instance = instanceMap[id]
  let result
  if (instance) {
    result = refresh(instance, data)
  }
  else {
    result = new Error(`invalid instance id "${id}"`)
  }
  return result
}

/**
 * destroy a Weex instance
 * @param  {string} id
 */
export function destroyInstance (id) {
  const instance = instanceMap[id]
  if (!instance) {
    return new Error(`invalid instance id "${id}"`)
  }
  destroy(instance)
  delete instanceMap[id]
  return instanceMap
}

/**
 * register the name of each native component
 * @param  {array} components array of name
 */
export function registerComponents (components) {
  if (Array.isArray(components)) {
    components.forEach(function register (name) {
      /* istanbul ignore if */
      if (!name) {
        return
      }
      if (typeof name === 'string') {
        nativeComponentMap[name] = true
      }
      else if (typeof name === 'object' && typeof name.type === 'string') {
        nativeComponentMap[name.type] = name
      }
    })
  }
}

/**
 * register the name and methods of each module
 * @param  {object} modules a object of modules
 */
export function registerModules (modules) {
  if (typeof modules === 'object') {
    initModules(modules)
  }
}

/**
 * register the name and methods of each api
 * @param  {object} apis a object of apis
 */
export function registerMethods (methods) {
  if (typeof methods === 'object') {
    initMethods(Vm, methods)
  }
}

global.registerMethods = registerMethods

/**
 * get a whole element tree of an instance
 * for debugging
 * @param  {string} id
 * @return {object} a virtual dom tree
 */
export function getRoot (id) {
  const instance = instanceMap[id]
  let result
  if (instance) {
    result = getRootElement(instance)
  }
  else {
    result = new Error(`invalid instance id "${id}"`)
  }
  return result
}

const jsHandlers = {
  fireEvent: (id, ...args) => {
    return fireEvent(instanceMap[id], ...args)
  },
  callback: (id, ...args) => {
    return callback(instanceMap[id], ...args)
  }
}

/**
 * accept calls from native (event or callback)
 *
 * @param  {string} id
 * @param  {array} tasks list with `method` and `args`
 */
export function receiveTasks (id, tasks) {
  const instance = instanceMap[id]
  if (instance && Array.isArray(tasks)) {
    const results = []
    tasks.forEach((task) => {
      const handler = jsHandlers[task.method]
      const args = [...task.args]
      if (typeof handler === 'function') {
        args.unshift(id)
        results.push(handler(...args))
      }
    })
    return results
  }
  return new Error(`invalid instance id "${id}" or tasks`)
}

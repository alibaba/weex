/**
 * @fileOverview Main entry, instance manager
 *
 * - createInstance(instanceId, code, options, data)
 * - refreshInstance(instanceId, data)
 * - destroyInstance(instanceId)
 * - registerComponents(components)
 * - registerModules(modules)
 * - getRoot(instanceId)
 * - instanceMap
 * - callJS(instanceId, tasks)
 *   - fireEvent(ref, type, data)
 *   - callback(funcId, data)
 */

import config from './config'
import AppInstance from './app'
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
 * @param  {string} instanceId
 * @param  {string} code
 * @param  {object} [options] option `HAS_LOG` enable print log
 * @param  {object} [data]
 */
export function createInstance (instanceId, code, options, data) {
  let instance = instanceMap[instanceId]
  options = options || {}

  let result
  if (!instance) {
    instance = new AppInstance(instanceId, options)
    instanceMap[instanceId] = instance
    result = instance.init(code, data)
  }
  else {
    result = new Error(`invalid instance id "${instanceId}"`)
  }

  return result || instance
}

/**
 * refresh a Weex instance
 *
 * @param  {string} instanceId
 * @param  {object} data
 */
export function refreshInstance (instanceId, data) {
  const instance = instanceMap[instanceId]
  let result
  if (instance) {
    result = instance.refreshData(data)
  }
  else {
    result = new Error(`invalid instance id "${instanceId}"`)
  }
  return result
}

/**
 * destroy a Weex instance
 * @param  {string} instanceId
 */
export function destroyInstance (instanceId) {
  const instance = instanceMap[instanceId]
  if (!instance) {
    return new Error(`invalid instance id "${instanceId}"`)
  }

  instance.destroy()
  delete instanceMap[instanceId]
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
    Vm.registerModules(modules)
  }
}

/**
 * register the name and methods of each api
 * @param  {object} apis a object of apis
 */
export function registerMethods (apis) {
  if (typeof apis === 'object') {
    Vm.registerMethods(apis)
  }
}
global.registerMethods = registerMethods

/**
 * get a whole element tree of an instance
 * for debugging
 * @param  {string} instanceId
 * @return {object} a virtual dom tree
 */
export function getRoot (instanceId) {
  const instance = instanceMap[instanceId]
  let result
  if (instance) {
    result = instance.getRootElement()
  }
  else {
    result = new Error(`invalid instance id "${instanceId}"`)
  }
  return result
}

const jsHandlers = {
  fireEvent: function fireEvent (instanceId, ref, type, data, domChanges) {
    const instance = instanceMap[instanceId]
    return instance.fireEvent(ref, type, data, domChanges)
  },

  callback: function callback (instanceId, funcId, data, ifLast) {
    const instance = instanceMap[instanceId]
    return instance.callback(funcId, data, ifLast)
  }
}

/**
 * accept calls from native (event or callback)
 *
 * @param  {string} instanceId
 * @param  {array} tasks list with `method` and `args`
 */
export function receiveTasks (instanceId, tasks) {
  const instance = instanceMap[instanceId]
  if (instance && Array.isArray(tasks)) {
    const results = []
    tasks.forEach((task) => {
      const handler = jsHandlers[task.method]
      const args = [...task.args]
      if (typeof handler === 'function') {
        args.unshift(instanceId)
        results.push(handler(...args))
      }
    })
    return results
  }
  return new Error(`invalid instance id "${instanceId}" or tasks`)
}

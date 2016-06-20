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

import * as config from '../config'
import AppInstance from '../app'
import Vm from '../vm'

var {
  nativeComponentMap
} = config
var instanceMap = {}

/**
 * create a Weex instance
 *
 * @param  {string} instanceId
 * @param  {string} code
 * @param  {object} [options] option `HAS_LOG` enable print log
 * @param  {object} [data]
 */
function createInstance(instanceId, code, options, data) {
  var instance = instanceMap[instanceId]
  options = options || {}

  config.debug = options.debug

  var result
  if (!instance) {
    instance = new AppInstance(instanceId, options)
    instanceMap[instanceId] = instance
    result = instance.init(code, data)
  } else {
    result = new Error(`invalid instance id "${instanceId}"`)
  }

  return result
}

/**
 * refresh a Weex instance
 *
 * @param  {string} instanceId
 * @param  {object} data
 */
function refreshInstance(instanceId, data) {
  var instance = instanceMap[instanceId]
  var result
  if (instance) {
    result = instance.refreshData(data)
  } else {
    result = new Error(`invalid instance id "${instanceId}"`)
  }
  return result
}

/**
 * destroy a Weex instance
 * @param  {string} instanceId
 */
function destroyInstance(instanceId) {
  var instance = instanceMap[instanceId]
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
function registerComponents(components) {
  if (Array.isArray(components)) {
    components.forEach(function register(name) {
      /* istanbul ignore if */
      if (!name) {
        return
      }
      if (typeof name === 'string') {
        nativeComponentMap[name] = true
      } else if (typeof name === 'object' && typeof name.type === 'string') {
        nativeComponentMap[name.type] = name
      }
    })
  }
}

/**
 * register the name and methods of each module
 * @param  {object} modules a object of modules
 */
function registerModules(modules) {
  if (typeof modules === 'object') {
    Vm.registerModules(modules)
  }
}

/**
 * register the name and methods of each api
 * @param  {object} apis a object of apis
 */
function registerMethods(apis) {
  if (typeof apis === 'object') {
    Vm.registerMethods(apis)
  }
}

/**
 * get a whole element tree of an instance
 * for debugging
 * @param  {string} instanceId
 * @return {object} a virtual dom tree
 */
function getRoot(instanceId) {
  var instance = instanceMap[instanceId]
  var result
  if (instance) {
    result = instance.getRootElement()
  } else {
    result = new Error(`invalid instance id "${instanceId}"`)
  }
  return result
}

var jsHandlers = {
  fireEvent: function fireEvent(instanceId, ref, type, data, domChanges) {
    var instance = instanceMap[instanceId]
    var result
    result = instance.fireEvent(ref, type, data, domChanges)
    return result
  },

  callback: function callback(instanceId, funcId, data, ifLast) {
    var instance = instanceMap[instanceId]
    var result
    result = instance.callback(funcId, data, ifLast)
    return result
  }
}

/**
 * accept calls from native (event or callback)
 *
 * @param  {string} instanceId
 * @param  {array} tasks list with `method` and `args`
 */
function callJS(instanceId, tasks) {
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

export default {
  createInstance,
  refreshInstance,
  destroyInstance,
  registerComponents,
  registerModules,
  registerMethods,
  getRoot,
  callJS
}

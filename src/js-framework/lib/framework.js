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

import * as perf from './perf'
import * as config from './config'
import AppInstance from './app'
import Vm from './vm'

var {
  nativeComponentMap
} = config
var instanceMap = {}

/**
 * create a Weex instance
 *
 * @param  {string} instanceId
 * @param  {string} code
 * @param  {object} [options] option `debug` enable print log
 * @param  {object} [data]
 */
export function createInstance(instanceId, code, options, data) {
  var instance = instanceMap[instanceId]
  options = options || {}

  /* istanbul ignore if */
  config.debug = options.debug

  var result
  if (!instance) {
    perf.start('createInstance', instanceId)
    instance = new AppInstance(instanceId, options)
    instanceMap[instanceId] = instance
    result = instance.init(code, data)
    perf.end('createInstance', instanceId)
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
export function refreshInstance(instanceId, data) {
  var instance = instanceMap[instanceId]
  var result
  if (instance) {
    perf.start('refreshData', instanceId)
    result = instance.refreshData(data)
    perf.end('refreshData', instanceId)
  } else {
    result = new Error(`invalid instance id "${instanceId}"`)
  }
  return result
}

/**
 * destroy a Weex instance
 * @param  {string} instanceId
 */
export function destroyInstance(instanceId) {
  var instance = instanceMap[instanceId]
  if (!instance) {
    return new Error(`invalid instance id "${instanceId}"`)
  }

  perf.start('destroyInstance', instanceId)
  instance.destroy()
  delete instanceMap[instanceId]
  perf.end('destroyInstance', instanceId)

  return instanceMap
}

/**
 * register the name of each native component
 * @param  {array} components array of name
 */
export function registerComponents(components) {
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
export function registerModules(modules) {
  if (typeof modules === 'object') {
    Vm.registerModules(modules)
  }
}

/**
 * register the name and methods of each api
 * @param  {object} apis a object of apis
 */
export function registerMethods(apis) {
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
export function getRoot(instanceId) {
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
  fireEvent: function fireEvent(instanceId, ref, type, data) {
    var instance = instanceMap[instanceId]
    var result
    perf.start('fireEvent', instanceId + '-' + ref + '-' + type)
    result = instance.fireEvent(ref, type, data)
    perf.end('fireEvent', instanceId + '-' + ref + '-' + type)
    return result
  },

  callback: function callback(instanceId, funcId, data, ifLast) {
    var instance = instanceMap[instanceId]
    var result
    perf.start('callback',
      instanceId + '-' + funcId + '-' + data + '-' + ifLast)
    result = instance.callback(funcId, data, ifLast)
    perf.end('callback',
      instanceId + '-' + funcId + '-' + data + '-' + ifLast)
    return result
  }
}

/**
 * accept calls from native (event or callback)
 *
 * @param  {string} instanceId
 * @param  {array} tasks list with `method` and `args`
 */
export function callJS(instanceId, tasks) {
  const instance = instanceMap[instanceId]
  let results = []
  if (instance && Array.isArray(tasks)) {
    tasks.forEach((task) => {
      const handler = jsHandlers[task.method]
      const args = [...task.args]
      if (typeof handler === 'function') {
        log('javascript:', task.method, task.args)
        args.unshift(instanceId)
        results.push(handler(...args))
      }
    })
  } else {
    results.push(new Error(`invalid instance id "${instanceId}" or tasks`))
  }

  return results
}

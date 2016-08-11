import { instanceMap } from './map'

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

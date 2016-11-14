import { instanceMap } from './map'
import {
  fireEvent,
  callback
} from '../app/ctrl/index'

const jsHandlers = {
  fireEvent: (id, ...args) => {
    return fireEvent(instanceMap[id], ...args)
  },
  callback: (id, ...args) => {
    return callback(instanceMap[id], ...args)
  }
}

/**
 * Accept calls from native (event or callback).
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
      /* istanbul ignore else */
      if (typeof handler === 'function') {
        args.unshift(id)
        results.push(handler(...args))
      }
    })
    return results
  }
  return new Error(`invalid instance id "${id}" or tasks`)
}

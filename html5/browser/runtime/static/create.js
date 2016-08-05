import AppInstance from '../app'
import { instanceMap } from '../../../default/static/map'

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

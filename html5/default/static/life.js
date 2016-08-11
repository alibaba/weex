import config from '../config'
import { instanceMap } from './map'

export function init (cfg) {
  config.Document = cfg.Document
  config.Element = cfg.Element
  config.Comment = cfg.Comment
  config.sendTasks = cfg.sendTasks
  config.Listener = cfg.Listener
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

import config from '../config'
import {
  refresh,
  destroy
} from '../app/ctrl'
import { instanceMap } from './map'
import { resetTarget } from '../core/dep'

/**
 * Init config informations for Weex framework
 * @param  {object} cfg
 */
export function init (cfg) {
  config.Document = cfg.Document
  config.Element = cfg.Element
  config.Comment = cfg.Comment
  config.sendTasks = cfg.sendTasks
  config.Listener = cfg.Listener
}

/**
 * Refresh a Weex instance with data.
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
 * Destroy a Weex instance.
 * @param  {string} id
 */
export function destroyInstance (id) {
  resetTarget()
  const instance = instanceMap[id]
  if (!instance) {
    return new Error(`invalid instance id "${id}"`)
  }
  destroy(instance)
  delete instanceMap[id]
  return instanceMap
}

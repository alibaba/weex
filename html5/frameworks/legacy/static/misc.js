import { instanceMap } from './map'
import {
  getRootElement
} from '../app/ctrl/index'

/**
 * Get a whole element tree of an instance for debugging.
 * @param  {string} id
 * @return {object} a virtual dom tree
 */
export function getRoot (id) {
  const instance = instanceMap[id]
  let result
  /* istanbul ignore else */
  if (instance) {
    result = getRootElement(instance)
  }
  else {
    result = new Error(`invalid instance id "${id}"`)
  }
  return result
}

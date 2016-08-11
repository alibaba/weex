import { instanceMap } from './map'

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

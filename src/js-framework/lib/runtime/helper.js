// Document
export { Document } from '../app/dom'

// callNative
export function sendTasks (...args) {
  global.callNative(args)
}

// Document
export { Document, Element, Comment } from '../vdom'

// callNative
export function sendTasks (...args) {
  global.callNative(...args)
}

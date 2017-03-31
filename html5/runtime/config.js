import { Document, Element, Comment } from './vdom'
import Listener from './listener'
import { TaskCenter } from './task-center'

const config = {
  Document, Element, Comment, Listener,
  TaskCenter,
  sendTasks (...args) {
    return global.callNative(...args)
  }
}

Document.handler = config.sendTasks

export default config

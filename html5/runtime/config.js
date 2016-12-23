import { Document, Element, Comment } from './vdom'
import Listener from './listener'
import CallbackManager from './callback-manager'

const config = {
  Document, Element, Comment, Listener,
  sendTasks (...args) {
    return global.callNative(...args)
  },
  CallbackManager
}

Document.handler = config.sendTasks

export default config

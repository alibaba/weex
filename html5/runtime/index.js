import { Document, Element, Comment } from '../vdom'
import Listener from '../vdom/listener'
import frameworks from './config'

import init from './init'

const config = {
  Document, Element, Comment, Listener, frameworks,
  sendTasks (...args) {
    return global.callNative(...args)
  }
}

const methods = init(config)

export default methods

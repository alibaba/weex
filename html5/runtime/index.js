import { Document, Element, Comment } from '../vdom'

import init from './init'

const config = {
  Document, Element, Comment,
  sendTasks (...args) {
    return global.callNative(...args)
  }
}

const methods = init(config)

export default methods

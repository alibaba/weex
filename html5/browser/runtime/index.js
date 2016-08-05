'use strict'

import './shared'
// import init from '../../runtime/init'
import init from './init'
import frameworks from './config'
import { Document, Element, Comment } from '../../vdom'
import { subversion } from '../../../package.json'
// import * as methods from '../../default/api/methods'
import * as methods from '../../default/api/methods'
import Listener from '../dom/componentManager'

const config = {
  Document, Element, Comment, Listener, frameworks,
  sendTasks (...args) {
    global.callNative(...args)
  }
}

const runtime = init(config)

const { native, transformer } = subversion

for (const methodName in runtime) {
  global[methodName] = function (...args) {
    const ret = runtime[methodName](...args)
    if (ret instanceof Error) {
      console.error(ret.toString())
    }
    return ret
  }
}

global.frameworkVersion = native
global.transformVersion = transformer

/**
 * register methods
 */
global.registerMethods(methods)


'use strict'

import '../../shared'
import init from '../../runtime/init'
import { Document, Element, Comment } from '../dom'
import { subversion } from '../../../package.json'

const config = {
  Document, Element, Comment,
  sendTasks (...args) {
    global.callNative(...args)
  }
}

const runtime = init(config)

const { framework, transformer } = subversion

for (const methodName in runtime) {
  global[methodName] = function (...args) {
    const ret = runtime[methodName](...args)
    if (ret instanceof Error) {
      console.error(ret.toString())
    }
    return ret
  }
}

Object.assign(global, {
  frameworkVersion: framework,
  needTransformerVersion: transformer
})

/**
 * register methods
 */
const methods = require('../../default/api/methods')
const { registerMethods } = global
registerMethods(methods)

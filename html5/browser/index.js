'use strict'

// require('../native')

require('../native')

import '../shared'
import runtime from '../runtime'
import { subversion } from '../../package.json'

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

Object.assign(global, {
  frameworkVersion: native,
  needTransformerVersion: transformer
})

/**
 * register methods
 */
const methods = require('../default/api/methods')
const { registerMethods } = global
registerMethods(methods)


require('./weex')

import './polyfill'
import * as framework from './lib/framework'
import {version, optionalDependencies} from './package.json'

Object.assign(global, framework, {
    frameworkVersion: version,
    needTransformerVersion: optionalDependencies['weex-transformer']
})

/**
 * register methods
 */
const methods = require('./lib/api/methods')
const {registerMethods} = global
registerMethods(methods)

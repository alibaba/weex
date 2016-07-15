/**
 * @fileOverview
 * ViewModel Constructor & definition
 */

import { extend } from '../util'
import {
  initState
} from '../core/state'
import {
  build
} from './compiler'
import {
  initEvents,
  mixinEvents
} from './events'
import {
  registerModules,
  registerMethods
} from '../app/register'

/**
 * ViewModel constructor
 *
 * @param {string} type
 * @param {object} options    component options
 * @param {object} parentVm   which contains _app
 * @param {object} parentEl   root element or frag block
 * @param {object} mergedData external data
 * @param {object} externalEvents external events
 */
export default function Vm (
  type,
  options,
  parentVm,
  parentEl,
  mergedData,
  externalEvents
) {
  this._parent = parentVm._realParent ? parentVm._realParent : parentVm
  this._app = parentVm._app
  parentVm._childrenVms && parentVm._childrenVms.push(this)

  if (!options) {
    options = this._app.customComponentMap[type] || {}
  }
  const data = options.data || {}

  this._options = options
  this._methods = options.methods || {}
  this._computed = options.computed || {}
  this._css = options.style || {}
  this._ids = {}
  this._vmEvents = {}
  this._childrenVms = []
  this._type = type

  // bind events and lifecycles
  initEvents(this, externalEvents)

  console.debug(`[JS Framework] "init" lifecycle in Vm(${this._type})`)
  this.$emit('hook:init')
  this._inited = true

  // proxy data and methods
  // observe data and add this to vms
  this._data = typeof data === 'function' ? data() : data
  if (mergedData) {
    extend(this._data, mergedData)
  }
  initState(this)

  console.debug(`[JS Framework] "created" lifecycle in Vm(${this._type})`)
  this.$emit('hook:created')
  this._created = true

  // backward old ready entry
  if (options.methods && options.methods.ready) {
    console.warn('"exports.methods.ready" is deprecated, ' +
      'please use "exports.created" instead')
    options.methods.ready.call(this)
  }

  // if no parentElement then specify the documentElement
  this._parentEl = parentEl || this._app.doc.documentElement
  build(this)
}

mixinEvents(Vm.prototype)

extend(Vm, {
  registerModules,
  registerMethods
})

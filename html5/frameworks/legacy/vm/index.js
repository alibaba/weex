/**
 * @fileOverview
 * ViewModel Constructor & definition
 */

import { extend } from '../util/index'
import {
  initState
} from '../core/state'
import {
  build
} from './compiler'
import {
  set,
  del
} from '../core/observer'
import {
  watch
} from './directive'
import {
  initEvents,
  mixinEvents
} from './events'

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
  parentVm = parentVm || {}
  this._parent = parentVm._realParent ? parentVm._realParent : parentVm
  this._app = parentVm._app || {}
  parentVm._childrenVms && parentVm._childrenVms.push(this)

  if (!options && this._app.customComponentMap) {
    options = this._app.customComponentMap[type]
  }
  options = options || {}

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

  if (!this._app.doc) {
    return
  }

  // if no parentElement then specify the documentElement
  this._parentEl = parentEl || this._app.doc.documentElement
  build(this)
}

mixinEvents(Vm.prototype)

/**
 * Watch an function and bind all the data appeared in it. When the related
 * data changes, the callback will be called with new value as 1st param.
 *
 * @param {Function} fn
 * @param {Function} callback
 */
Vm.prototype.$watch = function (fn, callback) {
  watch(this, fn, callback)
}

Vm.set = set
Vm.delete = del

/**
 * @fileOverview
 * ViewModel Constructor & definition
 */

import * as _ from '../util'
import * as state from '../core/state'
import * as compiler from './compiler'
import * as directive from './directive'
import * as domHelper from './dom-helper'
import * as events from './events'

import { registerModules, registerMethods } from '../app/register'

function callOldReadyEntry (vm, component) {
  if (component.methods &&
      component.methods.ready) {
    _.warn('"exports.methods.ready" is deprecated, ' +
      'please use "exports.created" instead')
    component.methods.ready.call(vm)
  }
}

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
  this._initEvents(externalEvents)

  _.debug(`"init" lifecycle in Vm(${this._type})`)
  this.$emit('hook:init')
  this._inited = true
  // proxy data and methods
  // observe data and add this to vms
  this._data = typeof data === 'function' ? data() : data
  if (mergedData) {
    _.extend(this._data, mergedData)
  }
  this._initState()

  _.debug(`"created" lifecycle in Vm(${this._type})`)
  this.$emit('hook:created')
  this._created = true
  // backward old ready entry
  callOldReadyEntry(this, options)

  // if no parentElement then specify the documentElement
  this._parentEl = parentEl || this._app.doc.documentElement
  this._build()
}

_.extend(Vm.prototype, state, compiler, directive, domHelper, events)
_.extend(Vm, {
  registerModules,
  registerMethods
})

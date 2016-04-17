/**
 * @fileOverview
 * ViewModel Constructor & definition
 */

import {extend, toArray} from '../util'

import * as scope from './instance/scope'
import * as compiler from './compiler'
import * as directive from './directive'
import * as domHelper from './dom-helper'
import * as events from './events'
// import * as modules from './../api/modules'
// import * as api from './../api/api'

import {registerModules, registerMethods} from '../app/register'

function callOldReadyEntry(vm, component) {
  if (component.methods &&
      component.methods.ready) {
    component.methods.ready.call(vm)
  }
}

/**
 * ViewModel constructor
 *
 * @param {string} type
 * @param {object} parentVm   which contains _app
 * @param {object} parentEl   root element or frag block
 * @param {object} mergedData external data
 * @param {object} externalEvents external events
 */
export default function Vm(
  type,
  parentVm,
  parentEl,
  mergedData,
  externalEvents
) {
  this._parent = parentVm._realParent ? parentVm._realParent : parentVm
  this._app = parentVm._app
  parentVm._childrenVms && parentVm._childrenVms.push(this)

  const component = this._app.customComponentMap[type] || {}
  const data = component.data || {}

  this._options = component
  this._methods = component.methods || {}
  this._computed = component.computed || {}
  this._css = component.style || {}
  this._ids = {}
  this._watchers = []
  this._vmEvents = {}
  this._childrenVms = []
  this._type = type

  // bind events and lifecycles
  this._initEvents(externalEvents)

  this.$emit('hook:init')
  this._inited = true
  // proxy data and methods
  // observe data and add this to vms
  this._data = typeof data === 'function' ? data() : data
  if (mergedData) {
    extend(this._data, mergedData)
  }
  this._initScope()

  this.$emit('hook:created')
  this._created = true
  // backward old ready entry
  callOldReadyEntry(this, component)

  // if no parentElement then specify the documentElement
  this._parentEl = parentEl || this._app.doc.documentElement
  this._build()
}

extend(Vm.prototype, scope, compiler, directive, domHelper, events)
extend(Vm, {
  registerModules,
  registerMethods
})
// Vm.registerModules(modules)

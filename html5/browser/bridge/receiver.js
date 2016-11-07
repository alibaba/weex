'use strict'

import config from '../render/config'
import protocol from './protocol'
import { isArray, frameUpdater } from '../utils'
import Sender from './sender'

const callQueue = []
// Need a task counter?
// When frameUpdater is not activated, tasks will not be push
// into callQueue and there will be no trace for situation of
// execution of tasks.

// give 10ms for call handling, and rest 6ms for others
const MAX_TIME_FOR_EACH_FRAME = 10

// callNative: jsFramework will call this method to talk to
// this renderer.
// params:
//  - instanceId: string.
//  - tasks: array of object.
//  - callbackId: number.
function callNative (instanceId, tasks, callbackId) {
  let calls = []
  if (typeof tasks === 'string') {
    try {
      calls = JSON.parse(tasks)
    }
    catch (e) {
      console.error('invalid tasks:', tasks)
    }
  }
  else if (isArray(tasks)) {
    calls = tasks
  }
  const len = calls.length
  calls[len - 1].callbackId = (!callbackId && callbackId !== 0)
                              ? -1
                              : callbackId
  // To solve the problem of callapp, the two-way time loop rule must
  // be replaced by calling directly except the situation of page loading.
  // 2015-11-03
  for (let i = 0; i < len; i++) {
    if (frameUpdater.isActive()) {
      callQueue.push({
        instanceId: instanceId,
        call: calls[i]
      })
    }
    else {
      processCall(instanceId, calls[i])
    }
  }
}

function processCallQueue () {
  let len = callQueue.length
  if (len === 0) {
    return
  }
  const start = Date.now()
  let elapsed = 0

  while (--len >= 0 && elapsed < MAX_TIME_FOR_EACH_FRAME) {
    const callObj = callQueue.shift()
    processCall(callObj.instanceId, callObj.call)
    elapsed = Date.now() - start
  }
}

function processCall (instanceId, call) {
  const isComponent = typeof call.module === 'undefined'
  isComponent ? componentCall(instanceId, call) : moduleCall(instanceId, call)

  const callbackId = call.callbackId
  if ((callbackId
    || callbackId === 0
    || callbackId === '0')
    && callbackId !== '-1'
    && callbackId !== -1) {
    performNextTick(instanceId, callbackId)
  }
}

function moduleCall (instanceId, call) {
  const moduleName = call.module
  const methodName = call.method
  let module, method
  const args = call.args || call.arguments || []

  if (!(module = protocol.apiModule[moduleName])) {
    return
  }
  if (!(method = module[methodName])) {
    return
  }

  method.apply(global.weex.getInstance(instanceId), args)
}

function componentCall (instanceId, call) {
  const componentName = call.component
  const ref = call.ref
  const methodName = call.method
  const args = call.args || call.arguments || []

  const elem = global.weex.getInstance(instanceId).getComponentManager().getComponent(ref)
  if (!elem) {
    return console.error(`[h5-render] component of ref ${ref} doesn't exist.`)
  }

  let method

  if (!(method = elem[methodName])) {
    return console.error(`[h5-render] component ${componentName} doesn't have a method named ${methodName}.`)
  }

  method.apply(elem, args)
}

function performNextTick (instanceId, callbackId) {
  Sender.getSender(instanceId).performCallback(callbackId)
}

function nativeLog () {
  if (config.debug) {
    if (arguments[0].match(/^perf/)) {
      console.info.apply(console, arguments)
      return
    }
    console.debug.apply(console, arguments)
  }
}

function exportsBridgeMethodsToGlobal () {
  global.callNative = callNative
  global.nativeLog = nativeLog
}

export default {
  init: function () {
    // process callQueue every 16 milliseconds.
    frameUpdater.addUpdateObserver(processCallQueue)
    frameUpdater.start()

    // exports methods to global(window).
    exportsBridgeMethodsToGlobal()
  }
}

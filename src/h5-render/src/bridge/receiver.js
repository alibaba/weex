'use strict'

var config = require('../config')
var protocol = require('../protocol')
var utils = require('../utils')
var FrameUpdater = require('../frameUpdater')
var Sender = require('./sender')

var callQueue = []
// Need a task counter?
// When FrameUpdater is not activated, tasks will not be push
// into callQueue and there will be no trace for situation of
// execution of tasks.

// give 10ms for call handling, and rest 6ms for others
var MAX_TIME_FOR_EACH_FRAME = 10

// callNative: jsFramework will call this method to talk to
// this renderer.
// params:
//  - instanceId: string.
//  - tasks: array of object.
//  - callbackId: number.
function callNative(instanceId, tasks, callbackId) {
  var calls = []
  if (typeof tasks === 'string') {
    try {
      calls = JSON.parse(tasks)
    } catch (e) {
      console.error('invalid tasks:', tasks)
    }
  } else if (Object.prototype.toString.call(tasks).slice(8, -1) === 'Array') {
    calls = tasks
  }
  var len = calls.length
  calls[len - 1].callbackId = (!callbackId && callbackId !== 0)
                              ? -1
                              : callbackId
  // To solve the problem of callapp, the two-way time loop rule must
  // be replaced by calling directly except the situation of page loading.
  // 2015-11-03
  for (var i = 0; i < len; i++) {
    if (FrameUpdater.isActive()) {
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

function processCallQueue() {
  var len = callQueue.length
  if (len === 0) {
    return
  }
  var start = Date.now()
  var elapsed = 0

  while (--len >= 0 && elapsed < MAX_TIME_FOR_EACH_FRAME) {
    var callObj = callQueue.shift()
    processCall(callObj.instanceId, callObj.call)
    elapsed = Date.now() - start
  }
}

function processCall(instanceId, call) {
  var moduleName = call.module
  var methodName = call.method
  var module, method
  var args = call.args || call.arguments || []

  if (!(module = protocol.apiModule[moduleName])) {
    return
  }
  if (!(method = module[methodName])) {
    return
  }

  method.apply(protocol.getWeexInstance(instanceId), args)

  var callbackId = call.callbackId
  if ((callbackId
    || callbackId === 0
    || callbackId === '0')
    && callbackId !== '-1'
    && callbackId !== -1) {
    performNextTick(instanceId, callbackId)
  }
}

function performNextTick(instanceId, callbackId) {
  Sender.getSender(instanceId).performCallback(callbackId)
}

function nativeLog() {
  if (config.debug) {
    if (arguments[0].match(/^perf/)) {
      console.info.apply(console, arguments)
      return
    }
    console.debug.apply(console, arguments)
  }
}

function exportsBridgeMethodsToGlobal() {
  global.callNative = callNative
  global.nativeLog = nativeLog
}

module.exports = {

  init: function () {

    // process callQueue every 16 milliseconds.
    FrameUpdater.addUpdateObserver(processCallQueue)
    FrameUpdater.start()

    // exports methods to global(window).
    exportsBridgeMethodsToGlobal()
  }

}

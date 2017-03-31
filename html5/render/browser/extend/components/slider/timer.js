/* eslint-disable */

'use strict'

var _fallback = false

var raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
if (!raf) {
  _fallback = true
  raf = function (callback) {
    return setTimeout(callback, 16)
  }
}
var caf = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
if (!caf && _fallback) {
  caf = function (id) {
    return clearTimeout(id)
  }
} else if (!caf) {
  caf = function() {}
}

var MAX = (Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1) - 1

var _idMap = {}
var _globalId = 0

function _getGlobalId() {
  _globalId = (_globalId + 1) % MAX
  if (_idMap[_globalId]) {
    return _getGlobalId()
  }
  return _globalId
}

export function setTimeout (cb, ms) {
  var id = _getGlobalId()
  var start = Date.now()
  _idMap[id] = raf(function loop() {
    if (!_idMap[id] && _idMap[id] !== 0) {
      return
    }
    var ind = Date.now() - start
    if (ind < ms) {
      _idMap[id] = raf(loop)
    } else {
      delete _idMap[id]
      cb()
    }
  })
  return id
}

export function clearTimeout (id) {
  var tid = _idMap[id]
  tid && caf(tid)
  delete _idMap[id]
}

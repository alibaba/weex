/* eslint-disable */

'use strict'

var raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || function (calllback) {
    setTimeout(calllback, 16)
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

var timer = {

  setTimeout: function (cb, ms) {
    var id = _getGlobalId()
    _idMap[id] = true
    var start = Date.now()
    raf(function loop() {
      if (!_idMap[id]) {
        return
      }
      var ind = Date.now() - start
      if (ind < ms) {
        raf(loop)
      } else {
        delete _idMap[id]
        cb()
      }
    })
  },

  clearTimeout: function (id) {
    delete _idMap[id]
  }

}

module.exports = timer

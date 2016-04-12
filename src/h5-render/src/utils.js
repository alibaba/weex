'use strict'

var WEAPP_STYLE_ID = 'weapp-style'

var _isWebpSupported = false

; (function isSupportWebp() {
  try {
    var webP = new Image()
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdA'
              + 'SoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    webP.onload = function () {
      if (webP.height === 2) {
        _isWebpSupported = true
      }
    }
  } catch (e) {
    // do nothing.
  }
})()

function extend(to, from) {
  for (var key in from) {
    to[key] = from[key]
  }
  return to
}

function isArray(arr) {
  return Array.isArray
    ? Array.isArray(arr)
    : (Object.prototype.toString.call(arr) === '[object Array]')
}

function appendStyle(css, styleId, replace) {
  var style = document.getElementById(styleId)
  if (style && replace) {
    style.parentNode.removeChild(style)
    style = null
  }
  if (!style) {
    style = document.createElement('style')
    style.type = 'text/css'
    styleId && (style.id = styleId)
    document.getElementsByTagName('head')[0].appendChild(style)
  }
  style.appendChild(document.createTextNode(css))
}

function getUniqueFromArray(arr) {
  if (!isArray(arr)) {
    return []
  }
  var res = []
  var unique = {}
  var val
  for (var i = 0, l = arr.length; i < l; i++) {
    val = arr[i]
    if (unique[val]) {
      continue
    }
    unique[val] = true
    res.push(val)
  }
  return res
}

function transitionize(element, props) {
  var transitions = []
  for (var key in props) {
    transitions.push(key + ' ' + props[key])
  }
  element.style.transition = transitions.join(', ')
  element.style.webkitTransition = transitions.join(', ')
}

function detectWebp() {
  return _isWebpSupported
}

function getRandom(num) {
  var _defaultNum = 10
  if (typeof num !== 'number' || num <= 0) {
    num = _defaultNum
  }
  var _max = Math.pow(10, num)
  return Math.floor(Date.now() + Math.random() * _max) % _max
}

module.exports = {
  extend: extend,
  isArray: isArray,
  appendStyle: appendStyle,
  getUniqueFromArray: getUniqueFromArray,
  transitionize: transitionize,
  detectWebp: detectWebp,
  getRandom: getRandom
}
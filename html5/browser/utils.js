/* global Image */

'use strict'

// const WEAPP_STYLE_ID = 'weapp-style'

let _isWebpSupported = false

; (function isSupportWebp () {
  try {
    const webP = new Image()
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdA'
              + 'SoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    webP.onload = function () {
      if (webP.height === 2) {
        _isWebpSupported = true
      }
    }
  }
  catch (e) {
    // do nothing.
  }
})()

function extend (to, from) {
  for (const key in from) {
    to[key] = from[key]
  }
  return to
}

function isArray (arr) {
  return Array.isArray
    ? Array.isArray(arr)
    : (Object.prototype.toString.call(arr) === '[object Array]')
}

function isPlainObject (obj) {
  return Object.prototype.toString.call(obj)
    .slice(8, -1).toLowerCase() === 'object'
}

function getType (obj) {
  return Object.prototype.toString.call(obj)
    .slice(8, -1).toLowerCase()
}

function appendStyle (css, styleId, replace) {
  let style = document.getElementById(styleId)
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

function getUniqueFromArray (arr) {
  if (!isArray(arr)) {
    return []
  }
  const res = []
  const unique = {}
  let val
  for (let i = 0, l = arr.length; i < l; i++) {
    val = arr[i]
    if (unique[val]) {
      continue
    }
    unique[val] = true
    res.push(val)
  }
  return res
}

function transitionize (element, props) {
  const transitions = []
  for (const key in props) {
    transitions.push(key + ' ' + props[key])
  }
  element.style.transition = transitions.join(', ')
  element.style.webkitTransition = transitions.join(', ')
}

function detectWebp () {
  return _isWebpSupported
}

function getRandom (num) {
  const _defaultNum = 10
  if (typeof num !== 'number' || num <= 0) {
    num = _defaultNum
  }
  const _max = Math.pow(10, num)
  return Math.floor(Date.now() + Math.random() * _max) % _max
}

function getRgb (color) {
  let match
  color = color + ''
  match = color.match(/#(\d{2})(\d{2})(\d{2})/)
  if (match) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16)
    }
  }
  match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3])
    }
  }
}

// direction: 'l' | 'r', default is 'r'
// num: how many times to loop, should be a positive integer
function loopArray (arr, num, direction) {
  if (!isArray(arr)) {
    return
  }
  let isLeft = (direction + '').toLowerCase() === 'l'
  const len = arr.length
  num = num % len
  if (num < 0) {
    num = -num
    isLeft = !isLeft
  }
  if (num === 0) {
    return arr
  }
  let lp, rp
  if (isLeft) {
    lp = arr.slice(0, num)
    rp = arr.slice(num)
  }
  else {
    lp = arr.slice(0, len - num)
    rp = arr.slice(len - num)
  }
  return rp.concat(lp)
}

module.exports = {
  extend: extend,
  isArray: isArray,
  isPlainObject: isPlainObject,
  getType: getType,
  appendStyle: appendStyle,
  getUniqueFromArray: getUniqueFromArray,
  transitionize: transitionize,
  detectWebp: detectWebp,
  getRandom: getRandom,
  getRgb: getRgb,
  loopArray: loopArray
}

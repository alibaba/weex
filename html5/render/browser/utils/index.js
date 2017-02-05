/* global Image */

'use strict'

// const WEAPP_STYLE_ID = 'weapp-style'

import '../../../shared/objectAssign'

export {
  extend,
  def,
  remove,
  hasOwn,
  bind,
  toArray,
  isObject,
  isPlainObject,
  typof
} from '../../../frameworks/legacy/util'

import { isArray, slice } from './array'
export { isArray, slice }

export const vendors = ['ms', 'moz', 'webkit', 'o']

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

let _isStickySupported = false

; (function isSupportSticky () {
  const element = document.createElement('div')
  const elementStyle = element.style
  elementStyle.cssText = vendors.concat(['']).map(function (vendor) {
    return 'position:'
      + (vendor ? '-' + vendor + '-' : '')
      + 'sticky'
  }).join(';') + ';'
  _isStickySupported = elementStyle.position.indexOf('sticky') !== -1
})()

// export function extend (to, from) {
//   for (const key in from) {
//     to[key] = from[key]
//   }
//   return to
// }

// export function isPlainObject (obj) {
//   return Object.prototype.toString.call(obj)
//     .slice(8, -1).toLowerCase() === 'object'
// }

export function getType (obj) {
  return Object.prototype.toString.call(obj)
    .slice(8, -1).toLowerCase()
}

export function appendStyle (css, styleId, replace) {
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

export function getUniqueFromArray (arr) {
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

export function detectWebp () {
  return _isWebpSupported
}

export function detectSticky () {
  return _isStickySupported
}

export function getRandom (num) {
  const _defaultNum = 10
  if (typeof num !== 'number' || num <= 0) {
    num = _defaultNum
  }
  const _max = Math.pow(10, num)
  return Math.floor(Date.now() + Math.random() * _max) % _max
}

export function getRgb (color) {
  let match
  color = color + ''
  match = color.match(/#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/)
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
export function loopArray (arr, num, direction) {
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

export function throttle (func, wait) {
  let result
  let timerId = null
  let previous = 0
  let context
  let args
  const later = function () {
    previous = Date.now()
    timerId = null
    result = func.apply(context, args)
  }
  return function () {
    const now = Date.now()
    const remaining = wait - (now - previous)
    context = this
    args = Array.prototype.slice.call(arguments)
    if (remaining <= 0) {
      clearTimeout(timerId)
      timerId = null
      previous = now
      result = func.apply(context, args)
    }
    else if (!timerId) {
      timerId = setTimeout(later, remaining)
    }
    return result
  }
}

export function camelToKebab (name) {
  if (!name) { return '' }
  return name.replace(/([A-Z])/g, function (g, g1) {
    return `-${g1.toLowerCase()}`
  })
}

export function kebabToCamel (name) {
  if (!name) { return '' }
  return name.replace(/-([a-z])/g, function (g, g1) {
    console.log(g1)
    return `${g1.toUpperCase()}`
  })
}

/// lang.js
import Config from '../config'

/**
 * Check is a string starts with $ or _
 *
 * @param {String} str
 * @return {Boolean}
 */

export var isReserved = (str) => {
  let c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}

/**
 * Camelize a hyphen-delmited string.
 *
 * @param {String} str
 * @return {String}
 */

let camelRE = /-(\w)/g
function toUpper (_, c) {
  return c ? c.toUpperCase () : ''
}
export var camelize = (str) => {
  return str.replace(camelRE, toUpper)
}

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */

export var bind = function (fn, ctx) {
  return function (a) {
    let l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
}

/**
 * Convert an Array-like object to a real Array.
 *
 * @param {Array-like} list
 * @param {Number} [start] - start index
 * @return {Array}
 */

export var toArray = (list, start) => {
  start = start || 0
  let i = list.length - start
  let ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 *
 * @param {Object} to
 * @param {Object} from
 */

export var extend = (target, ...src) => {
  if (typeof Object.assign === 'function') {
    Object.assign(target, ...src)
  } else {
    const first = src.shift()
    for (const key in first) {
      target[key] = first[key]
    }
    if (src.length) {
      extend(target, ...src)
    }
  }
  return target
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * @param {*} obj
 * @return {Boolean}
 */

export var isObject = (obj) => {
  return !!(obj && typeof obj === 'object')
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

let toString = Object.prototype.toString
export var isPlainObject = (obj) => {
  return toString.call(obj) === '[object Object]'
}

/**
 * Array type check.
 *
 * @param {*} obj
 * @return {Boolean}
 */

export var isArray = (obj) => {
  return Array.isArray(obj)
}

export var stringify = (x) => {
  return typeof x === 'undefined' || x === null || typeof(x) === 'function'
    ? ''
    : typeof x === 'object'
      ? x instanceof RegExp
        ? x.toString()
        : x instanceof Date
          ? JSON.parse(JSON.stringify(x))
          : JSON.stringify(x)
      : x.toString()
}

export var typof = (v) => {
  let s = Object.prototype.toString.call(v)
  return s.substring(8, s.length - 1).toLowerCase()
}

export var normalize = (v) => {
  let type = typof(v)

  switch(type) {
    case 'undefined':
    case 'null':
      return ''
    case 'regexp':
      return v.toString()
    case 'date':
      return v.toISOString()
    case 'number':
    case 'string':
    case 'boolean':
    case 'array':
    case 'object':
    case 'function':
      return v
    default:
      return JSON.stringify(v)
  }
}

/**
 * Define a non-enumerable property
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {Boolean} [enumerable]
 */

export var define = (obj, key, val, enumerable) => {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Manual indexOf because it's slightly faster than
 * native.
 *
 * @param {Array} arr
 * @param {*} obj
 */

export var indexOf = (arr, obj) => {
  for (let i = 0, l = arr.length; i < l; i++) {
    if (arr[i] === obj) return i
  }
  return -1
}


/// debug.js


const hasConsole = typeof console !== 'undefined'

/**
 * Log a message.
 *
 * @param {String} msg
 */

export var log = (msg) => {
  const _config = Config || {}
  if (hasConsole && _config.debug) {
    console.log.call(this, '[info]: ', msg)
  }
}

/**
 * We've got a problem here.
 *
 * @param {String} msg
 */

export var warn = (msg) => {
  // if (hasConsole && (!config.silent || config.debug)) {
  if (hasConsole) {
    console.warn.call(this, '[warn]: ', msg)
    /* istanbul ignore if */
    // if (config.debug) {
    //   /* jshint debug: true */
    //   debugger
    // }
  }
}

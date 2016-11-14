/**
 * Mix properties into target object.
 *
 * @param {Object} to
 * @param {Object} from
 */

function extend (target, ...src) {
  /* istanbul ignore else */
  if (typeof Object.assign === 'function') {
    Object.assign(target, ...src)
  }
  else {
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
 * Define a property.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {Boolean} [enumerable]
 */

function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Remove an item from an array
 *
 * @param {Array} arr
 * @param {*} item
 */

function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */

function bind (fn, ctx) {
  return function (a) {
    const l = arguments.length
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

function toArray (list, start) {
  start = start || 0
  let i = list.length - start
  const ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 *
 * @param {*} obj
 * @return {Boolean}
 */

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

const toString = Object.prototype.toString
const OBJECT_STRING = '[object Object]'
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

export {
  extend,
  def,
  remove,
  hasOwn,
  bind,
  toArray,
  isObject,
  isPlainObject
}

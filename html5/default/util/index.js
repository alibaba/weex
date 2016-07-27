export {
  extend,
  def,
  remove,
  hasOwn,
  bind,
  toArray,
  isObject,
  isPlainObject
} from '../../shared'

/**
 * Check if a string starts with $ or _
 *
 * @param {String} str
 * @return {Boolean}
 */

export function isReserved (str) {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}

// can we use __proto__?
export const hasProto = '__proto__' in {}

let _Set
/* istanbul ignore if */
if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
  // use native Set when available.
  _Set = Set
}
else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = function () {
    this.set = Object.create(null)
  }
  _Set.prototype.has = function (key) {
    return this.set[key] !== undefined
  }
  _Set.prototype.add = function (key) {
    this.set[key] = 1
  }
  _Set.prototype.clear = function () {
    this.set = Object.create(null)
  }
}

export { _Set }

/**
 * Create a cached version of a pure function.
 *
 * @param {Function} fn
 * @return {Function}
 */

export function cached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * Camelize a hyphen-delmited string.
 *
 * @param {String} str
 * @return {String}
 */

const camelizeRE = /-(\w)/g
export const camelize = cached(str => {
  return str.replace(camelizeRE, toUpper)
})

function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}

/**
 * Hyphenate a camelCase string.
 *
 * @param {String} str
 * @return {String}
 */

const hyphenateRE = /([a-z\d])([A-Z])/g
export const hyphenate = cached(str => {
  return str
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
})

export function typof (v) {
  const s = Object.prototype.toString.call(v)
  return s.substring(8, s.length - 1).toLowerCase()
}

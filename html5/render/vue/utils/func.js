/**
 * Mix properties into target object.
 */
export function extend (to, from) {
  if (!from) { return to }
  for (const key in from) {
    to[key] = from[key]
  }
  return to
}

/**
 * Mix specified properties into target object.
 */
export function extendKeys (to, from, keys) {
  if (!from) { return to }
  (keys || []).forEach(key => {
    to[key] = from[key]
  })
  return to
}

/**
 * Extract specified properties from src to target object.
 */
export function extractKeys (to, from, keys) {
  if (!from) { return to }
  (keys || []).forEach(key => {
    to[key] = from[key]
    delete from[key]
  })
  return to
}

/**
 * Simple bind, faster than native
 *
 * @param {Function} fn
 * @param {Object} ctx
 * @return {Function}
 */
export function bind (fn, ctx) {
  return function (a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
}

export function debounce (func, wait) {
  let timerId
  function later () {
    timerId = null
    func.apply(null)
  }
  return function () {
    clearTimeout(timerId)
    timerId = setTimeout(later, wait)
  }
}

export function throttle (func, wait, callLastTime, tag) {
  let last = 0
  let lastTimer = null
  const lastTimeDuration = wait + (wait > 25 ? wait : 25)  // plus half wait time.
  return function (...args) {
    const context = this
    const time = new Date().getTime()
    if (time - last > wait) {
      if (callLastTime) {
        lastTimer && clearTimeout(lastTimer)
        lastTimer = setTimeout(function () {
          lastTimer = null
          func.apply(context, args)
        }, lastTimeDuration)
      }
      func.apply(context, args)
      last = time
    }
  }
}

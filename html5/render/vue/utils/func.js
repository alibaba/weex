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

export function throttle (func, wait) {
  let last = 0
  return function (...args) {
    const context = this
    const time = new Date().getTime()
    if (time - last > wait) {
      func.apply(context, args)
      last = time
    }
  }
}

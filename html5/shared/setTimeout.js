/**
 * @fileOverview
 * Polyfill `setTimeout` on Android V8 using native method
 * `setTimeoutNative(callbackId, time)` and JS method
 * `setTimeoutCallback(callbackId)`.
 * This polyfill is only used in virtual-DOM diff & flush agorithm. Not
 * accessed by JS Bundle code (The timer APIs polyfill for JS Bundle is in
 * `html5/default/app/ctrl.js`).
 */

const originalSetTimeout = global.setTimeout
const setTimeoutNative = global.setTimeoutNative

/**
 * Set up native timer
 */
/* istanbul ignore next */
export function setNativeTimer () {
  if (typeof setTimeout === 'undefined' &&
  typeof setTimeoutNative === 'function') {
    const timeoutMap = {}
    let timeoutId = 0

    global.setTimeout = (cb, time) => {
      timeoutMap[++timeoutId] = cb
      setTimeoutNative(timeoutId.toString(), time)
    }

    global.setTimeoutCallback = (id) => {
      if (typeof timeoutMap[id] === 'function') {
        timeoutMap[id]()
        delete timeoutMap[id]
      }
    }
  }
}

/* istanbul ignore next */
export function resetNativeTimer () {
  global.setTimeout = originalSetTimeout
  global.setTimeoutCallback = null
}

setNativeTimer()

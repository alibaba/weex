const {
  setTimeout, setTimeoutNative
} = global

const MSG = 'Use "global.setTimeout"  is unexpected, ' +
              'please use require("@weex-module").setTimeout instead.'

// fix no setTimeout on Android V8
/* istanbul ignore if */
if (typeof setTimeout === 'undefined' &&
  typeof setTimeoutNative === 'function') {
  const timeoutMap = {}
  let timeoutId = 0
  global.setTimeout = (cb, time) => {
    console.warn(MSG)
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

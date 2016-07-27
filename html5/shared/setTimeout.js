const {
  setTimeout,
  setTimeoutNative
} = global

// fix no setTimeout on Android V8
/* istanbul ignore if */
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

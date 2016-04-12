const {console} = global

if (typeof console === 'undefined') {
  global.console = {
    log: (...args) => {
      if (typeof nativeLog === 'function') {
        nativeLog(...args)
      }
    },
    error: (...args) => {
      throw new Error(args)
    }
  }
}
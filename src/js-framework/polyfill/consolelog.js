const {console} = global
let logLevel

const LEVEL_MAP = {
  __ERROR: 'error',
  __WARN: 'warn',
  __INFO: 'info',
  __DEBUG: 'debug',
  __VERBOSE: 'verbose'
}

const LEVELS = ['error', 'warn', 'info', 'debug', 'verbose', 'all']

function normalize (v) {
  var type = Object.prototype.toString.call(v)
  if (type.toLowerCase() === '[object object]') {
    v = JSON.stringify(v)
  } else {
    v = String(v)
  }
  return v
}

export function printlog(...args) {
  const {WXEnvironment, nativeLog} = global

  logLevel = (WXEnvironment &&
                WXEnvironment.logLevel) ||
                'info'

  if (typeof nativeLog === 'function') {
    let level = args.pop()
    if (LEVELS.indexOf(LEVEL_MAP[level]) <=
          LEVELS.indexOf(logLevel)) {
      nativeLog(...args.map(v => normalize(v)), level)
    }
  }
}

/* istanbul ignore if */
if (typeof console === 'undefined' ||
    // in jscore, it has `console` object without any keys.
    Object.keys(console).length === 0) {
  global.console = {
    log: (...args) => { // __VERBOSE
      printlog(...args, '__VERBOSE')
    },
    debug: (...args) => { // __DEBUG
      printlog(...args, '__DEBUG')
    },
    info: (...args) => { // __INFO
      printlog(...args, '__INFO')
    },
    warn: (...args) => { // __WARN
      printlog(...args, '__WARN')
    },
    error: (...args) => { // __ERROR
      printlog(...args, '__ERROR')
    }
  }
}
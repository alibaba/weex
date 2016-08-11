/**
 * @fileOverview
 * This file will hack `console` methods by `WXEnvironment.logLevel`.
 * So we can control how many and which messages will be sent by change the log level.
 * Additionally in native platform the message content must be primitive values and
 * using `nativeLog(...args, logLevelMark)` so we create a new `console` object in
 * global add a format process for its methods.
 */

const { console, nativeLog } = global
const LEVELS = ['off', 'error', 'warn', 'info', 'log', 'debug']
const levelMap = {}

generateLevelMap()

/* istanbul ignore if */
if (
  typeof console === 'undefined' || // Android
  (global.WXEnvironment && global.WXEnvironment.platform === 'iOS') // iOS
) {
  global.console = {
    debug: (...args) => {
      if (checkLevel('debug')) { nativeLog(...format(args), '__DEBUG') }
    },
    log: (...args) => {
      if (checkLevel('log')) { nativeLog(...format(args), '__LOG') }
    },
    info: (...args) => {
      if (checkLevel('info')) { nativeLog(...format(args), '__INFO') }
    },
    warn: (...args) => {
      if (checkLevel('warn')) { nativeLog(...format(args), '__WARN') }
    },
    error: (...args) => {
      if (checkLevel('error')) { nativeLog(...format(args), '__ERROR') }
    }
  }
}
else { // HTML5
  const { debug, log, info, warn, error } = console
  console.__ori__ = { debug, log, info, warn, error }
  console.debug = (...args) => {
    if (checkLevel('debug')) { console.__ori__.debug.apply(console, args) }
  }
  console.log = (...args) => {
    if (checkLevel('log')) { console.__ori__.log.apply(console, args) }
  }
  console.info = (...args) => {
    if (checkLevel('info')) { console.__ori__.info.apply(console, args) }
  }
  console.warn = (...args) => {
    if (checkLevel('warn')) { console.__ori__.warn.apply(console, args) }
  }
  console.error = (...args) => {
    if (checkLevel('error')) { console.__ori__.error.apply(console, args) }
  }
}

/**
 * Generate map for which types of message will be sent in a certain message level
 * as the order of LEVELS.
 */
function generateLevelMap () {
  LEVELS.forEach(level => {
    const levelIndex = LEVELS.indexOf(level)
    levelMap[level] = {}
    LEVELS.forEach(type => {
      const typeIndex = LEVELS.indexOf(type)
      if (typeIndex <= levelIndex) {
        levelMap[level][type] = true
      }
    })
  })
}

/**
 * Check if a certain type of message will be sent in current log level of env.
 * @param  {string} type
 * @return {boolean}
 */
function checkLevel (type) {
  const logLevel = (global.WXEnvironment && global.WXEnvironment.logLevel) || 'log'
  return levelMap[logLevel] && levelMap[logLevel][type]
}

/**
 * Convert all log arguments into primitive values.
 * @param  {array} args
 * @return {array}
 */
function format (args) {
  return args.map((v) => {
    const type = Object.prototype.toString.call(v)
    if (type.toLowerCase() === '[object object]') {
      v = JSON.stringify(v)
    }
    else {
      v = String(v)
    }
    return v
  })
}

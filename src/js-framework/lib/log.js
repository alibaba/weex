import * as config from './config'

export default function log(...args) {
  if (config.debug) {
    global.console.log(...args)
  }
}

global.log = log
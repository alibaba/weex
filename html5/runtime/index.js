/**
 * @fileOverview
 * Register framework(s) in JS runtime. Weex supply two layers for 3rd-party
 * framework(s): one is the instance management layer, another is the
 * virtual-DOM layer.
 */

import * as shared from '../shared'

import init from './init'
import config from './config'

import {
  register,
  unregister,
  has
} from './service'

/* istanbul ignore next */
function freezePrototype () {
  shared.freezePrototype()

  Object.freeze(config.Element)
  Object.freeze(config.Comment)
  Object.freeze(config.Listener)
  Object.freeze(config.Document.prototype)
  Object.freeze(config.Element.prototype)
  Object.freeze(config.Comment.prototype)
  Object.freeze(config.Listener.prototype)
}

export default {
  setNativeConsole: shared.setNativeConsole,
  resetNativeConsole: shared.resetNativeConsole,
  setNativeTimer: shared.setNativeTimer,
  resetNativeTimer: shared.resetNativeTimer,
  service: { register, unregister, has },
  freezePrototype,
  init,
  config
}

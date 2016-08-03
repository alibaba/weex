'use strict'

const navigator = {

  // config
  //  - url: the url to push
  //  - animated: this configuration item is native only
  //  callback is not currently supported
  push: function (config, callbackId) {
    window.location.href = config.url
    this.sender.performCallback(callbackId)
  },

  // config
  //  - animated: this configuration item is native only
  //  callback is note currently supported
  pop: function (config, callbackId) {
    window.history.back()
    this.sender.performCallback(callbackId)
  }

}

const meta = {
  navigator: [{
    name: 'push',
    args: ['object', 'function']
  }, {
    name: 'pop',
    args: ['object', 'function']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('navigator', navigator, meta)
  }
}

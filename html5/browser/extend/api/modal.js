'use strict'

const modal = require('modals')

const msg = {

  // duration: default is 0.8 seconds.
  toast: function (config) {
    modal.toast(config.message, config.duration)
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - callback
  alert: function (config, callbackId) {
    const sender = this.sender
    config.callback = function () {
      sender.performCallback(callbackId)
    }
    modal.alert(config)
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - cancelTitle: title of cancel button
  //  - callback
  confirm: function (config, callbackId) {
    const sender = this.sender
    config.callback = function (val) {
      sender.performCallback(callbackId, val)
    }
    modal.confirm(config)
  },

  // config:
  //  - message: string
  //  - okTitle: title of ok button
  //  - cancelTitle: title of cancel button
  //  - callback
  prompt: function (config, callbackId) {
    const sender = this.sender
    config.callback = function (val) {
      sender.performCallback(callbackId, val)
    }
    modal.prompt(config)
  }

}

msg._meta = {
  modal: [{
    name: 'toast',
    args: ['object']
  }, {
    name: 'alert',
    args: ['object', 'string']
  }, {
    name: 'confirm',
    args: ['object', 'string']
  }, {
    name: 'prompt',
    args: ['object', 'string']
  }]
}

module.exports = msg

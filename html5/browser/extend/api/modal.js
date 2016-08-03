'use strict'

import modal from 'modals'

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

const meta = {
  modal: [{
    name: 'toast',
    args: ['object']
  }, {
    name: 'alert',
    args: ['object', 'function']
  }, {
    name: 'confirm',
    args: ['object', 'function']
  }, {
    name: 'prompt',
    args: ['object', 'function']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('modal', msg, meta)
  }
}

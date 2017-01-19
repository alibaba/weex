/* global WebSocket */
'use strict'

let instance
let callback = { }

const webSocketIns = {

  WebSocket: function (url, protocol) {
    if (instance) {
      instance.close()
      instance = undefined
      callback = { }
    }
    if (protocol === '') {
      protocol = undefined
    }
    const self = this
    instance = new WebSocket(url, protocol)
    instance.onopen = function (e) {
      if (callback.onopen) {
        self.sender.performCallback(callback.onopen, { type: e.type }, true)
      }
    }

    instance.onmessage = function (e) {
      if (callback.onmessage) {
        self.sender.performCallback(callback.onmessage, { origin: e.origin, data: e.data, source: e.data }, true)
      }
    }

    instance.onerror = function (e) {
      if (callback.onerror) {
        self.sender.performCallback(callback.onerror, { code: e.code, data: e.data })
      }
    }

    instance.onclose = function (e) {
      if (callback.onclose) {
        self.sender.performCallback(callback.onclose, { data: e.data, code: e.code, reason: e.reason })
      }
    }
  },

  close: function (code, signal) {
    if (instance) {
      instance.close(code, signal)
      instance = undefined
      callback = { }
    }
  },

  send: function (data) {
    if (instance) {
      instance.send(data)
    }
  },

  onopen: function (func) {
    if (instance) {
      callback.onopen = func
    }
  },

  onerror: function (func) {
    if (instance) {
      callback.onerror = func
    }
  },

  onmessage: function (func) {
    if (instance) {
      callback.onmessage = func
    }
  },

  onclose: function (func) {
    if (instance) {
      callback.onclose = func
    }
  }
}

const meta = {
  webSocket: [{
    name: 'WebSocket',
    args: ['string', 'string']
  }, {
    name: 'close',
    args: ['numble', 'string']
  }, {
    name: 'send',
    args: ['string']
  }, {
    name: 'onopen',
    args: ['function']
  }, {
    name: 'onmessage',
    args: ['function']
  }, {
    name: 'onclose',
    args: ['function']
  }, {
    name: 'onerror',
    args: ['function']
  }]
}

export default {
  init: function (Weex) {
    Weex.registerApiModule('webSocket', webSocketIns, meta)
  }
}

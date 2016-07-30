'use strict'

const utils = require('../utils')

const _senderMap = {}

function Sender (instance) {
  if (!(this instanceof Sender)) {
    return new Sender(instance)
  }
  this.instanceId = instance.instanceId
  this.weexInstance = instance
  _senderMap[this.instanceId] = this
}

function _send (instanceId, msg) {
  callJS(instanceId, [msg])
}

Sender.getSender = function (instanceId) {
  return _senderMap[instanceId]
}

Sender.prototype = {

  // perform a callback to jsframework.
  performCallback: function (callbackId, data, keepAlive) {
    const args = [callbackId]
    data && args.push(data)
    keepAlive && args.push(keepAlive)
    _send(this.instanceId, {
      method: 'callback',
      args: args
    })
  },

  fireEvent: function (ref, type, func, event) {
    func.extra && utils.extend(event, func.extra())
    _send(this.instanceId, {
      method: 'fireEvent',
      args: [ref, type, event, func.updator && func.updator()]
    })
  }

}

module.exports = Sender

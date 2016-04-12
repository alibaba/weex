'use strict'

var utils = require('../utils')

var _senderMap = {}

function Sender(instance) {
  if (!(this instanceof Sender)) {
    return new Sender(instance)
  }
  this.instanceId = instance.instanceId
  this.weexInstance = instance
  _senderMap[this.instanceId] = this
}

function _send(instanceId, msg) {
  callJS(instanceId, [msg])
}

Sender.getSender = function (instanceId) {
  return _senderMap[instanceId]
}

Sender.prototype = {

  // perform a callback to jsframework.
  performCallback: function (callbackId, data) {
    var args = [callbackId]
    data && args.push(data)
    _send(this.instanceId, {
      method: 'callback',
      args: args
    })
  },

  fireEvent: function (ref, type, event) {
    // Note that the event.target must be the standard event's
    // currentTarget. Therefor a process for replacing target must
    // be done when a event is fired.
    var evt = utils.extend({}, event)
    evt.target = evt.currentTarget
    evt.value = event.target.value
    evt.timeStamp = Date.now()
    _send(this.instanceId, {
      method: 'fireEvent',
      args: [ref, type, evt]
    })
  }

}

module.exports = Sender
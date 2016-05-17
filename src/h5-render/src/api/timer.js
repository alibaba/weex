'use strict'

var timer = {

  setTimeout: function (timeoutCallbackId, delay) {
    var sender = this.sender
    var timerId = setTimeout(function () {
      sender.performCallback(timeoutCallbackId)
    }, delay)
  },

  clearTimeout: function (timerId) {
    clearTimeout(timerId)
  }

}

timer._meta = {
  timer: [{
    name: 'setTimeout',
    args: ['function', 'number']
  }, {
    name: 'clearTimeout',
    args: ['number']
  }]
}

module.exports = timer

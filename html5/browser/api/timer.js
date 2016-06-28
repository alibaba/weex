'use strict'

const timer = {

  setTimeout: function (timeoutCallbackId, delay) {
    const sender = this.sender
    const timerId = setTimeout(function () {
      sender.performCallback(timeoutCallbackId)
    }, delay)
    return timerId
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

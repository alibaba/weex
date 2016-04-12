'use strict'

// require('httpurl')

// var jsonpCnt = 0

// function _sendJsonp(config, callbackId) {
//   var cbName = '_callback_' + (++jsonpCnt)
//   var script, url, head
//   global[cbName] = (function (cb) {
//     return function (response) {
//       this.sender.performCallback(callbackId, response)
//       delete global[cb]
//     }
//   })(cbName)
//   script = document.createElement('script')
//   url = lib.httpurl(config.url)
//   url.params.callback = cbName
//   script.type = 'text/javascript'
//   script.src = url.toString()
//   // script.onerror is not working on IE or safari.
//   // but they are not considered here.
//   script.onerror = (function (cb) {
//     return function (err) {
//       this.sender.performCallback(callbackId, err)
//       delete global[cb]
//     }
//   })(cbName)
//   head = document.getElementsByTagName('head')[0]
//   head.insertBefore(script, null)
// }

var stream = {

  /**
   * sendHttp
   * @param  {obj} params
   *  - method: 'GET' | 'POST',
   *  - url: url requested
   * @param  {string} callbackId
   */
  sendHttp: function (param, callbackId) {
    if (typeof param === 'string') {
      try {
        param = JSON.parse(param)
      } catch (e) {
        return
      }
    }
    if (typeof param !== 'object' || !param.url) {
      return
    }

    // Not to use jsonp to send http request since it requires the server
    // to support jsonp callback at the first place.
    // _sendJsonp.call(this, param, callbackId)

    var self = this
    var method = param.method || 'GET'
    var xhr = new XMLHttpRequest()
    xhr.open(method, param.url, true)
    xhr.onload = function () {
      self.sender.performCallback(callbackId, this.responseText)
    }
    xhr.onerror = function (error) {
      self.sender.performCallback(callbackId, error)
    }
    xhr.send()
  }

}

stream._meta = {
  stream: [{
    name: 'sendHttp',
    args: ['object', 'string']
  }]
}

module.exports = stream
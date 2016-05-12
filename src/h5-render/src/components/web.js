'use strict'

var Atomic = require('./atomic')
var utils = require('../utils')

// A component to import web pages, which works like
// a iframe element or a webview.
// attrs:
//   - src
// events:
//   - pagestart
//   - pagefinish
//   - error
function Web (data) {
  Atomic.call(this, data)
}

Web.prototype = Object.create(Atomic.prototype)

Web.prototype.create = function () {
  var node = document.createElement('iframe')
  node.classList.add('weex-element')
  return node
}

Web.prototype.goBack = function () {
  this.node.contentWindow.history.back()
}

Web.prototype.goForward = function () {
  this.node.contentWindow.history.forward()
}

Web.prototype.reload = function () {
  this.node.contentWindow.location.reload()
}

Web.prototype.attr = {
  src: function (val) {
    this.node.src = val
    setTimeout(function () {
      this.dispatchEvent('pagestart', { url: val })
    }.bind(this), 0)
  }
}

Web.prototype.bindEvents = function (evts) {
  Atomic.prototype.bindEvents.call(this, evts)
  var evtsMap = {
    'pagefinish': 'load'
  }
  var that = this
  this.node.addEventListener('load', function (e) {
    that.dispatchEvent('pagefinish', utils.extend({
      url: that.node.src
    }))
  })
}

module.exports = Web

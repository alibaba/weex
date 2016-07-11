'use strict'

const Atomic = require('./atomic')
const utils = require('../utils')
const logger = require('../logger')

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
  // Iframe's defect: can't use position:absolute and top, left, right,
  // bottom all setting to zero and use margin to leave specified
  // height for a blank area, and have to use 100% to fill the parent
  // container, otherwise it will use a unwanted default size instead.
  // Therefore a div as a iframe wrapper is needed here.
  const node = document.createElement('div')
  node.classList.add('weex-container')
  this.web = document.createElement('iframe')
  node.appendChild(this.web)
  this.web.classList.add('weex-element')
  this.web.style.width = '100%'
  this.web.style.height = '100%'
  this.web.style.border = 'none'
  return node
}

Web.prototype.bindEvents = function (evts) {
  Atomic.prototype.bindEvents.call(this, evts)
  const that = this
  this.web.addEventListener('load', function (e) {
    that.dispatchEvent('pagefinish', utils.extend({
      url: that.web.src
    }))
  })
  window.addEventListener('message', this.msgHandler.bind(this))
}

Web.prototype.msgHandler = function (evt) {
  let msg = evt.data
  if (typeof msg === 'string') {
    try {
      msg = JSON.parse(msg)
    }
    catch (e) {}
  }
  if (!msg) {
    return
  }
  if (msg.type === 'weex') {
    if (!utils.isArray(msg.content)) {
      return logger.error('weex msg received by web component. msg.content'
        + ' should be a array:', msg.content)
    }
    callNative(this.getComponentManager().instanceId, msg.content)
  }
}

Web.prototype.attr = {
  src: function (val) {
    this.web.src = val
    setTimeout(function () {
      this.dispatchEvent('pagestart', { url: val })
    }.bind(this), 0)
  }
}

Web.prototype.goBack = function () {
  this.web.contentWindow.history.back()
}

Web.prototype.goForward = function () {
  this.web.contentWindow.history.forward()
}

Web.prototype.reload = function () {
  this.web.contentWindow.location.reload()
}

module.exports = Web

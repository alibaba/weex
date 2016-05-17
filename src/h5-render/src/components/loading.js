'use strict'

var Component = require('./component')

require('../styles/loading.css')

var parents = ['scroller', 'list']

var DEFAULT_HEIGHT = 130

var ua = window.navigator.userAgent
var Firefox = !!ua.match(/Firefox/i)
var IEMobile = !!ua.match(/IEMobile/i)
var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-'

function Loading (data) {
  Component.call(this, data)
}

Loading.prototype = Object.create(Component.prototype)

Loading.prototype.create = function () {
  var node = document.createElement('div')
  node.classList.add('weex-container', 'weex-loading')
  return node
}

Loading.prototype.onAppend = function () {
  var parent = this.getParent()
  var self = this
  var scrollWrapHeight = parent.node.getBoundingClientRect().height
  if (parents.indexOf(parent.data.type) === -1) {
    return
  }
  parent.scroller.addEventListener('pullup', function (e) {
    var obj = e.scrollObj
    self.adjustHeight(Math.abs(
      obj.getScrollHeight() - obj.getScrollTop() - scrollWrapHeight))
    if (!self.display) {
      self.show()
    }
  })
  parent.scroller.addEventListener('pullupend', function (e) {
    self.handleLoading(e)
  })
}

Loading.prototype.adjustHeight = function (val) {
  this.node.style.height = val + 'px'
  this.node.style.bottom = -val + 'px'
}

Loading.prototype.handleLoading = function (e) {
  var parent = this.getParent()
  var scrollElement = parent.scrollElement || parent.listElement
  var offset = scrollElement.getBoundingClientRect().height
            - parent.node.getBoundingClientRect().height
            + DEFAULT_HEIGHT
  this.node.style.height = DEFAULT_HEIGHT + 'px'
  this.node.style.bottom = -DEFAULT_HEIGHT + 'px'
  var translateStr = 'translate3d(0px,-' + offset + 'px,0px)'
  scrollElement.style[cssPrefix + 'transform']
    = cssPrefix + translateStr
  scrollElement.style.transform = translateStr
  this.dispatchEvent('loading')
}

Loading.prototype.show = function () {
  this.display = true
  this.node.style.display = '-webkit-box'
  this.node.style.display = '-webkit-flex'
  this.node.style.display = 'flex'
}

Loading.prototype.hide = function () {
  this.display = false
  var parent = this.getParent()
  var scrollElement = parent.scrollElement || parent.listElement
  var scrollElementHeight = scrollElement.getBoundingClientRect().height
  var scrollWrapHeight = parent.node.getBoundingClientRect().height
  var left = scrollElementHeight
    - parent.scroller.getScrollTop()
    - scrollWrapHeight
  if (left < 0) {
    var offset = scrollElementHeight
            - parent.node.getBoundingClientRect().height
    var translateStr = 'translate3d(0px,-' + offset + 'px,0px)'
    scrollElement.style[cssPrefix + 'transform']
      = cssPrefix + translateStr
    scrollElement.style.transform = translateStr
  }
  this.node.style.display = 'none'
}

Loading.prototype.attr = {
  display: function (val) {
    if (val === true || val === 'true') {
      setTimeout(function () {
        this.show()
      }.bind(this), 0)
    } else {
      setTimeout(function () {
        this.hide()
      }.bind(this), 0)
    }
  }
}

module.exports = Loading

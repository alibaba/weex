'use strict'

var Component = require('./component')

require('../styles/refresh.css')

var parents = ['scroller', 'list']

// Only if pulldown offset is larger than this value can this
// component trigger the 'refresh' event, otherwise just recover
// to the start point.
var CLAMP = 130

var ua = window.navigator.userAgent
var Firefox = !!ua.match(/Firefox/i)
var IEMobile = !!ua.match(/IEMobile/i)
var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-'

function Refresh (data) {
  Component.call(this, data)
}

Refresh.prototype = Object.create(Component.prototype)

Refresh.prototype.create = function () {
  var node = document.createElement('div')
  node.classList.add('weex-container', 'weex-refresh')
  return node
}

Refresh.prototype.onAppend = function () {
  var parent = this.getParent()
  var self = this
  if (parents.indexOf(parent.data.type) === -1) {
    return
  }
  parent.scroller.addEventListener('pulldown', function (e) {
    self.adjustHeight(Math.abs(e.scrollObj.getScrollTop()))
    if (!this.display) {
      self.show()
    }
  })
  parent.scroller.addEventListener('pulldownend', function (e) {
    var top = Math.abs(e.scrollObj.getScrollTop())
    if (top > CLAMP) {
      self.handleRefresh(e)
    }
  })
}

Refresh.prototype.adjustHeight = function (val) {
  this.node.style.height = val + 'px'
  this.node.style.top = -val + 'px'
}

Refresh.prototype.handleRefresh = function (e) {
  var scrollObj = e.scrollObj
  var parent = this.getParent()
  var scrollElement = parent.scrollElement || parent.listElement
  this.node.style.height = CLAMP + 'px'
  this.node.style.top = -CLAMP + 'px'
  var translateStr = 'translate3d(0px,' + CLAMP + 'px,0px)'
  scrollElement.style[cssPrefix + 'transform']
    = cssPrefix + translateStr
  scrollElement.style.transform = translateStr
  this.dispatchEvent('refresh')
}

Refresh.prototype.show = function () {
  this.display = true
  this.node.style.display = '-webkit-box'
  this.node.style.display = '-webkit-flex'
  this.node.style.display = 'flex'
}

Refresh.prototype.hide = function () {
  this.display = false
  var parent = this.getParent()
  var scrollElement = parent.scrollElement || parent.listElement
  var translateStr = 'translate3d(0px,0px,0px)'
  scrollElement.style[cssPrefix + 'transform']
    = cssPrefix + translateStr
  scrollElement.style.transform = translateStr
  this.node.style.display = 'none'
}

Refresh.prototype.attr = {
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

module.exports = Refresh

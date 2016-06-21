'use strict'

var Component = require('./component')
var logger = require('../logger')

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
  this.isRefreshing = false
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
    if (self.isRefreshing) {
      return self.adJustPosition(Math.abs(e.scrollObj.getScrollTop()))
    }
    self.adjustHeight(Math.abs(e.scrollObj.getScrollTop()))
    if (!self.display) {
      self.show()
    }
  })
  parent.scroller.addEventListener('pulldownend', function (e) {
    if (self.isRefreshing) {
      return self.adJustPosition(0)
    }
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

Refresh.prototype.adJustPosition = function (val) {
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
  this.isRefreshing = true
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
  if (parent) {
    var scrollElement = parent.scrollElement || parent.listElement
    var translateStr = 'translate3d(0px,0px,0px)'
    scrollElement.style[cssPrefix + 'transform']
      = cssPrefix + translateStr
    scrollElement.style.transform = translateStr
  }
  this.node.style.display = 'none'
  this.isRefreshing = false
}

Refresh.prototype.attr = {
  display: function (val) {
    if (val === 'show') {
      setTimeout(function () {
        this.show()
      }.bind(this), 0)
    } else if (val === 'hide') {
      setTimeout(function () {
        this.hide()
      }.bind(this), 0)
    } else {
      logger.error('attr \'display\' of <refresh>\': value '
        + val
        + ' is invalid. Should be \'show\' or \'hide\'')
    }
  }
}

module.exports = Refresh

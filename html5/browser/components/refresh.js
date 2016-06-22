'use strict'

const Component = require('./component')

require('../styles/refresh.css')

const parents = ['scroller', 'list']

// Only if pulldown offset is larger than this value can this
// component trigger the 'refresh' event, otherwise just recover
// to the start point.
const CLAMP = 130

const ua = window.navigator.userAgent
const Firefox = !!ua.match(/Firefox/i)
const IEMobile = !!ua.match(/IEMobile/i)
const cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-'

function Refresh (data) {
  Component.call(this, data)
}

Refresh.prototype = Object.create(Component.prototype)

Refresh.prototype.create = function () {
  const node = document.createElement('div')
  node.classList.add('weex-container', 'weex-refresh')
  return node
}

Refresh.prototype.onAppend = function () {
  const parent = this.getParent()
  const self = this
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
    const top = Math.abs(e.scrollObj.getScrollTop())
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
  const parent = this.getParent()
  const scrollElement = parent.scrollElement || parent.listElement
  this.node.style.height = CLAMP + 'px'
  this.node.style.top = -CLAMP + 'px'
  const translateStr = 'translate3d(0px,' + CLAMP + 'px,0px)'
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
  const parent = this.getParent()
  if (parent) {
    const scrollElement = parent.scrollElement || parent.listElement
    const translateStr = 'translate3d(0px,0px,0px)'
    scrollElement.style[cssPrefix + 'transform']
      = cssPrefix + translateStr
    scrollElement.style.transform = translateStr
  }
  this.node.style.display = 'none'
}

Refresh.prototype.attr = {
  display: function (val) {
    if (val === 'show') {
      setTimeout(function () {
        this.show()
      }.bind(this), 0)
    }
    else if (val === 'hide') {
      setTimeout(function () {
        this.hide()
      }.bind(this), 0)
    }
    else {
      // TODO
      console.error('h5render:attribute value of refresh \'display\' '
          + val
          + ' is invalid. Should be \'show\' or \'hide\'')
    }
  }
}

module.exports = Refresh

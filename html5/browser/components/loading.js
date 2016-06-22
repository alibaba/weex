'use strict'

const Component = require('./component')

require('../styles/loading.css')

const parents = ['scroller', 'list']

const DEFAULT_HEIGHT = 130

const ua = window.navigator.userAgent
const Firefox = !!ua.match(/Firefox/i)
const IEMobile = !!ua.match(/IEMobile/i)
const cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-'

function Loading (data) {
  Component.call(this, data)
}

Loading.prototype = Object.create(Component.prototype)

Loading.prototype.create = function () {
  const node = document.createElement('div')
  node.classList.add('weex-container', 'weex-loading')
  return node
}

Loading.prototype.onAppend = function () {
  const parent = this.getParent()
  const self = this
  const scrollWrapHeight = parent.node.getBoundingClientRect().height
  if (parents.indexOf(parent.data.type) === -1) {
    return
  }
  parent.scroller.addEventListener('pullup', function (e) {
    const obj = e.scrollObj
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
  const parent = this.getParent()
  const scrollElement = parent.scrollElement || parent.listElement
  const offset = scrollElement.getBoundingClientRect().height
            - parent.node.getBoundingClientRect().height
            + DEFAULT_HEIGHT
  this.node.style.height = DEFAULT_HEIGHT + 'px'
  this.node.style.bottom = -DEFAULT_HEIGHT + 'px'
  const translateStr = 'translate3d(0px,-' + offset + 'px,0px)'
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
  const parent = this.getParent()
  if (parent) {
    const scrollElement = parent.scrollElement || parent.listElement
    const scrollElementHeight = scrollElement.getBoundingClientRect().height
    const scrollWrapHeight = parent.node.getBoundingClientRect().height
    const left = scrollElementHeight
      - parent.scroller.getScrollTop()
      - scrollWrapHeight
    if (left < 0) {
      const offset = scrollElementHeight
              - parent.node.getBoundingClientRect().height
      const translateStr = 'translate3d(0px,-' + offset + 'px,0px)'
      scrollElement.style[cssPrefix + 'transform']
        = cssPrefix + translateStr
      scrollElement.style.transform = translateStr
    }
  }
  this.node.style.display = 'none'
}

Loading.prototype.attr = {
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

module.exports = Loading

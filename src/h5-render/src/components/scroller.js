'use strict'

require('../styles/scroller.css')
require('scrolljs')

// lib.scroll events:
//  - scrollstart
//  - scrolling
//  - pulldownend
//  - pullupend
//  - pullleftend
//  - pullrightend
//  - pulldown
//  - pullup
//  - pullleft
//  - pullright
//  - contentrefresh

var Component = require('./component')
var utils = require('../utils')

var FLEX_DIRECTION = {
  horizontal: 'row',
  vertical: 'column'
}

// attrs:
//  - scroll-direciton: none|vertical|horizontal (default is vertical)
//  - show-scrollbar: true|false (default is true)
function Scroller (data, nodeType) {
  var attrs = data.attr || {}
  this.items = []
  this.totalWidth = 0
  this.scrollDirection = attrs.scrollDirection === 'horizontal'
                          ? 'horizontal'
                          : 'vertical'
  this.showScrollbar = attrs.showScrollbar || true
  Component.call(this, data, nodeType)
}

Scroller.prototype = Object.create(Component.prototype)

Scroller.prototype.create = function (nodeType) {
  var Scroll = lib.scroll
  var node = Component.prototype.create.call(this, nodeType)
  node.classList.add('weex-container', 'scroll-wrap')

  this.scrollElement = document.createElement('div')
  this.scrollElement.classList.add(
    'weex-container',
    'scroll-element',
    this.scrollDirection
  )

  // Flex will cause a bug to rescale children's size if their total
  // size exceed the limit of their parent. So to use box instead.
  this.scrollElement.style.display = '-webkit-box'
  this.scrollElement.style.display = 'box'

  node.appendChild(this.scrollElement)
  this.scroller = new Scroll({
    scrollElement: this.scrollElement,
    direction: this.scrollDirection === 'vertical' ? 'y' : 'x'
  })
  this.scroller.init()
  return node
}

Scroller.prototype.bindEvents = function (evts) {
  Component.prototype.bindEvents.call(this, evts)
  // to enable lazyload for Images
  this.scroller.addEventListener('scrolling', function (e) {
    var so = e.scrollObj
    this.dispatchEvent('scroll', {
      originalType: 'scrolling',
      scrollTop: so.getScrollTop(),
      scrollLeft: so.getScrollLeft()
    }, {
      bubbles: true
    })
  }.bind(this))
}

Scroller.prototype.appendChild = function (data) {
  var children = this.data.children
  var componentManager = this.getComponentManager()
  var child = componentManager.createElement(data)
  this.scrollElement.appendChild(child.node)

  var childWidth = child.node.getBoundingClientRect().width
  this.totalWidth += childWidth
  // if direction is horizontal then the width of scrollElement
  // should be set manually due to flexbox's rule (child elements
  // will not exceed box's width but to shrink to adapt).
  if (this.scrollDirection === 'horizontal') {
    this.scrollElement.style.width = this.totalWidth + 'px'
  }

  // update this.data.children
  if (!children || !children.length) {
    this.data.children = [data]
  } else {
    children.push(data)
  }

  this.items.push(child)
  return child
}

Scroller.prototype.insertBefore = function (child, before) {
  var children = this.data.children
  var i = 0
  var isAppend = false

  // update this.data.children
  if (!children || !children.length || !before) {
    isAppend = true
  } else {
    for (var l = children.length; i < l; i++) {
      if (children[i].ref === child.data.ref) {
        break
      }
    }
    if (i === l) {
      isAppend = true
    }
  }

  if (isAppend) {
    this.scrollElement.appendChild(child.node)
    children.push(child.data)
    this.items.push(child)
  } else {
    this.scrollElement.insertBefore(child.node, before.node)
    children.splice(i, 0, child.data)
    this.items.splice(i, 0, child)
  }
}

Scroller.prototype.removeChild = function (child) {
  var children = this.data.children
  // remove from this.data.children
  var i = 0
  var componentManager = this.getComponentManager()
  if (children && children.length) {
    for (var l = children.length; i < l; i++) {
      if (children[i].ref === child.data.ref) {
        break
      }
    }
    if (i < l) {
      children.splice(i, 1)
      this.items.splice(i, 1)
    }
  }
  // remove from componentMap recursively
  componentManager.removeElementByRef(child.data.ref)
  this.scrollElement.removeChild(child.node)
}

module.exports = Scroller

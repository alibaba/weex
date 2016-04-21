'use strict'

require('../styles/list.scss')
require('scrolljs')

var Component = require('./component')
var LazyLoad = require('../lazyLoad')

var DEFAULT_LOAD_MORE_OFFSET = 500

function List(data, nodeType) {
  // this.loadmoreOffset = Number(data.attr.loadmoreoffset)
  // this.isAvailableToFireloadmore = true
  Component.call(this, data, nodeType)
}

List.prototype = Object.create(Component.prototype)

List.prototype.create = function (nodeType) {
  var Scroll = lib.scroll
  var node = Component.prototype.create.call(this, nodeType)
  node.classList.add('weex-container', 'list-wrap')
  this.listElement = document.createElement('div')
  this.listElement.classList.add(
    'weex-container'
    , 'list-element'
  )
  node.appendChild(this.listElement)
  this.scroller = new Scroll({
    scrollElement: this.listElement
    , direction: 'y'
  })
  this.scroller.init()
  return node
}

List.prototype.bindEvents = function (evts) {
  Component.prototype.bindEvents.call(this, evts)
  // to enable lazyload for Images.
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

  this.scroller.addEventListener('pullupend', function (e) {
    this.dispatchEvent('loadmore')
  }.bind(this))
}

List.prototype.appendChild = function (data) {
  var children = this.data.children
  var componentManager = this.getComponentManager()
  var child = componentManager.createElement(data)
  this.listElement.appendChild(child.node)

  // update this.data.children
  if (!children || !children.length) {
    this.data.children = [data]
  } else {
    children.push(data)
  }

  return child
}

List.prototype.insertBefore = function (child, before) {
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
    this.listElement.appendChild(child.node)
    children.push(child.data)
  } else {
    this.listElement.insertBefore(child.node, before.node)
    children.splice(i, 0, child.data)
  }
}

List.prototype.removeChild = function (child) {
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
    }
  }
  // remove from componentMap recursively
  componentManager.removeElementByRef(child.data.ref)
  this.listElement.removeChild(child.node)
}

module.exports = List

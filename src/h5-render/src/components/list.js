'use strict'

require('../styles/list.css')
require('../scroll')

var Component = require('./component')
var LazyLoad = require('../lazyLoad')

var DEFAULT_LOAD_MORE_OFFSET = 500

var directionMap = {
  h: ['row', 'horizontal', 'h', 'x'],
  v: ['column', 'vertical', 'v', 'y']
}

// direction: 'v' or 'h', default is 'v'
function List(data, nodeType) {
  // this.loadmoreOffset = Number(data.attr.loadmoreoffset)
  // this.isAvailableToFireloadmore = true
  this.direction = directionMap.h.indexOf(data.attr.direction) === -1
    ? 'v'
    : 'h'
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
    , this.direction + '-list'
  )

  // Flex will cause a bug to rescale children's size if their total
  // size exceed the limit of their parent. So to use box instead.
  this.listElement.style.display = '-webkit-box'
  this.listElement.style.display = 'box'
  this.listElement.style.webkitBoxOrient = this.direction === 'h'
    ? 'horizontal'
    : 'vertical'
  this.listElement.style.boxOrient = this.listElement.style.webkitBoxOrient

  node.appendChild(this.listElement)
  this.scroller = new Scroll({
    scrollElement: this.listElement
    , direction: this.direction === 'h' ? 'x' : 'y'
  })
  this.scroller.init()
  this.offset = 0
  return node
}

List.prototype.bindEvents = function (evts) {
  Component.prototype.bindEvents.call(this, evts)
  // to enable lazyload for Images.
  this.scroller.addEventListener('scrolling', function (e) {
    var so = e.scrollObj
    var scrollTop = so.getScrollTop()
    var scrollLeft = so.getScrollLeft()
    var offset = this.direction === 'v' ? scrollTop : scrollLeft
    var diff = offset - this.offset
    var dir
    if (diff >= 0) {
      dir = this.direction === 'v' ? 'up' : 'left'
    } else {
      dir = this.direction === 'v' ? 'down' : 'right'
    }
    this.dispatchEvent('scroll', {
      originalType: 'scrolling',
      scrollTop: so.getScrollTop(),
      scrollLeft: so.getScrollLeft(),
      offset: offset,
      direction: dir
    }, {
      bubbles: true
    })
    this.offset = offset
  }.bind(this))

  var pullendEvent = 'pull' + ({ v: 'up', h: 'left' })[this.direction] + 'end'
  this.scroller.addEventListener(pullendEvent, function (e) {
    this.dispatchEvent('loadmore')
  }.bind(this))
}

List.prototype.createChildren = function () {
  var children = this.data.children
  var parentRef = this.data.ref
  var componentManager = this.getComponentManager()
  if (children && children.length) {
    var fragment = document.createDocumentFragment()
    var isFlex = false
    for (var i = 0; i < children.length; i++) {
      children[i].instanceId = this.data.instanceId
      children[i].scale = this.data.scale
      var child = componentManager.createElement(children[i])
      fragment.appendChild(child.node)
      child.parentRef = parentRef
      if (!isFlex
          && child.data.style
          && child.data.style.hasOwnProperty('flex')
        ) {
        isFlex = true
      }
    }
    this.listElement.appendChild(fragment)
  }
  // wait for fragment to appended on listElement on UI thread.
  setTimeout(function () {
    this.scroller.refresh()
  }.bind(this), 0)
}

List.prototype.appendChild = function (data) {
  var children = this.data.children
  var componentManager = this.getComponentManager()
  var child = componentManager.createElement(data)
  this.listElement.appendChild(child.node)

  // wait for UI thread to update.
  setTimeout(function () {
    this.scroller.refresh()
  }.bind(this), 0)

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
      if (children[i].ref === before.data.ref) {
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
    if (before.fixedPlaceholder) {
      this.listElement.insertBefore(child.node, before.fixedPlaceholder)
    } else {
      this.listElement.insertBefore(child.node, before.node)
    }
    children.splice(i, 0, child.data)
  }

  // wait for UI thread to update.
  setTimeout(function () {
    this.scroller.refresh()
  }.bind(this), 0)
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
  if (child.fixedPlaceholder) {
    this.listElement.removeChild(child.fixedPlaceholder)
  }
  child.node.parentNode.removeChild(child.node)

  // wait for UI thread to update.
  setTimeout(function () {
    this.scroller.refresh()
  }.bind(this), 0)
}

module.exports = List

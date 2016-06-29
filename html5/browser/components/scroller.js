/* global lib */

'use strict'

require('../styles/scroller.css')
require('../scroll')

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

const Component = require('./component')
// const utils = require('../utils')

const directionMap = {
  h: ['row', 'horizontal', 'h', 'x'],
  v: ['column', 'vertical', 'v', 'y']
}

const DEFAULT_DIRECTION = 'column'

// attrs:
//  - scroll-direciton: none|vertical|horizontal (default is vertical)
//  - show-scrollbar: true|false (default is true)
function Scroller (data, nodeType) {
  const attrs = data.attr || {}
  const direction = attrs.scrollDirection
    || attrs.direction
    || DEFAULT_DIRECTION
  this.direction = directionMap.h.indexOf(direction) === -1
    ? 'v'
    : 'h'
  this.showScrollbar = attrs.showScrollbar || true
  Component.call(this, data, nodeType)
}

Scroller.prototype = Object.create(Component.prototype)

Scroller.prototype.create = function (nodeType) {
  const Scroll = lib.scroll
  const node = Component.prototype.create.call(this, nodeType)
  node.classList.add('weex-container', 'scroll-wrap')
  this.scrollElement = document.createElement('div')
  this.scrollElement.classList.add(
    'weex-container',
    'scroll-element',
    this.direction + '-scroller'
  )

  this.scrollElement.style.webkitBoxOrient = directionMap[this.direction][1]
  this.scrollElement.style.webkitFlexDirection = directionMap[this.direction][0]
  this.scrollElement.style.flexDirection = directionMap[this.direction][0]

  node.appendChild(this.scrollElement)
  this.scroller = new Scroll({
    // if the direction is x, then the bounding rect of the scroll element
    // should be got by the 'Range' API other than the 'getBoundingClientRect'
    // API, because the width outside the viewport won't be count in by
    // 'getBoundingClientRect'.
    // Otherwise should use the element rect in case there is a child scroller
    // or list in this scroller. If using 'Range', the whole scroll element
    // including the hiding part will be count in the rect.
    useElementRect: this.direction === 'v',
    scrollElement: this.scrollElement,
    direction: this.direction === 'h' ? 'x' : 'y'
  })
  this.scroller.init()
  this.offset = 0
  return node
}

Scroller.prototype.bindEvents = function (evts) {
  Component.prototype.bindEvents.call(this, evts)
  // to enable lazyload for Images
  this.scroller.addEventListener('scrolling', function (e) {
    const so = e.scrollObj
    const scrollTop = so.getScrollTop()
    const scrollLeft = so.getScrollLeft()
    const offset = this.direction === 'v' ? scrollTop : scrollLeft
    const diff = offset - this.offset
    let dir
    if (diff >= 0) {
      dir = this.direction === 'v' ? 'up' : 'left'
    }
    else {
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

  const pullendEvent = 'pull'
    + ({ v: 'up', h: 'left' })[this.direction]
    + 'end'
  this.scroller.addEventListener(pullendEvent, function (e) {
    this.dispatchEvent('loadmore')
  }.bind(this))
}

Scroller.prototype.createChildren = function () {
  const children = this.data.children
  const parentRef = this.data.ref
  const componentManager = this.getComponentManager()
  if (children && children.length) {
    const fragment = document.createDocumentFragment()
    let isFlex = false
    for (let i = 0; i < children.length; i++) {
      children[i].instanceId = this.data.instanceId
      children[i].scale = this.data.scale
      const child = componentManager.createElement(children[i])
      fragment.appendChild(child.node)
      child.parentRef = parentRef
      if (!isFlex
          && child.data.style
          && child.data.style.hasOwnProperty('flex')
        ) {
        isFlex = true
      }
    }
    this.scrollElement.appendChild(fragment)
  }
  // wait for fragment to appended on scrollElement on UI thread.
  setTimeout(function () {
    this.scroller.refresh()
  }.bind(this), 0)
}

Scroller.prototype.appendChild = function (data) {
  const children = this.data.children
  const componentManager = this.getComponentManager()
  const child = componentManager.createElement(data)
  this.scrollElement.appendChild(child.node)

  // wait for UI thread to update.
  setTimeout(function () {
    this.scroller.refresh()
  }.bind(this), 0)

  // update this.data.children
  if (!children || !children.length) {
    this.data.children = [data]
  }
  else {
    children.push(data)
  }

  return child
}

Scroller.prototype.insertBefore = function (child, before) {
  const children = this.data.children
  let i = 0
  let isAppend = false

  // update this.data.children
  if (!children || !children.length || !before) {
    isAppend = true
  }
  else {
    let l
    for (l = children.length; i < l; i++) {
      if (children[i].ref === before.data.ref) {
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
  }
  else {
    const refreshLoadingPlaceholder = before.refreshPlaceholder
      || before.loadingPlaceholder
    if (refreshLoadingPlaceholder) {
      this.scrollElement.insertBefore(child.node, refreshLoadingPlaceholder)
    }
    else if (before.fixedPlaceholder) {
      this.scrollElement.insertBefore(child.node, before.fixedPlaceholder)
    }
    else {
      this.scrollElement.insertBefore(child.node, before.node)
    }
    children.splice(i, 0, child.data)
  }

  // wait for UI thread to update.
  setTimeout(function () {
    this.scroller.refresh()
  }.bind(this), 0)
}

Scroller.prototype.removeChild = function (child) {
  const children = this.data.children
  // remove from this.data.children
  let i = 0
  const componentManager = this.getComponentManager()
  if (children && children.length) {
    let l
    for (l = children.length; i < l; i++) {
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
  const refreshLoadingPlaceholder = child.refreshPlaceholder
    || child.loadingPlaceholder
  if (refreshLoadingPlaceholder) {
    this.scrollElement.removeChild(refreshLoadingPlaceholder)
  }
  if (child.fixedPlaceholder) {
    this.scrollElement.removeChild(child.fixedPlaceholder)
  }
  child.node.parentNode.removeChild(child.node)

  // wait for UI thread to update.
  setTimeout(function () {
    this.scroller.refresh()
  }.bind(this), 0)
}

Scroller.prototype.onAppend = function () {
  this._refreshWhenDomRenderend()
}

Scroller.prototype.onRemove = function () {
  this._removeEvents()
}

Scroller.prototype._refreshWhenDomRenderend = function () {
  const self = this
  if (!this.renderendHandler) {
    this.renderendHandler = function () {
      self.scroller.refresh()
    }
  }
  window.addEventListener('renderend', this.renderendHandler)
}

Scroller.prototype._removeEvents = function () {
  if (this.renderendHandler) {
    window.removeEventListener('renderend', this.renderendHandler)
  }
}

module.exports = Scroller

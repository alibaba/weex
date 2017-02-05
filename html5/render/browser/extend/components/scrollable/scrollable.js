/* global lib */

'use strict'

import './scrollable.css'
import './scroll'

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

const directionMap = {
  h: ['row', 'horizontal', 'h', 'x'],
  v: ['column', 'vertical', 'v', 'y']
}

const DEFAULT_DIRECTION = 'column'
const DEFAULT_LOAD_MORE_OFFSET = 0

function refreshWhenDomRenderend (comp) {
  if (!comp.renderendHandler) {
    comp.renderendHandler = function () {
      comp.scroller.refresh()
    }
  }
  window.addEventListener('renderend', comp.renderendHandler)
}

function removeEvents (comp) {
  if (comp.renderendHandler) {
    window.removeEventListener('renderend', comp.renderendHandler)
  }
}

function getProto (Weex) {
  const Component = Weex.Component

  function create (nodeType) {
    const Scroll = lib.scroll
    const node = Component.prototype.create.call(this, nodeType)
    node.classList.add('weex-container')
    node.classList.add('scrollable-wrap')
    this.scrollElement = document.createElement('div')
    this.scrollElement.classList.add('weex-container')
    this.scrollElement.classList.add('scrollable-element')
    this.scrollElement.classList.add('dir-' + this.direction)

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

  function createChildren () {
    const children = this.data.children
    const parentRef = this.data.ref
    const componentManager = this.getComponentManager()
    if (children && children.length) {
      const fragment = document.createDocumentFragment()
      let isFlex = false
      for (let i = 0; i < children.length; i++) {
        children[i].instanceId = this.data.instanceId
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

  function appendChild (data) {
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

  function insertBefore (child, before) {
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
      else if (before.stickyPlaceholder) {
        this.scrollElement.insertBefore(child.node, before.stickyPlaceholder)
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

  function removeChild (child) {
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
    componentManager.removeComponent(child.data.ref)
    const refreshLoadingPlaceholder = child.refreshPlaceholder
      || child.loadingPlaceholder
    child.unsetPosition()
    if (refreshLoadingPlaceholder) {
      this.scrollElement.removeChild(refreshLoadingPlaceholder)
    }
    child.node.parentNode.removeChild(child.node)

    // wait for UI thread to update.
    setTimeout(function () {
      this.scroller.refresh()
    }.bind(this), 0)
  }

  function bindEvents (evts) {
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

      // fire loadmore event.
      const leftDist = Math.abs(so.maxScrollOffset) - this.offset
      if (leftDist <= this.loadmoreoffset && this.isAvailableToFireloadmore) {
        this.isAvailableToFireloadmore = false
        this.dispatchEvent('loadmore')
      }
      else if (leftDist > this.loadmoreoffset && !this.isAvailableToFireloadmore) {
        this.isAvailableToFireloadmore = true
      }
    }.bind(this))
  }

  function onAppend () {
    refreshWhenDomRenderend(this)
  }

  function onRemove () {
    removeEvents(this)
  }

  return {
    create,
    createChildren,
    appendChild,
    insertBefore,
    removeChild,
    bindEvents,
    onAppend,
    onRemove
  }
}

const attr = {
  loadmoreoffset: function (val) {
    val = parseFloat(val)
    if (val < 0 || isNaN(val)) {
      console.warn('[h5-render] invalida')
      return
    }
    this.loadmoreoffset = val
  }
}

function init (Weex) {
  const Component = Weex.Component
  const extend = Weex.utils.extend

  // attrs:
  //  - loadmoreoffset: updatable
  //  - scroll-direciton: none|vertical|horizontal (default is vertical)
  //  - show-scrollbar: true|false (default is true)
  function Scrollable (data, nodeType) {
    this.loadmoreoffset = DEFAULT_LOAD_MORE_OFFSET
    this.isAvailableToFireloadmore = true
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
  Scrollable.prototype = Object.create(Component.prototype)
  extend(Scrollable.prototype, getProto(Weex))
  extend(Scrollable.prototype, { attr })
  return Scrollable
}

export default { init }

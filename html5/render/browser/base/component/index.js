'use strict'

import { extend } from '../../utils'
import { ComponentManager } from '../../dom'
import * as operate from './operate'
import * as position from './position'
import flexbox from './flexbox'
import { makeImageLazy, fireLazyload } from './lazyload'

function hasIntersection (rect, ctRect) {
  return (rect.left < ctRect.right && rect.right > ctRect.left)
    && (rect.top < ctRect.bottom && rect.bottom > ctRect.top)
}

export default function Component (data, nodeType) {
  this.data = data
  this.node = this.create(nodeType)
  this.createChildren()
  this.updateAttrs(this.data.attr || {})
  // issue: when add element to a list in lifetime hook 'ready', the
  // styles is set to the classStyle, not style. This is a issue
  // that jsframework should do something about.
  const classStyle = this.data.classStyle
  classStyle && this.updateStyle(this.data.classStyle)
  this.updateStyle(this.data.style || {})
  this.bindEvents(this.data.event || [])
}

Component.prototype = {

  getComponentManager () {
    return ComponentManager.getInstance(this.data.instanceId)
  },

  getWeexInstance () {
    return this.getComponentManager().getWeexInstance()
  },

  getParent () {
    return this.getComponentManager().componentMap[this.parentRef]
  },

  getParentScroller () {
    if (this.isInScrollable()) {
      return this._parentScroller
    }
    return null
  },

  getRootScroller () {
    if (this.isInScrollable()) {
      let scroller = this._parentScroller
      let parent = scroller._parentScroller
      while (parent) {
        scroller = parent
        parent = scroller._parentScroller
      }
      return scroller
    }
    return null
  },

  getRootContainer () {
    const root = this.getWeexInstance().getRoot()
      || document.body
    return root
  },

  isScrollable () {
    const t = this.data.type
    return ComponentManager.getScrollableTypes().indexOf(t) !== -1
  },

  isInScrollable () {
    if (typeof this._isInScrollable === 'boolean') {
      return this._isInScrollable
    }
    const parent = this.getParent()
    if (parent
        && (typeof parent._isInScrollable !== 'boolean')
        && !parent.isScrollable()) {
      if (parent.data.ref === '_root') {
        this._isInScrollable = false
        return false
      }
      this._isInScrollable = parent.isInScrollable()
      this._parentScroller = parent._parentScroller
      return this._isInScrollable
    }
    if (parent && typeof parent._isInScrollable === 'boolean') {
      this._isInScrollable = parent._isInScrollable
      this._parentScroller = parent._parentScroller
      return this._isInScrollable
    }
    if (parent && parent.isScrollable()) {
      this._isInScrollable = true
      this._parentScroller = parent
      return true
    }
  },

  // dispatch a specified event on this.node
  //  - type: event type
  //  - data: event data
  //  - config: event config object
  //     - bubbles
  //     - cancelable
  dispatchEvent (type, data, config) {
    const event = document.createEvent('HTMLEvents')
    config = config || {}
    event.initEvent(type, config.bubbles || false, config.cancelable || false)
    !data && (data = {})
    event.data = extend({}, data)
    extend(event, data)
    this.node.dispatchEvent(event)
  },

  onAppend: function () {
    const evts = this.data.event
    if (!evts || !evts.length) { return }
    let flag = false
    for (let i = 0, l = evts.length; i < l; i++) {
      if (evts[i] === 'appear') {
        flag = true
        break
      }
    }
    if (!flag) {
      return
    }
    // trigger 'appear' event in the next tick.
    setTimeout(() => {
      const rect = this.node.getBoundingClientRect()
      const parent = this.getParentScroller()
      const parentNode = parent
        ? parent.node
        : this.getRootContainer()
      const ctRect = parentNode.getBoundingClientRect()
      if (hasIntersection(rect, ctRect)) {
        this.dispatchEvent('appear', { direction: '' })
      }
    }, 0)
  },

  addAppendHandler (cb) {
    let pre
    if (this.onAppend) {
      pre = this.onAppend.bind(this)
    }
    this.onAppend = function () {
      pre && pre.call(this)
      cb && cb.call(this)
    }.bind(this)
  },

  // change src to img-src for lib.img to fire lazyload later.
  enableLazyload (src) {
    if (this.node) {
      makeImageLazy(this.node, src)
    }
    else {
      console.error('[h5-render] this.node does not exist.')
    }
  },

  // target can be both weex component and dom element.
  fireLazyload (target) {
    !target && (target = this)
    fireLazyload(target)
  },

  attr: {}, // attr setters

  style: {}, // style setters

  // event funcs
  //  - 1. 'updator' for updating attrs or styles with out triggering messages.
  //  - 2. 'extra' for binding extra data.
  //  - 3. 'setter' set a specified event handler.
  // funcs should be functions like this: (take 'change' event as a example)
  // {
  //   change: {
  //     updator () {
  //       return {
  //         attrs: {
  //           checked: this.checked
  //         }
  //       }
  //     },
  //     extra () {
  //       return {
  //         value: this.checked
  //       }
  //     }
  //   }
  // }
  event: {},

  clearAttr () {
  },

  clearStyle () {
    this.node.cssText = ''
  }
}

// extend operations.
extend(Component.prototype, operate)

// extend attr and style setters from 'position' and 'flexbox'.
extend(Component.prototype, position)
extend(Component.prototype.style, flexbox.style)

'use strict'

// const config = require('../config')
const utils = require('../utils')
const logger = require('../logger')
const ComponentManager = require('./componentManager')
const flexbox = require('./flexbox')
const valueFilter = require('./valueFilter')
import Sticky from '../sticky'

export default function Component (data, nodeType) {
  this.data = data
  this.node = this.create(nodeType)

  this.createChildren()
  this.updateAttrs(this.data.attr)
  // issue: when add element to a list in lifetime hook 'ready', the
  // styles is set to the classStyle, not style. This is a issue
  // that jsframework should do something about.
  const classStyle = this.data.classStyle
  classStyle && this.updateStyle(this.data.classStyle)
  this.updateStyle(this.data.style)
  this.bindEvents(this.data.event)
}

Component.prototype = {

  create (nodeType) {
    const node = document.createElement(nodeType || 'div')
    return node
  },

  getComponentManager () {
    return ComponentManager.getInstance(this.data.instanceId)
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
    const root = this.getComponentManager().weexInstance.getRoot()
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
    if (!parent) {
      console && logger.warn('isInScrollable - parent not exist.')
      return
    }
  },

  createChildren () {
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
      this.node.appendChild(fragment)
    }
  },

  // @todo: changed param data to child
  appendChild (data) {
    const children = this.data.children
    const componentManager = this.getComponentManager()
    const child = componentManager.createElement(data)
    this.node.appendChild(child.node)
    // update this.data.children
    if (!children || !children.length) {
      this.data.children = [data]
    }
    else {
      children.push(data)
    }

    return child
  },

  insertBefore (child, before) {
    const children = this.data.children
    let i = 0
    let l
    let isAppend = false

    // update this.data.children
    if (!children || !children.length || !before) {
      isAppend = true
    }
    else {
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
      this.node.appendChild(child.node)
      children.push(child.data)
    }
    else {
      if (before.fixedPlaceholder) {
        this.node.insertBefore(child.node, before.fixedPlaceholder)
      }
      else if (before.stickyPlaceholder) {
        this.node.insertBefore(child.node, before.stickyPlaceholder)
      }
      else {
        this.node.insertBefore(child.node, before.node)
      }
      children.splice(i, 0, child.data)
    }
  },

  removeChild (child) {
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
    child.unsetPosition()
    child.node.parentNode.removeChild(child.node)
  },

  updateAttrs (attrs) {
    // Note：attr must be injected into the dom element because
    // it will be accessed from the outside developer by event.target.attr.
    if (!this.node.attr) {
      this.node.attr = {}
    }
    for (const key in attrs) {
      const value = attrs[key]
      const attrSetter = this.attr[key]
      if (typeof attrSetter === 'function') {
        attrSetter.call(this, value)
      }
      else {
        if (typeof value === 'boolean') {
          this.node[key] = value
        }
        else {
          this.node.setAttribute(key, value)
        }
        this.node.attr[key] = value
      }
    }
  },

  updateStyle (style) {
    for (const key in style) {
      let value = style[key]
      const styleSetter = this.style[key]
      if (typeof styleSetter === 'function') {
        styleSetter.call(this, value)
        continue
      }
      const parser = valueFilter.getFilters(key,
          { scale: this.data.scale })[typeof value]
      if (typeof parser === 'function') {
        value = parser(value)
      }
      this.node.style[key] = value
    }
  },

  bindEvents (evts) {
    const componentManager = this.getComponentManager()
    if (evts && utils.isArray(evts)) {
      for (let i = 0, l = evts.length; i < l; i++) {
        const evt = evts[i]
        const func = this.event[evt] || {}
        const setter = func.setter
        if (setter) {
          this.node.addEventListener(evt, setter)
          continue
        }
        componentManager.addEvent(this, evt, func && {
          extra: func.extra && func.extra.bind(this),
          updator: func.updator && func.updator.bind(this)
        })
      }
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
    event.data = utils.extend({}, data)
    utils.extend(event, data)
    this.node.dispatchEvent(event)
  },

  updateRecursiveAttr (data) {
    this.updateAttrs(data.attr)
    const componentManager = this.getComponentManager()
    const children = this.data.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = componentManager.getElementByRef(children[i].ref)
        if (child) {
          child.updateRecursiveAttr(data.children[i])
        }
      }
    }
  },

  updateRecursiveStyle (data) {
    this.updateStyle(data.style)
    const componentManager = this.getComponentManager()
    const children = this.data.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = componentManager.getElementByRef(children[i].ref)
        if (child) {
          child.updateRecursiveStyle(data.children[i])
        }
      }
    }
  },

  updateRecursiveAll (data) {
    this.updateAttrs(data.attr)
    this.updateStyle(data.style)
    const componentManager = this.getComponentManager()

    // const oldRef = this.data.ref
    // if (componentMap[oldRef]) {
    //   delete componentMap[oldRef]
    // }
    // this.data.ref = data.ref
    // componentMap[data.ref] = this

    const children = this.data.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = componentManager.getElementByRef(children[i].ref)
        if (child) {
          child.updateRecursiveAll(data.children[i])
        }
      }
    }
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

  // Set positon to fixed, with a placeholder if it's in a
  // scrollable component.
  setFixed () {
    // delay processing in case the node is not appended yet.
    setTimeout(function () {
      this.node.style.position = 'fixed'
      if (!this.isInScrollable()) {
        return
      }
      const parent = this.node.parentNode
      if (parent) {
        this.fixedPlaceholder = document.createElement('div')
        this.fixedPlaceholder.classList.add('weex-fixed-placeholder')
        this.fixedPlaceholder.style.cssText = [
          'display:none;',
          'width:0px;',
          'height:0px;'
        ].join('')
        parent.insertBefore(this.fixedPlaceholder, this.node)
        this.getRootContainer().appendChild(this.node)
      }
    }.bind(this), 0)
  },

  // unset a fixed node to the pecified 'position' or 'relative' by default.
  unsetFixed (position) {
    position = position ? position + '' : 'relative'
    if (this.fixedPlaceholder) {
      const parent = this.fixedPlaceholder.parentNode
      parent.insertBefore(this.node, this.fixedPlaceholder)
      parent.removeChild(this.fixedPlaceholder)
      this.fixedPlaceholder = null
      this.node.style.position = position
    }
  },

  setSticky () {
    this.node.style.zIndex = 100
    setTimeout(function () {
      this.sticky = new Sticky(this)
    }.bind(this), 0)
  },

  unsetSticky () {
    if (this.sticky) {
      this.sticky.destroy()
      this.sticky = null
    }
  },

  // usally used to unset sticky and fixed.
  unsetPosition (position) {
    this.style.position.call(this, position)
  },

  attr: {}, // attr setters

  style: Object.create(flexbox), // style setters

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

Component.prototype.style.position = function (value) {
  // For the elements who are fixed elements before, now
  // are not fixed: the fixedPlaceholder has to be replaced
  // by this element.
  // This is a peace of hacking to fix the problem about
  // mixing fixed and transform. See 'http://stackoverflo
  // w.com/questions/15194313/webkit-css-transform3d-posi
  // tion-fixed-issue' for more info
  value !== 'fixed' && this.unsetFixed()
  value !== 'sticky' && this.unsetSticky()
  if (value === 'fixed') {
    // For the elements who are fixed: this fixedPlaceholder
    // shoud be inserted, and the fixed element itself should
    // be placed out in root container.
    return this.setFixed()
  }
  if (value === 'sticky') {
    return this.setSticky()
  }
  this.node.style.position = value
}

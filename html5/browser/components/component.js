/* global lib */

'use strict'

// const config = require('../config')
const utils = require('../utils')
const ComponentManager = require('../componentManager')
const flexbox = require('../flexbox')
const valueFilter = require('../valueFilter')
require('fixedsticky')

function Component (data, nodeType) {
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

  create: function (nodeType) {
    const node = document.createElement(nodeType || 'div')
    return node
  },

  getComponentManager: function () {
    return ComponentManager.getInstance(this.data.instanceId)
  },

  getParent: function () {
    return this.getComponentManager().componentMap[this.parentRef]
  },

  getParentScroller: function () {
    if (this.isInScrollable()) {
      return this._parentScroller
    }
    return null
  },

  getRootScroller: function () {
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

  getRootContainer: function () {
    const root = this.getComponentManager().weexInstance.getRoot()
      || document.body
    return root
  },

  isScrollable: function () {
    const t = this.data.type
    return ComponentManager.getScrollableTypes().indexOf(t) !== -1
  },

  isInScrollable: function () {
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
      console && console.error('isInScrollable - parent not exist.')
      return
    }
  },

  createChildren: function () {
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
  appendChild: function (data) {
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

  insertBefore: function (child, before) {
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
      else {
        this.node.insertBefore(child.node, before.node)
      }
      children.splice(i, 0, child.data)
    }
  },

  removeChild: function (child) {
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
    if (child.fixedPlaceholder) {
      this.node.removeChild(child.fixedPlaceholder)
    }
    child.node.parentNode.removeChild(child.node)
  },

  updateAttrs: function (attrs) {
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

  updateStyle: function (style) {
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

  bindEvents: function (evts) {
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
  dispatchEvent: function (type, data, config) {
    const event = document.createEvent('HTMLEvents')
    config = config || {}
    event.initEvent(type, config.bubbles || false, config.cancelable || false)
    !data && (data = {})
    event.data = utils.extend({}, data)
    utils.extend(event, data)
    this.node.dispatchEvent(event)
  },

  updateRecursiveAttr: function (data) {
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

  updateRecursiveStyle: function (data) {
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

  updateRecursiveAll: function (data) {
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

  clearAttr: function () {
  },

  clearStyle: function () {
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
  // tion-fixed-issue' for more info.
  if (value !== 'fixed') {
    if (this.fixedPlaceholder) {
      const parent = this.fixedPlaceholder.parentNode
      parent.insertBefore(this.node, this.fixedPlaceholder)
      parent.removeChild(this.fixedPlaceholder)
      this.fixedPlaceholder = null
    }
  }
  else { // value === 'fixed'
    // For the elements who are fixed: this fixedPlaceholder
    // shoud be inserted, and the fixed element itself should
    // be placed out in root container.
    this.node.style.position = 'fixed'
    let parent = this.node.parentNode
    const replaceWithFixedPlaceholder = function () {
      this.fixedPlaceholder = document.createElement('div')
      this.fixedPlaceholder.classList.add('weex-fixed-placeholder')
      this.fixedPlaceholder.style.display = 'none'
      this.fixedPlaceholder.style.width = '0px'
      this.fixedPlaceholder.style.height = '0px'
      parent.insertBefore(this.fixedPlaceholder, this.node)
      this.getRootContainer().appendChild(this.node)
    }.bind(this)
    if (!parent) {
      let pre
      if (this.onAppend) {
        pre = this.onAppend.bind(this)
      }
      this.onAppend = function () {
        parent = this.node.parentNode
        replaceWithFixedPlaceholder()
        pre && pre()
      }.bind(this)
    }
    else {
      replaceWithFixedPlaceholder()
    }
    return
  }

  if (value === 'sticky') {
    this.node.style.zIndex = 100
    setTimeout(function () {
      const Sticky = lib.sticky
      this.sticky = new Sticky(this.node, {
        top: 0
      })
    }.bind(this), 0)
  }
  else {
    this.node.style.position = value
  }
}

module.exports = Component

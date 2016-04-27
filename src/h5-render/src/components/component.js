'use strict'

var config = require('../config')
var utils = require('../utils')
var ComponentManager = require('../componentManager')
var flexbox = require('../flexbox')
require('fixedsticky')

function Component(data, nodeType) {
  this.data = data
  this.node = this.create(nodeType)

  this.createChildren()
  this.updateAttrs(this.data.attr)
  // issue: when add element to a list in lifetime hook 'ready', the
  // styles is set to the classStyle, not style. This is a issue
  // that jsframework should do something about.
  var classStyle = this.data.classStyle
  classStyle && this.updateStyle(this.data.classStyle)
  this.updateStyle(this.data.style)
  this.bindEvents(this.data.event)
}

Component.prototype = {

  create: function (nodeType) {
    var node = document.createElement(nodeType || 'div')
    return node
  },

  getComponentManager: function () {
    return ComponentManager.getInstance(this.data.instanceId)
  },

  getParent: function () {
    return this.getComponentManager().componentMap[this.parentRef]
  },

  isScrollable: function () {
    var t = this.data.type
    return ComponentManager.getScrollableTypes().indexOf(t) !== -1
  },

  isInScrollable: function () {
    if (typeof this._isInScrollable === 'boolean') {
      return this._isInScrollable
    }
    var parent = this.getParent()
    if (parent
        && (typeof parent._isInScrollable !== 'boolean')
        && !parent.isScrollable()) {
      if (parent.data.type === 'root') {
        this._isInScrollable = false
        return false
      }
      this._isInScrollable = parent.isInScrollable()
      this._parentScroller = parent._parentScroller
      return this._isInScrollable
    }
    if (typeof parent._isInScrollable === 'boolean') {
      this._isInScrollable = parent._isInScrollable
      this._parentScroller = parent._parentScroller
      return this._isInScrollable
    }
    if (parent.isScrollable()) {
      this._isInScrollable = true
      this._parentScroller = parent
      return true
    }
    if (!parent) {
      console && console.error('isInScrollable - parent not exist.')
    }
  },

  createChildren: function () {
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
      this.node.appendChild(fragment)
    }
  },

  // @todo: changed param data to child
  appendChild: function (data) {
    var children = this.data.children
    var componentManager = this.getComponentManager()
    var child = componentManager.createElement(data)
    this.node.appendChild(child.node)
    // update this.data.children
    if (!children || !children.length) {
      this.data.children = [data]
    } else {
      children.push(data)
    }

    return child
  },

  insertBefore: function (child, before) {
    var children = this.data.children
    var i = 0
    var l
    var isAppend = false

    // update this.data.children
    if (!children || !children.length || !before) {
      isAppend = true
    } else {
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
    } else {
      this.node.insertBefore(child.node, before.node)
      children.splice(i, 0, child.data)
    }

  },

  removeChild: function (child) {
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
    this.node.removeChild(child.node)
  },

  updateAttrs: function (attrs) {
    // Note：attr must be injected into the dom element because
    // it will be accessed from the outside developer by event.target.attr.
    if (!this.node.attr) {
      this.node.attr = {}
    }
    for (var key in attrs) {
      var value = attrs[key]
      var attrSetter = this.attr[key]
      if (typeof attrSetter === 'function') {
        attrSetter.call(this, value)
      } else {
        if (typeof value === 'boolean') {
          this.node[key] = value
        } else {
          this.node.setAttribute(key, value)
        }
        this.node.attr[key] = value
      }
    }
  },

  updateStyle: function (style) {
    for (var key in style) {
      var value = style[key]
      var styleSetter = this.style[key]

      if (typeof styleSetter === 'function') {
        styleSetter.call(this, value)
      } else {
        if (typeof value === 'number'
            && (key !== 'flex' && key !== 'opacity' && key !== 'zIndex')
          ) {
          value = value * this.data.scale + 'px'
        }
        this.node.style[key] = value
      }
    }
  },

  bindEvents: function (evts) {
    var componentManager = this.getComponentManager()
    if (evts
        && Object.prototype.toString.call(evts).slice(8, -1) === 'Array'
      ) {
      for (var i = 0, l = evts.length; i < l; i++) {
        componentManager.addEvent(this, evts[i])
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
    var event = document.createEvent('HTMLEvents')
    config = config || {}
    event.initEvent(type, config.bubbles || false, config.cancelable || false)
    !data && (data = {})
    event.data = utils.extend({}, data)
    utils.extend(event, data)
    this.node.dispatchEvent(event)
  },

  updateRecursiveAttr: function (data) {
    this.updateAttrs(data.attr)
    var componentManager = this.getComponentManager()
    var children = this.data.children
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var child = componentManager.getElementByRef(children[i].ref)
        if (child) {
          child.updateRecursiveAttr(data.children[i])
        }
      }
    }
  },

  updateRecursiveStyle: function (data) {
    this.updateStyle(data.style)
    var componentManager = this.getComponentManager()
    var children = this.data.children
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var child = componentManager.getElementByRef(children[i].ref)
        if (child) {
          child.updateRecursiveStyle(data.children[i])
        }
      }
    }
  },

  updateRecursiveAll: function (data) {
    this.updateAttrs(data.attr)
    this.updateStyle(data.style)
    var componentManager = this.getComponentManager()

    // var oldRef = this.data.ref
    // if (componentMap[oldRef]) {
    //   delete componentMap[oldRef]
    // }
    // this.data.ref = data.ref
    // componentMap[data.ref] = this

    var children = this.data.children
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var child = componentManager.getElementByRef(children[i].ref)
        if (child) {
          child.updateRecursiveAll(data.children[i])
        }
      }
    }
  },

  attr: {}, // attr setters

  style: Object.create(flexbox), // style setters

  clearAttr: function () {
  },

  clearStyle: function () {
    this.node.cssText = ''
  }
}

Component.prototype.style.position = function (value) {
  // TODO: make it in a decent implementation
  if (value === 'sticky') {
    this.node.style.zIndex = 100
    setTimeout(function () {
      this.sticky = new lib.sticky(this.node, {
        top: 0
      })
    }.bind(this), 0)
  } else {
    this.node.style.position = value
  }
}

module.exports = Component

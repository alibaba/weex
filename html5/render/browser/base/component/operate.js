'use strict'

import { extend } from '../../utils'
import { getFilters } from './valueFilter'

export function create (nodeType) {
  return document.createElement(nodeType || 'div')
}

export function createChildren () {
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
}

export function appendChild (data) {
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
}

export function insertBefore (child, before) {
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
}

export function removeChild (child) {
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
  child.unsetPosition()
  child.node.parentNode.removeChild(child.node)
}

export function updateAttrs (attrs) {
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
}

export function updateStyle (style) {
  for (const key in style) {
    let value = style[key]
    const styleSetter = this.style[key]
    if (typeof styleSetter === 'function') {
      styleSetter.call(this, value)
      continue
    }
    const parser = getFilters(key,
      { scale: this.data.scale })[typeof value]
    if (typeof parser === 'function') {
      value = parser(value)
    }
    this.node.style[key] = value
  }
}

export function bindEvents (evts) {
  const self = this
  const weexInstance = this.getWeexInstance()
  evts.map(function (evt) {
    const func = self.event[evt] || {}
    const setter = func.setter
    if (setter) {
      self.node.addEventListener(evt, setter)
      return
    }
    const sender = weexInstance.sender
    const listener = function (e) {
      // do stop bubbling.
      // do not prevent default, otherwise the touchstart
      // event will no longer trigger a click event
      if (e._alreadyTriggered) {
        return
      }
      e._alreadyTriggered = true
      const event = extend({}, e)
      event.target = self.data
      sender.fireEvent(self.data.ref, evt, {
        extra: func.extra && func.extra.bind(self),
        updator: func.updator && func.updator.bind(self)
      }, event)
    }
    self.node.addEventListener(evt, listener, false, false)
    let listeners = self._listeners
    if (!listeners) {
      listeners = self._listeners = {}
      self.node._listeners = {}
    }
    listeners[evt] = listener
    self.node._listeners[evt] = listener
  })
}

export function unbindEvents (evts) {
  const self = this
  evts.map(function (evt) {
    const listener = this._listeners
    if (listener) {
      self.node.removeEventListener(evt, listener)
      self._listeners[evt] = null
      self.node._listeners[evt] = null
    }
  })
}

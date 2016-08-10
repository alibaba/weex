/* global Event */

'use strict'

const FrameUpdater = require('./frameUpdater')
const AppearWatcher = require('./appearWatcher')
const utils = require('./utils')
const LazyLoad = require('./lazyLoad')
const animation = require('./animation')

const RENDERING_INDENT = 800

const _instanceMap = {}
const typeMap = {}
const scrollableTypes = [
  'scroller',
  'hscroller',
  'vscroller',
  'list',
  'hlist',
  'vlist'
]

function ComponentManager (instance) {
  this.instanceId = instance.instanceId
  this.weexInstance = instance
  this.componentMap = {}
  _instanceMap[this.instanceId] = this
}

ComponentManager.getInstance = function (instanceId) {
  return _instanceMap[instanceId]
}

ComponentManager.getWeexInstance = function (instanceId) {
  return _instanceMap[instanceId].weexInstance
}

ComponentManager.registerComponent = function (type, definition) {
  typeMap[type] = definition
}

ComponentManager.getScrollableTypes = function () {
  return scrollableTypes
}

ComponentManager.prototype = {

  // Fire a event 'renderbegin'/'renderend' on body element.
  rendering: function () {
    function _renderingEnd () {
      // get weex instance root
      window.dispatchEvent(new Event('renderend'))
      this._renderingTimer = null
    }
    if (this._renderingTimer) {
      clearTimeout(this._renderingTimer)
      this._renderingTimer = setTimeout(
        _renderingEnd.bind(this),
        RENDERING_INDENT
      )
    }
    else {
      window.dispatchEvent(new Event('renderbegin'))
      this._renderingTimer = setTimeout(
        _renderingEnd.bind(this),
        RENDERING_INDENT
      )
    }
  },

  getElementByRef: function (ref) {
    return this.componentMap[ref]
  },

  removeElementByRef: function (ref) {
    const self = this
    if (!ref || !this.componentMap[ref]) {
      return
    }
    // remove from this.componentMap cursively
    (function _removeCursively (_ref) {
      const child = self.componentMap[_ref]
      const listeners = child._listeners
      const children = child.data.children
      if (children && children.length) {
        for (let i = 0, l = children.length; i < l; i++) {
          _removeCursively(children[i].ref)
        }
      }
      // remove events from _ref component
      if (listeners) {
        for (const type in listeners) {
          child.node.removeEventListener(type, listeners[type])
        }
      }
      delete child._listeners
      delete child.node._listeners
      // remove _ref component
      delete self.componentMap[_ref]
    })(ref)
  },

  createElement: function (data, nodeType) {
    let ComponentType = typeMap[data.type]
    if (!ComponentType) {
      ComponentType = typeMap['container']
    }

    const ref = data.ref
    const component = new ComponentType(data, nodeType)

    this.componentMap[ref] = component
    component.node.setAttribute('data-ref', ref)

    return component
  },

  /**
   * createBody: generate root component
   * @param  {object} element
   */
  createBody: function (element) {
    // TODO: creatbody on document.body
    // no need to create a extra div
    if (this.componentMap['_root']) {
      return
    }

    const nodeType = element.type
    element.type = 'root'
    element.rootId = this.weexInstance.rootId
    element.ref = '_root'

    const root = this.createElement(element, nodeType)
    const body = document.querySelector('#' + this.weexInstance.rootId)
          || document.body
    body.appendChild(root.node)
    root._appended = true

    this.handleAppend(root)
  },

  appendChild: function (parentRef, data) {
    let parent = this.componentMap[parentRef]

    if (this.componentMap[data.ref] || !parent) {
      return
    }

    if (parentRef === '_root' && !parent) {
      parent = this.createElement({
        type: 'root',
        rootId: this.weexInstance.rootId,
        ref: '_root'
      })
      parent._appended = true
    }

    const child = parent.appendChild(data)

    // In some parent component the implementation of method
    // appendChild didn't return the component at all, therefor
    // child maybe a undefined object.
    if (child) {
      child.parentRef = parentRef
    }

    if (child && parent._appended) {
      this.handleAppend(child)
    }
  },

  appendChildren: function (ref, elements) {
    for (let i = 0; i < elements.length; i++) {
      this.appendChild(ref, elements[i])
    }
  },

  removeElement: function (ref) {
    const component = this.componentMap[ref]

    // fire event for rendering dom on body elment.
    this.rendering()

    if (component && component.parentRef) {
      const parent = this.componentMap[component.parentRef]
      component.onRemove && component.onRemove()
      parent.removeChild(component)
    }
    else {
      console.warn('ref: ', ref)
    }
  },

  moveElement: function (ref, parentRef, index) {
    const component = this.componentMap[ref]
    const newParent = this.componentMap[parentRef]
    const oldParentRef = component.parentRef
    let children, before, i, l
    if (!component || !newParent) {
      console.warn('ref: ', ref)
      return
    }

    // fire event for rendering.
    this.rendering()

    if (index < -1) {
      index = -1
      console.warn('index cannot be less than -1.')
    }

    children = newParent.data.children
    if (children
        && children.length
        && index !== -1
        && index < children.length) {
      before = this.componentMap[newParent.data.children[index].ref]
    }

    // remove from oldParent.data.children
    if (oldParentRef && this.componentMap[oldParentRef]) {
      children = this.componentMap[oldParentRef].data.children
      if (children && children.length) {
        for (i = 0, l = children.length; i < l; i++) {
          if (children[i].ref === ref) {
            break
          }
        }
        if (l > i) {
          children.splice(i, 1)
        }
      }
    }

    newParent.insertBefore(component, before)

    component.onMove && component.onMove(parentRef, index)
  },

  insertBefore: function (ref, data) {
    let child, parent
    const before = this.componentMap[ref]
    child = this.componentMap[data.ref]
    before && (parent = this.componentMap[before.parentRef])
    if (child || !parent || !before) {
      return
    }

    child = this.createElement(data)
    if (child) {
      child.parentRef = before.parentRef
      parent.insertBefore(child, before)
    }
    else {
      return
    }

    if (this.componentMap[before.parentRef]._appended) {
      this.handleAppend(child)
    }
  },

  /**
   * addElement
   * If index is larget than any child's index, the
   * element will be appended behind.
   * @param {string} parentRef
   * @param {obj} element (data of the component)
   * @param {number} index
   */
  addElement: function (parentRef, element, index) {
    // fire event for rendering dom on body elment.
    this.rendering()

    const parent = this.componentMap[parentRef]
    if (!parent) {
      return
    }
    const children = parent.data.children
    // -1 means append as the last.
    if (index < -1) {
      index = -1
      console.warn('index cannot be less than -1.')
    }
    if (children && children.length
        && children.length > index
        && index !== -1) {
      this.insertBefore(children[index].ref, element)
    }
    else {
      this.appendChild(parentRef, element)
    }
  },

  clearChildren: function (ref) {
    const component = this.componentMap[ref]
    if (component) {
      component.node.innerHTML = ''
      if (component.data) {
        component.data.children = null
      }
    }
  },

  addEvent: function (ref, type, func) {
    let component
    if (typeof ref === 'string' || typeof ref === 'number') {
      component = this.componentMap[ref]
    }
    else if (utils.getType(ref) === 'object') {
      component = ref
      ref = component.data.ref
    }
    if (component && component.node) {
      const sender = this.weexInstance.sender
      const listener = function (e) {
        // do stop bubbling.
        // do not prevent default, otherwise the touchstart
        // event will no longer trigger a click event
        if (e._alreadyTriggered) {
          return
        }
        e._alreadyTriggered = true
        const evt = utils.extend({}, e)
        evt.target = component.data
        sender.fireEvent(ref, type, func || {}, evt)
      }
      component.node.addEventListener(type, listener, false, false)
      let listeners = component._listeners
      if (!listeners) {
        listeners = component._listeners = {}
        component.node._listeners = {}
      }
      listeners[type] = listener
      component.node._listeners[type] = listener
    }
  },

  removeEvent: function (ref, type) {
    const component = this.componentMap[ref]
    const listener = component._listeners[type]
    if (component && listener) {
      component.node.removeEventListener(type, listener)
      component._listeners[type] = null
      component.node._listeners[type] = null
    }
  },

  updateAttrs: function (ref, attr) {
    const component = this.componentMap[ref]
    if (component) {
      component.updateAttrs(attr)
      if (component.data.type === 'image' && attr.src) {
        LazyLoad.startIfNeeded(component)
      }
    }
  },

  updateStyle: function (ref, style) {
    const component = this.componentMap[ref]
    if (component) {
      component.updateStyle(style)
    }
  },

  updateFullAttrs: function (ref, attr) {
    const component = this.componentMap[ref]
    if (component) {
      component.clearAttr()
      component.updateAttrs(attr)
      if (component.data.type === 'image' && attr.src) {
        LazyLoad.startIfNeeded(component)
      }
    }
  },

  updateFullStyle: function (ref, style) {
    const component = this.componentMap[ref]
    if (component) {
      component.clearStyle()
      component.updateStyle(style)
    }
  },

  handleAppend: function (component) {
    component._appended = true
    component.onAppend && component.onAppend()

    // invoke onAppend on children recursively
    const children = component.data.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = this.componentMap[children[i].ref]
        if (child) {
          this.handleAppend(child)
        }
      }
    }

    // watch appear/disappear of the component if needed
    AppearWatcher.watchIfNeeded(component)

    // do lazyload if needed
    LazyLoad.startIfNeeded(component)
  },

  transition: function (ref, config, callback) {
    const component = this.componentMap[ref]
    animation.transitionOnce(component, config, callback)
  },

  renderFinish: function () {
    FrameUpdater.pause()
  }
}

module.exports = ComponentManager

/* global Event */

'use strict'

import { watchIfNeeded } from './appearWatcher'
import { isArray } from '../utils'
// const lazyload = require('./lazyload')
// const animation = require('./animation')

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

export default function ComponentManager (id) {
  this.id = id
  this.batched = false
  this.updates = []
  this.componentMap = {}
  _instanceMap[this.id] = this
}

ComponentManager.getInstance = instanceId => _instanceMap[instanceId]

ComponentManager.registerComponent = (type, definition) => {
  typeMap[type] = definition
}

ComponentManager.getScrollableTypes = () => scrollableTypes

ComponentManager.prototype = {

  getWeexInstance () {
    if (!this._weexInstance) {
      this._weexInstance = global.weex
        ? global.weex.getInstance(this.id)
        : null
    }
    return this._weexInstance
  },

  // Fire a event 'renderbegin'/'renderend' on body element.
  rendering () {
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

  getComponent (ref) {
    return this.componentMap[ref]
  },

  removeComponent (ref) {
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

  createElement (data, nodeType) {
    let ComponentType = typeMap[data.type]
    if (!ComponentType) {
      ComponentType = typeMap['div']
    }

    data.instanceId = this.id
    const component = new ComponentType(data, nodeType)
    const ref = data.ref
    this.componentMap[ref] = component
    component.node.setAttribute('data-ref', ref)

    return component
  },

  /**
   * createBody: generate root component
   * @param  {object} element
   */
  createBody (element) {
    console.log('[h5-render] createBody', element)
    if (this.componentMap['_root']) {
      return
    }

    const nodeType = element.type
    element.type = 'root'
    element.rootId = this.getWeexInstance().rootId
    element.ref = '_root'

    const root = this.createElement(element, nodeType)
    const body = document.querySelector('#' + this.getWeexInstance().rootId)
          || document.body
    body.appendChild(root.node)
    root._appended = true

    this.handleAppend(root)
  },

  appendChild (parentRef, data) {
    let parent = this.componentMap[parentRef]

    if (this.componentMap[data.ref] || !parent) {
      return
    }

    if (parentRef === '_root' && !parent) {
      parent = this.createElement({
        type: 'root',
        rootId: this.getWeexInstance().rootId,
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

  // appendChildren (ref, elements) {
  //   for (let i = 0; i < elements.length; i++) {
  //     this.appendChild(ref, elements[i])
  //   }
  // },

  removeElement (ref) {
    if (isArray(ref)) {
      return ref.map(r => this.removeElement(r))
    }
    const component = this.componentMap[ref]
    // fire event for rendering dom on body elment.
    this.rendering()

    if (component && component.parentRef) {
      const parent = this.componentMap[component.parentRef]
      component.onRemove && component.onRemove()
      parent.removeChild(component)
    }
    else if (!component) {
      console.error(`[h5-render] component of ref '${ref}' does not exist.`)
    }
    else {
      console.error(`[h5-render] parent component '${component.parentRef}' does not exist.`)
    }
  },

  moveElement (ref, parentRef, index) {
    const component = this.componentMap[ref]
    const newParent = this.componentMap[parentRef]
    const oldParentRef = component.parentRef
    let children, before, i, l
    if (!component) {
      return console.error(`[h5-render] component of ref '${ref}' does not exist.`)
    }
    if (!newParent) {
      return console.error(
        `[h5-render] parent component '${parentRef}' does not exist.`)
    }

    if (index < -1) {
      index = -1
      return console.error('[h5-render] index cannot be less than -1.')
    }

    // fire event for rendering.
    this.rendering()

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

  insertBefore (ref, data) {
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
  addElement (parentRef, element, index) {
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
      return console.error('[h5-render] index cannot be less than -1.')
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

  addEvent (ref, type) {
    const component = this.componentMap[ref]
    if (!component) {
      return console.error(`[h5-render] component of ref '${ref}' does not exist.`)
    }
    component.bindEvents([type])
  },

  removeEvent (ref, type) {
    const component = this.componentMap[ref]
    if (!component) {
      return console.error(`[h5-render] component of ref '${ref}' does not exist.`)
    }
    component.unbindEvents([type])
  },

  updateAttrs (ref, attrs) {
    const component = this.componentMap[ref]
    if (!component) {
      return console.error(`[h5-render] component of ref '${ref}' does not exist.`)
    }
    component.updateAttrs(attrs)
  },

  // setStyle (ref, key, value) {
  //   const component = this.componentMap[ref]
  //   if (!component) {
  //     return console.error(`[h5-render] component of ref '${ref}' does not exist.`)
  //   }
  //   component.updateStyle({ [key]: value })
  // },

  updateStyle (ref, style) {
    const component = this.componentMap[ref]
    if (!component) {
      return console.error(`[h5-render] component of ref '${ref}' does not exist.`)
    }
    component.updateStyle(style)
  },

  handleAppend (component) {
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
    watchIfNeeded(component)

    // do lazyload if needed
    component.fireLazyload()
    // lazyload.startIfNeeded(component);
  },

  createFinish (callback) {
    window.dispatchEvent(new Event('weex:createfinish'))
  },

  updateFinish (callback) {
    window.dispatchEvent(new Event('weex:updatefinish'))
  },

  refreshFinish (callback) {
    window.dispatchEvent(new Event('weex:refreshfinish'))
  }

}


'use strict'

var config = require('./config')
var FrameUpdater = require('./frameUpdater')
var AppearWatcher = require('./appearWatcher')
var utils = require('./utils')
var LazyLoad = require('./lazyLoad')
var animation = require('./animation')

var RENDERING_INDENT = 800

var _instanceMap = {}
var typeMap = {}

function ComponentManager(instance) {
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

ComponentManager.prototype = {

  // Fire a event 'renderbegin'/'renderend' on body element.
  rendering: function () {
    function _renderingEnd() {
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
    } else {
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
    var cmp
    var self = this
    if (!ref || !(cmp = this.componentMap[ref])) {
      return
    }
    // remove from this.componentMap cursively
    (function _removeCursively(_ref) {
      var child = self.componentMap[_ref]
      var listeners = child._listeners
      var children = child.data.children
      if (children && children.length) {
        for (var i = 0, l = children.length; i < l; i++) {
          _removeCursively(children[i].ref)
        }
      }
      // remove events from _ref component
      if (listeners) {
        for (var type in listeners) {
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
    var ComponentType = typeMap[data.type]
    if (!ComponentType) {
      ComponentType = typeMap['container']
    }

    var ref = data.ref
    var component = new ComponentType(data, nodeType)

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
    var root, body, nodeType
    if (this.componentMap['_root']) {
      return
    }

    nodeType = element.type
    element.type = 'root'
    element.rootId = this.weexInstance.rootId
    element.ref = '_root'

    var root = this.createElement(element, nodeType)
    body = document.querySelector('#' + this.weexInstance.rootId)
          || document.body
    body.appendChild(root.node)
    root._appended = true
  },

  appendChild: function (parentRef, data) {
    var parent = this.componentMap[parentRef]

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

    var child = parent.appendChild(data)

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
    for (var i = 0; i < elements.length; i++) {
      this.appendChild(ref, elements[i])
    }
  },

  removeElement: function (ref) {
    var component = this.componentMap[ref]

    // fire event for rendering dom on body elment.
    this.rendering()

    if (component && component.parentRef) {
      var parent = this.componentMap[component.parentRef]
      component.onRemove && component.onRemove()
      parent.removeChild(component)
    } else {
      console.warn('ref: ', ref)
    }
  },

  moveElement: function (ref, parentRef, index) {
    var component = this.componentMap[ref]
    var newParent = this.componentMap[parentRef]
    var oldParentRef = component.parentRef
    var children, before, i, l
    if (!component || !newParent) {
      console.warn('ref: ', ref)
      return
    }

    // fire event for rendering dom on body elment.
    this.rendering()

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
      newParent.insertBefore(component, before)
    } else {  // append
      newParent.insertBefore(component)
    }

    component.onMove && component.onMove(parentRef, index)

  },

  insertBefore: function (ref, data) {
    var child, before, parent
    before = this.componentMap[ref]
    child = this.componentMap[data.ref]
    before && (parent = this.componentMap[before.parentRef])
    if (child || !parent || !before) {
      return
    }

    child = this.createElement(data)
    if (child) {
      child.parentRef = before.parentRef
      parent.insertBefore(child, before)
    } else {
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
    var parent, children, before

    // fire event for rendering dom on body elment.
    this.rendering()

    parent = this.componentMap[parentRef]
    if (!parent) {
      return
    }
    children = parent.data.children
    // -1 means append as the last.
    if (index < -1) {
      index = -1
      console.warn('index cannot be less than -1.')
    }
    if (children && children.length
        && children.length > index
        && index !== -1) {
      this.insertBefore(children[index].ref, element)
    } else {
      this.appendChild(parentRef, element)
    }
  },

  clearChildren: function (ref) {
    var component = this.componentMap[ref]
    if (component) {
      component.node.innerHTML = ''
      if (component.data) {
        component.data.children = null
      }
    }
  },

  addEvent: function (ref, type) {
    var component
    if (typeof ref === 'string' || typeof ref === 'number') {
      component = this.componentMap[ref]
    } else if (Object.prototype.toString.call(ref).slice(8, -1) === 'Object') {
      component = ref
      ref = component.data.ref
    }
    if (component && component.node) {
      var sender = this.weexInstance.sender
      var listener = sender.fireEvent.bind(sender, ref, type)
      var listeners = component._listeners
      component.node.addEventListener(type, listener, false, false)
      if (!listeners) {
        listeners = component._listeners = {}
        component.node._listeners = {}
      }
      listeners[type] = listener
      component.node._listeners[type] = listener
    }
  },

  removeEvent: function (ref, type) {
    var component = this.componentMap[ref]
    var listener = component._listeners[type]
    if (component && listener) {
      component.node.removeEventListener(type, listener)
      component._listeners[type] = null
      component.node._listeners[type] = null
    }
  },

  updateAttrs: function (ref, attr) {
    var component = this.componentMap[ref]
    if (component) {
      component.updateAttrs(attr)
      if (component.data.type === 'image' && attr.src) {
        LazyLoad.startIfNeeded(component)
      }
    }
  },

  updateStyle: function (ref, style) {
    var component = this.componentMap[ref]
    if (component) {
      component.updateStyle(style)
    }
  },

  updateFullAttrs: function (ref, attr) {
    var component = this.componentMap[ref]
    if (component) {
      component.clearAttr()
      component.updateAttrs(attr)
      if (component.data.type === 'image' && attr.src) {
        LazyLoad.startIfNeeded(component)
      }
    }
  },

  updateFullStyle: function (ref, style) {
    var component = this.componentMap[ref]
    if (component) {
      component.clearStyle()
      component.updateStyle(style)
    }
  },

  handleAppend: function (component) {
    component._appended = true
    component.onAppend && component.onAppend()

    // invoke onAppend on children recursively
    var children = component.data.children
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var child = this.componentMap[children[i].ref]
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
    var component = this.componentMap[ref]
    animation.transitionOnce(component, config, callback)
  },

  renderFinish: function () {
    FrameUpdater.pause()
  }
}

module.exports = ComponentManager

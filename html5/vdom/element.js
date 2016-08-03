import { instanceMap, getNextNodeRef } from './helper'
import Node from './node'

const DEFAULT_TAG_NAME = 'div'

export default function Element (type = DEFAULT_TAG_NAME, props) {
  props = props || {}
  this.nodeType = 1
  this.nodeId = getNextNodeRef().toString()
  this.ref = this.nodeId
  this.type = type
  this.attr = props.attr || {}
  this.classStyle = props.classStyle || {}
  this.style = props.style || {}
  this.event = {}
  this.children = []
  this.pureChildren = []
}

Element.prototype = new Node()

Element.prototype.appendChild = function (node) {
  if (node.parentNode && node.parentNode !== this) {
    return
  }
  if (!node.parentNode) {
    linkParent(node, this)
    insertIndex(node, this.children, this.children.length, true)
    if (this.docId) {
      registerNode(this.docId, node)
    }
    if (node.nodeType === 1) {
      insertIndex(node, this.pureChildren, this.pureChildren.length)
      if (this.docId) {
        const listener = instanceMap[this.docId].listener
        listener.addElement(node, this.ref, -1)
      }
    }
  }
  else {
    moveIndex(node, this.children, this.children.length, true)
    if (node.nodeType === 1) {
      const index = moveIndex(node, this.pureChildren, this.pureChildren.length)
      if (this.docId && index >= 0) {
        const listener = instanceMap[this.docId].listener
        listener.moveElement(node.ref, this.ref, index)
      }
    }
  }
}

Element.prototype.insertBefore = function (node, before) {
  if (node.parentNode && node.parentNode !== this) {
    return
  }
  if (node === before || node.nextSibling === before) {
    return
  }
  if (!node.parentNode) {
    linkParent(node, this)
    insertIndex(node, this.children, this.children.indexOf(before), true)
    if (this.docId) {
      registerNode(this.docId, node)
    }
    if (node.nodeType === 1) {
      const pureBefore = nextElement(before)
      const index = insertIndex(
        node,
        this.pureChildren,
        pureBefore
          ? this.pureChildren.indexOf(pureBefore)
          : this.pureChildren.length
      )
      if (this.docId) {
        const listener = instanceMap[this.docId].listener
        listener.addElement(node, this.ref, index)
      }
    }
  }
  else {
    moveIndex(node, this.children, this.children.indexOf(before), true)
    if (node.nodeType === 1) {
      const pureBefore = nextElement(before)
      const index = moveIndex(
        node,
        this.pureChildren,
        pureBefore
          ? this.pureChildren.indexOf(pureBefore)
          : this.pureChildren.length
      )
      if (this.docId && index >= 0) {
        const listener = instanceMap[this.docId].listener
        listener.moveElement(node.ref, this.ref, index)
      }
    }
  }
}

Element.prototype.insertAfter = function (node, after) {
  if (node.parentNode && node.parentNode !== this) {
    return
  }
  if (node === after || node.previousSibling === after) {
    return
  }
  if (!node.parentNode) {
    linkParent(node, this)
    insertIndex(node, this.children, this.children.indexOf(after) + 1, true)
    if (this.docId) {
      registerNode(this.docId, node)
    }
    if (node.nodeType === 1) {
      const index = insertIndex(
        node,
        this.pureChildren,
        this.pureChildren.indexOf(previousElement(after)) + 1
      )
      if (this.docId) {
        const listener = instanceMap[this.docId].listener
        listener.addElement(node, this.ref, index)
      }
    }
  }
  else {
    moveIndex(node, this.children, this.children.indexOf(after) + 1, true)
    if (node.nodeType === 1) {
      const index = moveIndex(
        node,
        this.pureChildren,
        this.pureChildren.indexOf(previousElement(after)) + 1
      )
      if (this.docId && index >= 0) {
        const listener = instanceMap[this.docId].listener
        listener.moveElement(node.ref, this.ref, index)
      }
    }
  }
}

Element.prototype.removeChild = function (node, preserved) {
  if (node.parentNode) {
    removeIndex(node, this.children, true)
    if (node.nodeType === 1) {
      removeIndex(node, this.pureChildren)
      if (this.docId) {
        const listener = instanceMap[this.docId].listener
        listener.removeElement(node.ref)
      }
    }
  }
  if (!preserved) {
    node.destroy()
  }
}

Element.prototype.clear = function () {
  if (this.docId) {
    const listener = instanceMap[this.docId].listener
    this.pureChildren.forEach(node => {
      listener.removeElement(node.ref)
    })
  }
  this.children.forEach(node => {
    node.destroy()
  })
  this.children.length = 0
  this.pureChildren.length = 0
}

function nextElement (node) {
  while (node) {
    if (node.nodeType === 1) {
      return node
    }
    node = node.nextSibling
  }
}

function previousElement (node) {
  while (node) {
    if (node.nodeType === 1) {
      return node
    }
    node = node.previousSibling
  }
}

function linkParent (node, parent) {
  node.parentNode = parent
  if (parent.docId) {
    node.docId = parent.docId
    node.ownerDocument = parent.ownerDocument
    node.ownerDocument.nodeMap[node.nodeId] = node
    node.depth = parent.depth + 1
  }
  node.children.forEach(child => {
    linkParent(child, node)
  })
}

function registerNode (docId, node) {
  const doc = instanceMap[docId]
  doc.nodeMap[node.nodeId] = node
}

function insertIndex (target, list, newIndex, changeSibling) {
  if (newIndex < 0) {
    newIndex = 0
  }
  const before = list[newIndex - 1]
  const after = list[newIndex]
  list.splice(newIndex, 0, target)
  if (changeSibling) {
    before && (before.nextSibling = target)
    target.previousSibling = before
    target.nextSibling = after
    after && (after.previousSibling = target)
  }
  return newIndex
}

function moveIndex (target, list, newIndex, changeSibling) {
  const index = list.indexOf(target)
  if (index < 0) {
    return -1
  }
  if (changeSibling) {
    const before = list[index - 1]
    const after = list[index + 1]
    before && (before.nextSibling = after)
    after && (after.previousSibling = before)
  }
  list.splice(index, 1)
  let newIndexAfter = newIndex
  if (index <= newIndex) {
    newIndexAfter = newIndex - 1
  }
  const beforeNew = list[newIndexAfter - 1]
  const afterNew = list[newIndexAfter]
  list.splice(newIndexAfter, 0, target)
  if (changeSibling) {
    beforeNew && (beforeNew.nextSibling = target)
    target.previousSibling = beforeNew
    target.nextSibling = afterNew
    afterNew && (afterNew.previousSibling = target)
  }
  if (index === newIndexAfter) {
    return -1
  }
  return newIndex
}

function removeIndex (target, list, changeSibling) {
  const index = list.indexOf(target)
  if (index < 0) {
    return
  }
  if (changeSibling) {
    const before = list[index - 1]
    const after = list[index + 1]
    before && (before.nextSibling = after)
    after && (after.previousSibling = before)
  }
  list.splice(index, 1)
}

Element.prototype.setAttr = function (key, value, silent) {
  if (this.attr[key] === value) {
    return
  }
  this.attr[key] = value
  if (!silent && this.docId) {
    const listener = instanceMap[this.docId].listener
    listener.setAttr(this.ref, key, value)
  }
}

Element.prototype.setStyle = function (key, value, silent) {
  if (this.style[key] === value) {
    return
  }
  this.style[key] = value
  if (!silent && this.docId) {
    const listener = instanceMap[this.docId].listener
    listener.setStyle(this.ref, key, value)
  }
}

Element.prototype.setClassStyle = function (classStyle) {
  this.classStyle = classStyle
  if (this.docId) {
    const listener = instanceMap[this.docId].listener
    listener.setStyles(this.ref, this.toStyle())
  }
}

Element.prototype.addEvent = function (type, handler) {
  if (!this.event[type]) {
    this.event[type] = handler
    if (this.docId) {
      const listener = instanceMap[this.docId].listener
      listener.addEvent(this.ref, type)
    }
  }
}

Element.prototype.removeEvent = function (type) {
  if (this.event[type]) {
    delete this.event[type]
    if (this.docId) {
      const listener = instanceMap[this.docId].listener
      listener.removeEvent(this.ref, type)
    }
  }
}

Element.prototype.fireEvent = function (type, e) {
  const handler = this.event[type]
  if (handler) {
    return handler.call(this, e)
  }
}

Element.prototype.toStyle = function () {
  return Object.assign({}, this.classStyle, this.style)
}

Element.prototype.toJSON = function () {
  const result = {
    ref: this.ref.toString(),
    type: this.type,
    attr: this.attr,
    style: this.toStyle()
  }
  const event = Object.keys(this.event)
  if (event.length) {
    result.event = event
  }
  if (this.pureChildren.length) {
    result.children = this.pureChildren.map((child) => child.toJSON())
  }
  return result
}

Element.prototype.toString = function () {
  return '<' + this.type +
    ' attr=' + JSON.stringify(this.attr) +
    ' style=' + JSON.stringify(this.toStyle()) + '>' +
    this.pureChildren.map((child) => child.toString()).join('') +
    '</' + this.type + '>'
}
/**
 * @fileOverview
 * A simple virtual dom implementation
 */

const DEFAULT_TAG_NAME = 'div'

export const instanceMap = {}

export function Document(id) {
  id = id ? id.toString() : ''
  this.id = id
  this.nextRef = 1
  this.nodeMap = {}
  this.listener = null
  this.eventManager = null
  this.closed = false
  instanceMap[id] = this

  this.createDocumentElement()
}

export function destroyDocument(id) {
  delete instanceMap[id]
}

Document.prototype.open = function () {
  this.closed = false
  if (this.listener) {
    this.listener.batched = false
  }
}
Document.prototype.close = function () {
  this.closed = true
  if (this.listener) {
    this.listener.batched = true
  }
}

Document.prototype.setEventManager = function (eventManager) {
  this.eventManager = eventManager
}

Document.prototype.setListener = function (listener) {
  this.listener = listener
  listener.batched = !!this.closed
}

Document.prototype.addRef = function (el) {
  el.ref = this.nextRef.toString()
  this.nodeMap[el.ref] = el
  this.nextRef++
}

Document.prototype.getRef = function (ref) {
  return this.nodeMap[ref]
}

Document.prototype.removeRef = function (ref) {
  delete this.nodeMap[ref]
}

Document.prototype.createDocumentElement = function (type, props) {
  if (!this.documentElement) {
    this.documentElement = new Element(type, props, this)
    this.nodeMap._documentElement = this.documentElement
    this.documentElement.ref = '_documentElement'
    this.documentElement.attached = true
  }

  return this.documentElement
}

Document.prototype.createBody = function (type, props) {
  if (!this.body) {
    this.body = new Element(type, props, this)
    this.nodeMap._root = this.body
    this.body.ref = '_root'
    this.body.depth = 1
  }

  return this.body
}

Document.prototype.createElement = function (tagName, props) {
  return new Element(tagName, props, this)
}

Document.prototype.createComment = function (text) {
  return new Comment(text, this)
}

export function Node() {
}

Node.prototype.create = function (instanceId) {
  this.parentRef = null
  this.attached = false
  if (instanceId) {
    this.instanceId = instanceId
    const doc = instanceMap[instanceId]
    doc.addRef(this)
  }
}

Node.prototype.destroy = function () {
  const ref = this.ref
  const instanceId = this.instanceId
  if (instanceId) {
    const doc = instanceMap[instanceId]
    doc.removeRef(ref)
  }

  const children = this.children || []
  const length = children.length
  for (let i = 0; i < length; i++) {
    children[i].destroy()
  }
}

Node.prototype.getRenderer = function () {
  const doc = instanceMap[this.instanceId]
  return doc.listener
}

Node.prototype.next = function () {
  const instanceId = this.instanceId
  const doc = instanceMap[instanceId]
  const parent = doc.getRef(this.parentRef)
  if (parent) {
    return parent.children[parent.children.indexOf(this) + 1]
  }
}

Node.prototype.prev = function () {
  const instanceId = this.instanceId
  const doc = instanceMap[instanceId]
  const parent = doc.getRef(this.parentRef)
  if (parent) {
    return parent.children[parent.children.indexOf(this) - 1]
  }
}

export function Element(type=DEFAULT_TAG_NAME, props, ownerDocument) {
  props = props || {}
  this.create(ownerDocument.id)
  this.ownerDocument = ownerDocument
  this.type = type
  this.attr = props.attr || {}
  this.classStyle = props.classStyle || {}
  this.style = props.style || {}
  this.event = []
  this.children = []
  this.pureChildren = []
}

Element.prototype = new Node()

Element.prototype.appendChild = function (node) {

  removeIfExisted(node)
  node.parentRef = this.ref
  this.children.push(node)

  if (this.attached) {
    setAttached(node, this.depth)
  }
  else {
    setDetached(node)
  }

  if (node instanceof Element) {
    this.pureChildren.push(node)

    if (this.attached) {
      const renderer = this.getRenderer()
      if (renderer) {
        if (this.ref === '_documentElement') {
          // if its parent is documentElement then it's a body
          renderer.createBody(node, this.ref)
        }
        else {
          renderer.addElement(node, this.ref)
        }
      }
    }
  }
}

Element.prototype.insertBefore = function (node, before) {

  if (node.parentRef === this.ref) {
    moveBefore(node, before, this.children)
    if (node instanceof Element) {
      const pureBeforeIndex = movePureBefore(node, before, this.pureChildren)
      if (pureBeforeIndex >= 0 && this.attached) {
        const renderer = this.getRenderer()
        if (renderer) {
          renderer.moveElement(node.ref, this.ref, pureBeforeIndex)
        }
      }
    }
    return
  }

  removeIfExisted(node)

  const children = this.children
  const index = children.indexOf(before)

  node.parentRef = this.ref
  if (this.attached) {
    setAttached(node, this.depth)
  }
  else {
    setDetached(node)
  }
  children.splice(index, 0, node)

  if (node instanceof Element) {
    const pureChildren = this.pureChildren
    const pureIndex = getPureAfter(before, pureChildren)

    pureChildren.splice(pureIndex, 0, node)

    if (this.attached) {
      const renderer = this.getRenderer()
      if (renderer) {
        renderer.addElement(node, this.ref, pureIndex)
      }
    }
  }
}

Element.prototype.insertAfter = function (node, after) {

  if (node.parentRef === this.ref) {
    moveAfter(node, after, this.children)
    if (node instanceof Element) {
      const pureAfterIndex = movePureAfter(node, after, this.pureChildren)
      if (pureAfterIndex >= 0 && this.attached) {
        const renderer = this.getRenderer()
        if (renderer) {
          renderer.moveElement(node.ref, this.ref, pureAfterIndex)
        }
      }
    }
    return
  }

  removeIfExisted(node)

  const children = this.children
  const index = children.indexOf(after)

  node.parentRef = this.ref
  if (this.attached) {
    setAttached(node, this.depth)
  }
  else {
    setDetached(node)
  }
  children.splice(index + 1, 0, node)

  if (node instanceof Element) {
    const pureChildren = this.pureChildren
    const pureIndex = getPureBefore(after, pureChildren)

    pureChildren.splice(pureIndex + 1, 0, node)

    if (this.attached) {
      const renderer = this.getRenderer()
      if (renderer) {
        renderer.addElement(node, this.ref, pureIndex + 1)
      }
    }
  }
}

Element.prototype.removeChild = function (node, preserved) {
  const children = this.children
  const index = children.indexOf(node)

  setDetached(node)

  if (index >= 0) {
    node.parentRef = null
    children.splice(index, 1)
    if (!preserved) {
      node.destroy()
    }
  }

  if (node instanceof Element) {
    this.pureChildren.$remove(node)
    if (this.attached) {
      const renderer = this.getRenderer()
      if (renderer) {
        renderer.removeElement(node.ref)
      }
    }
  }
}

Element.prototype.clear = function () {
  const children = this.children
  const length = children.length
  for (let i = 0; i < length; i++) {
    const child = children[i]
    child.parentRef = null
    setDetached(child)
    child.destroy()
  }
  children.length = 0

  if (this.attached) {
    const refs = this.pureChildren.map((child) => child.ref)
    this.pureChildren.length = 0
    const renderer = this.getRenderer()
    if (renderer) {
      renderer.removeElement(refs)
    }
  }
}

function moveBefore(node, before, children) {
  const targetIndex = children.indexOf(node)
  const beforeIndex = children.indexOf(before)

  /* istanbul ignore next */
  if (targetIndex === beforeIndex || targetIndex + 1 === beforeIndex) {
    return -1
  }

  const newIndex = targetIndex < beforeIndex ? beforeIndex - 1 : beforeIndex
  children.splice(targetIndex, 1)
  children.splice(newIndex, 0, node)

  return beforeIndex
}

function movePureBefore(node, before, pureChildren) {
  const pureTargetIndex = pureChildren.indexOf(node)
  const pureBeforeIndex = getPureAfter(before, pureChildren)

  /* istanbul ignore next */
  if (pureTargetIndex === pureBeforeIndex ||
    pureTargetIndex + 1 === pureBeforeIndex) {
    return -1
  }

  const pureNewIndex = pureTargetIndex < pureBeforeIndex
    ? pureBeforeIndex - 1
    : pureBeforeIndex

  pureChildren.splice(pureTargetIndex, 1)
  pureChildren.splice(pureNewIndex, 0, node)

  return pureBeforeIndex
}

function getPureAfter(node, pureChildren) {
  let pureIndex = pureChildren.indexOf(node)
  while (node && pureIndex < 0) {
    node = node.next()
    pureIndex = pureChildren.indexOf(node)
  }
  if (pureIndex < 0) {
    pureIndex = pureChildren.length
  }
  return pureIndex
}

function moveAfter(node, after, children) {
  const targetIndex = children.indexOf(node)
  const afterIndex = children.indexOf(after)

  /* istanbul ignore next */
  if (targetIndex === afterIndex || targetIndex === afterIndex + 1) {
    return -1
  }

  const newIndex = targetIndex < afterIndex ? afterIndex : afterIndex + 1
  children.splice(targetIndex, 1)
  children.splice(newIndex, 0, node)

  return afterIndex
}

function movePureAfter(node, after, pureChildren) {
  const pureTargetIndex = pureChildren.indexOf(node)
  const pureAfterIndex = getPureBefore(after, pureChildren)

  /* istanbul ignore next */
  if (pureTargetIndex === pureAfterIndex ||
    pureTargetIndex === pureAfterIndex + 1) {
    return -1
  }

  const pureNewIndex = pureTargetIndex < pureAfterIndex
    ? pureAfterIndex
    : pureAfterIndex + 1

  pureChildren.splice(pureTargetIndex, 1)
  pureChildren.splice(pureNewIndex, 0, node)

  return pureAfterIndex + 1
}

function getPureBefore(node, pureChildren) {
  let pureIndex = pureChildren.indexOf(node)
  while (node && pureIndex < 0) {
    node = node.prev()
    pureIndex = pureChildren.indexOf(node)
  }
  /* istanbul ignore next */
  if (pureIndex < 0) {
    pureIndex = -1
  }
  return pureIndex
}

function setAttached(node, depth) {
  if (node.ref === '_root') {
    depth = 1
  }
  else {
    depth = depth > 0 ? depth + 1 : 0
  }
  node.attached = true
  node.depth = depth
  if (node.children) {
    node.children.forEach((sub) => {
      setAttached(sub, depth)
    })
  }
}

function setDetached(node) {
  node.attached = false
  node.depth = 0
  if (node.children) {
    node.children.forEach((sub) => {
      setDetached(sub)
    })
  }
}

function removeIfExisted(node) {
  const doc = instanceMap[node.instanceId]
  if (doc) {
    const existedNode = doc.getRef(node.ref)
    if (existedNode) {
      const existedParent = doc.getRef(existedNode.parentRef)
      if (existedParent && existedParent.removeChild) {
        existedParent.removeChild(existedNode, true)
      }
    }
  }
}

Element.prototype.setAttr = function (key, value) {
  if (this.attr[key] === value) {
    return
  }
  this.attr[key] = value
  if (this.attached) {
    const renderer = this.getRenderer()
    if (renderer) {
      renderer.setAttr(this.ref, key, value)
    }
  }
}

Element.prototype.setStyle = function (key, value) {
  if (this.style[key] === value) {
    return
  }
  this.style[key] = value
  if (this.attached) {
    const renderer = this.getRenderer()
    if (renderer) {
      renderer.setStyle(this.ref, key, value)
    }
  }
}

Element.prototype.setClassStyle = function (classStyle) {
  this.classStyle = classStyle
  if (this.attached) {
    const renderer = this.getRenderer()
    if (renderer) {
      renderer.setStyles(this.ref, this.toStyle())
    }
  }
}

Element.prototype.addEvent = function (type, handler) {
  const index = this.event.indexOf(type)

  if (index < 0) {
    this.event.push(type)
    let eventManager = this.ownerDocument.eventManager
    eventManager.add(this, type, handler)

    if (this.attached) {
      const renderer = this.getRenderer()
      if (renderer) {
        renderer.addEvent(this.ref, type)
      }
    }
  }
}

Element.prototype.removeEvent = function (type) {
  const index = this.event.indexOf(type)

  if (index >= 0) {
    this.event.splice(index, 1)
    let eventManager = this.ownerDocument.eventManager
    eventManager.remove(this, type)

    if (this.attached) {
      const renderer = this.getRenderer()
      if (renderer) {
        renderer.removeEvent(this.ref, type)
      }
    }
  }
}

Element.prototype.toStyle = function () {
  const result = {}
  const classStyle = this.classStyle
  const style = this.style
  for (const name in classStyle) {
    result[name] = classStyle[name]
  }
  for (const name in style) {
    result[name] = style[name]
  }
  return result
}

Element.prototype.toJSON = function () {
  const result = {
    ref: this.ref.toString(),
    type: this.type,
    attr: this.attr,
    style: this.toStyle()
  }

  if (this.event && this.event.length) {
    result.event = this.event
  }
  if (this.pureChildren && this.pureChildren.length) {
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

export function Comment(value, ownerDocument) {
  this.create(ownerDocument.id)
  this.type = 'comment'
  this.value = value
}

Comment.prototype = new Node()

Comment.prototype.toString = function () {
  return '<!-- ' + this.value + ' -->'
}

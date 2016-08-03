import { instanceMap, getNextNodeRef } from './helper'
import Listener from './listener'
import Element from './element'
import Comment from './comment'

export default function Document (id, url, handler) {
  id = id ? id.toString() : ''
  this.id = id
  this.URL = url

  instanceMap[id] = this
  this.nodeMap = {}
  this.listener = new Listener(id, handler || genCallTasks(id))
  this.createDocumentElement()
}

function genCallTasks (id) {
  return (tasks) => {
    if (!Array.isArray(tasks)) {
      tasks = [tasks]
    }
    callNative(id, tasks, '-1')
  }
}

Document.prototype.destroy = function () {
  delete this.listener
  delete this.nodeMap
  delete instanceMap[this.id]
}

Document.prototype.open = function () {
  this.listener.batched = false
}

Document.prototype.close = function () {
  this.listener.batched = true
}

Document.prototype.createDocumentElement = function () {
  if (!this.documentElement) {
    const el = new Element('document')
    el.docId = this.id
    el.ownerDocument = this
    el.role = 'documentElement'
    el.depth = 0
    el.ref = '_documentElement'
    this.nodeMap._documentElement = el
    this.documentElement = el
    el.appendChild = (node) => {
      appendBody(this, node)
    }
    el.insertBefore = (node, before) => {
      appendBody(this, node, before)
    }
  }

  return this.documentElement
}

function appendBody (doc, node, before) {
  const { documentElement } = doc

  if (documentElement.pureChildren.length > 0 || node.parentNode) {
    return
  }
  const children = documentElement.children
  const beforeIndex = children.indexOf(before)
  if (beforeIndex < 0) {
    children.push(node)
  }
  else {
    children.splice(beforeIndex, 0, node)
  }

  if (node.nodeType === 1) {
    if (node.role === 'body') {
      node.docId = doc.id
      node.ownerDocument = doc
      node.parentNode = documentElement
    }
    else {
      node.children.forEach(child => {
        child.parentNode = node
      })
      setBody(doc, node)
      node.docId = doc.id
      node.ownerDocument = doc
      linkParent(node, documentElement)
      delete doc.nodeMap[node.nodeId]
    }
    documentElement.pureChildren.push(node)
    doc.listener.createBody(node)
  }
  else {
    node.parentNode = documentElement
    doc.nodeMap[node.ref] = node
  }
}

function setBody (doc, el) {
  el.role = 'body'
  el.depth = 1
  delete doc.nodeMap[el.nodeId]
  el.ref = '_root'
  doc.nodeMap._root = el
  doc.body = el
}

Document.prototype.createBody = function (type, props) {
  if (!this.body) {
    const el = new Element(type, props)
    setBody(this, el)
  }

  return this.body
}

Document.prototype.createElement = function (tagName, props) {
  return new Element(tagName, props)
}

Document.prototype.createComment = function (text) {
  return new Comment(text)
}

Document.prototype.fireEvent = function (el, type, e, domChanges) {
  if (!el) {
    return
  }
  e = e || {}
  e.type = type
  e.target = el
  e.timestamp = Date.now()
  if (domChanges) {
    updateElement(el, domChanges)
  }
  return el.fireEvent(type, e)
}

Document.prototype.getRef = function (ref) {
  return this.nodeMap[ref]
}

function updateElement (el, changes) {
  const attrs = changes.attrs || {}
  for (const name in attrs) {
    el.setAttr(name, attrs[name], true)
  }
  const style = changes.style || {}
  for (const name in style) {
    el.setStyle(name, style[name], true)
  }
}
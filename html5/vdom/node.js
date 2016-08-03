import { instanceMap, getNextNodeRef } from './helper'

export default function Node () {
  this.nodeId = getNextNodeRef().toString()
  this.ref = this.nodeId
  this.children = []
  this.pureChildren = []
  this.parentNode = null
  this.nextSibling = null
  this.previousSibling = null
}

Node.prototype.destroy = function () {
  const doc = instanceMap[this.docId]
  if (doc) {
    delete this.docId
    delete doc.nodeMap[this.nodeId]
  }
  this.children.forEach(child => {
    child.destroy()
  })
}
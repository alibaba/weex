import { getNextNodeRef } from './helper'
import Node from './node'

export default function Comment (value) {
  this.nodeType = 8
  this.nodeId = getNextNodeRef().toString()
  this.ref = this.nodeId
  this.type = 'comment'
  this.value = value
  this.children = []
  this.pureChildren = []
}

Comment.prototype = new Node()

Comment.prototype.toString = function () {
  return '<!-- ' + this.value + ' -->'
}

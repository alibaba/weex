/**
 * @fileOverview
 * Virtual-DOM Comment.
 */

import Node from './node'
import { uniqueId } from './operation'

export default function Comment (value) {
  this.nodeType = 8
  this.nodeId = uniqueId()
  this.ref = this.nodeId
  this.type = 'comment'
  this.value = value
  this.children = []
  this.pureChildren = []
}

Comment.prototype = Object.create(Node.prototype)
Comment.prototype.constructor = Comment

/**
 * Convert to HTML comment string.
 * @return {stirng} html
 */
Comment.prototype.toString = function () {
  return '<!-- ' + this.value + ' -->'
}

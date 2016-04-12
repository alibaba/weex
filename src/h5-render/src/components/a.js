'use strict'

var Component = require('./component')

// attrs:
//   - href
function A (data) {
  Component.call(this, data)
}

A.prototype = Object.create(Component.prototype)

A.prototype.create = function () {
  var node = document.createElement('a')
  node.classList.add('weex-container')
  this.node = node
  this.style.alignItems.call(this, 'center')
  this.style.justifyContent.call(this, 'center')
  this.node.style.textDecoration = 'none'
  return node
}

module.exports = A

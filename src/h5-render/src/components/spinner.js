'use strict'

var Atomic = require('./atomic')

require('../styles/spinner.css')

function Spinner (data) {
  Atomic.call(this, data)
}

Spinner.prototype = Object.create(Atomic.prototype)

Spinner.prototype.create = function () {
  var node = document.createElement('div')
  node.classList.add('weex-container', 'weex-spinner-wrap')
  this.spinner = document.createElement('div')
  this.spinner.classList.add('weex-element', 'weex-spinner')
  node.appendChild(this.spinner)
  return node
}

module.exports = Spinner

'use strict'

const Atomic = require('./atomic')

// attrs:
//   - value
//   - disabled
function Timepicker (data) {
  Atomic.call(this, data)
}

Timepicker.prototype = Object.create(Atomic.prototype)

Timepicker.prototype.create = function () {
  const node = document.createElement('input')
  const uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
  this.className = 'weex-ipt-' + uuid
  this.styleId = 'weex-style-' + uuid
  node.classList.add(this.className)
  node.setAttribute('type', 'time')
  node.type = 'time'
  // For the consistency of input component's width.
  // The date and time type of input will have a bigger width
  // when the 'box-sizing' is not set to 'border-box'
  node.classList.add('weex-element')
  return node
}

Timepicker.prototype.attr = {
  disabled: function (val) {
    this.node.disabled = val && val !== 'false'
  }
}

module.exports = Timepicker

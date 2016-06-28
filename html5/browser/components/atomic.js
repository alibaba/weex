'use strict'

const Component = require('./component')

// Component which can have no subcomponents.
// This component should not be instantiated directly, since
// it is designed to be used as a base class to extend from.
function Atomic (data) {
  Component.call(this, data)
}

Atomic.prototype = Object.create(Component.prototype)

Atomic.prototype.appendChild = function (data) {
  // do nothing
  return
}

Atomic.prototype.insertBefore = function (child, before) {
  // do nothing
  return
}

Atomic.prototype.removeChild = function (child) {
  // do nothing
  return
}

module.exports = Atomic

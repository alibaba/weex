'use strict'

import Component from './component'

// Component which can have no subcomponents.
// This component should not be instantiated directly, since
// it is designed to be used as a base class to extend from.
export default function Atomic (data) {
  Component.call(this, data)
}

Atomic.prototype = Object.create(Component.prototype)

Atomic.prototype.createChildren = function (data) {
  // do nonthing
  return
}

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

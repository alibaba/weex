'use strict'

const logger = require('../logger')
const Component = require('./component')

// attrs:
//   - href
function A (data) {
  Component.call(this, data)
}

A.prototype = Object.create(Component.prototype)

A.prototype.create = function () {
  const node = document.createElement('a')
  node.classList.add('weex-container')
  node.style.textDecoration = 'none'
  return node
}

A.prototype.attr = {
  href: function (val) {
    if (!val) {
      return logger.warn('href of <a> should not be a null value.')
    }
    this.href = val
    this.node.setAttribute('data-href', val)
  }
}

A.prototype.bindEvents = function (evts) {
  // event handler for click event will be processed
  // before the url redirection.
  Component.prototype.bindEvents.call(this, evts)
  this.node.addEventListener('click', function (evt) {
    if (evt._alreadyFired && evt.target !== this.node) {
      // if the event target is this.node, then this is
      // just another click event handler for the same
      // target, not a handler for a bubbling up event,
      // otherwise it is a bubbling up event, and it
      // should be disregarded.
      return
    }
    evt._alreadyFired = true
    location.href = this.href
  }.bind(this))
}

module.exports = A

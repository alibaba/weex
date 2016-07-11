'use strict'

require('../styles/container.css')

const Component = require('./component')

function Container (data, nodeType) {
  Component.call(this, data, nodeType)
  this.node.classList.add('weex-container')
}

Container.prototype = Object.create(Component.prototype)

module.exports = Container

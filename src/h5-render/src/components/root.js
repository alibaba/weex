'use strict'

var ComponentManager = require('../componentManager')
var Component = require('./component')

// If nodeType is in this WHITE_LIST, just ignore it and
// replace it with a div element.
var WHITE_LIST = []

function RootComponent(data, nodeType) {
  var id = data.rootId + '-root'
  var componentManager = ComponentManager.getInstance(data.instanceId)

  // Return a NodeType instance.
  if (nodeType && nodeType !== 'div' && WHITE_LIST.indexOf(nodeType) === -1) {
    data.type = nodeType
    var cmp = componentManager.createElement(data)
    cmp.node.id = id
    return cmp
  }

  // Otherwise return a common weex-container component,
  // whose node is a div element.
  var node = document.createElement('div')
  this.data = data
  this.node = node

  this.createChildren()
  this.updateAttrs(this.data.attr)
  // issue: when add element to a list in lifetime hook 'ready', the
  // styles is set to the classStyle, not style. This is a issue
  // that jsframework should do something about.
  var classStyle = this.data.classStyle
  classStyle && this.updateStyle(this.data.classStyle)
  this.updateStyle(this.data.style)
  this.bindEvents(this.data.event)
}

RootComponent.prototype = Object.create(Component.prototype)

module.exports = RootComponent

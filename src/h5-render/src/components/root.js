'use strict'

var ComponentManager = require('../componentManager')
var Component = require('./component')
var utils = require('../utils')

var rootCandidates = ['list', 'scroller']

function RootComponent(data, nodeType) {
  var id = data.rootId + '-root'
  var componentManager = ComponentManager.getInstance(data.instanceId)

  // If nodeType is in the downgrades map, just ignore it and
  // replace it with a div component.
  var downgrades = componentManager.weexInstance.downgrades
  this.data = data

  // In some situation the root component should be implemented as
  // its own type, otherwise it has to be a div component as a root.
  if (!nodeType
      || rootCandidates.indexOf(nodeType) === -1
      || downgrades[nodeType]) {
    nodeType = 'div'
  }

  // If the root component is a Scrolleable Component, then
  // the html and body height should be fixed to the max height
  // of viewport.
  this.fixRootHeight()
  data.type = nodeType
  var cmp = componentManager.createElement(data)
  cmp.node.id = id
  return cmp
}

RootComponent.prototype = Object.create(Component.prototype)

RootComponent.prototype.fixRootHeight = function () {
  var rootContainer = document.querySelector(
      '#' + this.getComponentManager().weexInstance.rootId
    ) || document.body
  var html = document.documentElement
  var body = document.body
  !html.style.height && (html.style.height = '100%')
  !body.style.height && (body.style.height = '100%')
  !rootContainer.style.height && (rootContainer.style.height = '100%')
  !this.data.style.height
    && (this.data.style.height = window.innerHeight / this.data.scale)
}

module.exports = RootComponent

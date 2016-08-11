'use strict'

import ComponentManager from '../dom/componentManager'
import config from '../render/config'

function detectRootHeight (root) {
  const rootQuery = '#' + root.getWeexInstance().rootId
  const rootContainer = document.querySelector(rootQuery) || document.body
  const height = rootContainer.getBoundingClientRect().height
  if (height > global.innerHeight) {
    console.warn([
      '[h5-render] for scrollable root like \'list\' and \'scroller\', the height of ',
      'the root container must be a user-specified value. Otherwise ',
      'the scrollable element may not be able to work correctly. ',
      'Current height of the root element \'' + rootQuery + '\' is ',
      height + 'px, and mostly its height should be less than the ',
      'viewport\'s height ' + global.innerHeight + 'px. Please ',
      'make sure the height is correct.'
    ].join(''))
  }
}

function init (Weex) {
  const Component = Weex.Component

  function RootComponent (data, nodeType) {
    const id = data.rootId + '-root'
    const cm = ComponentManager.getInstance(data.instanceId)

    this.data = data

    // In some situation the root component should be implemented as
    // its own type, otherwise it has to be a div component as a root.
    if (!nodeType) {
      nodeType = 'div'
    }
    else if (config.validRoots.indexOf(nodeType) === -1) {
      console.warn('[h5-render] the root component type \'' + nodeType + '\' is not one of '
        + 'the types in [' + config.validRoots + '] list. It is auto downgraded '
        + 'to \'div\'.')
      nodeType = 'div'
    }
    else {
      if (!global.weex.getInstance(data.instanceId).embed) {
        window.addEventListener('renderend', function () {
          detectRootHeight(this)
        }.bind(this))
      }
      !this.data.style.height && (this.data.style.height = '100%')
    }

    data.type = nodeType
    const cmp = cm.createElement(data)
    cmp.node.id = id
    return cmp
  }

  RootComponent.prototype = Object.create(Component.prototype)

  Weex.registerComponent('root', RootComponent)
}

export default { init }

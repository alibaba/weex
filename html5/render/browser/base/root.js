'use strict'

import ComponentManager from '../dom/componentManager'
import config from '../render/config'

function init (Weex) {
  const Component = Weex.Component

  function RootComponent (data, nodeType) {
    const id = data.rootId + '-root'
    const ct = document.querySelector(`#${data.rootId}`)
    const cm = ComponentManager.getInstance(data.instanceId)

    this.data = data

    ct.classList.add('weex-container')
    if (!data.style.height && !data.style.flex) {
      // if no specification on root's height, then
      // fill root container with the root element by full scale.
      data.style.flex = 1
    }

    // The root component should be implemented as a div component, as the scrollable
    // components have performance issue compare to the original body scroll.
    if (!nodeType) {
      console.warn(`[h5-render] no nodeType is specified, construct Root use 'droot' by default.`)
      nodeType = 'droot'
    }
    else if (config.validRoots.indexOf(nodeType) === -1) {
      console.warn(`[h5-render] the root component type '${nodeType}' is not one of
the types in [${config.validRoots}] list. It is auto downgraded
to 'droot'.`)
      nodeType = 'droot'
    }
    else if (config.downgrade.root) {
      console.warn(`[h5-render] the root is downgrade to 'droot' due to the downgrade
configuration of weex.`)
      nodeType = 'droot'
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

'use strict'

function init (Weex) {
  const Component = Weex.Component

  function Div (data, nodeType) {
    Component.call(this, data, nodeType)
    this.node.classList.add('weex-container')
  }
  Div.prototype = Object.create(Component.prototype)

  Weex.registerComponent('div', Div)
  Weex.registerComponent('container', Div)
}

export default { init }

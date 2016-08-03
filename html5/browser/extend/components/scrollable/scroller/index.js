'use strict'

import scrollableModule from '../scrollable'

function init (Weex) {
  const Scrollable = scrollableModule.init(Weex)
  function Scroller (data, nodeType) {
    Scrollable.call(this, data, nodeType)
  }
  const extend = Weex.utils.extend

  Scroller.prototype = Object.create(Scrollable.prototype)
  extend(Scroller.prototype, {
    create () {
      const node = Scrollable.prototype.create.call(this)
      node.classList.add('scroller-wrap')
      this.scrollElement.classList.add('scroller-element')
      return node
    }
  })

  Weex.registerComponent('scroller', Scroller)
}

export default { init }

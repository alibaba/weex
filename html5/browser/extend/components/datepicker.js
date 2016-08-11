'use strict'

const proto = {
  create () {
    const node = document.createElement('input')
    const uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
    this.className = 'weex-ipt-' + uuid
    this.styleId = 'weex-style-' + uuid
    node.classList.add(this.className)
    node.setAttribute('type', 'date')
    node.type = 'date'
    // For the consistency of input component's width.
    // The date and time type of input will have a bigger width
    // when the 'box-sizing' is not set to 'border-box'
    node.classList.add('weex-element')
    return node
  }
}

const attr = {
  disabled: function (val) {
    this.node.disabled = val && val !== 'false'
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

  // attrs:
  //   - value
  //   - disabled
  function Datepicker (data) {
    Atomic.call(this, data)
  }
  Datepicker.prototype = Object.create(Atomic.prototype)
  extend(Datepicker.prototype, proto)
  extend(Datepicker.prototype, { attr })

  Weex.registerComponent('datepicker', Datepicker)
}

export default { init }


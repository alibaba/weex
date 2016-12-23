'use strict'

import './mask.css'

let Component

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-mask')
    node.classList.add('weex-container')
    this.placeholder = document.createElement('div')
    this.placeholder.classList.add('weex-mask-placeholder')
    return node
  },

  onAppend () {
    Component.prototype.onAppend.call(this)
    this.node.parentNode.insertBefore(this.placeholder, this.node)
    const ct = this.getComponentManager().getWeexInstance().getRoot()
    ct.insertBefore(this.node, ct.firstChild)
    this.node.style.position = 'fixed'
  },

  onRemove () {
    this.placeholder.parentNode.removeChild(this.placeholder)
    this.placeholder = null
  }
}

const style = {
  position: function (val) {
    // can't set postion. default value is 'fixed'.
    return
  },
  opacity: function (val) {
    if (val < 0 || val > 1) {
      return
    }
    // turn opacity into backgroundColor.
    setTimeout(() => {
      const color = window.getComputedStyle(this.node).backgroundColor
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
      if (match) {
        const r = match[1]
        const g = match[2]
        const b = match[3]
        const a = val
        this.node.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`
      }
    }, 0)
  }
}

function init (Weex) {
  Component = Weex.Component
  const extend = Weex.utils.extend

  function Mask (data) {
    Component.call(this, data)
  }
  Mask.prototype = Object.create(Component.prototype)
  extend(Mask.prototype, proto)
  extend(Mask.prototype, {
    style: extend(Object.create(Component.prototype.style), style)
  })

  Weex.registerComponent('mask', Mask)
}

export default { init }

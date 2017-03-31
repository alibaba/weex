'use strict'

const DEFAULT_ROWS = 2

/**
 * attr:
 * rows: default is 2.
 * disabled
 * placeholder
 */

const proto = {
  create () {
    const node = document.createElement('textarea')
    node.classList.add('weex-element')
    node.classList.add('weex-textarea')
    return node
  }
}

// updatable attributes
const attr = {
  rows (val) {
    this.node.rows = val || DEFAULT_ROWS
  },
  disabled (val) {
    this.node.disabled = !!val
  },
  placeholder (val) {
    this.node.placeholder = val || ''
  },
  value (val) {
    this.node.value = val || ''
  },
  autofocus (val) {
    this.node.autofocus = !!val
  }
}

// events configurations
const event = {
  input: {
    updator () {
      return {
        attrs: {
          value: this.node.value
        }
      }
    },
    extra () {
      return {
        value: this.node.value,
        timestamp: Date.now()
      }
    }
  },

  change: {
    updator: function () {
      return {
        attrs: {
          value: this.node.value
        }
      }
    },
    extra: function () {
      return {
        value: this.node.value,
        timestamp: Date.now()
      }
    }
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

  // attrs:
  //   - rows
  //   - disabled
  //   - placeholder
  function Textarea (data) {
    Atomic.call(this, data)
  }
  Textarea.prototype = Object.create(Atomic.prototype)
  extend(Textarea.prototype, proto)
  extend(Textarea.prototype, { attr })
  extend(Textarea.prototype, { event })

  Weex.registerComponent('textarea', Textarea)
}

export default { init }

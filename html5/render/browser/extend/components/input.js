'use strict'

let appendStyle

const availableTypes = ['text', 'password', 'tel', 'email', 'url', 'date', 'time']
const DEFAULT_TYPE = 'text'

function setPlaceholderColor (input, placeholderColor) {
  if (!placeholderColor) {
    return
  }
  const vendors = [
    '::-webkit-input-placeholder',
    ':-moz-placeholder',
    '::-moz-placeholder',
    ':-ms-input-placeholder',
    ':placeholder-shown'
  ]
  let css = ''
  const cssRule = 'color: ' + placeholderColor + ';'
  for (let i = 0, l = vendors.length; i < l; i++) {
    css += '.' + input.className + vendors[i] + '{'
           + cssRule + '}'
  }
  appendStyle(css, input.styleId, true)
}

const proto = {
  create () {
    const node = document.createElement('input')
    const uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
    this.className = 'weex-ipt-' + uuid
    this.styleId = 'weex-style-' + uuid
    node.classList.add(this.className)
    node.classList.add('weex-element')
    this.placeholder && (node.placeholder = this.placeholder)
    return node
  },

  focus () {
    this.node.focus()
  },

  blur () {
    this.node.blur()
  }
}

// updatable attributes
const attr = {
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
  },

  type (val) {
    this.node.type = availableTypes.indexOf(val) !== -1
      ? val
      : DEFAULT_TYPE
  }
}

// updatable styles
const style = {
  placeholderColor: function (val) {
    setPlaceholderColor(this, val)
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
  appendStyle = Weex.utils.appendStyle

  // attrs:
  //   - type: text|password|tel|email|url
  //   - value
  //   - placeholder
  //   - disabled
  //   - autofocus
  function Input (data) {
    Atomic.call(this, data)
  }
  Input.prototype = Object.create(Atomic.prototype)
  extend(Input.prototype, proto)
  extend(Input.prototype, { attr })
  extend(Input.prototype, {
    style: extend(Object.create(Atomic.prototype.style), style)
  })
  extend(Input.prototype, { event })

  Weex.registerComponent('input', Input)
}

export default { init }

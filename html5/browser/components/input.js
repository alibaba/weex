'use strict'

const Atomic = require('./atomic')
import { appendStyle, extend } from '../utils'

const availableTypes = ['text', 'password', 'tel', 'email', 'url']
const DEFAULT_TYPE = 'text'

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

Input.prototype.create = function () {
  const node = document.createElement('input')
  const uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
  this.className = 'weex-ipt-' + uuid
  this.styleId = 'weex-style-' + uuid
  node.classList.add(this.className)
  node.classList.add('weex-element')
  this.placeholder && (node.placeholder = this.placeholder)
  return node
}

// updatable attributes
Input.prototype.attr = {
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
Input.prototype.style = extend(
  Object.create(Atomic.prototype.style, {
    placeholderColor: function (val) {
      this.setPlaceholderColor(val)
    }
  }))

// events configurations
Input.prototype.event = {
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

Input.prototype.setPlaceholderColor = function (placeholderColor) {
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
    css += '.' + this.className + vendors[i] + '{'
           + cssRule + '}'
  }
  appendStyle(css, this.styleId, true)
}

module.exports = Input

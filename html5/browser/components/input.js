'use strict'

const Atomic = require('./atomic')
const utils = require('../utils')

// attrs:
//   - type: text|password|tel|email|url
//   - value
//   - placeholder
//   - disabled
//   - autofocus
function Input (data) {
  const attrs = data.attr || {}
  this.type = attrs.type || 'text'
  this.value = attrs.value
  this.placeholder = attrs.placeholder
  this.autofocus = attrs.autofocus && (attrs.autofocus !== 'false')
  Atomic.call(this, data)
}

Input.prototype = Object.create(Atomic.prototype)

Input.prototype.create = function () {
  const node = document.createElement('input')
  const uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
  this.className = 'weex-ipt-' + uuid
  this.styleId = 'weex-style-' + uuid
  node.classList.add(this.className)
  node.setAttribute('type', this.type)
  node.type = this.type
  // For the consistency of input component's width.
  // The date and time type of input will have a bigger width
  // when the 'box-sizing' is not set to 'border-box'
  node.classList.add('weex-element')
  this.value && (node.value = this.value)
  this.placeholder && (node.placeholder = this.placeholder)
  return node
}

Input.prototype.updateStyle = function (style) {
  Atomic.prototype.updateStyle.call(this, style)
  if (style && style.placeholderColor) {
    this.placeholderColor = style.placeholderColor
    this.setPlaceholderColor()
  }
}

Input.prototype.attr = {
  disabled: function (val) {
    this.node.disabled = val && val !== 'false'
  }
}

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

Input.prototype.setPlaceholderColor = function () {
  if (!this.placeholderColor) {
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
  const cssRule = 'color: ' + this.placeholderColor + ';'
  for (let i = 0, l = vendors.length; i < l; i++) {
    css += '.' + this.className + vendors[i] + '{'
           + cssRule + '}'
  }
  utils.appendStyle(css, this.styleId, true)
}

module.exports = Input

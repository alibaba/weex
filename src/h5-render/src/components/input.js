'use strict'

var Atomic = require('./atomic')
var utils = require('../utils')

// attrs:
//   - type: text|password|tel|email|url
//   - value
//   - placeholder
//   - disabled
//   - autofocus
function Input (data) {
  var attrs = data.attr || {}
  this.type = attrs.type || 'text'
  this.value = attrs.value
  this.placeholder = attrs.placeholder
  this.autofocus = attrs.autofocus && (attrs.autofocus !== 'false')
                    ? true
                    : false
  Atomic.call(this, data)
}

Input.prototype = Object.create(Atomic.prototype)

Input.prototype.create = function () {
  var node = document.createElement('input')
  var uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
  this.className = 'weex-ipt-' + uuid
  this.styleId = 'weex-style-' + uuid
  node.classList.add(this.className)
  node.setAttribute('type', this.type)
  node.type = this.type
  // For the consistency of input component's width.
  // The date and time type of input will have a bigger width
  // when the 'box-sizing' is not set to 'border-box'
  node.style['box-sizing'] = 'border-box'
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
                    ? true
                    : false
  }
}

Input.prototype.setPlaceholderColor = function () {
  if (!this.placeholderColor) {
    return
  }
  var vendors = [
    '::-webkit-input-placeholder',
    ':-moz-placeholder',
    '::-moz-placeholder',
    ':-ms-input-placeholder',
    ':placeholder-shown'
  ]
  var css = ''
  var cssRule = 'color: ' + this.placeholderColor + ';'
  for (var i = 0, l = vendors.length; i < l; i++) {
    css += '.' + this.className + vendors[i] + '{'
           + cssRule + '}'
  }
  utils.appendStyle(css, this.styleId, true)
}

module.exports = Input

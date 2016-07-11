'use strict'

const Atomic = require('./atomic')
const utils = require('../utils')
require('../styles/switch.css')

const defaults = {
  color: '#64bd63',
  secondaryColor: '#dfdfdf',
  jackColor: '#fff',
  jackSecondaryColor: null,
  className: 'weex-switch',
  disabledOpacity: 0.5,
  speed: '0.4s',
  width: 100,
  height: 60,
  // is width and height scalable ?
  scalable: false
}

// attrs:
//   - checked: if is checked.
//   - disabled: if true, this component is not available for interaction.
function Switch (data) {
  this.options = utils.extend({}, defaults)
  this.checked = data.attr.checked
      && data.attr.checked !== 'false'
  this.data = data
  this.width = this.options.width * data.scale
  this.height = this.options.height * data.scale
  Atomic.call(this, data)
}

Switch.prototype = Object.create(Atomic.prototype)

Switch.prototype.create = function () {
  const node = document.createElement('span')
  this.jack = document.createElement('small')
  node.appendChild(this.jack)
  node.className = this.options.className
  this.node = node
  this.attr.disabled.call(this, this.data.attr.disabled)
  return node
}

Switch.prototype.onAppend = function () {
  this.setSize()
  this.setPosition()
}

Switch.prototype.attr = {
  disabled: function (val) {
    this.disabled = val && val !== 'false'
    this.disabled ? this.disable() : this.enable()
  }
}

Switch.prototype.setSize = function () {
  const min = Math.min(this.width, this.height)
  const max = Math.max(this.width, this.height)
  this.node.style.width = max + 'px'
  this.node.style.height = min + 'px'
  this.node.style.borderRadius = min / 2 + 'px'
  this.jack.style.width
      = this.jack.style.height
      = min + 'px'
}

Switch.prototype.setPosition = function (clicked) {
  let checked = this.checked
  const node = this.node
  const jack = this.jack

  if (clicked && checked) {
    checked = false
  }
  else if (clicked && !checked) {
    checked = true
  }

  if (checked === true) {
    this.checked = true

    if (window.getComputedStyle) {
      jack.style.left = parseInt(window.getComputedStyle(node).width)
                        - parseInt(window.getComputedStyle(jack).width) + 'px'
    }
    else {
      jack.style.left = parseInt(node.currentStyle['width'])
                        - parseInt(jack.currentStyle['width']) + 'px'
    }

    this.options.color && this.colorize()
    this.setSpeed()
  }
  else {
    this.checked = false
    jack.style.left = 0
    node.style.boxShadow = 'inset 0 0 0 0 ' + this.options.secondaryColor
    node.style.borderColor = this.options.secondaryColor
    node.style.backgroundColor
        = (this.options.secondaryColor !== defaults.secondaryColor)
          ? this.options.secondaryColor
          : '#fff'
    jack.style.backgroundColor
        = (this.options.jackSecondaryColor !== this.options.jackColor)
          ? this.options.jackSecondaryColor
          : this.options.jackColor
    this.setSpeed()
  }
}

Switch.prototype.colorize = function () {
  const nodeHeight = this.node.offsetHeight / 2

  this.node.style.backgroundColor = this.options.color
  this.node.style.borderColor = this.options.color
  this.node.style.boxShadow = 'inset 0 0 0 '
                              + nodeHeight
                              + 'px '
                              + this.options.color
  this.jack.style.backgroundColor = this.options.jackColor
}

Switch.prototype.setSpeed = function () {
  let switcherProp = {}
  const jackProp = {
    'background-color': this.options.speed,
    left: this.options.speed.replace(/[a-z]/, '') / 2 + 's'
  }

  if (this.checked) {
    switcherProp = {
      border: this.options.speed,
      'box-shadow': this.options.speed,
      'background-color': this.options.speed.replace(/[a-z]/, '') * 3 + 's'
    }
  }
  else {
    switcherProp = {
      border: this.options.speed,
      'box-shadow': this.options.speed
    }
  }

  utils.transitionize(this.node, switcherProp)
  utils.transitionize(this.jack, jackProp)
}

Switch.prototype.disable = function () {
  !this.disabled && (this.disabled = true)
  this.node.style.opacity = defaults.disabledOpacity
  this.node.removeEventListener('click', this.getClickHandler())
}

Switch.prototype.enable = function () {
  this.disabled && (this.disabled = false)
  this.node.style.opacity = 1
  this.node.addEventListener('click', this.getClickHandler())
}

Switch.prototype.getClickHandler = function () {
  if (!this._clickHandler) {
    this._clickHandler = function () {
      this.setPosition(true)
      this.dispatchEvent('change', {
        value: this.checked
      })
    }.bind(this)
  }
  return this._clickHandler
}

Switch.prototype.style
  = utils.extend(Object.create(Atomic.prototype.style), {
    width: function (val) {
      if (!this.options.scalable) {
        return
      }
      val = parseFloat(val)
      if (isNaN(val) || val < 0) {
        val = this.options.width
      }
      this.width = val * this.data.scale
      this.setSize()
    },

    height: function (val) {
      if (!this.options.scalable) {
        return
      }
      val = parseFloat(val)
      if (isNaN(val) || val < 0) {
        val = this.options.height
      }
      this.height = val * this.data.scale
      this.setSize()
    }
  })

Switch.prototype.event = {
  change: {
    updator () {
      return {
        attrs: {
          checked: this.checked
        }
      }
    },
    extra () {
      return {
        value: this.checked
      }
    }
  }
}

module.exports = Switch

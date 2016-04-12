'use strict'

var Atomic = require('./atomic')
var utils = require('../utils')
require('../styles/switch.scss')

var defaults = {
  color: '#64bd63'
  , secondaryColor: '#dfdfdf'
  , jackColor: '#fff'
  , jackSecondaryColor: null
  , className: 'weex-switch'
  , disabledOpacity: 0.5
  , speed: '0.4s'
  , size: 'default'
}

// attrs:
//   - checked: if is checked.
//   - disabled: if true, this component is not available for interaction.
function Switch (data) {
  this.options = utils.extend({}, defaults)
  this.checked = data.attr.checked
      && data.attr.checked !== 'false' ? true : false
  Atomic.call(this, data)
}

Switch.prototype = Object.create(Atomic.prototype)

Switch.prototype.create = function () {
  var node = document.createElement('span')
  this.jack = document.createElement('small')
  node.appendChild(this.jack)
  node.className = this.options.className
  this.node = node

  this.attr.disabled.call(this, this.data.attr.disabled)
  // this.attr.checked.call(this, data.attr.checked)

  // this.setSize()
  this.setPosition()
  // this.markAsSwitched()
  // this.handleChange()
  // this.handleClick()
  // setTimeout(function () {
  //   this.switchery = new Switchery(node, { disabled: false })
  // }.bind(this), 25)
  // var uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
  // this.className = 'weex-slct-' + uuid
  // this.styleId = 'weex-style-' + uuid
  // node.classList.add(this.className)
  // For the consistency of input component's width.
  // The date and time type of input will have a bigger width
  // when the 'box-sizing' is not set to 'border-box'
  // node.style['box-sizing'] = 'border-box'
  return node
}

Switch.prototype.attr = {
  disabled: function (val) {
    this.disabled = val && val !== 'false'
                    ? true
                    : false
    this.disabled ? this.disable() : this.enable()
  }
}

Switch.prototype.setPosition = function (clicked) {
  var checked = this.checked
  var node = this.node
  var jack = this.jack

  if (clicked && checked) {
    checked = false
  } else if (clicked && !checked) {
    checked = true
  }

  if (checked === true) {
    this.checked = true

    if (window.getComputedStyle) {
      jack.style.left = parseInt(window.getComputedStyle(node).width)
                        - parseInt(window.getComputedStyle(jack).width) + 'px'
    } else {
      jack.style.left = parseInt(node.currentStyle['width'])
                        - parseInt(jack.currentStyle['width']) + 'px'
    }

    this.options.color && this.colorize()
    this.setSpeed()
  } else {
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
  var nodeHeight = this.node.offsetHeight / 2

  this.node.style.backgroundColor = this.options.color
  this.node.style.borderColor = this.options.color
  this.node.style.boxShadow = 'inset 0 0 0 '
                              + nodeHeight
                              + 'px '
                              + this.options.color
  this.jack.style.backgroundColor = this.options.jackColor
}

Switch.prototype.setSpeed = function () {
  var switcherProp = {}
  var jackProp = {
      'background-color': this.options.speed
      , left: this.options.speed.replace(/[a-z]/, '') / 2 + 's'
    }

  if (this.checked) {
    switcherProp = {
      border: this.options.speed
      , 'box-shadow': this.options.speed
      , 'background-color': this.options.speed.replace(/[a-z]/, '') * 3 + 's'
    }
  } else {
    switcherProp = {
      border: this.options.speed
      , 'box-shadow': this.options.speed
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
      // var parent = this.node.parentNode.tagName.toLowerCase()
      // var labelParent = (parent === 'label') ? false : true
      this.setPosition(true)
      this.dispatchEvent('change', {
        checked: this.checked
      })
    }.bind(this)
  }
  return this._clickHandler
}

module.exports = Switch

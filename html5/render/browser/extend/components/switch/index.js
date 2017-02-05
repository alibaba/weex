'use strict'

import './switch.css'

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

function transitionize (element, props) {
  const transitions = []
  for (const key in props) {
    transitions.push(key + ' ' + props[key])
  }
  element.style.transition = transitions.join(', ')
  element.style.webkitTransition = transitions.join(', ')
}

function setSize (comp) {
  const min = Math.min(comp.width, comp.height)
  const max = Math.max(comp.width, comp.height)
  comp.node.style.width = max + 'px'
  comp.node.style.height = min + 'px'
  comp.node.style.borderRadius = min / 2 + 'px'
  comp.jack.style.width
      = comp.jack.style.height
      = min + 'px'
}

function setPosition (comp, clicked) {
  let checked = comp.checked
  const node = comp.node
  const jack = comp.jack

  if (clicked && checked) {
    checked = false
  }
  else if (clicked && !checked) {
    checked = true
  }

  if (checked === true) {
    comp.checked = true

    if (window.getComputedStyle) {
      jack.style.left = parseInt(window.getComputedStyle(node).width)
                        - parseInt(window.getComputedStyle(jack).width) + 'px'
    }
    else {
      jack.style.left = parseInt(node.currentStyle['width'])
                        - parseInt(jack.currentStyle['width']) + 'px'
    }

    comp.options.color && colorize(comp)
    setSpeed(comp)
  }
  else {
    comp.checked = false
    jack.style.left = 0
    node.style.boxShadow = 'inset 0 0 0 0 ' + comp.options.secondaryColor
    node.style.borderColor = comp.options.secondaryColor
    node.style.backgroundColor
        = (comp.options.secondaryColor !== defaults.secondaryColor)
          ? comp.options.secondaryColor
          : '#fff'
    jack.style.backgroundColor
        = (comp.options.jackSecondaryColor !== comp.options.jackColor)
          ? comp.options.jackSecondaryColor
          : comp.options.jackColor
    setSpeed(comp)
  }
}

function setSpeed (comp) {
  let switcherProp = {}
  const jackProp = {
    'background-color': comp.options.speed,
    left: comp.options.speed.replace(/[a-z]/, '') / 2 + 's'
  }

  if (comp.checked) {
    switcherProp = {
      border: comp.options.speed,
      'box-shadow': comp.options.speed,
      'background-color': comp.options.speed.replace(/[a-z]/, '') * 3 + 's'
    }
  }
  else {
    switcherProp = {
      border: comp.options.speed,
      'box-shadow': comp.options.speed
    }
  }

  transitionize(comp.node, switcherProp)
  transitionize(comp.jack, jackProp)
}

function colorize (comp) {
  const nodeHeight = comp.node.offsetHeight / 2

  comp.node.style.backgroundColor = comp.options.color
  comp.node.style.borderColor = comp.options.color
  comp.node.style.boxShadow = 'inset 0 0 0 '
                              + nodeHeight
                              + 'px '
                              + comp.options.color
  comp.jack.style.backgroundColor = comp.options.jackColor
}

function getClickHandler (comp) {
  if (!comp._clickHandler) {
    comp._clickHandler = function () {
      setPosition(comp, true)
      comp.dispatchEvent('change', {
        value: comp.checked
      })
    }
  }
  return comp._clickHandler
}

const proto = {
  create () {
    const node = document.createElement('span')
    this.jack = document.createElement('small')
    node.appendChild(this.jack)
    node.className = this.options.className
    this.node = node
    this.attr.disabled.call(this, this.data.attr.disabled)
    return node
  },

  onAppend () {
    setSize(this)
    setPosition(this)
  },

  enable () {
    this.disabled && (this.disabled = false)
    this.node.style.opacity = 1
    this.node.addEventListener('click', getClickHandler(this))
  },

  disable () {
    !this.disabled && (this.disabled = true)
    this.node.style.opacity = defaults.disabledOpacity
    this.node.removeEventListener('click', getClickHandler(this))
  }
}

const attr = {
  disabled: function (val) {
    this.disabled = val && val !== 'false'
    this.disabled ? this.disable() : this.enable()
  }
}

const style = {
  width: function (val) {
    if (!this.options.scalable) {
      return
    }
    val = parseFloat(val)
    if (isNaN(val) || val < 0) {
      val = this.options.width
    }
    this.width = val
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
    this.height = val
    this.setSize()
  }
}

const event = {
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

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

  // attrs:
  //   - checked: if is checked.
  //   - disabled: if true, this component is not available for interaction.
  function Switch (data) {
    this.options = extend({}, defaults)
    this.checked = data.attr.checked
        && data.attr.checked !== 'false'
    this.data = data
    this.width = this.options.width
    this.height = this.options.height
    Atomic.call(this, data)
  }
  Switch.prototype = Object.create(Atomic.prototype)
  extend(Switch.prototype, proto)
  extend(Switch.prototype, { attr })
  extend(Switch.prototype, {
    style: extend(Object.create(Atomic.prototype.style), style)
  })
  extend(Switch.prototype, { event })

  Weex.registerComponent('switch', Switch)
}

export default { init }

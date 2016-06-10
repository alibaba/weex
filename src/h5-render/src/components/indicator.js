'use strict'

var extend = require('../utils').extend
var config = require('../config')
var Atomic = require('./atomic')
var Component = require('./component')

require('../styles/indicator.css')

var DEFAULT_ITEM_COLOR = '#999'
var DEFAULT_ITEM_SELECTED_COLOR = '#0000ff'
var DEFAULT_ITEM_SIZE = 20
var DEFAULT_MARGIN_SIZE = 10

var DEAULT_ALIGN_ITEMS = 'center'
var DEFAULT_JUSTIFY_CONTENT = 'center'

var DEFAULT_DIRECTION = 'row'

// Style supported:
//   position: (default - absolute)
//   itemColor: color of indicator dots
//   itemSelectedColor: color of the selected indicator dot
//   itemSize: size of indicators
//   other layout styles
function Indicator (data) {
  this.direction = DEFAULT_DIRECTION
  this.amount = data.extra.amount
  this.index = data.extra.index
  this.sliderWidth = data.extra.width
  this.sliderHeight = data.extra.height
  var styles = data.style || {}
  this.data = data
  !styles.width && (styles.width = this.sliderWidth)
  !styles.height && (styles.height = this.sliderHeight)
  !styles.alignItems && (styles.alignItems = DEAULT_ALIGN_ITEMS)
  !styles.justifyContent && (styles.justifyContent = DEFAULT_JUSTIFY_CONTENT)
  !styles.flexDirection && (styles.flexDirection = this.direction)
  this.itemColor = styles.itemColor || DEFAULT_ITEM_COLOR
  this.itemSelectedColor = styles.itemSelectedColor
    || DEFAULT_ITEM_SELECTED_COLOR
  this.items = []
  Atomic.call(this, data)
}

Indicator.prototype = Object.create(Atomic.prototype)

Indicator.prototype.create = function () {
  var node = document.createElement('div')
  node.classList.add('weex-indicators', 'weex-container')
  node.style.position = 'absolute'
  this.node = node
  this.updateStyle({
    left: 0,
    top: 0,
    itemSize: DEFAULT_ITEM_SIZE
  })
  return node
}

Indicator.prototype.createChildren = function () {
  var root = document.createDocumentFragment()
  for (var i = 0; i < this.amount; i++) {
    var indicator = document.createElement('div')
    indicator.classList.add('weex-indicator')
    indicator.style.boxSizing = 'border-box'
    indicator.style.margin = '0 '
                            + (DEFAULT_MARGIN_SIZE * this.data.scale)
                            + 'px'
    indicator.style.width = this.itemSize + 'px'
    indicator.style.height = this.itemSize + 'px'
    indicator.setAttribute('index', i)
    if (this.index === i) {
      indicator.classList.add('active')
      indicator.style.backgroundColor = this.itemSelectedColor
    } else {
      indicator.style.backgroundColor = this.itemColor
    }
    indicator.addEventListener('click', this._clickHandler.bind(this, i))
    this.items[i] = indicator
    root.appendChild(indicator)
  }
  this.node.appendChild(root)
}

Indicator.prototype.resetColor = function () {
  var len = this.items.length
  if (typeof this.index !== 'undefined' && len > this.index) {
    for (var i = 0; i < len; i++) {
      var item = this.items[i]
      if (this.index === i) {
        item.classList.add('active')
        item.style.backgroundColor = this.itemSelectedColor
      } else {
        item.style.backgroundColor = this.itemColor
      }
    }
  }
}

Indicator.prototype.style
    = extend(Object.create(Atomic.prototype.style), {
  itemColor: function (val) {
    this.itemColor = val || DEFAULT_ITEM_COLOR
    this.resetColor()
  },

  itemSelectedColor: function (val) {
    this.itemSelectedColor = val || DEFAULT_ITEM_SELECTED_COLOR
    this.resetColor()
  },

  itemSize: function (val) {
    val = parseInt(val) * this.data.scale
          || DEFAULT_ITEM_SIZE * this.data.scale
    this.itemSize = val
    this.node.style.height = val + 'px'
    for (var i = 0, l = this.items.length; i < l; i++) {
      this.items[i].style.width = val + 'px'
      this.items[i].style.height = val + 'px'
    }
  }
})

Indicator.prototype.setIndex = function (idx) {
  if (idx >= this.amount) {
    return
  }
  var prev = this.items[this.index]
  var cur = this.items[idx]
  prev.classList.remove('active')
  prev.style.backgroundColor = this.itemColor
  cur.classList.add('active')
  cur.style.backgroundColor = this.itemSelectedColor
  this.index = idx
}

Indicator.prototype._clickHandler = function (idx) {
  this.slider.slideTo(idx)
}

module.exports = Indicator

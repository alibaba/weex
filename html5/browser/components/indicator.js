'use strict'

const extend = require('../utils').extend
// const config = require('../config')
const Atomic = require('./atomic')
// const Component = require('./component')

require('../styles/indicator.css')

const DEFAULT_ITEM_COLOR = '#999'
const DEFAULT_ITEM_SELECTED_COLOR = '#0000ff'
const DEFAULT_ITEM_SIZE = 20
const DEFAULT_MARGIN_SIZE = 10

// Style supported:
//   position: (default - absolute)
//   itemColor: color of indicator dots
//   itemSelectedColor: color of the selected indicator dot
//   itemSize: size of indicators
//   other layout styles
function Indicator (data) {
  this.direction = 'row' // 'column' is not temporarily supported.
  this.amount = data.extra.amount
  this.index = data.extra.index
  this.sliderWidth = data.extra.width
  this.sliderHeight = data.extra.height
  const styles = data.style || {}
  this.data = data
  this.style.width.call(this, styles.width)
  this.style.height.call(this, styles.height)
  this.itemColor = styles.itemColor || DEFAULT_ITEM_COLOR
  this.itemSelectedColor = styles.itemSelectedColor
    || DEFAULT_ITEM_SELECTED_COLOR
  this.items = []
  Atomic.call(this, data)
}

Indicator.prototype = Object.create(Atomic.prototype)

Indicator.prototype.create = function () {
  const node = document.createElement('div')
  node.classList.add('weex-indicators')
  node.classList.add('weex-element')
  node.style.position = 'absolute'
  this.node = node
  this.style.itemSize.call(this, 0)
  this.updateStyle({
    left: 0,
    top: 0,
    itemSize: 0
  })
  return node
}

Indicator.prototype.createChildren = function () {
  const root = document.createDocumentFragment()
  for (let i = 0; i < this.amount; i++) {
    const indicator = document.createElement('div')
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
    }
    else {
      indicator.style.backgroundColor = this.itemColor
    }
    indicator.addEventListener('click', this._clickHandler.bind(this, i))
    this.items[i] = indicator
    root.appendChild(indicator)
  }
  this.node.appendChild(root)
}

Indicator.prototype.resetColor = function () {
  const len = this.items.length
  if (typeof this.index !== 'undefined' && len > this.index) {
    for (let i = 0; i < len; i++) {
      const item = this.items[i]
      if (this.index === i) {
        item.classList.add('active')
        item.style.backgroundColor = this.itemSelectedColor
      }
      else {
        item.style.backgroundColor = this.itemColor
      }
    }
  }
}

Indicator.prototype.style = extend(Object.create(Atomic.prototype.style), {
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
    for (let i = 0, l = this.items.length; i < l; i++) {
      this.items[i].style.width = val + 'px'
      this.items[i].style.height = val + 'px'
    }
  },

  width: function (val) {
    val = parseInt(val) * this.data.scale || parseInt(this.sliderWidth)
    this.virtualWrapperWidth = val
  },

  height: function (val) {
    val = parseInt(val) * this.data.scale || parseInt(this.sliderHeight)
    this.virtualWrapperHeight = val
  },

  top: function (val) {
    val = this.virtualWrapperHeight / 2 - this.itemSize / 2
        + val * this.data.scale
    this.node.style.bottom = ''
    this.node.style.top = val + 'px'
  },

  bottom: function (val) {
    val = this.virtualWrapperHeight / 2 - this.itemSize / 2
        + val * this.data.scale
    this.node.style.top = ''
    this.node.style.bottom = val + 'px'
  },

  left: function (val) {
    val = this.virtualWrapperWidth / 2
          - (this.itemSize + 2 * DEFAULT_MARGIN_SIZE * this.data.scale)
              * this.amount / 2
          + val * this.data.scale
    this.node.style.right = ''
    this.node.style.left = val + 'px'
  },

  right: function (val) {
    val = this.virtualWrapperWidth / 2
          - (this.itemSize + 2 * DEFAULT_MARGIN_SIZE * this.data.scale)
              * this.amount / 2
          + val * this.data.scale
    this.node.style.left = ''
    this.node.style.right = val + 'px'
  }
})

Indicator.prototype.setIndex = function (idx) {
  if (idx >= this.amount) {
    return
  }
  const prev = this.items[this.index]
  const cur = this.items[idx]
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

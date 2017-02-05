'use strict'

import './indicator.css'

const DEFAULT_ITEM_COLOR = '#999'
const DEFAULT_ITEM_SELECTED_COLOR = '#0000ff'
const DEFAULT_ITEM_SIZE = 20
const DEFAULT_MARGIN_SIZE = 10

function resetColor (indicator) {
  const len = indicator.items.length
  if (typeof indicator.index !== 'undefined' && len > indicator.index) {
    for (let i = 0; i < len; i++) {
      const item = indicator.items[i]
      if (indicator.index === i) {
        item.classList.add('active')
        item.style.backgroundColor = indicator.itemSelectedColor
      }
      else {
        item.style.backgroundColor = indicator.itemColor
      }
    }
  }
}

function handleClick (indicator, idx, e) {
  indicator.slider.slideTo(idx)
}

const proto = {
  create () {
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
  },

  createChildren () {
    const root = document.createDocumentFragment()
    for (let i = 0; i < this.amount; i++) {
      const indicator = document.createElement('div')
      indicator.classList.add('weex-indicator')
      indicator.style.boxSizing = 'border-box'
      indicator.style.margin = '0 '
                              + DEFAULT_MARGIN_SIZE
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
      indicator.addEventListener('click', handleClick.bind(null, this, i))
      this.items[i] = indicator
      root.appendChild(indicator)
    }
    this.node.appendChild(root)
  },

  setIndex (idx) {
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
}

const style = {
  itemColor (val) {
    this.itemColor = val || DEFAULT_ITEM_COLOR
    resetColor(this)
  },

  itemSelectedColor (val) {
    this.itemSelectedColor = val || DEFAULT_ITEM_SELECTED_COLOR
    resetColor(this)
  },

  itemSize (val) {
    val = parseInt(val) || DEFAULT_ITEM_SIZE
    this.itemSize = val
    this.node.style.height = val + 'px'
    for (let i = 0, l = this.items.length; i < l; i++) {
      this.items[i].style.width = val + 'px'
      this.items[i].style.height = val + 'px'
    }
  },

  width (val) {
    val = parseInt(val) || parseInt(this.sliderWidth)
    this.virtualWrapperWidth = val
  },

  height (val) {
    val = parseInt(val) || parseInt(this.sliderHeight)
    this.virtualWrapperHeight = val
  },

  top (val) {
    val = this.virtualWrapperHeight / 2 - this.itemSize / 2 + val
    this.node.style.bottom = ''
    this.node.style.top = val + 'px'
  },

  bottom (val) {
    val = this.virtualWrapperHeight / 2 - this.itemSize / 2 + val
    this.node.style.top = ''
    this.node.style.bottom = val + 'px'
  },

  left (val) {
    val = this.virtualWrapperWidth / 2
          - (this.itemSize + 2 * DEFAULT_MARGIN_SIZE) * this.amount / 2 + val
    this.node.style.right = ''
    this.node.style.left = val + 'px'
  },

  right (val) {
    val = this.virtualWrapperWidth / 2
          - (this.itemSize + 2 * DEFAULT_MARGIN_SIZE) * this.amount / 2 + val
    this.node.style.left = ''
    this.node.style.right = val + 'px'
  }
}

function init (Weex) {
  const Atomic = Weex.Atomic
  const extend = Weex.utils.extend

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
  extend(Indicator.prototype, proto)
  extend(Indicator.prototype, {
    style: extend(Object.create(Atomic.prototype.style), style)
  })

  Weex.registerComponent('indicator', Indicator)
}

export default { init }

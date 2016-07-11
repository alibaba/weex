/* global lib */

'use strict'

const Atomic = require('./atomic')
const LazyLoad = require('../lazyLoad')
// const config = require('../config')
const utils = require('../utils')

require('../styles/image.css')

const DEFAULT_SIZE = 200
const RESIZE_MODES = ['stretch', 'cover', 'contain']
const DEFAULT_RESIZE_MODE = 'stretch'

/**
 * resize: 'cover' | 'contain' | 'stretch', default is 'stretch'
 * src: url
 */

function Image (data) {
  this.resize = DEFAULT_RESIZE_MODE
  Atomic.call(this, data)
}

Image.prototype = Object.create(Atomic.prototype)

Image.prototype.create = function () {
  const node = document.createElement('div')
  node.classList.add('weex-img', 'weex-element')
  return node
}

Image.prototype.attr = {
  src: function (val) {
    if (!this.src) {
      this.src = lib.img.defaultSrc
      this.node.style.backgroundImage = 'url(' + this.src + ')'
    }
    LazyLoad.makeImageLazy(this.node, val)
  },

  resize: function (val) {
    if (RESIZE_MODES.indexOf(val) === -1) {
      val = 'stretch'
    }
    this.node.style.backgroundSize = val === 'stretch'
                                    ? '100% 100%'
                                    : val
  }
}

Image.prototype.style = utils.extend(Object.create(Atomic.prototype.style), {
  width: function (val) {
    val = parseFloat(val) * this.data.scale
    if (val < 0 || isNaN(val)) {
      val = DEFAULT_SIZE
    }
    this.node.style.width = val + 'px'
  },

  height: function (val) {
    val = parseFloat(val) * this.data.scale
    if (val < 0 || isNaN(val)) {
      val = DEFAULT_SIZE
    }
    this.node.style.height = val + 'px'
  }
})

Image.prototype.clearAttr = function () {
  this.src = ''
  this.node.style.backgroundImage = ''
}

module.exports = Image

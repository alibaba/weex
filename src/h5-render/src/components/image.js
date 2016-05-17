'use strict'

var Atomic = require('./atomic')
var LazyLoad = require('../lazyLoad')
var config = require('../config')
var utils = require('../utils')

var DEFAULT_SIZE = 200
var RESIZE_MODES = ['cover', 'contain'] // not temporarily supported

/**
 * resize=cover|contain|stretch v1.4 temporarily not supported
 * src=url
 */

function Image (data) {
  var mode
  var attr = data.attr
  attr && (mode = attr.resize || attr.resizeMode)
  if (RESIZE_MODES.indexOf(mode) !== -1) {
    this.mode = mode
    // TODO: resize-mode is not temporarily supported.
  }
  Atomic.call(this, data)
}

Image.prototype = Object.create(Atomic.prototype)

Image.prototype.create = function () {
  var node = document.createElement('img')
  node.classList.add('weex-element')
  node.style.display = 'block'
  node.style.outline = 'none'
  return node
}

Image.prototype.attr = {
  src: function (value) {
    if (!this.node.src) {
      this.node.src = lib.img.defaultSrc
    }
    LazyLoad.makeImageLazy(this.node, value)
  }
}

Image.prototype.style = utils.extend(Object.create(Atomic.prototype.style), {
  width: function (val) {
    val = parseFloat(val) * this.data.scale
    if (val < 0 || val !== val) {
      val = DEFAULT_SIZE
    }
    this.node.style.width = val + 'px'
  },

  height: function (val) {
    val = parseFloat(val) * this.data.scale
    if (val < 0 || val !== val) {
      val = DEFAULT_SIZE
    }
    this.node.style.height = val + 'px'
  }
})

Image.prototype.clearAttr = function () {
  this.node.src = ''
}

module.exports = Image

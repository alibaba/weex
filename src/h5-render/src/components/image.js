'use strict'

var Atomic = require('./atomic')
var LazyLoad = require('../lazyLoad')
var config = require('../config')

var DEFAULT_SIZE = 200
var RESIZE_MODES = ['cover', 'contain'] // not temporarily supported

/**
 * resize=cover|contain|stretch v1.4 temporarily not supported
 * src=url
 */

function Image (data) {
  this.width = data.style && data.style.width
               ? (data.style.width + '').replace(/[^\d]/g, '')
               : DEFAULT_SIZE
  this.height = data.style && data.style.height
               ? (data.style.height + '').replace(/[^\d]/g, '')
               : DEFAULT_SIZE
  this.width *= data.scale
  this.height *= data.scale
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

Image.prototype.clearAttr = function () {
  this.node.src = ''
}

module.exports = Image

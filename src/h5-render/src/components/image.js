'use strict'

var Atomic = require('./atomic')
var LazyLoad = require('../lazyLoad')
var config = require('../config')
var utils = require('../utils')

require('../styles/image.css')

var DEFAULT_SIZE = 200
var RESIZE_MODES = ['stretch', 'cover', 'contain']
var DEFAULT_RESIZE_MODE = 'stretch'

var VALID_TYPES = ['div', 'li']

/**
 * resize: 'cover' | 'contain' | 'stretch', default is 'stretch'
 * src: url
 */

function Image (data, nodeType) {
  this.resize = DEFAULT_RESIZE_MODE
  Atomic.call(this, data, nodeType)
}

Image.prototype = Object.create(Atomic.prototype)

Image.prototype.create = function (nodeType) {
  if (!nodeType || VALID_TYPES.indexOf(nodeType) === -1) {
    nodeType = 'div'
  }
  var node = document.createElement(nodeType)
  node.classList.add('weex-img')
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
  this.src = ''
  this.node.style.backgroundImage = ''
}

module.exports = Image

'use strict'

var Atomic = require('./atomic')
var LazyLoad = require('../lazyLoad')
var config = require('../config')
var utils = require('../utils')

require('../styles/image.css')

var DEFAULT_SIZE = 200
var RESIZE_MODES = ['stretch', 'cover', 'contain']
var DEFAULT_RESIZE_MODE = 'stretch'

/**
 * resize: 'cover' | 'contain' | 'stretch', default is 'stretch'
 * src: url
 */

function Image (data) {
  this.width = DEFAULT_SIZE
  this.height = DEFAULT_SIZE
  this.resize = DEFAULT_RESIZE_MODE
  Atomic.call(this, data)
}

Image.prototype = Object.create(Atomic.prototype)

Image.prototype.create = function () {
  var node = document.createElement('div')
  this.img = document.createElement('img')
  node.appendChild(this.img)
  node.classList.add('weex-img-wrap')
  node.style.overflow = 'hidden'
  return node
}

Image.prototype.attr = {
  src: function (val) {
    if (!this.img.src) {
      this.img.src = lib.img.defaultSrc
    }
    LazyLoad.makeImageLazy(this.img, val)
    this.resetImageSize()
  },

  resize: function (val) {
    if (RESIZE_MODES.indexOf(val) === -1) {
      val = 'stretch'
    }
    this.resize = val
    this.resetImageSize()
  }
}

Image.prototype.resetImageSize = function () {
  this[this.resize + 'Image']()
}

Image.prototype.getOrignalSize = function () {
  this.img.style.position = 'absolute'
  this.img.style.width = ''
  this.img.style.height = ''
  var size = {
    width: this.img.width,
    height: this.img.height
  }
  this.img.style.position = ''
  return size
}

Image.prototype.stretchImage = function () {
  this.img.style.width = this.width + 'px'
  this.img.style.height = this.height + 'px'
}

Image.prototype.containImage = function () {
  var sizeObj = this.getOriginalSize()
  var ratioX = this.width / sizeObj.width
  var ratioY = this.height / sizeObj.height
  var ratio = Math.min(ratioX, ratioY)
  this.img.style.width = this.originalWidth * ratio + 'px'
  this.img.style.height = this.originalHeight * ratio + 'px'
}

Image.prototype.coverImage = function () {
  var sizeObj = this.getOriginalSize()
  var ratioX = this.width / sizeObj.width
  var ratioY = this.height / sizeObj.height
  var ratio = Math.max(ratioX, ratioY)
  this.img.style.width = this.originalWidth * ratio + 'px'
  this.img.style.height = this.originalHeight * ratio + 'px'
}

Image.prototype.style = utils.extend(Object.create(Atomic.prototype.style), {
  width: function (val) {
    val = parseFloat(val) * this.data.scale
    if (val < 0 || val !== val) {
      val = DEFAULT_SIZE
    }
    this.width = val
    this.node.style.width = val + 'px'
    this.resetImageSize()
  },

  height: function (val) {
    val = parseFloat(val) * this.data.scale
    if (val < 0 || val !== val) {
      val = DEFAULT_SIZE
    }
    this.height = val
    this.node.style.height = val + 'px'
    this.resetImageSize()
  }
})

Image.prototype.clearAttr = function () {
  this.node.src = ''
}

module.exports = Image

'use strict'

const Component = require('./component')
const utils = require('../utils')

const ID_PREFIX = 'weex_embed_'

function _generateId () {
  return ID_PREFIX + utils.getRandom(10)
}

function Embed (data, nodeType) {
  const attr = data.attr
  if (attr) {
    this.source = attr.src
    this.loader = attr.loader || 'xhr'
    this.jsonpCallback = attr.jsonpCallback
  }
  Component.call(this, data, nodeType)
}

Embed.prototype = Object.create(Component.prototype)

Embed.prototype.create = function () {
  const node = document.createElement('div')
  node.id = this.id
  node.style.overflow = 'scroll'
  return node
}

Embed.prototype.initWeex = function () {
  this.id = _generateId()
  this.node.id = this.id
  const config = {
    appId: this.id,
    source: this.source,
    bundleUrl: this.source,
    loader: this.loader,
    jsonpCallback: this.jsonpCallback,
    width: this.node.getBoundingClientRect().width,
    rootId: this.id,
    embed: true
  }
  window.weex.init(config)
}

Embed.prototype.destroyWeex = function () {
  this.id && window.destroyInstance(this.id)
  // TODO: unbind events and clear doms.
  this.node.innerHTML = ''
}

Embed.prototype.reloadWeex = function () {
  if (this.id) {
    this.destroyWeex()
    this.id = null
    this.node.id = null
    this.node.innerHTML = ''
  }
  this.initWeex()
}

// not recommended, because of the leak of memory.
Embed.prototype.attr = {
  src: function (value) {
    this.source = value
    this.reloadWeex()
  }
}

module.exports = Embed

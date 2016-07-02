'use strict'

const Component = require('./component')
const utils = require('../utils')
const logger = require('../logger')

require('../styles/loading.css')

const parents = ['scroller', 'list', 'vlist']

const DEFAULT_CLAMP = 130
const DEFAULT_ALIGN_ITEMS = 'center'
const DEFAULT_JUSTIFY_CONTENT = 'center'

function Loading (data) {
  this.clamp = (data.style.height || DEFAULT_CLAMP) * data.scale
  !data.style.alignItems && (data.style.alignItems = DEFAULT_ALIGN_ITEMS)
  !data.style.justifyContent
    && (data.style.justifyContent = DEFAULT_JUSTIFY_CONTENT)
  Component.call(this, data)
}

Loading.prototype = Object.create(Component.prototype)

Loading.prototype.create = function () {
  const node = document.createElement('div')
  node.classList.add('weex-container', 'weex-loading')
  return node
}

Loading.prototype.onAppend = function () {
  const parent = this.getParent()
  const self = this
  const scrollWrapHeight = parent.node.getBoundingClientRect().height
  if (parents.indexOf(parent.data.type) === -1) {
    // not in a scroller or a list
    return
  }
  this.loadingPlaceholder = document.createElement('div')
  this.loadingPlaceholder.classList.add('weex-loading-placeholder')
  this.loadingPlaceholder.style.display = 'none'
  this.loadingPlaceholder.style.width = '0px'
  this.loadingPlaceholder.style.height = '0px'
  const scrollElement = parent.scrollElement || parent.listElement
  scrollElement.insertBefore(this.loadingPlaceholder, this.node)
  parent.node.appendChild(this.node)
  parent.scroller.addEventListener('pullup', function (e) {
    if (self.isLoading) {
      return
    }
    const obj = e.scrollObj
    self.adjustHeight(Math.abs(
      obj.getScrollHeight() - obj.getScrollTop() - scrollWrapHeight))
    if (!self.display) {
      self.show()
    }
  })
  parent.scroller.addEventListener('pullupend', function (e) {
    if (self.isLoading) {
      return
    }
    self.handleLoading(e)
  })
}

Loading.prototype.adjustHeight = function (val) {
  this.node.style.height = val + 'px'
}

Loading.prototype.handleLoading = function (e) {
  this.node.style.height = this.clamp + 'px'
  this.dispatchEvent('loading')
  this.isLoading = true
}

Loading.prototype.show = function () {
  this.display = true
  this.node.style.display = '-webkit-box'
  this.node.style.display = '-webkit-flex'
  this.node.style.display = 'flex'
}

Loading.prototype.hide = function () {
  this.display = false
  this.node.style.display = 'none'
  this.isLoading = false
}

Loading.prototype.attr = {
  display: function (val) {
    if (val === 'show') {
      setTimeout(function () {
        this.show()
      }.bind(this), 0)
    }
    else if (val === 'hide') {
      setTimeout(function () {
        this.hide()
      }.bind(this), 0)
    }
    else {
      logger.error('attr \'display\' of <refresh>\': value '
        + val
        + ' is invalid. Should be \'show\' or \'hide\'')
    }
  }
}

Loading.prototype.style = utils.extend(
  Object.create(Component.prototype.style), {
    height: function (val) {
      val = parseFloat(val)
      if (Number.isNaN(val) || val < 0) {
        return logger.warn('<loading>\'s height (' + val + ') is invalid.')
      }
      this.clamp = val * this.data.scale
    }
  })

module.exports = Loading

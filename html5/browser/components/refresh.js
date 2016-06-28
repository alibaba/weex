'use strict'

const Component = require('./component')
const utils = require('../utils')
const logger = require('../logger')

require('../styles/refresh.css')

const parents = ['scroller', 'list', 'vlist']

// Only if pulldown offset is larger than this value can this
// component trigger the 'refresh' event, otherwise just recover
// to the start point.
const DEFAULT_CLAMP = 130
const DEFAULT_ALIGN_ITEMS = 'center'
const DEFAULT_JUSTIFY_CONTENT = 'center'

function Refresh (data) {
  this.isRefreshing = false
  this.clamp = (data.style.height || DEFAULT_CLAMP) * data.scale
  !data.style.alignItems && (data.style.alignItems = DEFAULT_ALIGN_ITEMS)
  !data.style.justifyContent
    && (data.style.justifyContent = DEFAULT_JUSTIFY_CONTENT)
  Component.call(this, data)
}

Refresh.prototype = Object.create(Component.prototype)

Refresh.prototype.create = function () {
  const node = document.createElement('div')
  node.classList.add('weex-container', 'weex-refresh')
  return node
}

Refresh.prototype.onAppend = function () {
  const parent = this.getParent()
  const self = this
  if (parents.indexOf(parent.data.type) === -1) {
    // not in a scroller or a list
    return
  }
  this.refreshPlaceholder = document.createElement('div')
  this.refreshPlaceholder.classList.add('weex-refresh-placeholder')
  this.refreshPlaceholder.style.display = 'none'
  this.refreshPlaceholder.style.width = '0px'
  this.refreshPlaceholder.style.height = '0px'
  const scrollElement = parent.scrollElement || parent.listElement
  scrollElement.insertBefore(this.refreshPlaceholder, this.node)
  parent.node.appendChild(this.node)
  parent.scroller.addEventListener('pulldown', function (e) {
    if (self.isRefreshing) {
      return
    }
    self.adjustHeight(Math.abs(e.scrollObj.getScrollTop()))
    if (!self.display) {
      self.show()
    }
  })
  parent.scroller.addEventListener('pulldownend', function (e) {
    if (self.isRefreshing) {
      return
    }
    const top = Math.abs(e.scrollObj.getScrollTop())
    if (top > self.clamp) {
      self.handleRefresh(e)
    }
    else {
      self.hide()
    }
  })
}

Refresh.prototype.adjustHeight = function (val) {
  this.node.style.height = val + 'px'
}

Refresh.prototype.adJustPosition = function (val) {
  this.node.style.top = -val + 'px'
}

Refresh.prototype.handleRefresh = function (e) {
  this.node.style.height = this.clamp + 'px'
  this.dispatchEvent('refresh')
  this.isRefreshing = true
}

Refresh.prototype.show = function () {
  this.display = true
  this.node.style.display = '-webkit-box'
  this.node.style.display = '-webkit-flex'
  this.node.style.display = 'flex'
}

Refresh.prototype.hide = function () {
  this.display = false
  this.node.style.display = 'none'
  this.isRefreshing = false
}

Refresh.prototype.attr = {
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

Refresh.prototype.style = utils.extend(
  Object.create(Component.prototype.style), {
    height: function (val) {
      val = parseFloat(val)
      if (isNaN(val) || val < 0) {
        return logger.warn('<refresh>\'s height (' + val + ') is invalid.')
      }
      this.clamp = val * this.data.scale
    }
  })

module.exports = Refresh

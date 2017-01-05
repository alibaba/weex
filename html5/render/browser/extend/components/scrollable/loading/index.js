'use strict'

import './loading.css'

const parents = ['scroller', 'list', 'vlist']

const DEFAULT_CLAMP = 130
const DEFAULT_ALIGN_ITEMS = 'center'
const DEFAULT_JUSTIFY_CONTENT = 'center'

function adjustHeight (loading, val) {
  loading.node.style.height = val + 'px'
}

function handleLoading (loading, e) {
  loading.node.style.height = loading.clamp + 'px'
  loading.dispatchEvent('loading')
  loading.isLoading = true
}

function show (loading) {
  loading.display = true
  loading.node.style.display = '-webkit-box'
  loading.node.style.display = '-webkit-flex'
  loading.node.style.display = 'flex'
}

function hide (loading) {
  loading.display = false
  loading.node.style.display = 'none'
  loading.isLoading = false
}

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-container')
    node.classList.add('weex-loading')
    return node
  },

  onAppend () {
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
      adjustHeight(self, Math.abs(
        obj.getScrollHeight() - obj.getScrollTop() - scrollWrapHeight))
      if (!self.display) {
        show(self)
      }
    })
    parent.scroller.addEventListener('pullupend', function (e) {
      if (self.isLoading) {
        return
      }
      handleLoading(self, e)
    })
  }
}

const attr = {
  display: function (val) {
    if (val === 'show') {
      setTimeout(function () {
        show(this)
      }.bind(this), 0)
    }
    else if (val === 'hide') {
      setTimeout(function () {
        hide(this)
      }.bind(this), 0)
    }
    else {
      console.error('[h5-render] attr \'display\' of <refresh>\': value '
        + val
        + ' is invalid. Should be \'show\' or \'hide\'')
    }
  }
}

const style = {
  height: function (val) {
    val = parseFloat(val)
    if (Number.isNaN(val) || val < 0) {
      return console.warn('[h5-render] <loading>\'s height (' + val + ') is invalid.')
    }
    this.clamp = val
  }
}

function init (Weex) {
  const Component = Weex.Component
  const extend = Weex.utils.extend

  function Loading (data) {
    this.clamp = (data.style.height || DEFAULT_CLAMP)
    !data.style.alignItems && (data.style.alignItems = DEFAULT_ALIGN_ITEMS)
    !data.style.justifyContent
      && (data.style.justifyContent = DEFAULT_JUSTIFY_CONTENT)
    Component.call(this, data)
  }
  Loading.prototype = Object.create(Component.prototype)
  extend(Loading.prototype, proto)
  extend(Loading.prototype, { attr })
  extend(Loading.prototype, {
    style: extend(Object.create(Component.prototype.style), style)
  })

  Weex.registerComponent('loading', Loading)
}

export default { init }

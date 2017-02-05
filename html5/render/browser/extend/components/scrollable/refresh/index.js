'use strict'

import './refresh.css'

const parents = ['scroller', 'list', 'vlist']

// Only if pulldown offset is larger than this value can this
// component trigger the 'refresh' event, otherwise just recover
// to the start point.
const DEFAULT_CLAMP = 130
const DEFAULT_ALIGN_ITEMS = 'center'
const DEFAULT_JUSTIFY_CONTENT = 'center'

function adjustHeight (refresh, val) {
  refresh.node.style.height = val + 'px'
}

// function adJustPosition (refresh, val) {
//   refresh.node.style.top = -val + 'px'
// }

function handleRefresh (refresh, e) {
  refresh.node.style.height = refresh.clamp + 'px'
  refresh.dispatchEvent('refresh')
  refresh.isRefreshing = true
}

function show (refresh) {
  refresh.display = true
  refresh.node.style.display = '-webkit-box'
  refresh.node.style.display = '-webkit-flex'
  refresh.node.style.display = 'flex'
}

function hide (refresh) {
  refresh.display = false
  refresh.node.style.display = 'none'
  refresh.isRefreshing = false
}

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('weex-container')
    node.classList.add('weex-refresh')
    return node
  },

  onAppend () {
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
      adjustHeight(self, Math.abs(e.scrollObj.getScrollTop()))
      if (!self.display) {
        show(self)
      }
    })
    parent.scroller.addEventListener('pulldownend', function (e) {
      if (self.isRefreshing) {
        return
      }
      const top = Math.abs(e.scrollObj.getScrollTop())
      if (top > self.clamp) {
        handleRefresh(self, e)
      }
      else {
        hide(self)
      }
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
    if (isNaN(val) || val < 0) {
      return console.warn('[h5-render] <refresh>\'s height (' + val + ') is invalid.')
    }
    this.clamp = val
  }
}

function init (Weex) {
  const Component = Weex.Component
  const extend = Weex.utils.extend

  function Refresh (data) {
    this.isRefreshing = false
    this.clamp = data.style.height || DEFAULT_CLAMP
    !data.style.alignItems && (data.style.alignItems = DEFAULT_ALIGN_ITEMS)
    !data.style.justifyContent
      && (data.style.justifyContent = DEFAULT_JUSTIFY_CONTENT)
    Component.call(this, data)
  }
  Refresh.prototype = Object.create(Component.prototype)
  extend(Refresh.prototype, proto)
  extend(Refresh.prototype, { attr })
  extend(Refresh.prototype, {
    style: extend(Object.create(Component.prototype.style), style)
  })

  Weex.registerComponent('refresh', Refresh)
}

export default { init }


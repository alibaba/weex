'use strict'

var Atomic = require('./atomic')
var msgQueue = require('../messageQueue')
var config = require('../config')
var utils = require('../utils')

// TODO: refactor this scss code since this is strongly
// dependent on lib.flexible other than the value of
// scale.
require('../styles/tabheader.scss')

function TabHeader(data) {
  Atomic.call(this, data)
}

var proto = TabHeader.prototype = Object.create(Atomic.prototype)

proto.create = function () {
  // outside container.
  var node = document.createElement('div')
  node.className = 'tab-header'
  // tip on the top.
  var bar = document.createElement('div')
  bar.className = 'header-bar'
  bar.textContent = 'CHANGE FLOOR'
  // middle layer.
  var body = document.createElement('div')
  body.className = 'header-body'
  var box = document.createElement('ul')
  box.className = 'tabheader'

  body.appendChild(box)
  node.appendChild(bar)
  node.appendChild(body)
  this._bar = bar
  this._body = body
  this.box = box
  this.node = node
  // init events.
  this._initFoldBtn()
  this._initEvent()
  return node
}

proto._initFoldBtn = function () {
  var _this = this
  var node = this.node
  var btn = document.createElement('span')
  btn.className = 'fold-toggle iconfont'
  btn.innerHTML = '&#xe661;'
  node.appendChild(btn)

  btn.addEventListener('click', function () {
    if (_this.unfolding) {
      _this._folding()
    } else {
      _this._unfolding()
    }
  })
}

proto._initMask = function () {
  var mask = document.createElement('div')
  mask.className = 'tabheader-mask'
  this.mask = mask
  // stop default behavior: page moving.
  mask.addEventListener('touchmove', function (evt) {
    evt.preventDefault()
  })
  // click to unfold.
  var _this = this
  mask.addEventListener('click', function () {
    _this._folding()
  })

  document.body.appendChild(mask)
}

proto._unfolding = function () {
  // mark the initial posiiton of tabheader
  if (!this.flag) {
    var flag = document.createComment('tabheader')
    this.flag = flag
    this.node.parentNode.insertBefore(flag, this.node)
  }
  if (!this.mask) {
    this._initMask()
  }

  // record the scroll position.
  this._scrollVal = this._body.scrollLeft
  // record the position in document.
  this._topVal = this.node.getBoundingClientRect().top
  this._styleTop = this.node.style.top

  document.body.appendChild(this.node)
  this.node.classList.add('unfold-header')
  this.node.style.height = 'auto'
  // recalc the position when it is unfolded.
  var thHeight = this.node.getBoundingClientRect().height
  if (thHeight + this._topVal > window.innerHeight) {
    this._topVal = this._topVal
        + (window.innerHeight - thHeight - this._topVal)
  }

  this.node.style.top = this._topVal + 'px'
  // process mask style
  this.mask.classList.add('unfold-header')
  this.mask.style.height = window.innerHeight + 'px'
  this.unfolding = true
}

proto._folding = function () {
  if (this.unfolding !== true) {
    return
  }

  this.mask.classList.remove('unfold-header')
  this.node.classList.remove('unfold-header')

  this.node.style.height = ''
  this.node.style.top = this._styleTop

  // recover the position of tabheader.
  this.flag.parentNode.insertBefore(this.node, this.flag)
  // recover the position of scoller.
  this._body.scrollLeft = this._scrollVal

  this._scrollToView()
  this.unfolding = false
}

proto._initEvent = function () {
  this._initClickEvent()
  this._initSelectEvent()
}

// init events.
proto._initClickEvent = function () {
  var box = this.box
  var _this = this

  box.addEventListener('click', function (evt) {
    var target = evt.target
    if (target.nodeName === 'UL') {
      return
    }

    if (target.parentNode.nodeName === 'LI') {
      target = target.parentNode
    }

    var floor = target.getAttribute('data-floor')

    if (_this.data.attr.selectedIndex == floor) {
      // Duplicated clicking, not to trigger select event.
      return
    }

    fireEvent(target, 'select', {index:  floor})
  })
}

proto._initSelectEvent = function () {
  var node = this.node
  var _this = this
  node.addEventListener('select', function (evt) {
    var index
    if (evt.index !== undefined) {
      index = evt.index
    } else if (evt.data && evt.data.index !== undefined) {
      index = evt.data.index
    }

    if (index === undefined) {
      return
    }

    _this.attr.selectedIndex.call(_this, index)
  })
}

proto.attr = {
  highlightIcon: function () {
    return createHighlightIcon()
  },
  data: function () {
    var attr = this.data.attr
    // Ensure there is a default selected value.
    if (attr.selectedIndex === undefined) {
      attr.selectedIndex = 0
    }

    var list = attr.data || []
    var curItem = attr.selectedIndex

    var ret = []
    var itemTmpl = '<li class="th-item" data-floor="{{floor}}">'
        + '{{hlIcon}}{{floorName}}</li>'

    list.forEach(function (item, idx) {
      var html = itemTmpl.replace('{{floor}}', idx)
      if (curItem == idx) {
        html = html.replace('{{hlIcon}}', createHighlightIcon())
      } else {
        html = html.replace('{{hlIcon}}', '')
      }

      html = html.replace('{{floorName}}', item)

      ret.push(html)
    }, this)

    this.box.innerHTML = ret.join('')
  },
  selectedIndex: function (val) {
    var attr = this.data.attr

    if (val === undefined) {
      val = 0
    }

    // if (val == attr.selectedIndex) {
    //   return
    // }

    attr.selectedIndex = val

    this.attr.data.call(this)

    this._folding()
    this.style.textHighlightColor.call(this, this.textHighlightColor)
  }
}

proto.style = Object.create(Atomic.prototype.style)

proto.style.opacity = function (val) {
  if (val === undefined || val < 0 || val > 1) {
    val = 1
  }

  this.node.style.opacity = val
}

proto.style.textColor = function (val) {
  if (!isValidColor(val)) {
    return
  }

  this.node.style.color = val
}

proto.style.textHighlightColor = function (val) {
  if (!isValidColor(val)) {
    return
  }
  this.textHighlightColor = val
  var attr = this.data.attr

  var node = this.node.querySelector('[data-floor="'
      + attr.selectedIndex + '"]')
  if (node) {
    node.style.color = val
    this._scrollToView(node)
  }
}

proto._scrollToView = function (node) {
  if (!node) {
    var attr = this.data.attr
    node = this.node.querySelector('[data-floor="' + attr.selectedIndex + '"]')
  }
  if (!node) {
    return
  }

  var defaultVal = this._body.scrollLeft
  var leftVal = defaultVal  - node.offsetLeft + 300

  var scrollVal = getScrollVal(this._body.getBoundingClientRect(), node)
  doScroll(this._body, scrollVal)
}

// scroll the tabheader.
// positive val means to scroll right.
// negative val means to scroll left.
function doScroll(node, val, finish) {
  if (!val) {
    return
  }
  if (finish === undefined) {
    finish = Math.abs(val)
  }

  if (finish <= 0) {
    return
  }

  setTimeout(function () {
    if (val > 0) {
      node.scrollLeft += 2
    } else {
      node.scrollLeft -= 2
    }
    finish -= 2

    doScroll(node, val, finish)
  })
}

// get scroll distance.
function getScrollVal(rect, node) {
  var left = node.previousSibling
  var right = node.nextSibling
  var scrollVal

  // process left-side element first.
  if (left) {
    var leftRect = left.getBoundingClientRect()
    // only need to compare the value of left.
    if (leftRect.left < rect.left) {
      scrollVal = leftRect.left
      return scrollVal
    }
  }

  if (right) {
    var rightRect = right.getBoundingClientRect()
    // compare the value of right.
    if (rightRect.right > rect.right) {
      scrollVal = rightRect.right - rect.right
      return scrollVal
    }
  }

  // process current node, from left to right.
  var nodeRect = node.getBoundingClientRect()
  if (nodeRect.left < rect.left) {
    scrollVal = nodeRect.left
  } else if (nodeRect.right > rect.right) {
    scrollVal = nodeRect.right - rect.right
  }

  return scrollVal
}

// trigger and broadcast events.
function fireEvent(element, type, data) {
  var evt = document.createEvent('Event')
  evt.data = data
  utils.extend(evt, data)
  // need bubble.
  evt.initEvent(type, true, true)

  element.dispatchEvent(evt)
}

function createHighlightIcon(code) {
  var html = '<i class="hl-icon iconfont">' + '&#xe650' + '</i>'
  return html
}

function isValidColor(color) {
  if (!color) {
    return false
  }

  if (color.charAt(0) !== '#') {
    return false
  }

  if (color.length !== 7) {
    return false
  }

  return true
}

module.exports = TabHeader

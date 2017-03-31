/* eslint-disable */

'use strict'

// require('./gesture')
import 'cubicbezier'
import 'animationjs'
import './carrousel.css'

var doc = window.document
var ua = window.navigator.userAgent
var Firefox = !!ua.match(/Firefox/i)
var IEMobile = !!ua.match(/IEMobile/i)
var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-'
var stylePrefix = Firefox ? 'Moz' : IEMobile ? 'ms' : 'webkit'

import * as timer from './timer'
var setTimeout = timer.setTimeout
var clearTimeout = timer.clearTimeout

function getTransformOffset(element) {
  var offset = { x: 0, y: 0 }
  var transform = getComputedStyle(element)[stylePrefix + 'Transform']
  var regMatrix3d = new RegExp('^matrix3d\\((?:[-\\d.]+,\\s*){12}([-\\d.]+),'
    + '\\s*([-\\d.]+)(?:,\\s*[-\\d.]+){2}\\)')
  var regMatrix = /^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/
  var matched

  if (transform !== 'none') {
    if ((matched = transform.match(regMatrix3d)
      || transform.match(regMatrix))) {
      offset.x = parseFloat(matched[1]) || 0
      offset.y = parseFloat(matched[2]) || 0
    }
  }

  return offset
}

var CSSMatrix = IEMobile ? 'MSCSSMatrix' : 'WebKitCSSMatrix'
var has3d = !!Firefox || CSSMatrix in window && 'm11' in new window[CSSMatrix]()
function getTranslate(x, y) {
  x = parseFloat(x)
  y = parseFloat(y)

  if (x != 0) {
    x += 'px'
  }

  if (y != 0) {
    y += 'px'
  }

  if (has3d) {
    return 'translate3d(' + x + ', ' + y + ', 0)'
  }

  return 'translate(' + x + ', ' + y + ')'
}

var slice = Array.prototype.slice
function ArrayFrom(a) {
  return slice.call(a)
}

var incId = 0
function Carrousel(element, options) {
  var that = this
  var views = []
  var pages = {}
  var id = Date.now() + '-' + (++incId)
  var root = document.createDocumentFragment()

  if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
    options = arguments[0]
    element = null
  }

  if (!element) {
    element = document.createElement('ul')
    root.appendChild(element)
  }
  options = options || {}

  element.setAttribute('data-ctrl-name', 'carrousel')
  element.setAttribute('data-ctrl-id', id)

  function fireEvent(name, extra) {
    var ev = doc.createEvent('HTMLEvents')
    ev.initEvent(name, false, false)
    if (extra) {
      for (var key in extra) {
        ev[key] = extra[key]
      }
    }
    root.dispatchEvent(ev)
  }

  element.style.position = 'relative'
  element.style[stylePrefix + 'Transform'] = getTranslate(0, 0)

  var transformOffset = 0
  var items = {}
  var itemLength = 0
  var itemStep = options.step || element.getBoundingClientRect().width
  var itemIndex = 0

  items.add = function (html) {
    var li = document.createElement('li')
    li.style.display = 'none'
    li.style.float = 'left'
    li.index = itemLength
    if (typeof html === 'string') {
      li.innerHTML = html
    } else if (html instanceof HTMLElement) {
      li.appendChild(html)
    }
    element.appendChild(li)

    Object.defineProperty(items, itemLength + '', {
      get: function () {
        return li
      }
    })

    itemLength++
    return li
  }

  function normalizeIndex(index) {
    while (index < 0) {
      index += itemLength
    }

    while (index >= itemLength) {
      index -= itemLength
    }

    return index
  }

  items.get = function (index) {
    return items[normalizeIndex(index)]
  }

  items.getCloned = function (index) {
    var index = normalizeIndex(index)
    var item = element.querySelector('[cloned="cloned-' + index + '"]')
    var originalItem = items[index]

    // If there a _listeners attribute on the dom element
    // then clone the _listeners as well for the events' binding
    function cloneEvents(origin, clone, deep) {
      var listeners = origin._listeners
      if (listeners) {
        clone._listeners = listeners
        for (var type in listeners) {
          clone.addEventListener(type, listeners[type])
        }
      }
      if (deep && origin.children && origin.children.length) {
        for (var i = 0, l = origin.children.length; i < l; i++) {
          cloneEvents(origin.children[i], clone.children[i], deep)
        }
      }
    }

    if (!item) {
      item = originalItem.cloneNode(true)
      cloneEvents(originalItem, item, true)

      element.appendChild(item)
      item.setAttribute('cloned', 'cloned-' + index)
      item.index = index
    }

    return item
  }

  function activate(index) {
    if (itemLength === 0) {
      return
    }

    var curItem = items.get(index)
    var prevItem
    var nextItem

    if (itemLength > 1) {
      prevItem = items.get(index - 1)

      if (itemLength === 2) {
        nextItem = items.getCloned(index + 1)
      } else {
        nextItem = items.get(index + 1)
      }

      curItem.style.left = -transformOffset + 'px'
      prevItem.style.left = (-transformOffset - itemStep) + 'px'
      nextItem.style.left = (-transformOffset + itemStep) + 'px'
    }

    itemIndex = curItem.index

    fireEvent('change', {
      prevItem: prevItem,
      curItem: curItem,
      nextItem: nextItem
    })
  }

  items.slide = function (index) {
    if (itemLength === 0) {
      return
    }

    if (itemLength === 1) {
      index = 0
    }

    var startOffset = getTransformOffset(element).x
    var endOffset = transformOffset + itemStep * (-index)
    var interOffset = endOffset - startOffset

    if (interOffset === 0) {
      return
    }

    var anim = new lib.animation(
      400,
      lib.cubicbezier.ease,
      function (i1, i2) {
        element.style[stylePrefix + 'Transform']
          = getTranslate(startOffset + interOffset * i2, 0)
      }).play().then(function () {
        transformOffset = endOffset
        element.style[stylePrefix + 'Transform'] = getTranslate(endOffset, 0)
        index && activate(itemIndex + index)
      })
  }

  items.next = function () {
    items.slide(1)
  }

  items.prev = function () {
    items.slide(-1)
  }

  ArrayFrom(element.children).forEach(function (el) {
    el.style.position = 'absolute'
    el.style.top = '0'
    el.style.left = itemLength * itemStep + 'px'
    el.style.float = 'left'
    el.index = itemLength
    Object.defineProperty(items, itemLength + '', {
      get: function () {
        return el
      }
    })

    itemLength++
  })

  Object.defineProperty(this, 'items', {
    get: function () {
      return items
    }
  })

  Object.defineProperty(items, 'length', {
    get: function () {
      return itemLength
    }
  })

  Object.defineProperty(items, 'index', {
    get: function () {
      return itemIndex
    }
  })

  Object.defineProperty(items, 'step', {
    get: function () {
      return itemStep
    },

    set: function (v) {
      itemStep = v
    }
  })

  var starting = false
  var playing = false
  var isSliding = false
  this.play = function () {
    if (!starting) {
      starting = true
      return activate(0)
    }

    if (!!playing) {
      return
    }

    playing = setTimeout(function play() {
      isSliding = true
      items.next()
      setTimeout(function () {
        isSliding = false
      }, 500)
      playing = setTimeout(play, 400 + playInterval)
    }, 400 + playInterval)
  }

  this.stop = function () {
    if (!playing) {
      return
    }
    clearTimeout(playing)
    setTimeout(function () {
      playing = false
    }, 500)
  }

  var autoplay = false
  var readyToPlay = false
  Object.defineProperty(this, 'autoplay', {
    get: function () {
      return autoplay
    },
    set: function (v) {
      autoplay = !!v
      if (readyToPlay) {
        clearTimeout(readyToPlay)
        readyToPlay = false
      }
      if (autoplay) {
        readyToPlay = setTimeout(function () {
          that.play()
        }, 2000)
      } else {
        that.stop()
      }
    }
  })
  this.autoplay = !!options.autoplay

  var playInterval = 1500
  Object.defineProperty(this, 'playInterval', {
    get: function () {
      return playInterval
    },
    set: function (n) {
      playInterval = n
    }
  })
  this.playInterval = !!options.playInterval || 1500

  if (options.useGesture) {
    var panning = false
    var displacement
    element.addEventListener('panstart', function (e) {
      if (!e.isVertical && !(panning && isSliding)) {
        e.preventDefault()
        e.stopPropagation()

        if (autoplay) {
          that.stop()
        }

        displacement = 0
        panning = true
      }
    })

    element.addEventListener('panmove', function (e) {
      if (!e.isVertical && panning) {
        e.preventDefault()
        e.stopPropagation()
        displacement = e.displacementX
        element.style[stylePrefix + 'Transform']
          = getTranslate(transformOffset + displacement, 0)
      }
    })

    element.addEventListener('panend', function (e) {
      if (!e.isVertical && panning) {
        e.preventDefault()
        e.stopPropagation()
        panning = false
        if (e.isSwipe) {
          if (displacement < 0) {
            items.next()
          } else {
            items.prev()
          }
        } else {
          if (Math.abs(displacement) < itemStep / 2) {
            items.slide(0)
          } else {
            items.slide(displacement < 0?1:-1)
          }
        }

        if (autoplay) {
          setTimeout(function () {
            that.play()
          }, 2000)
        }
      }
    }, false)

    element.addEventListener('swipe', function (e) {
      if (!e.isVertical) {
        e.preventDefault()
        e.stopPropagation()
      }
    })
  }

  this.addEventListener = function (name, handler) {
    this.root.addEventListener(name, handler, false)
  }

  this.removeEventListener = function (name, handler) {
    this.root.removeEventListener(name, handler, false)
  }

  this.root = root
  this.element = element
}

!lib && (lib = {})
lib.carrousel = Carrousel


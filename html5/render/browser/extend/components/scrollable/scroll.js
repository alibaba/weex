/* eslint-disable */

import './motion'

var doc = window.document
var ua = window.navigator.userAgent
var scrollObjs = {}
var plugins = {}
var dpr = window.dpr
  || (!!window.navigator.userAgent.match(/iPhone|iPad|iPod/)
    ? document.documentElement.clientWidth / window.screen.availWidth
    : 1)
var inertiaCoefficient = {
  normal: [2 * dpr, 0.0015 * dpr],
  slow: [1.5 * dpr, 0.003 * dpr],
  veryslow: [1.5 * dpr, 0.005 * dpr]
}
var timeFunction = {
  ease: [.25,.1,.25,1],
  liner: [0,0,1,1],
  'ease-in': [.42,0,1,1],
  'ease-out': [0,0,.58,1],
  'ease-in-out': [.42,0,.58,1]
}
var Firefox = !!ua.match(/Firefox/i)
var IEMobile = !!ua.match(/IEMobile/i)
var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-'
var stylePrefix = Firefox ? 'Moz' : IEMobile ? 'ms' : 'webkit'

function debugLog() {
  if (lib.scroll.outputDebugLog) {
    console.log.apply(console, arguments)
  }
}

function getBoundingClientRect(el) {
  var rect = el.getBoundingClientRect()
  if (!rect) {
    rect = {}
    rect.width = el.offsetWidth
    rect.height = el.offsetHeight

    rect.left = el.offsetLeft
    rect.top = el.offsetTop
    var parent = el.offsetParent
    while (parent) {
      rect.left += parent.offsetLeft
      rect.top += parent.offsetTop
      parent = parent.offsetParent
    }

    rect.right = rect.left + rect.width
    rect.bottom = rect.top + rect.height
  }
  return rect
}

function getMinScrollOffset(scrollObj) {
  return 0 - scrollObj.options[scrollObj.axis + 'PaddingTop']
}

function getMaxScrollOffset(scrollObj) {
  var rect = getBoundingClientRect(scrollObj.element)
  var pRect = getBoundingClientRect(scrollObj.viewport)
  var min = getMinScrollOffset(scrollObj)
  if (scrollObj.axis === 'y') {
    var max = 0 - rect.height + pRect.height
  } else {
    var max = 0 - rect.width + pRect.width
  }
  return Math.min(
    max + scrollObj.options[scrollObj.axis + 'PaddingBottom'],
    min
  )
}

function getBoundaryOffset(scrollObj, offset) {
  if (offset > scrollObj.minScrollOffset) {
    return offset - scrollObj.minScrollOffset
  }
  if (offset < scrollObj.maxScrollOffset) {
    return offset - scrollObj.maxScrollOffset
  }
}

function touchBoundary(scrollObj, offset) {
  if (offset > scrollObj.minScrollOffset) {
    offset = scrollObj.minScrollOffset
  } else if (offset < scrollObj.maxScrollOffset) {
    offset = scrollObj.maxScrollOffset
  }
  return offset
}

function fireEvent(scrollObj, eventName, extra) {
  debugLog(scrollObj.element.scrollId, eventName, extra)
  var event = doc.createEvent('HTMLEvents')
  event.initEvent(eventName, false, true)
  event.scrollObj = scrollObj
  if (extra) {
    for (var key in extra) {
      event[key] = extra[key]
    }
  }
  scrollObj.element.dispatchEvent(event)
  scrollObj.viewport.dispatchEvent(event)
}

function getTransformOffset(scrollObj) {
  var offset = {x: 0, y: 0}
  var transform = getComputedStyle(scrollObj.element)
    [stylePrefix + 'Transform']
  var matched
  var reg1 = new RegExp('^matrix3d'
    + '\\((?:[-\\d.]+,\\s*){12}([-\\d.]+),'
    + '\\s*([-\\d.]+)(?:,\\s*[-\\d.]+){2}\\)')
  var reg2 = new RegExp('^matrix'
    + '\\((?:[-\\d.]+,\\s*){4}([-\\d.]+),\\s*([-\\d.]+)\\)$')
  if (transform !== 'none') {
    if ((matched = transform.match(reg1) ||
        transform.match(reg2))) {
      offset.x = parseFloat(matched[1]) || 0
      offset.y = parseFloat(matched[2]) || 0
    }
  }

  return offset
}

var CSSMatrix = IEMobile ? 'MSCSSMatrix' : 'WebKitCSSMatrix'
var has3d = !!Firefox
  || CSSMatrix in window
  && 'm11' in new window[CSSMatrix]()
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

function setTransitionStyle(scrollObj, duration, timingFunction) {
  if (duration === '' && timingFunction === '') {
    scrollObj.element.style[stylePrefix + 'Transition'] = ''
  } else {
    scrollObj.element.style[stylePrefix + 'Transition']
      = cssPrefix + 'transform ' + duration + ' ' + timingFunction + ' 0s'
  }
}

function setTransformStyle(scrollObj, offset) {
  var x = 0
  var y = 0
  if (typeof offset === 'object') {
    x = offset.x
    y = offset.y
  } else {
    if (scrollObj.axis === 'y') {
      y = offset
    } else {
      x = offset
    }
  }
  scrollObj.element.style[stylePrefix + 'Transform'] = getTranslate(x, y)
}

var panning = false
doc.addEventListener('touchmove', function (e) {
  if (panning) {
    e.preventDefault()
    return false
  }
  return true
}, false)

function Scroll(element, options) {
  var that = this

  options = options || {}
  options.noBounce = !!options.noBounce
  options.padding = options.padding || {}

  if (options.isPrevent == null) {
    options.isPrevent = true
  } else {
    options.isPrevent = !!options.isPrevent
  }

  if (options.isFixScrollendClick == null) {
    options.isFixScrollendClick = true
  } else {
    options.isFixScrollendClick = !!options.isFixScrollendClick
  }

  if (options.padding) {
    options.yPaddingTop = -options.padding.top || 0
    options.yPaddingBottom = -options.padding.bottom || 0
    options.xPaddingTop = -options.padding.left || 0
    options.xPaddingBottom = -options.padding.right || 0
  } else {
    options.yPaddingTop = 0
    options.yPaddingBottom = 0
    options.xPaddingTop = 0
    options.xPaddingBottom = 0
  }

  options.direction = options.direction || 'y'
  options.inertia = options.inertia || 'normal'

  this.options = options
  that.axis = options.direction
  this.element = element
  this.viewport = element.parentNode
  this.plugins = {}

  this.element.scrollId = setTimeout(function () {
    scrollObjs[that.element.scrollId + ''] = that
  }, 1)

  this.viewport.addEventListener('touchstart', touchstartHandler, false)
  this.viewport.addEventListener('touchend', touchendHandler, false)
  this.viewport.addEventListener('touchcancel', touchendHandler, false)
  this.viewport.addEventListener('panstart', panstartHandler, false)
  this.viewport.addEventListener('panmove', panHandler, false)
  this.viewport.addEventListener('panend', panendHandler, false)

  if (options.isPrevent) {
    this.viewport.addEventListener('touchstart', function (e) {
      panning = true
    }, false)
    that.viewport.addEventListener('touchend', function (e) {
      panning = false
    }, false)
  }

  // if (options.isPrevent) {
  //   var d = this.axis === 'y'?'vertical':'horizontal'
  //   this.viewport.addEventListener(d + 'panstart', function (e) {
  //     panning = true
  //   }, false)
  //   that.viewport.addEventListener('panend', function (e) {
  //     panning = false
  //   }, false)
  // }

  if (options.isFixScrollendClick) {
    var preventScrollendClick
    var fixScrollendClickTimeoutId

    this.viewport.addEventListener('scrolling', function () {
      preventScrollendClick = true
      fixScrollendClickTimeoutId && clearTimeout(fixScrollendClickTimeoutId)
      fixScrollendClickTimeoutId = setTimeout(function (e) {
        preventScrollendClick = false
      }, 400)
    }, false)

    function preventScrollendClickHandler(e) {
      if (preventScrollendClick || isScrolling) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      return true
    }

    function fireNiceTapEventHandler(e) {
      if (!preventScrollendClick && !isScrolling) {
        setTimeout(function () {
          var niceTapEvent = document.createEvent('HTMLEvents')
          niceTapEvent.initEvent('niceclick', true, true)
          e.target.dispatchEvent(niceTapEvent)
        }, 300)
      }
    }

    this.viewport.addEventListener('click', preventScrollendClickHandler)
    this.viewport.addEventListener('tap', fireNiceTapEventHandler)
  }

  function setTransitionEndHandler(h, t) {
    if (options.useFrameAnimation) {
      return
    }
    transitionEndHandler = null
    clearTimeout(transitionEndTimeoutId)

    transitionEndTimeoutId = setTimeout(function () {
      if (transitionEndHandler) {
        transitionEndHandler = null
        lib.animation.requestFrame(h)
      }
    }, (t || 400))

    transitionEndHandler = h
  }

  if (options.useFrameAnimation) {
    var scrollAnimation

    Object.defineProperty(this, 'animation', {
      get: function () {
        return scrollAnimation
      }
    })
  } else {
    var transitionEndHandler
    var transitionEndTimeoutId = 0

    element.addEventListener(
        Firefox
          ? 'transitionend'
          : (stylePrefix + 'TransitionEnd'), function (e) {
      if (transitionEndHandler) {
        var handler = transitionEndHandler

        transitionEndHandler = null
        clearTimeout(transitionEndTimeoutId)

        lib.animation.requestFrame(function () {
          handler(e)
        })
      }
    }, false)
  }

  var panFixRatio
  var isScrolling
  var isFlickScrolling
  var cancelScrollEnd

  Object.defineProperty(this, 'isScrolling', {
    get: function () {
      return !!isScrolling
    }
  })

  function isEnabled(e) {
    if (!that.enabled) {
      return false
    }

    if (typeof e.isVertical != 'undefined') {
      if (that.axis === 'y' && e.isVertical
          || that.axis === 'x' && !e.isVertical) {
        // gesture in same direction, stop bubbling up
        e.stopPropagation()
      } else {
        // gesture in different direction, bubbling up
        // to the top, without any other process
        return false
      }
    }

    return true
  }

  function touchstartHandler(e) {
    if (!isEnabled(e)) {
      return
    }

    if (isScrolling) {
      scrollEnd()
    }

    if (options.useFrameAnimation) {
      scrollAnimation && scrollAnimation.stop()
      scrollAnimation = null
    } else {
      var transform = getTransformOffset(that)
      setTransformStyle(that, transform)
      setTransitionStyle(that, '', '')
      transitionEndHandler = null
      clearTimeout(transitionEndTimeoutId)
    }
  }

  function touchendHandler(e) {
    if (!isEnabled(e)) {
      return
    }

    var s0 = getTransformOffset(that)[that.axis]
    var boundaryOffset = getBoundaryOffset(that, s0)

    if (boundaryOffset) {
      // dragging out of boundray, bounce is needed
      var s1 = touchBoundary(that, s0)

      if (options.useFrameAnimation) {
        // frame
        var _s = s1 - s0
        scrollAnimation = new lib.animation(
            400,
            lib.cubicbezier.ease,
            0,
            function (i1, i2) {
          var offset = (s0 + _s * i2).toFixed(2)
          setTransformStyle(that, offset)
          fireEvent(that, 'scrolling')
        })
        scrollAnimation.onend(scrollEnd)
        scrollAnimation.play()
      } else {
        // css
        var offset =  s1.toFixed(0)
        setTransitionEndHandler(scrollEnd, 400)
        setTransitionStyle(that, '0.4s', 'ease')
        setTransformStyle(that, offset)

        lib.animation.requestFrame(function doScroll() {
          if (isScrolling && that.enabled) {
            fireEvent(that, 'scrolling')
            lib.animation.requestFrame(doScroll)
          }
        })
      }

      if (boundaryOffset > 0) {
        fireEvent(that, that.axis === 'y' ? 'pulldownend' : 'pullrightend')
      } else if (boundaryOffset < 0) {
        fireEvent(that, that.axis === 'y' ? 'pullupend' : 'pullleftend')
      }
    } else if (isScrolling) {
      // without exceeding the boundary, just end it
      scrollEnd()
    }
  }

  var lastDisplacement
  function panstartHandler(e) {
    if (!isEnabled(e)) {
      return
    }

    that.transformOffset = getTransformOffset(that)
    that.minScrollOffset = getMinScrollOffset(that)
    that.maxScrollOffset = getMaxScrollOffset(that)
    panFixRatio = 2.5
    cancelScrollEnd = true
    isScrolling = true
    isFlickScrolling = false
    fireEvent(that, 'scrollstart')

    lastDisplacement = e['displacement' + that.axis.toUpperCase()]
  }


  function panHandler(e) {
    if (!isEnabled(e)) {
      return
    }

    // finger move less than 5 px. just ignore that.
    var displacement = e['displacement' + that.axis.toUpperCase()]
    if (Math.abs(displacement - lastDisplacement) < 5) {
      e.stopPropagation()
      return
    }
    lastDisplacement = displacement

    var offset = that.transformOffset[that.axis] + displacement
    if (offset > that.minScrollOffset) {
      offset = that.minScrollOffset
        + (offset - that.minScrollOffset) / panFixRatio
      panFixRatio *= 1.003
    } else if (offset < that.maxScrollOffset) {
      offset = that.maxScrollOffset
        - (that.maxScrollOffset - offset) / panFixRatio
      panFixRatio *= 1.003
    }
    if (panFixRatio > 4) {
      panFixRatio = 4
    }

    // tell whether or not reach the fringe
    var boundaryOffset = getBoundaryOffset(that, offset)
    if (boundaryOffset) {
      fireEvent(
          that,
          boundaryOffset > 0
          ? (that.axis === 'y' ? 'pulldown' : 'pullright')
          : (that.axis === 'y' ? 'pullup' : 'pullleft'), {
        boundaryOffset: Math.abs(boundaryOffset)
      })
      if (that.options.noBounce) {
        offset = touchBoundary(that, offset)
      }
    }

    setTransformStyle(that, offset.toFixed(2))
    fireEvent(that, 'scrolling')
  }

  function panendHandler(e) {
    if (!isEnabled(e)) {
      return
    }

    if (e.isSwipe) {
      flickHandler(e)
    }
  }

  function flickHandler(e) {
    cancelScrollEnd = true

    var v0, a0, t0, s0, s, motion0
    var v1, a1, t1, s1, motion1,sign
    var v2, a2, t2, s2, motion2, ft

    s0 = getTransformOffset(that)[that.axis]
    var boundaryOffset0 = getBoundaryOffset(that, s0)
    if (!boundaryOffset0) {
      // when fingers left the range of screen, let touch end handler
      // to deal with it.
      // when fingers left the screen, but still in the range of
      // screen, calculate the intertia.
      v0 = e['velocity' + that.axis.toUpperCase()]

      var maxV = 2
      var friction = 0.0015
      if (options.inertia && inertiaCoefficient[options.inertia]) {
        maxV = inertiaCoefficient[options.inertia][0]
        friction = inertiaCoefficient[options.inertia][1]
      }

      if (v0 > maxV) {
        v0 = maxV
      }
      if (v0 < -maxV) {
        v0 = -maxV
      }
      a0 = friction * (v0 / Math.abs(v0))
      motion0 = new lib.motion({
        v: v0,
        a: -a0
      })
      t0 = motion0.t
      s = s0 + motion0.s

      var boundaryOffset1 = getBoundaryOffset(that, s)
      if (boundaryOffset1) {
        debugLog('inertial calculation has exceeded the boundary',
          boundaryOffset1)

        v1 = v0
        a1 = a0
        if (boundaryOffset1 > 0) {
          s1 = that.minScrollOffset
          sign = 1
        } else {
          s1 = that.maxScrollOffset
          sign = -1
        }
        motion1 = new lib.motion({
          v: sign * v1,
          a: -sign * a1,
          s: Math.abs(s1 - s0)
        })
        t1 = motion1.t
        var timeFunction1 = motion1.generateCubicBezier()

        v2 = v1 - a1 * t1
        a2 = 0.03 * (v2 / Math.abs(v2))
        motion2 = new lib.motion({
          v: v2,
          a: -a2
        })
        t2 = motion2.t
        s2 = s1 + motion2.s
        var timeFunction2 = motion2.generateCubicBezier()

        if (options.noBounce) {
          debugLog('no bounce effect')

          if (s0 !== s1) {
            if (options.useFrameAnimation) {
              // frame
              var _s = s1 - s0
              var bezier = lib.cubicbezier(
                timeFunction1[0][0],
                timeFunction1[0][1],
                timeFunction1[1][0],
                timeFunction1[1][1]
              )
              scrollAnimation = new lib.animation(
                  t1.toFixed(0),
                  bezier,
                  0,
                  function (i1, i2) {
                var offset = (s0 + _s * i2)
                getTransformOffset(that, offset.toFixed(2))
                fireEvent(that, 'scrolling', {
                  afterFlick: true
                })
              })

              scrollAnimation.onend(scrollEnd)

              scrollAnimation.play()
            } else {
              // css
              var offset = s1.toFixed(0)
              setTransitionEndHandler(
                scrollEnd,
                (t1 / 1000).toFixed(2) * 1000
              )
              setTransitionStyle(
                that,
                (t1 / 1000).toFixed(2) + 's',
                'cubic-bezier(' + timeFunction1 + ')'
              )
              setTransformStyle(that, offset)
            }
          } else {
            scrollEnd()
          }
        } else if (s0 !== s2) {
          debugLog(
            'scroll for inertia',
            's=' + s2.toFixed(0),
            't=' + ((t1 + t2) / 1000).toFixed(2)
          )

          if (options.useFrameAnimation) {
            var _s = s2 - s0
            var bezier = lib.cubicbezier.easeOut
            scrollAnimation = new lib.animation(
                (t1 + t2).toFixed(0),
                bezier,
                0,
                function (i1, i2) {
              var offset = s0 + _s * i2
              setTransformStyle(that, offset.toFixed(2))
              fireEvent(that, 'scrolling',{
                afterFlick: true
              })
            })

            scrollAnimation.onend(function () {
              if (!that.enabled) {
                return
              }

              var _s = s1 - s2
              var bezier = lib.cubicbezier.ease
              scrollAnimation = new lib.animation(
                  400,
                  bezier,
                  0,
                  function (i1, i2) {
                var offset = s2 + _s * i2
                setTransformStyle(that, offset.toFixed(2))
                fireEvent(that, 'scrolling',{
                  afterFlick: true
                })
              })

              scrollAnimation.onend(scrollEnd)

              scrollAnimation.play()
            })

            scrollAnimation.play()
          } else {
            var offset = s2.toFixed(0)
            setTransitionEndHandler(function (e) {
              if (!that.enabled) {
                return
              }

              debugLog('inertial bounce',
                's=' + s1.toFixed(0),
                't=400'
              )

              if (s2 !== s1) {
                var offset = s1.toFixed(0)
                setTransitionStyle(that, '0.4s', 'ease')
                setTransformStyle(that, offset)
                setTransitionEndHandler(scrollEnd, 400)
              } else {
                scrollEnd()
              }
            }, ((t1 + t2) / 1000).toFixed(2) * 1000)

            setTransitionStyle(
              that,
              ((t1 + t2) / 1000).toFixed(2) + 's',
              'ease-out'
            )
            setTransformStyle(that, offset)
          }
        } else {
          scrollEnd()
        }
      } else {
        debugLog('inertial calculation hasn\'t exceeded the boundary')
        var timeFunction = motion0.generateCubicBezier()

        if (options.useFrameAnimation) {
          // frame
          var _s = s - s0
          var bezier = lib.cubicbezier(
            timeFunction[0][0],
            timeFunction[0][1],
            timeFunction[1][0],
            timeFunction[1][1]
          )
          scrollAnimation = new lib.animation(
              t0.toFixed(0),
              bezier,
              0,
              function (i1, i2) {
            var offset = (s0 + _s * i2).toFixed(2)
            setTransformStyle(that, offset)
            fireEvent(that, 'scrolling',{
              afterFlick: true
            })
          })

          scrollAnimation.onend(scrollEnd)

          scrollAnimation.play()
        } else {
          // css
          var offset = s.toFixed(0)
          setTransitionEndHandler(scrollEnd, (t0 / 1000).toFixed(2) * 1000)
          setTransitionStyle(
            that,
            (t0 / 1000).toFixed(2) + 's',
            'cubic-bezier(' + timeFunction + ')'
          )
          setTransformStyle(that, offset)
        }
      }


      isFlickScrolling = true
      if (!options.useFrameAnimation) {
        lib.animation.requestFrame(function doScroll() {
          if (isScrolling && isFlickScrolling && that.enabled) {
            fireEvent(that, 'scrolling', {
              afterFlick: true
            })
            lib.animation.requestFrame(doScroll)
          }
        })
      }
    }
  }

  function scrollEnd() {
    if (!that.enabled) {
      return
    }

    cancelScrollEnd = false

    setTimeout(function () {
      if (!cancelScrollEnd && isScrolling) {
        isScrolling = false
        isFlickScrolling = false

        if (options.useFrameAnimation) {
          scrollAnimation && scrollAnimation.stop()
          scrollAnimation = null
        } else {
          setTransitionStyle(that, '', '')
        }
        fireEvent(that, 'scrollend')
      }
    }, 50)
  }

  var proto = {
    init: function () {
      this.enable()
      this.refresh()
      this.scrollTo(0)
      return this
    },

    enable: function () {
      this.enabled = true
      return this
    },

    disable: function () {
      var el = this.element
      this.enabled = false

      if (this.options.useFrameAnimation) {
        scrollAnimation && scrollAnimation.stop()
      } else {
        lib.animation.requestFrame(function () {
          el.style[stylePrefix + 'Transform']
            = getComputedStyle(el)[stylePrefix + 'Transform']
        })
      }

      return this
    },

    getScrollWidth: function () {
      return getBoundingClientRect(this.element).width
    },

    getScrollHeight: function () {
      return getBoundingClientRect(this.element).height
    },

    getScrollLeft: function () {
      return -getTransformOffset(this).x - this.options.xPaddingTop
    },

    getScrollTop: function () {
      return -getTransformOffset(this).y - this.options.yPaddingTop
    },

    getMaxScrollLeft: function () {
      return -that.maxScrollOffset - this.options.xPaddingTop
    },

    getMaxScrollTop: function () {
      return -that.maxScrollOffset - this.options.yPaddingTop
    },

    getBoundaryOffset: function () {
      return Math.abs(
        getBoundaryOffset(this, getTransformOffset(this)[this.axis]) || 0
      )
    },

    refresh: function () {
      var el = this.element
      var isVertical = (this.axis === 'y')
      var type = isVertical ? 'height' : 'width'
      var size, rect, extraSize

      function getExtraSize(el, isVertical) {
        var extraType = isVertical ? ['top', 'bottom'] : ['left', 'right']
        return parseFloat(
          getComputedStyle(el.firstElementChild)['margin-' + extraType[0]]
        ) + parseFloat(
          getComputedStyle(el.lastElementChild)['margin-' + extraType[1]]
        )
      }

      if (this.options[type] != null) {
        // use options
        size = this.options[type]
      } else if (el.childElementCount <= 0) {
        el.style[type] = 'auto'
        size = null
      } else if (!!this.options.useElementRect) {
        el.style[type] = 'auto'
        rect = getBoundingClientRect(el)
        size = rect[type]
        size += getExtraSize(el, isVertical)
      } else {
        var range, rect
        var firstEl = el.firstElementChild
        var lastEl = el.lastElementChild

        if (document.createRange && !this.options.ignoreOverflow) {
          // use range
          range = document.createRange()
          range.selectNodeContents(el)
          rect = getBoundingClientRect(range)
        }

        if (rect) {
          size = rect[type]
        } else {
          // use child offsets
          while (firstEl) {
            if (getBoundingClientRect(firstEl)[type] === 0
                && firstEl.nextElementSibling) {
              firstEl = firstEl.nextElementSibling
            } else {
              break
            }
          }

          while (lastEl && lastEl !== firstEl) {
            if (getBoundingClientRect(lastEl)[type] === 0
                && lastEl.previousElementSibling) {
              lastEl = lastEl.previousElementSibling
            } else {
              break
            }
          }

          size = getBoundingClientRect(lastEl)[
              isVertical ? 'bottom' : 'right']
            - getBoundingClientRect(firstEl)[
              isVertical ? 'top' : 'left']
        }

        size += getExtraSize(el, isVertical)

      }

      el.style[type] = size ? size + 'px' : 'auto'

      this.transformOffset = getTransformOffset(this)
      this.minScrollOffset = getMinScrollOffset(this)
      this.maxScrollOffset = getMaxScrollOffset(this)

      this.scrollTo(
        -this.transformOffset[this.axis]
        - this.options[this.axis + 'PaddingTop']
      )
      fireEvent(this, 'contentrefresh')

      return this
    },

    offset: function (childEl) {
      var elRect = getBoundingClientRect(this.element)
      var childRect = getBoundingClientRect(childEl)
      if (this.axis === 'y') {
        var offsetRect = {
          top: childRect.top - elRect.top - this.options.yPaddingTop,
          left: childRect.left - elRect.left,
          right: elRect.right - childRect.right,
          width: childRect.width,
          height: childRect.height
        }

        offsetRect.bottom = offsetRect.top + offsetRect.height
      } else {
        var offsetRect = {
          top: childRect.top - elRect.top,
          bottom: elRect.bottom - childRect.bottom,
          left: childRect.left - elRect.left - this.options.xPaddingTop,
          width: childRect.width,
          height: childRect.height
        }

        offsetRect.right = offsetRect.left + offsetRect.width
      }
      return offsetRect
    },

    getRect: function (childEl) {
      var viewRect = getBoundingClientRect(this.viewport)
      var childRect = getBoundingClientRect(childEl)
      if (this.axis === 'y') {
        var offsetRect = {
          top: childRect.top - viewRect.top,
          left: childRect.left - viewRect.left,
          right: viewRect.right - childRect.right,
          width: childRect.width,
          height: childRect.height
        }

        offsetRect.bottom = offsetRect.top + offsetRect.height
      } else {
        var offsetRect = {
          top: childRect.top - viewRect.top,
          bottom: viewRect.bottom - childRect.bottom,
          left: childRect.left - viewRect.left,
          width: childRect.width,
          height: childRect.height
        }

        offsetRect.right = offsetRect.left + offsetRect.width
      }
      return offsetRect
    },

    isInView: function (childEl) {
      var viewRect = this.getRect(this.viewport)
      var childRect = this.getRect(childEl)
      if (this.axis === 'y') {
        return viewRect.top < childRect.bottom
          && viewRect.bottom > childRect.top
      }
      return viewRect.left < childRect.right
        && viewRect.right > childRect.left
    },

    scrollTo: function (offset, isSmooth) {
      var that = this
      var element = this.element

      offset = -offset - this.options[this.axis + 'PaddingTop']
      offset = touchBoundary(this, offset)

      isScrolling = true
      if (isSmooth === true) {
        if (this.options.useFrameAnimation) {
          var s0 = getTransformOffset(that)[this.axis]
          var _s = offset - s0
          scrollAnimation = new lib.animation(
              400,
              lib.cubicbezier.easeInOut,
              0,
              function (i1, i2) {
            var offset = (s0 + _s * i2).toFixed(2)
            setTransformStyle(that, offset)
            fireEvent(that, 'scrolling')
          })

          scrollAnimation.onend(scrollEnd)

          scrollAnimation.play()
        } else {
          setTransitionEndHandler(scrollEnd, 400)
          setTransitionStyle(that, '0.4s', 'ease-in-out')
          setTransformStyle(that, offset)

          function _cancelScroll() {
            if (isScrolling && that.enabled) {
              fireEvent(that, 'scrolling')
              lib.animation.requestFrame(_cancelScroll)
            }
          }

          lib.animation.requestFrame(_cancelScroll)
        }
      } else {
        if (!this.options.useFrameAnimation) {
          setTransitionStyle(that, '', '')
        }
        setTransformStyle(that, offset)
        scrollEnd()
      }

      return this
    },

    scrollToElement: function (childEl, isSmooth, topOffset) {
      var offset = this.offset(childEl)
      offset = offset[this.axis === 'y'?'top':'left']
      topOffset && (offset += topOffset)
      return this.scrollTo(offset, isSmooth)
    },

    getViewWidth: function () {
      return getBoundingClientRect(this.viewport).width
    },

    getViewHeight: function () {
      return getBoundingClientRect(this.viewport).height
    },

    addPulldownHandler: function (handler) {
      var that = this
      this.element.addEventListener('pulldownend', function (e) {
        that.disable()
        handler.call(that, e, function () {
          that.scrollTo(0, true)
          that.refresh()
          that.enable()
        })
      }, false)

      return this
    },

    addPullupHandler: function (handler) {
      var that = this

      this.element.addEventListener('pullupend', function (e) {
        that.disable()
        handler.call(that, e, function () {
          that.scrollTo(that.getScrollHeight(), true)
          that.refresh()
          that.enable()
        })
      }, false)

      return this
    },

    addScrollstartHandler: function (handler) {
      var that = this
      this.element.addEventListener('scrollstart', function (e) {
        handler.call(that, e)
      }, false)

      return this
    },

    addScrollingHandler: function (handler) {
      var that = this
      this.element.addEventListener('scrolling', function (e) {
        handler.call(that, e)
      }, false)

      return this
    },

    addScrollendHandler: function (handler) {
      var that = this
      this.element.addEventListener('scrollend', function (e) {
        handler.call(that, e)
      }, false)

      return this
    },

    addContentrenfreshHandler: function (handler) {
      var that = this
      this.element.addEventListener('contentrefresh', function (e) {
        handler.call(that, e)
      }, false)
    },

    addEventListener: function (name, handler, useCapture) {
      var that = this
      this.element.addEventListener(name, function (e) {
        handler.call(that, e)
      }, !!useCapture)
    },

    removeEventListener: function (name, handler) {
      var that = this
      this.element.removeEventListener(name, function (e) {
        handler.call(that, e)
      })
    },

    enablePlugin: function (name, options) {
      var plugin = plugins[name]
      if (plugin && !this.plugins[name]) {
        this.plugins[name] = true
        options = options || {}
        plugin.call(this, name, options)
      }
      return this
    }
  }

  for (var k in proto) {
    this[k] = proto[k]
  }
  // delete proto
}

lib.scroll = function (el, options) {
  if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
    options = arguments[0]
    if (options.scrollElement) {
      el = options.scrollElement
    } else if (options.scrollWrap) {
      el = options.scrollWrap.firstElementChild
    } else {
      throw new Error('no scroll element')
    }
  }

  if (!el.parentNode) {
    throw new Error('wrong dom tree')
  }
  if (options
      && options.direction
      && ['x', 'y'].indexOf(options.direction) < 0) {
    throw new Error('wrong direction')
  }

  var scroll
  if (options.downgrade === true
      && lib.scroll.downgrade) {
    scroll = lib.scroll.downgrade(el, options)
  } else {
    if (el.scrollId) {
      scroll = scrollObjs[el.scrollId]
    } else {
      scroll = new Scroll(el, options)
    }
  }
  return scroll
}

lib.scroll.plugin = function (name, constructor) {
  if (constructor) {
    name = name.split(',')
    name.forEach(function (n) {
      plugins[n] = constructor
    })
  } else {
    return plugins[name]
  }
}

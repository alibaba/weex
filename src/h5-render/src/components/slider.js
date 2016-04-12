'use strict'

var extend = require('../utils').extend
var config = require('../config')
var Component = require('./component')
var ComponentManager = require('../componentManager')
var LazyLoad = require('../lazyLoad')
require('carrousel')
require('../styles/slider.scss')

function Slider (data) {
  this.autoPlay = true  // always true for autoplay
  this.direction = 'row' // 'column' is not temporarily supported.
  this.children = []
  this.isPageShow = true
  this.isDomRendering = true

  // bind event 'pageshow' and 'pagehide' on window.
  this._idleWhenPageDisappear()
  // bind event 'renderBegin' and 'renderEnd' on window.
  this._idleWhenDomRendering()

  Component.call(this, data)
}

Slider.prototype = Object.create(Component.prototype)

Slider.prototype._idleWhenPageDisappear = function () {
  var _this = this
  window.addEventListener('pageshow', function () {
    _this.isPageShow = true
    _this.autoPlay && !_this.isDomRendering && _this.play()
  })
  window.addEventListener('pagehide', function () {
    _this.isPageShow = false
    _this.stop()
  })
}

Slider.prototype._idleWhenDomRendering = function () {
  var _this = this
  window.addEventListener('renderend', function () {
    _this.isDomRendering = false
    _this.autoPlay && _this.isPageShow && _this.play()
  })
  window.addEventListener('renderbegin', function () {
    _this.isDomRendering = true
    _this.stop()
  })
}

Slider.prototype.attr = {
  interval: function (val) {
    this.interval = parseInt(val) || 3000
    if (this.carrousel) {
      this.carrousel.playInterval = this.interval
    }
  },

  playstatus: function (val) {
    this.playstatus = val && val !== 'false' ? true : false
    this.autoPlay = this.playstatus
    if (this.carrousel) {
      if (this.playstatus) {
        this.play()
      } else {
        this.stop()
      }
    }
  },

  // support playstatus' alias auto-play for compatibility
  autoPlay: function (val) {
    this.attr.playstatus.call(this, val)
  }
}

Slider.prototype.create = function () {
  var node = document.createElement('div')
  node.classList.add('slider')
  node.style.position = 'relative'
  node.style.overflow = 'hidden'
  return node
}

Slider.prototype._doRender = function () {
  var _this = this
  _this.createChildren()
  _this.onAppend()
}

Slider.prototype.removeChild = function (child) {
  var children = this.data.children
  if (children) {
    for (var i = 0; i < children.length; i++) {
      if (child.data.ref === children[i].ref) {
        children.splice(i, 1)
        break
      }
    }
  }

  this._doRender()
}

Slider.prototype.insertBefore = function (child, before) {
  var children = this.data.children
  // var childIndex = this.children.indexOf(before.data)
  var childIndex = -1
  for (var i = 0, l = children.length; i < l; i++) {
    if (children[i].ref === before.data.ref) {
      childIndex = i
      break
    }
  }
  children.splice(childIndex, 0, child.data)

  this._doRender()
  if (this.children.length > 0) {
    return this.children[this.children.length - 1]
  }
}

Slider.prototype.appendChild = function (data) {
  var children = this.data.children || (this.data.children = [])
  children.push(data)
  this._doRender()
  if (this.children.length > 0) {
    return this.children[this.children.length - 1]
  }
}

Slider.prototype.createChildren = function () {

  var componentManager = this.getComponentManager()

  // recreate slider container.
  if (this.sliderContainer) {
    this.node.removeChild(this.sliderContainer)
  }
  if (this.indicator) {
    this.indicator.node.parentNode.removeChild(this.indicator.node)
  }
  this.children = []

  var sliderContainer = document.createElement('ul')
  sliderContainer.style.listStyle = 'none'
  this.node.appendChild(sliderContainer)
  this.sliderContainer = sliderContainer

  var children = this.data.children
  var scale = this.data.scale
  var fragment = document.createDocumentFragment()
  var indicatorData, width, height
  var childWidth = 0
  var childHeight = 0

  if (children && children.length) {
    for (var i = 0; i < children.length; i++) {
      var child
      children[i].scale = this.data.scale
      children[i].instanceId = this.data.instanceId
      if (children[i].type === 'indicator') {
        indicatorData = extend(children[i], {
          extra: {
            amount: children.length - 1,
            index: 0
          }
        })
      } else {
        child = componentManager.createElement(children[i], 'li')
        this.children.push(child)
        fragment.appendChild(child.node)
        width = child.data.style.width || 0
        height = child.data.style.height || 0
        width > childWidth && (childWidth = width)
        height > childHeight && (childHeight = height)
        child.parentRef = this.data.ref
      }
    }
    // append indicator
    if (indicatorData) {
      indicatorData.extra.width = this.data.style.width || childWidth
      indicatorData.extra.height = this.data.style.height || childHeight
      this.indicator = componentManager.createElement(indicatorData)
      this.indicator.parentRef = this.data.ref
      this.indicator.slider = this
      this.node.appendChild(this.indicator.node)
    }

    sliderContainer.style.height = scale * this.data.style.height + 'px'
    sliderContainer.appendChild(fragment)
  }
}

Slider.prototype.onAppend = function () {
  if (this.carrousel) {
    this.carrousel.removeEventListener('change', this._getSliderChangeHandler())
    this.carrousel.stop()
    this.carrousel = null
  }
  this.carrousel = new lib.carrousel(this.sliderContainer, {
    autoplay: this.autoPlay,
    useGesture: true
  })

  this.carrousel.playInterval = this.interval
  this.carrousel.addEventListener('change', this._getSliderChangeHandler())
  this.currentIndex = 0

  // preload all images for slider
  // because:
  // 1. lib-img doesn't listen to event transitionend
  // 2. even if we fire lazy load in slider's change event handler,
  //    the next image still won't be preloaded utill the moment it
  //    slides into the view, which is too late.
  if (this.preloadImgsTimer) {
    clearTimeout(this.preloadImgsTimer)
  }
  // The time just before the second slide appear and enough
  // for all child elements to append is ok.
  var preloadTime = 0.8
  this.preloadImgsTimer = setTimeout(function () {
    var imgs = this.carrousel.element.querySelectorAll('img')
    for (var i = 0, l = imgs.length; i < l; i++) {
      var img = imgs[i]
      var iLazySrc = img.getAttribute('i-lazy-src')
      var imgSrc = img.getAttribute('img-src')
      if (iLazySrc) {
        img.setAttribute('src', iLazySrc)
      } else if (imgSrc) {
        img.setAttribute('src', imgSrc)
      }
      img.removeAttribute('i-lazy-src')
      img.removeAttribute('img-src')
    }
  }.bind(this), preloadTime * 1000)

  // avoid page scroll when panning
  var panning = false
  this.carrousel.element.addEventListener('panstart', function (e) {
    if (!e.isVertical) {
      panning = true
    }
  })
  this.carrousel.element.addEventListener('panend', function (e) {
    if (!e.isVertical) {
      panning = false
    }
  })

  document.addEventListener('touchmove', function (e) {
    if (panning) {
      e.preventDefault()
      return false
    }
    return true
  }.bind(this))

}

Slider.prototype._updateIndicators = function () {
  this.indicator && this.indicator.setIndex(this.currentIndex)
}

Slider.prototype._getSliderChangeHandler = function (e) {
  if (!this.sliderChangeHandler) {
    this.sliderChangeHandler = (function (e) {
      var index = this.carrousel.items.index
      this.currentIndex = index

      // updateIndicators
      this._updateIndicators()

      this.dispatchEvent('change', { index: index })
    }).bind(this)
  }
  return this.sliderChangeHandler
}

Slider.prototype.play = function () {
  this.carrousel.play()
}

Slider.prototype.stop = function () {
  this.carrousel.stop()
}

Slider.prototype.slideTo = function (index) {
  var offset = index - this.currentIndex
  this.carrousel.items.slide(offset)
}

module.exports = Slider

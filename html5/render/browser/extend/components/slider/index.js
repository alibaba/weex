/* global lib */

'use strict'

import './carrousel'
import './slider.css'

const DEFAULT_INTERVAL = 3000

let extend, Component

function idleWhenPageDisappear (slider) {
  function handlePageShow () {
    slider.isPageShow = true
    slider.autoPlay && !slider.isDomRendering && slider.play()
  }
  function handlePageHide () {
    slider.isPageShow = false
    slider.stop()
  }
  global.addEventListener('pageshow', handlePageShow)
  global.addEventListener('pagehide', handlePageHide)
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      handlePageShow()
    }
    else if (document.visibilityState === 'hidden') {
      handlePageHide()
    }
  })
}

function idleWhenDomRendering (slider) {
  global.addEventListener('renderend', function () {
    slider.isDomRendering = false
    slider.autoPlay && slider.isPageShow && slider.play()
  })
  global.addEventListener('renderbegin', function () {
    slider.isDomRendering = true
    slider.stop()
  })
}

function updateIndicators (slider) {
  slider.indicator && slider.indicator.setIndex(slider.currentIndex)
}

function getSliderChangeHandler (slider) {
  if (!slider._sliderChangeHandler) {
    slider._sliderChangeHandler = function (e) {
      const index = this.carrousel.items.index
      this.currentIndex = index
      updateIndicators(this)
      this.dispatchEvent('change', { index: index })
    }.bind(slider)
  }
  return slider._sliderChangeHandler
}

function doRender (slider) {
  slider.createChildren()
  slider.onAppend()
}

const proto = {
  create () {
    const node = document.createElement('div')
    node.classList.add('slider')
    node.classList.add('weex-container')
    node.style.position = 'relative'
    node.style.overflow = 'hidden'
    return node
  },

  createChildren () {
    const componentManager = this.getComponentManager()

    // recreate slider container.
    if (this.sliderContainer) {
      this.node.removeChild(this.sliderContainer)
    }
    if (this.indicator) {
      this.indicator.node.parentNode.removeChild(this.indicator.node)
    }
    this.children = []

    const sliderContainer = document.createElement('ul')
    sliderContainer.style.listStyle = 'none'
    this.node.appendChild(sliderContainer)
    this.sliderContainer = sliderContainer

    const children = this.data.children
    const fragment = document.createDocumentFragment()
    let indicatorData, width, height
    let childWidth = 0
    let childHeight = 0

    if (children && children.length) {
      for (let i = 0; i < children.length; i++) {
        let child
        children[i].instanceId = this.data.instanceId
        if (children[i].type === 'indicator') {
          indicatorData = extend(children[i], {
            extra: {
              amount: children.length - 1,
              index: 0
            }
          })
        }
        else {
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

      sliderContainer.style.height = this.data.style.height + 'px'
      sliderContainer.appendChild(fragment)
    }
  },

  appendChild (data) {
    const children = this.data.children || (this.data.children = [])
    children.push(data)
    doRender(this)
    if (this.children.length > 0) {
      return this.children[this.children.length - 1]
    }
  },

  insertBefore (child, before) {
    const children = this.data.children
    let childIndex = -1
    for (let i = 0, l = children.length; i < l; i++) {
      if (children[i].ref === before.data.ref) {
        childIndex = i
        break
      }
    }
    children.splice(childIndex, 0, child.data)
    doRender(this)
    if (this.children.length > 0) {
      return this.children[this.children.length - 1]
    }
  },

  removeChild (child) {
    const children = this.data.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        if (child.data.ref === children[i].ref) {
          children.splice(i, 1)
          break
        }
      }
    }
    doRender(this)
  },

  onAppend () {
    if (this.carrousel) {
      this.carrousel.removeEventListener('change', getSliderChangeHandler(this))
      this.carrousel.stop()
      this.carrousel = null
    }
    const Carrousel = lib.carrousel
    this.carrousel = new Carrousel(this.sliderContainer, {
      autoplay: this.autoPlay,
      useGesture: true
    })

    this.carrousel.playInterval = this.interval
    this.carrousel.addEventListener('change', getSliderChangeHandler(this))
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
    const preloadTime = 0.8
    this.preloadImgsTimer = setTimeout(function () {
      const imgs = this.carrousel.element.querySelectorAll('.weex-img')
      for (let i = 0, l = imgs.length; i < l; i++) {
        const img = imgs[i]
        const iLazySrc = img.getAttribute('i-lazy-src')
        const imgSrc = img.getAttribute('img-src')
        if (iLazySrc) {
          img.style.backgroundImage = 'url(' + iLazySrc + ')'
        }
        else if (imgSrc) {
          img.style.backgroundImage = 'url(' + imgSrc + ')'
        }
        img.removeAttribute('i-lazy-src')
        img.removeAttribute('img-src')
      }
    }.bind(this), preloadTime * 1000)

    // avoid page scroll when panning
    let panning = false
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
    })

    Component.prototype.onAppend.call(this)
  },

  play () {
    this.carrousel.play()
  },

  stop () {
    this.carrousel.stop()
  },

  slideTo (index) {
    const offset = index - this.currentIndex
    this.carrousel.items.slide(offset)
  }
}

const attr = {
  interval: function (val) {
    this.interval = parseInt(val) || DEFAULT_INTERVAL
    if (this.carrousel) {
      this.carrousel.playInterval = this.interval
    }
  },

  index: function (val) {
    const _this = this
    function doSlide (index) {
      index = parseInt(index)
      if (index < 0 || isNaN(index)) {
        return console.error('[h5-render] invalid index ', index)
      }
      _this.slideTo(index)
      if (_this._updateIndex) {
        window.removeEventListener('renderend', _this._updateIndex)
      }
    }
    if (this.isDomRendering) {
      const pre = !!this._updateIndex
      this._updateIndex = function () {
        _this.autoPlay && _this.isPageShow && _this.play()
        doSlide(val)
      }
      !pre && window.addEventListener('renderend', this._updateIndex)
    }
    else {
      doSlide(val)
    }
  },

  playstatus: function (val) {
    this.playstatus = val && val !== 'false'
    this.autoPlay = this.playstatus
    if (this.carrousel) {
      if (this.playstatus) {
        this.play()
      }
      else {
        this.stop()
      }
    }
  },

  // support playstatus' alias auto-play for compatibility
  autoPlay: function (val) {
    this.attr.playstatus.call(this, val)
  }
}

const event = {
  change: {
    updator: function () {
      return {
        attrs: {
          index: this.currentIndex
        }
      }
    }
  }
}

function init (Weex) {
  Component = Weex.Component
  extend = Weex.utils.extend

  function Slider (data) {
    this.autoPlay = false  // default value is false.
    this.interval = DEFAULT_INTERVAL
    this.direction = 'row' // 'column' is not temporarily supported.
    this.children = []
    this.isPageShow = true
    this.isDomRendering = true

    // bind event 'pageshow', 'pagehide' and 'visibilitychange' on window.
    idleWhenPageDisappear(this)
    // bind event 'renderBegin' and 'renderEnd' on window.
    idleWhenDomRendering(this)

    Component.call(this, data)
  }
  Slider.prototype = Object.create(Component.prototype)
  extend(Slider.prototype, proto)
  extend(Slider.prototype, { attr })
  extend(Slider.prototype, { event })

  Weex.registerComponent('slider', Slider)
}

export default { init }

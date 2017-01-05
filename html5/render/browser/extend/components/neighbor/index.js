/* global lib */

'use strict'

import './neighbor.css'

const DEFAULT_INTERVAL = 3000
const DEFAULT_NEIGHBOR_SPACE = 20
const DEFAULT_NEIGHBOR_ALPHA = 0.6
const DEFAULT_NEIGHBOR_SCALE = 0.8

const TRANSITION_DURATION = 400

const MAIN_SLIDE_SCALE = 0.9
const MAIN_SLIDE_OPACITY = 1

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

function _renderIndicators (slider, ct, data) {
  data.extra.width = data.style.width || slider.width
  data.extra.height = data.style.height || slider.height
  const indicator = slider.getComponentManager().createElement(data)
  indicator.parentRef = slider.data.ref
  indicator.slider = slider
  slider.indicator = indicator
  ct.appendChild(indicator.node)
}

function renderIndicators (slider, ct, data) {
  setTimeout(() => _renderIndicators(slider, ct, data), 0)
}

function updateIndicators (slider) {
  slider.indicator && slider.indicator.setIndex(slider.currentIndex)
}

function transitionOnce (node, duration, timingFunc) {
  const transitionStr = `all ${duration}ms ${timingFunc}`
  node.style.webkitTransition = transitionStr
  node.style.transition = transitionStr
  setTimeout(function () {
    node.style.webkitTransition = ''
    node.style.transition = ''
  }, duration)
}

function animateTransform (node, style, duration, timeFunction) {
  transitionOnce(node, duration || TRANSITION_DURATION, timeFunction || 'ease')
  for (const k in style) {
    node.style[k] = style[k]
  }
}

function transformSlide (slider, index) {
  const node = slider.slides[index].node
  node.style.opacity = slider.neighborAlpha
  const transformStr = `scale(${slider.neighborScale})`
  node.style.webkitTransform = transformStr
  node.style.transform = transformStr
  node.style.width = slider.width + 'px'
  node.style.height = slider.height + 'px'
  node.style.position = 'absolute'
  node.style.top = '0px'
  node.style.left = '0px'
}

function loadImg (slider) {
  const imgs1 = slider.node.querySelectorAll('[img-src]') || []
  const imgs2 = slider.node.querySelectorAll('[i-lazy-src]') || []
  function load (node) {
    const src = node.getAttribute('img-src') || node.getAttribute('i-lazy-src')
    lib.img.applySrc(node, src, node.dataset.placeholder)
  }
  for (let i = 0; i < imgs1.length; i++) {
    load(imgs1[i])
  }
  for (let i = 0; i < imgs2.length; i++) {
    load(imgs2[i])
  }
}

function _doRender (slider) {
  loadImg(slider)
  slider.total = slider.slides.length
  slider.currentIndex = 0
  const width = slider.data.style.width || 0
  const height = slider.data.style.height || 0
  slider.width = parseFloat(width) || slider.node.getBoundingClientRect().width
  slider.height = parseFloat(height) || slider.node.getBoundingClientRect().height

  const l = slider.slides.length
  for (let i = 0; i < l; i++) {
    transformSlide(slider, i)
  }

  setTimeout(() => slider.slideTo(0), 0)
}

function doRender (slider) {
  setTimeout(_doRender.bind(null, slider), 0)
}

function loopIndex (idx, total) {
  if (total === 0) {
    return 0
  }
  return (total + idx) % total
}

function autoPlay (slider) {
  const next = slider.currentIndex + 1
  setTimeout(() => slider.slideTo(next), 0)
  slider.playTimer = setTimeout(() => autoPlay(slider), slider.interval + TRANSITION_DURATION)
}

function useGesture (slider) {
  const node = slider.node
  let displacement, panning

  node.addEventListener('panstart', function (e) {
    if (!e.isVertical) {
      e.preventDefault()
      e.stopPropagation()
      slider.stop()
      panning = true
      displacement = 0
    }
  })

  node.addEventListener('panmove', function (e) {
    if (!e.isVertical && panning) {
      e.preventDefault()
      e.stopPropagation()
      const displacement = e.displacementX
      moveSlides(slider, displacement)
    }
  })

  node.addEventListener('panend', function (e) {
    if (!e.isVertical && panning) {
      e.preventDefault()
      e.stopPropagation()
      displacement = e.displacementX
      if (e.isSwipe) {
        if (displacement < 0) {
          slider.slideToNext()
        }
        else {
          slider.slideToPrev()
        }
      }
      else {
        if (Math.abs(displacement) < slider.width / 2) {
          slider.slideTo(slider.currentIndex)
        }
        else if (displacement < 0) {
          slider.slideToNext()
        }
        else {
          slider.slideToPrev()
        }
      }
      panning = false
      slider.play()
    }
  })

  node.addEventListener('swipe', function (e) {
    if (!e.isVertical) {
      e.preventDefault()
      e.stopPropagation()
    }
  })
}

function moveSlides (slider, offset) {
  const mainTransformStr = `translate(${offset}px, 0px) scale(${MAIN_SLIDE_SCALE})`
  const mainNode = slider.mainSlide.node
  mainNode.style.webkitTransform = mainTransformStr
  mainNode.style.transform = mainTransformStr

  const leftTransformStr = `translate(${slider.leftTranslate + offset}px, 0px) scale(${slider.neighborScale})`
  const leftNode = slider.leftSlide.node
  leftNode.style.webkitTransform = leftTransformStr
  leftNode.style.transform = leftTransformStr

  const rightTransformStr = `translate(${slider.rightTranslate + offset}px, 0px) scale(${slider.neighborScale})`
  const rightNode = slider.rightSlide.node
  rightNode.style.webkitTransform = rightTransformStr
  rightNode.style.transform = rightTransformStr
}

function resetSideSlidePos (slider, side) {
  const signMap = { left: '-', right: '' }
  const transformStr = `translate(${signMap[side] + slider.width}px, 0px)`
  const node = slider[side + 'Slide'].node
  node.style.webkitTransform = transformStr
  node.style.transform = transformStr
}

function resetOutsideSlides (slider, indexArr) {
  indexArr = indexArr || []
  const l = slider.slides.length
  for (let i = 0; i < l; i++) {
    if (indexArr.indexOf(i) <= -1) {
      slider.slides[i].node.style.opacity = 0
    }
  }
}

const proto = {
  create () {
    const node = document.createElement('div')
    this.node = node
    node.classList.add('slider-neighbor')
    node.classList.add('weex-container')
    this.style.flexDirection.call(this, 'row')
    node.style.position = 'relative'
    node.style.overflow = 'hidden'
    return node
  },

  createChildren () {
    const componentManager = this.getComponentManager()

    const children = this.data.children
    const fragment = document.createDocumentFragment()

    if (children && children.length) {
      for (let i = 0; i < children.length; i++) {
        let child
        const data = children[i]
        data.instanceId = this.data.instanceId
        // 'indicator' maybe the last child of this component.
        if (data.type !== 'indicator') {
          child = componentManager.createElement(data)
          child.node.classList.add('weex-neighbor-item')
          const width = (data.style || {}).width || this.data.style.width
          const height = (data.style || {}).height || this.data.style.height
          child.node.style.marginTop = -(height / 2) + 'px'
          child.node.style.marginLeft = -(width / 2) + 'px'
          this.slides.push(child)
          fragment.appendChild(child.node)
          child.parentRef = this.data.ref
        }
        else {
          renderIndicators(this, fragment, extend(data, {
            extra: {
              amount: children.length - 1,
              index: 0
            }
          }))
        }
      }
      resetOutsideSlides(this, [])
      this.node.appendChild(fragment)
      doRender(this)
    }
  },

  appendChild (data) {
    const children = this.data.children
    const componentManager = this.getComponentManager()
    let child

    if (data.type === 'indicator') {
      renderIndicators(this, this.node, extend(data, {
        extra: {
          amount: children.length,
          index: this.currentIndex
        }
      }))
    }
    else {
      child = componentManager.createElement(data)
      child.node.classList.add('weex-neighbor-item')
      const width = (data.style || {}).width || this.data.style.width
      const height = (data.style || {}).height || this.data.style.height
      child.node.style.marginTop = -(height / 2) + 'px'
      child.node.style.marginLeft = -(width / 2) + 'px'
      this.slides.push(child)
      resetOutsideSlides(this, [])
      this.node.appendChild(child.node)
    }

    doRender(this)

    if (!children || !children.length) {
      this.data.children = [data]
    }
    else {
      children.push(data)
    }

    return child || this.indicator
  },

  insertBefore (child, before) {
    const children = this.data.children
    let i = 0
    let slidesIdx = 0
    let isAppend = false
    if (!children || !children.length || !before) {
      isAppend = true
    }
    else {
      let l
      for (l = children.length; i < l; i++) {
        if (children[i].ref === before.data.ref) {
          break
        }
        if (children[i].type !== 'indicator') {
          slidesIdx++
        }
      }
      if (i === l) {
        isAppend = true
      }
    }

    child.node.classList.add('weex-neighbor-item')
    const data = child.data
    const width = (data.style || {}).width || this.data.style.width
    const height = (data.style || {}).height || this.data.style.height
    child.node.style.marginTop = -(height / 2) + 'px'
    child.node.style.marginLeft = -(width / 2) + 'px'
    if (isAppend) {
      this.node.appendChild(child.node)
      this.slides.push(child)
      resetOutsideSlides(this, [])
      children.push(child.data)
    }
    else {
      this.node.insertBefore(child.node, before.node)
      this.slides.splice(slidesIdx, 0, child)
      children.splice(i, 0, child.data)
    }

    doRender(this)
  },

  removeChild (child) {
    const children = this.data.children
    let i = 0
    let slidesIdx = 0
    if (children && children.length) {
      let l
      for (l = children.length; i < l; i++) {
        if (children[i].ref === child.data.ref) {
          break
        }
        if (children[i].type !== 'indicator') {
          slidesIdx++
        }
      }
      if (i < l) {
        children.splice(i, 1)
        this.slides.splice(slidesIdx, 1)
        resetOutsideSlides(this, [])
      }
    }

    this.getComponentManager().removeComponent(child.data.ref)
    child.node.parentNode.removeChild(child.node)

    doRender(this)
  },

  onAppend () {
    this.slideTo(0)
    useGesture(this)
    Component.prototype.onAppend.call(this)
  },

  play () {
    // start playing
    this.playTimer && clearTimeout(this.playTimer)
    if (this.playstatus/* && !this.toggleOff*/) {
      this.playTimer = setTimeout(autoPlay.bind(null, this), this.interval)
    }
  },

  stop () {
    // stop playing
    this.playTimer && clearTimeout(this.playTimer)
  },

  slideTo (index, restartAutoplay) {
    const total = this.slides.length
    if (total === 0) {
      return
    }
    if (restartAutoplay) {
      this.stop()
      setTimeout(() => this.play(), 100)
    }
    const origIdx = index
    index = loopIndex(origIdx, total)
    const leftIndex = loopIndex(index - 1, total)
    const rightIndex = loopIndex(index + 1, total)

    this.mainSlide = this.slides[index]
    this.leftSlide = this.slides[loopIndex(index - 1, total)]
    this.rightSlide = this.slides[loopIndex(index + 1, total)]

    const mainTransformStr = `translate(0px, 0px) scale(${MAIN_SLIDE_SCALE})`
    setTimeout(() => animateTransform(this.mainSlide.node, {
      webkitTransform: mainTransformStr,
      transform: mainTransformStr,
      opacity: MAIN_SLIDE_OPACITY,
      zIndex: 99
    }), 100)

    const translateX = this.width
      - this.width * (1 - this.neighborScale) / 2
      - this.neighborSpace
    this.leftTranslate = -translateX
    this.rightTranslate = translateX

    if (origIdx > this.currentIndex) {
      resetSideSlidePos(this, 'right')
    }
    else if (origIdx < this.currentIndex) {
      resetSideSlidePos(this, 'left')
    }

    const leftTransformStr = `translate(${-translateX + 'px'}, 0px) scale(${this.neighborScale})`
    setTimeout(() => animateTransform(this.leftSlide.node, {
      webkitTransform: leftTransformStr,
      transform: leftTransformStr,
      opacity: this.neighborAlpha,
      zIndex: 1
    }), 100)

    const rightTransformStr = `translate(${translateX + 'px'}, 0px) scale(${this.neighborScale})`
    setTimeout(() => animateTransform(this.rightSlide.node, {
      webkitTransform: rightTransformStr,
      transform: rightTransformStr,
      opacity: this.neighborAlpha,
      zIndex: 1
    }), 100)

    resetOutsideSlides(this, [index, leftIndex, rightIndex])

    this.currentIndex = index
    updateIndicators(this)
    this.dispatchEvent('change', { index: this.currentIndex })
  },

  slideToPrev () {
    this.slideTo(this.currentIndex - 1)
  },

  slideToNext () {
    this.slideTo(this.currentIndex + 1)
  }
}

const attr = {
  interval: function (val) {
    this.interval = parseInt(val) || DEFAULT_INTERVAL
  },

  index: function (val) {
    const _this = this
    function doSlide (index) {
      index = parseInt(index)
      if (index < 0 || isNaN(index)) {
        return console.error('[h5-render] invalid index ', index)
      }
      _this.stop()
      _this.slideTo(index)
      _this.autoPlay && _this.isPageShow && _this.play()
      if (_this._updateIndex) {
        window.removeEventListener('renderend', _this._updateIndex)
      }
    }
    if (this.isDomRendering) {
      const pre = !!this._updateIndex
      this._updateIndex = function () {
        doSlide(val)
      }
      !pre && window.addEventListener('renderend', this._updateIndex)
    }
    else {
      doSlide(val)
    }
  },

  playstatus: function (val) {
    const _this = this
    this.playstatus = val && val !== 'false'
    this.autoPlay = this.playstatus

    function doPlay () {
      _this.isPageShow && _this.play()
      if (_this._updatePlaystatus) {
        window.removeEventListener('renderend', _this._updatePlaystatus)
      }
    }

    if (this.playstatus) {
      if (this.isDomRendering) {
        const pre = !!this._updatePlaystatus
        this._updatePlaystatus = function () {
          doPlay()
        }
        !pre && window.addEventListener('renderend', this._updatePlaystatus)
      }
      else {
        doPlay()
      }
    }
    else {
      this.stop()
    }
  },

  // support playstatus' alias auto-play for compatibility
  autoPlay: function (val) {
    this.attr.playstatus.call(this, val)
  },

  neighborSpace (val) {
    const ns = parseFloat(val)
    if (!isNaN(ns) && ns >= 0) {
      this.neighborSpace = ns
    }
    else {
      console.warn(`[h5-render] invalid value for 'neighbor-space' of slider-neighbor: ${val}.`)
    }
  },

  neighborAlpha (val) {
    const na = parseFloat(val)
    if (!isNaN(na) && na >= 0 && na <= 1) {
      this.neighborAlpha = na
    }
    else {
      console.warn(`[h5-render] invalid value for 'neighbor-alpha' of slider-neighbor: ${val}.`)
    }
  },

  neighborScale (val) {
    const ns = parseFloat(val)
    if (!isNaN(ns) && ns >= 0 && ns <= 1) {
      this.neighborScale = ns
    }
    else {
      console.warn(`[h5-render] invalid value for 'neighbor-scale' of slider-neighbor: ${val}.`)
    }
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

  /**
   * data.attr
   * support slider's attributes and three
   * @param {number} neighbor-space 0 - 375, the exposing width of slides on both other sides.
   * @param {number} neighbor-alpha 0 - 1, opacity of both other sides of slides, default is 0.6.
   * @param {number} neighbor-scale 0 - 1, the scale of both other sides of slides, default is 0.8.
   */
  function SliderNeighbor (data) {
    this.autoPlay = false  // default value is false.
    this.interval = DEFAULT_INTERVAL
    this.direction = 'row' // 'column' is not temporarily supported.
    this.slides = []
    this.isPageShow = true
    this.isDomRendering = true
    this.currentIndex = 0

    this.neighborSpace = DEFAULT_NEIGHBOR_SPACE
    this.neighborAlpha = DEFAULT_NEIGHBOR_ALPHA
    this.neighborScale = DEFAULT_NEIGHBOR_SCALE

    // bind event 'pageshow', 'pagehide' and 'visibilitychange' on window.
    idleWhenPageDisappear(this)
    // bind event 'renderBegin' and 'renderEnd' on window.
    idleWhenDomRendering(this)

    Component.call(this, data)
  }
  SliderNeighbor.prototype = Object.create(Component.prototype)
  extend(SliderNeighbor.prototype, proto)
  extend(SliderNeighbor.prototype, { attr })
  extend(SliderNeighbor.prototype, { event })

  Weex.registerComponent('slider-neighbor', SliderNeighbor)
}

export default { init }

/* global HTMLElement */

import { throttle } from '../../utils'

const ua = navigator.userAgent
const isFirefox = !!ua.match(/Firefox/i)
const isIEMobile = !!ua.match(/IEMobile/i)
const cssPrefix = isFirefox ? '-moz-' : isIEMobile ? '-ms-' : '-webkit-'
const stylePrefix = isFirefox ? 'Moz' : isIEMobile ? 'ms' : 'webkit'

// even sticky, still not work. so...
// const supportSticky = detectSticky()

function bindParent (sticky) {
  if (!sticky instanceof Sticky) {
    return
  }
  const scroller = sticky.component.getParentScroller()
  let pt
  if (scroller) {
    pt = sticky.parent = scroller
    sticky.parentElement = pt.node
  }
  else {
    pt = sticky.parent = sticky.component.getRootContainer()
    sticky.parentElement = pt
  }
}

function setSticky (sticky) {
  const comp = sticky.component
  const element = sticky.element
  comp.stickyPlaceholder = sticky.element.cloneNode(true)
  comp.stickyPlaceholder.removeAttribute('data-ref')
  comp.stickyPlaceholder.classList.add('weex-sticky-placeholder')
  element.classList.add('weex-sticky')
  sticky.preMarginTop = element.style.marginTop
  sticky.preTop = element.style.top
  element.style.marginTop = sticky.top || '0' + 'px'

  element.parentNode.insertBefore(
    comp.stickyPlaceholder, element)
  element.style.position = 'fixed'
  let top
  if (sticky.parent instanceof HTMLElement) {
    top = 0
  }
  else {
    top = sticky.parentElement.getBoundingClientRect().top
  }
  element.style.top = top + 'px'
  sticky.parentElement.appendChild(element)
}

/**
 * unsetSticky
 * @param  {Sticky} sticky : a sticky instance.
 * @param  {string} position : position replacing with (default: 'relative').
 */
function unsetSticky (sticky, position) {
  const comp = sticky.component
  const element = sticky.element
  position = position ? position + '' : sticky.prePosition
  element.style.position = position
  element.style.marginTop = sticky.preMarginTop || ''
  element.style.top = sticky.preTop || ''
  element.classList.remove('weex-sticky')
  if (comp.stickyPlaceholder) {
    const parent = comp.stickyPlaceholder.parentNode
    parent.insertBefore(element, comp.stickyPlaceholder)
    parent.removeChild(comp.stickyPlaceholder)
    comp.stickyPlaceholder = null
  }
}

/**
 * @class  Sticky
 * @param {Component} component: a weex component.
 * @param {object} options config options.
 *  - options.component (optional) incase the component param is missing, it can
 *    be specified in this options.
 *  - options.withinParent=false（optional，only for Android）the sticky effect is
 *    limited within the parent element only.
 */
export default function Sticky (component, options) {
  options = options || {}
  this.component = component
  this.element = component.node
  this.prePosition = this.element.style.position
  this.withinParent = options.withinParent || false
  this.parent = null
  this.init()
}

Sticky.prototype = {

  constructor: Sticky,

  init () {
    const elementStyle = this.element.style
    elementStyle[stylePrefix + 'Transform'] = 'translateZ(0)' // fix flickering
    elementStyle['transform'] = 'translateZ(0)'
    bindParent(this)
    // if (supportSticky) {
    //   elementStyle.position = cssPrefix + 'sticky'
    // }
    this._simulateSticky()
    this._bindResize()
  },

  _bindResize () {
    const self = this
    const isAndroid = (/android/gi).test(navigator.appVersion)
    const resizeEvent = self._resizeEvent = 'onorientationchange' in window
      ? 'orientationchange'
      : 'resize'
    const resizeHandler = self._resizeHandler = function () {
      setTimeout(function () {
        self.refresh()
      }, isAndroid ? 200 : 0)
    }
    window.addEventListener(resizeEvent, resizeHandler, false)
  },

  /**
   * Refresh a instance.
   * If withParent is true and the parent' height altered, this
   * method should be called.
   */
  refresh () {
    // if (supportSticky) {
    //   return
    // }
    this._detach()
    this._simulateSticky()
  },

  _simulateSticky () {
    const self = this
    const isInScrollable = this.isInScrollable()
    // the initial y offset.
    this.offset = (isInScrollable
      ? this.getParentScroller().offset
      : window.pageYOffset)
      || 0
    const rectTop = this.element.getBoundingClientRect().top
    let wrapperTop = 0
    if (isInScrollable) {
      wrapperTop = this.parentElement.getBoundingClientRect().top
    }
    const withinParent = this.withinParent
    const thresholdBase = rectTop - wrapperTop + this.offset
    /**
     * curState:
     *   1 - normal
     *   2 - sticky
     *   3 - exceed parent
     * @type {Number}
     */
    this.curState = 1
    const scrollHandler = this._scrollHandler = throttle(function (e) {
      const thresholdTop = thresholdBase
      const ypos = self.isInScrollable() ? e.offset : window.pageYOffset
      self.offset = ypos
      if (ypos < thresholdTop) {
        if (self.curState !== 1) {
          unsetSticky(self)
          self.curState = 1
        }
      }
      else if ((!withinParent && ypos >= thresholdTop) ||
        (withinParent && ypos >= thresholdTop/* && ypos < thresholdBottom*/)) {
        if (self.curState !== 2) {
          setSticky(self)
          self.curState = 2
        }
      }
    }, 100)
    window.addEventListener('scroll', scrollHandler, false)

    // take effect once inited after a destroyment.
    if (this.offset >= thresholdBase) {
      const dummyEvent = document.createEvent('HTMLEvents')
      dummyEvent.initEvent('scroll', true, true)
      window.dispatchEvent(dummyEvent)
    }
  },

  _detach (position) {
    position = position ? position + '' : 'relative'
    // if (supportSticky) {
    //   return
    // }
    if (this.curState === 2) {
      unsetSticky(this)
    }
    window.removeEventListener('scroll', this._scrollHandler, false)
  },

  isInScrollable () {
    if (!this._isInScrollable) {
      try {
        this._isInScrollable = this.component.isInScrollable()
      }
      catch (err) {
        // The parentRef is not in componentManager's componentMap yet, so
        // it's invalid to get the parent and test if it's scrollable.
        // This is most likely to happen in the case that the parent
        // component's 'append' attribute is set to 'tree'.
        console.error('isInScrollable is not yet available to call', err)
      }
    }
    return this._isInScrollable
  },

  getParentScroller () {
    return this.component.getParentScroller()
  },

  destroy (position) {
    this._detach(position)
    const elementStyle = this.element.style
    elementStyle.removeProperty(cssPrefix + 'transform')
    elementStyle.removeProperty('transform')
    // if (supportSticky) {
    //   return
    // }
    window.removeEventListener(this._resizeEvent, this._resizeHandler, false)
  }
}

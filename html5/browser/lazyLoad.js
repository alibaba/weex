/* global lib */

'use strict'

require('lazyimg')

let lazyloadTimer

const LazyLoad = {
  makeImageLazy: function (image, src) {
    image.removeAttribute('img-src')
    image.removeAttribute('i-lazy-src')
    image.removeAttribute('src')
    image.setAttribute('img-src', src)
    // should replace 'src' with 'img-src'. but for now lib.img.fire is
    // not working for the situation that the appear event has been
    // already triggered.
    // image.setAttribute('src', src)
    // image.setAttribute('img-src', src)
    this.fire()
  },

  // we don't know when all image are appended
  // just use setTimeout to do delay lazyload
  //
  // -- actually everytime we add a element or update styles,
  // the component manager will call startIfNeed to fire
  // lazyload once again in the handleAppend function. so there
  // is no way that any image element can miss it. See source
  // code in componentMangager.js.
  startIfNeeded: function (component) {
    const that = this
    if (component.data.type === 'image') {
      if (!lazyloadTimer) {
        lazyloadTimer = setTimeout(function () {
          that.fire()
          clearTimeout(lazyloadTimer)
          lazyloadTimer = null
        }, 16)
      }
    }
  },

  loadIfNeeded: function (elementScope) {
    const notPreProcessed = elementScope.querySelectorAll('[img-src]')
    const that = this
    // image elements which have attribute 'i-lazy-src' were elements
    // that had been preprocessed by lib-img-core, but not loaded yet, and
    // must be loaded when 'appear' events were fired. It turns out the
    // 'appear' event was not fired correctly in the css-translate-transition
    // situation, so 'i-lazy-src' must be checked and lazyload must be
    // fired manually.
    const preProcessed = elementScope.querySelectorAll('[i-lazy-src]')
    if (notPreProcessed.length > 0 || preProcessed.length > 0) {
      that.fire()
    }
  },

  // fire lazyload.
  fire: function () {
    lib.img.fire()
  }

}

module.exports = LazyLoad
